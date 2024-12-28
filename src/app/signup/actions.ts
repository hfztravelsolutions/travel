"use server";

import { createClient } from "@/utils/supabase/server";

export async function signup(credentials: { email: string; password: string }) {
  const supabase = await createClient();

  const { email, password } = credentials;
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, data };
}
