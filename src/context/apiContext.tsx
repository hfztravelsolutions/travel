import {
  getCurrentUserApi,
  getDestinationApi,
  addSingleDestinationApi,
  editSingleDestinationApi,
  deleteSingleDestinationApi,
} from '@/api/global/actions';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import toast from 'react-hot-toast';

const API_NAMES = {
  FETCH_USER_DATA: 'fetchUserData',
  FETCH_DESTINATION: 'fetchDestination',
  ADD_SINGLE_DESTINATION: 'addSingleDestination',
  EDIT_SINGLE_DESTINATION: 'editSingleDestination',
  DELETE_SINGLE_DESTINATION: 'deleteSingleDestination',
};

const ApiContext = createContext<ApiContext | undefined>(undefined);

export const ApiProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState<Record<string, any> | null>(null);
  const [destinationData, setDestinationData] = useState<
    Record<string, any>[] | null
  >(null);
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});

  const setLoading = (apiName: string, loading: boolean) => {
    setIsLoading((prev) => ({ ...prev, [apiName]: loading }));
  };

  const fetchData = async (
    apiCall: () => Promise<{ success: boolean; message?: string; data?: any }>,
    successCallback: (data: any) => void,
    apiName: string
  ): Promise<any> => {
    setLoading(apiName, true);

    try {
      const result = await apiCall();
      if (!result.success) {
        throw new Error(result.message || 'Failed to fetch data');
      }
      successCallback(result.data);
      return result.data;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unknown error occurred';
      toast.error(`Error ${apiName}: ${errorMessage}`);
      throw error;
    } finally {
      setLoading(apiName, false);
    }
  };

  const fetchUser = () => {
    fetchData(
      getCurrentUserApi,
      (data) => setUserData(data.user),
      API_NAMES.FETCH_USER_DATA
    );
  };

  const fetchDestination = () => {
    fetchData(
      () => getDestinationApi({ userId: userData?.id }),
      setDestinationData,
      API_NAMES.FETCH_DESTINATION
    );
  };

  const addSingleDestination = async (params) => {
    return await fetchData(
      () => addSingleDestinationApi({ ...params, userId: userData?.id }),
      (data) => {
        if (destinationData) {
          setDestinationData([data, ...destinationData]);
          toast.success('Success!');
        } else {
          setDestinationData([data]);
        }
      },
      API_NAMES.ADD_SINGLE_DESTINATION
    );
  };

  const editSingleDestination = async (id: string, params) => {
    return await fetchData(
      () => editSingleDestinationApi({ id, ...params }),
      (data) => {
        if (destinationData) {
          const updatedDestinations = destinationData.map((destination) =>
            destination.id === id ? { ...destination, ...data } : destination
          );
          setDestinationData(updatedDestinations);
          toast.success('Updated!');
        }
      },
      API_NAMES.EDIT_SINGLE_DESTINATION
    );
  };

  const deleteSingleDestination = async (id: string) => {
    return await fetchData(
      () => deleteSingleDestinationApi({ id }),
      (data) => {
        if (destinationData) {
          const updatedDestinations = destinationData.filter(
            (destination) => destination.id !== id
          );
          setDestinationData(updatedDestinations);
          toast.success('Deleted!');
        }
      },
      API_NAMES.DELETE_SINGLE_DESTINATION
    );
  };

  return (
    <ApiContext.Provider
      value={{
        userData,
        setUserData,
        destinationData,
        setDestinationData,
        isLoading,
        setLoading,
        fetchUser,
        fetchDestination,
        addSingleDestination,
        editSingleDestination,
        deleteSingleDestination, // Provide the new method in context
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export const useApiContext = () => {
  const context = useContext(ApiContext);
  if (!context)
    throw new Error('useApiContext must be used within an ApiProvider');
  return context;
};
