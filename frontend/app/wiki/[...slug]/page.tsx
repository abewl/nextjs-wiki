import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";

type PageProps = {
  params: Promise<{
    slug: string[];
  }>;
};

const CONTENT_ROOT = path.join(process.cwd(), "content", "docs");

export const dynamicParams = false;

export async function generateStaticParams(): Promise<
  Array<{ slug: string[] }>
> {
  const walk = (
    dir: string,
    base: string[] = [],
  ): Array<{ slug: string[] }> => {
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
      if (entry.isDirectory()) {
        return walk(path.join(dir, entry.name), [...base, entry.name]);
      }

      if (entry.isFile() && entry.name.endsWith(".md")) {
        if (entry.name === "index.md") return [];
        return [{ slug: [...base, entry.name.replace(/\.md$/, "")] }];
      }

      return [];
    });
  };

  return walk(CONTENT_ROOT);
}

export default async function WikiPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  const debug = {
    cwd: process.cwd(),
    slug,
    contentRoot: CONTENT_ROOT,
  };

  if (!slug || slug.length === 0) {
    return (
      <pre style={{ background: "#fee", padding: 16 }}>
        {JSON.stringify({ note: "NO SLUG RENDER", debug }, null, 2)}
      </pre>
    );
  }

  const directFile = path.join(CONTENT_ROOT, `${slug.join("/")}.md`);
  const indexFile = path.join(CONTENT_ROOT, ...slug, "index.md");

  const exists = {
    directFile,
    directExists: fs.existsSync(directFile),
    indexFile,
    indexExists: fs.existsSync(indexFile),
  };

  if (!exists.directExists && !exists.indexExists) {
    return (
      <pre style={{ background: "#fee", padding: 16 }}>
        {JSON.stringify({ note: "FILE NOT FOUND", debug, exists }, null, 2)}
      </pre>
    );
  }

  const absolutePath = exists.directExists ? directFile : indexFile;

  const markdownContent = fs.readFileSync(absolutePath, "utf8");

  return (
    <article>
      <pre style={{ background: "#eef", padding: 16 }}>
        {JSON.stringify(
          {
            note: "RENDERING MARKDOWN",
            // absolutePath,
          },
          null,
          2,
        )}
      </pre>

      <ReactMarkdown>{markdownContent}</ReactMarkdown>
    </article>
  );
}
