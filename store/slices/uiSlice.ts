import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  sidebarOpen: boolean;
  notification: { message: string; type: "success" | "error" | "info" } | null;
}

const initialState: UIState = {
  sidebarOpen: true,
  notification: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen(state, action: PayloadAction<boolean>) {
      state.sidebarOpen = action.payload;
    },
    showNotification(
      state,
      action: PayloadAction<{ message: string; type: "success" | "error" | "info" }>
    ) {
      state.notification = action.payload;
    },
    clearNotification(state) {
      state.notification = null;
    },
  },
});

export const { toggleSidebar, setSidebarOpen, showNotification, clearNotification } =
  uiSlice.actions;
export default uiSlice.reducer;
