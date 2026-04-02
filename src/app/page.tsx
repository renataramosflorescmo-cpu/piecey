import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { getAllSettingsServer } from "@/lib/queries/server/settings";
import { SITE_URL } from "@/lib/constants";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Calendar,
  Megaphone,
  Heart,
  BarChart3,
  Stethoscope,
  Smile,
  Scale,
  Sparkles,
  CheckCircle2,
  Zap,
  Shield,
  Users,
} from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "PIECEY | Tecnologia e Marketing para Saúde",
    description:
      "Plataforma de Tecnologia e Marketing para profissionais da saúde. Agendamento inteligente, captação de pacientes e crescimento previsível.",
  };
}

const products = [
  {
    icon: Calendar,
    name: "PIECEY Agenda",
    description: "Sua peça de agendamento que confirma sozinha.",
    color: "bg-electric/10 text-electric",
  },
  {
    icon: Megaphone,
    name: "PIECEY Marketing",
    description: "Sua peça de atração que traz novos clientes.",
    color: "bg-purple/10 text-purple",
  },
  {
    icon: Heart,
    name: "PIECEY Retenção",
    description: "Sua peça de relacionamento que mantém pacientes voltando.",
    color: "bg-mint/10 text-mint",
  },
  {
    icon: BarChart3,
    name: "PIECEY Insights",
    description: "Sua peça de dados que mostra exatamente como crescer.",
    color: "bg-electric/10 text-electric",
  },
];

const markets = [
  { icon: Stethoscope, name: "Médicos", description: "Clínicas e consultórios médicos" },
  { icon: Smile, name: "Dentistas", description: "Consultórios odontológicos" },
  { icon: Scale, name: "Advogados", description: "Escritórios de advocacia" },
  { icon: Sparkles, name: "Estética", description: "Clínicas de estética e beleza" },
];

const differentials = [
  {
    icon: Shield,
    title: "Especialização em Saúde e Direito",
    description:
      "Conformidade com CFM, CFO, OAB e LGPD embutida em cada processo. Construído do zero para profissionais regulados.",
  },
  {
    icon: Zap,
    title: "IA + Humano",
    description:
      "Combinamos automação inteligente com consultoria humana. Seu CRM fala sozinho com pacientes, mas você tem um especialista ao lado.",
  },
  {
    icon: BarChart3,
    title: "Modelo de Receita Alinhado",
    description:
      "Você só paga mais quando fatura mais. Nosso sucesso é o seu sucesso.",
  },
  {
    icon: Users,
    title: "Integração Vertical",
    description:
      "Não somos apenas agência nem apenas software. Somos os dois, integrados. Tech + Serviço.",
  },
];

export default async function HomePage() {
  const settings = await getAllSettingsServer();
  const social = settings.social || {};

  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PIECEY",
    url: SITE_URL,
    description: "Plataforma de Tecnologia e Marketing para profissionais da saúde",
    sameAs: [social.twitter, social.linkedin, social.facebook, social.instagram].filter(Boolean),
  };

  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "PIECEY",
    url: SITE_URL,
  };

  return (
    <>
      <JsonLd data={organizationLd} />
      <JsonLd data={websiteLd} />
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-navy px-4 py-24 text-white sm:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-electric/10 via-transparent to-purple/10" />
          <div className="relative mx-auto max-w-7xl text-center">
            <p className="mb-4 inline-block rounded-full bg-mint/10 px-4 py-1.5 text-sm font-medium text-mint">
              Plataforma de Tecnologia e Marketing para Saúde
            </p>
            <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Cada Peça no
              <span className="block text-electric"> Lugar Certo.</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-purple font-medium">
              Porque crescer... é moleza.
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-base text-white/70">
              Foque no que você faz de melhor. A PIECEY cuida do resto.
              Agendamento inteligente, captação de pacientes e crescimento
              previsível para o seu negócio.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" className="bg-electric text-white hover:bg-electric/90">
                  Agende uma demonstração
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Conheça as soluções
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Mercados */}
        <section className="bg-gray-light px-4 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <h2 className="font-heading text-3xl font-bold text-navy">
                Para quem a PIECEY foi feita
              </h2>
              <p className="mt-3 text-navy/60">
                Soluções personalizadas para cada tipo de profissional.
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {markets.map((market) => (
                <div
                  key={market.name}
                  className="group rounded-xl border border-navy/5 bg-white p-6 text-center transition-all hover:border-electric/30 hover:shadow-lg"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-electric/10 transition-colors group-hover:bg-electric/20">
                    <market.icon className="h-7 w-7 text-electric" />
                  </div>
                  <h3 className="mt-4 font-heading text-lg font-semibold text-navy">
                    {market.name}
                  </h3>
                  <p className="mt-1 text-sm text-navy/50">{market.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Produtos */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <h2 className="font-heading text-3xl font-bold text-navy">
                Nossas soluções
              </h2>
              <p className="mt-3 text-navy/60">
                Quatro peças que se encaixam perfeitamente no seu negócio.
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {products.map((product) => (
                <div
                  key={product.name}
                  className="group flex gap-5 rounded-xl border border-navy/10 p-6 transition-all hover:border-electric/30 hover:shadow-lg"
                >
                  <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${product.color}`}>
                    <product.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-navy">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-sm text-navy/60">
                      {product.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Diferenciais */}
        <section className="bg-navy px-4 py-20 text-white">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <h2 className="font-heading text-3xl font-bold">
                Por que a PIECEY é diferente
              </h2>
              <p className="mt-3 text-white/50">
                Não somos apenas agência nem apenas software. Somos os dois, integrados.
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {differentials.map((diff, i) => (
                <div key={diff.title} className="flex gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-purple/20">
                    <diff.icon className="h-5 w-5 text-purple" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-white">
                      {diff.title}
                    </h3>
                    <p className="mt-1 text-sm text-white/60">{diff.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Frases-chave / Social proof */}
        <section className="bg-gray-light px-4 py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-heading text-3xl font-bold text-navy">
              Resultados que falam por si
            </h2>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <CheckCircle2 className="mx-auto h-8 w-8 text-mint" />
                <p className="mt-4 font-heading text-2xl font-bold text-navy">Agenda cheia</p>
                <p className="mt-1 text-sm text-navy/50">Pacientes confirmados automaticamente</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <CheckCircle2 className="mx-auto h-8 w-8 text-mint" />
                <p className="mt-4 font-heading text-2xl font-bold text-navy">Faturamento previsível</p>
                <p className="mt-1 text-sm text-navy/50">Crescimento sustentável e mensurável</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <CheckCircle2 className="mx-auto h-8 w-8 text-mint" />
                <p className="mt-4 font-heading text-2xl font-bold text-navy">Zero complicação</p>
                <p className="mt-1 text-sm text-navy/50">Sem virar gerente de TI</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden bg-gradient-to-r from-electric to-purple px-4 py-20 text-white">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <h2 className="font-heading text-3xl font-bold sm:text-4xl">
                  Pronto para colocar cada peça no lugar certo?
                </h2>
                <p className="mt-4 text-lg text-white/80">
                  Agende uma demonstração gratuita e descubra como a PIECEY pode
                  transformar o seu negócio.
                </p>
                <Link href="/contact" className="mt-8 inline-block">
                  <Button size="lg" className="!bg-[#00C9A7] text-navy hover:!bg-[#00C9A7]/90">
                    Fale com um especialista
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="hidden lg:flex lg:justify-center">
                <Image
                  src="/mockup-app.png"
                  alt="PIECEY App - Plataforma para profissionais da saúde"
                  width={350}
                  height={700}
                  className="drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
