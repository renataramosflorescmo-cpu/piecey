"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getAllSettings, updateSettings } from "@/lib/queries/settings";
import { Save } from "lucide-react";
import { toast } from "sonner";

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [general, setGeneral] = useState({
    site_name: "",
    tagline: "",
    logo_url: "",
  });
  const [seo, setSeo] = useState({
    default_title: "",
    default_description: "",
    default_og_image: "",
    google_verification: "",
  });
  const [social, setSocial] = useState({
    twitter: "",
    linkedin: "",
    facebook: "",
    instagram: "",
  });
  const [contact, setContact] = useState({
    email: "",
    phone: "",
    address: "",
    map_embed_url: "",
  });

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      const data = await getAllSettings();
      if (data.general) setGeneral(data.general as typeof general);
      if (data.seo) setSeo(data.seo as typeof seo);
      if (data.social) setSocial(data.social as typeof social);
      if (data.contact) setContact(data.contact as typeof contact);
    } catch {
      toast.error("Erro ao carregar configurações.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    try {
      await Promise.all([
        updateSettings("general", general),
        updateSettings("seo", seo),
        updateSettings("social", social),
        updateSettings("contact", contact),
      ]);
      toast.success("Configurações salvas!");
    } catch {
      toast.error("Erro ao salvar configurações.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Configurações
        </h1>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="h-4 w-4" />
          {saving ? "Salvando..." : "Salvar"}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* General */}
        <Card>
          <CardHeader>
            <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              Geral
            </h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              id="site-name"
              label="Nome do Site"
              value={general.site_name}
              onChange={(e) =>
                setGeneral((s) => ({ ...s, site_name: e.target.value }))
              }
            />
            <Input
              id="tagline"
              label="Tagline"
              value={general.tagline}
              onChange={(e) =>
                setGeneral((s) => ({ ...s, tagline: e.target.value }))
              }
            />
            <Input
              id="logo-url"
              label="URL do Logo"
              value={general.logo_url}
              onChange={(e) =>
                setGeneral((s) => ({ ...s, logo_url: e.target.value }))
              }
            />
          </CardContent>
        </Card>

        {/* SEO */}
        <Card>
          <CardHeader>
            <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              SEO Padrão
            </h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              id="default-title"
              label="Título Padrão"
              value={seo.default_title}
              onChange={(e) =>
                setSeo((s) => ({ ...s, default_title: e.target.value }))
              }
            />
            <Input
              id="default-description"
              label="Descrição Padrão"
              value={seo.default_description}
              onChange={(e) =>
                setSeo((s) => ({ ...s, default_description: e.target.value }))
              }
            />
            <Input
              id="default-og"
              label="OG Image Padrão"
              value={seo.default_og_image}
              onChange={(e) =>
                setSeo((s) => ({ ...s, default_og_image: e.target.value }))
              }
            />
            <Input
              id="google-verification"
              label="Google Verification"
              value={seo.google_verification}
              onChange={(e) =>
                setSeo((s) => ({ ...s, google_verification: e.target.value }))
              }
            />
          </CardContent>
        </Card>

        {/* Social */}
        <Card>
          <CardHeader>
            <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              Redes Sociais
            </h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              id="twitter"
              label="Twitter/X"
              placeholder="https://x.com/..."
              value={social.twitter}
              onChange={(e) =>
                setSocial((s) => ({ ...s, twitter: e.target.value }))
              }
            />
            <Input
              id="linkedin"
              label="LinkedIn"
              placeholder="https://linkedin.com/company/..."
              value={social.linkedin}
              onChange={(e) =>
                setSocial((s) => ({ ...s, linkedin: e.target.value }))
              }
            />
            <Input
              id="facebook"
              label="Facebook"
              placeholder="https://facebook.com/..."
              value={social.facebook}
              onChange={(e) =>
                setSocial((s) => ({ ...s, facebook: e.target.value }))
              }
            />
            <Input
              id="instagram"
              label="Instagram"
              placeholder="https://instagram.com/..."
              value={social.instagram}
              onChange={(e) =>
                setSocial((s) => ({ ...s, instagram: e.target.value }))
              }
            />
          </CardContent>
        </Card>

        {/* Contact */}
        <Card>
          <CardHeader>
            <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              Contato
            </h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              id="contact-email"
              label="Email"
              value={contact.email}
              onChange={(e) =>
                setContact((s) => ({ ...s, email: e.target.value }))
              }
            />
            <Input
              id="contact-phone"
              label="Telefone"
              value={contact.phone}
              onChange={(e) =>
                setContact((s) => ({ ...s, phone: e.target.value }))
              }
            />
            <Input
              id="contact-address"
              label="Endereço"
              value={contact.address}
              onChange={(e) =>
                setContact((s) => ({ ...s, address: e.target.value }))
              }
            />
            <Input
              id="map-embed"
              label="URL do Mapa (embed)"
              value={contact.map_embed_url}
              onChange={(e) =>
                setContact((s) => ({ ...s, map_embed_url: e.target.value }))
              }
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
