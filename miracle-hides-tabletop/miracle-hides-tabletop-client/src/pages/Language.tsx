import { useReadLanguagesQuery } from '../app/languages-slice';
import BaseComponent from '../components/BaseComponent';
import ILanguage from '../types/language.interface';

export default function Language() {
  const languages = useReadLanguagesQuery();
  return (<BaseComponent apiData={languages} createContent={createContent}></BaseComponent>);
}

const createContent = (data: any) => {
  const languages = data as ILanguage[]; 
  return (
    <main>
      <ul>
        {
          languages?.map((language, i) => {
            return (
              <li key={`language_${i}`}>
                {language.name}
              </li>
            )
          })
        }
      </ul>
    </main>
  );
}
