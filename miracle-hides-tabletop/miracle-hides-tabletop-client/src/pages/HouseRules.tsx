import { useAppSelector } from '../app/hooks';
import { selectHouseRulesServiceResult } from '../app/selectors';

export default function Rules() {
  const houseRulesServiceResult = useAppSelector(selectHouseRulesServiceResult);
  
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
