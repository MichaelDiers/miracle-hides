import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Css from './css';
import Welcome, { WelcomeProperties } from './components/Welcome';
import SideMenu from './components/SideMenu';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { EventSubscriber } from './custom-event-handler';
import Asymmetric from './components/Asymmetric';
import Symmetric from './components/Symmetric';
import License from './components/License';
import { Language, languageDe, languageEn, Translation, translations } from './components/Translations';

interface State {
  language: Language,
  translations: Translation,
  showHeader: boolean,
  theme: string,
}

class App extends Component<{}, State> {
  constructor(props = {}) {
    super(props);
    this.showHeader = this.showHeader.bind(this);
    this.toggleLanguage = this.toggleLanguage.bind(this);
    this.state = {
      language: languageDe,
      translations: translations.find(({ name }) => name === languageDe) || translations[0],
      showHeader: false,
      theme: Css.THEME_LIGHT,
    }
  }

  componentDidMount (){
    this.handleInitialTheme();
    this.handleInitialLanguage();

    EventSubscriber.subscribeToToggleLanguage((e) => this.toggleLanguage());
    EventSubscriber.subscribeToShowHeader(this.showHeader);
    EventSubscriber.subscribeToToggleTheme((e) => this.toggleTheme());
  };

  render() {
    return (
      <BrowserRouter>
        <div className={this.state.theme}>
          <Header className={this.state.showHeader ? '' : 'hidden'} common={this.state.translations.common} translation={this.state.translations.header}/>
          <main>
            <Routes>
              <Route path='/' element={<Welcome common={this.state.translations.common} />}/>
              <Route path='/asymmetric' element={<Asymmetric common={this.state.translations.common} translation={this.state.translations.asymmetric} />}/>
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

  handleInitialLanguage = () => {
    const language = window.navigator.language || document.documentElement.lang || languageEn;
    const lang = language.split('-')[0].toLowerCase() === languageDe ? languageDe : languageEn;

    this.setState({ language: lang });    
    this.setState({ translations: translations.find(({ name }) => name === lang) || translations[0] });
  }

  handleInitialTheme = () => {
    let theme = Css.THEME_LIGHT;            
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      theme = Css.THEME_DARK; 
    }

    this.setState({ theme });

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
  }

  showHeader(event: CustomEvent) : void {
    const { show } = event.detail;
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

export default App;
