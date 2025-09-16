export interface FakeStoreProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}

export interface FakeStoreCartItem {
  productId: number;
  quantity: number;
}

export interface FakeStoreCart {
  id: number;
  userId: number;
  date?: string;
  products: FakeStoreCartItem[];
}

export interface FakeStoreUser {
  id: number;
  email: string;
  username: string;
}

const BASE_URL = "https://fakestoreapi.com" as const;

export async function getAllProducts(): Promise<FakeStoreProduct[]> {
  const res = await fetch(`${BASE_URL}/products`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
  return res.json();
}

export async function getAllCarts(): Promise<FakeStoreCart[]> {
  const res = await fetch(`${BASE_URL}/carts`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch carts: ${res.status}`);
  return res.json();
}

export async function getAllUsers(): Promise<FakeStoreUser[]> {
  const res = await fetch(`${BASE_URL}/users`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch users: ${res.status}`);
  return res.json();
}

export async function getCategories(): Promise<string[]> {
  const res = await fetch(`${BASE_URL}/products/categories`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Failed to fetch categories: ${res.status}`);
  return res.json();
}

export interface CreateCartRequest {
  userId: number;
  date?: string;
  products: { productId: number; quantity: number }[];
}

export async function createCart(
  payload: CreateCartRequest
): Promise<FakeStoreCart> {
  const res = await fetch(`${BASE_URL}/carts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Failed to create cart: ${res.status}`);
  return res.json();
}
