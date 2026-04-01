import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { getPageSeoServer } from "@/lib/queries/server/pages";
import { getAllSettingsServer } from "@/lib/queries/server/settings";
import { SITE_URL } from "@/lib/constants";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, BarChart3 } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeoServer("home");
  return {
    title: seo?.title || "Página Inicial",
    description: seo?.description || "Soluções profissionais para o seu negócio.",
    openGraph: {
      images: seo?.og_image ? [seo.og_image] : [],
    },
  };
}

const services = [
  {
    icon: Zap,
    title: "Soluções Ágeis",
    description:
      "Implementamos soluções rápidas e eficientes para acelerar o crescimento do seu negócio.",
  },
  {
    icon: Shield,
    title: "Segurança",
    description:
      "Protegemos seus dados com as melhores práticas de segurança do mercado.",
  },
  {
    icon: BarChart3,
    title: "Análise de Dados",
    description:
      "Transformamos dados em insights estratégicos para a sua tomada de decisão.",
  },
];

export default async function HomePage() {
  const settings = await getAllSettingsServer();
  const general = settings.general || {};
  const social = settings.social || {};

  const siteName = general.site_name || "PIECEY";
  const tagline = general.tagline || "Soluções profissionais para o seu negócio";

  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: SITE_URL,
    logo: general.logo_url || undefined,
    sameAs: [social.twitter, social.linkedin, social.facebook, social.instagram].filter(Boolean),
  };

  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: SITE_URL,
  };

  return (
    <>
      <JsonLd data={organizationLd} />
      <JsonLd data={websiteLd} />
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 px-4 py-24 text-white sm:py-32">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {tagline.split(" ").length > 4 ? (
                <>
                  {tagline.split(" ").slice(0, Math.ceil(tagline.split(" ").length / 2)).join(" ")}
                  <span className="block text-blue-200">
                    {tagline.split(" ").slice(Math.ceil(tagline.split(" ").length / 2)).join(" ")}
                  </span>
                </>
              ) : (
                tagline
              )}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-blue-100">
              Transformamos desafios em oportunidades com tecnologia,
              estratégia e inovação. Sua empresa merece o melhor.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
                  Fale Conosco
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  Nossos Serviços
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Services preview */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                O que fazemos
              </h2>
              <p className="mt-3 text-zinc-500">
                Soluções sob medida para cada necessidade.
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="rounded-xl border border-zinc-200 p-8 text-center transition-shadow hover:shadow-lg dark:border-zinc-800"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950">
                    <service.icon className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-500">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-zinc-900 px-4 py-20 text-white dark:bg-zinc-800">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold">Pronto para começar?</h2>
            <p className="mt-4 text-zinc-300">
              Entre em contato e descubra como podemos ajudar sua empresa
              a alcançar novos patamares.
            </p>
            <Link href="/contact" className="mt-8 inline-block">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Entre em Contato
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
