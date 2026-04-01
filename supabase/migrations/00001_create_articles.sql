-- Articles table
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
