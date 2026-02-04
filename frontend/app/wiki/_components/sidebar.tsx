import Link from "next/link";
import { WikiNode } from "../_lib/wikiTree";

function isActive(current: string[], target: string[]) {
  return current.join("/") === target.join("/");
}

export function SidebarTree({
  nodes,
  currentSlug,
  depth = 0,
}: {
  nodes: WikiNode[];
  currentSlug: string[];
  depth?: number;
}) {
  return (
    <ul style={{ listStyle: "none", paddingLeft: depth * 12 }}>
      {nodes.map((node) => {
        const active = isActive(currentSlug, node.slug);

        return (
          <li key={node.slug.join("/")}>
            {node.isSection ? (
              <div
                style={{
                  fontWeight: 600,
                  padding: "4px 0",
                  color: "#111",
                }}
              >
                {node.title}
              </div>
            ) : (
              <Link
                href={`/wiki/${node.slug.join("/")}`}
                style={{
                  display: "block",
                  padding: "4px 0",
                  fontWeight: active ? 600 : 400,
                  color: active ? "#111" : "#555",
                  textDecoration: "none",
                }}
              >
                {node.title}
              </Link>
            )}

            {node.children && (
              <SidebarTree
                nodes={node.children}
                currentSlug={currentSlug}
                depth={depth + 1}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}
