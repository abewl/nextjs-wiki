// components/Footer.tsx
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      {/* Footer top: Menus */}
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Company Info */}
        <div>
          <h2 className="text-lg font-bold mb-4">Nextjs Base</h2>
          <p className="text-gray-400">Footer text</p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-bold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-blue-400">
                Home
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-blue-400">
                Services
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-blue-400">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-blue-400">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h2 className="text-lg font-bold mb-4">Follow Us</h2>
          <div className="flex space-x-4">
            <Link href="#" className="hover:text-blue-400">
              <FaFacebookF />
            </Link>
            <Link href="#" className="hover:text-blue-400">
              <FaTwitter />
            </Link>
            <Link href="#" className="hover:text-blue-400">
              <FaInstagram />
            </Link>
            <Link href="#" className="hover:text-blue-400">
              <FaLinkedinIn />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="bg-gray-900 py-4 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Nextjs. All rights reserved.
      </div>
    </footer>
  );
}
