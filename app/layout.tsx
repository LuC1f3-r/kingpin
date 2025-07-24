import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kingpin Coming Soon',
  description: 'A sleek, modern coming soon page with smooth scrolling and email capture',
  keywords: 'coming soon, email capture, smooth scrolling, modern design',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
