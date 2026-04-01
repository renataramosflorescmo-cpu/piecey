import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { getPageSeoServer } from "@/lib/queries/server/pages";
import { getAllSettingsServer } from "@/lib/queries/server/settings";
import { SITE_URL } from "@/lib/constants";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeoServer("about");
  return {
    title: seo?.title || "Sobre Nós",
    description: seo?.description || "Conheça nossa história, missão e equipe.",
    alternates: { canonical: `${SITE_URL}/about` },
  };
}

export default async function AboutPage() {
  const settings = await getAllSettingsServer();
  const general = settings.general || {};

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Sobre Nós", item: `${SITE_URL}/about` },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbLd} />
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-zinc-50 to-white px-4 py-20 dark:from-zinc-950 dark:to-zinc-900">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100">
              Sobre Nós
            </h1>
            <p className="mt-4 text-lg text-zinc-500">
              Conheça nossa história e os valores que nos movem.
            </p>
          </div>
        </section>

        <section className="px-4 py-16">
          <div className="mx-auto max-w-3xl space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                Nossa Missão
              </h2>
              <p className="mt-3 leading-relaxed text-zinc-600 dark:text-zinc-400">
                Oferecer soluções inovadoras e de alta qualidade que transformem
                a maneira como nossos clientes fazem negócios. Acreditamos que a
                tecnologia deve ser acessível, eficiente e gerar resultados
                mensuráveis.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                Nossa História
              </h2>
              <p className="mt-3 leading-relaxed text-zinc-600 dark:text-zinc-400">
                Fundada com a visão de democratizar o acesso à tecnologia de
                ponta, a {general.site_name || "nossa empresa"} cresceu de uma
                pequena equipe para uma referência no mercado. Cada projeto é uma
                oportunidade de superar expectativas.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                Nossos Valores
              </h2>
              <ul className="mt-3 space-y-2 text-zinc-600 dark:text-zinc-400">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-blue-600" />
                  <span>Inovação contínua e busca por excelência</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-blue-600" />
                  <span>Transparência e ética em todas as relações</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-blue-600" />
                  <span>Compromisso com o sucesso do cliente</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-blue-600" />
                  <span>Colaboração e desenvolvimento de pessoas</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
