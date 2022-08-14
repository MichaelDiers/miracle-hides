import { useEffect, useState } from 'react';
import IRulesService from '../types/irules-service';
import IRulesServiceResult from '../types/irules-service-result';

export default function Rules({
  rulesService,
}: {
  rulesService: IRulesService,
}) {
  const [rulesServiceResult, setRulesServiceResult] = useState<IRulesServiceResult>();

  useEffect(() => {
    rulesService()
      .then((result) => setRulesServiceResult(result))
      .catch((err) => console.error(err));
  }, []);

  return (
    <main>
      <h1>{rulesServiceResult?.headline}</h1>
      <div>
        {
          rulesServiceResult?.rules.map(({ topic, descriptions }) => {
            return (
              <div>
                <h3>{topic}</h3>
                <ul>
                  {
                    descriptions.map((description) => {
                      return (
                        <li>{description}</li>
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
