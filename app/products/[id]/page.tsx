import Link from 'next/link';
import AddToCartButton from './AddToCartButton';

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  category: string;
  rating: number;
  stock: number;
  brand?: string;
  sku?: string;
  weight?: number;
  warrantyInformation?: string;
  shippingInformation?: string;
  tags?: string[];
};

async function getProduct(id: string) {
  try {
    const res = await fetch(`https://dummyjson.com/products/${id}`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

async function getRelatedProducts(category: string) {
  try {
    const res = await fetch(`https://dummyjson.com/products/category/${category}?limit=4`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.products;
  } catch (error) {
    console.error('Error fetching related products:', error);
    return [];
  }
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  if (!product) return { title: 'Produk tidak ditemukan' };
  return {
    title: `${product.title} — NexShop`,
    description: product.description,
  };
}

function StarRating({ rating }: { rating: number }) {
  const full = Math.min(5, Math.max(0, Math.round(rating)));
  return <span className="stars">{'★'.repeat(full)}{'☆'.repeat(5 - full)}</span>;
}

export default async function ProductDetailPage(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const product: Product | null = await getProduct(id);


  if (!product) {
    return (
      <div className="detail-page" style={{ textAlign: 'center', paddingTop: '6rem' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>😕</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '1rem' }}>
          Produk Tidak Ditemukan
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
          Produk tidak tersedia atau sudah dihapus.
        </p>
        <Link href="/products" className="btn-primary">← Kembali ke Produk</Link>
      </div>
    );
  }

  const related = await getRelatedProducts(product.category);

  return (
    <div className="detail-page">
      <span className="render-badge badge-ssr" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
        <span className="render-dot" />
        SSR — Server-Side Rendering
      </span>

      <Link href="/products" className="back-link">← Kembali ke Produk</Link>

      <div className="detail-grid">
        {/* Product Image */}
        <div className="detail-img-wrap">
          <img src={product.thumbnail} alt={product.title} />
        </div>

        {/* Product Info */}
        <div className="detail-info">
          <p className="detail-eyebrow">{product.category}</p>
          <h1 className="detail-title">{product.title}</h1>

          <div className="detail-rating">
            <StarRating rating={product.rating} />
            <span>{product.rating.toFixed(1)} dari 5</span>
            <span>·</span>
            <span>{product.stock} stok tersedia</span>
          </div>

          <p className="detail-price">${product.price}</p>
          <p className="detail-desc">{product.description}</p>

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    background: 'var(--border)',
                    border: '1px solid var(--border)',
                    borderRadius: '6px',
                    padding: '0.25rem 0.7rem',
                    fontSize: '0.78rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Add to cart */}
          <div className="detail-actions">
            <AddToCartButton product={product as any} />
            <button className="btn-outline">♡</button>
          </div>

          {/* Product specs */}
          <div style={{
            marginTop: '2rem',
            padding: '1.2rem',
            background: 'var(--bg-card)',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--border)',
          }}>
            {[
              ['Brand', product.brand],
              ['SKU', product.sku],
              ['Berat', product.weight ? `${product.weight}g` : null],
              ['Garansi', product.warrantyInformation],
              ['Pengiriman', product.shippingInformation],
            ].filter(([, v]) => v).map(([label, value]) => (
              <div
                key={label}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0.5rem 0',
                  borderBottom: '1px solid var(--border)',
                  fontSize: '0.88rem',
                }}
              >
                <span style={{ color: 'var(--text-muted)' }}>{label}</span>
                <span style={{ fontWeight: 500 }}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div style={{ marginTop: '5rem' }}>
          <h2 className="section-title" style={{ marginBottom: '2rem' }}>
            Produk <span>Terkait</span>
          </h2>
          <div className="product-grid">
            {related.slice(0, 4).map((p: Product) => (
              <Link key={p.id} href={`/products/${p.id}`} style={{ textDecoration: 'none' }}>
                <div className="product-card">
                  <div className="product-image-wrap">
                    <img src={p.thumbnail} alt={p.title} />
                  </div>
                  <div className="product-info">
                    <p className="product-category">{p.category}</p>
                    <h3 className="product-title">{p.title}</h3>
                    <div className="product-meta">
                      <span className="product-price">${p.price}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}