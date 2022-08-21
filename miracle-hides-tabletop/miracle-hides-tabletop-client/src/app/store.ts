import { configureStore } from '@reduxjs/toolkit'
import apiSlice from './api-slice';
import { languageSlice } from './language-slice';
import { userSlice } from './user-slice';

export const store = configureStore({
  reducer: {
    api: apiSlice.reducer,
    language: languageSlice.reducer,
    user: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
