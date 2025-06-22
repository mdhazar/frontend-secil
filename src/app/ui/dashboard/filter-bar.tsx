import { FilterIcon } from "@/app/ui/icons";
import { Filter } from "@/app/lib/collections-api";

interface FilterBarProps {
  appliedFilters: Record<string, string[]>;
  filters: Filter[];
  onRemoveFilter: (filterId: string, value: string) => void;
  onClearFilters: () => void;
  onOpenFilterModal: () => void;
}

export default function FilterBar({
  appliedFilters,
  filters,
  onRemoveFilter,
  onClearFilters,
  onOpenFilterModal,
}: FilterBarProps) {
  return (
    <div className="min-h-12 bg-gray-100 rounded-md flex items-center justify-between px-4 py-2">
      <div className="flex-1 flex items-center gap-2 overflow-x-auto">
        {Object.keys(appliedFilters).length === 0 ? (
          <span className="text-gray-500 text-sm">Filtre seçilmedi</span>
        ) : (
          <div className="flex flex-wrap gap-2">
            {Object.entries(appliedFilters).map(([filterId, values]) => {
              const filter = filters.find((f) => f.id === filterId);
              return values.map((value) => {
                const filterValue = filter?.values.find(
                  (v) => v.value === value
                );
                return (
                  <span
                    key={`${filterId}-${value}`}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 whitespace-nowrap"
                  >
                    {filter?.title}: {filterValue?.valueName || value}
                    <button
                      onClick={() => onRemoveFilter(filterId, value)}
                      className="ml-1 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                );
              });
            })}
          </div>
        )}
      </div>

      <div className="flex items-center gap-4 flex-shrink-0">
        {Object.keys(appliedFilters).length > 0 && (
          <button
            onClick={onClearFilters}
            className="text-sm text-red-600 hover:text-red-800 whitespace-nowrap"
          >
            Tümünü Temizle
          </button>
        )}
        <button
          onClick={onOpenFilterModal}
          className="flex items-center gap-2 px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-500 transition-colors whitespace-nowrap"
        >
          <FilterIcon className="w-4 h-4" />
          Filtreler
        </button>
      </div>
    </div>
  );
}
