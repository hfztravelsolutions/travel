'use client';

import React, { useState, useEffect } from 'react';
import {
  formatDate,
  DateSelectArg,
  EventClickArg,
  EventApi,
} from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useApiContext } from '@/context/apiContext';
import CalendarModal from './components/calendarModal';
import { useMyContext } from '@/context/myContext';
import MainCard from '../../components/mainCard';

const Page: React.FC = () => {
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
  const [selectedDate, setSelectedDate] = useState<DateSelectArg | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<null>(null);
  const { userData, fetchUser, fetchCalendar, calendarData } = useApiContext();
  const { setCalendarModal } = useMyContext();

  useEffect(() => {
    if (!userData) {
      fetchUser();
    }
  }, []);

  useEffect(() => {
    if (userData) {
      fetchCalendar();
    }
  }, [userData]);

  useEffect(() => {
    if (Array.isArray(calendarData)) {
      setCurrentEvents(calendarData);
    } else {
      setCurrentEvents([]);
    }
  }, [calendarData]);

  const handleDateClick = (selected: DateSelectArg) => {
    setSelectedDate(selected);
    setCalendarModal((prevState) => ({
      ...prevState,
      key: 'add',
      toggle: !prevState.toggle,
      otherData: selected,
    }));
  };

  const handleEventClick = (selected: EventClickArg) => {
    setSelectedEvent(selected);
    setCalendarModal((prevState) => ({
      ...prevState,
      key: 'edit',
      toggle: !prevState.toggle,
      otherData: {
        name: selected.event?._def?.title,
        id: selected.event?._def?.publicId,
      },
    }));
  };

  const eventList = () => {
    return (
      <div className="w-3/12">
        <div className="py-10 text-2xl font-extrabold px-7">
          Calendar Events
        </div>
        <ul className="space-y-4">
          {currentEvents.length <= 0 && (
            <div className="italic text-center text-gray-400">
              No Events Present
            </div>
          )}

          {currentEvents.length > 0 &&
            currentEvents.map((event: EventApi) => (
              <li
                className="border border-gray-200 shadow px-4 py-2 rounded-md text-blue-800"
                key={event.id}
              >
                {event.title}
                <br />
                <label className="text-slate-950">
                  {formatDate(event.start!, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}{' '}
                  {/* Format event start date */}
                </label>
              </li>
            ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <CalendarModal
        calendarApi={selectedDate?.view.calendar}
        selectedEvent={selectedEvent}
      />
      <MainCard title="Kalendar">
        <div className="pt-4">
          <FullCalendar
            height={'85vh'}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]} // Initialize calendar with required plugins.
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
            }} // Set header toolbar options.
            initialView="dayGridMonth" // Initial view mode of the calendar.
            editable={true} // Allow events to be edited.
            selectable={true} // Allow dates to be selectable.
            selectMirror={true} // Mirror selections visually.
            dayMaxEvents={true} // Limit the number of events displayed per day.
            select={handleDateClick} // Handle date selection to create new events.
            eventClick={handleEventClick} // Handle clicking on events (e.g., to delete them).
            events={currentEvents}
          />
        </div>
      </MainCard>
    </div>
  );
};

export default Page;
