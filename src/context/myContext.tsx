'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  name: string | null;
  email: string | null;
  avatar: string | null;
}

// Define the shape of your destination modal state
interface DestinationModalState {
  key: string;
  toggle: boolean;
}

// Define the shape of your context data
interface MyContextType {
  stringData: string | null;
  setStringData: (data: string | null) => void;
  numberData: number | null;
  setNumberData: (data: number | null) => void;
  booleanData: boolean;
  setBooleanData: (data: boolean) => void;
  user: User; // Add user object
  setUser: (user: User) => void; // Add setter for user
  globalDialogToggle: boolean;
  setGlobalDialogToggle: (data: boolean) => void;
  destinationModal: DestinationModalState; // Updated type
  setDestinationModal: (data: DestinationModalState) => void; // Updated setter type
}

const MyContext = createContext<MyContextType | undefined>(undefined);

export const MyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [stringData, setStringData] = useState<string | null>(null);
  const [numberData, setNumberData] = useState<number | null>(null);
  const [booleanData, setBooleanData] = useState<boolean>(false);

  const [user, setUser] = useState<User>({
    name: 'Hafiz',
    email: 'clickerhizers@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  });

  const [globalDialogToggle, setGlobalDialogToggle] = useState<boolean>(false);

  const [destinationModal, setDestinationModal] =
    useState<DestinationModalState>({ key: '', toggle: false });

  return (
    <MyContext.Provider
      value={{
        stringData,
        setStringData,
        numberData,
        setNumberData,
        booleanData,
        setBooleanData,
        user,
        setUser,
        globalDialogToggle,
        setGlobalDialogToggle,
        destinationModal,
        setDestinationModal,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (context === undefined) {
    throw new Error('useMyContext must be used within a MyProvider');
  }
  return context;
};
