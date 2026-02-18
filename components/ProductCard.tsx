'use client';

import Link from 'next/link';
import { useCart, CartItem } from '@/context/CartContext';
import { Product } from '@/lib/api';

type Props = {
  product: Product;
  badge?: string | null;
};

function StarRating({ rating }: { rating: number }) {
  const full = Math.min(5, Math.max(0, Math.round(rating)));
  return (
    <span className="stars">
      {'★'.repeat(full)}{'☆'.repeat(5 - full)}
    </span>
  );
}

export default function ProductCard({ product, badge }: Props) {
  const { addToCart } = useCart();

  const getRating = (): number => {
    if (typeof product.rating === 'number') return product.rating;
    if (typeof product.rating === 'object' && product.rating !== null) {
      return (product.rating as { rate: number }).rate;
    }
    return 4;
  };

  const getRatingCount = (): number | string => {
    if (typeof product.rating === 'object' && product.rating !== null) {
      return (product.rating as { count: number }).count;
    }
    return product.stock ?? '—';
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    // Cast product ke CartItem karena strukturnya kompatibel
    addToCart(product as unknown as CartItem);
  };

  return (
    <div className="product-card">
      <div className="product-image-wrap">
        {badge && <span className="product-badge">{badge}</span>}
        <img
          src={product.thumbnail || product.image || '/placeholder.png'}
          alt={product.title}
          loading="lazy"
        />
      </div>
      <div className="product-info">
        <p className="product-category">{product.category}</p>
        <h3 className="product-title">{product.title}</h3>
        <div className="product-meta">
          <span className="product-price">${product.price}</span>
          <span className="product-rating">
            <StarRating rating={getRating()} />
            <span>({getRatingCount()})</span>
          </span>
        </div>
      </div>
      <div className="product-actions">
        <button className="btn-add-cart" onClick={handleAdd}>
          + Keranjang
        </button>
        <Link href={`/products/${product.id}`} className="btn-detail">›</Link>
      </div>
    </div>
  );
}