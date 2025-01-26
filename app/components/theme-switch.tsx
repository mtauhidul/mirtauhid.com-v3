"use client";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";
import * as React from "react";
import { FaCircleHalfStroke } from "react-icons/fa6";
import { Tooltip } from "react-tooltip";

const storageKey = "theme-preference";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}

export const ThemeSwitch: React.FC = () => {
  const { setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [currentTheme, setCurrentTheme] = React.useState<"light" | "dark">(
    "light"
  );

  const getColorPreference = (): "light" | "dark" => {
    if (typeof window !== "undefined") {
      const storedPreference = localStorage.getItem(storageKey);
      if (storedPreference) {
        return storedPreference as "light" | "dark";
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "light";
  };

  const reflectPreference = (theme: "light" | "dark") => {
    document.documentElement.classList.remove("bg-light", "bg-dark");
    document.documentElement.classList.add(`bg-${theme}`);
    setCurrentTheme(theme);
    setTheme(theme);
  };

  React.useEffect(() => {
    setMounted(true);
    const initTheme = getColorPreference();
    reflectPreference(initTheme);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      const newTheme = mediaQuery.matches ? "dark" : "light";
      localStorage.setItem(storageKey, newTheme);
      reflectPreference(newTheme);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [setTheme]);

  const toggleTheme = () => {
    const newTheme = currentTheme === "light" ? "dark" : "light";
    localStorage.setItem(storageKey, newTheme);
    reflectPreference(newTheme);
  };

  if (!mounted) {
    return (
      <FaCircleHalfStroke
        className="h-[14px] w-[14px] text-[#1c1c1c]"
        aria-hidden="true"
      />
    );
  }

  return (
    <button
      id="theme-toggle"
      aria-label={`${currentTheme} mode`}
      onClick={toggleTheme}
      className="flex items-center justify-center transition-opacity duration-300 hover:opacity-90"
      data-tooltip-id={`${currentTheme}-mode`}
    >
      <FaCircleHalfStroke
        className={`h-[14px] w-[14px] ${
          currentTheme === "dark" ? "text-[#D4D4D4]" : "text-[#1c1c1c]"
        }`}
      />
      <Tooltip
        id={`${currentTheme}-mode`}
        place="top"
        style={{
          backgroundColor: currentTheme === "dark" ? "#1C1C1C" : "#D4D4D4",
          color: currentTheme === "dark" ? "#D4D4D4" : "#1C1C1C",
          fontSize: "0.75rem",
          padding: "0.25rem 0.5rem",
          borderRadius: "0.25rem",
          boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.1)",
        }}
      >
        {currentTheme === "dark" ? "Light mode" : "Dark mode"}
      </Tooltip>
    </button>
  );
};
