import type { Metadata } from 'next';
import { Nunito_Sans, Overpass } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const nunitoSans = Nunito_Sans({
  variable: '--font-nunito-sans',
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

const overpass = Overpass({
  variable: '--font-overpass',
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Town of Grimsby - Home-Based Business Hub',
  description:
    'Your one-stop portal for starting, growing, and supporting a home-based business in Grimsby, Ontario.',
  icons: {
    icon: [
      { url: '/grimsby-favicon.png', type: 'image/png' },
    ],
    apple: [
      { url: '/grimsby-favicon.png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunitoSans.variable} ${overpass.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <Header />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
