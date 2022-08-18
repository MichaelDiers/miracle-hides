import { createSlice } from '@reduxjs/toolkit'
import ILanguage from '../types/language.interface';

interface ILanguageState {
  languages?: ILanguage[];
  current?: ILanguage;
}

const initialState = (): ILanguageState => ({});

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setCurrent: (state, action) => {
      state.current = action.payload;
    },
    setLanguages: (state, action) => {
      state.languages = action.payload;
    },
  }
});

export const reducer = languageSlice.reducer;

export const actions = languageSlice.actions;
