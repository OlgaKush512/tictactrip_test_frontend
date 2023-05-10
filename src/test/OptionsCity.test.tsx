import { render, screen, fireEvent } from '@testing-library/react';
import OptionsCity from '../components/OptionsCity';

describe('OptionsCity', () => {
  const props = {
    local_name: 'Paris, Île-de-France, France',
    unique_name: 'paris',
    setChoosen: jest.fn(),
    isContextUsed: false,
    setLocation: jest.fn(),
    setOpen: jest.fn(),
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
    expect(props.setLocation).toHaveBeenCalledWith({
      city_id: 0,
      local_name: 'Paris, Île-de-France, France',
      unique_name: 'paris',
    });
  });
});
