import ISignIn from '../types/sign-in.interface';
import apiSplice from './api-slice';

const baseUrl = process.env.REACT_APP_MH_SIGN_IN_URL;

const apiSignInSlice = apiSplice.injectEndpoints({
  endpoints: builder => ({
    signIn: builder.mutation({
      query: (signInDto: ISignIn) => ({
        url: `${baseUrl}`,
        method: 'POST',
        body: signInDto,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useSignInMutation } = apiSignInSlice;
