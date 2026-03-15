"use client";

import { AdminHeader } from "@/components/admin/AdminHeader";
import { StatsCard } from "@/components/admin/StatsCard";
import { mockDashboardStats, mockProperties, mockBookings, mockUsers } from "@/data/mockData";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import {
  Building2, Users, DollarSign, CalendarCheck,
  CheckCircle2, Clock, TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function DashboardPage() {
  const stats = mockDashboardStats;
  const recentProperties = mockProperties.slice(0, 4);
  const recentBookings = mockBookings;

  return (
    <div className="flex flex-col h-full overflow-auto">
      <AdminHeader title="Dashboard" />
      <main className="flex-1 p-6 flex flex-col gap-6">
        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <div className="xl:col-span-2">
            <StatsCard
              title="Total Properties"
              value={stats.totalProperties}
              icon={Building2}
              color="blue"
              trend={{ value: 12, label: "vs last month" }}
            />
          </div>
          <div className="xl:col-span-2">
            <StatsCard
              title="Available"
              value={stats.availableProperties}
              subtitle={`${stats.rentedProperties} rented`}
              icon={CheckCircle2}
              color="green"
            />
          </div>
          <div className="xl:col-span-2">
            <StatsCard
              title="Total Users"
              value={stats.totalUsers}
              icon={Users}
              color="purple"
              trend={{ value: 8, label: "new this month" }}
            />
          </div>
          <div className="xl:col-span-3">
            <StatsCard
              title="Total Revenue"
              value={formatCurrency(stats.totalRevenue)}
              icon={DollarSign}
              color="amber"
              trend={{ value: 23, label: "vs last quarter" }}
            />
          </div>
          <div className="xl:col-span-3">
            <StatsCard
              title="Bookings This Month"
              value={stats.bookingsThisMonth}
              icon={CalendarCheck}
              color="red"
              trend={{ value: 5, label: "vs last month" }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Properties */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">Recent Properties</h3>
              <Link href="/admin/properties">
                <Button variant="ghost" size="sm">View all</Button>
              </Link>
            </div>
            <div className="divide-y divide-gray-50">
              {recentProperties.map((p) => (
                <div key={p.id} className="flex items-center gap-4 px-6 py-3 hover:bg-gray-50 transition-colors">
                  <img src={p.images[0]} alt={p.title} className="h-12 w-16 object-cover rounded-lg shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm truncate">{p.title}</p>
                    <p className="text-xs text-gray-500">{p.location.city}, {p.location.state}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-semibold text-blue-600 text-sm">{formatCurrency(p.price)}/mo</p>
                    <Badge variant={p.status === "available" ? "success" : p.status === "rented" ? "error" : "warning"}>
                      {p.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Bookings */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">Recent Bookings</h3>
            </div>
            <div className="divide-y divide-gray-50">
              {recentBookings.map((b) => {
                const property = mockProperties.find((p) => p.id === b.propertyId);
                const user = mockUsers.find((u) => u.id === b.userId);
                return (
                  <div key={b.id} className="px-6 py-3 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{property?.title}</p>
                        <p className="text-xs text-gray-500">{user?.name}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{formatDate(b.startDate)} → {formatDate(b.endDate)}</p>
                      </div>
                      <Badge variant={b.status === "confirmed" ? "success" : b.status === "pending" ? "warning" : "error"}>
                        {b.status}
                      </Badge>
                    </div>
                    <p className="text-xs font-semibold text-blue-600 mt-1">{formatCurrency(b.totalAmount)}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-lg">Quick Actions</h3>
              <p className="text-blue-100 text-sm mt-0.5">Manage your platform efficiently</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/admin/properties/add">
                <Button className="bg-white! text-blue-700 hover:bg-blue-50!">
                  <Building2 className="h-4 w-4" />
                  Add Property
                </Button>
              </Link>
              <Link href="/admin/users">
                <Button variant="outline" className="border-white text-white hover:bg-blue-700">
                  <Users className="h-4 w-4" />
                  Manage Users
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
