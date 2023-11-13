import { configureStore } from '@reduxjs/toolkit';
// import { createWrapper } from 'next-redux-wrapper';
import rootReducer from '../reducers';


// const makeStore = () =>
//   configureStore({
//     reducer: {
//       [authSlice.name]: authSlice.reducer,
//       [cartSlice.name]: cartSlice.reducer,
//       [langSlice.name]: langSlice.reducer,
//       [PLPFilterSlice.name]: PLPFilterSlice.reducer,
//     },
//     devTools: true,
//   });

// export const wrapper = createWrapper(makeStore);

export default configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});
