"use client";

import { useEffect, useMemo, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { getAllProducts } from "@/app/lib/fakestore-api";
import ProductCard, {
  ProductCardSkeleton,
} from "@/app/ui/dashboard/product-card";
import ProductGrid from "@/app/ui/dashboard/product-grid";
import ConstantsGrid from "@/app/ui/dashboard/constants-grid";

interface Product {
  imageUrl: string;
  name: string;
  productCode: string;
  id: string;
  price: number;
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
          price: p.price,
        }));
        setAvailableProducts(mapped);
        setFilteredProducts(mapped);
      } catch (e) {
        const err = e as Error;
        setError(err.message || "Failed to load products");
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
          gridClass: "grid-cols-2",
        } as const;
      case "4x4":
        return {
          cols: 4,
          gridClass: "grid-cols-4",
        } as const;
      case "3x2":
      default:
        return {
          cols: 3,
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
    // dropSlotIndex not needed since we're using simple append logic
    // const dropSlotIndex = parseInt(over.id as string, 10);

    setSelectedProducts((prev) => {
      // Find if this product already exists and remove it
      const existingIndex = prev.findIndex(
        (p) => p.id === draggedProductData.id
      );
      let filteredPrev = prev;
      if (existingIndex !== -1) {
        filteredPrev = prev.filter((p) => p.id !== draggedProductData.id);
      }

      // Add the product to the array
      // We'll let the ConstantsGrid handle the positioning
      return [...filteredPrev, draggedProductData];
    });
  };

  if (loading) {
    return (
      <div className="flex h-full flex-col px-2 mt-4 space-y-4">
        <div className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-300 p-4 md:h-40"></div>
        <div className="border p-2">
          <div className="min-h-12 bg-gray-100 rounded-md flex items-center justify-between px-4 py-2 mb-3">
            <div className="flex items-center gap-2 flex-wrap">
              <input
                className="p-2 border rounded"
                placeholder="Search products"
                disabled
              />
            </div>
          </div>

          <div className="flex-1 flex gap-2">
            {/* Left side - Product grid skeleton */}
            <div className="flex-1 bg-white rounded-md p-2 flex flex-col max-h-[600px]">
              <div className="mb-1 flex-shrink-0">
                <h3 className="font-medium text-gray-900">Products</h3>
              </div>
              <div className="flex-1 overflow-y-auto border p-4">
                <div className="grid grid-cols-3 gap-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <ProductCardSkeleton key={`product-skeleton-${i}`} />
                  ))}
                </div>
              </div>
            </div>

            {/* Right side - Pinned space skeleton */}
            <div className="flex-1 bg-white rounded-md p-2 flex flex-col max-h-[600px]">
              <div className="mb-1 flex-shrink-0 flex items-center justify-between">
                <h3 className="font-medium text-gray-900">Pinned</h3>
                <div className="flex gap-1">
                  <div className="w-8 h-6 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-8 h-6 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-8 h-6 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto border flex flex-col">
                <div className="flex-1 p-4 min-w-0">
                  <div
                    className={`grid ${gridConfig.gridClass} gap-x-[15px] gap-y-2.5 w-full`}
                  >
                    {Array.from({ length: 8 }).map((_, i) => (
                      <ProductCardSkeleton
                        key={`pinned-skeleton-${i}`}
                        compact
                        gridCols={gridConfig.cols}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
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
          <ProductCard
            imageUrl={draggedProduct.imageUrl}
            name={draggedProduct.name}
            id={draggedProduct.productCode}
            priceText={`$${draggedProduct.price.toFixed(2)}`}
          />
        )}
      </DragOverlay>
    </DndContext>
  );
}
