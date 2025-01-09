'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CircleCheckBig, Headset, Star, MapPin } from 'lucide-react'; // Importing icons from Lucide
import Navbar from '@/components/navBar';

const Home: React.FC = () => {
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');

  const destinations = [
    {
      name: 'Santorini, Greece',
      image:
        'https://plus.unsplash.com/premium_photo-1683865776032-07bf70b0add1?',
      duration: '5 Days',
      price: '$600 - $2,000',
    },
    {
      name: 'Swiss Alps, Switzerland',
      image:
        'https://plus.unsplash.com/premium_photo-1683865776032-07bf70b0add1?',
      duration: '5 Days',
      price: '$1,200 - $3,000',
    },
    {
      name: 'Venice, Italy',
      image:
        'https://plus.unsplash.com/premium_photo-1683865776032-07bf70b0add1?',
      duration: '5 Days',
      price: '$800 - $2,500',
    },
    {
      name: 'Santorini, Greece',
      image:
        'https://plus.unsplash.com/premium_photo-1683865776032-07bf70b0add1?',
      duration: '5 Days',
      price: '$600 - $2,000',
    },
    {
      name: 'Swiss Alps, Switzerland',
      image:
        'https://plus.unsplash.com/premium_photo-1683865776032-07bf70b0add1?',
      duration: '5 Days',
      price: '$1,200 - $3,000',
    },
    {
      name: 'Venice, Italy',
      image:
        'https://plus.unsplash.com/premium_photo-1683865776032-07bf70b0add1?',
      duration: '5 Days',
      price: '$800 - $2,500',
    },
    {
      name: 'Swiss Alps, Switzerland',
      image:
        'https://plus.unsplash.com/premium_photo-1683865776032-07bf70b0add1?',
      duration: '5 Days',
      price: '$1,200 - $3,000',
    },
    {
      name: 'Venice, Italy',
      image:
        'https://plus.unsplash.com/premium_photo-1683865776032-07bf70b0add1?',
      duration: '5 Days',
      price: '$800 - $2,500',
    },
  ];

  // Dynamic benefits array
  const benefits = [
    {
      title: 'Expert Guidance',
      description: 'Get advice from seasoned travelers.',
      icon: <CircleCheckBig size={32} color="#4CAF50" />,
    },
    {
      title: '24/7 Customer Support',
      description: "We're here for you anytime.",
      icon: <Headset size={32} color="#2196F3" />,
    },
    {
      title: 'Exclusive Deals',
      description: 'Access special offers just for you.',
      icon: <Star size={32} color="#FF9800" />,
    },
    // {
    //   title: 'Customizable Itineraries',
    //   description: 'Tailor your journey to your needs.',
    //   icon: <MapPin size={32} color="#F44336" />,
    // },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Searching for trips to ${location} on ${date}`);
  };

  return (
    <div className="w-full flex flex-col">
      <Navbar />
      {/* Header Section */}
      <div
        className="relative bg-cover bg-center h-[550px]"
        style={{
          backgroundImage:
            "url('https://plus.unsplash.com/premium_photo-1683865776032-07bf70b0add1?')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-white text-5xl font-bold leading-tight">
            Let&apos;s <span className="text-orange-500 underline">travel</span>{' '}
            the world
          </h1>
          <p className="text-white text-lg mt-4 max-w-2xl">
            Enjoy the breathtaking view of nature. Relax and cherish your dreams
            to the fullest.
          </p>

          {/* Search Form */}
          <Card className="mt-8 w-full max-w-3xl shadow-xl">
            <CardContent className="p-3">
              <form
                onSubmit={handleSearch}
                className="flex flex-col sm:flex-row gap-4 items-center"
              >
                <Input
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="flex-1 py-3 px-4"
                />
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="flex-1 py-3 px-4"
                />
                <Button type="submit">Search</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Popular Destinations Section */}
      <div className="w-full px-4 py-12">
        <CardHeader>
          <CardTitle className="text-4xl font-semibold text-center mb-6">
            Popular Destinations
          </CardTitle>
        </CardHeader>
        <Separator className="my-6 mx-auto w-16" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {destinations.map((destination, index) => (
            <Card
              key={index}
              className="overflow-hidden relative cursor-pointer"
            >
              <img
                src={`${destination.image}`}
                alt={destination.name}
                className="object-cover"
              />

              <CardContent className="p-4">
                <h3 className="text-xl font-semibold">{destination.name}</h3>
                <p className="text-gray-600 mb-2">{destination.duration}</p>
                <p className="text-gray-600">{destination.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <section className="flex flex-col md:flex-row items-start w-full px-4 py-12 bg-gray-50">
        {/* Image Side */}
        <div className="md:w-1/2 mb-6 md:mb-auto">
          {/* You can replace this with a relevant image */}
          <img
            src="https://plus.unsplash.com/premium_photo-1683865776032-07bf70b0add1?"
            alt="Why Choose Us"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Content Side */}
        <div className="md:w-1/2 md:pl-8">
          <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
          <p className="text-gray-700 mb-4">
            We offer personalized travel experiences tailored to your
            preferences. Our dedicated team ensures that every trip is memorable
            and hassle-free.
          </p>

          {/* Benefits List as Vertical Cards */}
          <div className="flex flex-col space-y-4">
            {benefits.map((benefit, index) => (
              <Card key={index} className="flex items-center p-4 shadow-md">
                {benefit.icon}
                <div className="ml-4">
                  <h3 className="font-semibold">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Plan Your Vacation Section */}
      <section className="w-full px-4 py-12 bg-white text-center">
        <h2 className="text-3xl font-bold mb-4">Plan Your Vacation</h2>
        <p className="text-gray-700 mb-6">
          We offer personalized travel experiences tailored to your preferences.
          Our dedicated team ensures that every trip is memorable and
          hassle-free.
        </p>
        {/* World Map Image */}
        <img
          src="https://plus.unsplash.com/premium_photo-1683865776032-07bf70b0add1?"
          alt="World Map"
          className="w-full h-auto rounded-lg"
        />
        {/* Additional content can be added here if needed */}
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 text-gray-800 text-center py-6 mt-auto">
        <div className="flex justify-center gap-4 mb-4">
          <a href="#" className="text-gray-600 hover:text-gray-800">
            Facebook
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800">
            Twitter
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800">
            Instagram
          </a>
        </div>
        <p className="text-sm">
          &copy; 2025 Travel Finder. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
