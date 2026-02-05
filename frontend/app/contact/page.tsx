import Link from "next/link";

const ContactPage = () => {
  return (
    <div className="container mx-auto p-4 mt-6">
      <h1 className="text-3xl font-bold mb-6">Contact</h1>
      <Link
        href="https://github.com/abewl/"
        className="font-medium text-black underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        <p>https://github.com/abewl/</p>
      </Link>
    </div>
  );
};

export default ContactPage;
