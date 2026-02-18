import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { getProducts, getCategories, Product, Category } from '@/lib/api';

const CATEGORY_ICONS: Record<string, string> = {
  smartphones: '📱', laptops: '💻', fragrances: '🌸', skincare: '✨',
  groceries: '🛒', 'home-decoration': '🏡', furniture: '🛋️', tops: '👕',
  'womens-dresses': '👗', 'womens-shoes': '👠', 'mens-shirts': '👔',
  'mens-shoes': '👟', 'mens-watches': '⌚', 'womens-watches': '⌚',
  'womens-bags': '👜', 'womens-jewellery': '💍', sunglasses: '🕶️',
  automotive: '🚗', motorcycle: '🏍️', lighting: '💡',
};

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    getProducts(8),
    getCategories(),
  ]);

  const featured = products.slice(0, 8);
  const topCategories = categories.slice(0, 8);

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-grid">
          <div className="hero-content">
            <p className="hero-eyebrow">New Collection 2026</p>
            <h1 className="hero-title">
              Belanja Lebih <span>Cerdas,</span> Hidup Lebih <span>Gaya</span>
            </h1>
            <p className="hero-desc">
              Temukan ribuan produk pilihan dari smartphone terkini hingga fashion terbaik.
              Kualitas premium, harga terjangkau — semua ada di NexShop.
            </p>
            <div className="hero-actions">
              <Link href="/products" className="btn-primary">Belanja Sekarang →</Link>
              <Link href="/categories" className="btn-outline">Lihat Kategori</Link>
            </div>
          </div>
          <div className="hero-visual">
            {featured.slice(0, 4).map((p: Product) => (
              <div key={p.id} className="hero-card">
                <img src={p.thumbnail} alt={p.title} loading="lazy" />
                <div className="hero-card-info">
                  <p className="hero-card-name">{p.title}</p>
                  <p className="hero-card-price">${p.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="stats-bar">
        <div className="stats-inner">
          <div><span className="stat-value">10K+</span><span className="stat-label">Produk Tersedia</span></div>
          <div><span className="stat-value">50K+</span><span className="stat-label">Pelanggan Puas</span></div>
          <div><span className="stat-value">99%</span><span className="stat-label">Rating Kepuasan</span></div>
          <div><span className="stat-value">24/7</span><span className="stat-label">Layanan Support</span></div>
        </div>
      </div>

      {/* CATEGORIES */}
      <div className="section">
        <span className="render-badge badge-ssg">
          <span className="render-dot" />SSG — Static Site Generation
        </span>
        <div className="section-header">
          <h2 className="section-title">Jelajahi <span>Kategori</span></h2>
          <Link href="/categories" className="section-link">Lihat semua →</Link>
        </div>
        <div className="category-grid">
          {topCategories.map((cat: Category) => (
            <Link key={cat.slug} href={`/products?category=${cat.slug}`} className="category-card">
              <span className="category-icon">{CATEGORY_ICONS[cat.slug] || '📦'}</span>
              <span className="category-name">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* FEATURED */}
      <div className="section" style={{ paddingTop: 0 }}>
        <span className="render-badge badge-ssg">
          <span className="render-dot" />SSG — Data di-fetch saat build time
        </span>
        <div className="section-header">
          <h2 className="section-title">Produk <span>Unggulan</span></h2>
          <Link href="/products" className="section-link">Lihat semua →</Link>
        </div>
        <div className="product-grid">
          {featured.map((product: Product, i: number) => (
            <ProductCard
              key={product.id}
              product={product}
              badge={i < 3 ? 'Populer' : null}
            />
          ))}
        </div>
      </div>
    </>
  );
}