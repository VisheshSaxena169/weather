import React from "react";
import { weatherCodeToDescription } from "../utils/weatherUtils";

export default function WeatherCard({ data, location }) {
  if (!data) return null;
  const { temperature, windspeed, weathercode, time } = data;
  return (
    <div className="card">
      <div>
        <div style={{display:"flex", gap:12, alignItems:"center"}}>
          <div className="big-temp">{Math.round(temperature)}°C</div>
          <div>
            <div style={{fontWeight:700}}>{location?.name ?? "Unknown"}</div>
            <div className="small">{location?.country} • {new Date(time).toLocaleString()}</div>
          </div>
        </div>
        <div className="row">
          <div className="small">Condition: {weatherCodeToDescription(weathercode)}</div>
        </div>
        <div className="row">
          <div className="small">Wind: {windspeed} km/h</div>
        </div>
      </div>
    </div>
  );
}
