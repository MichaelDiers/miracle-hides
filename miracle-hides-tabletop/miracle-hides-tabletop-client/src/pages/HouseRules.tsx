import { useReadHouseRulesCombinedQuery, useReadTranslationsCombinedQuery } from '../app/hooks';
import IHouseRulesServiceResult from '../types/house-rules-service-result.interface';
import ITranslations from '../types/translations.interface';
import BasePage from './BasePage';

export default function HouseRules() {
  const houseRulesResult = useReadHouseRulesCombinedQuery();
  const translationsResult = useReadTranslationsCombinedQuery();
  const houseRules = houseRulesResult.data as IHouseRulesServiceResult;
  const translations = translationsResult.data as ITranslations;

  return (
    <BasePage
      headline={translations?.houseRules.headline}
      apiData={[translationsResult, houseRulesResult]}
      isMain={true}>
      <div>
        {
          houseRules?.houseRules?.map(({ topic, descriptions }, divi) => {
            return (
              <div key={divi}>
                <h3>{topic}</h3>
                <ul>
                  {
                    descriptions.map((description, lii) => {
                      return (
                        <li key={lii}>{description}</li>
                      )
                    })
                  }
                </ul>
              </div>
            )
          })
        }
      </div>
    </BasePage>
  );
};
