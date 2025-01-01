'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
import { countriesOptions } from '@/components/constant/dropdown';
import { useApiContext } from '@/context/apiContext';
import { useMyContext } from '@/context/myContext';

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
  price: z
    .number()
    .min(0, {
      message: 'Price must be a positive number.',
    })
    .nullable(),
  isFeatured: z.boolean(),
  day_count: z
    .number()
    .min(1, {
      message: 'Day count must be at least 1.',
    })
    .nullable(),
  night_count: z
    .number()
    .min(1, {
      message: 'Night count must be at least 1.',
    })
    .nullable(),
});

export function AddForm() {
  const { addSingleDestination } = useApiContext();
  const { setDestinationModal } = useMyContext();

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
    },
  });

  // Handle form submission
  const onSubmit = async (data) => {
    const result = await addSingleDestination(data);
    if (result) {
      setDestinationModal((prevState) => ({
        ...prevState,
        key: null,
        toggle: !prevState.toggle,
      }));
    }
  };

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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}

export default AddForm;
