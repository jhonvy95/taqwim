import { createSlice } from "@reduxjs/toolkit";

interface UiInitialState {
  isDateModalOpen: boolean;
}

const initialState: UiInitialState = {
  isDateModalOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    onOpenDateModal: (state: UiInitialState) => {
      state.isDateModalOpen = true;
    },
    onCloseDateModal: (state: UiInitialState) => {
      state.isDateModalOpen = false;
    },
  },
});

export const { onOpenDateModal, onCloseDateModal } = uiSlice.actions;
export default uiSlice.reducer;
