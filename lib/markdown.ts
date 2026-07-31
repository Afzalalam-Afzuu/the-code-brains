// lib/markdown.ts
import { autoFormatAffiliateLink } from './affiliate-links';

/**
 * A lightweight, safe Markdown to HTML parser for Server Side Rendering.
 * Handles headings, bold/italic, lists, blockquotes, links, and paragraphs.
 * Auto formats affiliate links with rel="noopener noreferrer nofollow sponsored".
 */
export function parseMarkdown(markdown: string): string {
  if (!markdown) return '';

  let html = markdown;

  // Escape HTML tags to prevent XSS (allowing only markdown formatting)
  html = html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Headings
  html = html.replace(/^### (.*$)/gim, '<h4 class="text-base font-extrabold text-slate-800 mt-6 mb-2">$1</h4>');
  html = html.replace(/^## (.*$)/gim, '<h3 class="text-lg sm:text-xl font-black text-slate-900 mt-8 mb-3">$1</h3>');
  html = html.replace(/^# (.*$)/gim, '<h2 class="text-xl sm:text-2xl font-black text-slate-900 mt-10 mb-4">$1</h2>');

  // Blockquotes
  html = html.replace(/^\> (.*$)/gim, '<blockquote class="border-l-4 border-indigo-500 pl-4 py-1 italic bg-slate-50 rounded-r-xl text-slate-650 my-4">$1</blockquote>');

  // Unordered Lists
  html = html.replace(/^\s*-\s+(.*$)/gim, '<li class="text-slate-600 text-sm leading-relaxed mb-1.5 ml-4 list-disc">$1</li>');
  html = html.replace(/^\s*\*\s+(.*$)/gim, '<li class="text-slate-600 text-sm leading-relaxed mb-1.5 ml-4 list-disc">$1</li>');

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-extrabold text-slate-900">$1</strong>');
  
  // Italic
  html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
  html = html.replace(/_(.*?)_/g, '<em class="italic">$1</em>');

  // Links: [Text](URL) - auto inject affiliate tags and rel="noopener noreferrer nofollow sponsored"
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, label, rawUrl) => {
    const formattedUrl = autoFormatAffiliateLink(rawUrl);
    const isAffiliate = formattedUrl.includes('tag=') || formattedUrl.includes('affid=') || formattedUrl.includes('referralCode=');
    const relAttr = isAffiliate ? 'rel="noopener noreferrer nofollow sponsored"' : 'rel="noopener noreferrer"';
    
    return `<a href="${formattedUrl}" target="_blank" ${relAttr} class="text-[#2874f0] hover:underline font-bold inline-flex items-center gap-0.5">${label}</a>`;
  });

  // Paragraphs
  const paragraphs = html.split(/\n\n+/);
  const formattedParagraphs = paragraphs.map(p => {
    const trimmed = p.trim();
    if (!trimmed) return '';
    if (trimmed.startsWith('<h') || trimmed.startsWith('<blockquote') || trimmed.startsWith('<li') || trimmed.startsWith('<ul')) {
      return trimmed;
    }
    return `<p class="text-slate-650 text-sm leading-relaxed mb-5">${trimmed.replace(/\n/g, '<br />')}</p>`;
  });

  return formattedParagraphs.join('\n');
}
