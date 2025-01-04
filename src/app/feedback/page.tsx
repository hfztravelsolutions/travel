'use client';

import React from 'react';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';

import { toast } from 'react-hot-toast';
import { Calendar } from '@/components/ui/calendar';
import ChartCard from './chartCard';
import MainCard from './mainCard';
import { logout } from '../login/actions';
import {
  Pencil,
  CircleCheck,
  Plus,
  Calendar as CalendarIcon,
  EllipsisVertical,
  Star,
  TrendingUp,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Page: React.FC = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

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

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <div className="flex justify-between items-center mb-3">
            <div>
              <p className="text-1xl font-semibold">Analisa Maklum Balas</p>
            </div>
            <EllipsisVertical size={16} />
          </div>
          <MainCard showHeader={false}>
            <ChartCard />
          </MainCard>
        </div>
        <div className="md:col-span-1">
          <div className="flex justify-between items-center mb-3">
            <div>
              <p className="text-1xl font-semibold">Penilaian</p>
            </div>
            <EllipsisVertical size={16} />
          </div>
          <MainCard showHeader={false}>
            <div className="grid gap-4 pt-4">
              <div className="rounded-xl bg-muted/50 p-4">
                <div className="grid grid-cols-2">
                  <div>
                    <p className="text-1xl font-semibold">Excelent</p>
                    <p className="text-sm text-muted-foreground flex items-center">
                      dari 1,250 makum balas
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <small className="text-sm text-muted-foreground flex">
                      <TrendingUp size={16} className="mr-1" /> 10%
                    </small>
                    <h1 className="text-1xl font-semibold flex item-center">
                      <Star
                        size={16}
                        fill="orange"
                        color="orange"
                        className="mr-2"
                      />
                      4/5
                    </h1>
                  </div>
                </div>
              </div>
              <div className="grid gap-4">
                {notifications.map((notification, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <p className="text-sm text-muted-foreground leading-snug flex-1">
                      {notification.description}
                    </p>
                    <div className="flex ml-4">
                      {[...Array(5)].map((_, starIndex) => (
                        <Star
                          key={starIndex}
                          size={16}
                          fill="orange"
                          color="orange"
                          className="mr-1" // Change color based on rating
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </MainCard>
        </div>
      </div>
      <div className="md:col-span-1">
        <div className="flex justify-between items-center mb-3">
          <div>
            <p className="text-1xl font-semibold">Maklum Balas Pelanggan</p>
          </div>
          <EllipsisVertical size={16} />
        </div>
        <MainCard showHeader={false}>
          <div className="grid gap-3 pt-4">
            <div className="grid grid-cols-2 items-center">
              <div className="flex items-center">
                <img
                  src="/path/to/profile-image.jpg"
                  alt="Profile"
                  className="rounded-full w-10 h-10 mr-4" // Adjust size as needed
                />
                <div>
                  <p className="text-sm font-semibold">Baihaqi Yusnan</p>
                  <p className="text-sm text-muted-foreground">Jun, 23 2024</p>
                </div>
              </div>
            </div>
            <div className="flex">
              {[...Array(5)].map((_, starIndex) => (
                <Star
                  key={starIndex}
                  size={16}
                  fill="orange"
                  color="orange"
                  className="mr-1" // Change color based on rating
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">meeting</Badge>
              <Badge variant="destructive">work</Badge>
              <Badge variant="secondary">important</Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Perkhidmatan yang sangat memuaskan, mutawwif amat membantu.
              </p>
            </div>
          </div>
        </MainCard>
      </div>
    </div>
  );
};

export default Page;
