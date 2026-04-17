import type { Metadata } from 'next'
import { EducationPage } from '@/components/portfolio/education'

export const metadata: Metadata = {
  title: 'Education | Aaryan Patel',
  description: 'Academic background and formal qualifications of Aaryan Patel — Principal AI/ML Engineer with 18+ years of experience in AI, cloud, and platform engineering.',
  keywords: [
    'Aaryan Patel education', 'Jagdishkumar Patel', 'Aaryan Patel qualifications',
    'AI ML engineer education', 'Principal AI ML Engineer background',
  ],
  authors: [{ name: 'Aaryan Patel', url: 'https://aaryanjpatel.github.io' }],
  alternates: { canonical: 'https://aaryanjpatel.github.io/education' },
  openGraph: {
    title: 'Education | Aaryan Patel',
    description: 'Academic qualifications of Aaryan Patel, Principal AI/ML Engineer.',
    url: 'https://aaryanjpatel.github.io/education',
    siteName: 'Aaryan Patel',
    type: 'profile',
  },
  twitter: {
    card: 'summary',
    title: 'Education | Aaryan Patel',
    description: 'Academic background and qualifications of Aaryan Patel, Principal AI/ML Engineer.',
    creator: '@JagPatel',
  },
  robots: { index: true, follow: true },
}

export default function Education() {
  return <EducationPage />
}
