import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import RecentSearches from "./components/RecentSearches";

const GEOCODE_URL = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

function App(){
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [recent, setRecent] = useState(() => {
    try { return JSON.parse(localStorage.getItem("wn_recent") || "[]"); } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem("wn_recent", JSON.stringify(recent));
  }, [recent]);

  async function fetchCoordinates(city){
    const url = `${GEOCODE_URL}?name=${encodeURIComponent(city)}&count=5&language=en&format=json`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Geocoding failed");
    const data = await res.json();
    if (!data.results || data.results.length === 0) throw new Error("City not found");
    return data.results[0]; // choose first result
  }

  async function fetchWeather(lat, lon, timezone){
    const url = `${WEATHER_URL}?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=${encodeURIComponent(timezone || "auto")}`;
    const res = await fetch(url);
    if(!res.ok) throw new Error("Weather fetch failed");
    const data = await res.json();
    return data.current_weather;
  }

  async function handleSearch(city){
    setError("");
    setLoading(true);
    setWeather(null);

    try {
      const place = await fetchCoordinates(city);
      const cw = await fetchWeather(place.latitude, place.longitude, place.timezone);
      setLocation(place);
      setWeather(cw);
      // update recent
      setRecent((r) => {
        const normalized = { name: place.name, country: place.country, lat: place.latitude, lon: place.longitude, timezone: place.timezone };
        const filtered = [normalized, ...r.filter(x => x.name !== normalized.name || x.country !== normalized.country)];
        return filtered.slice(0,8);
      });
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function handleSelectRecent(item){
    // fetch weather again for selected recent saved coordinates
    (async () => {
      setError("");
      setLoading(true);
      try {
        const cw = await fetchWeather(item.lat, item.lon, item.timezone);
        setLocation(item);
        setWeather(cw);
      } catch(err){
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }

  function clearRecent(){
    setRecent([]);
  }

  return (
    <div className="app">
      <div className="header">
        <div>
          <div className="title">Weather Now</div>
          <div className="subtitle">Quick current weather for any city — ideal for outdoor plans</div>
        </div>
      </div>

      <div className="controls">
        <SearchBar onSearch={handleSearch}/>
        <div style={{minWidth:160, textAlign:"right", color:"var(--muted)"}}>
          <div style={{fontSize:12}}>Tip: Try "Bengaluru", "London", "San Francisco"</div>
        </div>
      </div>

      <div className="content">
        <div className="left">
          {loading && <div className="loading">Loading…</div>}
          {error && <div className="error">{error}</div>}
          {!loading && !error && !weather && <div className="small">Search a city to view its current weather.</div>}
          {weather && <WeatherCard data={weather} location={location} />}
          <div className="footer">Data via Open-Meteo • No API key required</div>
        </div>

        <div className="right">
          <RecentSearches items={recent} onSelect={handleSelectRecent} onClear={clearRecent} />
        </div>
      </div>
    </div>
  );
}

export default App;
