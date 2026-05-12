"use client"

import { useEffect } from "react"
import { useTheme } from "next-themes"

// All themes that should activate Tailwind's dark: utilities
const DARK_THEMES = new Set(["dark", "catppuccin", "gruvbox", "one-dark", "rose-pine", "ocean"])

/**
 * Syncs a `.dark` class onto <html> whenever the active theme is a dark variant.
 * This bridges next-themes' data-theme attribute with Tailwind's darkMode: ["class"].
 * Also applies background classes to the body for proper theme styling.
 */
export function ThemeDarkSync() {
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const root = document.documentElement
    const body = document.body
    
    if (resolvedTheme && DARK_THEMES.has(resolvedTheme)) {
      root.classList.add("dark")
      body.classList.add("bg-dark")
      body.classList.remove("bg-light")
    } else {
      root.classList.remove("dark")
      body.classList.add("bg-light")
      body.classList.remove("bg-dark")
    }
  }, [resolvedTheme])

  return null
}
