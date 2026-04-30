import type { Metadata } from "next";
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
      <body>{children}</body>
    </html>
  );
}
