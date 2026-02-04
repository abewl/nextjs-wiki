import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex md:min-h-[900px] min-h-screen items-center justify-center font-sans">
      <main className="flex w-full max-w-3xl flex-col items-center justify-between py-12 mb-12 px-8 sm:items-start">
        <div className="flex flex-row">
          <Image
            src="/wiki-logo.svg"
            alt="Wiki Logo"
            width={120}
            height={120}
            priority
          />
          <span className="text-5xl m-auto font-bold">
            <Link href="/">Wiki</Link>
          </span>
        </div>

        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left mt-8">
          <h1 className=" text-black leading-8">
            Simple NextJS Wiki template <br />
            with essential batteries
          </h1>
          <span className="max-w-lg text-md leading-6 text-zinc-700"></span>
          <ul className="max-w-lg text-md leading-6 text-zinc-700">
            <li>Static deployment</li>
            <li>Slug routing for nested pages</li>
            <li>
              Markdown files content parsing with{" "}
              <Link
                className="text-blue-800 hover:text-blue-900"
                href="https://www.npmjs.com/package/react-markdown"
              >
                react-markdown
              </Link>
            </li>
            <li>
              Frontmatter with{" "}
              <Link
                className="text-blue-800 hover:text-blue-900"
                href="https://www.npmjs.com/package/gray-matter"
              >
                gray-matter
              </Link>
            </li>
            <li>Sidebar nav with page tree build</li>
            <li>
              Simple search build-time page index with{" "}
              <Link
                className="text-blue-800 hover:text-blue-900"
                href="https://www.fusejs.io/"
              >
                Fusejs
              </Link>
            </li>
            <li>
              Markdown auto-styling and code highlight with{" "}
              <Link
                className="text-blue-800 hover:text-blue-900"
                href="https://www.npmjs.com/package/react-highlight?activeTab=readme"
              >
                react-highlight
              </Link>
            </li>
          </ul>
        </div>

        {/* Call-to-action buttons */}
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row mt-8">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-black px-5 text-white transition-colors hover:bg-zinc-800 md:w-[180px]"
            href="/wiki"
          >
            Demo the Wiki
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-black/20 px-5 transition-colors hover:border-transparent hover:bg-zinc-100 md:w-[180px]"
            href="/about"
          >
            About the project
          </a>
        </div>

        {/* Optional description or resources */}
        <div className="mt-16 text-zinc-600 text-sm max-w-md sm:text-left text-center">
          <p>
            Check out the{" "}
            <a
              href="https://github.com/abewl/nextjs-wiki"
              className="font-medium text-black underline"
            >
              NextJS Wiki Github page
            </a>
            .
          </p>
        </div>
      </main>
    </div>
  );
}
