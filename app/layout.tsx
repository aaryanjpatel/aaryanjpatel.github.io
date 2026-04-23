import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { ThemeDarkSync } from '@/components/theme-dark-sync'
import { Nav } from '@/components/layout/nav'

export const metadata: Metadata = {
  metadataBase: new URL('https://aaryanjpatel.github.io'),
  title: {
    default: 'Aaryan Patel — Future Tech Entrepreneur, MLOps & Cloud',
    template: '%s | Aaryan Patel',
  },
  description: 'Aaryan Patel — Future Tech Entrepreneur. 18+ years in AI/ML, LLMs, PromptFlow, DevSecOps, and cloud automation. Building transparent, production-grade AI systems and secure platforms.',
  keywords: [
    'Aaryan Patel',
    'Aaryankumar Patel',
    'AI Engineer',
    'AI/ML Engineer',
    'AI/ML Engineering',
    'Future Tech Entrepreneur',
    'Machine Learning Engineer',
    'Data Science Engineer',
    'MLOps Engineer',
    'MLOps',
    'Cloud Engineer',
    'Cloud Engineering',
    'Cloud DevOps Engineer',
    'Cloud DevSecOps Engineer',
    'DevSecOps',
    'PromptFlow',
    'Mistral',
    'GPT4All',
    'Azure',
    'AWS',
    'Bicep',
    'Terraform',
    'LLM',
    'Platform Engineering',
    'Python',
    'FastAPI',
    'Ollama',
    'LangChain',
    'Cloud Security',
    'Automation',
    'Leadership',
  ],
  openGraph: {
    siteName: 'Aaryan Patel',
    type: 'profile',
    locale: 'en_AU',
    title: 'Aaryan Patel — Future Tech Entrepreneur, MLOps & Cloud',
    description: 'Future Tech Entrepreneur with 18+ years in AI, MLOps, PromptFlow, DevSecOps, and cloud automation.',
    url: 'https://aaryanjpatel.github.io',
    images: [
      {
        url: '/images/avatar.jpg',
        width: 800,
        height: 800,
        alt: 'Aaryan Patel — Future Tech Entrepreneur',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aaryan Patel — Future Tech Entrepreneur',
    description: '18+ years in AI/ML, LLMs, PromptFlow, DevSecOps, and cloud automation.',
    images: ['/images/avatar.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Aaryan Patel',
  jobTitle: 'Future Tech Entrepreneur',
  url: 'https://aaryanjpatel.github.io',
  sameAs: [
    'https://www.linkedin.com/in/aaryanjpatel/',
    'https://github.com/aaryanjpatel',
  ],
  description: 'Future Tech Entrepreneur with 18+ years in AI, MLOps, PromptFlow, DevSecOps, and cloud automation.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="font-sans bg-background text-foreground antialiased flex flex-col min-h-screen">
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeDarkSync />
          <Nav />
          <main className="flex-1">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
