import { IVerificationCode } from '../base-types/verification-code';
import { IUserEmailVerification, IUserFrontEnd, IUserSignIn, IUserSignUp, IUserUpdate } from '../types/user.types';
import apiSplice, { USER_INVITATION_TAG, USER_TAG } from './api-slice';

const baseUrl = process.env.REACT_APP_MH_USERS_URL;

const usersSlice = apiSplice.injectEndpoints({  
  endpoints: builder => ({
    deleteUser: builder.mutation({
      query: (guid: string) => ({
        url: `${baseUrl}/${guid}`,
        method: 'DELETE',
      }),
      invalidatesTags: [USER_TAG],
    }),
    readUser: builder.query<IUserFrontEnd, string>({
      query: (guid: string) => `${baseUrl}/${guid}`,
      providesTags: [USER_TAG],
    }),
    readAllUsers: builder.query<IUserFrontEnd[], void>({
      query: () => `${baseUrl}`,
      providesTags: [USER_TAG],
    }),
    signIn: builder.mutation({
      query: (signInDto: IUserSignIn) => ({
        url: `${baseUrl}/sign-in`,
        method: 'POST',
        body: signInDto,
      }),
    }),
    signUp: builder.mutation({
      query: (signUpDto: IUserSignUp) => ({
        url: `${baseUrl}/sign-up`,
        method: 'POST',
        body: signUpDto,
      }),
      invalidatesTags: [USER_INVITATION_TAG, USER_TAG],
    }),
    verifyEmailAuthorized: builder.mutation({
      query: (request: IVerificationCode) => ({
        url: `${baseUrl}/sign-up`,
        method: 'PATCH',
        body: request,
      }),
      invalidatesTags: [USER_INVITATION_TAG, USER_TAG],
    }),
    verifyEmailUnauthorized: builder.mutation({
      query: (request: IUserEmailVerification) => ({
        url: `${baseUrl}/sign-up`,
        method: 'PUT',
        body: request,
      }),
      invalidatesTags: [USER_INVITATION_TAG, USER_TAG],
    }),
    updateUser: builder.mutation({
      query: (user: IUserUpdate) => ({
        url: `${baseUrl}`,
        method: 'PUT',
        body: user,
      }),
      invalidatesTags: [USER_TAG],
    }),    
  }),
  overrideExisting: false,
});

export const {
  useDeleteUserMutation, 
  useReadUserQuery,
  useReadAllUsersQuery,
  useUpdateUserMutation,
  useSignInMutation,
  useSignUpMutation,
  useVerifyEmailAuthorizedMutation,
  useVerifyEmailUnauthorizedMutation,
 } = usersSlice;
