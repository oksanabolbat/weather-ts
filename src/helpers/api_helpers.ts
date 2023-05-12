import axios from 'axios';

import { CoordsProps, UnitsProps } from './helpers';

export const apiKey = '668da14f2dd183d5f357bb8c35faa1a0';

const apiUrl = `https://api.openweathermap.org/data/2.5/weather`;

export const getWeatherData = (city: string, units: UnitsProps) => {
  return axios
    .get(apiUrl, {
      params: {
        q: city,
        appid: apiKey,
        units,
      },
    })
    .then((response) => response)
    .catch(() => null);
};

export const getWeatherForecast = (city: string, units: UnitsProps) => {
  return axios
    .get(`https://api.shecodes.io/weather/v1/forecast`, {
      params: {
        query: city,
        key: '5o0a7ff1b9010e3b3ffaeet4f9642424',
        units,
      },
    })
    .then((response) => response.data.daily)
    .catch(() => null);
};

export const getCityNameByCoords = (coords: CoordsProps): Promise<string> => {
  return axios
    .get(apiUrl, {
      params: {
        lat: coords.latitude,
        lon: coords.longitude,
        appid: apiKey,
      },
    })
    .then((response) => response.data.name);
};

export const getCurrentCoords = () => {
  navigator.geolocation.getCurrentPosition((position) => position.coords);
};
