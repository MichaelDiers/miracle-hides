import { useReadHouseRulesCombinedQuery } from '../app/hooks';
import BaseComponent from '../components/BaseComponent';
import IHouseRulesServiceResult from '../types/house-rules-service-result.interface';

export default function HouseRules() {
  return (
    <BaseComponent apiData={useReadHouseRulesCombinedQuery()} createContent={createContent}></BaseComponent>
  ); 
};

const createContent = (apiData: any) : JSX.Element => {
  const houseRules: IHouseRulesServiceResult = apiData; 
  return (
    <main>      
      <h1>{houseRules?.headline}</h1>
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