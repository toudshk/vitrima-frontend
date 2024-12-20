import { createSlice } from '@reduxjs/toolkit';

import { getStoreLocal } from "@/utils/local-storage";
const initialState = {
  isVisible: !getStoreLocal('cookiesAccepted'),
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
export default cookieBannerSlice.reducer;
