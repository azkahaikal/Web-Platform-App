'use client';

import { useState, useEffect, useMemo } from 'react';
import ProductCard from '@/components/ProductCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Product, Category } from '@/lib/api';

const SORT_OPTIONS = [
  { value: 'default', label: 'Urutan Default' },
  { value: 'price-asc', label: 'Harga: Terendah' },
  { value: 'price-desc', label: 'Harga: Tertinggi' },
  { value: 'rating', label: 'Rating Terbaik' },
  { value: 'name', label: 'Nama A–Z' },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [page, setPage] = useState(1);
  const PER_PAGE = 12;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [pRes, cRes] = await Promise.all([
          fetch('https://dummyjson.com/products?limit=100'),
          fetch('https://dummyjson.com/products/categories'),
        ]);
        if (!pRes.ok || !cRes.ok) throw new Error('Gagal memuat data');
        const [pData, cData] = await Promise.all([pRes.json(), cRes.json()]);
        setProducts(pData.products);
        setCategories(cData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filtered = useMemo(() => {
    let result = [...products];
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((p) =>
        p.title.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }
    switch (sortBy) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': {
        result.sort((a, b) => {
          const ra = typeof a.rating === 'number' ? a.rating : (a.rating as { rate: number })?.rate ?? 0;
          const rb = typeof b.rating === 'number' ? b.rating : (b.rating as { rate: number })?.rate ?? 0;
          return rb - ra;
        });
        break;
      }
      case 'name': result.sort((a, b) => a.title.localeCompare(b.title)); break;
    }
    return result;
  }, [products, search, selectedCategory, sortBy]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const goToPage = (p: number) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="section" style={{ paddingTop: '3rem' }}>
      <span className="render-badge badge-csr">
        <span className="render-dot" />CSR — Client-Side Rendering
      </span>
      <div className="section-header">
        <h1 className="section-title">Semua <span>Produk</span></h1>
        {!loading && (
          <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            {filtered.length} produk
          </span>
        )}
      </div>

      {/* Search & Filter */}
      <div className="search-bar">
        <input
          className="search-input"
          type="text"
          placeholder="🔍 Cari produk..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
        />
        <select
          className="filter-select"
          value={selectedCategory}
          onChange={(e) => { setSelectedCategory(e.target.value); setPage(1); }}
        >
          <option value="">Semua Kategori</option>
          {categories.map((cat) => (
            <option key={cat.slug} value={cat.slug}>{cat.name}</option>
          ))}
        </select>
        <select
          className="filter-select"
          value={sortBy}
          onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Error */}
      {error && (
        <div style={{ background: 'rgba(224,82,82,0.1)', border: '1px solid rgba(224,82,82,0.3)', borderRadius: 'var(--radius)', padding: '1.5rem', textAlign: 'center', color: '#e05252', marginBottom: '2rem' }}>
          ⚠️ {error}
          <button
            onClick={() => window.location.reload()}
            style={{ marginLeft: '1rem', color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}
          >
            Coba lagi
          </button>
        </div>
      )}

      {loading && <LoadingSpinner text="Memuat produk..." />}

      {!loading && !error && (
        <>
          {paginated.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
              <p>Produk tidak ditemukan untuk <strong>&quot;{search}&quot;</strong></p>
            </div>
          ) : (
            <div className="product-grid">
              {paginated.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '3rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => goToPage(Math.max(1, page - 1))}
                disabled={page === 1}
                style={{ padding: '0.6rem 1.2rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-card)', color: page === 1 ? 'var(--text-dim)' : 'var(--text)', cursor: page === 1 ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.9rem' }}
              >
                ← Sebelumnya
              </button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                const p = Math.max(1, Math.min(page - 2, totalPages - 4)) + i;
                return (
                  <button key={p} onClick={() => goToPage(p)}
                    style={{ padding: '0.6rem 1rem', borderRadius: '8px', border: `1px solid ${page === p ? 'var(--accent)' : 'var(--border)'}`, background: page === p ? 'var(--accent-dim)' : 'var(--bg-card)', color: page === p ? 'var(--accent)' : 'var(--text-muted)', cursor: 'pointer', fontWeight: page === p ? 700 : 400, fontFamily: 'var(--font-body)', fontSize: '0.9rem' }}
                  >
                    {p}
                  </button>
                );
              })}
              <button
                onClick={() => goToPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                style={{ padding: '0.6rem 1.2rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-card)', color: page === totalPages ? 'var(--text-dim)' : 'var(--text)', cursor: page === totalPages ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.9rem' }}
              >
                Selanjutnya →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}