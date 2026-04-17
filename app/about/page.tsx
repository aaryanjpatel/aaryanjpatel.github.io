import type { Metadata } from 'next'
import { About } from '@/components/portfolio/about'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Aaryan Patel | Principal AI/ML Engineer',
  description: 'Aaryan Patel is a Principal AI/ML Engineer with 18+ years across AI/ML, LLMs, MLOps, DevSecOps, and cloud infrastructure. Based in Australia.',
  keywords: [
    'Aaryan Patel', 'Jagdishkumar Patel', 'about Aaryan Patel', 'Principal AI ML Engineer',
    'AI ML Engineer Australia', 'MLOps engineer', 'LLM engineer', 'DevSecOps engineer',
    'cloud engineer Australia', 'platform engineer',
  ],
  authors: [{ name: 'Aaryan Patel', url: 'https://aaryanjpatel.github.io' }],
  alternates: { canonical: 'https://aaryanjpatel.github.io/about' },
  openGraph: {
    title: 'About Aaryan Patel | Principal AI/ML Engineer',
    description: 'Aaryan Patel — Principal AI/ML Engineer with 18+ years in AI, MLOps, DevSecOps, and cloud automation.',
    url: 'https://aaryanjpatel.github.io/about',
    siteName: 'Aaryan Patel',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Aaryan Patel | Principal AI/ML Engineer',
    description: 'Aaryan Patel — 18+ years in AI/ML, LLMs, MLOps, DevSecOps, and cloud automation.',
    creator: '@JagPatel',
  },
  robots: { index: true, follow: true },
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 pt-20">
      <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <span>/</span>
        <span className="text-foreground">About</span>
      </div>
      <About />
    </div>
  )
}
