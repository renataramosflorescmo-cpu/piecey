import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { getPageSeoServer } from "@/lib/queries/server/pages";
import { SITE_URL } from "@/lib/constants";
import { Zap, Shield, BarChart3, Code, Globe, Headphones } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeoServer("services");
  return {
    title: seo?.title || "Nossos Serviços",
    description: seo?.description || "Descubra como podemos ajudar o seu negócio a crescer.",
    alternates: { canonical: `${SITE_URL}/services` },
  };
}

const services = [
  {
    icon: Code,
    title: "Desenvolvimento de Software",
    description:
      "Criamos soluções sob medida com as tecnologias mais modernas do mercado. Sites, apps e sistemas empresariais.",
  },
  {
    icon: BarChart3,
    title: "Análise de Dados",
    description:
      "Transformamos seus dados em insights acionáveis com dashboards, relatórios e inteligência de negócios.",
  },
  {
    icon: Shield,
    title: "Segurança Digital",
    description:
      "Protegemos sua empresa contra ameaças digitais com auditorias, monitoramento e boas práticas de segurança.",
  },
  {
    icon: Globe,
    title: "Marketing Digital",
    description:
      "Estratégias de SEO, mídia paga e conteúdo para aumentar sua presença online e atrair mais clientes.",
  },
  {
    icon: Zap,
    title: "Automação de Processos",
    description:
      "Automatizamos tarefas repetitivas para que sua equipe foque no que realmente importa.",
  },
  {
    icon: Headphones,
    title: "Consultoria & Suporte",
    description:
      "Acompanhamento contínuo com suporte técnico dedicado e consultoria estratégica personalizada.",
  },
];

export default async function ServicesPage() {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Serviços", item: `${SITE_URL}/services` },
    ],
  };

  const servicesLd = services.map((s) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    description: s.description,
  }));

  return (
    <>
      <JsonLd data={breadcrumbLd} />
      {servicesLd.map((ld, i) => (
        <JsonLd key={i} data={ld} />
      ))}
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-zinc-50 to-white px-4 py-20 dark:from-zinc-950 dark:to-zinc-900">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100">
              Nossos Serviços
            </h1>
            <p className="mt-4 text-lg text-zinc-500">
              Soluções completas para impulsionar o seu negócio.
            </p>
          </div>
        </section>

        <section className="px-4 py-16">
          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.title}
                className="group rounded-xl border border-zinc-200 p-8 transition-all hover:border-blue-200 hover:shadow-lg dark:border-zinc-800 dark:hover:border-blue-900"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 transition-colors group-hover:bg-blue-100 dark:bg-blue-950">
                  <service.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="mt-5 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  {service.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                  {service.description}
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
