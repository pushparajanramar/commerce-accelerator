'use client';
import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

// const initialState = {
//   locale: 'en',
// };

// const localeSlice = createSlice({
//   name: 'locale',
//   initialState,
//   reducers: {
//     setLocale(state, action) {
//       state.locale = action.payload;
//     },
//   },
// });

// export const { setLocale } = localeSlice.actions;

// export default localeSlice.reducer;




const initialState = {
  lang: 'en'
};

export const langSlice = createSlice({
  name: 'lang',
  initialState,
  reducers: {
    setLocale(state, action) {
      state.lang = action.payload;
    },

    extraReducers: {
      [HYDRATE]: (state, action) => {
        return {
          ...state,
          ...action.payload.lang,
        };
      },
    },
  },
});

export const { setLocale } = langSlice.actions;
export const selectLocale = (state) => state.lang.lang;

export default langSlice.reducer;
