export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  image?: string;
  category: string;
  rating: number | { rate: number; count: number };
  stock: number;
  brand?: string;
  sku?: string;
  weight?: number;
  warrantyInformation?: string;
  shippingInformation?: string;
  tags?: string[];
  images?: string[];
  [key: string]: unknown;
};

export type Category = {
  slug: string;
  name: string;
  url: string;
};

const BASE_URL = 'https://dummyjson.com';

export async function getProducts(limit = 100): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products?limit=${limit}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error('Gagal mengambil produk');
  const data = await res.json();
  return data.products;
}

export async function getProductById(id: string | number): Promise<Product | null> {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    cache: 'no-store',
  });
  if (!res.ok) return null;
  return res.json();
}

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${BASE_URL}/products/categories`, {
    next: { revalidate: 86400 },
  });
  if (!res.ok) throw new Error('Gagal mengambil kategori');
  return res.json();
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products/category/${category}?limit=8`, {
    cache: 'no-store',
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.products;
}