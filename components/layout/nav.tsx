"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { ThemeSwitcher } from "@/components/theme-switcher"

const STORAGE_KEY = "portfolio-view"

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "My Business", href: "/business" },
  { label: "Pricing", href: "/pricing" },
  { label: "Certifications", href: "/certifications" },
  { label: "Education", href: "/education" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
]

export function Nav() {
  const [open, setOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const [neuralView, setNeuralView] = React.useState(false)
  const pathname = usePathname()
  const isHome = pathname === "/"

  React.useEffect(() => {
    setNeuralView(localStorage.getItem(STORAGE_KEY) !== "classic")
  }, [])

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-popover/92 shadow-[0_10px_40px_rgba(15,23,42,0.14)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-mono text-lg font-bold text-foreground transition-colors hover:text-primary"
        >
          <span className="text-primary">{">"}</span> Aaryan Patel
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeSwitcher />
          {isHome && (
            <button
              className="site-pill inline-flex items-center gap-1.5 px-2 py-1.5 text-xs text-muted-foreground transition-colors hover:text-primary md:px-3"
              title={neuralView ? "Switch to Classic View" : "Switch to Neural View"}
              aria-label={neuralView ? "Switch to Classic View" : "Switch to Neural View"}
              onClick={() => {
                const next = !neuralView
                setNeuralView(next)
                if (next) {
                  localStorage.removeItem(STORAGE_KEY)
                } else {
                  localStorage.setItem(STORAGE_KEY, "classic")
                }
                window.location.reload()
              }}
            >
              <span>{neuralView ? "Lightning" : "Neural"}</span>
              <span className="hidden whitespace-nowrap md:inline">
                {neuralView ? "Classic View" : "Neural View"}
              </span>
            </button>
          )}
          <button
            className="rounded-md p-2 transition-colors hover:bg-accent md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="flex flex-col gap-4 border-b border-border bg-popover/96 px-6 py-4 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
