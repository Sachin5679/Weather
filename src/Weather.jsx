import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    // const url = `https://api.openweathermap.org/data/2.5/weather?q=Dubai&appid=02120766642928fcd2382852eb1eac7a`;
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

    const handleSearch = async (e) => {
        e.preventDefault();
        if (city.trim() === '') {
            return;
        }


      
        setIsLoading(true);
        try {
            const repsonse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
            setWeatherData(repsonse.data);
        } catch(err) {
            console.log(err);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        if (weatherData) {
            setCity('');
        }
    }, [weatherData]);

    const { main, weather, name} = weatherData || {}; 
    let weatherIcon = null;
    if (weather && weather.length > 0) {
        const iconCode = weather[0].icon;
        weatherIcon = `http://openweathermap.org/img/w/${iconCode}.png`;
    }

  return (
    <div className='flex flex-col p-5 m-5 justify-center'>
    
      <form className='flex justify-center pb-4' onSubmit={handleSearch}>
        <input 
            className='p-2 mr-4 w-3/4 rounded-lg outline'
            type="text" placeholder='Enter a city'
            value={city}
            onChange={(e) => setCity(e.target.value)}
        />
        <input className='p-2 w-1/4 bg-teal-600 text-white rounded-lg' type="submit"/>
      </form>
      {isLoading && <div>Loading...</div>}
      <h2 className='text-5xl font-black'>{name}</h2>
      {main && <p className='text-5xl'>{main.temp} C</p>}
      {weather && weather.length > 0 && <h3 className=''>{weather[0].main}</h3>}
      {/* {main && <p>Humidity: {main.humidity}</p>} */}
      
    </div>
  )
}

export default Weather
