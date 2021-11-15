import React from 'react';
import { render, screen, fireEvent, waitFor  } from '@testing-library/react';
import { searchMovies } from '../api_utils/movie_db.api'
import ReactDOM from 'react-dom';
import App from '../components/App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

describe('on App render', () => {
  let container;

  beforeAll(() => {
    ({ container } = render(<App />));
  });

  it('renders Timescale <img> logo', () => {
    expect(container.querySelector(`img[alt="Timescale logo"]`)).not.toBeNull(); // checks that logo is an <img> tag
    expect(screen.getByAltText('Timescale logo')).toBeDefined(); // checks alt text
  });

  it('renders movie list', () => {
    expect(
      container.querySelectorAll(`div[class^="movie_card"]`).length
    ).toBeGreaterThan(0);
  });

  it('renders search field', () => {
    expect(container.querySelector(`div[class="search_field"]`)).not.toBeNull();
  });

  it('changes search field value on field change', async () => {
    const searchField = await container.querySelector(`div[class="search_field"]`);
    expect(searchField).not.toBeNull();

    fireEvent.change(searchField, { target: { value: 'test' } });
    await waitFor(() => expect(searchField.value).toBe('test'));
  });

  it('calls api on search field change', async () => {
    const searchField = await container.querySelector(`div[class="search_field"]`);
    expect(searchField).not.toBeNull();

    fireEvent.change(searchField, { target: { value: 'test' } });
    await waitFor(() => expect(searchMovies).toHaveBeenCalled());
  });

  it('displays modal on MovieCard click', async () => {
    // click on movie card
    fireEvent.click(container.querySelector(`div[class^="movie_card"]`));

    // wait for modal to appear, and check that it is visible
    const modal = await container.querySelector(`div[class="modal"]`);
    expect(modal).not.toBeNull();
  });

  it('closes modal on x button click', async () => {
    // click on movie card
    fireEvent.click(container.querySelector(`div[class^="movie_card"]`));

    // wait for modal to appear, and check that it is visible
    const modal = await container.querySelector(`div[class="modal"]`);
    expect(modal).not.toBeNull();

    // click on x button
    fireEvent.click(container.querySelector(`div[class="modal_close"]`));
    expect(modal).toBeNull();
  });

  it('closes modal on background click', async () => {
    // click on movie card
    fireEvent.click(container.querySelector(`div[class^="movie_card"]`));

    // wait for modal to appear, and check that it is visible
    const modal = await container.querySelector(`div[class="modal"]`);
    expect(modal).not.toBeNull();

    // closes modal on modal background click
    fireEvent.click(container.querySelector(`div[class="modal_background"]`));
    expect(modal).toBeNull();
  });
});
