import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    minPrice: 0,
    maxPrice: 100000000,
    subTypes: []
  },
  reducers: {
    updateFilter: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateFilter } = filterSlice.actions;
export const selectFilter = (state:any) => state.filter;

export const { reducer } = filterSlice;
