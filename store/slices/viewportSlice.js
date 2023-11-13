import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isMobile: false,
};

const viewportSlice = createSlice({
  name: "viewport",
  initialState,
  reducers: {
    setMobile(state, action) {
      state.isMobile = action.payload;
    },
  },
});

export const { setMobile } = viewportSlice.actions;
export default viewportSlice.reducer;
