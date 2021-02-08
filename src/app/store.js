import { configureStore } from '@reduxjs/toolkit';

import userReducer from '../features/userSlice';
import subsReducer from '../features/subsSlice';
export default configureStore({
  reducer: {
    user: userReducer,
    subscription:subsReducer
  },
});
