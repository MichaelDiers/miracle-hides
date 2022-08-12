import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Css from './css';
import Welcome from './components/Welcome';
import SideMenu from './components/SideMenu';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Asymmetric from './components/Asymmetric';
import Symmetric from './components/Symmetric';
import License from './components/License';
import { languageDe, languageEn, Translations } from './components/Translations';
import createKeys from './infrastructure/keys-creator';

interface SymmetricDataState {
  errorMessage: string;
  testInput: string;
  privateKey: string;
  encrypted: string;
  decrypted: string;
}

interface AsymmetricDataState extends SymmetricDataState {
  publicKey: string;
}

const initializeTheme = () => {
  let theme = Css.THEME_LIGHT;            
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    theme = Css.THEME_DARK; 
  }

  return theme;
}

const initializeTranslations = () => {
  const language = window.navigator.language || document.documentElement.lang || languageEn;
  const lang = language.split('-')[0].toLowerCase() === languageDe ? languageDe : languageEn;
  return Translations.find(({ name }) => name.toLowerCase() === lang) || Translations[0];
}

const App = () => {
  const [theme, setTheme] = useState(initializeTheme());
  const [translations, setTranslations] = useState(initializeTranslations());
  const [isProcessing, setIsProcessing] = useState(false);
  const [asymmetricData, setAsymmetricData] = useState({
    errorMessage: '',
    testInput: translations.common.testInputValue,
    privateKey: '',
    publicKey: '',
    encrypted: '',
    decrypted: '',
  });
  const [symmetricData, setSymmetricData] = useState({
    errorMessage: '',
    testInput: translations.common.testInputValue,
    privateKey: '',
    encrypted: '',
    decrypted: '',
  });
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const createAsymmetricKeys = ({
    type,
    rsaKeySize,
    ecNamedCurve,
  } : {
    type: string,
    rsaKeySize: string,
    ecNamedCurve: string,
  }) : void => {
    createKeys({
      body: {
        type,
        rsaKeySize,
        ecNamedCurve,
        testInput: asymmetricData.testInput,
      },
      setData: (response) => setAsymmetricData(response as AsymmetricDataState),
      setIsProcessing,
      translationsCommon: translations.common,
    });
  }

  const createSymmetricKeys = ({
    type,
    aesKeySize,
    hmacKeySize,
  } : {
    type: string,
    aesKeySize: string,
    hmacKeySize: string,
  }) => {
    createKeys({
      body:{
        type,
        aesKeySize,
        hmacKeySize,
        testInput: asymmetricData.testInput,
      },
      setData: (response) => setSymmetricData(response as SymmetricDataState),
      setIsProcessing,
      translationsCommon: translations.common,
    });
  }

  const toggleLanguage = () => {
    const newTranslations = translations.name === Translations[0].name 
      ? Translations[1] : Translations[0];
    setTranslations(newTranslations);
    setAsymmetricData({
      errorMessage: asymmetricData.errorMessage,
      testInput: newTranslations.common.testInputValue,
      privateKey: asymmetricData.privateKey,
      publicKey: asymmetricData.publicKey,
      encrypted: '',
      decrypted: '',
    });
  }

  useEffect(() => {
    const handleTabs = (event: KeyboardEvent): void => {
      if (isProcessing && event.key === 'Tab') {
        event.preventDefault();
      }
    }

    document.body.addEventListener('keydown', handleTabs);
    return () => document.body.removeEventListener('keydown', handleTabs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter basename='/react'>
      <div className={`app ${theme} ${isProcessing ? `background-process-active ` : ''} ${isNavbarOpen ? `navbar-active ` : ''}`}>
          <Routes>
            <Route index />
            <Route
              path='/*'
              element={
                <Header
                  common={translations.common}
                  translation={translations.header}
                  isNavbarOpen={isNavbarOpen}
                  toggleNavbarOpen={(isOpen: boolean) => setIsNavbarOpen(isOpen) }
                />
              }
            ></Route>
          </Routes>
        <main>
          <Routes>
            <Route index element={<Welcome common={translations.common} />}/>
            <Route
              path='/asymmetric'
              element={
                <Asymmetric
                  common={translations.common}
                  translation={translations.asymmetric}
                  data={asymmetricData}
                  createKeys={createAsymmetricKeys}
                  isProcessing={isProcessing}
                />
              }
            />
            <Route
              path='/symmetric'
              element={
                <Symmetric
                  common={translations.common}
                  translation={translations.symmetric}
                  data={symmetricData}
                  createKeys={createSymmetricKeys}
                  isProcessing={isProcessing}
                />
              }
            />
            <Route
              path='/licenses'
              element={
                <License
                  common={translations.common}
                  translation={translations.license}
                />
              }
            />
          </Routes>
        </main>
        <Footer common={translations.common}/>
        <SideMenu
          common={translations.common}
          toggleLanguage={toggleLanguage}
          toggleTheme={() => setTheme(theme === Css.THEME_DARK ? Css.THEME_LIGHT : Css.THEME_DARK) }
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
