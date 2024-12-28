// src/components/GlobalDialog.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useMyContext } from '@/context/myContext';
import { FC } from 'react';

interface GlobalDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const GlobalDialog: FC<GlobalDialogProps> = () => {
  const { globalDialogToggle, setGlobalDialogToggle } = useMyContext();

  return (
    <Dialog
      open={globalDialogToggle}
      onOpenChange={() => {
        setGlobalDialogToggle(false);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Global Dialog Title</DialogTitle>
          <DialogDescription>
            This is a global dialog description.
          </DialogDescription>
        </DialogHeader>
        {/* Add your dialog content here */}
      </DialogContent>
    </Dialog>
  );
};

export default GlobalDialog;
