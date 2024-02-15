import useWindowDimensions from '../utils/useWindowDimensions';

const Card = ({ flight, direction }) => {
  const airlineLogos = {
    'Turkish Airlines': 'turkish-airlines.png',
    AtlasGlobal: 'atlasglobal.png',
    SunExpress: 'sunexpress.png',
    'Pegasus Airlines': 'pegasus-airlines.png',
    AnadoluJet: 'anadolujet.png',
  };

  const { height, width } = useWindowDimensions();

  function formatDate(inputDate) {
    const options = {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    };

    const formattedDate = new Date(inputDate).toLocaleDateString(
      'en-US',
      options
    );

    return formattedDate;
  }

  const formatTime = (dateString) => {
    const optionsTime = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    };

    const dateObject = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', optionsTime).format(dateObject);
  };

  return (
    <li className='mb-2 z-0'>
      <div className='flex flex-col backdrop-blur-3xl bg-white/10 rounded-xl'>
        <div className='flex flex-col gap-8 md:flex-row justify-between items-center md:px-8 py-4'>
          <img
            src={`images/${airlineLogos[flight.airline]}`}
            alt={`${flight.airline} Logo`}
            className='w-36 md:w-28 min-[1300px]:w-36'
          />
          <div className='flex justify-between items-center gap-6'>
            <div className='flex flex-col justify-end'>
              <p className='font-semibold text-2xl md:text-xl xl:text-2xl'>
                {formatTime(flight.departure_time)}
              </p>
              <p className='font-normal text-lg md:text-base xl:text-lg'>
                {flight.origin.airport_code}
              </p>
            </div>

            <div className='relative'>
              <div className='absolute top-1/2 transform -translate-y-1/2 left-0 w-2 h-2 border-2 border-gray-800 rounded-full'></div>
              <div className='h-0.5 bg-gray-600 w-16 md:w-24 lg:w-32 xl:w-64 mx-2'></div>
              <div className='absolute top-1/2 transform -translate-y-1/2 right-0 w-2 h-2 border-2 border-gray-800 rounded-full'></div>
            </div>

            <div className='flex flex-col justify-end'>
              <p className='font-semibold text-2xl md:text-xl xl:text-2xl'>
                {formatTime(flight.arrival_time)}
              </p>
              <p className='font-normal text-lg md:text-base xl:text-lg'>
                {flight.destination.airport_code}
              </p>
            </div>
          </div>

          {width < 768 && (
            <div className='flex justify-between items-center text-xs border-t border-b border-gray-600 w-full py-2 px-1 font-semibold'>
              <p className='flex'>
                <span>🛫</span> <span>{direction}</span>
              </p>
              <p>
                <span>{flight.origin.city_name}</span>-
                <span>{flight.destination.city_name}</span>
              </p>
              <p className='flex'>
                <span>🕔</span> <span>{flight.duration}</span>
              </p>
              <p>{formatDate(flight.departure_time)}</p>
            </div>
          )}

          <button className='bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white flex flex-row items-center justify-center pl-3 py-1 xl:pl-6 xl:py-3 rounded-xl'>
            <div className='flex flex-col items-start mr-2 md:mr-4'>
              <p>
                <span className='text-base md:text-lg font-bold'>
                  {flight.price}
                </span>
                <span>₺</span>
              </p>
              <span className='text-sm md:text-base font-light'>Buy</span>
            </div>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6 md:mr-2'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='m8.25 4.5 7.5 7.5-7.5 7.5'
              />
            </svg>
          </button>
        </div>

        {width >= 768 && (
          <div className='flex justify-between text-xs border-t border-gray-600 px-2 py-2 font-semibold'>
            <div className='flex gap-1 md:gap-4'>
              <p className='flex'>
                <span>🛫</span> <span>{direction}</span>
              </p>
              <p className='flex flex-row items-center'>
                <span>{flight.origin.city_name}</span>-
                <span>{flight.destination.city_name}</span>
              </p>
              <p className='flex'>
                <span>🕔</span> <span>{flight.duration}</span>
              </p>
            </div>
            <p className='text-end font-semibold'>
              {formatDate(flight.departure_time)}
            </p>
          </div>
        )}
      </div>
    </li>
  );
};

export default Card;
