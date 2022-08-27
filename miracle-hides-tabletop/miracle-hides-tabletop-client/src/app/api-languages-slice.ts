import { ILanguage } from '../types/language.types';
import apiSplice from './api-slice';

const baseUrl = process.env.REACT_APP_MH_LANGUAGES_URL;

const languagesSlice = apiSplice.injectEndpoints({
  endpoints: builder => ({
    readLanguages: builder.query<ILanguage[], void>({
      query: () => `${baseUrl}`
    })
  }),
  overrideExisting: false,
});

export const { useReadLanguagesQuery } = languagesSlice;
