import List from './components/List';
import Search from './components/Search';
import mockData from '../src/data/data.json';
import { useState } from 'react';
import Logo from './components/Logo';

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
    <div className='bg-gradient-to-br from-cyan-200 to-sky-700 min-h-screen flex flex-col lg:justify-center items-center'>
      <Logo />
      <div className='flex flex-col backdrop-blur-3xl bg-white/30 p-4 rounded-3xl w-full sm:w-2/3 md:w-5/6 lg:w-2/3'>
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
