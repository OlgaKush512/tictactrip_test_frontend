import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import Itinerary1 from './components/Itinerary1';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<SearchBar></SearchBar>}></Route>
          <Route path="itinerary" element={<Itinerary1></Itinerary1>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
