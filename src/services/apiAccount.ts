import { supabase } from "./supabase.ts";

async function updateProfile({
  user_id,
  conversionFactor,
  updates,
}: {
  user_id: string;
  conversionFactor: number;
  updates: {
    currency_code: string;
    currency_symbol: string;
    currency_emoji: string;
  };
}): Promise<any> {
  const { data, error } = await supabase.auth.updateUser({
    data: {
      ...("currency_code" in updates && {
        currency_code: updates.currency_code,
      }),
      ...("currency_symbol" in updates && {
        currency_symbol: updates.currency_symbol,
      }),
      ...("currency_emoji" in updates && {
        currency_emoji: updates.currency_emoji,
      }),
    },
  });

  if (error) {
    throw new Error(
      "Oops! Something went wrong while updating your profile. We'll get it fixed soon!",
    );
  }

  const { error: rpcError } = await supabase.rpc("update_currency", {
    user_id,
    factor: conversionFactor,
  });

  if (rpcError) {
    throw new Error(
      "Oh no! We hit a hiccup while syncing your data with our servers. Looks like the amounts didn’t update or convert properly. Hang tight—Pocketeer is on it!",
    );
  }

  return data.user.user_metadata;
}

export { updateProfile };
