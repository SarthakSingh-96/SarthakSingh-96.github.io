"use client";

import { useCallback, useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

type ThemeToggleVariant = "circle" | "circle-blur" | "rectangle" | "gif" | "polygon";
type ThemeToggleStart =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "center";

type ThemeToggleOptions = {
  variant?: ThemeToggleVariant;
  start?: ThemeToggleStart;
  blur?: boolean;
  gifUrl?: string;
};

type DocumentWithViewTransition = Document & {
  startViewTransition?: (callback: () => void) => {
    ready: Promise<void>;
    finished: Promise<void>;
  };
};

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const getClipPath = (start: ThemeToggleStart, open: boolean) => {
  const positions: Record<ThemeToggleStart, string> = {
    "top-left": "0% 0%",
    "top-right": "100% 0%",
    "bottom-left": "0% 100%",
    "bottom-right": "100% 100%",
    center: "50% 50%",
  };

  return `circle(${open ? "150%" : "0%"} at ${positions[start]})`;
};

export function useThemeToggle({
  variant = "circle",
  start = "center",
  blur = false,
}: ThemeToggleOptions = {}) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDark = mounted ? resolvedTheme === "dark" : true;

  useEffect(() => {
    setMounted(true);
  }, []);

  const setThemeWithTransition = useCallback(
    (nextTheme: "light" | "dark") => {
      if (!mounted) return;

      const doc = document as DocumentWithViewTransition;
      const shouldAnimate =
        typeof doc.startViewTransition === "function" &&
        !prefersReducedMotion() &&
        variant !== "rectangle";

      if (!shouldAnimate) {
        setTheme(nextTheme);
        return;
      }

      if (blur) {
        document.documentElement.classList.add("theme-transition-blur");
      }

      const transition = doc.startViewTransition?.(() => {
        setTheme(nextTheme);
      });

      transition?.ready
        .then(() => {
          document.documentElement.animate(
            {
              clipPath: [
                getClipPath(start, false),
                getClipPath(start, true),
              ],
            },
            {
              duration: variant === "circle-blur" ? 760 : 620,
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
              pseudoElement: "::view-transition-new(root)",
            },
          );
        })
        .catch(() => {
          setTheme(nextTheme);
        })
        .finally(() => {
          transition.finished.finally(() => {
            document.documentElement.classList.remove("theme-transition-blur");
          });
        });
    },
    [blur, mounted, setTheme, start, variant],
  );

  const toggleTheme = useCallback(() => {
    setThemeWithTransition(isDark ? "light" : "dark");
  }, [isDark, setThemeWithTransition]);

  return {
    isDark,
    toggleTheme,
    setCrazyDarkTheme: () => setThemeWithTransition("dark"),
    setCrazyLightTheme: () => setThemeWithTransition("light"),
  };
}

export function ThemeToggleButton({
  variant = "circle",
  start = "top-right",
  blur = true,
  gifUrl,
  className,
}: ThemeToggleOptions & {
  className?: string;
}) {
  const { isDark, toggleTheme } = useThemeToggle({ variant, start, blur, gifUrl });

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "group relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-[#D7E2EA]/20 bg-[#111316]/90 text-[#D7E2EA] shadow-2xl shadow-black/30 backdrop-blur-lg transition hover:border-[#D7E2EA]/45 hover:bg-[#D7E2EA]/10 focus:outline-none focus:ring-2 focus:ring-[#D7E2EA]/60",
        className,
      )}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={!isDark}
      title="Theme toggle inspired by Skiper UI"
    >
      {variant === "gif" && gifUrl ? (
        <img src={gifUrl} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70" />
      ) : null}
      <motion.span
        initial={false}
        animate={{ rotate: isDark ? 0 : 180, scale: isDark ? 1 : 0.85 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="absolute"
      >
        <Moon className="h-5 w-5" aria-hidden="true" />
      </motion.span>
      <motion.span
        initial={false}
        animate={{ rotate: isDark ? -180 : 0, scale: isDark ? 0.85 : 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="absolute"
      >
        {isDark ? (
          <Monitor className="h-5 w-5 opacity-0" aria-hidden="true" />
        ) : (
          <Sun className="h-5 w-5" aria-hidden="true" />
        )}
      </motion.span>
    </button>
  );
}
