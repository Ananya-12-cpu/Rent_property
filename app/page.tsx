import Link from "next/link";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { PropertyCard } from "@/components/user/PropertyCard";
import { Button } from "@/components/ui/Button";
import { mockProperties } from "@/data/mockData";
import {
  Search, Shield, Star, TrendingUp, Home, Building2,
  CheckCircle, ArrowRight, MapPin,
} from "lucide-react";

export default function HomePage() {
  const featured = mockProperties.filter((p) => p.featured).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 h-64 w-64 rounded-full bg-blue-400 blur-3xl" />
          <div className="absolute bottom-10 right-20 h-96 w-96 rounded-full bg-indigo-400 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-blue-700/60 backdrop-blur-sm border border-blue-500/40 rounded-full px-4 py-1.5 text-sm text-blue-200 mb-6">
              <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
              #1 Rated Property Rental Platform
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Find Your Perfect
              <br />
              <span className="text-blue-300">Rental Home</span>
            </h1>
            <p className="text-lg text-blue-100 mb-8 max-w-xl leading-relaxed">
              Browse thousands of verified properties — apartments, houses, villas, and more.
              Premium rentals curated by our expert team.
            </p>

            {/* Quick search */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg">
              <div className="flex-1 flex items-center gap-3 bg-white rounded-xl px-4 py-3 text-gray-600">
                <MapPin className="h-5 w-5 text-gray-400 shrink-0" />
                <span className="text-sm text-gray-400">Search city or property type...</span>
              </div>
              <Link href="/properties">
                <Button size="lg" className="bg-white! text-blue-700 hover:bg-blue-50! border-white whitespace-nowrap">
                  <Search className="h-5 w-5" />
                  Search
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 mt-10 text-sm">
              {[
                { value: "2,400+", label: "Properties" },
                { value: "98%", label: "Satisfaction" },
                { value: "15K+", label: "Happy Tenants" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div className="text-2xl font-bold text-white">{value}</div>
                  <div className="text-blue-300">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Property Type Quick Links */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { type: "apartment", label: "Apartments", icon: "🏢", count: 980 },
            { type: "house", label: "Houses", icon: "🏡", count: 540 },
            { type: "villa", label: "Villas", icon: "🏖️", count: 210 },
            { type: "studio", label: "Studios", icon: "🛋️", count: 430 },
            { type: "penthouse", label: "Penthouses", icon: "🌆", count: 85 },
          ].map(({ type, label, icon, count }) => (
            <Link
              key={type}
              href={`/properties?type=${type}`}
              className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-300 hover:-translate-y-0.5 transition-all text-center"
            >
              <span className="text-3xl">{icon}</span>
              <span className="font-semibold text-gray-800 text-sm">{label}</span>
              <span className="text-xs text-gray-400">{count} listings</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Properties */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Featured Properties</h2>
            <p className="text-gray-500 mt-1">Hand-picked premium listings</p>
          </div>
          <Link href="/properties">
            <Button variant="outline">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((p) => <PropertyCard key={p.id} property={p} />)}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900">How It Works</h2>
            <p className="text-gray-500 mt-2">Renting a property has never been easier</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", icon: Search, title: "Search", desc: "Browse our curated listings and filter by type, location, price range, and amenities." },
              { step: "02", icon: Home, title: "Choose", desc: "Compare properties, view photos, and select the one that fits your lifestyle and budget." },
              { step: "03", icon: CheckCircle, title: "Move In", desc: "Complete your application, sign the lease digitally, and get your keys." },
            ].map(({ step, icon: Icon, title, desc }) => (
              <div key={step} className="flex flex-col items-center text-center gap-4">
                <div className="relative">
                  <div className="h-16 w-16 rounded-2xl bg-blue-50 flex items-center justify-center">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <span className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                    {step}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 text-lg">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features / Why Us */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-blue-600">RentPro?</span>
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              We connect landlords and tenants on a secure, transparent platform designed to make renting stress-free.
            </p>
            <div className="flex flex-col gap-4">
              {[
                { icon: Shield, title: "Verified Listings", desc: "Every property is inspected and verified by our team." },
                { icon: TrendingUp, title: "Best Prices", desc: "Transparent pricing with no hidden fees." },
                { icon: Building2, title: "Premium Selection", desc: "Curated properties across top cities nationwide." },
                { icon: CheckCircle, title: "Instant Booking", desc: "Apply online and get confirmed in 24 hours." },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{title}</h4>
                    <p className="text-sm text-gray-500">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400" alt="apartment" className="rounded-2xl h-48 w-full object-cover" />
            <img src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400" alt="house" className="rounded-2xl h-48 w-full object-cover mt-8" />
            <img src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400" alt="villa" className="rounded-2xl h-48 w-full object-cover -mt-4" />
            <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400" alt="penthouse" className="rounded-2xl h-48 w-full object-cover mt-4" />
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-blue-600 py-14">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Dream Home?</h2>
          <p className="text-blue-100 mb-8">Join thousands of happy tenants who found their perfect rental on RentPro.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/properties">
              <Button size="lg" className="bg-white! text-blue-700 hover:bg-blue-50! border-white">
                Browse Properties
              </Button>
            </Link>
            <Link href="/register">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-700">
                Create Free Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
