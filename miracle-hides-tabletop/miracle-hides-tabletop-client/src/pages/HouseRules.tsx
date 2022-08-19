import { useReadHouseRulesCombinedQuery, useReadTranslationsCombinedQuery } from '../app/hooks';
import BaseComponent from '../components/BaseComponent';
import IHouseRulesServiceResult from '../types/house-rules-service-result.interface';
import ITranslations from '../types/translations.interface';

export default function HouseRules() {
  return (
    <BaseComponent
      apiData={[useReadHouseRulesCombinedQuery(), useReadTranslationsCombinedQuery()]}
      createContent={createContent}
    ></BaseComponent>
  ); 
};

const createContent = (apiData: any[]) : JSX.Element => {
  const houseRules: IHouseRulesServiceResult = apiData[0];
  const translations: ITranslations = apiData[1]; 
  return (
    <main>      
      <h1>{translations.houseRules.headline}</h1>
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
    </main>
  );
}