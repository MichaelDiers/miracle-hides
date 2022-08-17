import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { store } from './app/store';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import Rules from './pages/HouseRules';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { initializeLanguageAsync } from './app/thunks';

const container = document.getElementById('root')!;
const root = createRoot(container);
store.dispatch(initializeLanguageAsync());
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Header/>
      <BrowserRouter>
        <Routes>
          <Route index element={ <Home/> } />
          <Route path='/house-rules' element={ <Rules /> } />
        </Routes>
      </BrowserRouter>
      <Footer/>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
