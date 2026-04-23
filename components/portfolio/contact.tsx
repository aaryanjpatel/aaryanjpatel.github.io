"use client"

import Link from 'next/link'
import { Mail, Github } from 'lucide-react'

function ContactContent({ standalone = false }: { standalone?: boolean }) {
  return (
    <section id="contact" className="py-14">
      <div className="mx-auto max-w-2xl px-6">
        {standalone && (
          <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <span className="text-foreground">Contact</span>
          </div>
        )}
        <div className="mb-10">
          <p className="font-mono text-sm text-primary mb-1">{`>`} connect</p>
          <h2 className="text-3xl font-extrabold tracking-tight gradient-heading">Get In Touch</h2>
        </div>
        <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
          I&apos;enjoy collaborating on challenging problems and exchanging ideas in AI/ML and platform engineering.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="mailto:aaryanjpatel@gmail.com"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Mail size={20} /> Email Me
          </a>
          <a
            href="https://github.com/aaryanjpatel"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-border text-foreground px-6 py-3 rounded-lg hover:border-primary hover:text-primary transition-colors"
          >
            <Github size={20} /> GitHub
          </a>
        </div>
      </div>
    </section>
  )
}

export function Contact() {
  return <ContactContent />
}

export function ContactPage() {
  return <ContactContent standalone />
}
