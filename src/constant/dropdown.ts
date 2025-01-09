export interface DropdownInterface {
  value: string;
  label: string;
}

export const countriesOptions: DropdownInterface[] = [
  { value: 'malaysia', label: 'Malaysia' },
  { value: 'saudi_arabia', label: 'Saudi Arabia' },
];

export const inviteStatusOptions: DropdownInterface[] = [
  { value: 'created', label: 'Created' },
  { value: 'sent', label: 'Sent' },
  { value: 'completed', label: 'Completed' },
  { value: 'declined', label: 'Declined' },
];
