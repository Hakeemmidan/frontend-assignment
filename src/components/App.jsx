import React from 'react';
import styled from 'styled-components';
import { AppContextProvider } from '../contexts/AppContext';
import { Navbar } from './Navbar';
import { CardsContainer } from './CardsContainer';
import { MOBILE_MAX_WIDTH } from '../constants';

const AppContainer = styled.div`
  margin: 2% 8%;
  @media screen and (max-width: ${MOBILE_MAX_WIDTH}px) {
    margin: 5% 2%;
  };
`;

const App = () => (
  <AppContainer>
    <AppContextProvider>
      <Navbar/>
      <CardsContainer/>
    </AppContextProvider>
  </AppContainer>
);

export default App;
