import DroppableSlot from "@/app/ui/dashboard/droppable-slot";
import GridLayoutControls from "./grid-layout-controls";

interface Product {
  imageUrl: string;
  name: string;
  productCode: string;
  id: string;
  price: number;
}

interface GridConfig {
  cols: number;
  gridClass: string;
}

interface ConstantsGridProps {
  selectedProducts: Product[];
  gridLayout: "2x2" | "3x2" | "4x4";
  gridConfig: GridConfig;
  onGridLayoutChange: (layout: "2x2" | "3x2" | "4x4") => void;
  onRemoveProduct: (productId: string) => void;
}

export default function ConstantsGrid({
  selectedProducts,
  gridLayout,
  gridConfig,
  onGridLayoutChange,
  onRemoveProduct,
}: ConstantsGridProps) {
  // Always show at least minimum rows, but expand to accommodate all products + some extra slots
  const minRows = gridLayout === "2x2" ? 2 : gridLayout === "3x2" ? 2 : 4;

  // Calculate rows needed for all products, then add 2 extra rows for new drops
  const neededRows = Math.ceil(selectedProducts.length / gridConfig.cols);
  const extraRows = 2; // Always show 2 extra rows for dropping new items
  const totalRows = Math.max(minRows, neededRows + extraRows);
  const totalSlots = totalRows * gridConfig.cols;

  // Responsive gaps based on grid density
  const gapClasses =
    gridConfig.cols >= 4
      ? "gap-x-3 gap-y-3" // 4x4 grid: 12px gaps
      : gridConfig.cols === 3
      ? "gap-x-[15px] gap-y-2.5" // 3x2 grid: 15px x 10px gaps (original)
      : "gap-x-4 gap-y-3"; // 2x2 grid: 16px x 12px gaps

  return (
    <div className="flex-1 bg-white rounded-md p-2 flex flex-col max-h-[600px]">
      <div className="mb-1 flex-shrink-0 flex items-center justify-between">
        <h3 className="font-medium text-gray-900">Pinned</h3>
        <GridLayoutControls
          gridLayout={gridLayout}
          onGridLayoutChange={onGridLayoutChange}
        />
      </div>

      <div className="flex-1 overflow-y-auto border flex flex-col">
        <div className="flex-1 p-4 min-w-0">
          <div className={`grid ${gridConfig.gridClass} ${gapClasses} w-full`}>
            {Array.from({ length: totalSlots }).map((_, index) => (
              <DroppableSlot
                key={index}
                index={index}
                selectedProduct={selectedProducts[index]}
                onRemoveProduct={onRemoveProduct}
                gridCols={gridConfig.cols}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
