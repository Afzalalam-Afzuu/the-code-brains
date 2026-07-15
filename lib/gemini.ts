// lib/gemini.ts

// Global tracker to enforce 5-second rate limit
let lastCallTimestamp = 0;

/**
 * Sends a text prompt to a specific Gemini model (e.g. gemini-2.5-flash or gemini-2.5-flash-lite).
 * Enforces a server-side 5-second cooldown period between successive calls.
 */
export async function askGemini(prompt: string, model: string = 'gemini-1.5-flash'): Promise<string> {
  const now = Date.now();
  const diff = now - lastCallTimestamp;
  
  if (diff < 5000) {
    const waitSeconds = Math.ceil((5000 - diff) / 1000);
    throw new Error(`Rate limit active. Please wait ${waitSeconds}s before trying again.`);
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('Gemini API key is not configured in your .env.local file.');
  }

  // Update timestamp on successful request initiation
  lastCallTimestamp = now;

  const url = `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${apiKey}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('[Gemini Service] API Error:', errText);
      throw new Error(`Gemini API responded with status ${response.status}`);
    }

    const data = await response.json();
    const output = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!output) {
      throw new Error('Gemini API returned an empty output candidate.');
    }

    return output;
  } catch (err: any) {
    console.error('[Gemini Service] Fetch Error:', err);
    throw new Error(err.message || 'Network error communicating with Gemini AI.');
  }
}

/**
 * Requests a structured blog draft layout using the chosen model.
 */
export async function generateBlogDraft(topic: string, model: string = 'gemini-1.5-flash'): Promise<{ title: string; excerpt: string; content: string }> {
  const prompt = `You are a professional technology blogger. Generate a comprehensive blog post draft for the topic: "${topic}".
  The output MUST be a valid JSON object. Do not wrap the JSON object in a \`\`\`json block. Return only raw JSON.
  
  JSON format required:
  {
    "title": "A catchy, SEO-optimized title",
    "excerpt": "A short 1-2 sentence preview description",
    "content": "Full detailed article content in Markdown format, using headings (##, ###), paragraphs, and bullet points. Make it sound engaging and professional."
  }`;

  try {
    const rawResult = await askGemini(prompt, model);
    
    // Clean potential markdown blocks
    const cleanJson = rawResult
      .trim()
      .replace(/^```json\s*/i, '')
      .replace(/```$/, '')
      .trim();

    return JSON.parse(cleanJson);
  } catch (err) {
    console.warn('[Gemini Service] Failed to parse structured JSON. Wrapping raw response.', err);
    return {
      title: `${topic} Review & Guide`,
      excerpt: `Detailed insights and analysis regarding ${topic}.`,
      content: `Failed to structure automatically. Raw draft output below:\n\n${topic}`
    };
  }
}
