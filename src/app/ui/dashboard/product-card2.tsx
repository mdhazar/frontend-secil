import Image from "next/image";
import clsx from "clsx";
import { ImagePlaceholderIcon } from "@/app/ui/icons";

interface ProductCard2Props {
  imageUrl?: string;
  productName?: string;
  productId?: string;
  className?: string;
  useFixedWidth?: boolean;
  onAddToCartClick?: () => void;
}

export default function ProductCard2({
  imageUrl,
  productName,
  productId,
  className,
  useFixedWidth = true,
  onAddToCartClick,
}: ProductCard2Props) {
  return (
    <div
      className={clsx(
        "overflow-hidden rounded-lg border border-gray-300 bg-white",
        useFixedWidth ? "" : "w-full",
        className
      )}
      style={
        useFixedWidth
          ? { width: "148px", height: "229px" }
          : { height: "229px" }
      }
    >
      {/* Image container with padding */}
      <div className="relative pt-[6px] flex justify-center">
        <div className="relative overflow-hidden rounded border border-gray-200 ">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={`Picture of ${productName || "Product"}`}
              className="object-cover"
              width={125}
              height={125}
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <ImagePlaceholderIcon className="w-8 h-8 text-gray-400" />
            </div>
          )}
        </div>
      </div>

      <div className="px-2 flex flex-col h-[56px]">
        {/* Product name - 28px height */}
        <div
          style={{ height: "28px" }}
          className="flex items-center justify-center h-[28px]"
        >
          <h3 className="text-sm font-medium text-gray-900 truncate text-center">
            {productName || "Product Name"}
          </h3>
        </div>

        {/* Product ID - 28px height */}
        <div
          style={{ height: "28px" }}
          className="flex items-center justify-center"
        >
          <p className="text-xs text-gray-500 truncate text-center">
            {productId || "Product ID"}
          </p>
        </div>
      </div>
      {onAddToCartClick && (
        <div className="px-2 pb-2">
          <button
            onClick={onAddToCartClick}
            className="w-full text-xs bg-blue-500 text-white py-1 rounded hover:bg-blue-600"
          >
            Add to Cart
          </button>
        </div>
      )}
    </div>
  );
}
