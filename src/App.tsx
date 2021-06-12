import React from 'react';
import { headerClass } from './style.css';
import 'normalize.css';

export const App: React.FC = () => (
  <div className="App">
    <header className={headerClass}>
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
        Learn React
      </a>
    </header>
  </div>
);
