import React from 'react';
import { styled } from '@linaria/react';

const Header = styled.header`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
`;

const P = styled.p`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(112, 121, 9, 1) 56%,
    rgba(0, 212, 255, 1) 100%
  );
`;

export const App: React.FC = () => (
  <div className="App">
    <Header className="App-header">
      <P>
        Edit <code>src/App.js</code> and save to reload.
      </P>
      <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
        Learn React
      </a>
    </Header>
  </div>
);
