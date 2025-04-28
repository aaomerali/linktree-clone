import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import linksReducer from '../features/dashboard/linksSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    links: linksReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ['payload.upload'],
      },
    }),
});

export default store;