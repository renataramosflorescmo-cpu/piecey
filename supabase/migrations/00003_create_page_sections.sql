-- Page sections for dynamic content
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
