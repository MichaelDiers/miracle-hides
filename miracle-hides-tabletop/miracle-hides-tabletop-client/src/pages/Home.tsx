import { Link } from 'react-router-dom';
import { useReadTranslationsCombinedQuery } from '../app/hooks';
import ITranslations from '../types/translations.interface';
import BasePage from './BasePage';

export default function Home() {
  const translationsResult = useReadTranslationsCombinedQuery();
  const translations = translationsResult.data as ITranslations;
  return (
    <BasePage
      headline={translations?.home.headline}
      apiData={translationsResult}
      isMain={true}
      createContent={
        <Link to='/house-rules'>
          {translationsResult.data?.navbar.houseRules}
        </Link>
      }
    />      
  );
}
