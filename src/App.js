import List from './components/List';
import Search from './components/Search';
import mockData from '../src/data/data.json';
import { useState } from 'react';

function App() {
  const cities = mockData.cities;
  const flights = mockData.flights;

  const [searchData, setSearchData] = useState({
    selectedOption: '',
    fromValue: '',
    toValue: '',
    departureDate: null,
    returnDate: null,
  });

  const handleSearchSubmit = (data) => {
    setSearchData(data);
  };

  return (
    <div className='bg-gradient-to-br from-cyan-200 to-sky-700 h-screen flex flex-col justify-center items-center'>
      <div className='fixed top-0 left-50 flex items-center pt-8'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='64'
          height='64'
          viewBox='0 0 26 26'
          className='mr-4'
        >
          <path d='M 22.25 2.03125 C 21.605 2.0913594 20.9235 2.26575 20.1875 2.59375 C 20.1875 2.59375 5.35925 9.20425 4.90625 9.40625 C 4.45425 9.60925 4.14075 9.3755 3.71875 9.0625 C 2.98375 8.5225 1.8955 7.758 1.5625 7.5 C 1.0365 7.097 -0.26725 7.34625 0.09375 8.15625 C 0.45275 8.96425 1.575 11.4835 2 12.4375 C 2.626 13.8375 5.8795 13.50275 11.5625 10.96875 C 12.046444 10.75282 12.67465 10.461757 13.21875 10.21875 L 11.78125 17.875 C 11.59625 18.618 11.78625 18.82675 12.03125 18.71875 L 12.875 18.34375 C 13.311 18.14875 13.91575 17.4705 14.21875 16.8125 L 18.34375 7.90625 C 22.45341 5.9852825 26.214986 4.0596259 25.9375 3.4375 C 25.609 2.70025 24.185 1.8509219 22.25 2.03125 z M 7.03125 3.0625 C 6.661375 3.056 6.3435 3.0905 6.125 3.1875 L 5.28125 3.5625 C 5.03725 3.6715 5.073 3.9515 5.75 4.3125 L 9.15625 6.375 L 12.9375 4.6875 L 8.15625 3.21875 C 7.81025 3.11275 7.401125 3.069 7.03125 3.0625 z M 0.8125 24 A 1.001098 1.001098 0 0 0 1 26 L 25 26 A 1.0001 1.0001 0 1 0 25 24 L 1 24 A 1.0001 1.0001 0 0 0 0.90625 24 A 1.001098 1.001098 0 0 0 0.8125 24 z M 902 1469 L 902 1471 L 928 1471 L 928 1469 L 902 1469 z M 906 1474 L 906 1476 L 924 1476 L 924 1474 L 906 1474 z M 902 1479 L 902 1481 L 928 1481 L 928 1479 L 902 1479 z M 906 1484 L 906 1486 L 924 1486 L 924 1484 L 906 1484 z M 902 1489 L 902 1491 L 928 1491 L 928 1489 L 902 1489 z' />
        </svg>
        <h1 className='text-3xl'>FlightSeeker</h1>
      </div>
      <div className='flex flex-col backdrop-blur-3xl bg-white/30 w-2/3 p-4 rounded-3xl'>
        <Search
          cities={cities}
          searchData={searchData}
          onSearchSubmit={handleSearchSubmit}
        />
        <List flights={flights} searchData={searchData} />
      </div>
    </div>
  );
}

export default App;
