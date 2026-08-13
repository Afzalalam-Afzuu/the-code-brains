export interface LessonQuiz {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  category: string;
  readTime: string;
  summary: string;
  content: string;
  codeExample?: {
    html?: string;
    css?: string;
    js?: string;
    title?: string;
  };
  quiz?: LessonQuiz;
}

export interface Course {
  id: string;
  title: string;
  icon: string;
  color: string;
  description: string;
  lessons: Lesson[];
}

export const COURSES: Course[] = [
  {
    id: "html",
    title: "HTML5 Tutorial",
    icon: "🌐",
    color: "from-orange-500 to-amber-600",
    description: "Learn HTML5 from scratch — the standard markup language for creating modern web pages.",
    lessons: [
      {
        id: "html-intro",
        title: "HTML Introduction",
        category: "HTML Basics",
        readTime: "4 min read",
        summary: "What is HTML, how does the web browser render HTML tags, and building your first webpage.",
        content: `
### What is HTML?
HTML stands for **HyperText Markup Language**. It is the standard markup language for creating Web pages.

- **HyperText**: Text that links to other pages or media.
- **Markup Language**: A collection of tags that annotate document structure.
- **Web Browsers**: Browsers like Chrome, Firefox, and Safari read HTML documents and render them visually.

### A Simple HTML Document

An HTML document consists of nested tags enclosed in angle brackets (\`<tagname>\`).

\`\`\`html
<!DOCTYPE html>
<html>
<head>
  <title>My First HTML Page</title>
</head>
<body>
  <h1>Welcome to TheCodeBrains</h1>
  <p>This is a paragraph of text inside an HTML document.</p>
</body>
</html>
\`\`\`

### Key Tags Explained
1. \`<!DOCTYPE html>\` — Declares the document type to be HTML5.
2. \`<html>\` — The root element of an HTML page.
3. \`<head>\` — Contains meta information about the HTML page (title, styles, scripts).
4. \`<title>\` — Specifies a title for the browser tab.
5. \`<body>\` — Defines the document's body, which contains all visible content (headings, paragraphs, images, links).
`,
        codeExample: {
          html: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; padding: 20px; background: #f8fafc; }
    h1 { color: #2563eb; }
    p { color: #475569; font-size: 16px; }
    .card { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
  </style>
</head>
<body>
  <div class="card">
    <h1>Hello, W3Schools Student! 👋</h1>
    <p>This is live HTML code running inside your browser!</p>
    <button onclick="alert('HTML5 is awesome!')">Click Me</button>
  </div>
</body>
</html>`,
          title: "HTML5 Hello World Example",
        },
        quiz: {
          question: "What does HTML stand for?",
          options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Home Tool Markup Language",
            "Hyperlink Text Management Logic",
          ],
          correctIndex: 0,
          explanation: "HTML stands for HyperText Markup Language, which forms the structure of web pages.",
        },
      },
      {
        id: "html-elements",
        title: "HTML Elements & Tags",
        category: "HTML Basics",
        readTime: "5 min read",
        summary: "Understand opening tags, closing tags, self-closing tags, and element nesting.",
        content: `
### What is an HTML Element?
An HTML element is defined by a **start tag**, some content, and an **end tag**:

\`\`\`html
<tagname>Content goes here...</tagname>
\`\`\`

### Examples of HTML Elements
- \`<h1>My First Heading</h1>\`
- \`<p>My first paragraph.</p>\`
- \`<button>Click Here</button>\`

### Nested HTML Elements
HTML elements can be nested inside other elements:

\`\`\`html
<div class="container">
  <h2>Subheading</h2>
  <p>Paragraph nested inside a container div.</p>
</div>
\`\`\`

### Empty / Self-Closing Elements
Some elements do not have content or a closing tag, such as \`<br>\` (line break) and \`<img>\` (image):

\`\`\`html
<p>Line 1<br>Line 2 after line break</p>
<img src="logo.png" alt="Company Logo">
\`\`\`
`,
        codeExample: {
          html: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui; padding: 20px; }
    .box { background: #eff6ff; border-left: 4px solid #3b82f6; padding: 15px; }
  </style>
</head>
<body>
  <div class="box">
    <h2>HTML Nested Elements</h2>
    <p>This paragraph is nested inside a blue styled container box.</p>
    <hr>
    <p>Notice the horizontal line above created by the &lt;hr&gt; tag!</p>
  </div>
</body>
</html>`,
          title: "HTML Nested Elements Example",
        },
        quiz: {
          question: "Which of the following is an empty (self-closing) HTML element?",
          options: ["<p>", "<div>", "<img>", "<h1>"],
          correctIndex: 2,
          explanation: "The <img> tag is self-closing and does not require an end tag.",
        },
      },
      {
        id: "html-attributes",
        title: "HTML Attributes",
        category: "HTML Basics",
        readTime: "5 min read",
        summary: "Learn how attributes provide additional information about HTML elements.",
        content: `
### HTML Attributes
Attributes provide extra information about HTML elements. They are always specified in the **start tag** in name/value pairs like: \`name="value"\`.

### Common Attributes
1. \`href\` — Used in \`<a>\` tags to specify destination URL.
2. \`src\` — Used in \`<img>\` tags to specify image path.
3. \`alt\` — Provides alt text for accessibility and broken images.
4. \`style\` — Adds inline CSS styling.
5. \`class\` & \`id\` — Target elements with CSS and JavaScript.

\`\`\`html
<a href="https://www.thecodebrains.com" target="_blank">Visit TheCodeBrains</a>
<img src="hero.jpg" alt="Hero Image" width="500" height="300">
\`\`\`
`,
        codeExample: {
          html: `<!DOCTYPE html>
<html>
<body>
  <h2 style="color: #0284c7;">HTML Attributes in Action</h2>
  <a href="https://www.thecodebrains.com" target="_blank" style="color: #2563eb; font-weight: bold; text-decoration: underline;">
    Click to visit TheCodeBrains Portal →
  </a>
  <br><br>
  <button style="background: #10b981; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer;">
    Styled Button Attribute
  </button>
</body>
</html>`,
          title: "HTML Attributes Interactive Demo",
        },
        quiz: {
          question: "Which attribute specifies an alternate text for an image if the image cannot be displayed?",
          options: ["title", "src", "alt", "href"],
          correctIndex: 2,
          explanation: "The alt attribute provides alternative text for screen readers and broken image fallback.",
        },
      },
    ],
  },
  {
    id: "css",
    title: "CSS3 Tutorial",
    icon: "🎨",
    color: "from-blue-500 to-cyan-600",
    description: "Master CSS3 styling — Flexbox, Grid, animations, and responsive web design rules.",
    lessons: [
      {
        id: "css-intro",
        title: "CSS Introduction & Syntax",
        category: "CSS Fundamentals",
        readTime: "5 min read",
        summary: "Learn CSS syntax, selectors, specificity, and how to attach CSS to HTML.",
        content: `
### What is CSS?
CSS stands for **Cascading Style Sheets**. It describes how HTML elements should be displayed on screen, paper, or in other media.

### CSS Syntax
A CSS rule-set consists of a selector and a declaration block:

\`\`\`css
selector {
  property: value;
  property: value;
}
\`\`\`

### Example
\`\`\`css
h1 {
  color: #2563eb;
  font-size: 28px;
  text-align: center;
}
\`\`\`

### 3 Ways to Insert CSS
1. **External CSS**: Linked via \`<link rel="stylesheet" href="styles.css">\`.
2. **Internal CSS**: Defined inside \`<style>\` tags in \`<head>\`.
3. **Inline CSS**: Added directly inside element tags via \`style=""\`.
`,
        codeExample: {
          html: `<!DOCTYPE html>
<html>
<head>
  <style>
    .card {
      background: linear-gradient(135deg, #6366f1, #a855f7);
      color: white;
      padding: 30px;
      border-radius: 16px;
      box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.4);
      text-align: center;
    }
    .btn {
      background: #ffffff;
      color: #4f46e5;
      font-weight: bold;
      border: none;
      padding: 12px 24px;
      border-radius: 8px;
      cursor: pointer;
      margin-top: 15px;
    }
    .btn:hover {
      background: #f1f5f9;
      transform: translateY(-2px);
    }
  </style>
</head>
<body>
  <div class="card">
    <h2>CSS Gradient Card</h2>
    <p>Styled completely with modern CSS flexbox & background gradients.</p>
    <button class="btn">Interactive Hover Button</button>
  </div>
</body>
</html>`,
          title: "CSS Modern Card Demo",
        },
        quiz: {
          question: "What does CSS stand for?",
          options: [
            "Cascading Style Sheets",
            "Computer Style System",
            "Creative Style Syntax",
            "Colorful Sheet Standard",
          ],
          correctIndex: 0,
          explanation: "CSS stands for Cascading Style Sheets.",
        },
      },
      {
        id: "css-flexbox",
        title: "CSS Flexbox Layout",
        category: "CSS Layouts",
        readTime: "6 min read",
        summary: "Build flexible, responsive 1D layouts with display: flex, justify-content, and align-items.",
        content: `
### CSS Flexbox
The Flexible Box Layout Module makes it easier to design flexible responsive layout structure without using float or positioning.

### Key Flexbox Properties
- \`display: flex;\` — Defines a flex container.
- \`justify-content: center | space-between | space-around;\` — Aligns items along main axis.
- \`align-items: center | flex-start | flex-end;\` — Aligns items along cross axis.
- \`flex-direction: row | column;\` — Sets layout direction.

\`\`\`css
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}
\`\`\`
`,
        codeExample: {
          html: `<!DOCTYPE html>
<html>
<head>
  <style>
    .flex-container {
      display: flex;
      justify-content: space-between;
      gap: 15px;
      background: #f1f5f9;
      padding: 20px;
      border-radius: 12px;
    }
    .flex-item {
      flex: 1;
      background: #3b82f6;
      color: white;
      padding: 20px;
      text-align: center;
      font-weight: bold;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <h3>CSS Flexbox 3-Column Layout</h3>
  <div class="flex-container">
    <div class="flex-item">Box 1</div>
    <div class="flex-item">Box 2</div>
    <div class="flex-item">Box 3</div>
  </div>
</body>
</html>`,
          title: "CSS Flexbox Interactive Grid",
        },
        quiz: {
          question: "Which CSS property initiates a flexbox container?",
          options: ["display: flex;", "layout: flexbox;", "flex: 1;", "position: flex;"],
          correctIndex: 0,
          explanation: "Setting display: flex; turns an element into a flexbox container.",
        },
      },
    ],
  },
  {
    id: "javascript",
    title: "JavaScript Tutorial",
    icon: "⚡",
    color: "from-amber-400 to-yellow-500",
    description: "Learn JavaScript programming — variables, functions, DOM manipulation, async/await & ES6+.",
    lessons: [
      {
        id: "js-intro",
        title: "JavaScript Introduction",
        category: "JS Fundamentals",
        readTime: "5 min read",
        summary: "Understand JavaScript fundamentals, script placement, and changing HTML dynamically.",
        content: `
### What is JavaScript?
JavaScript is the world's most popular programming language. It is the programming language of the Web.

### What Can JavaScript Do?
- Change HTML content dynamically.
- Change HTML attribute values & CSS styles.
- Hide and show HTML elements.
- Handle user interactions, events, and API requests.

\`\`\`javascript
document.getElementById("demo").innerHTML = "Hello JavaScript!";
\`\`\`
`,
        codeExample: {
          html: `<!DOCTYPE html>
<html>
<body>
  <h2>Interactive JavaScript Counter</h2>
  <h1 id="counter" style="font-size: 48px; color: #2563eb;">0</h1>
  
  <button onclick="changeCount(1)" style="padding: 10px 20px; background: #22c55e; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">
    + Increase
  </button>
  
  <button onclick="changeCount(-1)" style="padding: 10px 20px; background: #ef4444; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; margin-left: 10px;">
    - Decrease
  </button>

  <script>
    let count = 0;
    function changeCount(val) {
      count += val;
      document.getElementById("counter").innerText = count;
    }
  </script>
</body>
</html>`,
          title: "JavaScript Interactive Counter App",
        },
        quiz: {
          question: "Inside which HTML element do we put JavaScript code?",
          options: ["<script>", "<js>", "<javascript>", "<scripting>"],
          correctIndex: 0,
          explanation: "JavaScript code is written inside <script> tags in HTML.",
        },
      },
      {
        id: "js-variables",
        title: "JS Variables & Data Types",
        category: "JS Fundamentals",
        readTime: "6 min read",
        summary: "Learn let, const, var, string, number, boolean, array, and object data types.",
        content: `
### Declaring JavaScript Variables
- \`const\` — Used for variables that will not be reassigned.
- \`let\` — Used for variables that can change.
- \`var\` — Legacy scope keyword (prefer \`let\`/\`const\` in modern JS).

\`\`\`javascript
const siteName = "TheCodeBrains";
let score = 100;
score += 50;

const user = {
  name: "Priya",
  role: "Developer"
};
\`\`\`
`,
        codeExample: {
          html: `<!DOCTYPE html>
<html>
<body>
  <h2>JS Object & Array Renderer</h2>
  <div id="output" style="background: #1e293b; color: #38bdf8; font-family: monospace; padding: 15px; border-radius: 8px;"></div>

  <script>
    const developer = {
      name: "Rahul Sharma",
      skills: ["React", "Next.js", "TypeScript", "Tailwind"],
      experienceYears: 4,
      isEmployed: true
    };

    document.getElementById("output").innerHTML = "<strong>Developer Name:</strong> " + developer.name + "<br><strong>Years Active:</strong> " + developer.experienceYears + " Years<br><strong>Skills:</strong> " + developer.skills.join(", ");
  </script>
</body>
</html>`,
          title: "JS Objects & Arrays Demo",
        },
        quiz: {
          question: "Which keyword declares a block-scoped constant variable in JavaScript?",
          options: ["const", "var", "let", "define"],
          correctIndex: 0,
          explanation: "The const keyword declares variables that cannot be reassigned.",
        },
      },
    ],
  },
  {
    id: "react",
    title: "React.js Tutorial",
    icon: "⚛️",
    color: "from-sky-400 to-blue-600",
    description: "Learn modern React — JSX, Components, Props, useState, useEffect, and custom hooks.",
    lessons: [
      {
        id: "react-intro",
        title: "React Introduction & JSX",
        category: "React Core",
        readTime: "6 min read",
        summary: "Understand React components, virtual DOM, and JSX syntax.",
        content: `
### What is React?
React is a JavaScript library created by Meta for building fast user interfaces based on reusable components.

### What is JSX?
JSX stands for JavaScript XML. It allows us to write HTML-like markup inside JavaScript code:

\`\`\`jsx
function WelcomeCard({ name }) {
  return (
    <div className="card">
      <h1>Hello, {name}!</h1>
      <p>Welcome to React learning portal.</p>
    </div>
  );
}
\`\`\`
`,
        codeExample: {
          html: `<!DOCTYPE html>
<html>
<head>
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
  <div id="root"></div>

  <script type="text/babel">
    function App() {
      const [liked, setLiked] = React.useState(false);
      return (
        <div style={{ padding: 20, fontFamily: 'system-ui', background: '#f8fafc', borderRadius: 12 }}>
          <h2>React State Toggle Demo</h2>
          <button 
            onClick={() => setLiked(!liked)}
            style={{
              padding: '10px 20px',
              background: liked ? '#ef4444' : '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: 8,
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            {liked ? '❤️ Liked Post' : '🤍 Like Post'}
          </button>
        </div>
      );
    }

    ReactDOM.createRoot(document.getElementById('root')).render(<App />);
  </script>
</body>
</html>`,
          title: "React Live State Component",
        },
        quiz: {
          question: "What is JSX in React?",
          options: [
            "JavaScript XML — Syntax extension for writing HTML in JS",
            "Java Server Extensions",
            "JSON Extra Standard",
            "JavaScript External XML parser",
          ],
          correctIndex: 0,
          explanation: "JSX is a syntax extension for JavaScript that allows writing HTML elements in React code.",
        },
      },
    ],
  },
  {
    id: "python",
    title: "Python Tutorial",
    icon: "🐍",
    color: "from-blue-600 to-emerald-600",
    description: "Master Python programming — clean syntax, functions, data structures, and automation scripts.",
    lessons: [
      {
        id: "python-intro",
        title: "Python Introduction & Syntax",
        category: "Python Basics",
        readTime: "5 min read",
        summary: "Learn Python indentation, printing, data types, and simple functions.",
        content: `
### What is Python?
Python is a high-level, general-purpose programming language known for its clear, human-readable syntax.

### Python Hello World
\`\`\`python
# This is a Python comment
print("Hello, TheCodeBrains Learners!")

name = "Priya"
age = 24
print(f"User {name} is {age} years old.")
\`\`\`

### Key Features
1. Easy to read and write.
2. Huge ecosystem for Web Dev (Django/FastAPI), AI/Data Science (NumPy, PyTorch), and Automation.
`,
        codeExample: {
          html: `<!DOCTYPE html>
<html>
<body>
  <h2>Python Syntax Cheat Sheet</h2>
  <pre style="background: #0f172a; color: #38bdf8; padding: 20px; border-radius: 12px; font-family: monospace;">
# Python Variables & Function
def greet_user(name, role="Developer"):
    return f"Welcome {name}, Role: {role}"

result = greet_user("Amit", "Full Stack Engineer")
print(result)
  </pre>
</body>
</html>`,
          title: "Python Syntax Overview",
        },
        quiz: {
          question: "How do you define a function in Python?",
          options: ["def functionName():", "function functionName()", "func functionName()", "create functionName()"],
          correctIndex: 0,
          explanation: "Python uses the 'def' keyword to define functions.",
        },
      },
    ],
  },
];

export function getCourseById(courseId: string): Course | undefined {
  return COURSES.find((c) => c.id === courseId);
}

export function getLessonById(courseId: string, lessonId: string): { lesson: Lesson; index: number; total: number } | undefined {
  const course = getCourseById(courseId);
  if (!course) return undefined;
  const index = course.lessons.findIndex((l) => l.id === lessonId);
  if (index === -1) return undefined;
  return {
    lesson: course.lessons[index],
    index,
    total: course.lessons.length,
  };
}
