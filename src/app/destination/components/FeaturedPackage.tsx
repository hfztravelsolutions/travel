import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Pencil,
  CircleCheck,
  Plus,
  Calendar as CalendarIcon,
  EllipsisVertical,
} from 'lucide-react';
import { countriesOptions } from '@/components/constant/dropdown';
import { useMyContext } from '@/context/myContext';

interface data {
  name: string;
  country: string;
  description: string;
  price: number;
}

interface FeaturedPackageProps {
  data: data;
  isHorizontal: boolean;
  isLoading: boolean;
}

const getCountryLabel = (countryValue: string) => {
  const country = countriesOptions.find(
    (option) => option.value === countryValue
  );
  return country ? country.label : countryValue; // Return label or fallback to value if not found
};

const FeaturedPackage: React.FC<FeaturedPackageProps> = ({
  data,
  isHorizontal,
  isLoading,
}) => {
  const { setDestinationModal } = useMyContext();

  const handleButtonClick = () => {
    setDestinationModal((prevState: { toggle: any }) => ({
      ...prevState,
      key: 'edit',
      toggle: !prevState.toggle,
      otherData: data,
    }));
  };

  return (
    <div>
      {isLoading ? <h1>Loading...</h1> : null}
      {!isLoading && !data && <h1>No packages available.</h1>}
      {!isLoading && data && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0"
              alt="Image"
              className="object-cover w-full h-full rounded-xl"
            />
          </div>
          {isHorizontal ? (
            <div className="grid gap-3 col-span-2">
              <div className="grid grid-cols-2">
                <div>
                  <p className="text-2xl font-semibold">{data.name}</p>
                  <p className="text-sm text-muted-foreground flex items-center">
                    <CalendarIcon size={16} className="mr-1" /> 11 Hari / 10
                    Malam
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <div>
                    <p className="text-sm text-muted-foreground">Bermula</p>
                    <h1 className="text-1xl font-semibold">
                      RM {data.price}{' '}
                      <span className="text-sm text-muted-foreground font-normal">
                        /pax
                      </span>
                    </h1>
                  </div>
                </div>
              </div>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 rounded-xl bg-muted/50 p-4">
                  {data.features?.map((featureItem, index) => (
                    <div key={index} className="mb-4 grid grid-cols-[25px_1fr]">
                      <CircleCheck size={16} />
                      <div className="grid gap-2">
                        <p className="text-sm font-semibold leading-tight text-gray-800">
                          {featureItem.title}
                        </p>
                        <p className="text-sm text-muted-foreground leading-snug">
                          {featureItem.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="grid gap-3">
                <div>
                  <p className="text-2xl font-semibold">{data.name}</p>
                  <p className="text-sm text-muted-foreground font-semibold">
                    {getCountryLabel(data?.country)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {data.description}
                  </p>
                </div>
                <div className="mt-auto">
                  <p className="text-sm text-muted-foreground">Bermula</p>
                  <h1 className="text-1xl font-semibold">
                    RM {data.price}{' '}
                    <span className="text-sm text-muted-foreground font-normal">
                      /pax
                    </span>
                  </h1>
                </div>
                <Button className="mt-auto" onClick={handleButtonClick}>
                  <Pencil /> Edit Detail
                </Button>
              </div>
              <div className="grid gap-4">
                <div className="rounded-xl bg-muted/50 p-4">
                  {data.features?.map((featureItem, index) => (
                    <div key={index} className="mb-4 grid grid-cols-[25px_1fr]">
                      <CircleCheck size={16} />
                      <div className="grid gap-2">
                        <p className="text-sm font-semibold leading-tight text-gray-800">
                          {featureItem.title}
                        </p>
                        <p className="text-sm text-muted-foreground leading-snug">
                          {featureItem.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default FeaturedPackage;
