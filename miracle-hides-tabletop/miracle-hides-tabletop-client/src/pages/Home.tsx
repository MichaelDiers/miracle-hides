import { Link } from 'react-router-dom';
import { useReadTranslationsCombinedQuery } from '../app/hooks';
import AppRoutes from '../types/app-routes.enum';
import { ITranslation } from '../types/translation.types.gen';
import BasePage from './BasePage';

export default function Home() {
  const translationsResult = useReadTranslationsCombinedQuery();
  const translations = translationsResult.data as ITranslation;
  return (
    <BasePage
      headline={translations?.home.headline}
      apiData={translationsResult}
      isMain={true}
    >
      <Link to={AppRoutes.HOUSE_RULES}>
        {translationsResult.data?.navbar.houseRules}
      </Link>
    </BasePage>      
  );
}
