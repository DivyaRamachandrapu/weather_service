const express = require('express');
const axios = require('axios');
require('dotenv').config(); // Load environment variables from .env file
const app = express();
const port = 3000;

// Base URL for Weatherstack API
const BASE_URL = 'http://api.weatherstack.com/current';
// Access API Key from environment variables
const API_KEY = process.env.WEATHERSTACK_API_KEY;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Weather Service API. Use /weather?city=CityName to get weather data.');
});

app.get('/weather', async (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).send('City parameter is required');
  }

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        access_key: API_KEY, // Use the API key from environment variables
        query: city
      }
    });

    const data = response.data;
    if (data.error) {
      return res.status(400).send(data.error.info);
    }

    res.json({
      location: data.location.name,
      temperature: data.current.temperature,
      weather_descriptions: data.current.weather_descriptions,
      humidity: data.current.humidity,
      wind_speed: data.current.wind_speed
    });
  } catch (error) {
    console.error('Error details:', error.response ? error.response.data : error.message); // Log detailed error
    res.status(500).send('Error fetching weather data');
  }
});

app.listen(port, () => {
  console.log(`Weather service listening at http://localhost:${port}`);
});
