import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import Notification from '@/components/Notification';
import Footer from '@/components/Footer';
import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'NexShop — Modern E-Commerce',
  description: 'Temukan produk impianmu dengan harga terbaik',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CartProvider>
          <Navbar />
          <Notification />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}