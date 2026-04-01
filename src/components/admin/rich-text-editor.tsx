"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageExt from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Heading3,
  Quote,
  Code,
  ImageIcon,
  Link as LinkIcon,
  Undo,
  Redo,
  Minus,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface RichTextEditorProps {
  content: unknown;
  onChange: (json: unknown, html: string) => void;
  onImageRequest?: () => void;
}

export function RichTextEditor({
  content,
  onChange,
  onImageRequest,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
      }),
      ImageExt.configure({ inline: false }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: "text-blue-600 underline" },
      }),
      Placeholder.configure({
        placeholder: "Comece a escrever o conteúdo do artigo...",
      }),
    ],
    content: content as Record<string, unknown>,
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON(), editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-zinc dark:prose-invert max-w-none min-h-[300px] focus:outline-none px-4 py-3",
      },
    },
  });

  if (!editor) return null;

  function addLink() {
    const url = window.prompt("URL do link:");
    if (url) {
      editor?.chain().focus().setLink({ href: url }).run();
    }
  }

  function addImage() {
    if (onImageRequest) {
      onImageRequest();
    } else {
      const url = window.prompt("URL da imagem:");
      if (url) {
        editor?.chain().focus().setImage({ src: url }).run();
      }
    }
  }

  const ToolbarButton = ({
    onClick,
    active,
    children,
    title,
  }: {
    onClick: () => void;
    active?: boolean;
    children: React.ReactNode;
    title: string;
  }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={cn(
        "rounded p-1.5 transition-colors",
        active
          ? "bg-zinc-200 text-zinc-900 dark:bg-zinc-700 dark:text-zinc-100"
          : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800"
      )}
    >
      {children}
    </button>
  );

  return (
    <div className="overflow-hidden rounded-lg border border-zinc-300 dark:border-zinc-700">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-0.5 border-b border-zinc-200 bg-zinc-50 px-2 py-1.5 dark:border-zinc-700 dark:bg-zinc-900">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          title="Negrito"
        >
          <Bold className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          title="Itálico"
        >
          <Italic className="h-4 w-4" />
        </ToolbarButton>
        <div className="mx-1 w-px bg-zinc-300 dark:bg-zinc-700" />
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          active={editor.isActive("heading", { level: 2 })}
          title="Título H2"
        >
          <Heading2 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          active={editor.isActive("heading", { level: 3 })}
          title="Título H3"
        >
          <Heading3 className="h-4 w-4" />
        </ToolbarButton>
        <div className="mx-1 w-px bg-zinc-300 dark:bg-zinc-700" />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
          title="Lista"
        >
          <List className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
          title="Lista numerada"
        >
          <ListOrdered className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive("blockquote")}
          title="Citação"
        >
          <Quote className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          active={editor.isActive("codeBlock")}
          title="Código"
        >
          <Code className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="Linha horizontal"
        >
          <Minus className="h-4 w-4" />
        </ToolbarButton>
        <div className="mx-1 w-px bg-zinc-300 dark:bg-zinc-700" />
        <ToolbarButton onClick={addLink} title="Link">
          <LinkIcon className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={addImage} title="Imagem">
          <ImageIcon className="h-4 w-4" />
        </ToolbarButton>
        <div className="mx-1 w-px bg-zinc-300 dark:bg-zinc-700" />
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          title="Desfazer"
        >
          <Undo className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          title="Refazer"
        >
          <Redo className="h-4 w-4" />
        </ToolbarButton>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  );
}
