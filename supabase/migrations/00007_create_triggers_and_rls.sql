-- Auto-update updated_at trigger
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

-- Row Level Security

-- Articles
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read published articles"
  ON articles FOR SELECT
  USING (status = 'published');
CREATE POLICY "Authenticated users have full access to articles"
  ON articles FOR ALL
  USING (auth.role() = 'authenticated');

-- Categories
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read categories"
  ON categories FOR SELECT
  USING (true);
CREATE POLICY "Authenticated users manage categories"
  ON categories FOR ALL
  USING (auth.role() = 'authenticated');

-- Article Categories
ALTER TABLE article_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read article_categories"
  ON article_categories FOR SELECT
  USING (true);
CREATE POLICY "Authenticated users manage article_categories"
  ON article_categories FOR ALL
  USING (auth.role() = 'authenticated');

-- Page Sections
ALTER TABLE page_sections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read visible sections"
  ON page_sections FOR SELECT
  USING (is_visible = true);
CREATE POLICY "Authenticated users manage page_sections"
  ON page_sections FOR ALL
  USING (auth.role() = 'authenticated');

-- Site Settings
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read site_settings"
  ON site_settings FOR SELECT
  USING (true);
CREATE POLICY "Authenticated users manage site_settings"
  ON site_settings FOR ALL
  USING (auth.role() = 'authenticated');

-- Media
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read media"
  ON media FOR SELECT
  USING (true);
CREATE POLICY "Authenticated users manage media"
  ON media FOR ALL
  USING (auth.role() = 'authenticated');

-- Page SEO
ALTER TABLE page_seo ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read page_seo"
  ON page_seo FOR SELECT
  USING (true);
CREATE POLICY "Authenticated users manage page_seo"
  ON page_seo FOR ALL
  USING (auth.role() = 'authenticated');
