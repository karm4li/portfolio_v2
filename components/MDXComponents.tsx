import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

// Custom callout component for highlighting key points
function Callout({
  children,
  type = 'note',
}: {
  children: React.ReactNode
  type?: 'note' | 'warning' | 'insight'
}) {
  return (
    <div
      className={cn(
        'my-6 pl-4 py-4 pr-5 rounded-r-md border-l-2 bg-[#fafafa]',
        type === 'note' && 'border-[#d4d4d4]',
        type === 'warning' && 'border-yellow-400',
        type === 'insight' && 'border-[#0a0a0a]'
      )}
    >
      {type === 'insight' && (
        <p className="text-[10px] font-medium tracking-widest uppercase text-[#737373] mb-2">
          Key insight
        </p>
      )}
      <div className="text-sm text-[#1a1a1a] leading-relaxed [&>p]:m-0">
        {children}
      </div>
    </div>
  )
}

// Project section divider with label
function Section({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="my-10">
      <div className="flex items-center gap-4 mb-6">
        <span className="text-[10px] font-medium tracking-widest uppercase text-[#a3a3a3]">
          {label}
        </span>
        <div className="flex-1 h-px bg-[#e8e8e8]" />
      </div>
      {children}
    </div>
  )
}

// External reference link
function Ref({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-[#737373] hover:text-[#0a0a0a] transition-colors border-b border-[#e8e8e8] hover:border-[#0a0a0a] pb-px"
    >
      {children}
      <ExternalLink className="w-2.5 h-2.5 shrink-0" />
    </Link>
  )
}

// Metric/stat display
function Metric({
  value,
  label,
}: {
  value: string
  label: string
}) {
  return (
    <div className="text-center p-6 rounded-lg border border-[#e8e8e8] bg-[#fafafa]">
      <p className="text-2xl font-semibold tracking-tight mb-1">{value}</p>
      <p className="text-xs text-[#737373] uppercase tracking-widest">{label}</p>
    </div>
  )
}

// Metric grid container
function Metrics({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-8">{children}</div>
  )
}

// Image with caption
function Figure({
  src,
  alt,
  caption,
}: {
  src: string
  alt: string
  caption?: string
}) {
  return (
    <figure className="my-8">
      <img
        src={src}
        alt={alt}
        className="w-full rounded-lg border border-[#e8e8e8]"
      />
      {caption && (
        <figcaption className="text-xs text-[#a3a3a3] text-center mt-3">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

const MDXComponents = {
  Callout,
  Section,
  Ref,
  Metric,
  Metrics,
  Figure,
  // Override default elements
  a: ({
    href,
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isExternal = href?.startsWith('http')
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
          className="underline underline-offset-2 decoration-[#d4d4d4] hover:decoration-[#0a0a0a] transition-colors"
        >
          {children}
        </a>
      )
    }
    return (
      <Link
        href={href || '#'}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        className="underline underline-offset-2 decoration-[#d4d4d4] hover:decoration-[#0a0a0a] transition-colors"
      >
        {children}
      </Link>
    )
  },
  hr: () => <hr className="my-12 border-[#e8e8e8]" />,
}

export default MDXComponents
