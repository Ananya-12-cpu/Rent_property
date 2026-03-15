"use client";

import Link from "next/link";
import { Property } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency } from "@/lib/utils";
import { BedDouble, Bath, Maximize2, MapPin, Star } from "lucide-react";

const statusVariant = {
  available: "success",
  rented: "error",
  maintenance: "warning",
} as const;

const typeColors: Record<string, string> = {
  apartment: "bg-blue-50 text-blue-700",
  house: "bg-green-50 text-green-700",
  villa: "bg-purple-50 text-purple-700",
  studio: "bg-orange-50 text-orange-700",
  penthouse: "bg-pink-50 text-pink-700",
};

export function PropertyCard({ property }: { property: Property }) {
  return (
    <Link href={`/properties/${property.id}`} className="group block">
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 h-full flex flex-col">
        {/* Image */}
        <div className="relative h-52 overflow-hidden bg-gray-100">
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
            <Badge variant={statusVariant[property.status]}>
              {property.status}
            </Badge>
            {property.featured && (
              <span className="inline-flex items-center gap-1 bg-amber-400 text-amber-900 text-xs font-semibold px-2 py-0.5 rounded-full">
                <Star className="h-3 w-3 fill-current" /> Featured
              </span>
            )}
          </div>
          <div className="absolute top-3 right-3">
            <span className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${typeColors[property.type] ?? "bg-gray-100 text-gray-700"}`}>
              {property.type}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col gap-2 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-gray-900 text-base leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
              {property.title}
            </h3>
            <div className="shrink-0 text-right">
              <div className="text-lg font-bold text-blue-600">{formatCurrency(property.price)}</div>
              <div className="text-xs text-gray-400">/month</div>
            </div>
          </div>

          <div className="flex items-center gap-1 text-sm text-gray-500">
            <MapPin className="h-3.5 w-3.5 text-gray-400 shrink-0" />
            <span className="truncate">{property.location.city}, {property.location.state}</span>
          </div>

          <p className="text-xs text-gray-500 line-clamp-2 flex-1">{property.description}</p>

          {/* Stats */}
          <div className="flex items-center gap-4 pt-2 border-t border-gray-100 text-xs text-gray-600 font-medium">
            <span className="flex items-center gap-1">
              <BedDouble className="h-3.5 w-3.5 text-gray-400" />
              {property.bedrooms === 0 ? "Studio" : `${property.bedrooms} Bed`}
            </span>
            <span className="flex items-center gap-1">
              <Bath className="h-3.5 w-3.5 text-gray-400" />
              {property.bathrooms} Bath
            </span>
            <span className="flex items-center gap-1">
              <Maximize2 className="h-3.5 w-3.5 text-gray-400" />
              {property.area} sqft
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
