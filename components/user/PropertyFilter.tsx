"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setFilters, resetFilters, setViewMode } from "@/store/slices/propertySlice";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { LayoutGrid, List, SlidersHorizontal, X } from "lucide-react";

const typeOptions = [
  { value: "all", label: "All Types" },
  { value: "apartment", label: "Apartment" },
  { value: "house", label: "House" },
  { value: "villa", label: "Villa" },
  { value: "studio", label: "Studio" },
  { value: "penthouse", label: "Penthouse" },
];

const statusOptions = [
  { value: "all", label: "Any Status" },
  { value: "available", label: "Available" },
  { value: "rented", label: "Rented" },
  { value: "maintenance", label: "Maintenance" },
];

const bedroomOptions = [
  { value: 0, label: "Any Bedrooms" },
  { value: 1, label: "1+" },
  { value: 2, label: "2+" },
  { value: 3, label: "3+" },
  { value: 4, label: "4+" },
];

export function PropertyFilter() {
  const dispatch = useAppDispatch();
  const { filters, viewMode } = useAppSelector((s) => s.property);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
      <div className="flex flex-wrap items-end gap-3">
        <div className="flex items-center gap-2 mr-1">
          <SlidersHorizontal className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-semibold text-gray-700">Filters</span>
        </div>

        <div className="flex-1 min-w-[160px]">
          <Input
            placeholder="Search city, title..."
            value={filters.search ?? ""}
            onChange={(e) => dispatch(setFilters({ search: e.target.value }))}
          />
        </div>

        <div className="min-w-[130px]">
          <Select
            options={typeOptions}
            value={filters.type ?? "all"}
            onChange={(e) => dispatch(setFilters({ type: e.target.value as any }))}
          />
        </div>

        <div className="min-w-[130px]">
          <Select
            options={statusOptions}
            value={filters.status ?? "all"}
            onChange={(e) => dispatch(setFilters({ status: e.target.value as any }))}
          />
        </div>

        <div className="min-w-[110px]">
          <Select
            options={bedroomOptions}
            value={filters.bedrooms ?? 0}
            onChange={(e) => dispatch(setFilters({ bedrooms: Number(e.target.value) }))}
          />
        </div>

        <div className="min-w-[100px]">
          <Input
            type="number"
            placeholder="Max price"
            value={filters.maxPrice ?? ""}
            onChange={(e) =>
              dispatch(setFilters({ maxPrice: e.target.value ? Number(e.target.value) : undefined }))
            }
          />
        </div>

        {/* View toggle */}
        <div className="flex gap-1 border border-gray-200 rounded-lg p-1">
          <button
            onClick={() => dispatch(setViewMode("grid"))}
            className={`p-1.5 rounded ${viewMode === "grid" ? "bg-blue-100 text-blue-600" : "text-gray-400 hover:text-gray-600"}`}
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            onClick={() => dispatch(setViewMode("list"))}
            className={`p-1.5 rounded ${viewMode === "list" ? "bg-blue-100 text-blue-600" : "text-gray-400 hover:text-gray-600"}`}
          >
            <List className="h-4 w-4" />
          </button>
        </div>

        <Button variant="ghost" size="sm" onClick={() => dispatch(resetFilters())}>
          <X className="h-4 w-4" />
          Clear
        </Button>
      </div>
    </div>
  );
}
