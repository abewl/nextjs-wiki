// app/layout.tsx
import "./globals.css"; // your global styles
import React, { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type LayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <head>
        <title>Game Wiki</title>
      </head>
      <body className="flex flex-col min-h-screen">
        <Header />

        {/* Main content */}
        <main className="flex-1 container mx-auto p-4">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
