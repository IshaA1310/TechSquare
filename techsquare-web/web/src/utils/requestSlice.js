import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: 'requests',
  initialState: null,
  reducers: {
    addRequest: (state, action) => action.payload,
    removeRequest: (state, action) => {
      const newArray = state.filter((r) => r.fromUserId._id !== action.payload);
      return newArray;
    },
    removeRequests: (state, action) => null
  }
}
);

export const { addRequest, removeRequest, removeRequests } = requestSlice.actions;

export default requestSlice.reducer;
