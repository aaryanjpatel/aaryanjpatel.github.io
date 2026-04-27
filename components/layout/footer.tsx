import Link from "next/link"
import { Github, Linkedin, Rss } from "lucide-react"

const footerLinks = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "My Business", href: "/business" },
  { label: "Pricing", href: "/pricing" },
  { label: "Certifications", href: "/certifications" },
  { label: "Education", href: "/education" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-background/50 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row">
        <div className="text-center md:text-left">
          <p className="font-mono font-semibold text-foreground">
            <span className="text-primary">{">"}</span> Aaryan Patel
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">Future Tech Entrepreneur</p>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          {footerLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col items-center gap-2 md:items-end">
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/aaryanjpatel"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/aaryanjpatel/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="/rss/feed.xml"
              target="_blank"
              rel="noreferrer"
              aria-label="RSS Feed"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Rss className="h-4 w-4" />
            </a>
          </div>
          <p className="text-xs text-muted-foreground">
            Copyright {new Date().getFullYear()} Aaryan Patel
          </p>
        </div>
      </div>
    </footer>
  )
}
