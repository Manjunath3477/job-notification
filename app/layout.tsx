import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'India Job Notifications | Latest Govt Jobs, Sarkari Result & Latest Job Alerts 2024',
  description: 'Get instant India job notifications for government jobs, latest job alerts, and recruitment updates. Your #1 portal for latest jobs, sarkari results, and career notifications across India.',
  keywords: 'jobs, notifications, india jobs, job notifications, latest job alerts, latest jobs, government jobs, india job notifications, sarkari result, upsc, ssc, banking jobs, railway recruitment 2024',
  authors: [{ name: 'India Job Notifications' }],
  robots: 'index, follow, max-image-preview:large',
  openGraph: {
    type: 'website',
    url: 'https://indiajobnotifications.com/',
    title: 'India Job Notifications | Latest Job Alerts & Govt Jobs',
    description: 'Stay updated with India Job Notifications. Get the latest jobs, government job alerts, and recruitment updates daily. Fast, reliable, and comprehensive.',
    images: ['https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=1200'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'India Job Notifications | Latest Recruitment Alerts',
    description: 'The fastest portal for latest job alerts and government jobs across India. Never miss a notification again.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
