"use client"

import Image from "next/image"
import { Github, Linkedin, Mail } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

const KEYWORDS = [
  "AI/ML",
  "Machine Learning",
  "MLOps",
  "Cloud Engineering",
  "DevSecOps",
  "Platform Engineering",
]

function useTypewriter(words: string[], delay = 1800) {
  const [index, setIndex] = useState(0)
  const [displayed, setDisplayed] = useState(words[0])
  const timeout = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    timeout.current = setTimeout(() => {
      setIndex((i) => (i + 1) % words.length)
    }, delay)
    return () => clearTimeout(timeout.current)
  }, [index, words, delay])

  useEffect(() => {
    setDisplayed(words[index])
  }, [index, words])

  return displayed
}

function TypewriterKeywords() {
  const word = useTypewriter(KEYWORDS, 1800)
  return (
    <span className="inline-block min-w-[12ch] align-middle">
      <span className="font-semibold text-primary transition-colors duration-300">{word}</span>
      <span className="animate-pulse text-primary/60">|</span>
    </span>
  )
}

export function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative flex items-center justify-center overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/8 blur-[120px]" />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-8 px-6 pb-12 pt-28 text-center">
        <div className="relative">
          <div className="absolute inset-0 scale-110 rounded-full bg-primary/20 blur-xl" />
          <div className="relative h-32 w-32 overflow-hidden rounded-full ring-2 ring-primary/30 ring-offset-4 ring-offset-background md:h-40 md:w-40">
            <Image
              src="/avatar/headshot.jpg"
              alt="Aaryan Patel"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="gradient-heading text-4xl font-extrabold tracking-tight md:text-6xl">
            Aaryan Patel
          </h1>
          <p className="font-mono text-lg text-primary md:text-xl">
            {">"} Future Tech Entrepreneur | Coding & Mathematics Enthusiast
          </p>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            I&apos;m passionate about building the future through the power of mathematics, coding, and innovation. I
            enjoy solving complex problems and turning ideas into real-world digital solutions.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="/pricing"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Website Pricing
          </a>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <Mail className="h-4 w-4" /> Contact
          </a>
          <a
            href="https://www.linkedin.com/in/aaryanjpatel/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <Linkedin className="h-4 w-4" /> LinkedIn
          </a>
          <a
            href="https://github.com/aaryanjpatel"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <Github className="h-4 w-4" /> GitHub
          </a>
        </div>

        {mounted && (
          <motion.div
            className="mt-4 flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6, ease: "easeOut" }}
          >
            <motion.span
              className="font-mono text-xs uppercase tracking-widest text-muted-foreground/60"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 1.2, ease: "easeOut" }}
            >
              Turning research into real-world, scalable solutions. <span className="text-primary/60">|</span>{" "}
              <TypewriterKeywords />
            </motion.span>
            <div className="flex animate-bounce flex-col items-center gap-0.5 text-muted-foreground/40">
              <div className="h-4 w-px bg-current" />
              <div className="h-4 w-px bg-current" />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
