import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE_URL } from "@/lib/constants";
import { Puzzle, Cpu, TrendingUp, Map, Layers } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Sobre",
    description:
      "Conheça a PIECEY: sua parceira estratégica em tecnologia e marketing para profissionais da saúde.",
    alternates: { canonical: `${SITE_URL}/about` },
  };
}

const meanings = [
  {
    icon: Puzzle,
    name: "Piece of Cake",
    meaning: "Fácil demais, descomplicado",
    application: "UX/UI intuitiva, onboarding simples, zero curva de aprendizado",
  },
  {
    icon: Cpu,
    name: "Peça de Tech",
    meaning: "Componente tecnológico essencial",
    application: "Plataforma integrada e robusta que funciona 24/7",
  },
  {
    icon: TrendingUp,
    name: "Peça de Performance",
    meaning: "Elemento que impulsiona resultados",
    application: "Crescimento de carteira, ROI mensurável, métricas claras",
  },
  {
    icon: Map,
    name: "Peça de Planejamento",
    meaning: "Estratégia estruturada",
    application: "Consultoria + best practices + roadmap de crescimento",
  },
  {
    icon: Layers,
    name: "Peça do Quebra-Cabeça",
    meaning: "Solução completa",
    application: "Tudo integrado em um lugar, sem fragmentação",
  },
];

export default async function AboutPage() {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Sobre", item: `${SITE_URL}/about` },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbLd} />
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-navy px-4 py-20 text-white">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-heading text-4xl font-bold">
              Uma marca que cresce com você
            </h1>
            <p className="mt-4 text-lg text-white/60">
              A PIECEY nasceu para ser a parceira ágil e digital que profissionais
              da saúde precisam — leve, moderna e orientada a resultados.
            </p>
          </div>
        </section>

        {/* O que é PIECEY */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-3xl space-y-8">
            <div>
              <h2 className="font-heading text-2xl font-bold text-navy">
                Quem somos
              </h2>
              <p className="mt-3 leading-relaxed text-navy/70">
                Somos a PIECEY, sua parceira estratégica em tecnologia e marketing
                para profissionais da saúde. Combinamos inovação com expertise para
                elevar sua presença digital, conectar com pacientes e impulsionar
                resultados.
              </p>
              <p className="mt-3 leading-relaxed text-navy/70">
                Nossas soluções personalizadas são projetadas para o crescimento
                sustentável da sua clínica ou consultório. Não usamos jargão de
                marketing, não intimidamos com termos técnicos e sempre colocamos
                o cliente no centro da conversa.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-2xl font-bold text-navy">
                Nosso tom de voz
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-electric/20 bg-electric/5 p-5">
                  <p className="font-heading font-semibold text-electric">Empático</p>
                  <p className="mt-2 text-sm text-navy/60">
                    Entendemos a sua dor. Você está sobrecarregado e nós sabemos disso.
                  </p>
                </div>
                <div className="rounded-xl border border-purple/20 bg-purple/5 p-5">
                  <p className="font-heading font-semibold text-purple">Descomplicado</p>
                  <p className="mt-2 text-sm text-navy/60">
                    Explicamos conceitos complexos de forma simples. Sem jargões.
                  </p>
                </div>
                <div className="rounded-xl border border-mint/20 bg-mint/5 p-5">
                  <p className="font-heading font-semibold text-mint">Focado em resultados</p>
                  <p className="mt-2 text-sm text-navy/60">
                    Não falamos de features, falamos de benefícios para o seu negócio.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Os 5 Significados */}
        <section className="bg-gray-light px-4 py-20">
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <h2 className="font-heading text-3xl font-bold text-navy">
                Os 5 significados de PIECEY
              </h2>
              <p className="mt-3 text-navy/60">
                Cada dimensão da marca representa um pilar da nossa promessa.
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {meanings.map((item) => (
                <div
                  key={item.name}
                  className="rounded-xl border border-navy/5 bg-white p-6 transition-shadow hover:shadow-lg"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple/10">
                    <item.icon className="h-5 w-5 text-purple" />
                  </div>
                  <h3 className="mt-4 font-heading text-lg font-semibold text-navy">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-electric">{item.meaning}</p>
                  <p className="mt-2 text-sm text-navy/50">{item.application}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quote */}
        <section className="bg-navy px-4 py-16 text-center text-white">
          <div className="mx-auto max-w-2xl">
            <blockquote className="font-heading text-2xl font-bold leading-relaxed sm:text-3xl">
              &ldquo;Cada Peça no Lugar Certo.
              <span className="block text-mint">Porque crescer... é moleza.&rdquo;</span>
            </blockquote>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
