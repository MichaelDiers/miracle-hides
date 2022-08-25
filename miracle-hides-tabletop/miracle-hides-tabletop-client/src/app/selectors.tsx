import { RootState } from './store';

export const selectLanguage = (state: RootState) => state.language.current?.short;
export const selectUser = (state: RootState) => state.user.current;
