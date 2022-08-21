import { ChangeEvent, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch, useReadTranslationsCombinedQuery } from '../app/hooks';
import { languageSlice } from '../app/language-slice';
import { useReadLanguagesQuery } from '../app/api-languages-slice';
import { RootState } from '../app/store';
import ILanguage from '../types/language.interface';
import ITranslations from '../types/translations.interface';
import BasePage from './BasePage';

export default function Language() {
  const languagesResult = useReadLanguagesQuery();
  const translationsResult = useReadTranslationsCombinedQuery();
  const current = useSelector((state: RootState) => state.language.current?.short) || navigator.language.split('-')[0].toLowerCase();
  const dispatch = useAppDispatch();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    const language = languagesResult.data?.find(({ short }) => value === short);
    if (language) {
      dispatch(languageSlice.actions.updateLanguage(language));
      document.documentElement.lang = language.short;
    }
  }

  const languages = languagesResult.data as ILanguage[];
  const translations = translationsResult.data as ITranslations;

  return (
    <BasePage
      headline={translations?.languages.headline}
      apiData={[translationsResult, languagesResult]}
      isMain={true}>
      <form>
        {
          languages?.map((language, i) => {
            const id = `language_${i}`;
            return (
              <Fragment key={i}>
                <label htmlFor={id}>{language.name}</label>
                <input id={id} name='language' type='radio' value={language.short} checked={language.short === current} onChange={onChange}></input>
              </Fragment>
            )
          })
        }
      </form>
    </BasePage>
  );
}
