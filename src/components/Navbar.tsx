"use client";

import { useState } from "react";
import Link from "next/link";
import Image from 'next/image'
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react"; // For mobile menu icons
import logo from '@/constants/Logo.png'

const navItems = [
  { name: "Lost", href: "/lost-item" },
  { name: "Report Lost", href: "/post-lost" },
  { name: "Found", href: "/found-item" },
  { name: "Report Found", href: "/post-find" },
  { name: "Profile", href: "/profile" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-md w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Image src={logo} width={100} height={90} alt="Lost & Found"  />
            <h1 className="text-3xl font-bold ml-2">Lost & Found</h1>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 rounded-lg text-gray-700 font-medium ${
                  pathname === item.href ? "bg-blue-500 text-white" : "hover:bg-gray-200"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link href="/login" className="px-4 py-2 text-blue-500 font-medium">
              Login
            </Link>
            <Link href="/sign-out" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
              Sign Out
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-gray-700">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <nav className="md:hidden flex flex-col space-y-2 pb-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 py-2 block ${
                  pathname === item.href ? "bg-blue-500 text-white" : "hover:bg-gray-200"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link href="/login" className="px-4 py-2 text-blue-500" onClick={() => setIsOpen(false)}>
              Login
            </Link>
            <Link href="/sign-out" className="px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={() => setIsOpen(false)}>
              Sign Out
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
