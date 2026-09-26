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
  title: "全球央行货币政策",
  description:
    "对照美联储、欧洲央行、英格兰银行、日本银行、加拿大银行、中国人民银行、印度储备银行、新加坡金融管理局和澳大利亚储备银行的政策立场。数据阅读日 2026-09-26。",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${noto.variable} antialiased`}>{children}</body>
    </html>
  )
}
