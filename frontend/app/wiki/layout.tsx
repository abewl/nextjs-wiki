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
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className="shrink-0 border-r border-gray-200 transition-all duration-300
                        w-12 lg:w-64"
      >
        <SidebarTree nodes={tree} currentSlug={currentSlug} />
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4 md:p-8">{children}</main>
    </div>
  );
}
