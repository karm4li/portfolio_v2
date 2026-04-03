import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Thoughts, essays, and ideas.',
}

export default function Blog() {
  const posts = getAllPosts()

  // Group by year
  const postsByYear = posts.reduce<Record<string, typeof posts>>((acc, post) => {
    const year = new Date(post.frontmatter.date).getFullYear().toString()
    if (!acc[year]) acc[year] = []
    acc[year].push(post)
    return acc
  }, {})

  const years = Object.keys(postsByYear).sort((a, b) => Number(b) - Number(a))

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <section className="mb-16">
        <h1 className="text-2xl font-semibold tracking-tight mb-4">Writing</h1>
        <p className="text-[#737373] text-base leading-relaxed max-w-lg">
          Thoughts on design, engineering, and the things I find interesting.
        </p>
      </section>

      {posts.length === 0 ? (
        <p className="text-[#737373] text-sm">No posts yet.</p>
      ) : (
        <div className="space-y-12">
          {years.map((year) => (
            <div key={year}>
              <h2 className="text-xs font-medium tracking-widest uppercase text-[#a3a3a3] mb-4">
                {year}
              </h2>
              <div className="divide-y divide-[#e8e8e8]">
                {postsByYear[year].map((post) => (
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
                    <div className="text-right shrink-0 ml-6">
                      <p className="text-xs text-[#a3a3a3] whitespace-nowrap">
                        {post.readTime}
                      </p>
                      <p className="text-xs text-[#c3c3c3] whitespace-nowrap mt-0.5">
                        {formatDate(post.frontmatter.date)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
