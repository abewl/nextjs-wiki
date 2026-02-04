import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white text-gray-900 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link href="/">Nextjs Base</Link>
        </h1>
        <nav className="space-x-24">
          <Link href="/services">Services</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
