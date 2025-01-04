'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { PlusCircle, Trash2 } from 'lucide-react';
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
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

// Define the schema for validation using Zod
const formSchema = z.object({
  destination_id: z.string().nonempty({
    message: 'Please select a destination.',
  }),
});

export function AddForm() {
  const { addSingleBooking, destinationData, isLoading } = useApiContext();
  const { setBookingModal } = useMyContext();
  const [formattedData, setFormattedData] = useState([]);

  // Initialize the form with react-hook-form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destination_id: '',
    },
  });

  // Handle form submission
  const onSubmit = async (data) => {
    const result = await addSingleBooking(data);
    if (result) {
      setBookingModal((prevState) => ({
        ...prevState,
        key: null,
        toggle: !prevState.toggle,
      }));
    }
  };

  useEffect(() => {
    if (destinationData.length > 0) {
      const newStructure = destinationData.map((item) => ({
        value: String(item.id),
        label: item.name,
      }));

      setFormattedData(newStructure);
    }
  }, [destinationData]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Country Selection Field */}
        <FormField
          control={form.control}
          name="destination_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Destination</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {formattedData.map((destination) => (
                    <SelectItem
                      key={destination.value}
                      value={destination.value}
                    >
                      {destination.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Please select your destination from the list.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2">
          <Button type="submit" disabled={isLoading.addSingleBooking}>
            {isLoading.addSingleBooking ? (
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

export default AddForm;
