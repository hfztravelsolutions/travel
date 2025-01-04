import {
  getCurrentUserApi,
  getDestinationApi,
  addSingleDestinationApi,
  editSingleDestinationApi,
  deleteSingleDestinationApi,
  addSingleCalendarApi,
  editSingleCalendarApi,
  deleteSingleCalendarApi,
  getCalendarApi,
  addSingleBookingApi,
  getBookingApi,
  deleteSingleBookingApi,
} from '@/api/global/actions';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import toast from 'react-hot-toast';

const API_NAMES = {
  FETCH_USER_DATA: 'fetchUserData',
  FETCH_DESTINATION: 'fetchDestination',
  FETCH_CALENDAR: 'fetchCalendar',
  FETCH_BOOKING: 'fetchBooking',
  ADD_SINGLE_DESTINATION: 'addSingleDestination',
  EDIT_SINGLE_DESTINATION: 'editSingleDestination',
  DELETE_SINGLE_DESTINATION: 'deleteSingleDestination',
  ADD_SINGLE_CALENDAR: 'addSingleCalendar',
  EDIT_SINGLE_CALENDAR: 'editSingleCalendar',
  DELETE_SINGLE_CALENDAR: 'deleteSingleCalendar',
  ADD_SINGLE_BOOKING: 'addSingleBooking',
  DELETE_SINGLE_BOOKING: 'deleteSingleBooking',
};

const ApiContext = createContext<ApiContext | undefined>(undefined);

export const ApiProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState<Record<string, any> | null>(null);
  const [destinationData, setDestinationData] = useState<
    Record<string, any>[] | null
  >(null);
  const [calendarData, setCalendarData] = useState<
    Record<string, any>[] | null
  >(null);
  const [bookingData, setBookingData] = useState<Record<string, any>[] | null>(
    null
  );

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

  const fetchCalendar = () => {
    fetchData(
      () => getCalendarApi({ userId: userData?.id }),
      setCalendarData,
      API_NAMES.FETCH_CALENDAR
    );
  };

  const fetchBooking = () => {
    fetchData(
      () => getBookingApi({ userId: userData?.id }),
      setBookingData,
      API_NAMES.FETCH_BOOKING
    );
  };

  const addSingleDestination = async (params) => {
    return await fetchData(
      () => addSingleDestinationApi({ ...params, userId: userData?.id }),
      (data) => {
        if (destinationData) {
          setDestinationData([data, ...destinationData]);
        } else {
          setDestinationData([data]);
        }
        toast.success('Success!');
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
            String(destination.id) === String(id)
              ? { ...destination, ...data }
              : destination
          );
          setDestinationData(updatedDestinations);
        }
        toast.success('Updated!');
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
            (destination) => String(destination.id) !== String(id)
          );

          setDestinationData(updatedDestinations);
        }
        toast.success('Deleted!');
      },
      API_NAMES.DELETE_SINGLE_DESTINATION
    );
  };

  const addSingleCalendar = async (params) => {
    return await fetchData(
      () => addSingleCalendarApi({ ...params, userId: userData?.id }),
      (data) => {
        if (calendarData) {
          setCalendarData([data, ...calendarData]);
        } else {
          setCalendarData([data]);
        }
        toast.success('Success!');
      },
      API_NAMES.ADD_SINGLE_CALENDAR
    );
  };

  const editSingleCalendar = async (id: string, params) => {
    return await fetchData(
      () => editSingleCalendarApi({ id, ...params }),
      (data) => {
        if (calendarData) {
          const updatedCalendars = calendarData.map((calendar) =>
            String(calendar.id) === String(id)
              ? { ...calendar, ...data }
              : calendar
          );
          setCalendarData(updatedCalendars);
        }
        toast.success('Updated!');
      },
      API_NAMES.EDIT_SINGLE_CALENDAR
    );
  };

  const deleteSingleCalendar = async (id: string) => {
    return await fetchData(
      () => deleteSingleCalendarApi({ id }),
      (data) => {
        if (calendarData) {
          const updatedCalendars = calendarData.filter(
            (calendar) => String(calendar.id) !== String(id)
          );

          setCalendarData(updatedCalendars);
        }
        toast.success('Deleted!');
      },
      API_NAMES.DELETE_SINGLE_CALENDAR
    );
  };

  const addSingleBooking = async (params) => {
    return await fetchData(
      () => addSingleBookingApi({ ...params, userId: userData?.id }),
      (data) => {
        if (bookingData) {
          setBookingData([data, ...bookingData]);
        } else {
          setBookingData([data]);
        }
        toast.success('Success!');
      },
      API_NAMES.ADD_SINGLE_BOOKING
    );
  };

  const deleteSingleBooking = async (id: string) => {
    return await fetchData(
      () => deleteSingleBookingApi({ id }),
      (data) => {
        if (bookingData) {
          const updatedBookings = bookingData.filter(
            (booking) => String(booking.id) !== String(id)
          );

          setBookingData(updatedBookings);
        }
        toast.success('Deleted!');
      },
      API_NAMES.DELETE_SINGLE_BOOKING
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
        fetchCalendar,
        fetchBooking,
        setCalendarData,
        calendarData,
        addSingleDestination,
        editSingleDestination,
        deleteSingleDestination,
        addSingleCalendar,
        editSingleCalendar,
        deleteSingleCalendar,
        addSingleBooking,
        setBookingData,
        bookingData,
        deleteSingleBooking,
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
