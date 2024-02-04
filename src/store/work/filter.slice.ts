import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    minPrice: 0,
    maxPrice: 1000000,
    subTypes: [],
    contractorType: null,
    buildingTechnique: [],
    workingArea: null,
    
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
