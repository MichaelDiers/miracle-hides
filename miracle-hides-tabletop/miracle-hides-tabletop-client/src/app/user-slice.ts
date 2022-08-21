import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import IUser from '../types/user.interface';

interface IUserState {
  current?: IUser;
}

const initialState = (): IUserState => ({});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUser: (state) => {
      state.current = undefined;
    },
    updateUser: (state, action: PayloadAction<IUser>) => {
      state.current = action.payload;
    }
  },  
});
