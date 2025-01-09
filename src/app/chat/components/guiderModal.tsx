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

const GuiderModal: FC<GlobalDialogProps> = () => {
  const { guiderModal, setGuiderModal } = useMyContext();

  const handleOpenChange = () => {
    setGuiderModal((prevState) => ({
      ...prevState,
      toggle: !prevState.toggle,
    }));
  };

  const content = {
    add: {
      header: <DialogTitle>Add Guider</DialogTitle>,
      body: <AddForm />,
      // footer: <div></div>,
    },
    edit: {
      header: <DialogTitle>Edit Guider</DialogTitle>,
      body: <EditForm />,
    },
    delete: {
      header: <DialogTitle>Delete Guider</DialogTitle>,
      body: <DeleteForm />,
    },
  };

  return (
    <Dialog open={guiderModal.toggle} onOpenChange={handleOpenChange}>
      <DialogContent style={{ maxHeight: '80vh', overflowY: 'auto' }}>
        <DialogHeader>{content[guiderModal.key]?.header}</DialogHeader>
        {content[guiderModal.key]?.body}
        {content[guiderModal.key]?.footer}
      </DialogContent>
    </Dialog>
  );
};

export default GuiderModal;
