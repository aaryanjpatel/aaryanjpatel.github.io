import type { Metadata } from 'next'
import { Hero } from '@/components/portfolio/hero'
import { About } from '@/components/portfolio/about'
import { Capabilities } from '@/components/portfolio/capabilities'
import { Projects } from '@/components/portfolio/projects'
import { Blog } from '@/components/portfolio/blog'
import { Contact } from '@/components/portfolio/contact'
import { HomeEntry } from '@/components/portfolio/home-entry'

export const metadata: Metadata = {
  title: 'Aaryan Patel — Future Tech Entrepreneur | Machine Learning, MLOps & Cloud',
  description: 'Aaryan Patel (Jagdishkumar Patel) — Future Tech Entrepreneur with 18+ years across AI/ML Engineering, Machine Learning, Data Science, MLOps, Cloud Engineering, Cloud DevOps, and DevSecOps. Based in Australia.',
  keywords: [
    'Aaryan Patel', 'Jagdishkumar Patel', 'AI Engineer', 'AI/ML Engineer', 'AI/ML Engineering',
    'Future Tech Entrepreneur', 'Machine Learning Engineer', 'Data Science Engineer',
    'MLOps Engineer', 'Cloud Engineer', 'Cloud Engineering', 'Cloud DevOps Engineer',
    'Cloud DevSecOps Engineer', 'DevSecOps', 'LLM', 'Ollama', 'Azure', 'AWS',
    'Platform Engineering', 'Python',
  ],
  alternates: { canonical: 'https://aaryanjpatel.github.io' },
  openGraph: {
    title: 'Aaryan Patel — Future Tech Entrepreneur',
    description: 'Future Tech Entrepreneur with 18+ years in AI/ML Engineering, Machine Learning, MLOps, Cloud Engineering, and DevSecOps.',
    url: 'https://aaryanjpatel.github.io',
    siteName: 'Aaryan Patel',
    type: 'profile',
  },
}

export default function Home() {
  return (
    <HomeEntry>
      <Hero />
      <About />
      <Capabilities />
      <Projects />
      <Blog />
      <Contact />
    </HomeEntry>
  )
}