import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TourappState {
  displayMenu: boolean;
  searchValue: string;
}

const initialState: TourappState = {
  displayMenu: false,
  searchValue: "",
};

export const tourappSlice = createSlice({
  name: "tourapp",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setDisplayMenu: (state, action: PayloadAction<boolean>) => {
      state.displayMenu = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
  },
});

export const { setDisplayMenu, setSearchValue } = tourappSlice.actions;

export default tourappSlice.reducer;
