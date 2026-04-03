import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const projectsDirectory = path.join(process.cwd(), 'content/projects')

export interface ProjectLink {
  label: string
  url: string
}

export interface ProjectFrontmatter {
  title: string
  date: string
  description: string
  tags: string[]
  status: 'completed' | 'in-progress' | 'archived'
  role: string
  featured?: boolean
  published?: boolean
  links?: ProjectLink[]
  research?: ProjectLink[]
  publications?: ProjectLink[]
  cover?: string
  year?: string
}

export interface Project {
  slug: string
  frontmatter: ProjectFrontmatter
  content: string
}

export function getAllProjects(): Project[] {
  if (!fs.existsSync(projectsDirectory)) return []

  const filenames = fs.readdirSync(projectsDirectory)

  return filenames
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
    .map((filename) => {
      const slug = filename.replace(/\.mdx?$/, '')
      const fullPath = path.join(projectsDirectory, filename)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        frontmatter: data as ProjectFrontmatter,
        content,
      }
    })
    .filter((project) => project.frontmatter.published !== false)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    )
}

export function getProjectBySlug(slug: string): Project | null {
  const fullPath = path.join(projectsDirectory, `${slug}.mdx`)
  const altPath = path.join(projectsDirectory, `${slug}.md`)

  const filePath = fs.existsSync(fullPath) ? fullPath : fs.existsSync(altPath) ? altPath : null
  if (!filePath) return null

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug,
    frontmatter: data as ProjectFrontmatter,
    content,
  }
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((p) => p.frontmatter.featured)
}
