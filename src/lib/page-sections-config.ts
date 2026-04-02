export const PAGE_CONFIGS = {
  home: {
    label: "Home",
    sections: [
      {
        sectionKey: "hero",
        title: "Hero Principal",
        fields: [
          { key: "badge", label: "Badge (texto acima do título)", type: "text" as const },
          { key: "heading", label: "Título principal", type: "text" as const },
          { key: "heading_highlight", label: "Título destaque (segunda linha)", type: "text" as const },
          { key: "subheading", label: "Subtítulo", type: "textarea" as const },
          { key: "cta_primary_text", label: "Texto botão principal", type: "text" as const },
          { key: "cta_primary_link", label: "Link botão principal", type: "url" as const },
          { key: "cta_secondary_text", label: "Texto botão secundário", type: "text" as const },
          { key: "cta_secondary_link", label: "Link botão secundário", type: "url" as const },
          { key: "background_image", label: "Imagem de fundo (opcional)", type: "image" as const },
        ],
      },
      {
        sectionKey: "about_preview",
        title: "Seção Sobre (preview na Home)",
        fields: [
          { key: "heading", label: "Título", type: "text" as const },
          { key: "content", label: "Conteúdo", type: "richtext" as const },
          { key: "image", label: "Imagem", type: "image" as const },
          { key: "video_url", label: "URL do vídeo (opcional)", type: "video" as const },
        ],
      },
      {
        sectionKey: "cta",
        title: "Chamada para Ação (CTA final)",
        fields: [
          { key: "heading", label: "Título", type: "text" as const },
          { key: "description", label: "Descrição", type: "textarea" as const },
          { key: "cta_text", label: "Texto do botão", type: "text" as const },
          { key: "cta_link", label: "Link do botão", type: "url" as const },
          { key: "mockup_image", label: "Imagem mockup (lado direito)", type: "image" as const },
        ],
      },
    ],
  },
  about: {
    label: "Sobre",
    sections: [
      {
        sectionKey: "hero",
        title: "Hero da Página",
        fields: [
          { key: "heading", label: "Título", type: "text" as const },
          { key: "description", label: "Descrição", type: "textarea" as const },
        ],
      },
      {
        sectionKey: "who_we_are",
        title: "Quem Somos",
        fields: [
          { key: "heading", label: "Título", type: "text" as const },
          { key: "content", label: "Conteúdo", type: "richtext" as const },
          { key: "image", label: "Imagem (opcional)", type: "image" as const },
          { key: "video_url", label: "URL do vídeo (opcional)", type: "video" as const },
        ],
      },
      {
        sectionKey: "extra_content",
        title: "Conteúdo Extra",
        fields: [
          { key: "heading", label: "Título", type: "text" as const },
          { key: "content", label: "Conteúdo", type: "richtext" as const },
          { key: "image", label: "Imagem (opcional)", type: "image" as const },
        ],
      },
    ],
  },
  services: {
    label: "Soluções",
    sections: [
      {
        sectionKey: "hero",
        title: "Hero da Página",
        fields: [
          { key: "heading", label: "Título", type: "text" as const },
          { key: "description", label: "Descrição", type: "textarea" as const },
        ],
      },
      {
        sectionKey: "main_content",
        title: "Conteúdo Principal",
        fields: [
          { key: "heading", label: "Título", type: "text" as const },
          { key: "content", label: "Conteúdo detalhado", type: "richtext" as const },
          { key: "image", label: "Imagem (opcional)", type: "image" as const },
          { key: "video_url", label: "URL do vídeo (opcional)", type: "video" as const },
        ],
      },
      {
        sectionKey: "cta",
        title: "Chamada para Ação",
        fields: [
          { key: "heading", label: "Título", type: "text" as const },
          { key: "description", label: "Descrição", type: "textarea" as const },
          { key: "cta_text", label: "Texto do botão", type: "text" as const },
          { key: "cta_link", label: "Link do botão", type: "url" as const },
        ],
      },
    ],
  },
  contact: {
    label: "Contato",
    sections: [
      {
        sectionKey: "hero",
        title: "Hero da Página",
        fields: [
          { key: "heading", label: "Título", type: "text" as const },
          { key: "description", label: "Descrição", type: "textarea" as const },
        ],
      },
      {
        sectionKey: "extra_info",
        title: "Informações Adicionais",
        fields: [
          { key: "heading", label: "Título", type: "text" as const },
          { key: "content", label: "Conteúdo", type: "richtext" as const },
          { key: "map_embed", label: "URL embed do mapa (Google Maps)", type: "url" as const },
          { key: "image", label: "Imagem (opcional)", type: "image" as const },
        ],
      },
    ],
  },
} as const;

export type PageKey = keyof typeof PAGE_CONFIGS;
