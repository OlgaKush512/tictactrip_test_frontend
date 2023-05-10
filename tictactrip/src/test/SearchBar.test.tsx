import {
  render,
  fireEvent,
  RenderResult,
  screen,
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter as Router } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

describe('SearchBar', () => {
  test('renders input element', () => {
    const { getByPlaceholderText }: RenderResult = render(
      <Router>
        <SearchBar />
      </Router>
    );
    const inputElement = getByPlaceholderText(
      'Une destination, demande...'
    ) as HTMLInputElement;
    expect(inputElement).toBeInTheDocument();
  });

  test('handles input change', () => {
    const { getByPlaceholderText }: RenderResult = render(
      <Router>
        <SearchBar />
      </Router>
    );
    const inputElement = getByPlaceholderText(
      'Une destination, demande...'
    ) as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 'London' } });
    expect(inputElement.value).toBe('London');
  });
});
