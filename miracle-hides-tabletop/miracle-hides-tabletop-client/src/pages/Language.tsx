import { ChangeEvent, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch, useReadTranslationsCombinedQuery } from '../app/hooks';
import { languageSlice } from '../app/language-slice';
import { useReadLanguagesQuery } from '../app/api-languages-slice';
import { RootState } from '../app/store';
import { ILanguage } from '../types/language.types';
import { ITranslation } from '../types/translation.types.gen';
import BasePage from './BasePage';

export default function Language() {
  const languagesResult = useReadLanguagesQuery();
  const translationsResult = useReadTranslationsCombinedQuery();
  const current = useSelector((state: RootState) => state.language.current?.languageInternalName)
    || navigator.language.split('-')[0].toLowerCase();
  const dispatch = useAppDispatch();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    const language = languagesResult.data?.find(
      ({ languageInternalName }) => value === languageInternalName,
    );
    if (language) {
      dispatch(languageSlice.actions.updateLanguage(language));
      document.documentElement.lang = language.languageInternalName;
    }
  }

  const languages = languagesResult.data as ILanguage[];
  const translations = translationsResult.data as ITranslation;

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
                <label htmlFor={id}>
                  {language.displayName}
                </label>
                <input
                  checked={language.languageInternalName === current}
                  id={id}
                  name='language'
                  onChange={onChange}
                  type='radio'
                  value={language.languageInternalName}
                ></input>
              </Fragment>
            )
          })
        }
      </form>
    </BasePage>
  );
}
