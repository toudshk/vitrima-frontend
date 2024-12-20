import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isVisible: !localStorage.getItem('cookiesAccepted'),
};

const cookieBannerSlice = createSlice({
  name: 'cookieBanner',
  initialState,
  reducers: {
    acceptCookies(state) {
      state.isVisible = false;
      if (typeof window !== 'undefined') {
        localStorage.setItem('cookiesAccepted', 'true');
      }
    },
  },
});

export const { acceptCookies } = cookieBannerSlice.actions;

export const { reducer } = cookieBannerSlice;
