import { supabase } from "./supabase.ts";

import type { Pot } from "../features/pot/types/pot.types.ts";

async function getPots(user_id: string): Promise<Pot[]> {
  const { data, error } = await supabase
    .from("pots")
    .select("*")
    .eq("user_id", user_id);

  if (error) throw error;

  return data.map((item) => ({
    user_id: item.user_id,
    potId: item.pot_id,
    name: item.name,
    targetAmount: item.target_amount,
    currency: item.currency,
    theme: item.theme,
    creationDate: item.creation_date,
  }));
}

export { getPots };
