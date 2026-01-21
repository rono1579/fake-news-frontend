import type React from "react"
import type { Metadata } from "next"
import { Outfit } from "next/font/google"
import { Crimson_Pro } from "next/font/google"
import { Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
})

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  variable: "--font-crimson",
  display: "swap",
})

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  title: "TruthLens - AI-Powered Text Verification",
  description: "Advanced NLP platform for fake news detection, plagiarism checking, and text analysis",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/OIP.ico" />
      </head>
      <body className={`font-sans ${outfit.variable} ${crimsonPro.variable} ${playfairDisplay.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Suspense fallback={<div>Loading...</div>}>
            <Navbar />
          </Suspense>
          <main className="min-h-screen">{children}</main>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
