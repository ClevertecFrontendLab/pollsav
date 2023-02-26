/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filterByAscending: true,
  nameBook: '',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    toggleFilter: (state = initialState) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.filterByAscending = !state.filterByAscending;
    },
    setNameBook: (state = initialState, action) => {
      state.nameBook = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleFilter, setNameBook } = filterSlice.actions;

export const filter = filterSlice.reducer;
