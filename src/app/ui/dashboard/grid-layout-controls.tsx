import { Grid2x2Icon, Grid3x2Icon, Grid4x4Icon } from "@/app/ui/icons";

interface GridLayoutControlsProps {
  gridLayout: "2x2" | "3x2" | "4x4";
  onGridLayoutChange: (layout: "2x2" | "3x2" | "4x4") => void;
}

export default function GridLayoutControls({
  gridLayout,
  onGridLayoutChange,
}: GridLayoutControlsProps) {
  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => onGridLayoutChange("2x2")}
        className={`p-1 rounded ${
          gridLayout === "2x2"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
        title="2x2 Grid"
      >
        <Grid2x2Icon className="w-4 h-4" />
      </button>

      <button
        onClick={() => onGridLayoutChange("3x2")}
        className={`p-1 rounded ${
          gridLayout === "3x2"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
        title="3x2 Grid"
      >
        <Grid3x2Icon className="w-4 h-4" />
      </button>

      <button
        onClick={() => onGridLayoutChange("4x4")}
        className={`p-1 rounded ${
          gridLayout === "4x4"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
        title="4x4 Grid"
      >
        <Grid4x4Icon className="w-4 h-4" />
      </button>
    </div>
  );
}
