import fs from "fs";
import path from "path";

export type StructuredNarrative = {
  kind: "structured";
  problem: string;
  role: string;
  constraints: string[];
  whatIBuilt: string[];
  results: string[];
};

export type ArticleNarrative = {
  kind: "article";
  html: string;
};

export type ProjectNarrative = StructuredNarrative | ArticleNarrative;

const RESOURCES_DIR = path.join(process.cwd(), "src/app/content/resources");

const sectionKeyMap: Record<string, keyof Omit<StructuredNarrative, "kind">> = {
  "problem": "problem",
  "my role": "role",
  "constraints": "constraints",
  "what i built": "whatIBuilt",
  "results": "results",
};

function parseBulletList(text: string): string[] {
  return text
    .split("\n")
    .map((line) => line.replace(/^-\s*/, "").trim())
    .filter(Boolean);
}

function parseParagraph(text: string): string {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .join(" ");
}

function isStructuredFormat(raw: string): boolean {
  const lower = raw.toLowerCase();
  return lower.includes("## problem") && lower.includes("## my role");
}

function resolveImagePath(src: string): string {
  if (src.startsWith("/") || src.startsWith("http")) return src;
  return `/${src}`;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function markdownToHtml(raw: string): string {
  const lines = raw.split("\n");
  const htmlParts: string[] = [];
  let inList = false;
  let inTable = false;
  let tableHeaderDone = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trimEnd();

    // Horizontal rule
    if (/^---+\s*$/.test(trimmed)) {
      if (inList) { htmlParts.push("</ul>"); inList = false; }
      if (inTable) { htmlParts.push("</tbody></table>"); inTable = false; tableHeaderDone = false; }
      htmlParts.push("<hr />");
      continue;
    }

    // Table row
    if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
      if (inList) { htmlParts.push("</ul>"); inList = false; }

      // Skip separator row (|---|---|)
      if (/^\|[\s\-:|]+\|$/.test(trimmed)) {
        tableHeaderDone = true;
        continue;
      }

      const cells = trimmed.slice(1, -1).split("|").map((c) => c.trim());

      if (!inTable) {
        htmlParts.push("<table>");
        htmlParts.push("<thead><tr>");
        for (const cell of cells) {
          htmlParts.push(`<th>${escapeHtml(cell)}</th>`);
        }
        htmlParts.push("</tr></thead><tbody>");
        inTable = true;
        tableHeaderDone = false;
        continue;
      }

      htmlParts.push("<tr>");
      for (const cell of cells) {
        htmlParts.push(`<td>${escapeHtml(cell)}</td>`);
      }
      htmlParts.push("</tr>");
      continue;
    }

    if (inTable) {
      htmlParts.push("</tbody></table>");
      inTable = false;
      tableHeaderDone = false;
    }

    // Standalone image line: ![alt](src)
    const imageMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imageMatch) {
      if (inList) { htmlParts.push("</ul>"); inList = false; }
      const alt = escapeHtml(imageMatch[1]);
      const src = resolveImagePath(imageMatch[2]);
      htmlParts.push(`<figure><img src="${src}" alt="${alt}" loading="lazy" />${alt ? `<figcaption>${alt}</figcaption>` : ""}</figure>`);
      continue;
    }

    // Headings
    if (trimmed.startsWith("### ")) {
      if (inList) { htmlParts.push("</ul>"); inList = false; }
      htmlParts.push(`<h4>${applyInline(trimmed.slice(4).trim())}</h4>`);
      continue;
    }
    if (trimmed.startsWith("## ")) {
      if (inList) { htmlParts.push("</ul>"); inList = false; }
      htmlParts.push(`<h3>${applyInline(trimmed.slice(3).trim())}</h3>`);
      continue;
    }
    if (trimmed.startsWith("# ")) {
      if (inList) { htmlParts.push("</ul>"); inList = false; }
      htmlParts.push(`<h2>${applyInline(trimmed.slice(2).trim())}</h2>`);
      continue;
    }

    // Unordered list items
    if (/^[-*]\s/.test(trimmed)) {
      if (!inList) { htmlParts.push("<ul>"); inList = true; }
      htmlParts.push(`<li>${applyInline(trimmed.replace(/^[-*]\s*/, ""))}</li>`);
      continue;
    }

    // Ordered list items
    if (/^\d+\.\s/.test(trimmed)) {
      if (!inList) { htmlParts.push("<ol>"); inList = true; }
      htmlParts.push(`<li>${applyInline(trimmed.replace(/^\d+\.\s*/, ""))}</li>`);
      continue;
    }

    // Close list if we hit a non-list line
    if (inList) {
      // Check if previous list was ordered or unordered
      const lastOpen = htmlParts.findLast((p) => p === "<ul>" || p === "<ol>");
      htmlParts.push(lastOpen === "<ol>" ? "</ol>" : "</ul>");
      inList = false;
    }

    // Empty line
    if (!trimmed) {
      continue;
    }

    // Regular paragraph
    htmlParts.push(`<p>${applyInline(trimmed)}</p>`);
  }

  if (inList) {
    const lastOpen = htmlParts.findLast((p) => p === "<ul>" || p === "<ol>");
    htmlParts.push(lastOpen === "<ol>" ? "</ol>" : "</ul>");
  }
  if (inTable) {
    htmlParts.push("</tbody></table>");
  }

  return htmlParts.join("\n");
}

function applyInline(text: string): string {
  // Handle images before escaping (they contain special chars)
  let result = text.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    (_, alt, src) => `<img src="${resolveImagePath(src)}" alt="${escapeHtml(alt)}" loading="lazy" />`,
  );
  // Escape remaining HTML
  result = result.replace(/&(?!lt;|gt;|amp;|quot;)/g, "&amp;");
  // Bold
  result = result.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  // Italic
  result = result.replace(/\*(.+?)\*/g, "<em>$1</em>");
  // Inline code
  result = result.replace(/`(.+?)`/g, "<code>$1</code>");
  return result;
}

function parseStructured(raw: string): StructuredNarrative {
  const narrative: StructuredNarrative = {
    kind: "structured",
    problem: "",
    role: "",
    constraints: [],
    whatIBuilt: [],
    results: [],
  };

  const sections = raw.split(/^## /m).slice(1);

  for (const section of sections) {
    const newlineIndex = section.indexOf("\n");
    if (newlineIndex === -1) continue;

    const heading = section.slice(0, newlineIndex).trim().toLowerCase();
    const body = section.slice(newlineIndex + 1).trim();
    const key = sectionKeyMap[heading];

    if (!key) continue;

    if (key === "problem" || key === "role") {
      narrative[key] = parseParagraph(body);
    } else {
      narrative[key] = parseBulletList(body);
    }
  }

  return narrative;
}

export function parseProjectMarkdown(raw: string): ProjectNarrative {
  if (isStructuredFormat(raw)) {
    return parseStructured(raw);
  }

  return {
    kind: "article",
    html: markdownToHtml(raw),
  };
}

export function getProjectNarrative(slug: string): ProjectNarrative {
  const filePath = path.join(RESOURCES_DIR, `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf-8");
  return parseProjectMarkdown(raw);
}
