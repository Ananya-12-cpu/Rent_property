"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useAppSelector } from "@/store/hooks";
import { Building2, Menu, X, User, LogOut, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { mockUsers } from "@/data/mockData";
import { useAppDispatch } from "@/store/hooks";
import { switchRole } from "@/store/slices/authSlice";

export function Navbar() {
  const { user, isAuthenticated, logout, isAdmin, isSuperAdmin } = useAuth();
  const dispatch = useAppDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-blue-600 font-bold text-xl">
            <Building2 className="h-7 w-7" />
            <span>RentPro</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/properties" className="text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Properties
            </Link>
            <Link href="/properties?type=apartment" className="text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Apartments
            </Link>
            <Link href="/properties?type=house" className="text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Houses
            </Link>
            <Link href="/properties?type=villa" className="text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Villas
            </Link>
          </div>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Dev role switcher */}
            <div className="relative">
              <button
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="text-xs px-2 py-1 bg-amber-100 text-amber-700 rounded-md border border-amber-200 hover:bg-amber-200 transition-colors"
              >
                Dev: {user?.role ?? "guest"}
              </button>
              {roleMenuOpen && (
                <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg w-48 z-50 p-1">
                  <p className="text-xs text-gray-500 px-2 py-1 font-medium">Switch Mock User</p>
                  {mockUsers.map((u) => (
                    <button
                      key={u.id}
                      onClick={() => { dispatch(switchRole(u)); setRoleMenuOpen(false); }}
                      className="w-full text-left px-2 py-1.5 text-xs hover:bg-gray-50 rounded flex items-center gap-2"
                    >
                      <span className={`inline-block w-2 h-2 rounded-full ${u.id === user?.id ? "bg-blue-500" : "bg-gray-300"}`} />
                      {u.name} ({u.role})
                    </button>
                  ))}
                </div>
              )}
            </div>

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                {isAdmin && (
                  <Link href="/admin/dashboard">
                    <Button variant="outline" size="sm">
                      <LayoutDashboard className="h-4 w-4" />
                      Admin Panel
                    </Button>
                  </Link>
                )}
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="font-medium">{user?.name}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={logout}>
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 px-4 py-4 bg-white flex flex-col gap-3">
          <Link href="/properties" className="text-sm font-medium text-gray-700" onClick={() => setMenuOpen(false)}>Properties</Link>
          <Link href="/properties?type=apartment" className="text-sm text-gray-600" onClick={() => setMenuOpen(false)}>Apartments</Link>
          <Link href="/properties?type=house" className="text-sm text-gray-600" onClick={() => setMenuOpen(false)}>Houses</Link>
          <Link href="/properties?type=villa" className="text-sm text-gray-600" onClick={() => setMenuOpen(false)}>Villas</Link>
          {isAdmin && (
            <Link href="/admin/dashboard" onClick={() => setMenuOpen(false)}>
              <Button variant="outline" size="sm" fullWidth>Admin Panel</Button>
            </Link>
          )}
          {isAuthenticated ? (
            <Button variant="ghost" size="sm" fullWidth onClick={logout}>Logout</Button>
          ) : (
            <div className="flex flex-col gap-2">
              <Link href="/login" onClick={() => setMenuOpen(false)}><Button variant="outline" fullWidth>Login</Button></Link>
              <Link href="/register" onClick={() => setMenuOpen(false)}><Button fullWidth>Sign Up</Button></Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
