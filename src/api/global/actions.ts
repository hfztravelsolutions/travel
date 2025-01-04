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

export async function getCalendarApi(params: { userId: string }) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('calendar')
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
  features: { title: string; description?: string }[];
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
    features,
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
      features,
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
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, data };
}

export async function addSingleCalendarApi(params: {
  userId: string;
  title: string;
  start: string;
  end: string;
  allDay: boolean;
}) {
  const supabase = await createClient();

  const { userId, title, start, end, allDay } = params;

  const { data, error } = await supabase
    .from('calendar')
    .insert({
      title,
      start,
      end,
      allDay,
      user_uuid: userId,
    })
    .select()
    .single();

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, data };
}

export async function editSingleCalendarApi(params: {
  id: string;
  title?: string;
}) {
  const supabase = await createClient();

  const { id, title } = params;

  const { data, error } = await supabase
    .from('calendar')
    .update({
      title,
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, data };
}

export async function deleteSingleCalendarApi(params: { id: string }) {
  const supabase = await createClient();

  const { id } = params;

  const { data, error } = await supabase
    .from('calendar')
    .delete()
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, data };
}

export async function getBookingApi(params: { userId: string }) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('booking')
    .select('*, profile (*)')
    .eq('user_uuid', params.userId)
    .order('created_at', { ascending: false });

  if (error) {
    return { success: false, message: error.message };
  }

  const transformedData = data.map((item) => ({
    id: item.id,
    email: item.profile?.email || '',
  }));

  return { success: true, data: transformedData };
}

export async function addSingleBookingApi(params: {
  userId: string;
  destination_id: string;
}) {
  const supabase = await createClient();

  const { userId, destination_id } = params;

  const { data, error } = await supabase
    .from('booking')
    .insert({
      destination_id,
      user_uuid: userId,
    })
    .select('*, profile(*)')
    .single();

  console.log('data', data);
  if (error) {
    return { success: false, message: error.message };
  }

  const transformedData = {
    id: data.id,
    email: data.profile?.email || '',
  };

  return { success: true, data: transformedData };
}

export async function deleteSingleBookingApi(params: { id: string }) {
  const supabase = await createClient();

  const { id } = params;

  const { data, error } = await supabase
    .from('booking')
    .delete()
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, data };
}
