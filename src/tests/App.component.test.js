import React from 'react';
import { render } from '@testing-library/react';
import ReactDOM from 'react-dom';
import App from '../components/App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('renders Timescale <img> logo', () => {
  const { getByAltText, container } = render(<App />);
  expect(container.querySelector(`img[alt="Timescale logo"]`)).toBeDefined(); // checks that logo is an <img> tag
  expect(getByAltText('Timescale logo')).toBeDefined(); // checks its alt text
});
