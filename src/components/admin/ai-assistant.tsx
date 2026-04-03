"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2, X } from "lucide-react";
import { toast } from "sonner";

interface AiAssistantProps {
  currentContent: string;
  onApply: (html: string) => void;
}

const presets = [
  { label: "Expandir texto", prompt: "Expanda e aprofunde o texto abaixo, adicionando mais detalhes, exemplos práticos e dados relevantes. Mantenha o tom profissional." },
  { label: "Resumir", prompt: "Resuma o texto abaixo mantendo os pontos principais de forma concisa e clara." },
  { label: "Melhorar SEO", prompt: "Reescreva o texto abaixo otimizando para SEO: adicione palavras-chave relevantes naturalmente, melhore os headings e a estrutura." },
  { label: "Tom mais empático", prompt: "Reescreva o texto abaixo com um tom mais empático e acolhedor, focando nos benefícios para o leitor." },
  { label: "Adicionar CTA", prompt: "Adicione um parágrafo de Call to Action da PIECEY ao final do texto, incentivando o leitor a agendar uma demonstração." },
  { label: "Corrigir e revisar", prompt: "Revise o texto abaixo corrigindo erros de gramática, ortografia e pontuação. Melhore a clareza sem alterar o sentido." },
];

export function AiAssistant({ currentContent, onApply }: AiAssistantProps) {
  const [open, setOpen] = useState(false);
  const [customPrompt, setCustomPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  async function handleAssist(prompt: string) {
    if (!currentContent.trim()) {
      toast.error("O editor está vazio. Escreva algo primeiro.");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "assist",
          prompt,
          content: currentContent,
        }),
      });

      if (!res.ok) throw new Error();

      const data = await res.json();
      if (data.result) {
        setResult(data.result);
        toast.success("Sugestão pronta!");
      }
    } catch {
      toast.error("Erro ao processar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  if (!open) {
    return (
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
        className="border-purple/30 text-purple hover:bg-purple/5"
      >
        <Sparkles className="h-4 w-4" />
        Assistente IA
      </Button>
    );
  }

  return (
    <div className="rounded-lg border border-purple/20 bg-purple/5 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-purple" />
          <span className="text-sm font-medium text-purple">Assistente IA</span>
        </div>
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => { setOpen(false); setResult(""); }}>
          <X className="h-3 w-3" />
        </Button>
      </div>

      {/* Presets */}
      <div className="flex flex-wrap gap-2">
        {presets.map((preset) => (
          <Button
            key={preset.label}
            type="button"
            variant="outline"
            size="sm"
            disabled={loading}
            onClick={() => handleAssist(preset.prompt)}
            className="text-xs"
          >
            {preset.label}
          </Button>
        ))}
      </div>

      {/* Custom prompt */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Ou digite uma instrução personalizada..."
          value={customPrompt}
          onChange={(e) => setCustomPrompt(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && customPrompt && handleAssist(customPrompt)}
          className="flex-1 rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm focus:border-purple focus:outline-none focus:ring-1 focus:ring-purple/30"
        />
        <Button
          type="button"
          size="sm"
          disabled={loading || !customPrompt}
          onClick={() => handleAssist(customPrompt)}
          className="bg-purple hover:bg-purple/90"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Enviar"}
        </Button>
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-sm text-purple">
          <Loader2 className="h-4 w-4 animate-spin" />
          Processando com IA...
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="space-y-2">
          <div
            className="max-h-60 overflow-y-auto rounded-lg border border-zinc-200 bg-white p-4 prose prose-sm prose-zinc max-w-none"
            dangerouslySetInnerHTML={{ __html: result }}
          />
          <div className="flex gap-2">
            <Button
              type="button"
              size="sm"
              onClick={() => { onApply(result); setResult(""); toast.success("Conteúdo aplicado!"); }}
              className="bg-purple hover:bg-purple/90"
            >
              Aplicar no editor
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setResult("")}
            >
              Descartar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
