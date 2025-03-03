import React from 'react';
import { render, screen } from '@testing-library/react';
<<<<<<< HEAD
import { App } from './App';
=======
import App from './App';
>>>>>>> accbadc64827a41985acc1227965f9c9da43f30f

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
