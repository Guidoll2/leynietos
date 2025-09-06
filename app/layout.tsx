import type React from "react"
import type { Metadata } from "next"
import { Poppins, Inter } from "next/font/google"
import "./globals.css"
import Footer from "./components/footer"

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
})

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Ciudadanía Española - Ley de Nietos",
  description: "Dashboard para rastrear el estado de trámites de ciudadanía española por ley de nietos",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${poppins.variable} ${inter.variable} antialiased`}>
      <body className="font-poppins bg-gradient-to-br from-blue-50 via-white to-red-50 min-h-screen">
        <div className="animate-fade-in">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
