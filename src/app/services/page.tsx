import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE_URL } from "@/lib/constants";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Megaphone,
  Heart,
  BarChart3,
  ArrowRight,
  Settings,
  Monitor,
  TrendingUp,
} from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Soluções",
    description:
      "Conheça os produtos PIECEY: Agenda inteligente, Marketing para captação, Retenção de pacientes e Insights de negócio.",
    alternates: { canonical: `${SITE_URL}/services` },
  };
}

const products = [
  {
    icon: Calendar,
    name: "PIECEY Agenda",
    focus: "Agendamento inteligente",
    promise: "Sua peça de agendamento que confirma sozinha",
    features: [
      "Confirmação automática via WhatsApp",
      "Redução de no-show em até 70%",
      "Agenda online 24/7 para pacientes",
      "Lembretes personalizados",
    ],
    color: "border-electric/30",
    iconBg: "bg-electric/10 text-electric",
  },
  {
    icon: Megaphone,
    name: "PIECEY Marketing",
    focus: "Captação de pacientes",
    promise: "Sua peça de atração que traz novos clientes",
    features: [
      "Campanhas em conformidade com CFM/CFO/OAB",
      "Presença digital otimizada",
      "Mídia paga com ROI mensurável",
      "Conteúdo estratégico para redes sociais",
    ],
    color: "border-purple/30",
    iconBg: "bg-purple/10 text-purple",
  },
  {
    icon: Heart,
    name: "PIECEY Retenção",
    focus: "Fidelização de carteira",
    promise: "Sua peça de relacionamento que mantém pacientes voltando",
    features: [
      "CRM especializado em saúde",
      "Automação de follow-up pós-consulta",
      "Pesquisas de satisfação automáticas",
      "Campanhas de reativação inteligentes",
    ],
    color: "border-mint/30",
    iconBg: "bg-mint/10 text-mint",
  },
  {
    icon: BarChart3,
    name: "PIECEY Insights",
    focus: "Inteligência de negócio",
    promise: "Sua peça de dados que mostra exatamente como crescer",
    features: [
      "Dashboard com métricas em tempo real",
      "Relatórios de faturamento e crescimento",
      "Análise de desempenho por canal",
      "Previsibilidade financeira",
    ],
    color: "border-electric/30",
    iconBg: "bg-electric/10 text-electric",
  },
];

const methodology = [
  {
    icon: Settings,
    step: "01",
    name: "Setup de Estruturação",
    description:
      "Montamos toda a infraestrutura digital do seu negócio: site, perfis, CRM e automações.",
  },
  {
    icon: Monitor,
    step: "02",
    name: "SaaS de CRM",
    description:
      "Você acessa a plataforma PIECEY para gerenciar agenda, pacientes e comunicação em um só lugar.",
  },
  {
    icon: TrendingUp,
    step: "03",
    name: "Growth com Mídia Paga",
    description:
      "Escalamos sua captação com campanhas otimizadas. Você só paga mais quando fatura mais.",
  },
];

export default async function ServicesPage() {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Soluções", item: `${SITE_URL}/services` },
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
              Nossas Soluções
            </h1>
            <p className="mt-4 text-lg text-white/60">
              Quatro peças que se encaixam perfeitamente no seu negócio.
              Chega de ferramentas fragmentadas.
            </p>
          </div>
        </section>

        {/* Products */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-5xl space-y-8">
            {products.map((product) => (
              <article
                key={product.name}
                className={`rounded-2xl border-2 ${product.color} bg-white p-8 transition-shadow hover:shadow-lg`}
              >
                <div className="flex flex-col gap-6 md:flex-row md:items-start">
                  <div className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl ${product.iconBg}`}>
                    <product.icon className="h-7 w-7" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-navy/40 uppercase tracking-wider">
                      {product.focus}
                    </p>
                    <h2 className="mt-1 font-heading text-2xl font-bold text-navy">
                      {product.name}
                    </h2>
                    <p className="mt-2 text-navy/60">{product.promise}</p>
                    <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                      {product.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm text-navy/70">
                          <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-mint" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Methodology */}
        <section className="bg-gray-light px-4 py-20">
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <h2 className="font-heading text-3xl font-bold text-navy">
                Nossa Metodologia
              </h2>
              <p className="mt-3 text-navy/60">
                Três etapas para transformar o seu negócio.
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {methodology.map((step) => (
                <div key={step.step} className="text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-electric/10">
                    <step.icon className="h-7 w-7 text-electric" />
                  </div>
                  <p className="mt-4 font-heading text-sm font-bold text-purple">
                    Etapa {step.step}
                  </p>
                  <h3 className="mt-1 font-heading text-lg font-semibold text-navy">
                    {step.name}
                  </h3>
                  <p className="mt-2 text-sm text-navy/60">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden bg-gradient-to-r from-electric to-purple px-4 py-20 text-white">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-3xl font-bold">
              Foque no que você faz de melhor
            </h2>
            <p className="mt-4 text-white/80">
              A PIECEY cuida do resto. Agende uma demonstração gratuita.
            </p>
            <Link href="/contact" className="mt-8 inline-block">
              <Button size="lg" className="bg-white text-navy hover:bg-white/90">
                Fale com um especialista
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
