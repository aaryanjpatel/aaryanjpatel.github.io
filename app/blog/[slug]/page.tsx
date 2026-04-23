import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Suspense } from 'react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeHighlight from 'rehype-highlight'
import { getAllPostSlugs, getPostBySlug } from '@/lib/posts'
import { PostBackLink } from '@/components/portfolio/post-back-link'
import type { Metadata } from 'next'

type Props = { params: { slug: string } }

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  const url = `https://aaryanjpatel.github.io/blog/${post.slug}`
  const description = post.description || post.excerpt

  return {
    title: post.title.startsWith('Aaryan Patel') ? post.title : `${post.title} | Aaryan Patel`,
    description,
    keywords: (post as any).keywords ?? post.tags ?? [],
    authors: [{ name: 'Aaryan Patel', url: 'https://aaryanjpatel.github.io' }],
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description,
      url,
      siteName: 'Aaryan Patel',
      images: post.feature_image
        ? [{ url: post.feature_image, width: 1400, height: 788, alt: post.title }]
        : [],
      type: 'article',
      publishedTime: post.date,
      authors: ['Aaryan Patel'],
      tags: post.tags ?? [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: post.feature_image ? [post.feature_image] : [],
      creator: '@AaryanPatel',
    },
    robots: { index: true, follow: true },
  }
}

function readingTime(content: string) {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const mins = readingTime(post.content)

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 md:px-8">
      <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
        <span>/</span>
        <span className="text-foreground truncate max-w-xs">{post.title}</span>
      </div>

      <div className="flex gap-12">
        <article className="flex-1 min-w-0">
          <div className="mb-6">
            <Suspense fallback={<Link href="/blog" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:border-primary/50">Back to Blog</Link>}>
              <PostBackLink />
            </Suspense>
          </div>

          <div className="mb-10 border border-border bg-card">
            <div className="p-6 md:p-8">
              <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">{post.title}</h1>
              <p className="max-w-3xl text-base text-muted-foreground mb-5 md:text-lg">
                {post.description || post.excerpt}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <time>
                  {new Date(post.date).toLocaleDateString('en-AU', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </time>
                <span>·</span>
                <span>{mins} min read</span>
              </div>

              {post.tags && post.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {post.feature_image && (
            <div className="mb-10 relative left-1/2 right-1/2 w-screen -translate-x-1/2 border-y border-border bg-muted">
              <div className="relative h-[42vh] min-h-[320px] w-full sm:h-[52vh] lg:h-[72vh]">
                <Image
                  src={post.feature_image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          )}

          <div className="prose prose-slate max-w-none dark:prose-invert prose-headings:font-semibold prose-a:text-primary prose-code:text-primary prose-code:before:content-none prose-code:after:content-none">
            <MDXRemote
              source={post.content}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [rehypeSlug, rehypeHighlight],
                },
              }}
            />
          </div>

          <div className="mt-12 border-t border-border pt-6">
            <Suspense fallback={<Link href="/blog" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:border-primary/50">Back to Blog</Link>}>
              <PostBackLink />
            </Suspense>
          </div>
        </article>

        <aside className="hidden lg:block w-56 shrink-0">
          <div className="sticky top-24 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              On this page
            </p>
            <div className="text-sm text-muted-foreground space-y-1 border-l border-border pl-3">
              {post.content
                .split('\n')
                .filter((l) => /^#{1,3} /.test(l))
                .slice(0, 8)
                .map((heading, i) => {
                  const level = heading.match(/^(#+)/)?.[1].length ?? 1
                  const text = heading.replace(/^#+\s/, '')
                  const anchor = text.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                  return (
                    <a
                      key={i}
                      href={`#${anchor}`}
                      className={`block hover:text-foreground transition-colors leading-snug ${
                        level === 1 ? '' : level === 2 ? 'pl-2' : 'pl-4'
                      }`}
                    >
                      {text}
                    </a>
                  )
                })}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
