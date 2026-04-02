import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { getPageSeoServer } from "@/lib/queries/server/pages";
import { getSettingsServer } from "@/lib/queries/server/settings";
import { SITE_URL } from "@/lib/constants";
import { ContactForm } from "@/components/sections/contact-form";
import { Mail, Phone, MapPin } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSeoServer("contact");
  return {
    title: seo?.title || "Contato",
    description: seo?.description || "Entre em contato conosco.",
    alternates: { canonical: `${SITE_URL}/contact` },
  };
}

export default async function ContactPage() {
  const contactSettings = await getSettingsServer("contact");

  const contactEmail = contactSettings?.email || "contato@piecey.com";
  const contactPhone = contactSettings?.phone || "(11) 99999-9999";
  const contactAddress = contactSettings?.address || "São Paulo, SP - Brasil";

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Contato", item: `${SITE_URL}/contact` },
    ],
  };

  const localBusinessLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "PIECEY",
    email: contactEmail,
    telephone: contactPhone,
    address: {
      "@type": "PostalAddress",
      addressLocality: contactAddress,
    },
  };

  return (
    <>
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={localBusinessLd} />
      <Header />
      <main className="flex-1">
        <section className="bg-navy px-4 py-20 text-white">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-heading text-4xl font-bold">
              Contato
            </h1>
            <p className="mt-4 text-lg text-white/60">
              Fale com a gente. Estamos prontos para ajudar seu negócio a crescer.
            </p>
          </div>
        </section>

        <section className="px-4 py-16">
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2">
            {/* Contact info */}
            <div className="space-y-6">
              <h2 className="font-heading text-2xl font-bold text-navy">
                Informações
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-electric/10 p-3">
                    <Mail className="h-5 w-5 text-electric" />
                  </div>
                  <div>
                    <p className="font-medium text-navy">Email</p>
                    <p className="text-sm text-navy/60">{contactEmail}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-electric/10 p-3">
                    <Phone className="h-5 w-5 text-electric" />
                  </div>
                  <div>
                    <p className="font-medium text-navy">Telefone</p>
                    <p className="text-sm text-navy/60">{contactPhone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-electric/10 p-3">
                    <MapPin className="h-5 w-5 text-electric" />
                  </div>
                  <div>
                    <p className="font-medium text-navy">Endereço</p>
                    <p className="text-sm text-navy/60">{contactAddress}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
