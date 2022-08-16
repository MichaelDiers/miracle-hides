import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Language, toLanguageOrDefault } from '../types/language.type';
import { RootState } from './store';

export interface ILanguageState {
  lang: Language;
}

const initialState: ILanguageState = {
  lang: toLanguageOrDefault(navigator.language, document.documentElement.lang),
};

document.documentElement.setAttribute('lang', initialState.lang);

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.lang = action.payload;
    },
  },
});

export const getLanguage = (state: RootState) => state.language.lang;

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;
