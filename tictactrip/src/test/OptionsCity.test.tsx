import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import OptionsCity from '../components/OptionsCity';
import CityContext from '../context/CityContext';

describe('OptionsCity', () => {
  const props = {
    local_name: 'Paris, Île-de-France, France',
    setChoosen: jest.fn(),
    isContextUsed: false,
    setLocation: jest.fn(),
  };

  beforeEach(() => {
    render(<OptionsCity {...props} />);
  });

  test('renders city name and location', () => {
    const cityName = screen.getByText('Paris');
    const location = screen.getByText('(Île-de-France, France)');
    expect(cityName).toBeInTheDocument();
    expect(location).toBeInTheDocument();
  });

  test('calls setChoosen and setLocation when clicked', () => {
    const option = screen.getByTestId('option');
    fireEvent.click(option);
    expect(props.setChoosen).toHaveBeenCalledWith(true);
    expect(props.setLocation).toHaveBeenCalledWith(
      'Paris, Île-de-France, France'
    );
  });
});

describe('OptionsCity and ContextCity', () => {
  const mockSetCityName = jest.fn();

  const MockCityContextProvider: React.FC = ({ children }: any) => {
    const mockCityContextValue: any = {
      setCityName: mockSetCityName,
    };

    return (
      <CityContext.Provider value={mockCityContextValue}>
        {children}
      </CityContext.Provider>
    );
  };

  const props = {
    local_name: 'Paris',
    setChoosen: jest.fn(),
    isContextUsed: true,
    setLocation: jest.fn(),
  };

  test('calls setCityName when clicked and isContextUsed is true', () => {
    render(
      <MockCityContextProvider>
        <OptionsCity {...props} />
      </MockCityContextProvider>
    );

    const option = screen.getByTestId('option');
    fireEvent.click(option);
    expect(props.setChoosen).toHaveBeenCalledWith(true);
    expect(mockSetCityName).toHaveBeenCalledWith('Paris');
  });
});
