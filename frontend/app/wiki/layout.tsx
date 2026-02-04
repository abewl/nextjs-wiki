import type { ReactNode } from "react";
import { buildWikiTree } from "./_lib/wikiTree";
import { SidebarTree } from "./_components/sidebar";

export default async function WikiLayout({
  children,
  params,
}: {
  children: ReactNode;
  params?: Promise<{ slug?: string[] }>;
}) {
  const tree = buildWikiTree();
  const resolvedParams = params ? await params : undefined;
  const currentSlug = resolvedParams?.slug ?? [];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "240px 1fr",
        minHeight: "100vh",
      }}
    >
      <aside
        style={{
          borderRight: "1px solid #e5e7eb",
          padding: "1rem",
          fontSize: "14px",
        }}
      >
        <strong style={{ display: "block", marginBottom: 8 }}>Wiki</strong>

        <SidebarTree nodes={tree} currentSlug={currentSlug} />
      </aside>

      <main style={{ padding: "2rem" }}>{children}</main>
    </div>
  );
}
