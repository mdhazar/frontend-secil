"use client";

import { useEffect, useMemo, useState } from "react";
import ProductCard2 from "@/app/ui/dashboard/product-card2";
import { getAllProducts, getCategories } from "@/app/lib/fakestore-api";
import { useCartStore } from "@/store/cart";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchText, setSearchText] = useState("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");

  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        const [prods, cats] = await Promise.all([
          getAllProducts(),
          getCategories(),
        ]);
        setProducts(prods);
        setCategories(cats);
      } catch (e: any) {
        setError(e?.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (selectedCategory && p.category !== selectedCategory) return false;
      if (
        searchText &&
        !p.title.toLowerCase().includes(searchText.toLowerCase())
      )
        return false;
      const min = minPrice ? parseFloat(minPrice) : undefined;
      const max = maxPrice ? parseFloat(maxPrice) : undefined;
      if (typeof min === "number" && p.price < min) return false;
      if (typeof max === "number" && p.price > max) return false;
      return true;
    });
  }, [products, selectedCategory, searchText, minPrice, maxPrice]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="flex h-full flex-col px-2 mt-4">
      <div className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-300 p-4 md:h-40"></div>
      <div className="bg-gray-50 border p-4">
        <h2 className="text-lg font-medium mb-3">Products</h2>

        <div className="min-h-12 bg-gray-100 rounded-md flex items-center justify-between px-4 py-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <select
              className="p-2 border rounded w-[24%]"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <input
              className="p-2 border rounded"
              placeholder="Search title"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <input
              className="p-2 border rounded"
              placeholder="Min price"
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <input
              className="p-2 border rounded"
              placeholder="Max price"
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
            {(selectedCategory || searchText || minPrice || maxPrice) && (
              <button
                className="text-sm text-red-600 hover:text-red-800"
                onClick={() => {
                  setSelectedCategory("");
                  setSearchText("");
                  setMinPrice("");
                  setMaxPrice("");
                }}
              >
                Clear
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          {filtered.map((p: any) => (
            <ProductCard2
              key={p.id}
              imageUrl={p.image}
              productName={p.title}
              productId={String(p.id)}
              onAddToCartClick={() =>
                addItem({
                  productId: p.id,
                  title: p.title,
                  image: p.image,
                  price: p.price,
                })
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
