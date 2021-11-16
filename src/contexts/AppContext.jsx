import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [pageTitle, setPageTitle] = useState('');
  const [movies, setMovies] = useState([]);
  const MOST_RECENT_MOVIES = 'Most Recent Movies';
  const SEARCH_RESULT = 'Search Result';

  return (
    <AppContext.Provider
      value={{
        pageTitle,
        setPageTitle,
        movies,
        setMovies,
        MOST_RECENT_MOVIES,
        SEARCH_RESULT,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
