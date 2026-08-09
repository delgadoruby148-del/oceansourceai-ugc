import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const rawKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Ensure valid URL fallback so Next.js build never crashes during prerender
const supabaseUrl = rawUrl.startsWith('http')
  ? rawUrl.trim()
  : 'https://xpbsnswyvlwyjchbeloc.supabase.co';

const supabaseAnonKey = rawKey.trim() || 'sb_publishable_hi7gSrpulgEPooPpAjMTCg_IJDOZZZm';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
