import { createContext } from 'react';

const CityContext = createContext({
  cityName: '',
  setCityName: (name: string): void => {},
});

export default CityContext;
