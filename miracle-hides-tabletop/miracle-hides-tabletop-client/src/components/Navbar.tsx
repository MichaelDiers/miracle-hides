import { Link } from 'react-router-dom';
import { useReadTranslationsCombinedQuery } from '../app/hooks';
import ITranslations from '../types/translations.interface';
import BaseComponent from './BaseComponent';

export default function Navbar() {
  return (
    <BaseComponent apiData={useReadTranslationsCombinedQuery()} createContent={createNav}></BaseComponent>
  );
}

const createNav = (data: any) => {
  const translations: ITranslations = data;
  const links = [
    { 
      name: translations.navbar.home,
      link: '/'
    },
    { 
      name: translations.navbar.houseRules,
      link: '/house-rules'
    },
    { 
      name: translations.navbar.languages,
      link: '/languages'
    },
  ];
  
  return (
    <nav>
      <ul>
        {
          links.map(({ name, link }, i) => (<li key={`nav_${i}`}><Link to={link}>{name}</Link></li>))
        }
      </ul>
    </nav>
  );
}
