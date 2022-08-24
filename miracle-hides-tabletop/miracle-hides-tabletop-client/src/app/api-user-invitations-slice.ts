import IUserInvitation from '../types/user-invitation.interface';
import apiSplice, { USER_INVITATION_TAG } from './api-slice';

const baseUrl = process.env.REACT_APP_MH_USER_INVITATIONS_URL;

const userInvitationsSlice = apiSplice.injectEndpoints({  
  endpoints: builder => ({
    createUserInvitation: builder.mutation({
      query: (request: { name: string, email?: string }) => ({
        url: `${baseUrl}`,
        method: 'POST',
        body: {
          name: request.name,
          email: request.email,
        },        
      }),
      invalidatesTags: [USER_INVITATION_TAG],
    }),
    deleteUserInvitation: builder.mutation({
      query: (request: { guid: string }) => ({
        url: `${baseUrl}/${request.guid}`,
        method: 'DELETE',
      }),
      invalidatesTags: [USER_INVITATION_TAG],
    }),
    readUserInvitation: builder.query<IUserInvitation, string>({
      query: (guid: string) => `${baseUrl}/${guid}`,
      providesTags: [USER_INVITATION_TAG],
    }),
    readAllUserInvitation: builder.query<IUserInvitation[], void>({
      query: () => `${baseUrl}`,
      providesTags: [USER_INVITATION_TAG],
    }),
    updateUserInvitation: builder.mutation({
      query: (request: { guid: string, isActive: boolean }) => ({
        url: `${baseUrl}`,
        method: 'PUT',
        body: {
          guid: request.guid,
          isActive: request.isActive,
        },
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
