import axios from "axios";

// const URL = 'https://home.openweathermap.org/api_keys';
// const API_KEY = '3c7112bf50404039fb05f68434c44048';


const URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'f33a484cf794d08d0148764789aaba32';

export const fetchWeather = async(query) => {
  const { data } = await axios.get(URL, {
    params: {
      q: query,
      units: 'metric',
      APPID: API_KEY
    }
  });
  return data;
}