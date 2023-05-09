import { render, screen, fireEvent } from '@testing-library/react';
import PoperBoard from '../components/PoperBoard';

describe('PoperBoard', () => {
  const mockSetOpen = jest.fn();
  const mockSetChoosen = jest.fn();
  const mockSetLocation = jest.fn();

  const props = {
    setOpen: mockSetOpen,
    popperWidth: 300,
    objective: 'Select a city',
    data: [
      { city_id: 1, local_name: 'City 1' },
      { city_id: 2, local_name: 'City 2' },
      { city_id: 3, local_name: 'City 3' },
    ],
    setChoosen: mockSetChoosen,
    open: true,
    anchorEl: document.createElement('div'),
    placement: 'bottom-start',
    isContextUsed: true,
    setLocation: mockSetLocation,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

    test('renders PoperBoard component with options', () => {
      render(<PoperBoard {...props} />);

      expect(screen.getByText('Select a city')).toBeInTheDocument();
      expect(screen.getAllByRole('option')).toHaveLength(3);
    });

  test('calls setOpen when ClickAwayListener is clicked', () => {
    render(<PoperBoard {...props} />);

    fireEvent.click(screen.getByTestId('poper'));

    expect(mockSetOpen).toHaveBeenCalledTimes(1);
    expect(mockSetOpen).toHaveBeenCalledWith(false);
  });
});
