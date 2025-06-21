import Image from "next/image";
import clsx from "clsx";

interface ProductCardProps {
  imageUrl: string;
  productName: string;
  productCode: string;
  className?: string;
}

export default function ProductCard({
  imageUrl,
  productName,
  productCode,
  className,
}: ProductCardProps) {
  return (
    <div
      className={clsx(
        "overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm",
        className
      )}
    >
      <div className="relative w-full aspect-[3/2]">
        <Image
          src={imageUrl}
          alt={`Picture of ${productName}`}
          className="object-cover"
          fill
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900">{productName}</h3>
        <p className="text-sm text-gray-500">{productCode}</p>
      </div>
    </div>
  );
}
