"use client";

import { useNotification } from "@/hooks/useNotification";
import { CheckCircle, XCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

const icons = {
  success: <CheckCircle className="h-5 w-5 text-emerald-500" />,
  error: <XCircle className="h-5 w-5 text-red-500" />,
  info: <Info className="h-5 w-5 text-blue-500" />,
};

const styles = {
  success: "bg-emerald-50 border-emerald-200 text-emerald-800",
  error: "bg-red-50 border-red-200 text-red-800",
  info: "bg-blue-50 border-blue-200 text-blue-800",
};

export function Notification() {
  const { notification, dismiss } = useNotification();
  if (!notification) return null;

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm w-full animate-in slide-in-from-top-2">
      <div
        className={cn(
          "flex items-start gap-3 p-4 rounded-xl border shadow-lg",
          styles[notification.type]
        )}
      >
        {icons[notification.type]}
        <p className="flex-1 text-sm font-medium">{notification.message}</p>
        <button onClick={dismiss} className="shrink-0 hover:opacity-70">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
