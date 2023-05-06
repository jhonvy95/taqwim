import { configureStore } from "@reduxjs/toolkit";
import { calendarSlice, uiSlice, authSlice } from "./";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    ui: uiSlice,
    calendar: calendarSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
