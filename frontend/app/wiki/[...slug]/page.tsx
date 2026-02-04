import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";
import matter from "gray-matter";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import type { Components } from "react-markdown";

type PageProps = {
  params: Promise<{
    slug: string[];
  }>;
};

const CONTENT_ROOT = path.join(process.cwd(), "content", "docs");

export const dynamicParams = false;

const markdownComponents: Components = {
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-700 my-4">
      {children}
    </blockquote>
  ),
  code: ({ className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || "");

    if (match) {
      return (
        <SyntaxHighlighter
          style={oneDark}
          language={match[1]}
          PreTag="div"
          className="rounded-md my-4"
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      );
    }

    return (
      <code
        className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono text-pink-600"
        {...props}
      >
        {children}
      </code>
    );
  },
};

function walk(dir: string, base: string[] = []): Array<{ slug: string[] }> {
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
}

export async function generateStaticParams(): Promise<
  Array<{ slug: string[] }>
> {
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
  const { data: frontmatter, content: markdownContent } = matter(
    fs.readFileSync(absolutePath, "utf8"),
  );
  const rawTitle = frontmatter.title ?? slug[slug.length - 1];

  const pageTitle = rawTitle
    .replace(/_/g, " ")
    .replace(/^./, (c: string) => c.toUpperCase());

  return (
    <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-[300px] md:max-w-full mx-auto sm:px-4 md:px-4">
      <h1>{pageTitle}</h1>
      <ReactMarkdown components={markdownComponents}>
        {markdownContent}
      </ReactMarkdown>
    </article>
  );
}
