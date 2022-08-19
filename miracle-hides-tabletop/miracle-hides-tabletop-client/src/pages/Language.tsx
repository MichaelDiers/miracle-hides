import { ChangeEvent, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../app/hooks';
import { languageSlice } from '../app/language-slice';
import { useReadLanguagesQuery } from '../app/languages-slice';
import { RootState } from '../app/store';
import BaseComponent from '../components/BaseComponent';
import ILanguage from '../types/language.interface';

export default function Language() {
  const languages = useReadLanguagesQuery();
  const current = useSelector((state: RootState) => state.language.current?.short) || navigator.language.split('-')[0].toLowerCase(); 
  const dispatch = useAppDispatch();  

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    const language = languages.data?.find(({ short }) => value === short);
    if (language) {
      dispatch(languageSlice.actions.updateLanguage(language));
      document.documentElement.lang = language.short;
    }
  }

  const createContent = (data: any) => {
    const languages = data as ILanguage[];  
    return (
      <main>
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
      </main>
    );
  }

  return (<BaseComponent apiData={languages} createContent={createContent}></BaseComponent>);
}
