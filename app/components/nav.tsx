import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/logo.png";
import { ThemeSwitch } from "./theme-switch";

const navItems = {
  "/": { name: "Home" },
  "/projects": { name: "Projects" },
  "/blog": { name: "Blog" },
};

export function Navbar() {
  return (
    <nav className="lg:mb-16 mb-12 py-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div className="flex items-center">
          <Link href="/" aria-label="Home">
            <Image src={Logo} alt="Logo" width={48} height={48} priority />
          </Link>
        </div>
        <div className="flex flex-row gap-2 mt-6 md:mt-0 md:ml-auto items-center">
          {Object.entries(navItems).map(([path, { name }]) => (
            <Link
              key={path}
              href={path}
              className="transition-all hover:text-black dark:hover:text-neutral-100 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-md px-3 py-1 flex align-middle relative"
            >
              {name}
            </Link>
          ))}
          <div className="ml-2">
            <ThemeSwitch />
          </div>
        </div>
      </div>
    </nav>
  );
}
