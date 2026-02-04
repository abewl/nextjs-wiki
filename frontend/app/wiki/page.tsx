import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";

const CONTENT_ROOT = path.join(process.cwd(), "content", "docs");

export default function WikiIndexPage() {
  const absolutePath = path.join(CONTENT_ROOT, "index.md");

  const markdownContent = fs.readFileSync(absolutePath, "utf8");

  return (
    <article>
      <ReactMarkdown>{markdownContent}</ReactMarkdown>
    </article>
  );
}
