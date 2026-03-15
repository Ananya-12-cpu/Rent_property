"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { toggleSidebar } from "@/store/slices/uiSlice";
import { useAuth } from "@/hooks/useAuth";
import {
  Building2, LayoutDashboard, Home, Users, Settings,
  ChevronLeft, ChevronRight, PlusCircle, LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard, roles: ["admin", "superadmin"] },
  { href: "/admin/properties", label: "Properties", icon: Home, roles: ["admin", "superadmin"] },
  { href: "/admin/properties/add", label: "Add Property", icon: PlusCircle, roles: ["superadmin"] },
  { href: "/admin/users", label: "Users", icon: Users, roles: ["admin", "superadmin"] },
  { href: "/admin/settings", label: "Settings", icon: Settings, roles: ["admin", "superadmin"] },
];

export function AdminSidebar() {
  const dispatch = useAppDispatch();
  const { sidebarOpen } = useAppSelector((s) => s.ui);
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const accessible = navItems.filter((item) => user?.role && item.roles.includes(user.role));

  return (
    <aside
      className={cn(
        "flex flex-col bg-gray-900 text-white transition-all duration-300 shrink-0",
        sidebarOpen ? "w-60" : "w-16"
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-800">
        {sidebarOpen && (
          <div className="flex items-center gap-2 text-white font-bold">
            <Building2 className="h-6 w-6 text-blue-400" />
            <span>RentPro</span>
          </div>
        )}
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="ml-auto p-1.5 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
        >
          {sidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>
      </div>

      {/* Role badge */}
      {sidebarOpen && user && (
        <div className="px-4 py-3 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold shrink-0">
              {user.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs text-gray-400 capitalize">{user.role}</p>
            </div>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 flex flex-col gap-1">
        {accessible.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm",
                active
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              )}
              title={!sidebarOpen ? label : undefined}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {sidebarOpen && <span>{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-2 pb-4 border-t border-gray-800 pt-4 flex flex-col gap-1">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors text-sm"
          title={!sidebarOpen ? "Back to site" : undefined}
        >
          <Building2 className="h-5 w-5 shrink-0" />
          {sidebarOpen && <span>Back to site</span>}
        </Link>
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-red-900/50 hover:text-red-300 transition-colors text-sm w-full"
          title={!sidebarOpen ? "Logout" : undefined}
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {sidebarOpen && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
