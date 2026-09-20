import { createClient } from "@supabase/supabase-js";

// Cliente "público": usa a chave anônima, respeita as políticas de RLS
// (só enxerga o que tiver visible = true). Seguro para uso no navegador.
export const supabasePublic = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
