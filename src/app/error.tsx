"use client";

import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="text-center">
        <p className="text-7xl font-bold text-red-500">500</p>
        <h1 className="mt-4 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
          Algo deu errado
        </h1>
        <p className="mt-3 text-zinc-500">
          Ocorreu um erro inesperado. Tente novamente.
        </p>
        <Button onClick={reset} className="mt-8">
          <RefreshCw className="h-4 w-4" />
          Tentar novamente
        </Button>
      </div>
    </div>
  );
}
