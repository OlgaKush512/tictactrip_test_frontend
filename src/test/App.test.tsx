import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders learn react link', () => {
  render(<App />);
  const textRecherche = screen.getByText(
    /Recherchez vos voyages, trajets courts et bien plus encore.../i
  );
  expect(textRecherche).toBeInTheDocument();
});
