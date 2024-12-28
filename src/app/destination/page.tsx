'use client';

import React from 'react';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';

import { toast } from 'react-hot-toast';
import { Calendar } from '@/components/ui/calendar';
import PieCard from './pieCard';
import ChartCard from './chartCard';
import ListCard from './listCrad';
import Header from './header';
import { ModeToggle } from './modeToggle';
import UsersTable from './userTable';
import MainCard from './mainCard';
import { logout } from '../login/actions';
import { Button } from '@/components/ui/button';
import {
  Pencil,
  CircleCheck,
  Plus,
  Calendar as CalendarIcon,
  EllipsisVertical,
} from 'lucide-react';
import ListCard2 from './listCrad2';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useMyContext } from '@/context/myContext';
import DestinationModal from './components/destinationModal';

const Page: React.FC = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const { globalDialogToggle, setDestinationModal } = useMyContext();

  const notifications = [
    {
      title: 'Berpengalaman',
      description: 'Bimbingan ibadah lengkap dan informatif.',
    },
    {
      title: 'Pakej Fleksibel',
      description: 'Pilihan pakej premium hingga ekonomi.',
    },
    {
      title: 'Ziarah Tambahan',
      description:
        'Lawatan eksklusif ke lokasi bersejarah seperti Taif dan Badar.',
    },
    {
      title: 'Kursus Percuma',
      description: 'Persediaan ibadah melalui kursus umrah percuma.',
    },
  ];

  const handleButtonClick = () => {
    setDestinationModal((prevState: { toggle: any }) => ({
      key: 'add',
      toggle: !prevState.toggle,
    }));
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <DestinationModal />
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <div className="col-span-4">
          <div className="flex justify-between items-center mb-3">
            <div>
              <p className="text-1xl font-semibold">Pakej Baru</p>
            </div>
            <Button onClick={handleButtonClick}>
              <Plus /> Tambah Pakej Destinasi
            </Button>
          </div>
          <MainCard showHeader={false}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0"
                  alt="Image"
                  className="object-cover w-full h-full rounded-xl"
                />
              </div>
              <div className="grid gap-3">
                <div>
                  <p className="text-2xl font-semibold">Pakej Dataran Masjid</p>
                  <p className="text-sm text-muted-foreground font-semibold">
                    Saudi - Umrah
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Umrah bersama Benraheem: mutawwif berpengalaman, pakej
                    fleksibel, ziarah bersejarah, kursus percuma, dan khidmat
                    pelanggan terbaik. Keberkatan perjalanan, amanah kami!
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Bermula</p>
                  <h1 className="text-1xl font-semibold">
                    RM 9,000{' '}
                    <span className="text-sm text-muted-foreground font-normal">
                      /pax
                    </span>
                  </h1>
                </div>
                <Button className="mt-auto">
                  <Pencil /> Edit Detail
                </Button>
              </div>
              <div className="grid gap-4">
                <div className="rounded-xl bg-muted/50 p-4">
                  {notifications.map((notification, index) => (
                    <div key={index} className="mb-4 grid grid-cols-[25px_1fr]">
                      <CircleCheck size={16} />
                      <div className="grid gap-2">
                        <p className="text-sm font-semibold leading-tight text-gray-800">
                          {notification.title}
                        </p>
                        <p className="text-sm text-muted-foreground leading-snug">
                          {notification.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </MainCard>
        </div>
        <div className="col-span-2">
          <div className="flex justify-between items-center mb-3">
            <div>
              <p className="text-1xl font-semibold">Pakej Popular</p>
            </div>
          </div>
          <ListCard />
        </div>
        <div className="col-span-4">
          <div className="flex justify-between items-center mb-3">
            <div>
              <p className="text-1xl font-semibold">Pakej Pilihan</p>
            </div>
            <EllipsisVertical size={16} />
          </div>
          <MainCard showHeader={false}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0"
                  alt="Image"
                  className="object-cover w-full h-full rounded-xl"
                />
              </div>
              <div className="grid gap-3 col-span-2">
                <div className="grid grid-cols-2">
                  <div>
                    <p className="text-2xl font-semibold">Pakej Turkey</p>
                    <p className="text-sm text-muted-foreground flex items-center">
                      <CalendarIcon size={16} className="mr-1" /> 11 Hari / 10
                      Malam
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <div>
                      <p className="text-sm text-muted-foreground">Bermula</p>
                      <h1 className="text-1xl font-semibold">
                        RM 5,470{' '}
                        <span className="text-sm text-muted-foreground font-normal">
                          /pax
                        </span>
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 rounded-xl bg-muted/50 p-4">
                    {notifications.map((notification, index) => (
                      <div
                        key={index}
                        className="mb-4 grid grid-cols-[25px_1fr]"
                      >
                        <CircleCheck size={16} />
                        <div className="grid gap-2">
                          <p className="text-sm font-semibold leading-tight text-gray-800">
                            {notification.title}
                          </p>
                          <p className="text-sm text-muted-foreground leading-snug">
                            {notification.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </MainCard>
        </div>
        <div className="col-span-2">
          <div className="flex justify-between items-center mb-3">
            <div>
              <p className="text-1xl font-semibold">Pakej Pilihan</p>
            </div>
            <EllipsisVertical size={16} />
          </div>
          <ListCard2 />
        </div>
      </div>
    </div>
  );
};

export default Page;
