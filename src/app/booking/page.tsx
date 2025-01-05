'use client';

import React, { useEffect } from 'react';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';

import { toast } from 'react-hot-toast';
import { Calendar } from '@/components/ui/calendar';
import BookingChart from './components/bookingChart';

import MainCard from '../../components/mainCard';
import { logout } from '../login/actions';
import { useMyContext } from '@/context/myContext';
import {
  Pencil,
  CircleCheck,
  Plus,
  Calendar as CalendarIcon,
  EllipsisVertical,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import BookingModal from './components/bookingModal';
import { useApiContext } from '@/context/apiContext';
import { BookingTable } from './components/bookingTable';

const Page: React.FC = () => {
  const { setBookingModal, setDestinationModal } = useMyContext();
  const { userData, fetchUser, fetchDestination } = useApiContext();

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (userData) {
      fetchDestination();
    }
  }, [userData]);

  const handleButtonClick = () => {
    setBookingModal((prevState: { toggle: any }) => ({
      ...prevState,
      key: 'add',
      toggle: !prevState.toggle,
    }));
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <BookingModal />
      <BookingChart />
      <MainCard
        title="Tempahan Terkini"
        rightView={
          <>
            <Button onClick={handleButtonClick}>
              <Plus /> Tambah Tempahan
            </Button>
          </>
        }
      >
        <BookingTable />
      </MainCard>
    </div>
  );
};

export default Page;
