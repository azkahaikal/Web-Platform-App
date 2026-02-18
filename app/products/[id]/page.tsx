'use client';

import { useCart } from '@/context/CartContext';
import { CartItem } from '@/context/CartContext';

export default function AddToCartButton({ product }: { product: CartItem }) {
  const { addToCart } = useCart();
  return (
    <button
      className="btn-primary"
      style={{ flex: 1, justifyContent: 'center', fontSize: '1rem', padding: '1rem' }}
      onClick={() => addToCart(product)}
    >
      🛒 Tambah ke Keranjang
    </button>
  );
}