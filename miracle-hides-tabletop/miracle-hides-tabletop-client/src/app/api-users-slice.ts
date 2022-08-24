import IUserDto from '../types/user-dto.interface';
import apiSplice from './api-slice';

const baseUrl = process.env.REACT_APP_MH_USERS_URL;
const USER_TAG = 'User';

const apiSliceEnhanced = apiSplice.enhanceEndpoints({ addTagTypes: [USER_TAG]});
const usersSlice = apiSliceEnhanced.injectEndpoints({  
  endpoints: builder => ({
    readUser: builder.query<IUserDto, string>({
      query: (guid: string) => `${baseUrl}/${guid}`,
      providesTags: [USER_TAG],
    }),
    readAllUsers: builder.query<IUserDto[], void>({
      query: () => `${baseUrl}`,
      providesTags: [USER_TAG],
    }),    
  }),
  overrideExisting: false,
});

export const { 
  useReadUserQuery,
  useReadAllUsersQuery,
 } = usersSlice;
