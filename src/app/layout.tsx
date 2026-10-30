import type { Metadata } from "next";
import { Figtree, Newsreader } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree", display: "swap" });
const newsreader = Newsreader({ subsets: ["latin"], variable: "--font-newsreader", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: `${site.name} | In-Home Care`,
  description: "Dependable personal care, companionship, household assistance, and respite services for families in the Austin and Houston metro areas.",
  openGraph: { title: site.name, description: "Caring help at home, when you need it.", type: "website", url: site.domain },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${figtree.variable} ${newsreader.variable}`}>{children}</body></html>;
}
