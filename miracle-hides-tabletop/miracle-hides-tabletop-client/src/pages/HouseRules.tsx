import { useAppSelector } from '../app/hooks';
import { selectHouseRulesState } from '../app/selectors';

export default function Rules() {
  const houseRulesState = useAppSelector(selectHouseRulesState);
  return (
    <main>
      <div className={`loader ${houseRulesState.isLoading ? ' show' : ''}`} />
      <h1>{houseRulesState?.headline}</h1>
      <div>{houseRulesState?.error}</div>
      <div>
        {
          houseRulesState?.houseRules?.map(({ topic, descriptions }, divi) => {
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
