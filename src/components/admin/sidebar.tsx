"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Layout,
  ImageIcon,
  Tags,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { ADMIN_NAV_ITEMS } from "@/lib/constants";

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard,
  FileText,
  Layout,
  Image: ImageIcon,
  Tags,
  Settings,
};

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 flex-col border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
        <Link href="/admin" className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          Admin
        </Link>
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {ADMIN_NAV_ITEMS.map((item) => {
          const Icon = iconMap[item.icon];
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                  : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
              )}
            >
              {Icon && <Icon className="h-4 w-4" />}
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-zinc-200 p-3 dark:border-zinc-800">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800"
        >
          Ver site
        </Link>
      </div>
    </aside>
  );
}
