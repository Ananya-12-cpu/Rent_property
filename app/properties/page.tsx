"use client";

import { Suspense } from "react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { PropertyCard } from "@/components/user/PropertyCard";
import { PropertyFilter } from "@/components/user/PropertyFilter";
import { useProperties } from "@/hooks/useProperties";
import { useAppSelector } from "@/store/hooks";
import { Loader2, SearchX } from "lucide-react";

function PropertiesList() {
  const filters = useAppSelector((s) => s.property.filters);
  const viewMode = useAppSelector((s) => s.property.viewMode);
  const { data: properties, isLoading, error } = useProperties(filters);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3 text-gray-400">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <p className="text-sm">Loading properties...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500">
        <p>Failed to load properties. Please try again.</p>
      </div>
    );
  }

  if (!properties || properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3 text-gray-400">
        <SearchX className="h-12 w-12" />
        <p className="font-medium text-gray-600">No properties found</p>
        <p className="text-sm">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-gray-500 mb-4">{properties.length} properties found</p>
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((p) => <PropertyCard key={p.id} property={p} />)}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {properties.map((p) => <PropertyCard key={p.id} property={p} />)}
        </div>
      )}
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Browse Properties</h1>
          <p className="text-gray-500 mt-1">Discover your next rental home</p>
        </div>
        <div className="flex flex-col gap-6">
          <PropertyFilter />
          <Suspense>
            <PropertiesList />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}
