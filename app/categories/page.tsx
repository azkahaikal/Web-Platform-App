import Link from 'next/link';
import { getCategories, Category } from '@/lib/api';

export const revalidate = 86400;

const CATEGORY_ICONS: Record<string, string> = {
  smartphones: '📱', laptops: '💻', fragrances: '🌸', skincare: '✨',
  groceries: '🛒', 'home-decoration': '🏡', furniture: '🛋️', tops: '👕',
  'womens-dresses': '👗', 'womens-shoes': '👠', 'mens-shirts': '👔',
  'mens-shoes': '👟', 'mens-watches': '⌚', 'womens-watches': '⌚',
  'womens-bags': '👜', 'womens-jewellery': '💍', sunglasses: '🕶️',
  automotive: '🚗', motorcycle: '🏍️', lighting: '💡',
};

const CATEGORY_DESC: Record<string, string> = {
  smartphones: 'Smartphone & aksesoris terkini',
  laptops: 'Laptop untuk produktivitas & gaming',
  fragrances: 'Parfum & wewangian eksklusif',
  skincare: 'Perawatan kulit premium',
  groceries: 'Kebutuhan dapur sehari-hari',
  'home-decoration': 'Dekorasi rumah estetis',
  furniture: 'Furnitur modern & nyaman',
  tops: 'Atasan kasual & formal',
  'womens-dresses': 'Dress koleksi terbaru',
  'womens-shoes': 'Sepatu wanita elegan',
  'mens-shirts': 'Kemeja pria stylish',
  'mens-shoes': 'Sepatu pria berkualitas',
  'mens-watches': 'Jam tangan pria mewah',
  'womens-watches': 'Jam tangan wanita cantik',
  'womens-bags': 'Tas wanita trendy',
  'womens-jewellery': 'Perhiasan & aksesoris',
  sunglasses: 'Kacamata stylish & UV-proof',
  automotive: 'Aksesoris & perlengkapan mobil',
  motorcycle: 'Perlengkapan motor & bikers',
  lighting: 'Lampu & pencahayaan rumah',
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <>
      <div className="page-hero">
        <span className="render-badge badge-ssg" style={{ margin: '0 auto 1.5rem', display: 'inline-flex' }}>
          <span className="render-dot" />SSG — Static Site Generation
        </span>
        <h1 className="page-hero-title">Semua <span>Kategori</span></h1>
        <p className="page-hero-desc">
          Temukan produk impianmu dari {categories.length} kategori pilihan kami.
        </p>
      </div>

      <div className="section" style={{ paddingTop: '1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.2rem' }}>
          {categories.map((cat: Category) => (
            <Link key={cat.slug} href={`/products?category=${cat.slug}`} style={{ textDecoration: 'none' }}>
              <div className="category-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', height: '100%' }}>
                <span style={{ fontSize: '2.8rem' }}>{CATEGORY_ICONS[cat.slug] || '📦'}</span>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, textTransform: 'capitalize', marginBottom: '0.4rem' }}>
                    {cat.name}
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    {CATEGORY_DESC[cat.slug] || 'Produk pilihan terbaik'}
                  </p>
                </div>
                <span style={{ marginTop: 'auto', fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 600 }}>
                  Lihat produk →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}