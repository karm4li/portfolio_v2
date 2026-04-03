import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const postsDirectory = path.join(process.cwd(), 'content/blog')

export interface PostFrontmatter {
  title: string
  date: string
  excerpt: string
  tags: string[]
  published?: boolean
}

export interface Post {
  slug: string
  frontmatter: PostFrontmatter
  readTime: string
  readMinutes: number
  content: string
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) return []

  const filenames = fs.readdirSync(postsDirectory)

  return filenames
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
    .map((filename) => {
      const slug = filename.replace(/\.mdx?$/, '')
      const fullPath = path.join(postsDirectory, filename)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      const stats = readingTime(content)

      return {
        slug,
        frontmatter: data as PostFrontmatter,
        readTime: stats.text,
        readMinutes: Math.ceil(stats.minutes),
        content,
      }
    })
    .filter((post) => post.frontmatter.published !== false)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    )
}

export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`)
  const altPath = path.join(postsDirectory, `${slug}.md`)

  const filePath = fs.existsSync(fullPath) ? fullPath : fs.existsSync(altPath) ? altPath : null
  if (!filePath) return null

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  const stats = readingTime(content)

  return {
    slug,
    frontmatter: data as PostFrontmatter,
    readTime: stats.text,
    readMinutes: Math.ceil(stats.minutes),
    content,
  }
}
