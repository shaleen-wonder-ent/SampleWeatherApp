import React, { useState } from 'react';
import './App.css';
import { API_KEY } from './config';

function App() {
  const [city, setCity] = useState('');
  const [temperature, setTemperature] = useState(null);

  const fetchWeather = async () => {
    if (!city) return;
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      const data = await response.json();
      if (data.main) {
        setTemperature(data.main.temp);
      } else {
        alert('City not found');
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      alert('Failed to fetch weather data');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ padding: '10px', fontSize: '16px' }}
      />
      <button onClick={fetchWeather} style={{ marginLeft: '10px', padding: '10px', fontSize: '16px' }}>
        Get Temperature
      </button>
      {temperature !== null && (
        <h2 style={{ marginTop: '20px' }}>The temperature in {city} is {temperature}°C</h2>
      )}
    </div>
  );
}

export default App;
