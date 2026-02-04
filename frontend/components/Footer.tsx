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
    <footer className="bg-gray-800 text-white mt-auto ">
      {/* Footer top: Menus */}
      <div className="container md:mx-12 px-6 py-8 grid grid-cols-1 md:grid-cols-6 gap-6">
        {/* Page Info */}
        <div>
          <span className="text-lg font-bold">Wiki</span>
          <p className="text-sm text-gray-400 mt-6">Simple NextJS Wiki</p>
        </div>

        <div></div>
        <div></div>

        {/* Quick Links */}
        <div>
          <span className="text-md font-bold mb-4">Quick Links</span>
          <ul className="space-y-2 text-sm mt-6">
            <li>
              <Link href="/" className="hover:text-blue-700">
                Home
              </Link>
            </li>
            <li>
              <Link href="/wiki" className="hover:text-blue-700">
                Wiki
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-blue-700">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-blue-700">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <span className="text-md font-bold mb-4">Contributors</span>
          <ul className="space-y-2 text-sm mt-6">
            <li>
              <Link href="/" className="hover:text-blue-700">
                Contributors
              </Link>
            </li>
            <li>
              <Link href="/wiki" className="hover:text-blue-700">
                Contributors
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-blue-700">
                Contributors
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <span className="text-md font-bold">Follow Us</span>
          <div className="flex space-x-4 mt-6">
            <Link href="#" className="hover:text-blue-700">
              <FaFacebookF />
            </Link>
            <Link href="#" className="hover:text-blue-700">
              <FaTwitter />
            </Link>
            <Link href="#" className="hover:text-blue-700">
              <FaInstagram />
            </Link>
            <Link href="#" className="hover:text-blue-700">
              <FaLinkedinIn />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="bg-gray-900 py-4 text-center text-gray-400 text-xs">
        &copy; {new Date().getFullYear()} Nextjs. All rights reserved.
      </div>
    </footer>
  );
}
