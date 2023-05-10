import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { fetchData } from '../tools/fonctions';
import Itinerary from '../components/Itinerary';
import { act } from 'react-dom/test-utils';

jest.mock('../tools/fonctions', () => ({
  fetchData: jest.fn(),
  parsingCity: jest.fn(),
}));

describe('Itinerary component', () => {
  beforeEach(() => {
    render(<Itinerary />);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders departure and destination text fields', () => {
    expect(
      screen.getByPlaceholderText("D'où partons-nous ?")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Où allons-nous ?')).toBeInTheDocument();
  });

  it('calls fetchData when input values change', () => {
    const departureInput = screen.getByPlaceholderText("D'où partons-nous ?");
    const destinationInput = screen.getByPlaceholderText('Où allons-nous ?');

    act(() => {
      userEvent.type(departureInput, 'Paris');
    });
    expect(fetchData).toHaveBeenCalledWith(
      expect.stringContaining('Paris'),
      expect.any(Function)
    );

    act(() => {
      userEvent.type(destinationInput, 'London');
    });
    expect(fetchData).toHaveBeenCalledWith(
      expect.stringContaining('London'),
      expect.any(Function)
    );
  });

  it('exchanges departure and destination values when exchange button is clicked', () => {
    const departureInput = screen.getByPlaceholderText("D'où partons-nous ?");
    const destinationInput = screen.getByPlaceholderText('Où allons-nous ?');
    const exchangeButton = screen.getByRole('button');

    act(() => {
      userEvent.type(departureInput, 'Paris');
      userEvent.type(destinationInput, 'London');
      fireEvent.click(exchangeButton);
    });
    expect(departureInput).toHaveValue('London');
    expect(destinationInput).toHaveValue('Paris');
  });
});
