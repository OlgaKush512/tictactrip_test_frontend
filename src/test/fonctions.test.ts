import { fetchData, parsingCity, City } from '../tools/fonctions';

describe('testing of fetchData() fonction', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock) = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([{ city_id: 1, local_name: 'City 1' }] as City[]),
      })
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should fetch data and set results', async () => {
    const setResultsMock: React.Dispatch<React.SetStateAction<City[]>> =
      jest.fn();
    const url = 'https://example.com';
    await fetchData(url, setResultsMock);
    await new Promise((resolve) => setTimeout(resolve, 0)); // to wait for the results of fetchData.
    expect(global.fetch).toHaveBeenCalledWith(url, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': 'https://mywebsite.com',
      },
    });

    expect(setResultsMock).toHaveBeenCalledWith([
      { city_id: 1, local_name: 'City 1' },
    ]);
  });

  it('should handle error when fetch fails', async () => {
    const setResultsMock: jest.Mock<void> = jest.fn();

    (global.fetch as jest.Mock) = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 404,
      })
    );

    console.error = jest.fn();
    const url = 'https://example.com/';
    await fetchData(url, setResultsMock);
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(global.fetch).toHaveBeenCalledWith(url, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': 'https://mywebsite.com',
      },
    });

    expect(setResultsMock).not.toHaveBeenCalled();
  });
});

describe('testing of parsingCity() fonction', () => {
  it('should split location string into words', () => {
    const location = 'New York, USA';
    const result = parsingCity(location);
    expect(result).toEqual(['New', 'York', 'USA']);
  });

  it('should handle empty location string', () => {
    const location = '';
    const result = parsingCity(location);
    expect(result).toEqual(['']);
  });

  it('should handle location string without a separator', () => {
    const location = 'Enghien-les-Bains';
    const result = parsingCity(location);
    expect(result).toEqual(['Enghien-les-Bains']);
  });
});
