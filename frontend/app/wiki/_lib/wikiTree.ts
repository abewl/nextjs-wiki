import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_ROOT = path.join(process.cwd(), "content", "docs");

export type WikiNode = {
  title: string;
  slug: string[];
  children?: WikiNode[];
  isSection?: boolean;
  order?: number;
};

interface Frontmatter {
  title?: string;
  order?: number;
  hide?: boolean;
  [key: string]: string | number | boolean | undefined;
}

function titleFromFilename(name: string) {
  return name
    .replace(/\.md$/, "")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function readFrontmatter(filePath: string): Frontmatter {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data } = matter(raw);
  return data as Frontmatter;
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

      const frontmatter = readFrontmatter(fullPath);
      if (frontmatter.hide) continue;

      nodes.push({
        title: frontmatter.title ?? titleFromFilename(entry.name),
        slug: [...baseSlug, entry.name.replace(/\.md$/, "")],
        order: frontmatter.order ?? 1000,
      });
    }
  }

  // nice stable ordering
  return nodes.sort((a, b) => a.title.localeCompare(b.title));
}
