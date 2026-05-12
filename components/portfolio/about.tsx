import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'

function getAboutContent() {
  const filePath = path.join(process.cwd(), 'content', 'about.mdx')
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { content } = matter(raw)
  return content
}

export function About() {
  const content = getAboutContent()

  return (
    <section
      id="about"
      className="mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-background/20 px-6 py-10 shadow-[0_20px_80px_rgba(0,0,0,0.18)] sm:px-8 sm:py-12"
    >
      <div className="mb-10">
        <p className="mb-2 font-mono text-sm text-primary">{`>`} about</p>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">About Me</h1>
      </div>
      <div className="prose-about">
        <MDXRemote
          source={content}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypeSlug],
            },
          }}
        />
      </div>
    </section>
  )
}
