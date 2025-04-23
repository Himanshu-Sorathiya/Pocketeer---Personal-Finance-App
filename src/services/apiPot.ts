import type { QueryKey } from "@tanstack/react-query";

import { supabase } from "./supabase.ts";

import type { Pot } from "../features/pot/types/pot.types.ts";

async function getPots({ queryKey }: { queryKey: QueryKey }): Promise<Pot[]> {
  const { data, error } = await supabase
    .from("pots")
    .select("*")
    .eq("user_id", queryKey[1]);

  if (error) {
    throw new Error(
      "Oops! Something went wrong while loading your pots. Don’t stress—Pocketeer is here to fix it in no time!",
    );
  }

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
