import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PropertyFilters } from "@/types";

interface PropertyState {
  filters: PropertyFilters;
  viewMode: "grid" | "list";
  selectedPropertyId: string | null;
}

const initialState: PropertyState = {
  filters: { type: "all", status: "all" },
  viewMode: "grid",
  selectedPropertyId: null,
};

const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<Partial<PropertyFilters>>) {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters(state) {
      state.filters = { type: "all", status: "all" };
    },
    setViewMode(state, action: PayloadAction<"grid" | "list">) {
      state.viewMode = action.payload;
    },
    setSelectedProperty(state, action: PayloadAction<string | null>) {
      state.selectedPropertyId = action.payload;
    },
  },
});

export const { setFilters, resetFilters, setViewMode, setSelectedProperty } =
  propertySlice.actions;
export default propertySlice.reducer;
