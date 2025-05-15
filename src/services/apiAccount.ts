import { supabase } from "./supabase.ts";

async function updateProfile({
  updates,
}: {
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

  return data.user.user_metadata;
}

export { updateProfile };
