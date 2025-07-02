import React, { useState } from 'react';
import './App.css';
import { API_KEY } from './config';

function App() {
  const [city, setCity] = useState('');
  const [temperature, setTemperature] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to process forecast data and group by day
  const processForecastData = (forecastList) => {
    const dailyData = {};
    
    forecastList.forEach(item => {
      const date = new Date(item.dt * 1000);
      const dateKey = date.toDateString();
      
      if (!dailyData[dateKey]) {
        dailyData[dateKey] = {
          date: dateKey,
          temps: [],
          conditions: [],
          icons: []
        };
      }
      
      dailyData[dateKey].temps.push(item.main.temp);
      dailyData[dateKey].conditions.push(item.weather[0].description);
      dailyData[dateKey].icons.push(item.weather[0].icon);
    });
    
    // Convert to array and calculate min/max for each day
    return Object.values(dailyData).slice(0, 5).map(day => ({
      date: day.date,
      minTemp: Math.round(Math.min(...day.temps)),
      maxTemp: Math.round(Math.max(...day.temps)),
      condition: day.conditions[0], // Take first condition of the day
      icon: day.icons[0] // Take first icon of the day
    }));
  };

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    try {
      // Fetch current weather
      const currentResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      const currentData = await currentResponse.json();
      
      // Fetch 5-day forecast
      const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`);
      const forecastData = await forecastResponse.json();
      
      if (currentData.main && forecastData.list) {
        setTemperature(currentData.main.temp);
        
        // Process forecast data - group by day
        const processedForecast = processForecastData(forecastData.list);
        setForecast(processedForecast);
      } else {
        alert('City not found');
        setTemperature(null);
        setForecast(null);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      alert('Failed to fetch weather data');
      setTemperature(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Weather App</h1>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
        <img src="https://img.icons8.com/ios/100/000000/partly-cloudy-day--v1.png" alt="Cloud and Sun" style={{ marginRight: '10px' }} />
      </div>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ padding: '10px', fontSize: '16px' }}
      />
      <button onClick={fetchWeather} style={{ marginLeft: '10px', padding: '10px', fontSize: '16px' }} disabled={loading}>
        {loading ? 'Loading...' : 'Get Weather'}
      </button>
      {temperature !== null && (
        <h2 style={{ marginTop: '20px' }}>The temperature in {city} is {temperature}°C</h2>
      )}
      
      {forecast && forecast.length > 0 && (
        <div style={{ marginTop: '30px' }}>
          <h3>5-Day Forecast</h3>
          <div className="forecast-container">
            {forecast.map((day, index) => (
              <div key={index} className="forecast-day">
                <div className="forecast-date">
                  {new Date(day.date).toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </div>
                <img 
                  src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                  alt={day.condition}
                  className="forecast-icon"
                />
                <div className="forecast-condition">{day.condition}</div>
                <div className="forecast-temps">
                  <span className="max-temp">{day.maxTemp}°</span>
                  <span className="min-temp">{day.minTemp}°</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
