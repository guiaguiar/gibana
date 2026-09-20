import "server-only";
import { createClient } from "@supabase/supabase-js";

// Cliente "admin": usa a service role key, ignora RLS.
// NUNCA importe este arquivo em código que roda no navegador.
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
