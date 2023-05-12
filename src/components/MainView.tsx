import { useState, useEffect, useCallback } from 'react';

import SearchForm from './SearchForm';
import WeatherToday from './WeatherToday';
import { getWeatherData, getWeatherForecast } from '../helpers/api_helpers';
import {
  TodayWeatherProps,
  UnitsProps,
  DayForecastProps,
  convertResponseDaily,
} from '../helpers/helpers';
import DailyForecast from './DailyForecast';

const MainView = () => {
  const [city, setCity] = useState<string>();
  const [todayWeather, setTodayWeather] = useState<TodayWeatherProps>();
  const [dailyForecast, setDailyForecast] = useState<DayForecastProps[]>([]);
  const [units, setUnits] = useState<UnitsProps>('metric');

  const updateCity = (city: string) => {
    setCity(city);
  };

  const updateWeather = useCallback(
    (city: string) => {
      getWeatherData(city, units).then((response) =>
        setTodayWeather({
          temp: Math.round(response.data.main.temp),
          wind: response.data.wind.speed,
          humidity: response.data.main.humidity,
          time: response.data.dt,
          city: response.data.name,
          description: response.data.weather[0].description,
          icon: response.data.weather[0].icon,
          ready: true,
        })
      );
      getWeatherForecast(city, units).then((response) =>
        setDailyForecast(convertResponseDaily(response))
      );
    },
    [units]
  );

  useEffect(() => {
    if (city && city?.length > 0) {
      updateWeather(city);
    }
  }, [units, city, updateWeather]);

  const changeUnits = () => {
    setUnits((prev) => (prev === 'imperial' ? 'metric' : 'imperial'));
  };
  return (
    <div>
      <SearchForm
        currentCity={city}
        updateCity={updateCity}
        updateWeather={updateWeather}
      />
      {todayWeather && (
        <WeatherToday
          data={todayWeather}
          units={units}
          changeUnits={changeUnits}
        />
      )}
      {dailyForecast && <DailyForecast data={dailyForecast} units={units} />}
    </div>
  );
};

export default MainView;
