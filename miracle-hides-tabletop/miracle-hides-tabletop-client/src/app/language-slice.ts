import { createSlice } from '@reduxjs/toolkit'
import { Language } from '../types/language.type';

interface ILanguageState {
  lang?: Language;
}

const initialState = (): ILanguageState => ({});

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.lang = action.payload;
    },    
  }
});

export const reducer = languageSlice.reducer;

export const actions = languageSlice.actions;
