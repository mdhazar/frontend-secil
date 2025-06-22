import { useDraggable } from "@dnd-kit/core";
import ProductCard2 from "@/app/ui/dashboard/product-card2";

interface Product {
  imageUrl: string;
  name: string;
  productCode: string;
  id: string;
}

interface DraggableProductProps {
  product: Product;
  isSelected: boolean;
  onAddProduct: (product: Product) => void;
}

export default function DraggableProduct({
  product,
  isSelected,
  onAddProduct,
}: DraggableProductProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: product.id,
    data: product,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`relative group ${isDragging ? "opacity-10" : ""}`}
    >
      <div
        className={`${
          isSelected ? "filter blur-sm" : ""
        } transition-all duration-200`}
      >
        <ProductCard2
          imageUrl={product.imageUrl}
          productName={product.name}
          productId={product.productCode}
        />
      </div>

      {isSelected ? (
        <div className="absolute inset-0 bg-opacity-20 flex items-center justify-center">
          <span className="bg-black w-full text-center text-white px-4 py-2 rounded text-sm font-medium">
            Eklendi
          </span>
        </div>
      ) : (
        <button
          onClick={() => onAddProduct(product)}
          className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-50"
        >
          <span className="bg-black text-white px-3 py-1 rounded text-sm">
            Ekle
          </span>
        </button>
      )}
    </div>
  );
}
