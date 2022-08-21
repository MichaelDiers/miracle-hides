import apiSplice from './api-slice';

const baseUrl = process.env.REACT_APP_MH_TRANSLATIONS_URL;

const translationsSlice = apiSplice.injectEndpoints({
  endpoints: builder => ({
    readTranslations: builder.query({
      query: (language: string) => `${baseUrl}/${language}`
    }),
  }),
  overrideExisting: false,
});

export const { useReadTranslationsQuery } = translationsSlice;
