import { Link } from 'react-router-dom';
import { useReadTranslationsCombinedQuery } from '../app/hooks';
import BasePage from '../pages/BasePage';
import ITranslations from '../types/translations.interface';

export default function Navbar() {
  const trainslationsResult = useReadTranslationsCombinedQuery();
  const translations: ITranslations = trainslationsResult.data;
  const links = [
    { 
      name: translations?.navbar.home,
      link: '/'
    },
    { 
      name: translations?.navbar.houseRules,
      link: '/house-rules'
    },
    { 
      name: translations?.navbar.languages,
      link: '/languages'
    },
  ];

  return (
    <BasePage
      apiData={trainslationsResult}
      isMain={false}
      headline=''
      createContent={
        <nav>
          <ul>
          {
            links.map(({ name, link }, i) => (<li key={`nav_${i}`}><Link to={link}>{name}</Link></li>))
          }
          </ul>
        </nav>
      }
    />
  );
}
