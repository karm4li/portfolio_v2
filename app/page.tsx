import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getAllPosts } from '@/lib/posts'
import { getFeaturedProjects, getAllProjects } from '@/lib/projects'
import { formatDate } from '@/lib/utils'

export default function Home() {
  const posts = getAllPosts().slice(0, 3)
  const featuredProjects = getFeaturedProjects()
  const projects = featuredProjects.length > 0 ? featuredProjects : getAllProjects().slice(0, 3)

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">

      {/* Hero */}
      <section className="mb-24">
        <h1 className="text-2xl font-semibold tracking-tight mb-4">
          Your Name
        </h1>
        <p className="text-lg text-[#1a1a1a] leading-relaxed max-w-xl mb-6">
          Designer, engineer, and curious mind. I build things at the
          intersection of craft and technology — with a focus on clarity,
          simplicity, and systems that scale.
        </p>
        <p className="text-base text-[#737373] leading-relaxed max-w-xl">
          Currently working on{' '}
          <span className="text-[#0a0a0a]">something interesting</span>. Based
          in <span className="text-[#0a0a0a]">Your City</span>.
        </p>
      </section>

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xs font-medium tracking-widest uppercase text-[#737373]">
              Selected Work
            </h2>
            <Link
              href="/work"
              className="text-xs text-[#737373] hover:text-[#0a0a0a] transition-colors inline-flex items-center gap-1 group"
            >
              All projects
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="divide-y divide-[#e8e8e8]">
            {projects.map((project) => (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                className="group flex items-baseline justify-between py-4 hover:bg-[#fafafa] -mx-3 px-3 rounded-md transition-colors duration-150"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-sm font-medium group-hover:opacity-70 transition-opacity">
                      {project.frontmatter.title}
                    </h3>
                    {project.frontmatter.status === 'in-progress' && (
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full border border-[#e8e8e8] text-[#737373] uppercase tracking-wide">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[#737373] truncate pr-8">
                    {project.frontmatter.description}
                  </p>
                </div>
                <span className="text-xs text-[#a3a3a3] shrink-0 ml-4 tabular-nums">
                  {project.frontmatter.year || new Date(project.frontmatter.date).getFullYear()}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Writing */}
      {posts.length > 0 && (
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xs font-medium tracking-widest uppercase text-[#737373]">
              Recent Writing
            </h2>
            <Link
              href="/blog"
              className="text-xs text-[#737373] hover:text-[#0a0a0a] transition-colors inline-flex items-center gap-1 group"
            >
              All posts
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="divide-y divide-[#e8e8e8]">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex items-baseline justify-between py-4 hover:bg-[#fafafa] -mx-3 px-3 rounded-md transition-colors duration-150"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium mb-1 group-hover:opacity-70 transition-opacity">
                    {post.frontmatter.title}
                  </h3>
                  <p className="text-sm text-[#737373] truncate pr-8">
                    {post.frontmatter.excerpt}
                  </p>
                </div>
                <span className="text-xs text-[#a3a3a3] shrink-0 ml-4 whitespace-nowrap">
                  {post.readTime}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Empty state */}
      {posts.length === 0 && projects.length === 0 && (
        <section className="py-16 text-center">
          <p className="text-[#737373] text-sm">Content coming soon.</p>
        </section>
      )}
    </div>
  )
}
