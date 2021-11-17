import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../contexts/AppContext';
import { Modal } from './Modal';
import { Navbar } from './Navbar';
import { CardsContainer } from './Cards';
import { MOBILE_MAX_WIDTH } from '../constants';
import { getMovies } from '../api_utils/movie_db.api';

const AppContainer = styled.div`
  margin: 2% 8%;
  font-family: sans-serif;
  @media screen and (max-width: ${MOBILE_MAX_WIDTH}px) {
    margin: 5% 2%;
  };
`;

const App = () => {
  const { setMovies, setPageTitle, MOST_RECENT_MOVIES } = useContext(AppContext);

  useEffect(() => {
    const setupInitMovies = async () => {
      let apiRes = await getMovies();
      apiRes = await apiRes.json();
      setMovies(apiRes.results);
      setPageTitle(MOST_RECENT_MOVIES)
    };
    setupInitMovies();

    return () => {
      setMovies([]);
      setPageTitle('');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppContainer>
      <Modal/>
      <Navbar/>
      <CardsContainer/>
    </AppContainer>
  );
};

export default App;
