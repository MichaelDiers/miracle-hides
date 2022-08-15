import { useEffect, useState } from 'react';
import IHouseRulesService from '../types/house-rules-service.interface';
import IHouseRulesServiceResult from '../types/house-rules-service-result.interface';

export default function Rules({
  houseRulesService,
}: {
  houseRulesService: IHouseRulesService,
}) {
  const [houseRulesServiceResult, setHouseRulesServiceResult] = useState<IHouseRulesServiceResult>();

  useEffect(() => {
    houseRulesService('en')
      .then((result) => setHouseRulesServiceResult(result))
      .catch((result) => setHouseRulesServiceResult(result));
  }, []);

  return (
    <main>
      <h1>{houseRulesServiceResult?.headline}</h1>
      <div>{houseRulesServiceResult?.error}</div>
      <div>
        {
          houseRulesServiceResult?.houseRules?.map(({ topic, descriptions }, divi) => {
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
};
