import type { Metadata } from 'next'
import { BusinessPage } from '@/components/portfolio/business'
import projectsData from '@/public/metadata/projects.json'

export const metadata: Metadata = {
  title: 'My Business | Aaryan Patel',
  description: 'Professional website design and development services for individuals and businesses. Custom solutions starting from $1500.',
  keywords: [
    'Web Design', 'Web Development', 'Custom Websites', 'Website Design Services',
    'Business Websites', 'Professional Web Design', 'Website Development',
  ],
  authors: [{ name: 'Aaryan Patel', url: 'https://aaryanjpatel.github.io' }],
  alternates: { canonical: 'https://aaryanjpatel.github.io/business' },
  openGraph: {
    title: 'My Business | Aaryan Patel',
    description: 'Professional website design and development services for individuals and businesses.',
    url: 'https://aaryanjpatel.github.io/business',
    siteName: 'Aaryan Patel',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My Business | Aaryan Patel',
    description: 'Professional website design and development services.',
    creator: '@AaryanPatel',
  },
  robots: { index: true, follow: true },
}

export default function Business() {
  const businessProjects = projectsData.filter((project) =>
    ['My New Business', 'Aaryan Web Solutions'].includes(project.title)
  )

  return <BusinessPage projects={businessProjects} />
}
