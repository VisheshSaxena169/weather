export function weatherCodeToDescription(code) {
  // simplified mapping (expand as needed)
  const map = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    71: "Slight snow",
    73: "Moderate snow",
    75: "Heavy snow",
    95: "Thunderstorm",
    96: "Thunder w/ small hail",
    // ... add more codes if needed
  };
  return map[code] ?? "Unknown";
}

