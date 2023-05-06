import { calendarApi } from "../api";
import { useAppSelector, useAppDispatch } from "../calendar/hooks/redux";
import { Event } from "../models";
import { useAuthStore } from "./useAuthStore";
import {
  onAddNewEvent,
  onSetActiveEvent,
  onUpdateEvent,
  onDeleteEvent,
  onLoadEvents,
} from "../store/calendar/CalendarSlice";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { convertEventsToDateEvents } from "../helpers";
import Swal from "sweetalert2";

const useCalendarStore = () => {
  const { events, activeEvent } = useAppSelector((state) => state.calendar);
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  const setActiveEvent = (calendarEvent: Event) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent: any) => {
    try {
      if (calendarEvent.id) {
        // Update event
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
        dispatch(onUpdateEvent({ ...calendarEvent, user }));
        return;
      }
      // Create event
      const { data } = await calendarApi.post("/events", calendarEvent);
      dispatch(onAddNewEvent({ ...calendarEvent, id: data.event.id, user }));
    } catch (error: any) {
      Swal.fire("Error to save event", error.response.data.msg, "error");
    }
  };

  const startDeletingEvent = async () => {
    try {
      await calendarApi.delete(`/events/${activeEvent?.id}`);
      dispatch(onDeleteEvent());
    } catch (error: any) {
      console.log(error);
      Swal.fire("Error to delete event", error.response.data.msg, "error");
    }
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get("/events");
      const events = await convertEventsToDateEvents(data.events);
      dispatch(onLoadEvents(events));
    } catch (error) {
      throw new Error("Error loading events");
    }
  };
  return {
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,
    setActiveEvent,
    startDeletingEvent,
    startLoadingEvents,
    startSavingEvent,
  };
};
export default useCalendarStore;
