import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { checkIfImageExists } from '../general_utils';
import { AppContext } from '../contexts/AppContext';

const GridContainer = styled.div`
  display: grid;
  grid-gap: 50px;
  grid-template-columns: repeat(auto-fill, 186px);
`;

const GridItem = styled.div`
  margin: 0px 10px 30px 10px;
  height: 250px;
  width: 200px;
  box-shadow: 0px 5px 17px -4px rgba(0,0,0,0.21);
  border-radius: 3%;
  overflow: hidden;
`;

const CardImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
`;

const CardText = styled.div`
  text-align: center;
`;

const PageTitle = styled.h2`
  margin-left: 10px;
`;

export const CardsContainer = () => {
  const { movies, pageTitle } = useContext(AppContext);

  return (
    <>
    <PageTitle>
      {pageTitle}
    </PageTitle>
    <GridContainer>
      {movies.map(movie => (
        <Card key={`movie_card_${movie.id}`} movie={movie} />
      ))}
    </GridContainer>
    </>
  );
};

const Card = ({ movie }) => {
  const moviePosterPathPlaceholder = 'https://pbs.twimg.com/profile_images/1243623122089041920/gVZIvphd_400x400.jpg'
  const moviePosterPath = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
  const [state, setState] = useState({ alt: null, src: null })
  
  useEffect(() => {
    if (movie.poster_path) {
      // check if image exists if given poster_path. Use it if it does, and use placeholder if not
      checkIfImageExists(moviePosterPath, (exists) => {
        setState({
          alt: exists ? `${movie.title} poster` : `${movie.title} poster placeholder`,
          src: exists ? moviePosterPath : moviePosterPathPlaceholder,
        })
      });
    } else {
      // use placeholders if no poster_path
      setState({
        alt: `${movie.title} poster placeholder`,
        src: moviePosterPathPlaceholder,
      })
    }

    return () => setState({ alt: null, src: null });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GridItem>
      <CardImage alt={state.alt} src={state.src}/>
      <CardText> {movie.title} </CardText>
    </GridItem>
  );
};