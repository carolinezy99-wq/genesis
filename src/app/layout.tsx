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
    "Policy stance for the Federal Reserve, ECB, Bank of England, Bank of Japan, Bank of Canada, People's Bank of China, Reserve Bank of India, Monetary Authority of Singapore, and Reserve Bank of Australia. Figures read on 2026-09-26. English and Chinese.",
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
