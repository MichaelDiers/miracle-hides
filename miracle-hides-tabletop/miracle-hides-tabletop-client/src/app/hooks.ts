import { FetchBaseQueryError, skipToken } from '@reduxjs/toolkit/dist/query';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import ILanguage from '../types/language.interface';
import { useReadHouseRulesQuery } from './house-rules-slice';
import { useReadLanguagesQuery } from './languages-slice';
import type { RootState, AppDispatch } from './store';
import { useReadTranslationsQuery } from './translations-slice';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useReadCurrentLanguageCombinedQuery = () => {
  const languagesResult = useReadLanguagesQuery();
  if (languagesResult.isSuccess) {
    const languages = languagesResult.data as ILanguage[];
    const language = languages.find(({ isDefault }) => isDefault);
    if (language) {
      return { data: language.short, isError: false, isSuccess: true };
    } else {
      return { error: { status: 'CUSTOM_ERROR', error: 'No default language specified.' } as FetchBaseQueryError };
    }
  }

  return languagesResult;
}

export const useReadHouseRulesCombinedQuery = () => {
  const languageResult = useReadCurrentLanguageCombinedQuery();
  return useReadHouseRulesQuery(languageResult.isSuccess ? languageResult.data as string : skipToken);
};

export const useReadTranslationsCombinedQuery = () => {
  const languageResult = useReadCurrentLanguageCombinedQuery();
  return useReadTranslationsQuery(languageResult.isSuccess ? languageResult.data as string : skipToken);
}
