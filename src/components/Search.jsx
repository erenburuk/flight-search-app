import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Search = ({ cities, onSearchSubmit }) => {
  const [selectedOption, setSelectedOption] = useState('roundTrip');
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [error, setError] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    if (event.target.value === 'oneWay') setReturnDate(null);
    setError('');
  };

  const handleSelectChange = (value, setValue) => {
    setValue(value);
    setError('');
  };

  const handleSwapClick = () => {
    let temp = fromValue;
    setFromValue(toValue);
    setToValue(temp);
  };

  const handleDepartureDate = (date) => {
    setDepartureDate(date);
    setError('');
  };

  const handleReturnDate = (date) => {
    setReturnDate(date);
    setError('');
  };

  const handleSearchSubmit = () => {
    if (!fromValue || !toValue || !departureDate) {
      setError('⛔ Error! All information must be filled out.');
      return;
    }
    if (fromValue === toValue) {
      setError('⛔ Error! Origin and destination cities must be different.');
      return;
    }

    if (selectedOption === 'roundTrip' && !returnDate) {
      setError('⛔ Error! Return date must be filled out for round trip.');
      return;
    }

    if (selectedOption === 'roundTrip' && departureDate > returnDate) {
      setError('⛔ Error! Invalid date selection.');
      return;
    }

    const searchData = {
      selectedOption,
      fromValue,
      toValue,
      departureDate,
      returnDate,
    };

    onSearchSubmit(searchData);
  };

  return (
    <div className='flex flex-row items-center backdrop-blur-3xl bg-white/50 rounded-xl mb-8 p-8 z-10'>
      <div className='w-full mr-10'>
        <div className='flex items-start justify-between mb-3'>
          <div>
            <label className='mr-4 cursor-pointer'>
              <input
                type='radio'
                value='roundTrip'
                checked={selectedOption === 'roundTrip'}
                onChange={handleOptionChange}
                className='mr-2 accent-slate-700'
              />
              Round Trip
            </label>
            <label className='cursor-pointer'>
              <input
                type='radio'
                value='oneWay'
                checked={selectedOption === 'oneWay'}
                onChange={handleOptionChange}
                className='mr-2 accent-slate-700'
              />
              One-way
            </label>
          </div>
          {error && <p className='text-red-600'>{error}</p>}
        </div>
        <div className='flex flex-row justify-start items-center'>
          <div className='flex flex-row items-center gap-2 mr-5'>
            <select
              className='rounded-xl p-3 w-40 outline-sky-200 cursor-pointer'
              placeholdertext='From'
              value={fromValue}
              onChange={(e) => handleSelectChange(e.target.value, setFromValue)}
            >
              <option value='' disabled>
                From
              </option>
              {cities.map((city, i) => (
                <option key={i} value={city.city_name}>
                  {city.city_name} ({city.airport_code})
                </option>
              ))}
            </select>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='w-6 h-6 cursor-pointer'
              onClick={handleSwapClick}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5'
              />
            </svg>

            <select
              className='rounded-xl p-3 w-40 outline-sky-200 cursor-pointer'
              placeholdertext='To'
              value={toValue}
              onChange={(e) => handleSelectChange(e.target.value, setToValue)}
            >
              <option value='' disabled>
                To
              </option>
              {cities.map((city, i) => (
                <option key={i} value={city.city_name}>
                  {city.city_name} ({city.airport_code})
                </option>
              ))}
            </select>
          </div>
          <div className='flex flex-row items-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='w-6 h-6 mr-2'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z'
              />
            </svg>

            <DatePicker
              selected={departureDate}
              onChange={handleDepartureDate}
              dateFormat='dd/MM/yyyy'
              placeholdertext='Departure date'
              className='z-10 mr-2 rounded-xl w-40 h-10 px-4 border border-gray-300 outline-sky-200'
            />
            <DatePicker
              selected={returnDate}
              onChange={handleReturnDate}
              dateFormat='dd/MM/yyyy'
              placeholdertext='Return date'
              className={`rounded-xl w-40 h-10 px-4 border border-gray-300 outline-sky-200 ${
                selectedOption === 'oneWay' ? 'hidden' : ''
              }`}
            />
          </div>
        </div>
      </div>
      <button
        className='bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white rounded-xl px-6 py-5 flex items-center'
        onClick={handleSearchSubmit}
      >
        <span className='mr-2 text-xl'>Search</span>
        <span className='text-2xl'>✈</span>
      </button>
    </div>
  );
};

export default Search;
