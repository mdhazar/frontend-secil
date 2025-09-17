"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import ProductCard from "@/app/ui/dashboard/product-card";
import {
  getAllProducts,
  getCategories,
  FakeStoreProduct,
} from "@/app/lib/fakestore-api";
import { useCartStore } from "@/store/cart";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<FakeStoreProduct[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchText, setSearchText] = useState("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [showScrollTop, setShowScrollTop] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
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
      } catch (e) {
        const err = e as Error;
        setError(err.message || "Failed to load products");
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

  // Handle scroll events to show/hide scroll-to-top button
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollTop = scrollContainerRef.current.scrollTop;
      setShowScrollTop(scrollTop > 300);
    }
  };

  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

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

        {/* Results summary */}
        <div className="mb-4 text-sm text-gray-600">
          Showing {filtered.length} products
        </div>

        {/* Scrollable products container */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="h-[calc(100vh-300px)] overflow-y-auto border rounded-lg p-4 bg-white scroll-smooth"
            style={{ scrollbarWidth: "thin" }}
          >
            <div className="flex flex-wrap gap-4 justify-start">
              {filtered.map((p: FakeStoreProduct) => (
                <ProductCard
                  key={p.id}
                  imageUrl={p.image}
                  name={p.title}
                  id={String(p.id)}
                  priceText={`$${p.price.toFixed(2)}`}
                  onAddToCart={() =>
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

            {/* Empty state */}
            {filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <div className="text-lg font-medium mb-2">
                  No products found
                </div>
                <div className="text-sm">Try adjusting your filters</div>
              </div>
            )}
          </div>

          {/* Scroll to top button */}
          {showScrollTop && (
            <button
              onClick={scrollToTop}
              className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-all duration-200 z-10"
              title="Scroll to top"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
