import type { Session, User, WeakPassword } from "@supabase/supabase-js";

import { supabase } from "./supabase.ts";

async function signIn({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{
  user: User;
  session: Session;
  weakPassword?: WeakPassword;
}> {
  await signOut();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

async function signUp({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}): Promise<{ user: User | null; session: Session | null }> {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name, account_creation_date: new Date().toISOString() },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  await signOut();

  return data;
}

async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

async function getUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) {
    throw new Error("Not authenticated");
  }

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  const user = {
    id: data?.user?.id,
    role: data?.user?.role,
    email: data?.user?.email,
    last_sign_in_at: data?.user?.last_sign_in_at,
    name: data?.user?.user_metadata?.name,
    account_creation_date: data?.user?.user_metadata?.account_creation_date,
    currency_code: data?.user?.user_metadata?.currency_code,
    currency_symbol: data?.user?.user_metadata?.currency_symbol,
    currency_emoji: data?.user?.user_metadata?.currency_emoji,
  };

  return user;
}

async function sendPasswordResetEmail({
  email,
}: {
  email: string;
}): Promise<void> {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "http://localhost:5173/auth/reset-password",
  });

  if (error) {
    throw new Error(error.message);
  }
}

async function updatePassword({
  password,
}: {
  password: string;
}): Promise<void> {
  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    throw new Error(error.message);
  }
}

export {
  getUser,
  sendPasswordResetEmail,
  signIn,
  signOut,
  signUp,
  updatePassword
};
