import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addHours } from "date-fns";
import { Event } from "../../models";

interface CalendarInitialState {
  events: Event[];
  isLoadingEvents: boolean;
  activeEvent: any;
}

const initialState: CalendarInitialState = {
  isLoadingEvents: true,
  events: [],
  activeEvent: null,
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    onSetActiveEvent: (state, { payload }: PayloadAction<Event>) => {
      state.activeEvent = payload;
    },
    onAddNewEvent: (state, { payload }: PayloadAction<Event>) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
    onUpdateEvent: (state, { payload }: PayloadAction<Event>) => {
      state.events = state.events.map((event) => (event.id === payload.id ? payload : event));
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter((event) => event.id !== state.activeEvent.id);
        state.activeEvent = null;
      }
    },
    onLoadEvents: (state, { payload }: PayloadAction<Event[]>) => {
      state.isLoadingEvents = false;
      state.events = payload;
      // payload.forEach((event) => {
      //   const exists = state.events.some((dbEvent) => dbEvent.id === event.id);
      //   if (!exists) state.events.push(event);
      // });
    },
    onLogoutCalendar: (state) => {
      state.isLoadingEvents = true;
      state.events = [];
      state.activeEvent = null;
    },
  },
});

export const {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar,
  onSetActiveEvent,
  onUpdateEvent,
} = calendarSlice.actions;
