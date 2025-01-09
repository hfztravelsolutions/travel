'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { Loader2, PlusCircle, Trash2 } from 'lucide-react';
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
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

// Define the schema for validation using Zod
const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Destination name must be at least 2 characters.',
  }),
});

export function EditForm() {
  const { editSingleGuider, isLoading } = useApiContext();
  const { setGuiderModal, guiderModal } = useMyContext();

  // Initialize the form with react-hook-form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const mapExistingData = () => {
    if (guiderModal.otherData) {
    }
  };

  useEffect(() => {
    if (guiderModal.otherData) {
      const { name } = guiderModal.otherData;
      form.setValue('name', String(name));
    }
  }, [guiderModal.otherData]);

  // Handle form submission
  const onSubmit = async (data) => {
    const result = await editSingleGuider(guiderModal.otherData.id, data);
    if (result) {
      setTimeout(() => {
        setGuiderModal((prevState) => ({
          ...prevState,
          key: null,
          toggle: !prevState.toggle,
          otherData: null,
        }));
      }, 500);
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
              <FormLabel>Guider Name</FormLabel>
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

        {/* Submit Button */}
        <div className="flex justify-end space-x-2">
          <Button type="submit" disabled={isLoading.editSingleGuider}>
            {isLoading.editSingleGuider ? (
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
