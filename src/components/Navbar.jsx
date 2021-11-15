import React, { useRef } from 'react';
import styled from 'styled-components';
import logo from '../images/logo.svg';
import { searchMovies } from '../api_utils/movie_db.api';
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
  return (
    <NavbarContainer>
      <Logo src={logo} alt="Timescale logo" />
      <SearchField />
    </NavbarContainer>
  )
}

const SearchField = () => {
  const inputRef = useRef();
  const isThrottling = useRef(false);

  // Throttled input change handler
  // Source: https://www.codingdeft.com/posts/react-debounce-throttle
  const handleInputChange = () => {
    if (isThrottling.current) return; // If function is throttling, don't do anything
    if (!inputRef.current.value.trim()) return; // if input is empty, don't do anything

    isThrottling.current = true;
    setTimeout(async () => {
      isThrottling.current = false;
      // Make search API call
      let apiRes = await searchMovies(inputRef.current.value);
      apiRes = await apiRes.json();
      console.log(apiRes);
    }, 500);
  };

  return (
    <SearchFieldContainer>
      <MagnifyingGlass />
      <SearchFieldInput
        type="text"
        placeholder="Search for a movie" 
        onChange={handleInputChange}
        ref={inputRef}
      />
    </SearchFieldContainer>
  )
}