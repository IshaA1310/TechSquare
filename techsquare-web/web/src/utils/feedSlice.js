import { createSlice } from "@reduxjs/toolkit";

const feedslice = createSlice({
  name : 'feed',
  initialState: null,
  reducers: {
    addFeed: (state, action) => action.payload,
    removeOneFeed: (state, action) => {
      const newArray = state.filter((r) => r._id !== action.payload);
      return newArray;
    },
    removeFeed: (state, action) => null
  }
});

export const {addFeed, removeOneFeed, removeFeed} = feedslice.actions;

export default feedslice.reducer;
