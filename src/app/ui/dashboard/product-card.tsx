import Image from "next/image";
import clsx from "clsx";
import { ImagePlaceholderIcon } from "@/app/ui/icons";

type Badge = {
  label: string;
  variant?: "solid" | "outline";
  colorClassName?: string;
};

type ProductCardLayout = "vertical" | "horizontal";
type ProductCardSize = "sm" | "md" | "lg";

interface ProductCardProps {
  id?: string;
  name: string;
  imageUrl?: string;
  priceText?: string;
  rating?: number; // 0..5
  ratingCount?: number;
  badges?: Badge[];
  layout?: ProductCardLayout;
  size?: ProductCardSize;
  className?: string;
  disabled?: boolean;
  isFavorite?: boolean;
  showAddButton?: boolean;
  onAddToCart?: () => void;
  onFavoriteToggle?: (next: boolean) => void;
  onQuickView?: () => void;
}

function getDimensions(size: ProductCardSize, layout: ProductCardLayout) {
  if (layout === "horizontal") {
    switch (size) {
      case "sm":
        return {
          imgW: 72,
          imgH: 72,
          containerW: "w-full",
          containerH: "h-32",
          title: "text-sm",
          price: "text-sm",
        };
      case "lg":
        return {
          imgW: 132,
          imgH: 132,
          containerW: "w-full",
          containerH: "h-40",
          title: "text-lg",
          price: "text-base",
        };
      case "md":
      default:
        return {
          imgW: 100,
          imgH: 100,
          containerW: "w-full",
          containerH: "h-36",
          title: "text-base",
          price: "text-sm",
        };
    }
  }
  switch (size) {
    case "sm":
      return {
        imgW: 140,
        imgH: 140,
        containerW: "w-44",
        containerH: "h-80",
        title: "text-sm",
        price: "text-sm",
      };
    case "lg":
      return {
        imgW: 240,
        imgH: 240,
        containerW: "w-72",
        containerH: "h-[28rem]",
        title: "text-lg",
        price: "text-base",
      };
    case "md":
    default:
      return {
        imgW: 180,
        imgH: 180,
        containerW: "w-56",
        containerH: "h-80",
        title: "text-base",
        price: "text-sm",
      };
  }
}

function renderStars(rating: number | undefined) {
  const safeRating = Math.max(0, Math.min(5, Math.round(rating ?? 0)));
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`Rating ${safeRating} out of 5`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={i < safeRating ? "currentColor" : "none"}
          className={clsx(
            "h-4 w-4",
            i < safeRating ? "text-yellow-400" : "text-gray-300",
            "stroke-current"
          )}
        >
          <path
            strokeWidth="1.5"
            d="M11.48 3.499a.562.562 0 011.04 0l2.01 4.073a.563.563 0 00.424.308l4.497.654c.513.075.718.705.346 1.066l-3.254 3.17a.563.563 0 00-.162.498l.768 4.48a.563.563 0 01-.817.593L12.53 16.98a.563.563 0 00-.522 0l-4.025 2.115a.563.563 0 01-.818-.593l.768-4.48a.563.563 0 00-.162-.498L4.517 9.6a.563.563 0 01.346-1.066l4.497-.654a.563.563 0 00.424-.308l2.01-4.073z"
          />
        </svg>
      ))}
    </div>
  );
}

function BadgePill({ badge }: { badge: Badge }) {
  const variant = badge.variant ?? "solid";
  const base = "rounded-full px-2 py-0.5 text-[10px] font-medium";
  const palette =
    badge.colorClassName ??
    (variant === "solid"
      ? "bg-emerald-100 text-emerald-700"
      : "border border-emerald-300 text-emerald-700");
  return <span className={clsx(base, palette)}>{badge.label}</span>;
}

export default function ProductCard({
  id,
  name,
  imageUrl,
  priceText,
  rating,
  ratingCount,
  badges,
  layout = "vertical",
  size = "sm",
  className,
  disabled = false,
  isFavorite = false,
  showAddButton = true,
  onAddToCart,
  onFavoriteToggle,
  onQuickView,
}: ProductCardProps) {
  const dims = getDimensions(size, layout);

  const CardRoot = (
    <div
      className={clsx(
        "overflow-hidden rounded-lg border border-gray-200 bg-white",
        "transition-shadow hover:shadow-sm",
        dims.containerW,
        dims.containerH,
        disabled && "opacity-60 pointer-events-none",
        className
      )}
      data-id={id}
    >
      {layout === "vertical" ? (
        <div className="flex flex-col h-full">
          <div className="relative p-2 flex justify-center flex-shrink-0">
            <div
              className="relative overflow-hidden rounded border border-gray-200"
              style={{ height: `${dims.imgH}px` }}
            >
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={`Picture of ${name}`}
                  width={dims.imgW}
                  height={dims.imgH}
                  className="object-cover w-full h-full"
                  style={{
                    maxHeight: `${dims.imgH}px`,
                    height: `${dims.imgH}px`,
                  }}
                />
              ) : (
                <div
                  className="flex items-center justify-center bg-gray-100"
                  style={{ width: dims.imgW, height: dims.imgH }}
                >
                  <ImagePlaceholderIcon className="w-8 h-8 text-gray-400" />
                </div>
              )}
            </div>
          </div>

          <div className="px-3 pb-3 flex flex-col gap-1 flex-grow">
            {badges && badges.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-0.5">
                {badges.map((b, idx) => (
                  <BadgePill badge={b} key={idx} />
                ))}
              </div>
            )}
            <h3
              className={clsx(
                "font-medium text-gray-900 truncate text-center",
                dims.title
              )}
              title={name}
            >
              {name}
            </h3>
            {(rating !== undefined || priceText) && (
              <div className="mt-0.5 flex items-center justify-between gap-2">
                {rating !== undefined ? (
                  <div className="flex items-center gap-1">
                    {renderStars(rating)}
                    {typeof ratingCount === "number" && (
                      <span className="text-[11px] text-gray-500">
                        ({ratingCount})
                      </span>
                    )}
                  </div>
                ) : (
                  <span />
                )}
                {priceText && (
                  <div
                    className={clsx("text-gray-900 font-semibold", dims.price)}
                  >
                    {priceText}
                  </div>
                )}
              </div>
            )}

            <div className="mt-auto flex items-center gap-1">
              {showAddButton && (
                <button
                  type="button"
                  onClick={onAddToCart}
                  className="flex-1 text-xs bg-blue-600 text-white  py-1.5 rounded hover:bg-blue-700"
                  disabled={disabled}
                >
                  Add to Cart
                </button>
              )}
              <button
                type="button"
                onClick={() => onFavoriteToggle?.(!isFavorite)}
                className={clsx(
                  "px-2 py-1.5 rounded border text-xs",
                  isFavorite
                    ? "border-rose-300 text-rose-600 bg-rose-50"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                )}
                aria-pressed={isFavorite}
                disabled={disabled}
              >
                {isFavorite ? "♥" : "♡"}
              </button>
              {onQuickView && (
                <button
                  type="button"
                  onClick={onQuickView}
                  className=" py-1.5 rounded border border-gray-300 text-xs text-gray-700 hover:bg-gray-50"
                  disabled={disabled}
                >
                  Quick View
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-2 flex items-start gap-3 h-full">
          <div className="relative shrink-0">
            <div
              className="relative overflow-hidden rounded border border-gray-200"
              style={{ height: `${dims.imgH}px`, width: `${dims.imgW}px` }}
            >
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={`Picture of ${name}`}
                  width={dims.imgW}
                  height={dims.imgH}
                  className="object-cover w-full h-full"
                  style={{
                    maxHeight: `${dims.imgH}px`,
                    height: `${dims.imgH}px`,
                  }}
                />
              ) : (
                <div
                  className="flex items-center justify-center bg-gray-100"
                  style={{ width: dims.imgW, height: dims.imgH }}
                >
                  <ImagePlaceholderIcon className="w-8 h-8 text-gray-400" />
                </div>
              )}
            </div>
          </div>
          <div className="min-w-0 flex-1 flex flex-col gap-1.5">
            {badges && badges.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {badges.map((b, idx) => (
                  <BadgePill badge={b} key={idx} />
                ))}
              </div>
            )}
            <h3
              className={clsx("font-medium text-gray-900 truncate", dims.title)}
              title={name}
            >
              {name}
            </h3>
            {(rating !== undefined || priceText) && (
              <div className="mt-0.5 flex items-center justify-between gap-2">
                {rating !== undefined ? (
                  <div className="flex items-center gap-1">
                    {renderStars(rating)}
                    {typeof ratingCount === "number" && (
                      <span className="text-[11px] text-gray-500">
                        ({ratingCount})
                      </span>
                    )}
                  </div>
                ) : (
                  <span />
                )}
                {priceText && (
                  <div
                    className={clsx("text-gray-900 font-semibold", dims.price)}
                  >
                    {priceText}
                  </div>
                )}
              </div>
            )}

            <div className="mt-auto flex items-center gap-2">
              {showAddButton && (
                <button
                  type="button"
                  onClick={onAddToCart}
                  className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700"
                  disabled={disabled}
                >
                  Add to Cart
                </button>
              )}
              <button
                type="button"
                onClick={() => onFavoriteToggle?.(!isFavorite)}
                className={clsx(
                  "px-2 py-1.5 rounded border text-xs",
                  isFavorite
                    ? "border-rose-300 text-rose-600 bg-rose-50"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                )}
                aria-pressed={isFavorite}
                disabled={disabled}
              >
                {isFavorite ? "♥" : "♡"}
              </button>
              {onQuickView && (
                <button
                  type="button"
                  onClick={onQuickView}
                  className="px-2 py-1.5 rounded border border-gray-300 text-xs text-gray-700 hover:bg-gray-50"
                  disabled={disabled}
                >
                  Quick View
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return CardRoot;
}

export function ProductCardSkeleton({
  layout = "vertical",
  size = "md",
  className,
  compact = false,
  gridCols,
}: {
  layout?: ProductCardLayout;
  size?: ProductCardSize;
  className?: string;
  compact?: boolean;
  gridCols?: number;
}) {
  const dims = getDimensions(size, layout);
  const shimmer = "animate-pulse";

  if (layout === "horizontal") {
    return (
      <div
        className={clsx(
          "overflow-hidden rounded-lg border border-gray-200 bg-white p-2 w-full",
          dims.containerH,
          shimmer,
          className
        )}
      >
        <div className="flex items-start gap-3 h-full">
          <div
            className="bg-gray-200 rounded border border-gray-200"
            style={{ width: dims.imgW, height: dims.imgH }}
          />
          <div className="flex-1 min-w-0 flex flex-col gap-2">
            <div className="h-4 bg-gray-200 rounded w-3/5" />
            <div className="h-3 bg-gray-200 rounded w-2/5" />
            <div className="mt-auto flex items-center gap-2">
              <div className="h-7 bg-gray-200 rounded w-24" />
              <div className="h-7 bg-gray-200 rounded w-16" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Adjust sizing based on grid density
  const isVeryDense = gridCols && gridCols >= 4;
  const compactHeight = isVeryDense ? "h-36" : "h-48";
  const imageHeight = isVeryDense ? 80 : 120;
  const padding = isVeryDense ? "p-1" : "p-2";
  const textPadding = isVeryDense ? "px-1 pb-1" : "px-2 pb-2";

  return (
    <div
      className={clsx(
        "overflow-hidden rounded-lg border border-gray-200 bg-white",
        shimmer,
        compact ? "w-full" : dims.containerW,
        compact ? compactHeight : dims.containerH,
        className
      )}
    >
      <div className="flex flex-col h-full">
        <div className={`${padding} flex justify-center flex-shrink-0`}>
          <div
            className="bg-gray-200 rounded border border-gray-200"
            style={{
              width: compact ? "100%" : dims.imgW,
              height: compact ? imageHeight : dims.imgH,
              maxWidth: compact ? `${imageHeight}px` : dims.imgW,
            }}
          />
        </div>
        <div className={`${textPadding} flex flex-col gap-1 flex-grow`}>
          <div
            className={`${
              isVeryDense ? "h-2" : "h-3"
            } bg-gray-200 rounded w-3/4 mx-auto`}
          />
          <div
            className={`mt-1 ${
              isVeryDense ? "h-1.5" : "h-2"
            } bg-gray-200 rounded w-1/3 mx-auto`}
          />
          {!compact && (
            <div className="mt-auto flex items-center gap-1">
              <div
                className={`${
                  isVeryDense ? "h-5" : "h-6"
                } bg-gray-200 rounded w-full`}
              />
              <div
                className={`${
                  isVeryDense ? "h-5" : "h-6"
                } bg-gray-200 rounded w-8`}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
