const AboutPage = () => {
  return (
    <div className="container mx-auto p-4 mt-6">
      <h1 className="text-3xl font-bold mb-6">About</h1>

      <p className="mb-4 text-zinc-700">
        This wiki was built in a day as I needed to build a clean and simple
        wiki using Next.js. It can be surprising to find that it is not easy to
        find a lightweight NextJS template for wikis. I wanted something fast
        and purely static to make it easy to maintain and deploy.
      </p>

      <p className="mb-4 text-zinc-700">
        If you have the same need for a lightweight, static build only wiki, try
        it out. Next in line, is to build a backend that will pull and write
        content for API and large knowledge bases or for token based design
        system, while maintaining the static generation of the wiki pages.
      </p>
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
  );
};

export default AboutPage;
