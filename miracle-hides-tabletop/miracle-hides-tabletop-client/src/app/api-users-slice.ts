import IUserDto from '../types/user-dto.interface';
import apiSplice, { USER_TAG } from './api-slice';

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
    readUser: builder.query<IUserDto, string>({
      query: (guid: string) => `${baseUrl}/${guid}`,
      providesTags: [USER_TAG],
    }),
    readAllUsers: builder.query<IUserDto[], void>({
      query: () => `${baseUrl}`,
      providesTags: [USER_TAG],
    }),
    updateUser: builder.mutation({
      query: (user: IUserDto) => ({
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
 } = usersSlice;
