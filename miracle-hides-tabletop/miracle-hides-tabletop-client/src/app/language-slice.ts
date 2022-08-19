import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import languagesService from '../services/languages-service';
import ILanguage from '../types/language.interface';
import { fetchHouseRulesAsync } from './data-slice';
import type { AppDispatch } from './store';

interface ILanguageState {
  languages?: ILanguage[];
  current?: ILanguage;
  error?: string;
}

const initialState = (): ILanguageState => ({});

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {    
  },
  extraReducers(builder) {
    builder.addCase(fetchLanguagesAsync.fulfilled, (state, action) => {
      state.languages = action.payload?.languages;
      state.error = undefined;
    });
    builder.addCase(fetchLanguagesAsync.rejected, (state, action) => {
      state.languages = undefined;
      state.error = action.error.message;
    });
    builder.addCase(updateCurrentLanguageAsync.fulfilled, (state, action) => {
      state.current = action.payload;
    });
  }
});

export const reducer = languageSlice.reducer;

export const actions = languageSlice.actions;

export const updateCurrentLanguageAsync = createAsyncThunk<ILanguage, ILanguage, { dispatch: AppDispatch }>(
  'languages/updateCurrent',
  async (language: ILanguage, { dispatch }) => {
    dispatch(fetchHouseRulesAsync(language.short));
    return language;
  }
);

export const fetchLanguagesAsync = createAsyncThunk<ILanguageState|undefined, { dispatch: AppDispatch }>(
  'languages/fetchLanguages',
  async ({ dispatch }) => {
    const response = await languagesService();
    if (!response) {
      return;
    }

    let currentLanguage: ILanguage | undefined;
    if (navigator.language) {
      const userLanguage = navigator.language.split('-')[0].toUpperCase();
      currentLanguage = response.find(({ short }) => userLanguage === short.toUpperCase());
    } 
        
    if (!currentLanguage) {
      currentLanguage = response.find((language) => language.isDefault) || response[0];
    }

    dispatch(updateCurrentLanguageAsync(currentLanguage));
    
    return {
      languages: response,
      current: currentLanguage,
    };
  }
);
