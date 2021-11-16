import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [pageTitle, setPageTitle] = useState('');
  const [movies, setMovies] = useState([]);
  const [modal, setModal] = useState({
    isOpen: false,
    component: null,
  });
  const MOST_RECENT_MOVIES = 'Most Recent Movies';
  const SEARCH_RESULT = 'Search Result';

  return (
    <AppContext.Provider
      value={{
        pageTitle,
        setPageTitle,
        movies,
        setMovies,
        modal,
        setModal,
        MOST_RECENT_MOVIES,
        SEARCH_RESULT,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
