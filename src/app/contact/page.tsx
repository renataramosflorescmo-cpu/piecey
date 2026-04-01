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
        <section className="bg-gradient-to-br from-zinc-50 to-white px-4 py-20 dark:from-zinc-950 dark:to-zinc-900">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100">
              Contato
            </h1>
            <p className="mt-4 text-lg text-zinc-500">
              Entre em contato conosco. Estamos prontos para ajudar.
            </p>
          </div>
        </section>

        <section className="px-4 py-16">
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2">
            {/* Contact info */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                Informações
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-950">
                    <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium text-zinc-900 dark:text-zinc-100">
                      Email
                    </p>
                    <p className="text-sm text-zinc-500">{contactEmail}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-950">
                    <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium text-zinc-900 dark:text-zinc-100">
                      Telefone
                    </p>
                    <p className="text-sm text-zinc-500">{contactPhone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-950">
                    <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium text-zinc-900 dark:text-zinc-100">
                      Endereço
                    </p>
                    <p className="text-sm text-zinc-500">{contactAddress}</p>
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
