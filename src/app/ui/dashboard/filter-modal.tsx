"use client";

import { useState, useEffect } from "react";
import { Filter } from "@/app/lib/collections-api";
import { CloseIcon, PlusIcon } from "@/app/ui/icons";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: Filter[];
  onApplyFilters: (selectedFilters: Record<string, string[]>) => void;
  onClearFilters: () => void;
}

export default function FilterModal({
  isOpen,
  onClose,
  filters,
  onApplyFilters,
  onClearFilters,
}: FilterModalProps) {
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});
  const [stockFilters, setStockFilters] = useState({
    minStock: "",
    maxStock: "",
    productCode: "",
  });
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    if (isOpen) {
      setSelectedFilters({});
      setStockFilters({ minStock: "", maxStock: "", productCode: "" });
      setSortBy("");
    }
  }, [isOpen]);

  const handleFilterSelect = (filterId: string, value: string) => {
    setSelectedFilters((prev) => {
      const currentValues = prev[filterId] || [];
      const isSelected = currentValues.includes(value);

      const newFilters = isSelected
        ? {
            ...prev,
            [filterId]: currentValues.filter((v) => v !== value),
          }
        : {
            ...prev,
            [filterId]: [...currentValues, value],
          };

      return newFilters;
    });
  };

  const handleStockChange = (
    field: keyof typeof stockFilters,
    value: string
  ) => {
    setStockFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleApply = () => {
    const allFilters = {
      ...selectedFilters,
      ...(stockFilters.minStock && { minStock: [stockFilters.minStock] }),
      ...(stockFilters.maxStock && { maxStock: [stockFilters.maxStock] }),
      ...(stockFilters.productCode && {
        productCode: [stockFilters.productCode],
      }),
      ...(sortBy && { sortBy: [sortBy] }),
    };

    onApplyFilters(allFilters);
    onClose();
  };

  const handleClear = () => {
    setSelectedFilters({});
    setStockFilters({ minStock: "", maxStock: "", productCode: "" });
    setSortBy("");
    onClearFilters();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="absolute bottom-0 flex items-end justify-center border-t border-gray-200"
      onClick={handleBackdropClick}
    >
      <div className="bg-gray-50 overflow-hidden animate-slide-up w-[97%] ">
        <div className="flex items-center justify-between p-3 border-b">
          <h2 className="text-lg font-semibold">Filtreler</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <h3 className="font-medium text-gray-900 mb-1">Filtreler</h3>
              <div className="space-y-3">
                {(() => {
                  const priorityFilters = ["color", "size"];
                  const excludedFromMainFilters = ["warehouse"];

                  const priorityFilterObjs = priorityFilters
                    .map((id) => filters.find((f) => f.id === id))
                    .filter((f): f is Filter => f !== undefined);

                  const otherFilterObjs = filters
                    .filter(
                      (f) =>
                        !priorityFilters.includes(f.id) &&
                        !excludedFromMainFilters.includes(f.id)
                    )
                    .slice(0, 5 - priorityFilterObjs.length);

                  const displayedFilters = [
                    ...priorityFilterObjs,
                    ...otherFilterObjs,
                  ];

                  return displayedFilters;
                })().map((filter) => (
                  <div key={filter.id}>
                    <select
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      onChange={(e) => {
                        if (e.target.value) {
                          handleFilterSelect(filter.id, e.target.value);
                          e.target.value = "";
                        }
                      }}
                      value=""
                    >
                      <option value="">{filter.title}</option>
                      {filter.values.map((value) => {
                        return (
                          <option key={value.value} value={value.value}>
                            {value.valueName || value.value}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-1">Stok</h3>
              <div className="space-y-3">
                <select
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onChange={(e) => {
                    if (e.target.value) {
                      handleFilterSelect("warehouse", e.target.value);
                      e.target.value = "";
                    }
                  }}
                  value=""
                >
                  <option value="">Lütfen depo seçiniz</option>
                  {(() => {
                    const warehouseFilter = filters.find(
                      (f) => f.id === "warehouse"
                    );

                    return warehouseFilter?.values.map((warehouse) => (
                      <option key={warehouse.value} value={warehouse.value}>
                        {warehouse.valueName}
                      </option>
                    ));
                  })()}
                </select>

                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Minimum Stok"
                    value={stockFilters.minStock}
                    onChange={(e) =>
                      handleStockChange("minStock", e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    type="number"
                    placeholder="Maksimum Stok"
                    value={stockFilters.maxStock}
                    onChange={(e) =>
                      handleStockChange("maxStock", e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="flex items-center">
                  <input type="checkbox" id="allSizes" className="mr-2" />
                  <label htmlFor="allSizes" className="text-sm text-gray-700">
                    Tüm Bedenlerde Stok Olanlar
                  </label>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-1">Ürün Kodu</h3>
              <input
                type="text"
                placeholder="Seçiniz"
                value={stockFilters.productCode}
                onChange={(e) =>
                  handleStockChange("productCode", e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <div className="flex items-center mb-1">
                <PlusIcon className="w-4 h-4 mr-2" />
                <h3 className="font-medium text-gray-900">Sıralamalar</h3>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Seçiniz</option>
                <option value="name_asc">İsim A-Z</option>
                <option value="name_desc">İsim Z-A</option>
                <option value="code_asc">Kod A-Z</option>
                <option value="code_desc">Kod Z-A</option>
                <option value="stock_asc">Stok Azdan Çoka</option>
                <option value="stock_desc">Stok Çoktan Aza</option>
              </select>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-1">
              Uygulanan Kriterler
            </h4>
            <div className="min-h-[100px] p-3 border border-gray-200 rounded bg-gray-50">
              {Object.keys(selectedFilters).length === 0 ? (
                <p className="text-gray-500 text-sm">
                  Lütfen aramak için kriter seçiniz
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {Object.entries(selectedFilters).map(([filterId, values]) => {
                    const filter = filters.find((f) => f.id === filterId);
                    return values.map((value) => {
                      const filterValue = filter?.values.find(
                        (v) => v.value === value
                      );
                      return (
                        <span
                          key={`${filterId}-${value}`}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
                        >
                          {filter?.title}: {filterValue?.valueName || value}
                          <button
                            onClick={() => handleFilterSelect(filterId, value)}
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
          </div>
        </div>

        <div className="flex gap-3 p-4  bg-gray-50">
          <button
            onClick={handleClear}
            className="flex-1 px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
          >
            Seçimi Temizle
          </button>
          <button
            onClick={handleApply}
            className="flex-1 px-4 py-2 text-white bg-black rounded hover:bg-gray-800 transition-colors"
          >
            Ara
          </button>
        </div>
      </div>
    </div>
  );
}
