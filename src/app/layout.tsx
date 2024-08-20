import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { NavLinks } from '@/app/components/nav-links';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Íslenska fyrir mig",
  description: "Icelandic grammar practice tool",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <NavLinks />
        <main>{children}</main>
      </body>
    </html>
  )
}

