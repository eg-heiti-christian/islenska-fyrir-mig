import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider"
import { AppHeader } from "@/components/app-header";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Íslenska fyrir mig",
  description: "Icelandic grammar practice tool",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </head>
      <body className="h-screen overflow-hidden">
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>

          <AppHeader />
          <main className="overflow-y-scroll">
            {children}
          </main>

        </ThemeProvider>
      </body>
    </html>
  )
}

