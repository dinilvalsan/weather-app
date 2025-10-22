    // We need to use `require` syntax in Netlify Functions
    const axios = require('axios');

    /**
     * The main serverless function handler.
     * @param {object} event The event object includes query parameters.
     * @param {object} context The context object.
     */
    exports.handler = async (event, context) => {
      try {
        // 1. Get the 'city' query parameter from the event
        const { city } = event.queryStringParameters;

        if (!city) {
          return {
            statusCode: 400,
            body: JSON.stringify({ error: 'City query parameter is required' }),
          };
        }

        // 2. Get the API key from environment variables
        //    NEVER hardcode your API keys!
        const API_KEY = process.env.WEATHER_API_KEY;

        if (!API_KEY) {
          return {
            statusCode: 500,
            body: JSON.stringify({ error: 'API key is not configured' }),
          };
        }

        // 3. Call the OpenWeatherMap API
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather`;
        const response = await axios.get(apiUrl, {
          params: {
            q: city,
            appid: API_KEY,
            units: 'metric' // Use 'imperial' for Fahrenheit
          }
        });

        // 4. Return the successful response
        return {
          statusCode: 200,
          body: JSON.stringify(response.data),
          headers: {
            'Content-Type': 'application/json'
          }
        };

      } catch (error) {
        // 5. Handle errors
        console.error('Error fetching weather data:', error);

        // Pass back the error from the weather API if it exists
        if (error.response) {
          return {
            statusCode: error.response.status,
            body: JSON.stringify({ error: error.response.data.message || 'Error fetching weather' })
          };
        }

        return {
          statusCode: 500,
          body: JSON.stringify({ error: 'Internal Server Error' }),
        };
      }
    };
    
