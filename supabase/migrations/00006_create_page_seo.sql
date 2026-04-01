-- Per-page SEO settings
CREATE TABLE page_seo (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_key        TEXT NOT NULL UNIQUE,
  title           TEXT,
  description     TEXT,
  og_image        TEXT,
  keywords        TEXT[],
  json_ld_extra   JSONB,
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Seed default page SEO entries
INSERT INTO page_seo (page_key, title, description) VALUES
  ('home', 'PIECEY - Página Inicial', 'Soluções profissionais para o seu negócio.'),
  ('about', 'Sobre Nós', 'Conheça nossa história, missão e equipe.'),
  ('services', 'Nossos Serviços', 'Descubra como podemos ajudar o seu negócio a crescer.'),
  ('blog', 'Blog', 'Artigos, novidades e insights do nosso time.'),
  ('contact', 'Contato', 'Entre em contato conosco. Estamos prontos para ajudar.');
