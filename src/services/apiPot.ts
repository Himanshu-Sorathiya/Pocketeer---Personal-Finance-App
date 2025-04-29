import type { QueryKey } from "@tanstack/react-query";

import { currency, user_id } from "../constants/user.ts";

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

  const pots: Pot[] = data.map((item) => ({
    user_id: item.user_id,
    potId: item.pot_id,
    name: item.name,
    targetAmount: item.target_amount,
    currency: item.currency,
    theme: item.theme,
    creationDate: item.creation_date,
    creationTime: item.creation_time,
  }));

  return pots;
}

async function addPot(
  pot: Omit<
    Pot,
    "user_id" | "potId" | "currency" | "creationDate" | "creationTime"
  >,
): Promise<Pot> {
  const { data, error } = await supabase
    .from("pots")
    .insert([
      {
        user_id,
        name: pot.name,
        target_amount: pot.targetAmount,
        currency,
        theme: pot.theme,
        creation_date: new Date().toISOString().split("T")[0],
        creation_time: new Date().toTimeString().slice(0, 8),
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error(
      "Oops! Something went wrong while adding your pot. Don’t stress—Pocketeer is here to fix it in no time!",
    );
  }

  return {
    user_id: data.user_id,
    potId: data.pot_id,
    name: data.name,
    targetAmount: data.target_amount,
    currency: data.currency,
    theme: data.theme,
    creationDate: data.creation_date,
    creationTime: data.creation_time,
  };
}

export { addPot, getPots };
