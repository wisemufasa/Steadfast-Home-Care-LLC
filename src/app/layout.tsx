import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Figtree, Newsreader } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),

  title: `${site.name} | In-Home Care`,

  description:
    "Compassionate in-home personal care, companionship, household assistance, and respite services.",

  openGraph: {
    title: `${site.name} | In-Home Care`,
    description:
      "Dependable, compassionate care at home for individuals and families.",
    type: "website",
    url: site.domain,
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${figtree.variable} ${newsreader.variable}`}>
        {children}
      </body>
    </html>
  );
}

