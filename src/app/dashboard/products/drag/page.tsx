"use client";

import { useEffect, useMemo, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { getAllProducts } from "@/app/lib/fakestore-api";
import ProductCard2 from "@/app/ui/dashboard/product-card2";
import ProductGrid from "@/app/ui/dashboard/product-grid";
import ConstantsGrid from "@/app/ui/dashboard/constants-grid";

interface Product {
  imageUrl: string;
  name: string;
  productCode: string;
  id: string;
}

type GridLayout = "2x2" | "3x2" | "4x4";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [availableProducts, setAvailableProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [draggedProduct, setDraggedProduct] = useState<Product | null>(null);
  const [gridLayout, setGridLayout] = useState<GridLayout>("3x2");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const prods = await getAllProducts();
        const mapped: Product[] = prods.map((p, idx) => ({
          imageUrl: p.image,
          name: p.title,
          productCode: String(p.id),
          id: `${p.id}-${idx}`,
        }));
        setAvailableProducts(mapped);
        setFilteredProducts(mapped);
      } catch (e: any) {
        setError(e?.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const txt = searchText.trim().toLowerCase();
    if (!txt) {
      setFilteredProducts(availableProducts);
    } else {
      setFilteredProducts(
        availableProducts.filter((p) => p.name.toLowerCase().includes(txt))
      );
    }
  }, [searchText, availableProducts]);

  const gridConfig = useMemo(() => {
    switch (gridLayout) {
      case "2x2":
        return {
          cols: 2,
          rows: 2,
          total: 4,
          gridClass: "grid-cols-2",
        } as const;
      case "4x4":
        return {
          cols: 4,
          rows: 4,
          total: 16,
          gridClass: "grid-cols-4",
        } as const;
      case "3x2":
      default:
        return {
          cols: 3,
          rows: 2,
          total: 6,
          gridClass: "grid-cols-3",
        } as const;
    }
  }, [gridLayout]);

  const handleAddProduct = (product: Product) => {
    setSelectedProducts((prev) =>
      prev.find((p) => p.id === product.id) ? prev : [...prev, product]
    );
  };

  const handleRemoveProduct = (productId: string) => {
    setSelectedProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const handleDragStart = (event: DragStartEvent) => {
    setDraggedProduct(event.active.data.current as Product);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setDraggedProduct(null);
    if (!over) return;

    const draggedProductData = active.data.current as Product;
    const dropSlotIndex = parseInt(over.id as string, 10);

    // Place dragged product into the selectedProducts array at index
    setSelectedProducts((prev) => {
      const next = [...prev];
      next[dropSlotIndex] = draggedProductData;
      // remove duplicates by id while preserving slot placement
      const seen = new Set<string>();
      for (let i = 0; i < next.length; i++) {
        const item = next[i];
        if (!item) continue;
        if (seen.has(item.id)) {
          next[i] = undefined as unknown as Product;
        } else {
          seen.add(item.id);
        }
      }
      return next.filter(Boolean) as Product[];
    });
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex h-full flex-col px-2 mt-4 space-y-4">
        <div className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-300 p-4 md:h-40"></div>
        <div className="border p-2">
          <div className="min-h-12 bg-gray-100 rounded-md flex items-center justify-between px-4 py-2 mb-3">
            <div className="flex items-center gap-2 flex-wrap">
              <input
                className="p-2 border rounded"
                placeholder="Search products"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1 flex gap-2">
            <ProductGrid
              products={filteredProducts}
              selectedProducts={selectedProducts}
              onAddProduct={handleAddProduct}
            />
            <ConstantsGrid
              selectedProducts={selectedProducts}
              gridLayout={gridLayout}
              gridConfig={gridConfig}
              onGridLayoutChange={setGridLayout}
              onRemoveProduct={handleRemoveProduct}
            />
          </div>
        </div>
      </div>

      <DragOverlay>
        {draggedProduct && (
          <ProductCard2
            imageUrl={draggedProduct.imageUrl}
            productName={draggedProduct.name}
            productId={draggedProduct.productCode}
          />
        )}
      </DragOverlay>
    </DndContext>
  );
}
