import DraggableProduct from "./draggable-product";

interface Product {
  imageUrl: string;
  name: string;
  productCode: string;
  id: string;
}

interface ProductGridProps {
  products: Product[];
  selectedProducts: Product[];
  onAddProduct: (product: Product) => void;
}

export default function ProductGrid({
  products,
  selectedProducts,
  onAddProduct,
}: ProductGridProps) {
  return (
    <div className="flex-1 bg-white rounded-md p-2 flex flex-col max-h-[600px]">
      <div className="mb-1 flex-shrink-0">
        <h3 className="font-medium text-gray-900">Products</h3>
      </div>

      <div className="flex-1 overflow-y-auto border">
        <div className="flex flex-wrap gap-4 justify-center mt-2">
          {products.map((product) => (
            <DraggableProduct
              key={product.id}
              product={product}
              isSelected={selectedProducts.some((p) => p.id === product.id)}
              onAddProduct={onAddProduct}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
