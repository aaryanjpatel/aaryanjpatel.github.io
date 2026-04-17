import type { Metadata } from 'next'
import { ContactPage } from '@/components/portfolio/contact'

export const metadata: Metadata = {
  title: 'Contact Aaryan Patel | Principal AI/ML Engineer',
  description: 'Get in touch with Aaryan Patel — Principal AI/ML Engineer specialising in AI/ML, MLOps, platform engineering, and cloud automation.',
  keywords: [
    'Aaryan Patel', 'contact Aaryan Patel', 'Jagdishkumar Patel', 'hire AI ML engineer',
    'Principal AI ML Engineer contact', 'AI engineer Australia',
  ],
  authors: [{ name: 'Aaryan Patel', url: 'https://aaryanjpatel.github.io' }],
  alternates: { canonical: 'https://aaryanjpatel.github.io/contact' },
  openGraph: {
    title: 'Contact Aaryan Patel | Principal AI/ML Engineer',
    description: 'Get in touch with Aaryan Patel — Principal AI/ML Engineer.',
    url: 'https://aaryanjpatel.github.io/contact',
    siteName: 'Aaryan Patel',
    type: 'profile',
  },
  twitter: {
    card: 'summary',
    title: 'Contact Aaryan Patel | Principal AI/ML Engineer',
    description: 'Get in touch with Aaryan Patel — Principal AI/ML Engineer.',
    creator: '@JagPatel',
  },
  robots: { index: true, follow: true },
}

export default function Contact() {
  return <ContactPage />
}
