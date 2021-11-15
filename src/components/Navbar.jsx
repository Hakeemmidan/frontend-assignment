import React, { useState } from 'react';
import styled from 'styled-components';
import logo from '../images/logo.svg';

const SearchFieldInput = styled.input`
  width: 200px;
  height: 45px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0 10px;
  font-size: 14px;
  color: #333;
  outline: none;
  &:focus {
    border: 1px solid #333;
  }
`;

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Navbar = () => {
  return (
    <NavbarContainer>
      <img src={logo} alt="Timescale logo" />
      <SearchField />
    </NavbarContainer>
  )
}

const SearchField = () => {
  const [value, setValue] = useState('');

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <SearchFieldInput
      type="text"
      placeholder="Search for a movie" 
      onChange={handleInputChange}
      value={value}
    />
  )
}