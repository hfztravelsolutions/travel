"use server";

import { createClient } from "@/utils/supabase/server";

export async function login(credentials: { email: string; password: string }) {
  const supabase = await createClient();

  const { email, password } = credentials; // Destructure email and password
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, data };
}

export async function logout() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, data: null };
}
