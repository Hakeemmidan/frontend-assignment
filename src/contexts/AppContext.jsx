import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);

  return (
    <AppContext.Provider
      value={{
        movies,
        setMovies
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
