import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about who I am and what I do.',
}

const timeline = [
  {
    year: '2024',
    role: 'Senior Engineer',
    place: 'Company Name',
    description: 'Leading product development for core platform.',
  },
  {
    year: '2022',
    role: 'Engineer',
    place: 'Previous Company',
    description: 'Built and shipped features used by millions.',
  },
  {
    year: '2020',
    role: 'B.S. Computer Science',
    place: 'University Name',
    description: 'Focus on systems and human-computer interaction.',
  },
]

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">

      {/* Header */}
      <section className="mb-16">
        <h1 className="text-2xl font-semibold tracking-tight mb-6">
          About
        </h1>
        <div className="space-y-4 text-[#1a1a1a] leading-relaxed">
          <p>
            I&apos;m a designer and engineer based in{' '}
            <span className="font-medium">Your City</span>. I care deeply about
            craft, clarity, and building things that actually work for people.
          </p>
          <p>
            My work sits at the intersection of engineering and design — I&apos;m
            equally comfortable defining system architecture as I am sweating
            over typography and interaction details.
          </p>
          <p>
            Outside of work, I write about ideas that interest me, read broadly,
            and try to stay curious about the world.
          </p>
        </div>
      </section>

      {/* Currently */}
      <section className="mb-16">
        <h2 className="text-xs font-medium tracking-widest uppercase text-[#737373] mb-6">
          Currently
        </h2>
        <div className="space-y-3 text-sm text-[#1a1a1a]">
          <p>Working on — <span className="text-[#737373]">something you&apos;re building</span></p>
          <p>Reading — <span className="text-[#737373]">a book title</span></p>
          <p>Thinking about — <span className="text-[#737373]">a topic or idea</span></p>
          <p>Listening to — <span className="text-[#737373]">an artist or album</span></p>
        </div>
      </section>

      {/* Timeline */}
      <section className="mb-16">
        <h2 className="text-xs font-medium tracking-widest uppercase text-[#737373] mb-6">
          Experience
        </h2>
        <div className="space-y-6">
          {timeline.map((item, i) => (
            <div key={i} className="flex gap-8">
              <span className="text-sm text-[#a3a3a3] tabular-nums w-10 shrink-0 pt-px">
                {item.year}
              </span>
              <div>
                <p className="text-sm font-medium">{item.role}</p>
                <p className="text-sm text-[#737373]">{item.place}</p>
                <p className="text-sm text-[#737373] mt-1">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Links */}
      <section>
        <h2 className="text-xs font-medium tracking-widest uppercase text-[#737373] mb-6">
          Find me
        </h2>
        <ul className="space-y-2">
          {[
            { label: 'GitHub', href: 'https://github.com/yourusername' },
            { label: 'Twitter / X', href: 'https://twitter.com/yourusername' },
            { label: 'LinkedIn', href: 'https://linkedin.com/in/yourusername' },
            { label: 'Email', href: 'mailto:you@example.com' },
          ].map(({ label, href }) => (
            <li key={label}>
              <Link
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[#737373] hover:text-[#0a0a0a] transition-colors group"
              >
                <span className="w-4 h-px bg-[#e8e8e8] group-hover:bg-[#0a0a0a] transition-colors" />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
