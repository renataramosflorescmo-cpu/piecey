"use client";

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export function AdminHeader() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <header className="flex h-14 items-center justify-between border-b border-zinc-200 bg-white px-6 dark:border-zinc-800 dark:bg-zinc-950">
      <div />
      <div className="flex items-center gap-4">
        <span className="text-sm text-zinc-500">{user?.email}</span>
        <Button variant="ghost" size="sm" onClick={handleSignOut}>
          <LogOut className="h-4 w-4" />
          Sair
        </Button>
      </div>
    </header>
  );
}
