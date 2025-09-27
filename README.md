🔹 Project Description
1. Working Weather App UI

Homepage (Home.jsx)

A search bar with an input box and search button.

Permanent “View History” button to display or hide past searches.

Shows weather result cards with temperature, humidity, feels-like, wind speed, country, and condition (with icons).

Details Page (Details.jsx)

Displays the full weather information of a selected city.

Back button to navigate home.

Icons for humidity, wind, temperature, and weather conditions (sunny, cloudy, rainy).

History Section (History.jsx)

Stores the last 5 searches in local storage.

Each history card shows city, temperature, condition, humidity, feels like, wind, and country with icons.

“Reset History” button clears all saved searches.

2. Code Comments for Error/Loading Handling

Example from api.js:

if (!response.ok) {
  if (response.status === 404) throw new Error("City not found!"); // Invalid city name
  if (response.status === 429) throw new Error("API limit exceeded!"); // Too many requests
  throw new Error("Failed to fetch weather data."); // Other server/network error
}


Example from Home.jsx:

{loading && <Loader />} // Shows spinner while waiting for API
{error && <ErrorMessage message={error} />} // Shows error if API fails
{weather && <WeatherCard data={weather} />} // Shows results if success


So the app clearly separates 3 states:

Loading → loader animation.

Error → red error message.

Success → weather card results.
