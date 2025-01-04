'use client';

import React, { useEffect } from 'react';
import MainCard from '../../components/mainCard';
import { Button } from '@/components/ui/button';
import {
  Pencil,
  CircleCheck,
  Plus,
  Calendar as CalendarIcon,
  EllipsisVertical,
} from 'lucide-react';
import DestinationModal from './components/destinationModal';
import FeaturedPackage from './components/FeaturedPackage';
import ListPackage from './components/listPackage';
import { useApiContext } from '@/context/apiContext';
import { useMyContext } from '@/context/myContext';

const Page: React.FC = () => {
  const { userData, isLoading, destinationData, fetchUser, fetchDestination } =
    useApiContext();
  const { setDestinationModal } = useMyContext();

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (userData) {
      fetchDestination();
    }
  }, [userData]);

  const handleButtonClick = () => {
    setDestinationModal((prevState: { toggle: any }) => ({
      ...prevState,
      key: 'add',
      toggle: !prevState.toggle,
    }));
  };

  const featuredDestination = destinationData?.find(
    (destination) => destination.isFeatured
  );
  const otherDestinations = destinationData?.filter(
    (destination) => !destination.isFeatured
  );

  const selectedDestination = featuredDestination || otherDestinations?.[0];

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <DestinationModal />
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <div className="col-span-4">
          <div className="flex justify-between items-end mb-3">
            <div>
              <p className="text-1xl font-semibold">Pakej Baru</p>
            </div>
            <Button onClick={handleButtonClick}>
              <Plus /> Tambah Pakej Destinasi
            </Button>
          </div>
          <MainCard showHeader={false}>
            <FeaturedPackage
              data={selectedDestination}
              isHorizontal={false}
              isLoading={isLoading?.fetchDestination}
            />
          </MainCard>
        </div>
        <div className="col-span-2 mt-0 md:mt-4">
          <div className="flex justify-between items-center mb-3">
            <div>
              <p className="text-1xl font-semibold">Pakej Popular</p>
            </div>
          </div>
          <ListPackage
            data={otherDestinations}
            isGridView={false}
            isLoading={isLoading?.fetchDestination}
          />
        </div>
        <div className="col-span-4">
          <div className="flex justify-between items-center mb-3">
            <div>
              <p className="text-1xl font-semibold">Pakej Pilihan</p>
            </div>
            <EllipsisVertical size={16} />
          </div>
          <MainCard showHeader={false}>
            <FeaturedPackage
              data={selectedDestination}
              isHorizontal={true}
              isLoading={isLoading?.fetchDestination}
            />
          </MainCard>
        </div>
        <div className="col-span-2">
          <div className="flex justify-between items-center mb-3">
            <div>
              <p className="text-1xl font-semibold">Pakej Pilihan</p>
            </div>
            <EllipsisVertical size={16} />
          </div>
          <ListPackage
            data={otherDestinations}
            isGridView={true}
            isLoading={isLoading?.fetchDestination}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
