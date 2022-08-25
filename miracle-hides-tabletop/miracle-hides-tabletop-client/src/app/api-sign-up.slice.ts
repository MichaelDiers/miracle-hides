import ISignUp from '../types/sign-up.interface';
import apiSplice, { USER_INVITATION_TAG, USER_TAG } from './api-slice';

const baseUrl = process.env.REACT_APP_MH_SIGN_UP_URL;

const apiSignUpSlice = apiSplice.injectEndpoints({
  endpoints: builder => ({
    signUp: builder.mutation({
      query: (signUpDto: ISignUp) => ({
        url: `${baseUrl}`,
        method: 'POST',
        body: signUpDto,
      }),
      invalidatesTags: [USER_INVITATION_TAG, USER_TAG],
    }),
    verifyEmailUnauthorized: builder.mutation({
      query: (request: { email: string, password: string, verificationCode: string }) => ({
        url: `${baseUrl}`,
        method: 'PUT',
        body: request,
      }),
      invalidatesTags: [USER_INVITATION_TAG, USER_TAG],
    }),
    verifyEmailAuthorized: builder.mutation({
      query: (request: { verificationCode: string }) => ({
        url: `${baseUrl}`,
        method: 'PATCH',
        body: request,
      }),
      invalidatesTags: [USER_INVITATION_TAG, USER_TAG],
    }),
  }),
  overrideExisting: false,
});

export const {
  useSignUpMutation,
  useVerifyEmailAuthorizedMutation,
  useVerifyEmailUnauthorizedMutation,
} = apiSignUpSlice;
