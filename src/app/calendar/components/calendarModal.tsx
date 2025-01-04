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

const CalendarModal: FC<GlobalDialogProps> = ({
  calendarApi,
  selectedEvent,
}) => {
  const { calendarModal, setCalendarModal } = useMyContext();

  const handleOpenChange = () => {
    setCalendarModal((prevState) => ({
      ...prevState,
      toggle: !prevState.toggle,
      otherData: null,
    }));
  };

  const content = {
    add: {
      header: <DialogTitle>Add Event</DialogTitle>,
      body: <AddForm calendarApi={calendarApi} />,
      // footer: <div></div>,
    },
    edit: {
      header: <DialogTitle>Edit Event</DialogTitle>,
      body: <EditForm selectedEvent={selectedEvent} />,
    },
    delete: {
      header: <DialogTitle>Delete Event</DialogTitle>,
      body: <DeleteForm selectedEvent={selectedEvent} />,
    },
  };

  return (
    <Dialog open={calendarModal.toggle} onOpenChange={handleOpenChange}>
      <DialogContent style={{ maxHeight: '80vh', overflowY: 'auto' }}>
        <DialogHeader>{content[calendarModal.key]?.header}</DialogHeader>
        {content[calendarModal.key]?.body}
        {content[calendarModal.key]?.footer}
      </DialogContent>
    </Dialog>
  );
};

export default CalendarModal;
