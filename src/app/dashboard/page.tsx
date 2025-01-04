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
import { logout } from '../login/actions';
import MainCard from '@/components/mainCard';
import { BookingTable } from '../booking/components/bookingTable';

const Page: React.FC = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <div className="col-span-4">
          <MainCard title="Jumlah Pendapatan" showFooter>
            <ChartCard />
          </MainCard>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <MainCard title="Jumlah Tempahan">
              <ChartCard />
            </MainCard>
            <MainCard title="Jumlah Pelanggan Baru">
              <ChartCard />
            </MainCard>
          </div>
        </div>
        <div className="col-span-2">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border shadow"
          />
          <MainCard title="Tripe Akan Datang">
            <ListCard />
          </MainCard>
        </div>
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min">
        <MainCard title="Destinasi Terbaik">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 md:flex-[0_0_40%]">
              <PieCard />
            </div>
            <div className="flex-1 md:flex-[0_0_60%]"></div>
          </div>
        </MainCard>
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min">
        <MainCard title="Tempahan Terkini">
          <BookingTable />
        </MainCard>
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
        <ModeToggle />
      </div>
    </div>
  );
};

export default Page;
