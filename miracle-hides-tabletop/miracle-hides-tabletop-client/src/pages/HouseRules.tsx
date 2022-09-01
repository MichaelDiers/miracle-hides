import { useReadHouseRulesCombinedQuery, useReadTranslationsCombinedQuery } from '../app/hooks';
import { IHouseRule } from '../types/house-rule.types';
import { ITranslation } from '../types/translation.types.gen';
import BasePage from './BasePage';

export default function HouseRules() {
  const houseRulesResult = useReadHouseRulesCombinedQuery();
  const translationsResult = useReadTranslationsCombinedQuery();
  const houseRules = houseRulesResult.data as IHouseRule;
  const translations = translationsResult.data as ITranslation;

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
