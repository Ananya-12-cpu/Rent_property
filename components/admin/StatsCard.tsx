import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  color: "blue" | "green" | "amber" | "red" | "purple";
  trend?: { value: number; label: string };
}

const colorMap = {
  blue: { bg: "bg-blue-50", icon: "bg-blue-100 text-blue-600", text: "text-blue-600" },
  green: { bg: "bg-emerald-50", icon: "bg-emerald-100 text-emerald-600", text: "text-emerald-600" },
  amber: { bg: "bg-amber-50", icon: "bg-amber-100 text-amber-600", text: "text-amber-600" },
  red: { bg: "bg-red-50", icon: "bg-red-100 text-red-600", text: "text-red-600" },
  purple: { bg: "bg-purple-50", icon: "bg-purple-100 text-purple-600", text: "text-purple-600" },
};

export function StatsCard({ title, value, subtitle, icon: Icon, color, trend }: StatsCardProps) {
  const c = colorMap[color];
  return (
    <div className={cn("rounded-2xl border border-gray-200 bg-white p-5 flex items-start gap-4 shadow-sm")}>
      <div className={cn("p-3 rounded-xl shrink-0", c.icon)}>
        <Icon className="h-6 w-6" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-0.5">{value}</p>
        {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
        {trend && (
          <p className={cn("text-xs mt-1 font-medium", trend.value >= 0 ? "text-emerald-600" : "text-red-500")}>
            {trend.value >= 0 ? "+" : ""}{trend.value}% {trend.label}
          </p>
        )}
      </div>
    </div>
  );
}
