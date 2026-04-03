import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllProjects } from '@/lib/projects'

export const metadata: Metadata = {
  title: 'Work',
  description: 'A selection of projects I have worked on.',
}

const statusLabel = {
  completed: 'Completed',
  'in-progress': 'In Progress',
  archived: 'Archived',
}

export default function Work() {
  const projects = getAllProjects()

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <section className="mb-16">
        <h1 className="text-2xl font-semibold tracking-tight mb-4">Work</h1>
        <p className="text-[#737373] text-base leading-relaxed max-w-lg">
          A selection of projects — ranging from research to shipped product.
          Each tells a different part of the story.
        </p>
      </section>

      {projects.length === 0 ? (
        <p className="text-[#737373] text-sm">No projects yet.</p>
      ) : (
        <div className="divide-y divide-[#e8e8e8]">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className="group block py-8 hover:bg-[#fafafa] -mx-3 px-3 rounded-md transition-colors duration-150"
            >
              <div className="flex items-start justify-between gap-8">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-base font-semibold tracking-tight group-hover:opacity-70 transition-opacity">
                      {project.frontmatter.title}
                    </h2>
                    {project.frontmatter.status === 'in-progress' && (
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full border border-[#e8e8e8] text-[#737373] uppercase tracking-wide shrink-0">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[#737373] leading-relaxed mb-4 max-w-lg">
                    {project.frontmatter.description}
                  </p>
                  {project.frontmatter.tags && (
                    <div className="flex flex-wrap gap-2">
                      {project.frontmatter.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs text-[#737373] px-2 py-0.5 rounded border border-[#e8e8e8] bg-[#fafafa]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-xs text-[#a3a3a3] tabular-nums shrink-0 mt-1">
                  {project.frontmatter.year || new Date(project.frontmatter.date).getFullYear()}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
