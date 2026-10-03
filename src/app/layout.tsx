import type { Metadata } from "next"
import { Noto_Sans_SC } from "next/font/google"
import "./globals.css"

const noto = Noto_Sans_SC({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Global central bank policy",
  description:
    "An English-language visual comparison of policy rates, inflation targets, decision makers and policy cycles across nine major central banks. Updated 3 October 2026.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${noto.variable} antialiased`}>{children}</body>
    </html>
  )
}
