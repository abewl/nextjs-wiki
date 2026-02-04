"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { WikiNode } from "../_lib/wikiTree";

function isActive(current: string[], target: string[]) {
  return current.join("/") === target.join("/");
}

// Small search bar for the sidebar
function SidebarSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/wiki/search?q=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 12 }}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search wiki..."
        style={{
          width: "100%",
          padding: "4px 8px",
          borderRadius: 4,
          border: "1px solid #ccc",
          fontSize: 14,
        }}
      />
    </form>
  );
}

// Recursive sidebar tree (no search bar inside)
function SidebarTreeNodes({
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
              <SidebarTreeNodes
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

// Top-level SidebarTree wrapper (search bar only once)
export function SidebarTree({
  nodes,
  currentSlug,
}: {
  nodes: WikiNode[];
  currentSlug: string[];
}) {
  return (
    <div>
      {/* Render search bar only once at the top */}
      <SidebarSearch />

      {/* Recursive tree nodes */}
      <SidebarTreeNodes nodes={nodes} currentSlug={currentSlug} />
    </div>
  );
}
