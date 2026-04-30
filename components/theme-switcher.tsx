"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { useTheme } from "next-themes"
import { Palette, Check, ChevronDown } from "lucide-react"
import { themes, themeCategories } from "@/lib/themes"

const categoryLabels = {
  default: "Default",
  dev: "Developer",
  professional: "Professional",
}

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)
  const buttonRef = React.useRef<HTMLButtonElement>(null)
  const menuRef = React.useRef<HTMLDivElement>(null)
  const [menuPosition, setMenuPosition] = React.useState({ top: 80, left: 0, width: 208 })

  React.useEffect(() => { setMounted(true) }, [])

  React.useEffect(() => {
    if (!open || !buttonRef.current) return

    const updatePosition = () => {
      const rect = buttonRef.current?.getBoundingClientRect()
      if (!rect) return

      setMenuPosition({
        top: rect.bottom + 8,
        left: rect.right - 208,
        width: 208,
      })
    }

    updatePosition()
    window.addEventListener("resize", updatePosition)
    window.addEventListener("scroll", updatePosition, true)

    return () => {
      window.removeEventListener("resize", updatePosition)
      window.removeEventListener("scroll", updatePosition, true)
    }
  }, [open])

  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as Node
      const clickedTrigger = ref.current?.contains(target)
      const clickedMenu = menuRef.current?.contains(target)

      if (!clickedTrigger && !clickedMenu) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  const current = mounted ? (themes.find((t) => t.value === theme) ?? themes[0]) : themes[0]

  return (
    <div ref={ref} className="relative z-[90]">
      <button
        ref={buttonRef}
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors border border-border bg-background"
        aria-label="Switch theme"
      >
        <Palette className="h-4 w-4" />
        <span className="hidden sm:inline">{mounted ? current.name : ""}</span>
        <ChevronDown className="h-3 w-3 opacity-60" />
      </button>

      {open && mounted && createPortal(
        <div
          ref={menuRef}
          className="fixed z-[200] overflow-hidden rounded-lg border border-border bg-popover shadow-lg"
          style={{
            top: menuPosition.top,
            left: Math.max(16, menuPosition.left),
            width: menuPosition.width,
          }}
        >
          {(["default", "dev", "professional"] as const).map((cat) => (
            <div key={cat}>
              <div className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {categoryLabels[cat]}
              </div>
              {themeCategories[cat].map((t) => (
                <button
                  key={t.value}
                  onClick={() => { setTheme(t.value); setOpen(false) }}
                  className="flex w-full items-center justify-between px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <span>{t.name}</span>
                  {theme === t.value && <Check className="h-3.5 w-3.5" />}
                </button>
              ))}
            </div>
          ))}
        </div>,
        document.body
      )}
    </div>
  )
}
