import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { store } from './app/store';
import Footer from './components/Footer';
import Header from './components/Header';
import reportWebVitals from './reportWebVitals';
import './index.css';
import RequiresUser from './components/RequiresUser';
import ROUTES from './app/routes';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes>
          {
            ROUTES.map(({ path, element, isVerified, requiresUser, roles }, i) => {
              if (path === '/') {
                return <Route key={`route_${i}`} index element={element} />;
              } else if (!requiresUser && roles.length === 0) {
                return <Route key={`route_${i}`} path={path} element={element} />;
              } else if (requiresUser && roles.length === 0) {
                return <Route key={`route_${i}`} path={path} element={<RequiresUser isVerified={isVerified}>{element}</RequiresUser>} />;
              }

              return <Route key={`route_${i}`} path={path} element={<RequiresUser isVerified={isVerified} roles={roles}>{element}</RequiresUser>} />;
            })
          }
        </Routes>

        <Footer />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
