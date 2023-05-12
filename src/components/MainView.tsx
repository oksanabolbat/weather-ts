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
import { Grid } from 'react-loader-spinner';

const MainView = () => {
  const [city, setCity] = useState<string>();
  const [todayWeather, setTodayWeather] = useState<TodayWeatherProps>();
  const [dailyForecast, setDailyForecast] = useState<DayForecastProps[]>([]);
  const [units, setUnits] = useState<UnitsProps>('metric');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const updateCity = (city: string) => {
    setCity(city);
  };

  useEffect(() => {
    if (todayWeather || (dailyForecast && dailyForecast.length > 0)) {
      setIsError(false);
    }
  }, [dailyForecast, todayWeather]);

  const updateWeather = useCallback(
    (city: string) => {
      setIsLoading(true);
      setIsError(false);

      getWeatherData(city, units).then((response) => {
        if (response) {
          setTodayWeather({
            temp: Math.round(response.data.main.temp),
            wind: response.data.wind.speed,
            humidity: response.data.main.humidity,
            time: response.data.dt,
            city: response.data.name,
            description: response.data.weather[0].description,
            icon: response.data.weather[0].icon,
          });
          setCity(response.data.name);
        } else {
          setIsError(true);
        }
      });
      getWeatherForecast(city, units)
        .then((response) => {
          if (response && response.length > 0) {
            setDailyForecast(convertResponseDaily(response));
          } else {
            setIsError(true);
          }
        })
        .then(() => setIsLoading(false));
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

  const weatherDisplay = (
    <>
      {todayWeather && (
        <WeatherToday
          data={todayWeather}
          units={units}
          changeUnits={changeUnits}
          updateCity={updateCity}
        />
      )}
      {dailyForecast && <DailyForecast data={dailyForecast} units={units} />}
    </>
  );

  return (
    <div>
      <SearchForm
        currentCity={city}
        updateWeather={updateWeather}
        updateCity={updateCity}
      />

      {isLoading ? (
        <Grid
          height="100"
          width="100"
          color="#0b5ed7"
          ariaLabel="grid-loading"
          radius="12.5"
          wrapperStyle={{}}
          wrapperClass="pt-5 justify-content-center"
          visible={true}
        />
      ) : (
        !isError && weatherDisplay
      )}

      {isError && (
        <p className="text-center mt-3 display-6">
          Please check the city name!
        </p>
      )}
    </div>
  );
};

export default MainView;
