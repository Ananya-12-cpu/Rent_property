"use client";

import { useQuery } from "@tanstack/react-query";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Badge } from "@/components/ui/Badge";
import { fetchAllUsers } from "@/lib/api/auth";
import { formatDate } from "@/lib/utils";
import { Loader2, User, Mail, Calendar } from "lucide-react";

export default function UsersPage() {
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchAllUsers,
  });

  return (
    <div className="flex flex-col h-full overflow-auto">
      <AdminHeader title="Users" />
      <main className="flex-1 p-6 flex flex-col gap-4">
        <p className="text-sm text-gray-500">{users?.length ?? 0} registered users</p>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {users?.map((user) => (
              <div key={user.id} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg shrink-0">
                    {user.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{user.name}</p>
                    <Badge variant={user.status === "active" ? "success" : "error"}>{user.status}</Badge>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400 shrink-0" />
                    <span className="truncate">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-400 shrink-0" />
                    <span className="capitalize">{user.role}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400 shrink-0" />
                    <span>Joined {formatDate(user.createdAt)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
