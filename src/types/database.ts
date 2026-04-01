export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      articles: {
        Row: {
          id: string;
          title: string;
          slug: string;
          content: Json;
          content_html: string;
          excerpt: string | null;
          featured_image: string | null;
          author_id: string | null;
          author_name: string;
          status: "draft" | "published" | "archived";
          published_at: string | null;
          seo_title: string | null;
          seo_description: string | null;
          seo_keywords: string[] | null;
          og_image: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          content?: Json;
          content_html?: string;
          excerpt?: string | null;
          featured_image?: string | null;
          author_id?: string | null;
          author_name?: string;
          status?: "draft" | "published" | "archived";
          published_at?: string | null;
          seo_title?: string | null;
          seo_description?: string | null;
          seo_keywords?: string[] | null;
          og_image?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          content?: Json;
          content_html?: string;
          excerpt?: string | null;
          featured_image?: string | null;
          author_id?: string | null;
          author_name?: string;
          status?: "draft" | "published" | "archived";
          published_at?: string | null;
          seo_title?: string | null;
          seo_description?: string | null;
          seo_keywords?: string[] | null;
          og_image?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
        };
        Relationships: [];
      };
      article_categories: {
        Row: {
          article_id: string;
          category_id: string;
        };
        Insert: {
          article_id: string;
          category_id: string;
        };
        Update: {
          article_id?: string;
          category_id?: string;
        };
        Relationships: [];
      };
      page_sections: {
        Row: {
          id: string;
          page_key: string;
          section_key: string;
          sort_order: number;
          content: Json;
          is_visible: boolean;
          updated_at: string;
        };
        Insert: {
          id?: string;
          page_key: string;
          section_key: string;
          sort_order?: number;
          content?: Json;
          is_visible?: boolean;
          updated_at?: string;
        };
        Update: {
          id?: string;
          page_key?: string;
          section_key?: string;
          sort_order?: number;
          content?: Json;
          is_visible?: boolean;
          updated_at?: string;
        };
        Relationships: [];
      };
      site_settings: {
        Row: {
          id: string;
          key: string;
          value: Json;
          updated_at: string;
        };
        Insert: {
          id?: string;
          key: string;
          value?: Json;
          updated_at?: string;
        };
        Update: {
          id?: string;
          key?: string;
          value?: Json;
          updated_at?: string;
        };
        Relationships: [];
      };
      media: {
        Row: {
          id: string;
          filename: string;
          storage_path: string;
          url: string;
          mime_type: string;
          size_bytes: number;
          width: number | null;
          height: number | null;
          alt_text: string | null;
          uploaded_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          filename: string;
          storage_path: string;
          url: string;
          mime_type: string;
          size_bytes: number;
          width?: number | null;
          height?: number | null;
          alt_text?: string | null;
          uploaded_by?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          filename?: string;
          storage_path?: string;
          url?: string;
          mime_type?: string;
          size_bytes?: number;
          width?: number | null;
          height?: number | null;
          alt_text?: string | null;
          uploaded_by?: string | null;
        };
        Relationships: [];
      };
      page_seo: {
        Row: {
          id: string;
          page_key: string;
          title: string | null;
          description: string | null;
          og_image: string | null;
          keywords: string[] | null;
          json_ld_extra: Json | null;
          updated_at: string;
        };
        Insert: {
          id?: string;
          page_key: string;
          title?: string | null;
          description?: string | null;
          og_image?: string | null;
          keywords?: string[] | null;
          json_ld_extra?: Json | null;
          updated_at?: string;
        };
        Update: {
          id?: string;
          page_key?: string;
          title?: string | null;
          description?: string | null;
          og_image?: string | null;
          keywords?: string[] | null;
          json_ld_extra?: Json | null;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
}
