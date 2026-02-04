"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import Fuse from "fuse.js";
import Link from "next/link";
import { WikiPage } from "../_lib/wikiSearch";

export default function WikiSearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.trim() || "";

  const [pages, setPages] = useState<WikiPage[]>([]);
  const [results, setResults] = useState<WikiPage[]>([]);

  // Load search index once on mount
  useEffect(() => {
    let cancelled = false;

    fetch("/search-index.json")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setPages(data);
      })
      .catch((err) => console.error("Failed to load search index:", err));

    return () => {
      cancelled = true;
    };
  }, []);

  // Create a Fuse instance, memoized based on pages
  const fuse = useMemo(() => {
    if (pages.length === 0) return null;

    return new Fuse(pages, {
      keys: [
        { name: "title", weight: 3 },
        { name: "headers", weight: 2 },
        { name: "content", weight: 1 },
      ],
      threshold: 0.3,
    });
  }, [pages]);

  // Compute results whenever query or fuse changes
  const searchResults = useMemo(() => {
    if (!query || !fuse) return [];
    return fuse.search(query).map((r) => r.item);
  }, [query, fuse]);

  // Sync searchResults into state if needed for future features
  useEffect(() => {
    setResults(searchResults);
  }, [searchResults]);

  return (
    <div style={{ padding: 16 }}>
      <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16 }}>
        Search results for {query}
      </h1>

      {results.length === 0 && <p>No results found.</p>}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {results.map((page) => (
          <li key={page.slug} style={{ marginBottom: 8 }}>
            <Link
              href={`/wiki/${page.slug}`}
              style={{
                fontWeight: 600,
                color: "#0070f3",
                textDecoration: "none",
              }}
            >
              {page.title}
            </Link>
            {page.headers.length > 0 && (
              <p style={{ fontSize: 12, color: "#555", margin: "2px 0 0 0" }}>
                Sections: {page.headers.join(", ")}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
