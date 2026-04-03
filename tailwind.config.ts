import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          "'Segoe UI'",
          'Inter',
          'system-ui',
          'sans-serif',
        ],
        mono: [
          "'JetBrains Mono'",
          "'Fira Code'",
          'ui-monospace',
          'monospace',
        ],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        muted: 'var(--muted)',
        border: 'var(--border)',
        card: 'var(--card)',
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': '#1a1a1a',
            '--tw-prose-headings': '#0a0a0a',
            '--tw-prose-lead': '#4b5563',
            '--tw-prose-links': '#0a0a0a',
            '--tw-prose-bold': '#0a0a0a',
            '--tw-prose-counters': '#6b7280',
            '--tw-prose-bullets': '#d1d5db',
            '--tw-prose-hr': '#e5e7eb',
            '--tw-prose-quotes': '#111827',
            '--tw-prose-quote-borders': '#e5e7eb',
            '--tw-prose-captions': '#6b7280',
            '--tw-prose-code': '#0a0a0a',
            '--tw-prose-pre-code': '#e5e7eb',
            '--tw-prose-pre-bg': '#111827',
            '--tw-prose-th-borders': '#d1d5db',
            '--tw-prose-td-borders': '#e5e7eb',
            maxWidth: 'none',
            a: {
              fontWeight: '400',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
              '&:hover': {
                opacity: 0.7,
              },
            },
            code: {
              fontWeight: '400',
              fontSize: '0.875em',
              backgroundColor: '#f4f4f4',
              padding: '0.15em 0.4em',
              borderRadius: '0.25rem',
              '&::before': { content: '""' },
              '&::after': { content: '""' },
            },
            'h1,h2,h3,h4': {
              fontWeight: '600',
              letterSpacing: '-0.025em',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
