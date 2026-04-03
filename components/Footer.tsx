import Link from 'next/link'

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/yourusername' },
  { label: 'Twitter', href: 'https://twitter.com/yourusername' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/yourusername' },
  { label: 'Email', href: 'mailto:you@example.com' },
]

export default function Footer() {
  return (
    <footer className="border-t border-[#e8e8e8] mt-24">
      <div className="max-w-3xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <p className="text-sm text-[#737373]">
          © {new Date().getFullYear()} Your Name
        </p>

        <ul className="flex items-center gap-5">
          {socialLinks.map(({ label, href }) => (
            <li key={label}>
              <Link
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#737373] hover:text-[#0a0a0a] transition-colors duration-150"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
