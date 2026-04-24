'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink, Github, BookOpen } from 'lucide-react'

type Project = {
  title: string
  description: string
  tech: string[]
  github: string
  demo?: string
  blogSlug?: string
  feature_image?: string
}

function BusinessCard({ project }: { project: Project }) {
  const featureImage =
    project.feature_image || (project.title === 'My New Business' ? '/images/bussness.png' : undefined)
  const description =
    project.title === 'My New Business'
      ? 'My business focuses on creating websites for businesses, personal brands, and individual clients. I build personal websites, business websites, and custom sites with clear package pricing, modern design, and room for extra features when needed.'
      : project.description
  const href = project.blogSlug ? `/blog/${project.blogSlug}?from=business` : '#'

  return (
    <Link href={href} className={project.blogSlug ? 'group block' : ''}>
      <div className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-200 hover:border-primary/50 hover:shadow-md">
        {featureImage && (
          <div className="relative h-40 w-full overflow-hidden rounded-t-xl bg-muted">
            <Image
              src={featureImage}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <div className="flex flex-1 flex-col p-6">
          <h3 className="mb-2 text-lg font-semibold leading-snug transition-colors group-hover:text-primary">
            {project.title}
          </h3>
          <hr className="mb-4 border-border" />
          <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
          <div className="mb-5 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span key={tech} className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                {tech}
              </span>
            ))}
          </div>
          <div className="mt-auto flex flex-wrap items-center gap-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <Github size={15} /> GitHub <ExternalLink size={12} />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <ExternalLink size={15} /> Live Demo
              </a>
            )}
            {project.blogSlug && (
              <span className="inline-flex cursor-pointer items-center gap-1.5 text-sm text-primary transition-colors group-hover:underline">
                <BookOpen size={15} /> Read Post
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export function BusinessPage({ projects }: { projects: Project[] }) {
  return (
    <div className="mx-auto max-w-4xl px-6 py-14">
      <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <span>/</span>
        <span className="text-foreground">My Business</span>
      </div>
      <div className="mb-2 flex items-end justify-between gap-4">
        <div>
          <p className="mb-1 font-mono text-sm text-primary">{`>`} business</p>
          <h1 className="text-3xl font-extrabold tracking-tight">My Business</h1>
          <hr className="mb-8 mt-2 border-border" />
          <p className="mt-2 text-sm text-muted-foreground">
            Website design and development for businesses, personal brands, and individual clients
          </p>
        </div>
      </div>

      <div className="mb-8 rounded-2xl border border-border bg-card p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-xl font-semibold tracking-tight">Pricing Packages</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              View pricing for personal websites, business websites, and additional extras before getting in touch.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/business/pricing"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              View Pricing
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Start a Project
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <BusinessCard key={project.title} project={project} />
        ))}
        {projects.length === 0 && (
          <p className="col-span-2 py-12 text-center text-muted-foreground">No projects available.</p>
        )}
      </div>
    </div>
  )
}
