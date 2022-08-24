import ISignUp from '../types/sign-up.interface';
import apiSplice, { USER_INVITATION_TAG } from './api-slice';

const baseUrl = process.env.REACT_APP_MH_SIGN_UP_URL;

const apiSignUpSlice = apiSplice.injectEndpoints({
  endpoints: builder => ({
    signUp: builder.mutation({
      query: (signUpDto: ISignUp) => ({
        url: `${baseUrl}`,
        method: 'POST',
        body: signUpDto,
      }),
      invalidatesTags: [USER_INVITATION_TAG],
    }),
  }),
  overrideExisting: false,
});

export const { useSignUpMutation } = apiSignUpSlice;
