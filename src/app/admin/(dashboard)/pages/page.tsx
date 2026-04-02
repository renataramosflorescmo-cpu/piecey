"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { PAGE_CONFIGS } from "@/lib/page-sections-config";
import { ArrowRight, Home, Info, Briefcase, Phone } from "lucide-react";

const pageIcons: Record<string, React.ElementType> = {
  home: Home,
  about: Info,
  services: Briefcase,
  contact: Phone,
};

export default function PagesEditorPage() {
  const pages = Object.entries(PAGE_CONFIGS);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Páginas
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Edite o conteúdo de cada página do site: textos, imagens, vídeos e links.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {pages.map(([key, config]) => {
          const Icon = pageIcons[key] || Home;
          return (
            <Link key={key} href={`/admin/pages/${key}`}>
              <Card className="group cursor-pointer transition-all hover:border-blue-200 hover:shadow-md">
                <CardContent className="flex items-center justify-between py-6">
                  <div className="flex items-center gap-4">
                    <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-950">
                      <Icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-zinc-900 dark:text-zinc-100">
                        {config.label}
                      </p>
                      <p className="text-sm text-zinc-400">
                        {config.sections.length} seções editáveis
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-zinc-400 transition-transform group-hover:translate-x-1" />
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
