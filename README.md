# Weather App

This is an interactive Weather App built using Vite and React. Users can input a city name to get the current temperature and a 5-day weather forecast for the city.

## Features
- Input city name to fetch weather data.
- Displays the current temperature of the city.
- Shows a 5-day weather forecast with:
  - Daily minimum and maximum temperatures
  - Weather conditions with descriptive icons
  - Easy-to-read date format
- Responsive design that works on mobile and desktop devices
- Loading states and error handling for better user experience

## Getting Started

### Prerequisites
- Node.js and npm installed on your system.

### Installation
1. Clone the repository or download the project.
2. Navigate to the project directory.
3. Run `npm install` to install dependencies.

### Running the App
Run the following command to start the development server:
```
npm run dev
```

Open your browser and navigate to the provided local development URL.

## API Key Setup

This app uses the OpenWeatherMap API to fetch current weather data and 5-day forecasts. To make it work:
1. Sign up at [OpenWeatherMap](https://openweathermap.org/) and get your API key.
2. Replace the API key in `src/config.js` with your actual API key.

The app uses two OpenWeatherMap endpoints:
- Current weather: `https://api.openweathermap.org/data/2.5/weather`
- 5-day forecast: `https://api.openweathermap.org/data/2.5/forecast`

## License
This project is licensed under the MIT License.
