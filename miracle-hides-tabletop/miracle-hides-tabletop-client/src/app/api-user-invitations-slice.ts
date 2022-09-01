import { IDisplayName } from '../base-types/display-name';
import { IUserInvitation, IUserInvitationUpdate } from '../types/user-invitations.types';
import apiSplice, { USER_INVITATION_TAG } from './api-slice';

const baseUrl = process.env.REACT_APP_MH_USER_INVITATIONS_URL;

const userInvitationsSlice = apiSplice.injectEndpoints({  
  endpoints: builder => ({
    createUserInvitation: builder.mutation({
      query: (request: IDisplayName) => ({
        url: `${baseUrl}`,
        method: 'POST',
        body: request,
      }),
      invalidatesTags: [USER_INVITATION_TAG],
    }),
    deleteUserInvitation: builder.mutation({
      query: (guid: string) => ({
        url: `${baseUrl}/${guid}`,
        method: 'DELETE',
      }),
      invalidatesTags: [USER_INVITATION_TAG],
    }),
    readAllUserInvitation: builder.query<IUserInvitation[], void>({
      query: () => `${baseUrl}`,
      providesTags: [USER_INVITATION_TAG],
    }),
    readUserInvitation: builder.query<IUserInvitation, string>({
      query: (guid: string) => `${baseUrl}/${guid}`,
      providesTags: [USER_INVITATION_TAG],
    }),
    updateUserInvitation: builder.mutation({
      query: (request: IUserInvitationUpdate) => ({
        url: `${baseUrl}`,
        method: 'PUT',
        body: request,
      }),
      invalidatesTags: [USER_INVITATION_TAG],
    }),
  }),
  overrideExisting: false,
});

export const { 
  useCreateUserInvitationMutation,
  useDeleteUserInvitationMutation,
  useReadAllUserInvitationQuery,
  useReadUserInvitationQuery,
  useUpdateUserInvitationMutation,
 } = userInvitationsSlice;
