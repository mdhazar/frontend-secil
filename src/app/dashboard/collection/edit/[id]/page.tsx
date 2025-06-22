"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  getProductsForConstants,
  getComprehensiveFilters,
  Filter,
} from "@/app/lib/collections-api";
import ProductCard2 from "@/app/ui/dashboard/product-card2";
import { useEditModeStore } from "@/store/collections";
import FilterModal from "@/app/ui/dashboard/filter-modal";
import FilterBar from "@/app/ui/dashboard/filter-bar";
import ProductGrid from "@/app/ui/dashboard/product-grid";
import ConstantsGrid from "@/app/ui/dashboard/constants-grid";
import ProductActions from "@/app/ui/dashboard/product-actions";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { Product } from "@/types/product";

export default function CollectionEditPage() {
  const { data: session } = useSession();
  const {
    selectedProducts,
    addSelectedProduct,
    removeSelectedProduct,
    resetEditState,
  } = useEditModeStore();

  const [availableProducts, setAvailableProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filter[]>([]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<
    Record<string, string[]>
  >({});
  const [draggedProduct, setDraggedProduct] = useState<Product | null>(null);
  const [gridLayout, setGridLayout] = useState<"2x2" | "3x2" | "4x4">("3x2");
  const collectionId = 72;

  useEffect(() => {
    if (session?.accessToken) {
      const fetchData = async () => {
        try {
          setLoading(true);

          const [productsResult, filtersResult] = await Promise.all([
            getProductsForConstants({
              accessToken: session.accessToken!,
              collectionId: collectionId,
              page: 1,
            }),
            getComprehensiveFilters({
              accessToken: session.accessToken!,
              collectionId: collectionId,
            }),
          ]);

          const productsWithIds = productsResult.data.map((product, index) => ({
            ...product,
            id: `${product.productCode}-${index}`,
          }));
          setAvailableProducts(productsWithIds);
          setFilteredProducts(productsWithIds);
          setFilters(filtersResult.data);
        } catch (e) {
          if (e instanceof Error) {
            setError(`Failed to load data: ${e.message}`);
          } else {
            setError("An unknown error occurred while loading data.");
          }
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [session, collectionId]);

  const handleAddProduct = (product: Product) => {
    addSelectedProduct(product);
  };

  const handleRemoveProduct = (productId: string) => {
    removeSelectedProduct(productId);
  };

  const handleDragStart = (event: DragStartEvent) => {
    setDraggedProduct(event.active.data.current as Product);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setDraggedProduct(null);

    if (!over) return;

    const draggedProductData = active.data.current as Product;
    const dropSlotIndex = parseInt(over.id as string);

    const newSelectedProducts = [...selectedProducts];
    newSelectedProducts[dropSlotIndex] = draggedProductData;

    selectedProducts.forEach((_, index) =>
      removeSelectedProduct(selectedProducts[index].id)
    );
    newSelectedProducts.forEach((product) => {
      if (product) addSelectedProduct(product);
    });
  };

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log("Saving selected products:", selectedProducts);
  };

  const handleCancel = () => {
    resetEditState();
    window.history.back();
  };

  const handleApplyFilters = async (
    selectedFilters: Record<string, string[]>
  ) => {
    setAppliedFilters(selectedFilters);

    if (!session?.accessToken) return;

    try {
      setLoading(true);

      const additionalFilters = Object.entries(selectedFilters)
        .filter(
          ([key]) =>
            !["minStock", "maxStock", "productCode", "sortBy"].includes(key)
        )
        .flatMap(([filterId, values]) =>
          values.map((value) => ({
            id: filterId,
            value: value,
            comparisonType: 0,
          }))
        );

      const { data } = await getProductsForConstants({
        accessToken: session.accessToken,
        collectionId: collectionId,
        page: 1,
        pageSize: 50,
        additionalFilters: additionalFilters,
      });

      const productsWithIds = data.map((product, index) => ({
        ...product,
        id: `${product.productCode}-${index}`,
      }));

      setFilteredProducts(productsWithIds);
    } catch {
      setFilteredProducts(availableProducts);
    } finally {
      setLoading(false);
    }
  };

  const handleClearFilters = () => {
    setAppliedFilters({});
    setFilteredProducts(availableProducts);
  };

  const handleRemoveFilter = (filterId: string, value: string) => {
    const newFilters = { ...appliedFilters };
    newFilters[filterId] = newFilters[filterId].filter((v) => v !== value);
    if (newFilters[filterId].length === 0) {
      delete newFilters[filterId];
    }
    setAppliedFilters(newFilters);
  };

  const getGridConfig = () => {
    switch (gridLayout) {
      case "2x2":
        return { cols: 2, rows: 2, total: 4, gridClass: "grid-cols-2" };
      case "3x2":
        return { cols: 3, rows: 2, total: 6, gridClass: "grid-cols-3" };
      case "4x4":
        return { cols: 4, rows: 4, total: 16, gridClass: "grid-cols-4" };
      default:
        return { cols: 3, rows: 2, total: 6, gridClass: "grid-cols-3" };
    }
  };

  const gridConfig = getGridConfig();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-lg">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-96 text-red-600">
        <div>Error: {error}</div>
      </div>
    );
  }

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex h-full flex-col px-2 mt-4 space-y-4 ">
        <div className="mb-2 flex h-23 rounded-md bg-blue-300 min-h-23"></div>
        <div className="border ">
          <FilterBar
            appliedFilters={appliedFilters}
            filters={filters}
            onRemoveFilter={handleRemoveFilter}
            onClearFilters={handleClearFilters}
            onOpenFilterModal={() => setIsFilterModalOpen(true)}
          />

          <div className="flex-1 flex gap-2 ">
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
            <FilterModal
              isOpen={isFilterModalOpen}
              onClose={() => setIsFilterModalOpen(false)}
              filters={filters}
              onApplyFilters={handleApplyFilters}
              onClearFilters={handleClearFilters}
            />
          </div>
          <ProductActions onSave={handleSave} onCancel={handleCancel} />
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
