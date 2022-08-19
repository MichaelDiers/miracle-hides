import { Link } from 'react-router-dom';
import { useReadTranslationsCombinedQuery } from '../app/hooks';
import BaseComponent from '../components/BaseComponent';
import ITranslations from '../types/translations.interface';

export default function Home() {
  const translations = useReadTranslationsCombinedQuery();
  return (<BaseComponent apiData={translations} createContent={createContent}/>)
}

const createContent = (data: any) => {
  const translations: ITranslations = data;
  return (
    <main>
      <h1>{translations.home.headline}</h1>
      <Link to='/house-rules'>
        {translations.navbar.houseRules}
      </Link>
    </main>
  );
}