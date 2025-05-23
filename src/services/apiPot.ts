import type { QueryKey } from "@tanstack/react-query";

import {
  deleteTransactions as deleteTransactionsApi,
  updateTransactions as updateTransactionsApi,
} from "./apiTransaction.ts";

import { supabase } from "./supabase.ts";

import type { Pot } from "../features/pot/types/pot.types.ts";

async function getPots({ queryKey }: { queryKey: QueryKey }): Promise<Pot[]> {
  const { data, error } = await supabase
    .from("pots")
    .select("*")
    .eq("user_id", queryKey[1])
    .order("creation_date", { ascending: false })
    .order("creation_time", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  const pots: Pot[] = data.map((item) => ({
    user_id: item.user_id,
    potId: item.pot_id,
    name: item.name,
    targetAmount: item.target_amount,
    theme: item.theme,
    creationDate: item.creation_date,
    creationTime: item.creation_time,
  }));

  return pots;
}

async function createPot(
  pot: Omit<Pot, "potId" | "creationDate" | "creationTime">,
): Promise<Pot> {
  const { data, error } = await supabase
    .from("pots")
    .insert([
      {
        user_id: pot.user_id,
        name: pot.name,
        target_amount: pot.targetAmount,
        theme: pot.theme,
        creation_date: new Date().toISOString().split("T")[0],
        creation_time: new Date().toTimeString().slice(0, 8),
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return {
    user_id: data.user_id,
    potId: data.pot_id,
    name: data.name,
    targetAmount: data.target_amount,
    theme: data.theme,
    creationDate: data.creation_date,
    creationTime: data.creation_time,
  };
}

async function updatePot({
  potId,
  updates,
  transactionIds,
}: {
  potId: string;
  updates: Partial<Pick<Pot, "name" | "targetAmount" | "theme">>;
  transactionIds: string[];
}): Promise<Pot> {
  if (updates.name && transactionIds && transactionIds.length > 0) {
    await updateTransactionsApi(transactionIds, updates.name);
  }

  const { data, error } = await supabase
    .from("pots")
    .update({
      ...("name" in updates && { name: updates.name }),
      ...("targetAmount" in updates && { target_amount: updates.targetAmount }),
      ...("theme" in updates && { theme: updates.theme }),
      ...{ creation_time: "00:00:00" },
    })
    .eq("pot_id", potId)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return {
    user_id: data.user_id,
    potId: data.pot_id,
    name: data.name,
    targetAmount: data.target_amount,
    theme: data.theme,
    creationDate: data.creation_date,
    creationTime: data.creation_time,
  };
}

async function deletePot({
  potId,
  transactionIds,
}: {
  potId: string;
  transactionIds: string[];
}): Promise<void> {
  if (transactionIds && transactionIds.length > 0) {
    await deleteTransactionsApi(transactionIds);
  }

  const { error } = await supabase.from("pots").delete().eq("pot_id", potId);

  if (error) {
    throw new Error(error.message);
  }
}

export { createPot, deletePot, getPots, updatePot };
