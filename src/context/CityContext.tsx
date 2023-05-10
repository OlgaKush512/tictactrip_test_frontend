import { createContext } from 'react';
import { City } from '../tools/fonctions';

const CityContext = createContext({
  cityName: { city_id: 0, local_name: '', unique_name: '' },
  setCityName: (city: City): void => {},
});

export default CityContext;
