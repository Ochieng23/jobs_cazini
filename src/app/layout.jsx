import '@/styles/tailwind.css'
import { SessionProvider } from '@/contexts/SessionContext'
export const metadata = {
  title: {
    template: '%s - Cazini',
    default: 'Cazini',
  },
  description: '',
}

export default async function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="text-zinc-950 antialiased lg:bg-zinc-100 dark:bg-zinc-900 dark:text-white dark:lg:bg-zinc-950"
    >
      <head>
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </head>
      
      <body>
      <SessionProvider>
        {children}
      </SessionProvider>
      </body>
    </html>
  )
}
