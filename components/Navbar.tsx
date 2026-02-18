'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav className="navbar">
      <Link href="/" className="navbar-brand">NexShop</Link>
      <ul className="navbar-links">
        <li><Link href="/">Beranda</Link></li>
        <li><Link href="/products">Produk</Link></li>
        <li><Link href="/categories">Kategori</Link></li>
        <li>
          <Link href="/cart" className="cart-btn">
            🛒 Keranjang
            {totalItems > 0 && (
              <span className="cart-badge">{totalItems}</span>
            )}
          </Link>
        </li>
      </ul>
    </nav>
  );
}