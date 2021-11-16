import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { AppContext } from '../contexts/AppContext';
import { Bold, SpaceBetween } from './general_styled_components';
import { checkIfImageExists, showOneDecimal } from '../general_utils';

const GridContainer = styled.div`
  display: grid;
  grid-gap: 50px;
  grid-template-columns: repeat(auto-fill, 186px);
`;

const GridItem = styled.div`
  cursor: pointer;
  width: 200px;
  margin: 0px 10px 30px 10px;
  padding-bottom: 13px;
  box-shadow: 0px 5px 17px -4px rgba(0,0,0,0.21);
  border-radius: 3%;
  overflow: hidden;
  position: relative;
`;

const CardRatingBubble = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
  background-color: white;
  height: 26px;
  width: 26px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  font-size: 14px;
  font-weight: bold;
`;

const CardImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
`;

const CardText = styled.div`
  text-align: center;
  margin-top: 5px;
`;

const PageTitle = styled.h2`
  margin-left: 10px;
`;

const CloseButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  font-size: 18px;
  cursor: pointer;
  border: 1px solid black;
`;

const MovieModalTopInfo = styled.div`
  margin-bottom: 15px;
`;

const ModalMovieTitle = styled.h2`
  margin: 0;
`;

const ModalPoster = styled.img`
  width: 28vw;
  max-width: 500px;
  object-fit: contain;
`;

const ModalMovieReleaseDate = styled.p`
  margin-top: 0px;
`;

const ModalMovieInfoContainer = styled.div`
  margin: 10px 20px;
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
  const [poster, setPoster] = useState({ alt: null, src: null });
  const { setModal } = useContext(AppContext);
  
  useEffect(() => {
    if (movie.poster_path) {
      // check if image exists if given poster_path. Use it if it does, and use placeholder if not
      checkIfImageExists(moviePosterPath, (exists) => {
        setPoster({
          alt: exists ? `${movie.title} poster` : `${movie.title} poster placeholder`,
          src: exists ? moviePosterPath : moviePosterPathPlaceholder,
        })
      });
    } else {
      // use placeholders if no poster_path
      setPoster({
        alt: `${movie.title} poster placeholder`,
        src: moviePosterPathPlaceholder,
      })
    }

    return () => setPoster({ alt: null, src: null });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCardClick = () => {
    setModal({
      isOpen: true,
      component: <CardModalContent movie={movie} poster={poster} />,
    })
  };

  return (
    <GridItem onClick={handleCardClick}>
      <CardImage alt={poster.alt} src={poster.src}/>
      <CardRatingBubble>{showOneDecimal(movie.vote_average)}</CardRatingBubble>
      <CardText> {movie.title} </CardText>
    </GridItem>
  );
};

const CardModalContent = ({ movie, poster }) => {
  const { setModal } = useContext(AppContext);

  const handleCloseClick = () => {
    setModal({
      isOpen: false,
      component: null,
    });
  };

  return (
    <>
      <MovieModalTopInfo>
        <SpaceBetween>
          <ModalMovieTitle>{movie.title}</ModalMovieTitle>
          <CloseButton onClick={handleCloseClick}>╳</CloseButton>
        </SpaceBetween>
      </MovieModalTopInfo>
      <SpaceBetween>
        <ModalPoster src={poster.src} alt={poster.alt} />
        <ModalMovieInfoContainer>
          <ModalMovieReleaseDate>
            <Bold>Release date: </Bold>
            {movie.release_date}
          </ModalMovieReleaseDate>
          <p>
            {movie.overview || '(No movie overview available)'}
          </p>
          <p>
            <Bold>{showOneDecimal(movie.vote_average)}</Bold> / 10
            ({movie.vote_count} total votes)
          </p>
        </ModalMovieInfoContainer>
      </SpaceBetween>
    </>
  );
};
