import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock } from 'lucide-react'
import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { formatDateLong } from '@/lib/utils'
import { MDXRemote } from 'next-mdx-remote/rsc'
import MDXComponents from '@/components/MDXComponents'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return { title: 'Not found' }

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
  }
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const { frontmatter, content, readTime, readMinutes } = post

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">

      {/* Back */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm text-[#737373] hover:text-[#0a0a0a] transition-colors mb-12 group"
      >
        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
        Writing
      </Link>

      {/* Header */}
      <header className="mb-12 pb-12 border-b border-[#e8e8e8]">
        <h1 className="text-3xl font-semibold tracking-tight leading-tight mb-4">
          {frontmatter.title}
        </h1>
        <p className="text-base text-[#737373] leading-relaxed mb-6">
          {frontmatter.excerpt}
        </p>

        <div className="flex items-center gap-4 text-xs text-[#a3a3a3]">
          <time dateTime={frontmatter.date}>
            {formatDateLong(frontmatter.date)}
          </time>
          <span>·</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {readTime}
          </span>
        </div>

        {frontmatter.tags && frontmatter.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-5">
            {frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-[#737373] px-2 py-0.5 rounded border border-[#e8e8e8] bg-[#fafafa]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Reading time note */}
      <p className="text-xs text-[#c3c3c3] mb-8 font-mono tabular-nums">
        {readMinutes} min read
      </p>

      {/* Content */}
      <article className="prose prose-sm max-w-none">
        <MDXRemote source={content} components={MDXComponents} />
      </article>
    </div>
  )
}
