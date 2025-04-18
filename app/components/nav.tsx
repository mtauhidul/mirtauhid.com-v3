"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = {
  "/": { name: "Home" },
  "/projects": { name: "Projects" },
  "/blog": { name: "Blog" },
};

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="py-6 mb-16">
      <nav className="max-w-4xl mx-auto px-5 flex flex-col sm:flex-row sm:items-center justify-between">
        <div className="flex items-center">
          <Link
            href="/"
            aria-label="Home"
            className="transition-opacity hover:opacity-80 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            <div className="inline-block text-3xl font-medium px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg border-2 border-green-200 dark:border-green-800">
              M
            </div>
          </Link>
        </div>

        <div className="flex items-center mt-6 sm:mt-0 space-x-1">
          {Object.entries(navItems).map(([path, { name }]) => {
            const isActive = pathname === path;

            return (
              <Link
                key={path}
                href={path}
                className={`
                  px-4 py-2 rounded-md text-sm font-medium transition-all 
                  ${
                    isActive
                      ? "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                  }
                `}
              >
                {name}
              </Link>
            );
          })}

          {/* <div className="ml-1 p-1">
            <ThemeSwitch />
          </div> */}
        </div>
      </nav>
    </header>
  );
}
