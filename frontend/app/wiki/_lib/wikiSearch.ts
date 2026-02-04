// app/wiki/_lib/wikiSearch.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type WikiPage = {
  slug: string; // matches route [...slug]
  title: string; // frontmatter title or fallback
  headers: string[]; // all H2 headers
  content: string; // full Markdown content
  tags?: string[]; // optional frontmatter tags
};

// Base folder containing all wiki pages
const WIKI_DIR = path.join(process.cwd(), "content", "docs");
console.log("Scanning wiki folder:", WIKI_DIR);
/**
 * Recursively read Markdown files and return WikiPage[]
 * Excludes the _lib folder
 */
function readWikiFiles(dir: string, parentSlug = ""): WikiPage[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let pages: WikiPage[] = [];

  for (const entry of entries) {
    if (entry.name === "_lib" || entry.name === "_components") continue;
    if (entry.name.startsWith(".")) continue; // skip hidden files

    const fullPath = path.join(dir, entry.name);
    const slugPart = parentSlug
      ? `${parentSlug}/${entry.name.replace(/\.md$/, "")}`
      : entry.name.replace(/\.md$/, "");

    if (entry.isDirectory()) {
      pages = pages.concat(readWikiFiles(fullPath, slugPart));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      const raw = fs.readFileSync(fullPath, "utf-8");
      const parsed = matter(raw);

      const headers = Array.from(
        parsed.content.matchAll(/^## (.+)$/gm),
        (m) => m[1],
      );

      const title =
        (parsed.data.title as string) ||
        parsed.content.match(/^# (.+)/)?.[1] ||
        entry.name.replace(/\.md$/, "");

      const tags = parsed.data.tags as string[] | undefined;

      pages.push({
        slug: slugPart,
        title,
        headers,
        content: parsed.content,
        tags,
      });
    }
  }

  return pages;
}

/**
 * Public function to get all wiki pages for search
 */
export function getWikiPages(): WikiPage[] {
  return readWikiFiles(WIKI_DIR);
}
