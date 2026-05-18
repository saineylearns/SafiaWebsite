import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Safia Touray — Photography & Film",
  description: "Film photographer based in Manchester. Portraiture, editorial, documentary.",
  openGraph: {
    title: "Safia Touray — Photography & Film",
    description: "Film photographer based in Manchester.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&family=Roboto+Condensed:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
