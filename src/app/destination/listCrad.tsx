// app/dashboard/ListCard.tsx
import React from 'react';
import { Card } from '@/components/ui/card'; // Adjust import paths as necessary
import { ScrollArea } from '@/components/ui/scroll-area'; // Adjust import paths as necessary
import { Badge } from '@/components/ui/badge'; // Adjust import paths as necessary
import { MapPin, Star } from 'lucide-react';

const ListCard = () => (
  <ScrollArea className="h-[500px]">
    <div className="flex flex-col gap-2 pt-0">
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0"
              alt="Image"
              className="object-cover w-full h-20 rounded-xl"
            />
          </div>
          <div className="grid gap-3">
            <div>
              <p className="text-1xl font-semibold">Pakej Dataran Masjid</p>
              <p className="text-sm text-muted-foreground flex items-center">
                <MapPin size={16} className="mr-1" />
                Saudi - Umrah
              </p>
            </div>
            <div className="flex">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  size={16}
                  fill="orange"
                  color="orange"
                  className="mr-1" // Change color based on rating
                />
              ))}
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0"
              alt="Image"
              className="object-cover w-full h-20 rounded-xl"
            />
          </div>
          <div className="grid gap-3">
            <div>
              <p className="text-1xl font-semibold">Pakej Dataran Masjid</p>
              <p className="text-sm text-muted-foreground flex items-center">
                <MapPin size={16} className="mr-1" />
                Saudi - Umrah
              </p>
            </div>
            <div className="flex">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  size={16}
                  fill="orange"
                  color="orange"
                  className="mr-1" // Change color based on rating
                />
              ))}
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0"
              alt="Image"
              className="object-cover w-full h-20 rounded-xl"
            />
          </div>
          <div className="grid gap-3">
            <div>
              <p className="text-1xl font-semibold">Pakej Dataran Masjid</p>
              <p className="text-sm text-muted-foreground flex items-center">
                <MapPin size={16} className="mr-1" />
                Saudi - Umrah
              </p>
            </div>
            <div className="flex">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  size={16}
                  fill="orange"
                  color="orange"
                  className="mr-1" // Change color based on rating
                />
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  </ScrollArea>
);

export default ListCard;
