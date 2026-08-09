import { createClient } from "@supabase/supabase-js";

function sanitizeEnv(value: string | undefined): string {
  return (value ?? "").trim().replace(/^['"]+|['"]+$/g, "");
}

function resolveSupabaseUrl(rawUrl: string): string {
  if (!rawUrl) {
    return "https://placeholder.supabase.co";
  }

  try {
    const parsed = new URL(rawUrl);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return "https://placeholder.supabase.co";
    }
    return parsed.toString().replace(/\/$/, "");
  } catch {
    return "https://placeholder.supabase.co";
  }
}

const supabaseUrl = resolveSupabaseUrl(
  sanitizeEnv(process.env.NEXT_PUBLIC_SUPABASE_URL)
);
const supabaseAnonKey =
  sanitizeEnv(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) ||
  "placeholder-anon-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
