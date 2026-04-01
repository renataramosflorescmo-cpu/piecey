import { createClient } from "@/lib/supabase/server";

export async function getSettingsServer(key: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", key)
    .single();

  if (error) return null;
  return data?.value as Record<string, string> | null;
}

export async function getAllSettingsServer() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select("key, value");

  if (error) return {};

  const settings: Record<string, Record<string, string>> = {};
  data?.forEach((row) => {
    settings[row.key] = row.value as Record<string, string>;
  });
  return settings;
}
