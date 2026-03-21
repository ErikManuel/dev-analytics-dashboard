import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dev Analytics Dashboard | GitHub Developer Analytics',
  description: 'Analytics dashboard para desarrolladores de GitHub. Explora perfiles, repositorios, lenguajes y estadísticas de cualquier usuario de GitHub.',
  keywords: 'github, analytics, developer, dashboard, programming, statistics, repos, stars, forks',
  authors: [{ name: 'Tu Nombre', url: 'https://github.com/tu-usuario' }],
  creator: 'Tu Nombre',
  openGraph: {
    title: 'Dev Analytics Dashboard',
    description: 'Explora estadísticas de desarrolladores de GitHub',
    type: 'website',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dev Analytics Dashboard',
    description: 'Explora estadísticas de desarrolladores de GitHub',
    creator: '@tu-twitter',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme')
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}