'use server';

import { createClient } from '@/utils/supabase/server';

export async function getCurrentUserApi() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, data };
}

export async function getDestinationApi(params: { userId: string }) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('destination')
    .select('*')
    .eq('user_uuid', params.userId)
    .order('created_at', { ascending: false });

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, data };
}

export async function addSingleDestinationApi(params: {
  userId: string;
  country: string;
  description: string;
  isFeatured: boolean;
  price: number;
  name: string;
  night_count: number;
  day_count: number;
}) {
  const supabase = await createClient();

  const {
    userId,
    country,
    description,
    isFeatured,
    price,
    name,
    night_count,
    day_count,
  } = params;

  const { data, error } = await supabase
    .from('destination')
    .insert({
      country,
      description,
      isFeatured,
      price,
      name,
      night_count,
      day_count,
      user_uuid: userId,
    })
    .select()
    .single();

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, data };
}

export async function editSingleDestinationApi(params: {
  id: string;
  country?: string;
  description?: string;
  isFeatured?: boolean;
  price?: number;
  name?: string;
  night_count?: number;
  day_count?: number;
  features?: { title: string; description?: string }[];
}) {
  const supabase = await createClient();

  const {
    id,
    country,
    description,
    isFeatured,
    price,
    name,
    night_count,
    day_count,
    features,
  } = params;

  const { data, error } = await supabase
    .from('destination')
    .update({
      country,
      description,
      isFeatured,
      price,
      name,
      night_count,
      day_count,
      features,
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, data };
}

export async function deleteSingleDestinationApi(params: { id: string }) {
  const supabase = await createClient();

  const { id } = params;

  const { data, error } = await supabase
    .from('destination')
    .delete()
    .eq('id', id);

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, data };
}
