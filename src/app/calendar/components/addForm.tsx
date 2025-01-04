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
import { useApiContext } from '@/context/apiContext';
import { useMyContext } from '@/context/myContext';
import { Loader2 } from 'lucide-react';

// Define the schema for validation using Zod
const formSchema = z.object({
  title: z.string().min(2, {
    message: 'Plan title must be at least 2 characters.',
  }),
});

export function AddForm({ calendarApi }) {
  const { addSingleCalendar, isLoading } = useApiContext();
  const { setCalendarModal, calendarModal } = useMyContext();

  // Initialize the form with react-hook-form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  });

  // Handle form submission
  const onSubmit = async (data) => {
    const { start, end, allDay } = calendarModal.otherData;

    const eventData = {
      title: data.title,
      start,
      end,
      allDay,
    };

    const result = await addSingleCalendar(eventData);

    if (result) {
      setCalendarModal((prevState) => ({
        ...prevState,
        key: null,
        toggle: !prevState.toggle,
        otherData: null,
      }));

      calendarApi.unselect();
      calendarApi.addEvent(result);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Title</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>This is your event title.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2">
          <Button type="submit" disabled={isLoading.addSingleCalendar}>
            {isLoading.addSingleCalendar ? (
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
