"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { NAV_ITEMS } from "@/lib/constants";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-heading text-xl font-bold tracking-tight text-white">
          PIECE<span className="text-purple">Y</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-white/10 text-mint"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="ml-3 rounded-lg bg-electric px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-electric/90"
          >
            Agende uma demo
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="rounded-lg p-2 text-white/70 hover:bg-white/10 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="border-t border-white/10 bg-navy px-4 py-3 md:hidden">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "block rounded-lg px-3 py-2 text-sm font-medium",
                pathname === item.href
                  ? "bg-white/10 text-mint"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="mt-2 block rounded-lg bg-electric px-3 py-2 text-center text-sm font-medium text-white"
          >
            Agende uma demo
          </Link>
        </nav>
      )}
    </header>
  );
}
