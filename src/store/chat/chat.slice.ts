// chatSlice.js

import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    currentChat: null,
  },
  reducers: {
    setCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },
  },
});

export const { setCurrentChat } = chatSlice.actions;
export const selectCurrentChat = (state:any) => state.chat.currentChat;

export const { reducer } = chatSlice;
