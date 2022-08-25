import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from './store';

export const USER_INVITATION_TAG = 'UserInvitation';
export const USER_TAG = 'User';

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
  tagTypes: [USER_INVITATION_TAG, USER_TAG]
});

export default apiSlice;
