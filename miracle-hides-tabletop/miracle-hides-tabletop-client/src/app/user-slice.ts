import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICurrentUser, IJwtPayload, IUserFrontEnd } from '../types/user.types';
import { AppDispatch } from './store';

interface IUserState {
  current?: ICurrentUser;
}

const initialState = (): IUserState => ({});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUser: (state) => {
      state.current = undefined;
    },
    updateUser: (state, action: PayloadAction<ICurrentUser>) => {
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

    const payload: IJwtPayload = JSON.parse(window.atob(splittedToken[1]));
    const user: ICurrentUser = {
      isEmailVerified: payload.isEmailVerified,
      displayName: payload.displayName,
      token,
      roles: payload.roles,
      guid: payload.guid,
    };

    dispatch(userSlice.actions.updateUser(user));
  }
}
