import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AIProcessingIndicator } from "@/components/ai-processing-indicator"

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" })

export const metadata: Metadata = {
  title: "Social Media Portfolio Dashboard",
  description: "Manage your social media portfolio records",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          {/* This will be client-side rendered and controlled by the AI rewrite button */}
          <AIProcessingIndicator isProcessing={false} />
        </ThemeProvider>
      </body>
    </html>
  )
}
