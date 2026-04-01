"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import {
  FileText,
  ImageIcon,
  Tags,
  Eye,
  Plus,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Stats {
  articles: number;
  published: number;
  drafts: number;
  media: number;
  categories: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats>({
    articles: 0,
    published: 0,
    drafts: 0,
    media: 0,
    categories: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      const supabase = createClient();

      const [articles, published, drafts, media, categories] =
        await Promise.all([
          supabase
            .from("articles")
            .select("id", { count: "exact", head: true }),
          supabase
            .from("articles")
            .select("id", { count: "exact", head: true })
            .eq("status", "published"),
          supabase
            .from("articles")
            .select("id", { count: "exact", head: true })
            .eq("status", "draft"),
          supabase
            .from("media")
            .select("id", { count: "exact", head: true }),
          supabase
            .from("categories")
            .select("id", { count: "exact", head: true }),
        ]);

      setStats({
        articles: articles.count ?? 0,
        published: published.count ?? 0,
        drafts: drafts.count ?? 0,
        media: media.count ?? 0,
        categories: categories.count ?? 0,
      });
      setLoading(false);
    }

    loadStats();
  }, []);

  const statCards = [
    {
      label: "Total Artigos",
      value: stats.articles,
      icon: FileText,
      href: "/admin/articles",
      color: "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
    },
    {
      label: "Publicados",
      value: stats.published,
      icon: Eye,
      href: "/admin/articles",
      color:
        "bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400",
    },
    {
      label: "Rascunhos",
      value: stats.drafts,
      icon: FileText,
      href: "/admin/articles",
      color:
        "bg-yellow-50 text-yellow-600 dark:bg-yellow-950 dark:text-yellow-400",
    },
    {
      label: "Mídias",
      value: stats.media,
      icon: ImageIcon,
      href: "/admin/media",
      color:
        "bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400",
    },
    {
      label: "Categorias",
      value: stats.categories,
      icon: Tags,
      href: "/admin/categories",
      color:
        "bg-orange-50 text-orange-600 dark:bg-orange-950 dark:text-orange-400",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Dashboard
        </h1>
        <Link href="/admin/articles/new">
          <Button>
            <Plus className="h-4 w-4" />
            Novo Artigo
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {statCards.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="transition-shadow hover:shadow-md">
              <CardContent className="flex items-center gap-4 py-5">
                <div className={`rounded-lg p-3 ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-zinc-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                    {loading ? (
                      <span className="inline-block h-7 w-8 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                    ) : (
                      stat.value
                    )}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Ações Rápidas
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/admin/articles/new">
            <Card className="group cursor-pointer transition-all hover:border-blue-200 hover:shadow-md dark:hover:border-blue-900">
              <CardContent className="flex items-center justify-between py-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-blue-50 p-2 dark:bg-blue-950">
                    <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="font-medium text-zinc-700 dark:text-zinc-300">
                    Criar Artigo
                  </span>
                </div>
                <ArrowRight className="h-4 w-4 text-zinc-400 transition-transform group-hover:translate-x-1" />
              </CardContent>
            </Card>
          </Link>
          <Link href="/admin/media">
            <Card className="group cursor-pointer transition-all hover:border-blue-200 hover:shadow-md dark:hover:border-blue-900">
              <CardContent className="flex items-center justify-between py-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-purple-50 p-2 dark:bg-purple-950">
                    <ImageIcon className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span className="font-medium text-zinc-700 dark:text-zinc-300">
                    Upload de Mídia
                  </span>
                </div>
                <ArrowRight className="h-4 w-4 text-zinc-400 transition-transform group-hover:translate-x-1" />
              </CardContent>
            </Card>
          </Link>
          <Link href="/admin/settings">
            <Card className="group cursor-pointer transition-all hover:border-blue-200 hover:shadow-md dark:hover:border-blue-900">
              <CardContent className="flex items-center justify-between py-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-zinc-100 p-2 dark:bg-zinc-800">
                    <Tags className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
                  </div>
                  <span className="font-medium text-zinc-700 dark:text-zinc-300">
                    Configurações
                  </span>
                </div>
                <ArrowRight className="h-4 w-4 text-zinc-400 transition-transform group-hover:translate-x-1" />
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
