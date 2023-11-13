import { combineReducers } from "@reduxjs/toolkit";
import authSlice from '../store/slices/authSlice';
import cartSlice from '../store/slices/cartSlice';
import { langSlice } from '../store/slices/langSlice';
import PLPFilterSlice from '../store/slices/PLPFilterSlice';
import LabelsSlice from '../store/slices/labelsSlice';

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [cartSlice.name]: cartSlice.reducer,
  [langSlice.name]: langSlice.reducer,
  [PLPFilterSlice.name]: PLPFilterSlice.reducer,
  [LabelsSlice.name]: LabelsSlice.reducer,
});

export default rootReducer;
