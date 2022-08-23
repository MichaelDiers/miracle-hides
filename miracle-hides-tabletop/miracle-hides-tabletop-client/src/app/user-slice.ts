import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import IPayload from '../types/payload.interface';
import UserRoles from '../types/user-roles';
import IUser from '../types/user.interface';
import { AppDispatch } from './store';

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

export function updateUserThunk(token: string) {
  return (dispatch: AppDispatch) => {
    if (!token) {
      return;
    }

    const splittedToken = token.split('.');
    if (splittedToken.length !== 3) {
      return;
    }

    const payload: IPayload = JSON.parse(window.atob(splittedToken[1]));
    const user: IUser = {
      name: payload.displayName,
      token,
      roles: payload.roles,
    };

    dispatch(userSlice.actions.updateUser(user));
  }
}
