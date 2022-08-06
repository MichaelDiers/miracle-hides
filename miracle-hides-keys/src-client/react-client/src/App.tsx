import React, { Component, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Css from './css';
import Welcome from './components/Welcome';
import SideMenu from './components/SideMenu';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CustomEventRaiser, EventSubscriber, EventUnsubscriber } from './infrastructure/custom-event-handler';
import Asymmetric from './components/Asymmetric';
import Symmetric from './components/Symmetric';
import License from './components/License';
import { Language, languageDe, languageEn, Translation, Translations } from './components/Translations';
import { stringify } from 'querystring';
import { setTimeout } from 'timers/promises';

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

const handleCreateKeys = () => {
  console.log('create');
  CustomEventRaiser.raiseKeysCreated({
    privateKey: 'private',
    publicKey: 'public',
    encrypted: 'encrypted',
    decrypted: 'decrypted',    
  });
};

const App = () => {
  const [theme, setTheme] = useState(initializeTheme());
  const [showHeader, setShowHeader] = useState(false);
  const [translations, setTranslations] = useState(initializeTranslations());
  const [isProcessing, setIsProcessing] = useState(false);
  const [data, setData] = useState({
    errorMessage: '',
    testInput: translations.common.testInputValue,
    privateKey: '',
    publicKey: '',
    encrypted: '',
    decrypted: '',
  });

  const createAsymmetricKeys = ({ type, rsaKeySize, ecNamedCurve } : { type: string, rsaKeySize: string, ecNamedCurve: string}) => {    
    setIsProcessing(true);
    
    const body = {
      type,
      rsaKeySize,
      ecNamedCurve,
      testInput: data.testInput,
    };

    fetch(
      'http://localhost:3001/keys',
      {
        method: 'POST',
        body: JSON.stringify(body),
        headers: [['Content-Type', 'application/json']],
        mode:'cors',
      },
    ).then((response) => {
      if (response.ok) {
        response.text().then((text) => {
          const json = JSON.parse(text);
          const {
            privateKey,
            publicKey,
            encrypted,
            decrypted,
            testInput,
          } = json;

          setData({
            errorMessage: '',
            testInput,
            privateKey,
            publicKey,
            encrypted,
            decrypted,
          });
        });
      } else {
        setData({
          errorMessage: translations.common.errorMessage,
          testInput: translations.common.testInput,
          privateKey: '',
          publicKey: '',
          encrypted: '',
          decrypted: '',
        });
      }

      setIsProcessing(false);
    });
  }

  const handleTabs = (event: KeyboardEvent): void => {
    if (isProcessing && event.key === 'Tab') {
      event.preventDefault();
    }
  }

  useEffect(() => {
    document.body.addEventListener('keydown', handleTabs);
    return () => document.body.removeEventListener('keydown', handleTabs);
  }, []);

  return (
    <BrowserRouter basename='/react'>
      <div className={isProcessing ? `background-process-active ${theme}` : theme}>
        <Header
          className={showHeader ? '' : 'hidden'}
          common={translations.common}
          translation={translations.header}
        />
        <main>
          <Routes>
            <Route index element={<Welcome common={translations.common} />}/>
            <Route
              path='/asymmetric'
              element={
                <Asymmetric
                  common={translations.common}
                  translation={translations.asymmetric}
                  data={data}
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
        <SideMenu common={translations.common}/>
      </div>
    </BrowserRouter>
  );
}

/*
interface State {
  language: Language;
  processActive: number;
  translations: Translation;
  showHeader: boolean;
  theme: string;
}

class App extends Component<{}, State> {
  constructor(props = {}) {
    super(props);
    this.showHeader = this.showHeader.bind(this);
    this.toggleLanguage = this.toggleLanguage.bind(this);
    this.handleEndProcess = this.handleEndProcess.bind(this);
    this.handleStartProcess = this.handleStartProcess.bind(this);
    const language = this.handleInitialLanguage();
    this.state = {
      language,
      processActive: 0,
      translations: translations.find(({ name }) => name === language) || translations[0],
      showHeader: false,
      theme: this.handleInitialTheme(),
    }
       
  }

  componentDidMount (){
    EventSubscriber.subscribeToProcessStart(this.handleStartProcess);
    EventSubscriber.subscribeToProcessEnd(this.handleEndProcess); 
    EventSubscriber.subscribeToToggleLanguage(this.toggleLanguage);
    EventSubscriber.subscribeToShowHeader(this.showHeader);
    EventSubscriber.subscribeToToggleTheme(this.toggleTheme);
  };

  render() {
    return (
      <BrowserRouter basename='/react'>
        <div className={this.state.theme}>
          <Header className={this.state.showHeader ? '' : 'hidden'} common={this.state.translations.common} translation={this.state.translations.header}/>
          <main className={this.state.processActive === 0 ? '' : 'background-process-active2'}>
            <Routes>
              <Route index element={<Welcome common={this.state.translations.common} />}/>
              <Route
                path='/asymmetric'
                element={
                  <Asymmetric
                    common={this.state.translations.common}
                    translation={this.state.translations.asymmetric}                    
                    errorMessage={this.state.translations.common.errorMessage}
                    testInput=''
                  />
                }
              />
              <Route path='/symmetric' element={<Symmetric common={this.state.translations.common} translation={this.state.translations.symmetric}/>}/>
              <Route path='/licenses' element={<License common={this.state.translations.common} translation={this.state.translations.license}/>}/>
            </Routes>
          </main>
          <Footer common={this.state.translations.common}/>
          <SideMenu common={this.state.translations.common}/>
        </div>
      </BrowserRouter>
    );
  }

  componentDidUpdate() {
    console.log(this.state);
  }
  handleStartProcess = () => {
    this.setState((prevState) => {      
      return { processActive: prevState.processActive + 1 };
    });
  }

  handleEndProcess = () => {
    this.setState((prevState) => {      
      return { processActive: prevState.processActive - 1 };
    });
  }

  handleInitialLanguage = () => {
    const language = window.navigator.language || document.documentElement.lang || languageEn;
    const lang = language.split('-')[0].toLowerCase() === languageDe ? languageDe : languageEn;

    return lang;
    //this.setState({ language: lang });    
    //this.setState({ translations: translations.find(({ name }) => name === lang) || translations[0] });
  }

  handleInitialTheme = () => {
    let theme = Css.THEME_LIGHT;            
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      theme = Css.THEME_DARK; 
    }

    // this.setState({ theme });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (e.matches) {
        if (this.state.theme !== Css.THEME_DARK) {
          this.setState({ theme: Css.THEME_DARK });
        }
      } else {
        if (this.state.theme !== Css.THEME_LIGHT) {
          this.setState({ theme: Css.THEME_LIGHT });
        }
      }
    });

    return theme;
  }

  showHeader(event: Event) : void {
    const { show } = (event as CustomEvent).detail;
    if (show !== this.state.showHeader) {
      this.setState({ showHeader: show });
    }
  }

  toggleLanguage() {
    const language = this.state.language === languageEn ? languageDe : languageEn;
    this.setState({ language });

    this.setState({ translations: translations.find(({ name }) => name === language) || translations[0] });
  }

  toggleTheme() {
    if (this.state.theme === Css.THEME_LIGHT) {
      this.setState({ theme: Css.THEME_DARK });
    } else {
      this.setState({ theme: Css.THEME_LIGHT });
    }
  }  
}
*/
export default App;