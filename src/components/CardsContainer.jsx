import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

export const CardsContainer = () => {
  const { movies } = useContext(AppContext);

  return (
    <div>
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      {JSON.stringify(movies)}
    </div>
  );
};

const Card = () => {
  return (
    <div>
      hello
    </div>
  );
};
