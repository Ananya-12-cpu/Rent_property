import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types";
import { CURRENT_USER } from "@/data/mockData";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  // Pre-populate with mock user for development — remove when backend is ready
  user: CURRENT_USER,
  isAuthenticated: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
    switchRole(state, action: PayloadAction<User>) {
      // Dev helper: switch between mock users
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
});

export const { setUser, logout, switchRole } = authSlice.actions;
export default authSlice.reducer;
