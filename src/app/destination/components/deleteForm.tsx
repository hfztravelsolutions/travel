'use client';

import { Button } from '@/components/ui/button';
import { useApiContext } from '@/context/apiContext';
import { useMyContext } from '@/context/myContext';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export function DeleteForm() {
  const { deleteSingleDestination, isLoading } = useApiContext();
  const { setDestinationModal, destinationModal } = useMyContext();

  // Handle form submission
  const onSubmit = async () => {
    if (destinationModal.otherData.id) {
      const result = await deleteSingleDestination(
        destinationModal.otherData.id
      );
      if (result) {
        setDestinationModal((prevState) => ({
          ...prevState,
          key: null,
          toggle: !prevState.toggle,
        }));
      }
    }
  };

  const onCancel = async () => {
    setDestinationModal((prevState) => ({
      ...prevState,
      key: null,
      toggle: !prevState.toggle,
    }));
  };

  return (
    <div className="grid gap-3">
      <div>
        <h2 className="text-1xl">
          Are you sure you want to delete this destination?
        </h2>
        <p className="text-sm text-muted-foreground leading-snug">
          <strong>Title:</strong> {destinationModal.otherData.name}
        </p>
      </div>
      <div className="bg-dark">
        <p className="text-sm text-red-600 mb-6">
          <strong>Warning:</strong> This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-2">
          <Button onClick={onCancel} variant="outline">
            Cancel
          </Button>
          <Button
            onClick={onSubmit}
            variant="destructive"
            disabled={isLoading.deleteSingleDestination}
          >
            {isLoading.deleteSingleDestination ? (
              <>
                <Loader2 className="animate-spin mr-2" />
                Deleting...
              </>
            ) : (
              'Delete'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DeleteForm;
