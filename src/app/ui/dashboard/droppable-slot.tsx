import { useDroppable } from "@dnd-kit/core";
import { useState } from "react";
import ProductCard2 from "@/app/ui/dashboard/product-card2";
import { TrashCanIcon } from "@/app/ui/icons";
import ConfirmationModal from "./confirmation-modal";
import ResultModal from "./result-modal";

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
  const { setNodeRef, isOver } = useDroppable({
    id: index.toString(),
  });

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [resultType, setResultType] = useState<"success" | "error">("success");

  const handleTrashClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmRemove = () => {
    try {
      if (selectedProduct) {
        onRemoveProduct(selectedProduct.id);
        setShowConfirmation(false);
        setResultType("success");
        setShowResult(true);
      }
    } catch {
      setShowConfirmation(false);
      setResultType("error");
      setShowResult(true);
    }
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  const handleCloseResult = () => {
    setShowResult(false);
  };

  return (
    <>
      <div
        ref={setNodeRef}
        className={`min-w-0 ${
          isOver ? "ring-2 ring-blue-400 ring-opacity-50" : ""
        }`}
      >
        {selectedProduct ? (
          <div className="relative group">
            <ProductCard2
              imageUrl={selectedProduct.imageUrl}
              productName={selectedProduct.name}
              productId={selectedProduct.productCode}
              useFixedWidth={false}
            />
            <button
              onClick={handleTrashClick}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black rounded-full w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
            >
              <TrashCanIcon className="w-5 h-5" />
            </button>
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

      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={handleCloseConfirmation}
        onConfirm={handleConfirmRemove}
      />

      <ResultModal
        isOpen={showResult}
        onClose={handleCloseResult}
        type={resultType}
      />
    </>
  );
}
