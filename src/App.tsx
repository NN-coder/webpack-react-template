import React from 'react';
import logo from './logo.svg';
import { appClass, appHeaderClass, appLinkClass, appLogoClass } from './App.css';

export const App: React.FC = () => (
  <div className={appClass}>
    <header className={appHeaderClass}>
      <img src={logo} className={appLogoClass} alt="logo" />
      <p>
        Edit <code>src/App.tsx</code> and save to reload.
      </p>
      <a
        className={appLinkClass}
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
  </div>
);
