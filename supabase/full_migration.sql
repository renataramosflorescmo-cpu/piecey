-- ============================================
-- MIGRATION COMPLETA - Rodar no SQL Editor do Supabase
-- ============================================

-- 1. Articles
CREATE TABLE articles (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title         TEXT NOT NULL,
  slug          TEXT NOT NULL UNIQUE,
  content       JSONB NOT NULL DEFAULT '{}',
  content_html  TEXT NOT NULL DEFAULT '',
  excerpt       TEXT,
  featured_image TEXT,
  author_id     UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  author_name   TEXT NOT NULL DEFAULT '',
  status        TEXT NOT NULL DEFAULT 'draft'
                  CHECK (status IN ('draft','published','archived')),
  published_at  TIMESTAMPTZ,
  seo_title       TEXT,
  seo_description TEXT,
  seo_keywords    TEXT[],
  og_image        TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_articles_slug ON articles (slug);
CREATE INDEX idx_articles_status_published ON articles (status, published_at DESC)
  WHERE status = 'published';

-- 2. Categories
CREATE TABLE categories (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  slug        TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE article_categories (
  article_id  UUID REFERENCES articles(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (article_id, category_id)
);

-- 3. Page Sections
CREATE TABLE page_sections (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_key    TEXT NOT NULL,
  section_key TEXT NOT NULL,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  content     JSONB NOT NULL DEFAULT '{}',
  is_visible  BOOLEAN NOT NULL DEFAULT true,
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (page_key, section_key)
);

-- 4. Site Settings
CREATE TABLE site_settings (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key         TEXT NOT NULL UNIQUE,
  value       JSONB NOT NULL DEFAULT '{}',
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
INSERT INTO site_settings (key, value) VALUES
  ('general', '{"site_name": "PIECEY", "tagline": "Soluções profissionais para o seu negócio", "logo_url": ""}'),
  ('seo', '{"default_title": "PIECEY", "default_description": "Soluções profissionais para o seu negócio.", "default_og_image": "", "google_verification": ""}'),
  ('social', '{"twitter": "", "linkedin": "", "facebook": "", "instagram": ""}'),
  ('contact', '{"email": "", "phone": "", "address": "", "map_embed_url": ""}');

-- 5. Media
CREATE TABLE media (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename    TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  url         TEXT NOT NULL,
  mime_type   TEXT NOT NULL,
  size_bytes  INTEGER NOT NULL,
  width       INTEGER,
  height      INTEGER,
  alt_text    TEXT,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_media_created ON media (created_at DESC);

-- 6. Page SEO
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
INSERT INTO page_seo (page_key, title, description) VALUES
  ('home', 'PIECEY - Página Inicial', 'Soluções profissionais para o seu negócio.'),
  ('about', 'Sobre Nós', 'Conheça nossa história, missão e equipe.'),
  ('services', 'Nossos Serviços', 'Descubra como podemos ajudar o seu negócio a crescer.'),
  ('blog', 'Blog', 'Artigos, novidades e insights do nosso time.'),
  ('contact', 'Contato', 'Entre em contato conosco. Estamos prontos para ajudar.');

-- 7. Triggers
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at BEFORE UPDATE ON articles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON page_sections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON page_seo
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- 8. Row Level Security
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read published articles"
  ON articles FOR SELECT USING (status = 'published');
CREATE POLICY "Authenticated users have full access to articles"
  ON articles FOR ALL USING (auth.role() = 'authenticated');

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read categories"
  ON categories FOR SELECT USING (true);
CREATE POLICY "Authenticated users manage categories"
  ON categories FOR ALL USING (auth.role() = 'authenticated');

ALTER TABLE article_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read article_categories"
  ON article_categories FOR SELECT USING (true);
CREATE POLICY "Authenticated users manage article_categories"
  ON article_categories FOR ALL USING (auth.role() = 'authenticated');

ALTER TABLE page_sections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read visible sections"
  ON page_sections FOR SELECT USING (is_visible = true);
CREATE POLICY "Authenticated users manage page_sections"
  ON page_sections FOR ALL USING (auth.role() = 'authenticated');

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read site_settings"
  ON site_settings FOR SELECT USING (true);
CREATE POLICY "Authenticated users manage site_settings"
  ON site_settings FOR ALL USING (auth.role() = 'authenticated');

ALTER TABLE media ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read media"
  ON media FOR SELECT USING (true);
CREATE POLICY "Authenticated users manage media"
  ON media FOR ALL USING (auth.role() = 'authenticated');

ALTER TABLE page_seo ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read page_seo"
  ON page_seo FOR SELECT USING (true);
CREATE POLICY "Authenticated users manage page_seo"
  ON page_seo FOR ALL USING (auth.role() = 'authenticated');
