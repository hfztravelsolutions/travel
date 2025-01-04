import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useMyContext } from '@/context/myContext';
import { FC } from 'react';
import AddForm from './addForm';
import EditForm from './editForm';
import DeleteForm from './deleteForm';

interface GlobalDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal: FC<GlobalDialogProps> = () => {
  const { bookingModal, setBookingModal } = useMyContext();

  const handleOpenChange = () => {
    setBookingModal((prevState) => ({
      ...prevState,
      toggle: !prevState.toggle,
    }));
  };

  const content = {
    add: {
      header: <DialogTitle>Add New Booking</DialogTitle>,
      body: <AddForm />,
      // footer: <div></div>,
    },
    edit: {
      header: <DialogTitle>Edit Booking</DialogTitle>,
      body: <EditForm />,
    },
    delete: {
      header: <DialogTitle>Delete Booking</DialogTitle>,
      body: <DeleteForm />,
    },
  };

  return (
    <Dialog open={bookingModal.toggle} onOpenChange={handleOpenChange}>
      <DialogContent style={{ maxHeight: '80vh', overflowY: 'auto' }}>
        <DialogHeader>{content[bookingModal.key]?.header}</DialogHeader>
        {content[bookingModal.key]?.body}
        {content[bookingModal.key]?.footer}
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
