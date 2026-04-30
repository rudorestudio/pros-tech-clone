import type { Metadata } from "next";
import { SiteToaster } from "@/components/SiteToaster";
import "./globals.css";

export const metadata: Metadata = {
  title: "Les Pros de la Tech",
  description: "Communaute tech - version Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;800&family=Inter:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <SiteToaster />
      </body>
    </html>
  );
}
