import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { DEFAULT_SEO, SITE_URL } from "@/lib/constants";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: `%s | ${DEFAULT_SEO.title}`,
    default: DEFAULT_SEO.title,
  },
  description: DEFAULT_SEO.description,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: DEFAULT_SEO.title,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
