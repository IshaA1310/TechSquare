import { createSlice } from "@reduxjs/toolkit";

const feedslice = createSlice({
  name : 'feed',
  initialState: null,
  reducers: {
    addFeed: (state, action) => action.payload,
    removeFeed: (state, action) => null
  }
});

export const {addFeed, removeFeed} = feedslice.actions;

export default feedslice.reducer;
