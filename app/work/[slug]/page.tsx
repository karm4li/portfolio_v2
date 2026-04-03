import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { getAllProjects, getProjectBySlug } from '@/lib/projects'
import { MDXRemote } from 'next-mdx-remote/rsc'
import MDXComponents from '@/components/MDXComponents'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const projects = getAllProjects()
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return { title: 'Not found' }

  return {
    title: project.frontmatter.title,
    description: project.frontmatter.description,
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const { frontmatter, content } = project

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">

      {/* Back */}
      <Link
        href="/work"
        className="inline-flex items-center gap-1.5 text-sm text-[#737373] hover:text-[#0a0a0a] transition-colors mb-12 group"
      >
        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
        Work
      </Link>

      {/* Header */}
      <header className="mb-12 pb-12 border-b border-[#e8e8e8]">
        <div className="flex items-start justify-between gap-6 mb-4">
          <h1 className="text-3xl font-semibold tracking-tight leading-tight">
            {frontmatter.title}
          </h1>
          {frontmatter.status === 'in-progress' && (
            <span className="text-[10px] font-medium px-2 py-1 rounded-full border border-[#e8e8e8] text-[#737373] uppercase tracking-wide shrink-0 mt-1">
              Active
            </span>
          )}
        </div>

        <p className="text-base text-[#737373] leading-relaxed mb-8 max-w-xl">
          {frontmatter.description}
        </p>

        {/* Meta grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div>
            <p className="text-[10px] font-medium tracking-widest uppercase text-[#a3a3a3] mb-1">
              Year
            </p>
            <p className="text-sm">{frontmatter.year || new Date(frontmatter.date).getFullYear()}</p>
          </div>
          {frontmatter.role && (
            <div>
              <p className="text-[10px] font-medium tracking-widest uppercase text-[#a3a3a3] mb-1">
                Role
              </p>
              <p className="text-sm">{frontmatter.role}</p>
            </div>
          )}
          <div>
            <p className="text-[10px] font-medium tracking-widest uppercase text-[#a3a3a3] mb-1">
              Status
            </p>
            <p className="text-sm capitalize">{frontmatter.status.replace('-', ' ')}</p>
          </div>
          {frontmatter.tags && (
            <div>
              <p className="text-[10px] font-medium tracking-widest uppercase text-[#a3a3a3] mb-1">
                Tags
              </p>
              <div className="flex flex-wrap gap-1.5">
                {frontmatter.tags.map((tag) => (
                  <span key={tag} className="text-xs text-[#737373]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Links panel */}
      {(frontmatter.links?.length || frontmatter.research?.length || frontmatter.publications?.length) && (
        <aside className="mb-12 p-5 rounded-lg border border-[#e8e8e8] bg-[#fafafa]">
          <div className="flex flex-wrap gap-8">
            {frontmatter.links && frontmatter.links.length > 0 && (
              <div>
                <p className="text-[10px] font-medium tracking-widest uppercase text-[#a3a3a3] mb-3">
                  Links
                </p>
                <ul className="space-y-1.5">
                  {frontmatter.links.map((link) => (
                    <li key={link.url}>
                      <Link
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-[#737373] hover:text-[#0a0a0a] transition-colors group"
                      >
                        {link.label}
                        <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {frontmatter.research && frontmatter.research.length > 0 && (
              <div>
                <p className="text-[10px] font-medium tracking-widest uppercase text-[#a3a3a3] mb-3">
                  Research
                </p>
                <ul className="space-y-1.5">
                  {frontmatter.research.map((link) => (
                    <li key={link.url}>
                      <Link
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-[#737373] hover:text-[#0a0a0a] transition-colors group"
                      >
                        {link.label}
                        <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {frontmatter.publications && frontmatter.publications.length > 0 && (
              <div>
                <p className="text-[10px] font-medium tracking-widest uppercase text-[#a3a3a3] mb-3">
                  Publications
                </p>
                <ul className="space-y-1.5">
                  {frontmatter.publications.map((link) => (
                    <li key={link.url}>
                      <Link
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-[#737373] hover:text-[#0a0a0a] transition-colors group"
                      >
                        {link.label}
                        <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </aside>
      )}

      {/* Content */}
      <article className="prose prose-sm max-w-none">
        <MDXRemote source={content} components={MDXComponents} />
      </article>
    </div>
  )
}
