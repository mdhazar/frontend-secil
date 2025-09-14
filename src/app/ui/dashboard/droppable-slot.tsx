import { useDroppable } from "@dnd-kit/core";
import ProductCard2 from "@/app/ui/dashboard/product-card2";
import { TrashCanIcon } from "@/app/ui/icons";
import { useState } from "react";

interface Product {
  imageUrl: string;
  name: string;
  productCode: string;
  id: string;
}

interface DroppableSlotProps {
  index: number;
  selectedProduct?: Product;
  onRemoveProduct: (productId: string) => void;
}

export default function DroppableSlot({
  index,
  selectedProduct,
  onRemoveProduct,
}: DroppableSlotProps) {
  const { setNodeRef, isOver } = useDroppable({ id: index.toString() });
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      ref={setNodeRef}
      className={`min-w-0 ${
        isOver ? "ring-2 ring-blue-400 ring-opacity-50" : ""
      }`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {selectedProduct ? (
        <div className="relative">
          <ProductCard2
            imageUrl={selectedProduct.imageUrl}
            productName={selectedProduct.name}
            productId={selectedProduct.productCode}
            useFixedWidth={false}
          />
          {isHover && (
            <button
              onClick={() => onRemoveProduct(selectedProduct.id)}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-gray-400 "
            >
              <TrashCanIcon className="w-5 h-5 active:scale-200 transition-all duration-200" />
            </button>
          )}
        </div>
      ) : (
        <ProductCard2
          key={`placeholder-${index}`}
          productName={" "}
          productId={" "}
          useFixedWidth={false}
        />
      )}
    </div>
  );
}
