import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { store } from './app/store';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import HouseRules from './pages/HouseRules';
import reportWebVitals from './reportWebVitals';
import './index.css';
import Language from './pages/Language';
import SignIn from './pages/SignIn';
import RequiresUser from './components/RequiresUser';
import Dashboard from './pages/Dashboard';
import SignUp from './pages/SignUp';
import AppRoutes from './types/app-routes.enum';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route index element={ <Home/> } />
          <Route path={AppRoutes.HOUSE_RULES} element={ <HouseRules /> } />
          <Route path={AppRoutes.LANGUAGES} element={ <Language/> } /> 
          <Route path={AppRoutes.SIGN_IN} element={ <SignIn/> } />
          <Route path={AppRoutes.SIGN_UP} element={ <SignUp/> } />
          <Route path={AppRoutes.DASHBOARD} element={ <RequiresUser><Dashboard/></RequiresUser> } /> 
        </Routes>
        <Footer/>
      </BrowserRouter>      
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
