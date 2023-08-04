import axios from 'axios';

//const WEATHER_KEY = '61087a8359bb913684c1d5659d31613d';
const WEATHER_KEY = '0cc0bfab391d49cf4580262388b40d1d';

export const forecast = async (lat: string, long: string) => {
  const URL =
    'http://api.weatherstack.com/current?access_key=' +
    WEATHER_KEY +
    '&query=' +
    lat +
    ',' +
    long;

  const response = await axios.get(URL);
  const data = response.data;

  console.log(data);

  if (data.hasOwnProperty('success') && data.success === false) {
    throw new Error('API Limit expired');
  }

  const forecastData = {
    currentTemp: data.current.temperature,
    currentStatus: data.current.weather_descriptions[0],
    isDay: data.current.is_day,
    localtime: data.location.localtime,
  };

  return forecastData;
};
