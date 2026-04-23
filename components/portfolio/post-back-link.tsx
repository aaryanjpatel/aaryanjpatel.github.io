'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

function getSourceMeta(from?: string | null) {
  switch (from) {
    case 'projects':
      return { href: '/projects', label: 'Projects' }
    case 'business':
      return { href: '/business', label: 'My Business' }
    default:
      return { href: '/blog', label: 'Blog' }
  }
}

export function PostBackLink({ className = '' }: { className?: string }) {
  const searchParams = useSearchParams()
  const source = getSourceMeta(searchParams.get('from'))

  return (
    <Link
      href={source.href}
      className={`inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:border-primary/50 ${className}`.trim()}
    >
      <ArrowLeft className="h-4 w-4" />
      Back to {source.label}
    </Link>
  )
}
