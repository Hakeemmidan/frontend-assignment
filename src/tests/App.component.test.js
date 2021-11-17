import React from 'react';
import { render, screen, fireEvent, waitFor  } from '@testing-library/react';
import ReactDOM from 'react-dom';
import App from '../components/App';
import { AppContextProvider } from '../contexts/AppContext';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <AppContextProvider>
      <App />
    </AppContextProvider>
    ,div
  );
});

describe('on App render', () => {
  let container;

  beforeEach(async () => {
    ({ container } = render(
      <AppContextProvider>
        <App />
      </AppContextProvider>
    ));
    await waitFor(() => expect(container.querySelector('[data-testid="movie_card"]')).not.toBeNull());
  });
  
  it('renders Timescale <img> logo', () => {
    expect(container.querySelector(`img[alt="Timescale logo"]`)).not.toBeNull(); // checks that logo is an <img> tag
    expect(screen.getByAltText('Timescale logo')).toBeDefined(); // checks alt text
  });

  it('renders movie list', () => {
    expect(
      container.querySelectorAll('[data-testid="movie_card"]').length
    ).toBeGreaterThan(0);
  });

  it('renders search field full component', () => {
    expect(
      container.querySelector('[data-testid="search_field"]')
    ).not.toBeNull();
  });

  it('changes search field input value on field change', async () => {
    const searchFieldInput = await container.querySelector(
      '[data-testid="search_field_input"]'
    );
    expect(searchFieldInput).not.toBeNull();

    fireEvent.change(searchFieldInput, { target: { value: 'test' } });
    await waitFor(() => expect(searchFieldInput.value).toBe('test'));
  });

  it('displays modal on MovieCard click', async () => {
    // click on movie card
    fireEvent.click(container.querySelector('[data-testid="movie_card"]'));

    // wait for modal to appear, and check that it is visible
    const modal = await container.querySelector('[data-testid="modal_child"]');
    expect(modal).not.toBeNull();
  });

  it('closes modal on x button click', async () => {
    // click on movie card
    fireEvent.click(container.querySelector('[data-testid="movie_card"]'));

    // wait for modal to appear, and check that it is visible
    let modal = await container.querySelector('[data-testid="modal_child"]');
    expect(modal).not.toBeNull();

    // click on x button
    fireEvent.click(container.querySelector('[data-testid="modal_close"]'));
    modal = await container.querySelector('[data-testid="modal_child"]');
    await waitFor(() => expect(modal).toBeNull());
  });

  it('closes modal on background click', async () => {
    // click on movie card
    fireEvent.click(container.querySelector('[data-testid="movie_card"]'));

    // wait for modal to appear, and check that it is visible
    let modal = await container.querySelector('[data-testid="modal_child"]');
    expect(modal).not.toBeNull();

    // closes modal on modal background click
    fireEvent.click(container.querySelector('[data-testid="modal_background"]'));
    modal = await container.querySelector('[data-testid="modal_child"]');
    await waitFor(() => expect(modal).toBeNull());
  });
});
