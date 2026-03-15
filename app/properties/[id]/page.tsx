"use client";

import { use, useState } from "react";
import { useProperty } from "@/hooks/useProperties";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  BedDouble, Bath, Maximize2, MapPin, Calendar, ArrowLeft,
  CheckCircle, Loader2, Star, Share2, Heart,
} from "lucide-react";
import Link from "next/link";

const statusVariant = { available: "success", rented: "error", maintenance: "warning" } as const;

export default function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: property, isLoading } = useProperty(id);
  const [activeImage, setActiveImage] = useState(0);
  const [liked, setLiked] = useState(false);
  const [showBooking, setShowBooking] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-xl font-semibold text-gray-700">Property not found</p>
            <Link href="/properties">
              <Button variant="outline" className="mt-4">Back to Properties</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/properties" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Properties
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium truncate">{property.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Images + Details */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Image gallery */}
            <div className="flex flex-col gap-2">
              <div className="relative rounded-2xl overflow-hidden h-72 sm:h-96 bg-gray-200">
                <img
                  src={property.images[activeImage]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge variant={statusVariant[property.status]}>{property.status}</Badge>
                  {property.featured && (
                    <span className="inline-flex items-center gap-1 bg-amber-400 text-amber-900 text-xs font-semibold px-2 py-0.5 rounded-full">
                      <Star className="h-3 w-3 fill-current" /> Featured
                    </span>
                  )}
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => setLiked(!liked)}
                    className="p-2 bg-white rounded-full shadow hover:scale-110 transition-transform"
                  >
                    <Heart className={`h-5 w-5 ${liked ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
                  </button>
                  <button className="p-2 bg-white rounded-full shadow hover:scale-110 transition-transform">
                    <Share2 className="h-5 w-5 text-gray-400" />
                  </button>
                </div>
              </div>
              {property.images.length > 1 && (
                <div className="flex gap-2">
                  {property.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`h-16 w-24 rounded-xl overflow-hidden border-2 transition-all ${activeImage === i ? "border-blue-500" : "border-transparent"}`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Title + meta */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div>
                  <span className="inline-block bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded-full capitalize mb-2">
                    {property.type}
                  </span>
                  <h1 className="text-2xl font-bold text-gray-900">{property.title}</h1>
                  <div className="flex items-center gap-1.5 text-gray-500 mt-1 text-sm">
                    <MapPin className="h-4 w-4" />
                    {property.location.address}, {property.location.city}, {property.location.state} {property.location.zip}
                  </div>
                </div>
                <div className="shrink-0">
                  <div className="text-2xl font-bold text-blue-600">{formatCurrency(property.price)}</div>
                  <div className="text-xs text-gray-400 text-right">per month</div>
                </div>
              </div>

              {/* Stats row */}
              <div className="flex flex-wrap gap-6 py-3 border-y border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <BedDouble className="h-5 w-5 text-blue-500" />
                  <span className="font-medium">{property.bedrooms === 0 ? "Studio" : `${property.bedrooms} Bedrooms`}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Bath className="h-5 w-5 text-blue-500" />
                  <span className="font-medium">{property.bathrooms} Bathrooms</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Maximize2 className="h-5 w-5 text-blue-500" />
                  <span className="font-medium">{property.area} sqft</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-5 w-5 text-blue-500" />
                  <span className="font-medium">Listed {formatDate(property.createdAt)}</span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">About this property</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{property.description}</p>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Amenities</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-blue-500 shrink-0" />
                    {amenity}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Booking card */}
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm sticky top-24">
              <div className="text-2xl font-bold text-blue-600 mb-1">{formatCurrency(property.price)}<span className="text-base font-normal text-gray-400">/month</span></div>
              <Badge variant={statusVariant[property.status]} className="mb-4">{property.status}</Badge>

              {property.status === "available" ? (
                <>
                  {!showBooking ? (
                    <div className="flex flex-col gap-3">
                      <Button fullWidth size="lg" onClick={() => setShowBooking(true)}>
                        Schedule a Viewing
                      </Button>
                      <Button fullWidth variant="outline" size="lg">
                        Contact Agent
                      </Button>
                      <p className="text-xs text-center text-gray-400">Free cancellation · No commitment</p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-xs text-gray-500 font-medium">Move-in Date</label>
                          <input type="date" className="mt-1 w-full border border-gray-200 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                          <label className="text-xs text-gray-500 font-medium">Lease Duration</label>
                          <select className="mt-1 w-full border border-gray-200 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>6 months</option>
                            <option>12 months</option>
                            <option>24 months</option>
                          </select>
                        </div>
                      </div>
                      <Button fullWidth>Confirm Request</Button>
                      <Button fullWidth variant="ghost" onClick={() => setShowBooking(false)}>Cancel</Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-gray-500 font-medium">This property is currently not available</p>
                  <Link href="/properties">
                    <Button variant="outline" size="sm" className="mt-3">Browse Other Properties</Button>
                  </Link>
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-1.5 text-xs text-gray-500">
                <div className="flex justify-between"><span>Monthly rent</span><span className="font-medium text-gray-700">{formatCurrency(property.price)}</span></div>
                <div className="flex justify-between"><span>Security deposit</span><span className="font-medium text-gray-700">{formatCurrency(property.price * 2)}</span></div>
                <div className="flex justify-between border-t border-gray-100 pt-1.5 font-medium text-gray-700">
                  <span>Total due to move in</span>
                  <span>{formatCurrency(property.price * 3)}</span>
                </div>
              </div>
            </div>

            {/* Location card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Location</h3>
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <p>{property.location.address}</p>
                  <p>{property.location.city}, {property.location.state} {property.location.zip}</p>
                  <p>{property.location.country}</p>
                </div>
              </div>
              {/* Placeholder map */}
              <div className="mt-3 h-32 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl flex items-center justify-center border border-blue-100">
                <div className="text-center text-sm text-blue-400">
                  <MapPin className="h-6 w-6 mx-auto mb-1" />
                  Map view coming soon
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
