import React from 'react';
import styled from 'styled-components';
import { Navbar } from './Navbar';
import { CardsContainer } from './CardsContainer';

const AppContainer = styled.div``;

const App = () => (
  <AppContainer>
    <Navbar/>
    <CardsContainer/>
  </AppContainer>
);

export default App;
