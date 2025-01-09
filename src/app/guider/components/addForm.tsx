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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
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
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Check } from 'lucide-react';
import { useEffect, useState } from 'react';

// Define the schema for validation using Zod
const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Destination name must be at least 2 characters.',
  }),
  guiders_ids: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: 'You have to select at least one item.',
    }),
});

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export function AddForm() {
  const {
    addMultipleGuider,
    addSingleGuider,
    isLoading,
    filterAllUser,
    filterAllUserData,
    guiderData,
  } = useApiContext();
  const { setGuiderModal } = useMyContext();
  const [inputValue, setInputValue] = useState('');
  const debouncedInputValue = useDebounce(inputValue, 500);

  // Initialize the form with react-hook-form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      guiders_ids: [],
    },
  });

  // Handle form submission
  const handleInvite = async (data) => {
    const result = await addSingleGuider({
      guiderId: data.user_uuid,
      email: data.email,
    }); // Include selected users in submission
    if (result) {
      setGuiderModal((prevState) => ({
        ...prevState,
        key: null,
        toggle: !prevState.toggle,
      }));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (debouncedInputValue) {
        const result = await filterAllUser({ keyword: debouncedInputValue });
      }
    };

    fetchData();
  }, [debouncedInputValue]);

  return (
    <Form {...form}>
      <form
        // onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Search by username, full name, or email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Find guider"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e); // Update react-hook-form state
                    setInputValue(e.target.value); // Update local state
                  }}
                />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="guiders_ids"
          render={() => (
            <FormItem>
              {filterAllUserData.map((item) => {
                // Check if the email for this item already exists in guiderData
                const emailExists = guiderData.some(
                  (guider) => guider.email === item.email
                );

                return (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="guiders_ids"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex items-center justify-between space-x-3 mb-2" // Use justify-between to space out elements
                        >
                          <div className="flex items-center space-x-3">
                            {/* <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      );
                                }}
                              />
                            </FormControl> */}
                            <FormLabel className="flex items-center text-sm">
                              <img
                                src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0"
                                alt="Profile"
                                className="rounded-full w-8 h-8 mr-3" // Adjusted margin for better spacing
                              />
                              <div>
                                <strong className="block">{item.label}</strong>
                                <span className="text-muted-foreground">
                                  @{item.label}
                                </span>
                              </div>
                            </FormLabel>
                          </div>
                          <Button
                            type="button"
                            onClick={() => handleInvite(item)}
                            disabled={isLoading.addSingleGuider || emailExists}
                          >
                            {isLoading.addSingleGuider ? (
                              <>
                                <Loader2 className="animate-spin mr-2" />
                                Submitting...
                              </>
                            ) : emailExists ? (
                              <>
                                <Check />
                                Invited
                              </>
                            ) : (
                              'Invite'
                            )}
                          </Button>
                        </FormItem>
                      );
                    }}
                  />
                );
              })}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <div className="flex justify-end space-x-2">
          <Button type="submit" disabled={isLoading.addSingleGuider}>
            {isLoading.addSingleGuider ? (
              <>
                <Loader2 className="animate-spin mr-2" />
                Submitting...
              </>
            ) : (
              'Submit'
            )}
          </Button>
        </div> */}
      </form>
    </Form>
  );
}

export default AddForm;
