'use client';

import React from 'react';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';

import { toast } from 'react-hot-toast';
import { Calendar } from '@/components/ui/calendar';
import ChartCard from './chartCard';
import UsersTable from './userTable';
import MainCard from './mainCard';
import { logout } from '../login/actions';

const Page: React.FC = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <ChartCard />
      <MainCard title="Tempahan Terkini">
        <UsersTable />
      </MainCard>
    </div>
  );
};

export default Page;
