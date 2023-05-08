import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import Itinerary1 from './components/Itinerary1';
import CityContext from './context/CityContext';

function App() {
  const [city, setCity] = useState('');

  return (
    <CityContext.Provider value={{ cityName: city, setCityName: setCity }}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<SearchBar></SearchBar>}></Route>
            <Route path="itinerary" element={<Itinerary1></Itinerary1>}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </CityContext.Provider>
  );
}

export default App;
