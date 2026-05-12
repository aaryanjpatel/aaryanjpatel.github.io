"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

interface ThemeBackgroundProps {
  children: React.ReactNode
}

export function ThemeBackground({ children }: ThemeBackgroundProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent hydration mismatch
  if (!mounted) {
    return <>{children}</>
  }

  const isDark = resolvedTheme === "dark"
  const bgClass = isDark ? "bg-dark" : "bg-light"
  const textClass = isDark ? "text-foreground" : "text-foreground"

  return <div className={`${bgClass} ${textClass} flex-1`}>{children}</div>
}
