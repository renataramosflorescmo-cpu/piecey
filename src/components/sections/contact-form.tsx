"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Send } from "lucide-react";
import { toast } from "sonner";

export function ContactForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error();

      toast.success("Mensagem enviada com sucesso!");
      e.currentTarget.reset();
    } catch {
      toast.error("Erro ao enviar mensagem. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="name"
            name="name"
            label="Nome"
            placeholder="Seu nome"
            required
          />
          <Input
            id="email"
            name="email"
            label="Email"
            type="email"
            placeholder="seu@email.com"
            required
          />
          <div className="space-y-1">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Mensagem
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              placeholder="Como podemos ajudar?"
              className="flex w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            <Send className="h-4 w-4" />
            {loading ? "Enviando..." : "Enviar Mensagem"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
