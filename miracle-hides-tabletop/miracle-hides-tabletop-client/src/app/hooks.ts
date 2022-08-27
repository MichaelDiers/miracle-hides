import { FetchBaseQueryError, skipToken } from '@reduxjs/toolkit/dist/query';
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';
import { ILanguage } from '../types/language.types';
import { useReadHouseRulesQuery } from './api-house-rules-slice';
import { useReadLanguagesQuery } from './api-languages-slice';
import { RootState, AppDispatch } from './store';
import { useReadTranslationsQuery } from './api-translations-slice';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useReadCurrentLanguageCombinedQuery = () => {
  // has user selected a language?
  let language = useSelector((state: RootState) => state.language)?.current;
  const languagesResult = useReadLanguagesQuery();

  if (!language) {
    // load supported languages
    if (languagesResult.isSuccess) {
      const languages = languagesResult.data as ILanguage[];
      if (languages && languages.length > 0) { 
        // read the browser selected language
        const browserLanguage = navigator.language?.split('-')[0].toUpperCase();
        if (browserLanguage) {
          // check if the selected browser language is available
          language = languages.find(
            ({ languageInternalName }) => languageInternalName.toUpperCase() === browserLanguage,
          );
          if (!language) {
            // select the default language of supported languages
            language = languages.find(({ isDefault }) => isDefault);
            if (!language) {
              // fallback
              language = languages[0];
            }
          }
        }
      }
    }    
  }

  if (!language) {
    return {
      error: {
        status: 'CUSTOM_ERROR',
        error: 'Unable to set language.',
      } as FetchBaseQueryError,
    };
  }

  document.documentElement.lang = language.languageInternalName;
  return { data: language.languageInternalName, isError: false, isSuccess: true };
}

export const useReadHouseRulesCombinedQuery = () => {
  const languageResult = useReadCurrentLanguageCombinedQuery();
  return useReadHouseRulesQuery(
    languageResult.isSuccess
    ? languageResult.data as string
    : skipToken,
  );
};

export const useReadTranslationsCombinedQuery = () => {
  const languageResult = useReadCurrentLanguageCombinedQuery();
  return useReadTranslationsQuery(
    languageResult.isSuccess
    ? languageResult.data as string
    : skipToken,
  );
}
