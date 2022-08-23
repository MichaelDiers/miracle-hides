import { useReadTranslationsCombinedQuery } from '../app/hooks';
import ITranslations from '../types/translations.interface';
import BasePage from './BasePage';

export default function UserInvitations() {
  const translationsResult = useReadTranslationsCombinedQuery();
  const translations = translationsResult.data as ITranslations;

  return (
    <BasePage
      headline={translations?.invitations?.headline}
      isMain={true}
      apiData={translationsResult}
    ></BasePage>
  );
}
