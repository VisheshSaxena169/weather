# Weather Now

A simple React app that shows current weather for any city using Open-Meteo API.

## Features
- City search (uses Open-Meteo geocoding API)
- Current weather (temperature, wind, condition)
- Recent searches (localStorage)
- Responsive UI
- No API key required

## Tech
- React (Vite)
- Open-Meteo APIs (geocoding + current weather)
- Plain CSS

## Run locally
1. `npm install`
2. `npm run dev`
3. Open http://localhost:5173

## Live demo
weather-eosin-kappa.vercel.app

## Notes
- Weather codes mapping in `src/utils/weatherUtils.js`
- The app handles basic errors and shows loading state
