export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Sobre", href: "/about" },
  { label: "Serviços", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Contato", href: "/contact" },
] as const;

export const ADMIN_NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: "LayoutDashboard" },
  { label: "Artigos", href: "/admin/articles", icon: "FileText" },
  { label: "Páginas", href: "/admin/pages", icon: "Layout" },
  { label: "Mídia", href: "/admin/media", icon: "Image" },
  { label: "Categorias", href: "/admin/categories", icon: "Tags" },
  { label: "Configurações", href: "/admin/settings", icon: "Settings" },
] as const;

export const DEFAULT_SEO = {
  title: "PIECEY",
  description: "Soluções profissionais para o seu negócio.",
  ogImage: "/og-default.jpg",
};
