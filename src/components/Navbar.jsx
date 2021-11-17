import React, { useContext } from 'react';
import styled from 'styled-components';
import logo from '../images/logo.svg';
import { AppContext } from '../contexts/AppContext';
import { getMovies, searchMovies } from '../api_utils/movie_db.api';
import { MagnifyingGlass } from './MagnifyingGlass'
import { MOBILE_MAX_WIDTH } from '../constants';

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-bottom: 14px;
  margin-bottom: 14px;
  border-bottom: 1px solid lightgray;
  gap: 5px;
`;

const Logo = styled.img`
  height: 4vw;
  min-height: 42px;
  max-height: 70px;
  cursor: pointer;
  @media screen and (max-width: ${MOBILE_MAX_WIDTH}px) {
    height: 42px;
  };
`;

const SearchFieldContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 5px;
  border-radius: 5px;
  border: 1px solid lightgray;
`;

const SearchFieldInput = styled.input`
  width: 200px;
  height: 45px;
  border: none;
  border-radius: 5px;
  padding: 0 5px;
  font-size: 16px;
  color: gray;
  outline: none;
  &:focus {
    border: none;
  }
`;

export const Navbar = () => {
  const [inputVal, setInputVal] = React.useState('');
  const { setMovies, setPageTitle, MOST_RECENT_MOVIES } = useContext(AppContext);

  const handleLogoClick = async () => {
    // Get most recent movies and reset search field on logo click
    let apiRes = await getMovies();
    apiRes = await apiRes.json();
    setInputVal('');
    setMovies(apiRes.results);
    setPageTitle(MOST_RECENT_MOVIES);
  };

  return (
    <NavbarContainer>
      <Logo onClick={handleLogoClick} src={logo} alt="Timescale logo" />
      <SearchField inputVal={inputVal} setInputVal={setInputVal} />
    </NavbarContainer>
  )
}

const SearchField = ({ inputVal, setInputVal }) => {
  const { setMovies, setPageTitle, MOST_RECENT_MOVIES, SEARCH_RESULT } = useContext(AppContext);

  // Throttled input change handler
  // Source: https://www.codingdeft.com/posts/react-debounce-throttle
  const handleInputSubmit = async (e) => {
    const newInputVal = e.target.value;
    let apiRes;

    if (!newInputVal) {
      // if input is emptied, then get most recent movies using 'getMovies'
      apiRes = await getMovies();
      setPageTitle(MOST_RECENT_MOVIES);
    } else {
      // if not empty, then search movies using 'searchMovies'
      apiRes = await searchMovies(newInputVal);
      setPageTitle(SEARCH_RESULT);
    }

    apiRes = await apiRes.json();
    setMovies(apiRes.results);
  };

  return (
    <SearchFieldContainer data-testid='search_field'>
      <MagnifyingGlass />
      <SearchFieldInput
        data-testid='search_field_input'
        type="text"
        placeholder="Search for a movie" 
        onChange={(e) => setInputVal(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') handleInputSubmit(e) }}
        value={inputVal}
      />
    </SearchFieldContainer>
  )
}