import React from 'react';
import { styled } from '@linaria/react';

const Header = styled.header`
  color: gold;
`;

export const App: React.FC = () => (
  <div className="App">
    <Header className="App-header">
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
        Learn React
      </a>
    </Header>
  </div>
);
