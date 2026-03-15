"use client";

import { AdminHeader } from "@/components/admin/AdminHeader";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Shield, Bell, Globe, Lock } from "lucide-react";

export default function SettingsPage() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col h-full overflow-auto">
      <AdminHeader title="Settings" />
      <main className="flex-1 p-6 max-w-3xl flex flex-col gap-6">
        {/* Profile */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-gray-900 font-semibold">
            <Shield className="h-5 w-5 text-blue-500" />
            Profile Settings
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Full Name" defaultValue={user?.name} />
            <Input label="Email Address" type="email" defaultValue={user?.email} disabled />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Role</label>
            <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-100 rounded-lg text-sm text-blue-700 font-medium capitalize w-fit">
              {user?.role}
            </div>
          </div>
          <Button className="w-fit">Save Changes</Button>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-gray-900 font-semibold">
            <Bell className="h-5 w-5 text-blue-500" />
            Notifications
          </div>
          {[
            { label: "New booking requests", desc: "Get notified when someone requests a property" },
            { label: "User registrations", desc: "Alert when a new user signs up" },
            { label: "Property status changes", desc: "Notify when property status updates" },
          ].map(({ label, desc }) => (
            <div key={label} className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-gray-900">{label}</p>
                <p className="text-xs text-gray-500">{desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-10 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-focus:ring-2 peer-focus:ring-blue-300 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-4" />
              </label>
            </div>
          ))}
        </div>

        {/* Security */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-gray-900 font-semibold">
            <Lock className="h-5 w-5 text-blue-500" />
            Security
          </div>
          <Input label="Current Password" type="password" placeholder="••••••••" />
          <Input label="New Password" type="password" placeholder="••••••••" />
          <Input label="Confirm New Password" type="password" placeholder="••••••••" />
          <Button className="w-fit">Update Password</Button>
        </div>

        {/* Platform */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-gray-900 font-semibold">
            <Globe className="h-5 w-5 text-blue-500" />
            Platform
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Platform Name" defaultValue="RentPro" />
            <Input label="Support Email" defaultValue="support@rentpro.com" />
          </div>
          <Button className="w-fit">Save Platform Settings</Button>
        </div>
      </main>
    </div>
  );
}
