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
  Star,
  TrendingUp,
  PhoneCall,
  Ellipsis,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApiContext } from '@/context/apiContext';
import { GuiderTable } from './components/guiderTable';
import GuiderModal from './components/guiderModal';
import { Badge } from '@/components/ui/badge';

const Page: React.FC = () => {
  const { setGuiderModal, setDestinationModal } = useMyContext();
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
    setGuiderModal((prevState: { toggle: any }) => ({
      ...prevState,
      key: 'add',
      toggle: !prevState.toggle,
    }));
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <GuiderModal />
      {/* <GuiderModal /> */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <MainCard
            title="Guider"
            rightView={
              <>
                <Button onClick={handleButtonClick}>
                  <Plus /> Add Guider
                </Button>
              </>
            }
          >
            <GuiderTable />
          </MainCard>
        </div>
        <div className="md:col-span-1">
          <MainCard showHeader={false}>
            <div className="grid gap-4 pt-4">
              <div className="grid gap-3 pt-4">
                <div className="grid grid-cols-2 items-center">
                  <div className="flex items-center">
                    <img
                      src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0"
                      alt="Profile"
                      className="rounded-full w-16 h-16 mr-4" // Adjusted size for better appearance
                    />
                    <div className="grid gap-3">
                      <div>
                        <p className="text-sm font-semibold">Baihaqi Yusnan</p>
                        <p className="text-sm text-muted-foreground">
                          Mutawwif Umrah
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="icon">
                          <PhoneCall size={16} />
                        </Button>
                        <Button size="icon">
                          <Ellipsis size={16} />
                        </Button>
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
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Perkhidmatan yang sangat memuaskan, mutawwif amat membantu.
                  </p>
                </div>
              </div>
              <div className="rounded-xl bg-muted/50 p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground flex items-center">
                      Pengalaman Bekerja
                    </p>
                    <p className="text-sm font-semibold">10 Tahun</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground flex items-center">
                      Level
                    </p>
                    <p className="text-sm font-semibold">Senior</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground flex items-center">
                      Jenis
                    </p>
                    <p className="text-sm font-semibold">Sepenuh Masa</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground flex items-center">
                      Status
                    </p>
                    <p className="text-sm font-semibold">Aktif</p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl bg-muted/50 p-4">
                <div className="grid gap-4">
                  <p className="text-sm font-semibold">Trip Destinasi</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">meeting</Badge>
                    <Badge variant="destructive">work</Badge>
                    <Badge variant="secondary">important</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4"></div>
                </div>
              </div>
            </div>
          </MainCard>
        </div>
      </div>
    </div>
  );
};

export default Page;
