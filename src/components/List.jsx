import React, { useEffect, useState } from 'react';
import Card from './Card';

const List = ({ flights, searchData }) => {
  const [departureFlights, setDepartureFlights] = useState([]);
  const [returnFlights, setReturnFlights] = useState([]);
  const [message, setMessage] = useState('');

  function convertFlightDate(date) {
    var newFormat = date.split('T')[0];
    return newFormat;
  }

  function convertSearchDate(date) {
    const dateObject = new Date(date);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const day = String(dateObject.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    if (!searchData.fromValue) {
      setMessage('Welcome to FlightSeeker 🌍');
      setDepartureFlights([]);
      setReturnFlights([]);
      return;
    }

    if (searchData.selectedOption === 'oneWay') {
      const filteredDepartureFlights = flights.filter((flight) => {
        const departureDate = convertFlightDate(flight.departure_time);

        const originCity = flight.origin.city_name;
        const destinationCity = flight.destination.city_name;

        return (
          originCity.toLowerCase() === searchData.fromValue.toLowerCase() &&
          destinationCity.toLowerCase() === searchData.toValue.toLowerCase() &&
          departureDate === convertSearchDate(searchData.departureDate)
        );
      });

      setDepartureFlights(filteredDepartureFlights);
      setReturnFlights([]);
      setMessage(
        filteredDepartureFlights.length > 0 ? '' : 'No search results found'
      );
    } else {
      const filteredDepartureFlights = flights.filter((flight) => {
        const departureDate = convertFlightDate(flight.departure_time);

        const originCity = flight.origin.city_name;
        const destinationCity = flight.destination.city_name;

        return (
          originCity.toLowerCase() === searchData.fromValue.toLowerCase() &&
          destinationCity.toLowerCase() === searchData.toValue.toLowerCase() &&
          departureDate === convertSearchDate(searchData.departureDate)
        );
      });

      const filteredReturnFlights = flights.filter((flight) => {
        const departureDate = convertFlightDate(flight.departure_time);

        const originCity = flight.origin.city_name;
        const destinationCity = flight.destination.city_name;

        return (
          originCity.toLowerCase() === searchData.toValue.toLowerCase() &&
          destinationCity.toLowerCase() ===
            searchData.fromValue.toLowerCase() &&
          departureDate === convertSearchDate(searchData.returnDate)
        );
      });
      setDepartureFlights(filteredDepartureFlights);
      setReturnFlights(filteredReturnFlights);
      setMessage(
        filteredDepartureFlights.length > 0 || filteredReturnFlights.length > 0
          ? ''
          : 'No search results found'
      );
    }
  }, [flights, searchData]);

  return (
    <div>
      <ul className='no-scrollbar overflow-y-auto max-h-96 list-none rounded-xl z-0'>
        {message ? (
          <div className='flex items-center justify-center p-8'>
            <p>{message}</p>
          </div>
        ) : searchData.selectedOption === 'oneWay' ? (
          departureFlights.map((flight, i) => (
            <Card flight={flight} key={i} direction='Departure' />
          ))
        ) : (
          <>
            {departureFlights.map((flight, i) => (
              <Card flight={flight} key={i} direction='Departure' />
            ))}
            {returnFlights.map((flight, i) => (
              <Card flight={flight} key={i} direction='Return' />
            ))}
          </>
        )}
      </ul>
    </div>
  );
};

export default List;
