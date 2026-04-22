'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink, Github, BookOpen } from 'lucide-react'
import { FilterDropdown } from '@/components/portfolio/filter-dropdown'

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
  return (
    <Link href={project.blogSlug ? `/blog/${project.blogSlug}` : '#'} className={project.blogSlug ? 'group block' : ''}>
      <div className="flex flex-col rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all duration-200 overflow-hidden h-full">
        {/* Feature Image */}
        {project.feature_image && (
          <div className="relative w-full h-40 overflow-hidden rounded-t-xl bg-muted">
            <Image
              src={project.feature_image}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="flex flex-col p-6 flex-1">
          <h3 className="font-semibold text-lg mb-2 leading-snug group-hover:text-primary transition-colors">{project.title}</h3>
          <hr className="border-border mb-4" />
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed flex-1">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tech.map((tech) => (
              <span key={tech} className="rounded-full bg-primary/10 text-primary px-2.5 py-0.5 text-xs font-medium">
                {tech}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4 flex-wrap mt-auto">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Github size={15} /> GitHub <ExternalLink size={12} />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <ExternalLink size={15} /> Live Demo
              </a>
            )}
            {project.blogSlug && (
              <span
                className="inline-flex items-center gap-1.5 text-sm text-primary group-hover:underline transition-colors cursor-pointer"
              >
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
          <p className="font-mono text-sm text-primary mb-1">{`>`} business</p>
          <h1 className="text-3xl font-extrabold tracking-tight">My Business</h1>
          <hr className="border-border mb-8 mt-2" />
          <p className="text-sm text-muted-foreground mt-2">
            Professional website design and development services
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <BusinessCard key={project.title} project={project} />
        ))}
        {projects.length === 0 && (
          <p className="col-span-2 text-center py-12 text-muted-foreground">No projects available.</p>
        )}
      </div>
    </div>
  )
}
