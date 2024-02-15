import { useState } from 'react';
import DatePicker from 'react-datepicker';
import useWindowDimensions from '../utils/useWindowDimensions';
import 'react-datepicker/dist/react-datepicker.css';
import './customDatePickerWidth.css';

const Search = ({ cities, onSearchSubmit }) => {
  const [selectedOption, setSelectedOption] = useState('roundTrip');
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [error, setError] = useState('');
  const { height, width } = useWindowDimensions();

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
    <div className='flex flex-col lg:flex-row items-center backdrop-blur-3xl bg-white/50 rounded-xl mb-8 p-8 z-10'>
      <div className='w-full lg:mr-10'>
        <div className='flex flex-col items-center text-center lg:text-start lg:items-start lg:justify-between mb-3'>
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
                className='mb-2 lg:mb-0 lg:mr-2 accent-slate-700'
              />
              One-way
            </label>
          </div>
          {error && <p className='text-red-600 mb-2 lg:mb-0'>{error}</p>}
        </div>
        <div className='flex flex-col gap-3 justify-center min-[1500px]:flex-row lg:justify-start items-center'>
          <div className='flex w-full items-center gap-2 lg:mb-0 min-[1500px]:mr-8'>
            <select
              className='rounded-xl p-3 w-full lg:w-40 outline-sky-200 cursor-pointer'
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
              className='w-12 h-12 lg:w-6 lg:h-6 cursor-pointer'
              onClick={handleSwapClick}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5'
              />
            </svg>

            <select
              className='rounded-xl p-3 w-full lg:w-40 outline-sky-200 cursor-pointer'
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
          <div className='flex w-full gap-9 lg:gap-10 min-[1500px]:gap-3 mb-6 lg:mb-0'>
            <div className={width < 1024 ? `customDatePickerWidth` : ``}>
              <DatePicker
                selected={departureDate}
                onChange={handleDepartureDate}
                dateFormat='dd/MM/yyyy'
                placeholderText='Departure date'
                enableTabLoop={false}
                className='rounded-xl h-10 px-4 border border-gray-300 outline-sky-200 w-full lg:w-40'
              />
            </div>
            {selectedOption !== 'oneWay' && (
              <div className={width < 1024 ? `customDatePickerWidth` : ``}>
                <DatePicker
                  selected={returnDate}
                  onChange={handleReturnDate}
                  dateFormat='dd/MM/yyyy'
                  placeholderText='Return date'
                  enableTabLoop={false}
                  className='rounded-xl h-10 px-4 border border-gray-300 outline-sky-200 w-full lg:w-40'
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <button
        className='bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white rounded-xl px-4 py-2 lg:px-6 lg:py-5 flex items-center'
        onClick={handleSearchSubmit}
      >
        <span className='mr-2 text-lg lg:text-xl'>Search</span>
        <span className='text-xl lg:text-2xl'>✈</span>
      </button>
    </div>
  );
};

export default Search;
