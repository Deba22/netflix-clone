import { createSlice } from '@reduxjs/toolkit';

export const subsSlice = createSlice({
  name: 'subscription',
  initialState: {
    subs: "",
  },
  reducers: {
    setCurrentSubscription: (state, action) => {
      state.subs = action.payload;
    },
  },
});

export const { setCurrentSubscription } = subsSlice.actions;

export const selectSubs = (state) => state.subscription.subs;

export default subsSlice.reducer;
