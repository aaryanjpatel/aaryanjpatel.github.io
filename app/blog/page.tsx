import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/posts'
import { BlogPage } from '@/components/portfolio/blog-page'

export const metadata: Metadata = {
  title: 'Blog | Aaryan Patel',
  description: 'Articles on AI/ML engineering, platform engineering, local LLMs, DevOps, and distributed systems by Aaryan Patel — Principal AI/ML Engineer.',
  keywords: [
    'Aaryan Patel blog', 'AI ML engineering blog', 'platform engineering', 'local LLM',
    'Ollama', 'FastAPI', 'RAG', 'MLOps', 'DevOps', 'Python', 'distributed systems',
  ],
  authors: [{ name: 'Aaryan Patel', url: 'https://jagdishkumarpatel.github.io' }],
  alternates: { canonical: 'https://jagdishkumarpatel.github.io/blog' },
  openGraph: {
    title: 'Blog | Aaryan Patel',
    description: 'Articles on AI/ML engineering, platform engineering, local LLMs, and distributed systems.',
    url: 'https://jagdishkumarpatel.github.io/blog',
    siteName: 'Aaryan Patel',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Aaryan Patel',
    description: 'AI/ML, platform engineering, and local LLM articles by Aaryan Patel.',
    creator: '@JagPatel',
  },
  robots: { index: true, follow: true },
}

export default function Blog() {
  const posts = getAllPosts()
  return <BlogPage posts={posts} />
}
