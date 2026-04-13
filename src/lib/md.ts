import fs from "fs";
import path from "path";

const contentDir = path.join(process.cwd(), "content");

export function getMarkdownContent(filename: string): string {
  const filePath = path.join(contentDir, filename);
  try {
    return fs.readFileSync(filePath, "utf-8");
  } catch {
    return "";
  }
}

export function parseMarkdown(md: string): {
  title?: string;
  subtitle?: string;
  content: string;
  sections: { heading: string; content: string }[];
} {
  const lines = md.split("\n");
  let title = "";
  let subtitle = "";
  const sections: { heading: string; content: string }[] = [];
  let currentSection: { heading: string; content: string } | null = null;

  for (const line of lines) {
    if (line.startsWith("# ")) {
      title = line.replace(/^#\s+/, "").trim();
    } else if (line.startsWith("## ")) {
      if (currentSection && currentSection.content.trim()) {
        sections.push(currentSection);
      }
      currentSection = {
        heading: line.replace(/^##\s+/, "").trim(),
        content: "",
      };
    } else if (currentSection) {
      currentSection.content += (currentSection.content ? "\n" : "") + line;
    } else if (title && !subtitle && line.trim()) {
      subtitle = line.trim();
    }
  }

  if (currentSection) {
    sections.push(currentSection);
  }

  return {
    title: title || undefined,
    subtitle: subtitle || undefined,
    content: md,
    sections,
  };
}
