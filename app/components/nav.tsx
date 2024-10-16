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
          <Link href="/">
            <Image src={Logo} alt="Logo" width={48} height={48} priority />
          </Link>
        </div>
        <div className="flex flex-row gap-4 mt-6 md:mt-0 md:ml-auto items-center">
          {Object.entries(navItems).map(([path, { name }]) => (
            <Link
              key={path}
              href={path}
              className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative"
            >
              {name}
            </Link>
          ))}
          <ThemeSwitch />
        </div>
      </div>
    </nav>
  );
}
