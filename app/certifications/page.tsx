import type { Metadata } from 'next'
import { CertificationsPage } from '@/components/portfolio/certifications'

export const metadata: Metadata = {
  title: 'Licences & Certifications | Aaryan Patel',
  description: 'Professional certifications and licences held by Aaryan Patel — Principal AI/ML Engineer specialising in cloud, DevSecOps, and infrastructure engineering.',
  keywords: [
    'Aaryan Patel certifications', 'Jagdishkumar Patel', 'AWS certified', 'Azure certified',
    'Terraform certified', 'DevSecOps certifications', 'cloud certifications Aaryan Patel',
    'Principal AI ML Engineer certifications',
  ],
  authors: [{ name: 'Aaryan Patel', url: 'https://jagdishkumarpatel.github.io' }],
  alternates: { canonical: 'https://jagdishkumarpatel.github.io/certifications' },
  openGraph: {
    title: 'Licences & Certifications | Aaryan Patel',
    description: 'Industry certifications across AWS, Azure, Terraform, and more — held by Aaryan Patel, Principal AI/ML Engineer.',
    url: 'https://jagdishkumarpatel.github.io/certifications',
    siteName: 'Aaryan Patel',
    type: 'profile',
  },
  twitter: {
    card: 'summary',
    title: 'Licences & Certifications | Aaryan Patel',
    description: 'AWS, Azure, Terraform and more — certifications held by Aaryan Patel, Principal AI/ML Engineer.',
    creator: '@JagPatel',
  },
  robots: { index: true, follow: true },
}

export default function Certifications() {
  return <CertificationsPage />
}
