import { createClient } from "@/lib/supabase/client";
import type { Json } from "@/types/database";

export async function getSettings(key: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", key)
    .single();

  if (error) throw error;
  return data?.value as Record<string, string>;
}

export async function getAllSettings() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select("key, value");

  if (error) throw error;

  const settings: Record<string, Record<string, string>> = {};
  data?.forEach((row) => {
    settings[row.key] = row.value as Record<string, string>;
  });
  return settings;
}

export async function updateSettings(key: string, value: Json) {
  const supabase = createClient();
  const { error } = await supabase
    .from("site_settings")
    .update({ value })
    .eq("key", key);

  if (error) throw error;
}
