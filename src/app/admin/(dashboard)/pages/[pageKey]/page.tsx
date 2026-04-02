"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PageSectionEditor } from "@/components/admin/page-section-editor";
import { PAGE_CONFIGS, type PageKey } from "@/lib/page-sections-config";
import { getPageSections } from "@/lib/queries/pages";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import type { Database } from "@/types/database";

type PageSection = Database["public"]["Tables"]["page_sections"]["Row"];

export default function EditPageSectionsPage() {
  const params = useParams();
  const router = useRouter();
  const pageKey = params.pageKey as string;
  const config = PAGE_CONFIGS[pageKey as PageKey];

  const [sections, setSections] = useState<PageSection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!config) return;

    getPageSections(pageKey)
      .then(setSections)
      .catch(() => toast.error("Erro ao carregar seções."))
      .finally(() => setLoading(false));
  }, [pageKey, config]);

  if (!config) {
    return (
      <div className="space-y-4">
        <p className="text-zinc-400">Página não encontrada.</p>
        <Button variant="outline" onClick={() => router.push("/admin/pages")}>
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
      </div>
    );
  }

  function getSectionData(sectionKey: string) {
    return sections.find((s) => s.section_key === sectionKey) ?? null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/admin/pages")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            {config.label}
          </h1>
          <p className="text-sm text-zinc-500">
            Edite as seções desta página. Cada seção pode conter textos, imagens, vídeos e links.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        </div>
      ) : (
        <div className="space-y-4">
          {config.sections.map((sectionConfig) => (
            <PageSectionEditor
              key={sectionConfig.sectionKey}
              pageKey={pageKey}
              config={sectionConfig}
              initialData={getSectionData(sectionConfig.sectionKey)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
