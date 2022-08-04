import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Css from './css';
import Welcome from './components/Welcome';
import SideMenu from './components/SideMenu';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { EventSubscriber } from './custom-event-handler';
import Asymmetric from './components/Asymmetric';
import Symmetric from './components/Symmetric';
import License from './components/License';

class App extends Component {
  constructor() {
    super({});
    this.showHeader = this.showHeader.bind(this);
  }

  state = {
    showHeader: false,
    theme: Css.THEME_LIGHT,
  };

  componentDidMount (){
    this.handleInitalTheme();
    EventSubscriber.subscribeToToggleTheme((e) => this.toggleTheme());
    EventSubscriber.subscribeToShowHeader(this.showHeader);
    const language = window.navigator.language || document.documentElement.lang || 'en';
    const lang = language.split('-')[0].toLowerCase();
    document.body.setAttribute('lang', lang);
    document.body.setAttribute('lang-toggle', lang === 'en' ? 'de' : 'en');  
  };

  render() {
    return (
      <BrowserRouter>
        <div className={this.state.theme}>
          <Header className={this.state.showHeader ? '' : 'hidden'}/>
          <main>
            <Routes>
              <Route path='/' element={<Welcome/>}/>
              <Route path='/asymmetric' element={<Asymmetric/>}/>
              <Route path='/symmetric' element={<Symmetric/>}/>
              <Route path='/licenses' element={<License/>}/>
            </Routes>
          </main>
          <Footer/>
          <SideMenu />
        </div>
      </BrowserRouter>
    );
  }

  handleInitalTheme = () => {
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

  toggleTheme() {
    if (this.state.theme === Css.THEME_LIGHT) {
      this.setState({ theme: Css.THEME_DARK });
    } else {
      this.setState({ theme: Css.THEME_LIGHT });
    }
  }  
}

export default App;
