import React from 'react';
import { Card } from '@/components/ui/card'; // Adjust import paths as necessary
import { ScrollArea } from '@/components/ui/scroll-area'; // Adjust import paths as necessary
import { MapPin, Star } from 'lucide-react';
import { countriesOptions } from '@/constant/dropdown';

// Define a type for the card data
interface CardData {
  id: number;
  name: string;
  country: string;
  imageUrl: string;
  rating: number; // Assuming rating is out of 5
}

interface ListCardProps {
  data: CardData[];
  isGridView: boolean; // Accepting isGridView as a prop
  isLoading: boolean;
}

const getCountryLabel = (countryValue: string) => {
  const country = countriesOptions.find(
    (option) => option.value === countryValue
  );
  return country ? country.label : countryValue; // Return label or fallback to value if not found
};

const ListPackage: React.FC<ListCardProps> = ({
  data = [],
  isGridView,
  isLoading,
}) => {
  return (
    <div>
      {isLoading ? <h1>Loading...</h1> : null}
      {!isLoading && data.length === 0 && <h1>No packages available.</h1>}
      {!isLoading && data.length > 0 && (
        <ScrollArea className="h-[390px]">
          <div
            className={
              isGridView
                ? 'grid grid-cols-1 md:grid-cols-2 gap-4'
                : 'flex flex-col gap-2'
            }
          >
            {data.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">No cards available.</p>
              </div>
            ) : (
              data.map((item) => (
                <Card key={item.id}>
                  <div
                    className={
                      isGridView
                        ? 'flex flex-col p-3' // Flex column for grid view
                        : 'flex p-3' // Flex row for list view
                    }
                  >
                    {isGridView ? (
                      // Image on top in grid view
                      <div className="relative mb-3">
                        <img
                          src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/${process.env.NEXT_PUBLIC_STORAGE_DIRECTORY}/${item.image_1_url}`}
                          alt={item.name}
                          className="object-cover w-full h-20 rounded-xl"
                        />
                      </div>
                    ) : (
                      // Image on left in list view
                      <div className="relative mr-3">
                        {/* Add margin right for spacing */}
                        <img
                          src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/${process.env.NEXT_PUBLIC_STORAGE_DIRECTORY}/${item.image_1_url}`}
                          alt={item.name}
                          className="object-cover w-20 h-20 rounded-xl" // Adjust size for list view
                        />
                      </div>
                    )}

                    <div
                      className={
                        isGridView
                          ? 'grid gap-3'
                          : 'flex flex-col flex-grow gap-3'
                      }
                    >
                      <div>
                        <p className="text-1xl font-semibold">{item.name}</p>
                        <p className="text-sm text-muted-foreground flex items-center">
                          <MapPin size={16} className="mr-1" />
                          {getCountryLabel(item.country)}
                        </p>
                      </div>
                      <div className="flex">
                        {[...Array(item.rating)].map((_, index) => (
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
              ))
            )}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default ListPackage;
