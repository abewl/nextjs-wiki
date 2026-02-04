import fs from "fs";
import path from "path";

const CONTENT_ROOT = path.join(process.cwd(), "content", "docs");

export type WikiNode = {
  title: string;
  slug: string[];
  children?: WikiNode[];
  isSection?: boolean;
};

function titleFromFilename(name: string) {
  return name
    .replace(/\.md$/, "")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function buildWikiTree(
  dir: string = CONTENT_ROOT,
  baseSlug: string[] = [],
): WikiNode[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  const nodes: WikiNode[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    // folder → section
    if (entry.isDirectory()) {
      const children = buildWikiTree(fullPath, [...baseSlug, entry.name]);

      if (children.length > 0) {
        nodes.push({
          title: titleFromFilename(entry.name),
          slug: [...baseSlug, entry.name],
          children,
          isSection: true,
        });
      }
    }

    // file → page (ignore index.md here)
    if (entry.isFile() && entry.name.endsWith(".md")) {
      if (entry.name === "index.md") continue;

      nodes.push({
        title: titleFromFilename(entry.name),
        slug: [...baseSlug, entry.name.replace(/\.md$/, "")],
      });
    }
  }

  // nice stable ordering
  return nodes.sort((a, b) => a.title.localeCompare(b.title));
}
