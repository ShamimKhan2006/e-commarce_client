"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    setMounted(true);
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    if (theme === "dark") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    }
  };

  if (!mounted) {
    return (
      <div className="w-10 h-10 flex items-center justify-center rounded-full border border-border/40 bg-secondary/20">
        <span className="w-5 h-5 block" />
      </div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-10 h-10 rounded-full border border-border bg-secondary/30 text-muted-foreground hover:text-foreground hover:bg-secondary/70 focus:outline-none focus:ring-2 focus:ring-primary/45 cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm"
      aria-label="Toggle dark mode"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-primary transition-all duration-500 rotate-0 scale-100" />
      ) : (
        <Moon className="h-5 w-5 text-primary transition-all duration-500 rotate-0 scale-100" />
      )}
    </button>
  );
}
