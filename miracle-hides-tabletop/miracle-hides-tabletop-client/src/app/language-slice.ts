import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import ILanguage from '../types/language.interface';

interface ILanguageState {
  current?: ILanguage;
}

const initialState = (): ILanguageState => ({});

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    updateLanguage: (state, action: PayloadAction<ILanguage>) => {
      state.current = action.payload;
    }
  },  
});
