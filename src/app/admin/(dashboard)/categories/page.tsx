"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  listCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/lib/queries/categories";
import { slugify } from "@/lib/utils/slugify";
import { Plus, Edit, Trash2, Check, X } from "lucide-react";
import { toast } from "sonner";
import type { Database } from "@/types/database";

type Category = Database["public"]["Tables"]["categories"]["Row"];

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      const data = await listCategories();
      setCategories(data);
    } catch {
      toast.error("Erro ao carregar categorias.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate() {
    if (!newName.trim()) return;

    try {
      const category = await createCategory({
        name: newName,
        slug: slugify(newName),
      });
      setCategories((prev) => [...prev, category].sort((a, b) => a.name.localeCompare(b.name)));
      setNewName("");
      toast.success("Categoria criada!");
    } catch {
      toast.error("Erro ao criar categoria.");
    }
  }

  async function handleUpdate(id: string) {
    if (!editingName.trim()) return;

    try {
      await updateCategory(id, {
        name: editingName,
        slug: slugify(editingName),
      });
      setCategories((prev) =>
        prev.map((c) =>
          c.id === id ? { ...c, name: editingName, slug: slugify(editingName) } : c
        )
      );
      setEditingId(null);
      toast.success("Categoria atualizada!");
    } catch {
      toast.error("Erro ao atualizar categoria.");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Excluir esta categoria?")) return;

    try {
      await deleteCategory(id);
      setCategories((prev) => prev.filter((c) => c.id !== id));
      toast.success("Categoria excluída.");
    } catch {
      toast.error("Erro ao excluir categoria.");
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        Categorias
      </h1>

      {/* Add new */}
      <Card>
        <CardContent className="flex items-end gap-3 pt-6">
          <div className="flex-1">
            <Input
              id="new-category"
              label="Nova Categoria"
              placeholder="Nome da categoria"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
            />
          </div>
          <Button onClick={handleCreate} disabled={!newName.trim()}>
            <Plus className="h-4 w-4" />
            Adicionar
          </Button>
        </CardContent>
      </Card>

      {/* List */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        </div>
      ) : categories.length === 0 ? (
        <p className="text-center text-zinc-400">Nenhuma categoria criada.</p>
      ) : (
        <Card>
          <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex items-center justify-between px-6 py-3"
              >
                {editingId === category.id ? (
                  <div className="flex flex-1 items-center gap-2">
                    <Input
                      id={`edit-${category.id}`}
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleUpdate(category.id)
                      }
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleUpdate(category.id)}
                    >
                      <Check className="h-4 w-4 text-green-600" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setEditingId(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <div>
                      <p className="font-medium text-zinc-900 dark:text-zinc-100">
                        {category.name}
                      </p>
                      <p className="text-sm text-zinc-400">/{category.slug}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setEditingId(category.id);
                          setEditingName(category.name);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(category.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
