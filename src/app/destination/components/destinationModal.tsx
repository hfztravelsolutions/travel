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

const DestinationModal: FC<GlobalDialogProps> = () => {
  const { destinationModal, setDestinationModal } = useMyContext();

  const handleOpenChange = () => {
    setDestinationModal((prevState) => ({
      ...prevState,
      toggle: !prevState.toggle,
    }));
  };

  const content = {
    add: {
      header: <DialogTitle>Add New Package</DialogTitle>,
      body: <AddForm />,
      // footer: <div></div>,
    },
    edit: {
      header: <DialogTitle>Edit Package</DialogTitle>,
      body: <EditForm />,
    },
    delete: {
      header: <DialogTitle>Delete Package</DialogTitle>,
      body: <DeleteForm />,
    },
  };

  return (
    <Dialog open={destinationModal.toggle} onOpenChange={handleOpenChange}>
      <DialogContent style={{ maxHeight: '80vh', overflowY: 'auto' }}>
        <DialogHeader>{content[destinationModal.key]?.header}</DialogHeader>
        {content[destinationModal.key]?.body}
        {content[destinationModal.key]?.footer}
      </DialogContent>
    </Dialog>
  );
};

export default DestinationModal;
