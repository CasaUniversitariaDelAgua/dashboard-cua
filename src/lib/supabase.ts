import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseKey = import.meta.env.ASTRO_SERVICE_ROLE;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('SUPABASE_URL and ASTRO_SERVICE_ROLE must be set in .env');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
