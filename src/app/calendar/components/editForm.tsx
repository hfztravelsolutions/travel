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
import { useEffect } from 'react';

// Define the schema for validation using Zod
const formSchema = z.object({
  title: z.string().min(2, {
    message: 'Plan title must be at least 2 characters.',
  }),
});

export function EditForm({ selectedEvent }) {
  const {
    addSingleCalendar,
    editSingleCalendar,
    deleteSingleCalendar,
    isLoading,
  } = useApiContext();
  const { setCalendarModal, calendarModal } = useMyContext();

  useEffect(() => {
    if (calendarModal.otherData) {
      const { name } = calendarModal.otherData;

      // Map existing data to the form
      form.setValue('title', name);
    }
  }, []);

  // Initialize the form with react-hook-form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  });

  // Handle form submission
  const onSubmit = async (data) => {
    const result = await editSingleCalendar(calendarModal.otherData.id, data);
    if (result) {
      setTimeout(() => {
        setCalendarModal((prevState) => ({
          ...prevState,
          key: null,
          toggle: !prevState.toggle,
          otherData: null,
        }));
      }, 500);
    }
  };

  const onDelete = async () => {
    selectedEvent.event.remove();

    if (calendarModal.otherData.id) {
      const result = await deleteSingleCalendar(calendarModal.otherData.id);
      if (result) {
        setTimeout(() => {
          setCalendarModal((prevState) => ({
            ...prevState,
            key: null,
            toggle: !prevState.toggle,
            otherData: null,
          }));
        }, 500);
      }
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
          <Button
            type="button"
            onClick={onDelete}
            variant="destructive"
            disabled={isLoading.deleteSingleCalendar}
          >
            {isLoading.deleteSingleCalendar ? (
              <>
                <Loader2 className="animate-spin mr-2" />
                Deleting...
              </>
            ) : (
              'Delete'
            )}
          </Button>
          <Button type="submit" disabled={isLoading.editSingleCalendar}>
            {isLoading.editSingleCalendar ? (
              <>
                <Loader2 className="animate-spin mr-2" />
                Updating...
              </>
            ) : (
              'Update'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default EditForm;
