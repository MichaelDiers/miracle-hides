import apiSplice from './api-slice';

const baseUrl = process.env.REACT_APP_MH_HOUSE_RULES_URL;

const houseRulesSlice = apiSplice.injectEndpoints({
  endpoints: builder => ({
    readHouseRules: builder.query({
      query: (language: string) => `${baseUrl}/${language}`
    }),
  }),
  overrideExisting: false,
});

export const { useReadHouseRulesQuery } = houseRulesSlice;
