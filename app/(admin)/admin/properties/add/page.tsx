"use client";

import { AdminHeader } from "@/components/admin/AdminHeader";
import { PropertyForm } from "@/components/admin/PropertyForm";
import { useAuth } from "@/hooks/useAuth";
import { ShieldX } from "lucide-react";

export default function AddPropertyPage() {
  const { isSuperAdmin } = useAuth();

  if (!isSuperAdmin) {
    return (
      <div className="flex flex-col h-full overflow-auto">
        <AdminHeader title="Add Property" />
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="text-center flex flex-col items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
              <ShieldX className="h-8 w-8 text-red-500" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Access Restricted</h2>
              <p className="text-gray-500 text-sm mt-1">Only Super Admins can add new properties to the platform.</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-auto">
      <AdminHeader title="Add New Property" />
      <main className="flex-1 p-6 max-w-4xl">
        <p className="text-gray-500 text-sm mb-6">Fill in the details below to add a new property to the platform.</p>
        <PropertyForm />
      </main>
    </div>
  );
}
