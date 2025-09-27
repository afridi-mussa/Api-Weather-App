const API_KEY = "11a921aeaca19cadd49fa5ef24b396f9"; 
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export const fetchWeather = async (city) => {
  const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
  if (!response.ok) {
    if (response.status === 404) throw new Error("City not found!");
    if (response.status === 429) throw new Error("API limit exceeded!");
    throw new Error("Failed to fetch weather data.");
  }
  return response.json();
};
