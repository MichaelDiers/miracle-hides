import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from './store';

const baseUrl = process.env.REACT_APP_MH_SERVER_PREFIX || '';

const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.current?.token;      
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
  
      return headers
    },
  }),
  endpoints: () => ({}),
});

export default apiSlice;
