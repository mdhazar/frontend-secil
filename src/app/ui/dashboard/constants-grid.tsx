import DroppableSlot from "./droppable-slot";
import GridLayoutControls from "./grid-layout-controls";

interface Product {
  imageUrl: string;
  name: string;
  productCode: string;
  id: string;
}

interface GridConfig {
  cols: number;
  rows: number;
  total: number;
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
  return (
    <div className="flex-1 bg-white rounded-md p-2 flex flex-col max-h-[600px]">
      <div className="mb-1 flex-shrink-0 flex items-center justify-between">
        <h3 className="font-medium text-gray-900">Sabitler</h3>
        <GridLayoutControls
          gridLayout={gridLayout}
          onGridLayoutChange={onGridLayoutChange}
        />
      </div>

      <div className="flex-1 overflow-y-auto border flex flex-col">
        <div className="flex-1 p-4 min-w-0">
          <div
            className={`grid ${gridConfig.gridClass} gap-x-[15px] gap-y-2.5 w-full`}
          >
            {Array.from({ length: gridConfig.total }).map((_, index) => (
              <DroppableSlot
                key={index}
                index={index}
                selectedProduct={selectedProducts[index]}
                onRemoveProduct={onRemoveProduct}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
