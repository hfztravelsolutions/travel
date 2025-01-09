'use server';

import { sanitizeFileName } from '@/utils/helper/image';
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
  image: File | null;
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
    image,
  } = params;

  let imageUrl = null;

  // Handle image upload if provided
  if (image) {
    const sanitizedFileName = sanitizeFileName(image.name);
    const filePath = `${userId}/destination/${Date.now()}_${sanitizedFileName}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('images') // Replace with your bucket name
      .upload(filePath, image);

    if (uploadError) {
      return { success: false, message: uploadError.message };
    }

    if (uploadData?.path) {
      imageUrl = filePath;
    }
  }

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
      image_1_url: imageUrl,
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
  userId: string;
  id: string;
  country?: string;
  description?: string;
  isFeatured?: boolean;
  price?: number;
  name?: string;
  night_count?: number;
  day_count?: number;
  features?: { title: string; description?: string }[];
  image: File | null;
}) {
  const supabase = await createClient();

  const {
    userId,
    id,
    country,
    description,
    isFeatured,
    price,
    name,
    night_count,
    day_count,
    features,
    image,
  } = params;

  let imageUrl = null;

  const { data: currentData, error: fetchError } = await supabase
    .from('destination')
    .select('image_1_url')
    .eq('id', id)
    .single();

  if (fetchError) {
    return { success: false, message: fetchError.message };
  }

  if (image) {
    if (currentData?.image_1_url) {
      const { error: deleteError } = await supabase.storage
        .from('images')
        .remove([currentData.image_1_url]);

      if (deleteError) {
        return { success: false, message: deleteError.message };
      }
    }

    const sanitizedFileName = sanitizeFileName(image.name);
    const filePath = `${userId}/destination/${Date.now()}_${sanitizedFileName}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, image);

    if (uploadError) {
      return { success: false, message: uploadError.message };
    }

    if (uploadData?.path) {
      imageUrl = filePath;
    }
  } else {
    imageUrl = currentData?.image_1_url || null;
  }

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
      image_1_url: imageUrl, // Update image URL
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

  // Step 1: Fetch the current destination data to get the image URL
  const { data: currentData, error: fetchError } = await supabase
    .from('destination')
    .select('image_1_url')
    .eq('id', id)
    .single();

  if (fetchError) {
    return { success: false, message: fetchError.message };
  }

  // Step 2: Delete the image if it exists in the storage
  if (currentData?.image_1_url) {
    const { error: deleteError } = await supabase.storage
      .from('images') // Replace with your bucket name
      .remove([currentData.image_1_url]);

    if (deleteError) {
      return { success: false, message: deleteError.message };
    }
  }

  // Step 3: Delete the destination record from the database
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
    .select('*, profile (*), destination (*)')
    .eq('user_uuid', params.userId)
    .order('created_at', { ascending: false });

  if (error) {
    return { success: false, message: error.message };
  }

  const transformedData = data.map((item) => ({
    id: item.id,
    email: item.profile?.email || '',
    created_at: item.created_at,
    destination_id: item.destination_id,
    username: item.profile?.username || '',
    destination_name: item.destination?.name || '',
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
    .select('*, profile (*), destination (*)')
    .single();

  if (error) {
    return { success: false, message: error.message };
  }

  const transformedData = {
    id: data.id,
    email: data.profile?.email || '',
    created_at: data.created_at,
    destination_id: data.destination_id,
    username: data.profile?.username || '',
    destination_name: data.destination?.name || '',
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

export async function editSingleBookingApi(params: {
  id: string;
  country?: string;
  name?: string;
}) {
  const supabase = await createClient();

  const { id, destination_id } = params;

  const { data, error } = await supabase
    .from('booking')
    .update({
      destination_id,
    })
    .eq('id', id)
    .select('*, profile (*), destination (*)')
    .single();

  if (error) {
    return { success: false, message: error.message };
  }

  const transformedData = {
    id: data.id,
    email: data.profile?.email || '',
    created_at: data.created_at,
    destination_id: data.destination_id,
    username: data.profile?.username || '',
    destination_name: data.destination?.name || '',
  };

  return { success: true, data: transformedData };
}

export async function getGuiderApi(params: { userId: string }) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('guider_invitation')
    .select('*, profile:user_uuid (*)')
    .eq('user_uuid', params.userId)
    .order('created_at', { ascending: false });

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, data };
}

export async function addSingleGuiderApi(params: {
  userId: string;
  guiderId?: string; // Make guiderId optional
  email: string;
}) {
  const supabase = await createClient();

  const { userId, guiderId, email } = params;

  if (!guiderId) {
    const { data, error } = await supabase
      .from('guider_invitation')
      .upsert({
        user_uuid: userId,
        email,
      })
      .select('*, profile:user_uuid (*)')
      .single();

    if (error) {
      return { success: false, message: error.message };
    }

    return { success: true, data };
  }

  const { data: existingData, error: fetchError } = await supabase
    .from('guider_invitation')
    .select('*')
    .eq('guider_uuid', guiderId)
    .eq('user_uuid', userId);

  if (fetchError) {
    return { success: false, message: fetchError.message };
  }

  if (existingData.length > 0) {
    return { success: false, message: 'This guider has already been invited.' };
  }

  const { data, error } = await supabase
    .from('guider_invitation')
    .upsert({
      guider_uuid: guiderId,
      user_uuid: userId,
      email,
    })
    .select('*, profile:user_uuid (*)')
    .single();

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, data };
}

export async function addMultipleGuiderApi(params: {
  userId: string;
  guiders_ids: string[];
}) {
  const supabase = await createClient();

  const { userId, guiders_ids } = params;

  const upsertData = guiders_ids.map((guider_uuid) => ({
    user_uuid: userId,
    guider_uuid,
    status: 'started',
  }));

  const { data, error } = await supabase
    .from('guider_invitation')
    .upsert(upsertData)
    .select('*, profile (*)')
    .single();

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, data };
}

export async function deleteSingleGuiderApi(params: { id: string }) {
  const supabase = await createClient();

  const { id } = params;

  const { data, error } = await supabase
    .from('guider_invitation')
    .delete()
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, data };
}

export async function editSingleGuiderApi(params: {
  id: string;
  country?: string;
  name?: string;
}) {
  const supabase = await createClient();

  const { id, name } = params;

  const { data, error } = await supabase
    .from('guider_invitation')
    .update({
      name,
    })
    .eq('id', id)
    .select('*, profile (*)')
    .single();

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, data };
}

export async function filterAllUserApi(params: { keyword: string }) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('profile')
    .select('*')
    .textSearch('username', params.keyword, {
      type: 'websearch',
      config: 'english',
    })
    .order('created_at', { ascending: false });

  if (error) {
    return { success: false, message: error.message };
  }

  const transformedData = data.map((item) => ({
    id: String(item.id),
    label: item.username || '',
    ...item,
  }));

  return { success: true, data: transformedData };
}
