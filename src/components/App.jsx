import React from 'react';
import styled from 'styled-components';
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
    <Navbar/>
    <CardsContainer/>
  </AppContainer>
);

export default App;
