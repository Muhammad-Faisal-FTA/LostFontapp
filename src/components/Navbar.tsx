
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from 'next/image';
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import LogoutButton from "@/components/Logout";
import logo from '@/constants/Logo.png';

const navItems = [
  { name: "Lost", href: "/lost-item" },
  { name: "Report Lost", href: "/post-lost" },
  { name: "Found", href: "/found-item" },
  { name: "Report Found", href: "/post-find" },
  { name: "Profile", href: "/profile" },
  { name: "chat", href: "/chat" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const pathname = usePathname();

  // Check login status on mount and when pathname changes
  useEffect(() => {
    setHasMounted(true);

    const checkAuth = () => {
      const user = localStorage.getItem("user");
      setIsLoggedIn(!!user);
    };

    checkAuth();

    // Listen for login/logout from other tabs or programmatic events
    window.addEventListener("authChanged", checkAuth);

    return () => {
      window.removeEventListener("authChanged", checkAuth);
    };
  }, [pathname]); // ✅ Triggers re-check on route change

  if (!hasMounted) return null;

  return (
    <header className="bg-white shadow-md w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-1">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <Image src={logo} width={100} height={90} alt="Lost & Found" />
            </Link>
            <Link href="/">
              <h1 className="text-3xl font-bold ml-1">Lost & Found</h1>
            </Link>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-6 items-center">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-2 py-2 rounded-[5rem] text-gray-700 font-medium ${
                  pathname === item.href ? "bg-blue-500 text-white" : "hover:bg-gray-200"
                }`}
              >
                {item.name}
              </Link>
            ))}
            {!isLoggedIn ? (
              <>
                <Link href="/sign-In" className="px-1 py-2 text-blue-500 font-medium">
                  Login
                </Link>
                <Link href="/sign-Up" className="text-[0.87rem] text-center px-1 py-2 bg-blue-500 text-white rounded">
                  Sign Up
                </Link>
              </>
            ) : (
              <LogoutButton />
            )}
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
            {!isLoggedIn ? (
              <>
                <Link href="/sign-In" className=" py-1 bg-blue-500 text-white rounded-l" onClick={() => setIsOpen(false)}>
                  Login
                </Link>
                <Link href="/sign-Up" className=" py-1 bg-blue-500 text-white rounded-lg" onClick={() => setIsOpen(false)}>
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="px-4">
                <LogoutButton />
              </div>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
