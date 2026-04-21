import type { Metadata } from 'next'
import { ProjectsPage } from '@/components/portfolio/projects'
import projectsData from '@/public/metadata/projects.json'

export const metadata: Metadata = {
  title: 'Projects | Aaryan Patel',
  description: 'Explore projects built by Aaryan Patel — Future Tech Entrepreneur specialising in AI/ML pipelines, distributed systems, platform engineering, and cloud automation.',
  keywords: [
    'Aaryan Patel', 'Aaryankumar Patel', 'Aaryan Patel projects', 'AI ML projects',
    'Principal AI ML Engineer', 'platform engineering projects', 'Python projects',
    'MLOps projects', 'distributed systems projects', 'cloud automation', 'Azure AI projects',
  ],
  authors: [{ name: 'Aaryan Patel', url: 'https://aaryanjpatel.github.io' }],
  alternates: { canonical: 'https://aaryanjpatel.github.io/projects' },
  openGraph: {
    title: 'Projects | Aaryan Patel',
    description: 'Explore AI/ML, platform engineering, and cloud automation projects built by Aaryan Patel — Future Tech Entrepreneur.',
    url: 'https://aaryanjpatel.github.io/projects',
    siteName: 'Aaryan Patel',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects | Aaryan Patel',
    description: 'AI/ML, platform engineering, and cloud automation projects by Aaryan Patel — Future Tech Entrepreneur.',
    creator: '@AaryanPatel',
  },
  robots: { index: true, follow: true },
}

export default function Projects() {
  return <ProjectsPage projects={projectsData} />
}
