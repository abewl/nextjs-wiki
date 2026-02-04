"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { WikiNode } from "../_lib/wikiTree";

function isActive(current: string[], target: string[]) {
  return current.join("/") === target.join("/");
}

function SidebarSearch({ collapsed }: { collapsed: boolean }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/wiki/search?q=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  };

  if (collapsed) return null;

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search wiki..."
        className="w-full px-3 py-2 border rounded text-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </form>
  );
}

function SidebarTreeNodes({
  nodes,
  currentSlug,
  depth = 0,
  collapsed = false,
  onLinkClick,
}: {
  nodes: WikiNode[];
  currentSlug: string[];
  depth?: number;
  collapsed?: boolean;
  onLinkClick?: () => void;
}) {
  return (
    <ul className="list-none pl-0">
      {nodes.map((node) => {
        const active = isActive(currentSlug, node.slug);
        return (
          <li key={node.slug.join("/")}>
            {node.isSection ? (
              <div
                className={`font-semibold py-1 text-gray-900 truncate`}
                style={{ paddingLeft: depth * (collapsed ? 0 : 12) }}
              >
                {!collapsed && node.title}
              </div>
            ) : (
              <Link
                href={`/wiki/${node.slug.join("/")}`}
                className={`block py-1 text-gray-500 hover:text-gray-900 hover:underline truncate ${
                  active ? "font-semibold text-gray-900" : "font-normal"
                }`}
                style={{ paddingLeft: depth * (collapsed ? 0 : 12) }}
                title={collapsed ? node.title : undefined}
                onClick={onLinkClick}
              >
                {!collapsed ? node.title : node.title[0]}
              </Link>
            )}
            {node.children && (
              <SidebarTreeNodes
                nodes={node.children}
                currentSlug={currentSlug}
                depth={depth + 1}
                collapsed={collapsed}
                onLinkClick={onLinkClick}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function SidebarTree({
  nodes,
  currentSlug,
}: {
  nodes: WikiNode[];
  currentSlug: string[];
}) {
  const [collapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLinkClick = () => {
    // On mobile, close the sidebar when a link is clicked
    if (window.innerWidth < 1024) {
      setMobileOpen(false);
    }
  };

  return (
    <div className="">
      {/* Backdrop for mobile */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          bg-white h-screen shadow-md transition-all duration-300 flex flex-col z-40
          fixed lg:static inset-y-0 left-0
          w-64
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Toggle button - mobile only, inside sidebar */}
        <div className="p-2 flex justify-end lg:hidden">
          <button
            className="p-2 text-gray-500 hover:text-gray-900 transition-transform duration-300"
            onClick={() => setMobileOpen(false)}
            aria-label="Collapse sidebar"
          >
            <span className="block text-xl">❮</span>
          </button>
        </div>

        {/* Search */}
        <div className="px-2">
          <SidebarSearch collapsed={collapsed} />
        </div>

        {/* Recursive nodes */}
        <div className="flex-1 overflow-y-auto px-2 pb-4">
          <SidebarTreeNodes
            nodes={nodes}
            currentSlug={currentSlug}
            collapsed={collapsed}
            onLinkClick={handleLinkClick}
          />
        </div>
      </aside>

      {/* Mobile open button - visible when sidebar is closed */}
      {!mobileOpen && (
        <button
          className="mt-3 lg:hidden z-30 p-2 bg-white rounded shadow-md text-gray-700 hover:text-gray-900"
          onClick={() => setMobileOpen(true)}
          aria-label="Open sidebar"
        >
          <span className="block text-xl">❯</span>
        </button>
      )}
    </div>
  );
}
