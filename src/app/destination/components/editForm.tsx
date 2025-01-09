'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { PlusCircle, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { countriesOptions } from '@/constant/dropdown';
import { useApiContext } from '@/context/apiContext';
import { useMyContext } from '@/context/myContext';
import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import toast from 'react-hot-toast';
import imageCompression from 'browser-image-compression';

// Define the schema for validation using Zod
const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Destination name must be at least 2 characters.',
  }),
  country: z.string().nonempty({
    message: 'Please select a country.',
  }),
  description: z.string().max(500, {
    message: 'Description must be at most 500 characters.',
  }),
  price: z.number().min(0, {
    message: 'Price must be a positive number.',
  }),
  isFeatured: z.boolean(),
  day_count: z.number().min(1, {
    message: 'Day count must be at least 1.',
  }),
  night_count: z.number().min(1, {
    message: 'Night count must be at least 1.',
  }),
  features: z
    .array(
      z.object({
        title: z.string().nonempty({ message: "Title can't be empty" }),
        description: z
          .string()
          .nonempty({ message: "Description can't be empty" }),
      })
    )
    .nonempty({ message: 'At least one feature is required.' }),
  image: z.any().refine((file) => file instanceof File, {
    message: 'Please upload an image.',
  }),
});

export function EditForm() {
  const { editSingleDestination, isLoading, setLoading } = useApiContext();
  const { setDestinationModal, destinationModal } = useMyContext();
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Initialize the form with react-hook-form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      country: '',
      description: '',
      price: null,
      isFeatured: false,
      day_count: null, // Default value for day_count
      night_count: null, // Default value for night_count
      features: [{ title: '', description: '' }],
      image: '',
    },
  });

  useEffect(() => {
    if (destinationModal.otherData) {
      const {
        name,
        country,
        description,
        price,
        isFeatured,
        day_count,
        night_count,
        features,
        image_1_url,
      } = destinationModal.otherData;

      // Map existing data to the form
      form.setValue('name', name);
      form.setValue('description', description);
      form.setValue('price', price);
      form.setValue('isFeatured', isFeatured);
      form.setValue('day_count', day_count);
      form.setValue('night_count', night_count);

      if (image_1_url) {
        setPreviewImage(
          `${process.env.NEXT_PUBLIC_SUPABASE_URL}/${process.env.NEXT_PUBLIC_STORAGE_DIRECTORY}/${image_1_url}`
        );
      }

      setTimeout(() => {
        form.setValue('country', country);
        if (features && features.length > 0) {
          form.setValue('features', features);
        }
      }, 500);
    }
  }, []);

  const { control } = form;

  const {
    fields: featuresFields,
    append: appendFeature,
    remove: removeFeature,
  } = useFieldArray({
    control,
    name: 'features',
  });

  const onSubmit = async (data) => {
    let compressedImage = null;

    // Compress the image to 15KB max if available
    if (data.image && data.image instanceof File) {
      try {
        setLoading('editSingleDestination', true);
        const imageFile = data.image;
        const options = {
          maxSizeMB: 0.015, // Max size in MB (15 KB)
          maxWidthOrHeight: 1000, // Max width or height of the image
          useWebWorker: true, // Use a web worker for faster compression
        };
        compressedImage = await imageCompression(imageFile, options);
      } catch (error) {
        console.error('Error compressing image:', error);
        toast.error('Error compressing image');
        setLoading('editSingleDestination', false);
      }
    }

    if (compressedImage) {
      const result = await editSingleDestination(
        destinationModal.otherData.id,
        {
          ...data,
          image: compressedImage,
        }
      );

      if (result) {
        setDestinationModal((prevState) => ({
          ...prevState,
          key: null,
          toggle: !prevState.toggle,
        }));
      }
    } else {
      toast.error('No image to compress');
    }
  };

  const fileInputRef = useRef(null);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Destination Name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Country Selection Field */}
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {countriesOptions.map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      {country.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Please select your country from the list.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Description Field */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Enter a brief description" {...field} />
              </FormControl>
              <FormDescription>
                Provide a brief description (max. 500 characters).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef} // Attach ref
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      field.onChange(file); // Pass the file to react-hook-form
                      setPreviewImage(URL.createObjectURL(file)); // Create preview URL
                    }
                  }}
                />
              </FormControl>
              <FormDescription>
                Upload an image for this destination.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {previewImage && (
          <div className="mt-4 relative w-32 h-32">
            {/* Image Preview */}
            <img
              src={previewImage}
              alt="Preview"
              className="w-full h-full object-cover rounded-md"
            />
            {/* Reset Icon */}
            <button
              type="button"
              onClick={() => {
                setPreviewImage(null); // Reset the preview image
                form.setValue('image', null); // Clear the form value
                if (fileInputRef.current) {
                  fileInputRef.current.value = ''; // Clear file input
                }
              }}
              className="absolute top-1 right-1 bg-white text-red-500 p-1 rounded-full shadow hover:bg-red-100"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}

        <FormItem>
          <FormLabel>Destination Features</FormLabel>
          <Card>
            <CardContent>
              {featuresFields.map((item, index) => (
                <div key={item.id} className="space-y-4 mt-4">
                  <FormField
                    control={form.control}
                    name={`features.${index}.title`}
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex justify-between items-center">
                          <FormLabel className="flex items-center">
                            Title
                          </FormLabel>
                          <Trash2
                            className="mr-1 h-4 w-4 cursor-pointer"
                            onClick={() => removeFeature(index)}
                          />
                        </div>
                        <FormControl>
                          <Input placeholder="Features Title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`features.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          Description
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Features Description"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
              {form.formState.errors.features && (
                <p className="text-red-500 mt-4">
                  {form.formState.errors.features.message}
                </p> // Show error message
              )}
              <Button
                type="button"
                onClick={() => appendFeature({ title: '', description: '' })}
                className="flex items-center mt-4"
              >
                <PlusCircle className="mr-1" />{' '}
                {/* Icon for adding new feature */}
                Add More
              </Button>
            </CardContent>
          </Card>
          <FormDescription>
            Provide a brief description (max. 500 characters).
          </FormDescription>
        </FormItem>

        {/* Price Field */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter price"
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value
                      ? Number(e.target.value)
                      : null;
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormDescription>
                Enter the price (must be a positive number).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Day and Night Count Fields Side by Side */}
        <div className="flex space-x-4">
          {/* Day Count Field */}
          <FormField
            control={form.control}
            name="day_count"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Day Count</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter number of days"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value
                        ? Number(e.target.value)
                        : null;
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Enter the number of days (must be at least 1).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Night Count Field */}
          <FormField
            control={form.control}
            name="night_count"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Night Count</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter number of nights"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value
                        ? Number(e.target.value)
                        : null;
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Enter the number of nights (must be at least 1).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* isFeatured Settings Checkbox */}
        <FormField
          control={form.control}
          name="isFeatured"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Make this destination featured</FormLabel>
                <FormDescription>
                  Featured destinations will have more prominent display
                  compared to non-featured ones.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2">
          <Button type="submit" disabled={isLoading.editSingleDestination}>
            {isLoading.editSingleDestination ? (
              <>
                <Loader2 className="animate-spin mr-2" />
                Submitting...
              </>
            ) : (
              'Submit'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default EditForm;
