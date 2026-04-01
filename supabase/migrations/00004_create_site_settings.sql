-- Site settings (key-value store with JSONB)
CREATE TABLE site_settings (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key         TEXT NOT NULL UNIQUE,
  value       JSONB NOT NULL DEFAULT '{}',
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Seed default settings
INSERT INTO site_settings (key, value) VALUES
  ('general', '{"site_name": "PIECEY", "tagline": "Soluções profissionais para o seu negócio", "logo_url": ""}'),
  ('seo', '{"default_title": "PIECEY", "default_description": "Soluções profissionais para o seu negócio.", "default_og_image": "", "google_verification": ""}'),
  ('social', '{"twitter": "", "linkedin": "", "facebook": "", "instagram": ""}'),
  ('contact', '{"email": "", "phone": "", "address": "", "map_embed_url": ""}');
