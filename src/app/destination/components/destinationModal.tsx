// src/components/GlobalDialog.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useMyContext } from '@/context/myContext';

import { FC } from 'react';

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

  // Define the content structure for each key
  const content = {
    add: {
      header: <DialogTitle>Add New Package</DialogTitle>,
      body: (
        <div>
          {/* Add form or input fields for adding a new package */}
          <p>Please fill in the details to add a new package.</p>
          {/* Example input field */}
          <input type="text" placeholder="Package Name" />
        </div>
      ),
      footer: (
        <div>
          <button onClick={handleOpenChange}>Cancel</button>
          <button
            onClick={() => {
              /* Handle add logic */
            }}
          >
            Add
          </button>
        </div>
      ),
    },
    edit: {
      header: <DialogTitle>Edit Package</DialogTitle>,
      body: (
        <div>
          {/* Add form or input fields for editing an existing package */}
          <p>Edit the details of the package.</p>
          {/* Example input field */}
          <input type="text" placeholder="Package Name" />
        </div>
      ),
      footer: (
        <div>
          <button onClick={handleOpenChange}>Cancel</button>
          <button
            onClick={() => {
              /* Handle edit logic */
            }}
          >
            Save Changes
          </button>
        </div>
      ),
    },
    delete: {
      header: <DialogTitle>Delete Package</DialogTitle>,
      body: (
        <div>
          <p>Are you sure you want to delete this package?</p>
        </div>
      ),
      footer: (
        <div>
          <button onClick={handleOpenChange}>Cancel</button>
          <button
            onClick={() => {
              /* Handle delete logic */
            }}
          >
            Delete
          </button>
        </div>
      ),
    },
  };

  return (
    <Dialog open={destinationModal.toggle} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>{content[destinationModal.key]?.header}</DialogHeader>
        {content[destinationModal.key]?.body}
        {content[destinationModal.key]?.footer}
      </DialogContent>
    </Dialog>
  );
};

export default DestinationModal;
