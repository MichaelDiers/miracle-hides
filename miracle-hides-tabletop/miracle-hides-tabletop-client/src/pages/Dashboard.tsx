import { useReadTranslationsCombinedQuery } from '../app/hooks';
import BasePage from './BasePage';

export default function Dashboard() {
  const translationsResult = useReadTranslationsCombinedQuery();
  return (
    <BasePage
      headline={translationsResult.data?.dashboard.headline}
      isMain={true}
      apiData={translationsResult}      
    />
  );
}