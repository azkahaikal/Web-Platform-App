'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const [checkoutDone, setCheckoutDone] = useState(false);

  const handleCheckout = () => {
    clearCart();
    setCheckoutDone(true);
  };

  if (checkoutDone) {
    return (
      <div className="cart-page" style={{ textAlign: 'center', paddingTop: '6rem' }}>
        <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>🎉</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 700, marginBottom: '1rem' }}>
          Pesanan <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Berhasil!</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>
          Terima kasih telah berbelanja di NexShop.
        </p>
        <Link href="/products" className="btn-primary" style={{ display: 'inline-flex' }}>
          Lanjut Belanja →
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <span className="render-badge badge-csr">
          <span className="render-dot" />CSR — Client-Side Rendering
        </span>
        <h1 className="cart-page-title">Keranjang <span>Belanja</span></h1>
        <div className="cart-empty">
          <div className="cart-empty-icon">🛒</div>
          <p>Keranjangmu masih kosong. Yuk mulai belanja!</p>
          <Link href="/products" className="btn-primary" style={{ display: 'inline-flex' }}>
            Mulai Belanja →
          </Link>
        </div>
      </div>
    );
  }

  const shipping = totalPrice > 100 ? 0 : 9.99;
  const tax = totalPrice * 0.11;
  const grandTotal = totalPrice + shipping + tax;

  return (
    <div className="cart-page">
      <span className="render-badge badge-csr">
        <span className="render-dot" />CSR — Data dari Context API
      </span>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2.5rem' }}>
        <h1 className="cart-page-title" style={{ margin: 0 }}>
          Keranjang <span>Belanja</span>
        </h1>
        <button onClick={clearCart}
          style={{ background: 'none', border: '1px solid rgba(224,82,82,0.3)', color: '#e05252', borderRadius: '8px', padding: '0.5rem 1rem', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, fontFamily: 'var(--font-body)' }}>
          Hapus Semua
        </button>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img
                src={item.thumbnail || item.image || '/placeholder.png'}
                alt={item.title}
                className="cart-item-img"
              />
              <div className="cart-item-info">
                <p className="cart-item-title">{item.title}</p>
                <p className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</p>
                <div className="cart-qty">
                  <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                  <span className="qty-count">{item.quantity}</span>
                  <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginLeft: '0.3rem' }}>
                    × ${item.price}/pcs
                  </span>
                </div>
              </div>
              <button className="cart-remove" onClick={() => removeFromCart(item.id)}>✕</button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2 className="cart-summary-title">Ringkasan Pesanan</h2>
          <div className="summary-row"><span>Subtotal ({totalItems} item)</span><span>${totalPrice.toFixed(2)}</span></div>
          <div className="summary-row"><span>Ongkos Kirim</span><span>{shipping === 0 ? '🎉 Gratis' : `$${shipping.toFixed(2)}`}</span></div>
          <div className="summary-row"><span>Pajak (11%)</span><span>${tax.toFixed(2)}</span></div>
          {totalPrice <= 100 && (
            <div style={{ background: 'var(--accent-dim)', border: '1px solid rgba(232,200,122,0.2)', borderRadius: '8px', padding: '0.7rem', fontSize: '0.82rem', color: 'var(--accent)', margin: '0.8rem 0' }}>
              💡 Tambah ${(100 - totalPrice).toFixed(2)} lagi untuk gratis ongkir!
            </div>
          )}
          <div className="summary-total">
            <span>Total</span>
            <span>${grandTotal.toFixed(2)}</span>
          </div>
          <button className="btn-checkout" onClick={handleCheckout}>Checkout Sekarang →</button>
          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <Link href="/products" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textDecoration: 'none' }}>
              ← Lanjut Belanja
            </Link>
          </div>
          <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border)', display: 'flex', gap: '1rem', justifyContent: 'center', fontSize: '0.78rem', color: 'var(--text-dim)' }}>
            <span>🔒 Pembayaran Aman</span>
            <span>📦 Garansi Retur</span>
            <span>⚡ Fast Delivery</span>
          </div>
        </div>
      </div>
    </div>
  );
}