/*
 * ThemeContext — owns the day/night theme of the AHF site.
 *
 * Three theme values:
 *   "light"   pinned to the cream + navy paper palette
 *   "dark"    pinned to the blueprint navy + cyan palette
 *   "system"  follows the device's prefers-color-scheme, live-updates on change
 *
 * Persistence: when the user explicitly toggles via `setTheme(...)` we write
 * the choice to `localStorage.theme` so it survives page reloads. The same key
 * is read by an early <head> script in client/index.html so the very first
 * paint is correct (no flash of light theme on a dark device).
 *
 * If localStorage.theme is missing we treat the effective theme as `system`,
 * which means we attach a media-query listener and flip the .dark class on
 * <html> live as the OS appearance changes.
 */
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

export type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  /** The user's preference. May be "system". */
  theme: Theme;
  /** What is currently applied to <html>. Always "light" or "dark". */
  resolvedTheme: "light" | "dark";
  /** Cycles light -> dark -> system -> light. */
  toggleTheme: () => void;
  /** Sets a specific value. */
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = "theme";

function readSystemPref(): "light" | "dark" {
  if (typeof window === "undefined" || !window.matchMedia) return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function readStoredTheme(): Theme {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "light" || v === "dark" || v === "system") return v;
  } catch {
    /* localStorage may be disabled */
  }
  return "system";
}

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
}

export function ThemeProvider({ children, defaultTheme = "system" }: ThemeProviderProps) {
  // Initialize from localStorage if present, else from the provider default.
  const [theme, setThemeState] = useState<Theme>(() => {
    const stored = readStoredTheme();
    return stored ?? defaultTheme;
  });

  // The actually-applied theme (what's on <html>).
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">(() =>
    theme === "system" ? readSystemPref() : theme
  );

  // Apply class to <html> whenever the resolved theme changes.
  useEffect(() => {
    const root = document.documentElement;
    if (resolvedTheme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [resolvedTheme]);

  // When `theme` is "system", listen for OS appearance changes.
  useEffect(() => {
    if (theme !== "system") {
      setResolvedTheme(theme);
      return;
    }
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => setResolvedTheme(mq.matches ? "dark" : "light");
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [theme]);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    try {
      if (next === "system") localStorage.removeItem(STORAGE_KEY);
      else localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : theme === "dark" ? "system" : "light");
  }, [theme, setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
