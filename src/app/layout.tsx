import type { Metadata } from "next"
import { ReactNode } from "react"
import { layoutBody, main as mainClass, shell as shellClass } from "./styles"
import "./globals.css"
import "../styled-system/styles.css"

import { Noto_Sans } from "next/font/google"
import { Footer } from "./_components/Footer"
import { Header } from "./_components/Header"
import { Providers } from "./_components/Providers"

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
})

export const metadata: Metadata = {
  title: "BoardZone – Deskové hry & pivo",
  description: "Rezervujte si stůl v herním baru s deskovkami a řemeslným pivem.",
  icons: {
    icon: "/icon.png",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="cs" suppressHydrationWarning className={notoSans.className}>
      <body className={layoutBody}>
        <Providers>
          <Header />
          <main className={mainClass}>
            <div className={shellClass}>{children}</div>
          </main>
        </Providers>
        <Footer />
      </body>
    </html>
  )
}
