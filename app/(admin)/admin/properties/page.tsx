"use client";

import { AdminHeader } from "@/components/admin/AdminHeader";
import { useProperties, useDeleteProperty } from "@/hooks/useProperties";
import { useAuth } from "@/hooks/useAuth";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatCurrency, formatDate } from "@/lib/utils";
import Link from "next/link";
import { Loader2, PlusCircle, Pencil, Trash2, Eye } from "lucide-react";
import { useState } from "react";

export default function AdminPropertiesPage() {
  const { data: properties, isLoading } = useProperties();
  const deleteMutation = useDeleteProperty();
  const { isSuperAdmin } = useAuth();
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    await deleteMutation.mutateAsync(id);
    setConfirmDelete(null);
  };

  return (
    <div className="flex flex-col h-full overflow-auto">
      <AdminHeader title="Properties" />
      <main className="flex-1 p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">{properties?.length ?? 0} total properties</p>
          {isSuperAdmin && (
            <Link href="/admin/properties/add">
              <Button>
                <PlusCircle className="h-4 w-4" />
                Add Property
              </Button>
            </Link>
          )}
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="px-4 py-3 font-semibold text-gray-700">Property</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Type</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Price</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Status</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Location</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Added</th>
                    <th className="px-4 py-3 font-semibold text-gray-700 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {properties?.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img src={p.images[0]} alt={p.title} className="h-10 w-14 object-cover rounded-lg shrink-0" />
                          <div>
                            <p className="font-medium text-gray-900 max-w-[200px] truncate">{p.title}</p>
                            <p className="text-xs text-gray-400">{p.bedrooms} bed · {p.bathrooms} bath · {p.area} sqft</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 capitalize text-gray-600">{p.type}</td>
                      <td className="px-4 py-3 font-semibold text-blue-600">{formatCurrency(p.price)}/mo</td>
                      <td className="px-4 py-3">
                        <Badge variant={p.status === "available" ? "success" : p.status === "rented" ? "error" : "warning"}>
                          {p.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{p.location.city}, {p.location.state}</td>
                      <td className="px-4 py-3 text-gray-500">{formatDate(p.createdAt)}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/properties/${p.id}`}>
                            <Button variant="ghost" size="sm" title="View">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          {isSuperAdmin && (
                            <>
                              <Button variant="ghost" size="sm" title="Edit">
                                <Pencil className="h-4 w-4" />
                              </Button>
                              {confirmDelete === p.id ? (
                                <div className="flex gap-1">
                                  <Button
                                    variant="danger"
                                    size="sm"
                                    loading={deleteMutation.isPending}
                                    onClick={() => handleDelete(p.id)}
                                  >
                                    Confirm
                                  </Button>
                                  <Button variant="ghost" size="sm" onClick={() => setConfirmDelete(null)}>Cancel</Button>
                                </div>
                              ) : (
                                <Button variant="ghost" size="sm" title="Delete" onClick={() => setConfirmDelete(p.id)}>
                                  <Trash2 className="h-4 w-4 text-red-400" />
                                </Button>
                              )}
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
