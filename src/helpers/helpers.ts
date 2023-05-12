type IconsKeysProps =
  | '01d'
  | '02d'
  | '03d'
  | '04d'
  | '09d'
  | '10d'
  | '11d'
  | '13d'
  | '50d'
  | '01n'
  | '02n'
  | '03n'
  | '04n'
  | '09n'
  | '10n'
  | '11n'
  | '13n'
  | '50n';
type IconsProps = Record<IconsKeysProps, string[]>;

export const icons: IconsProps = {
  '01d': ['clear-sky-day', 'Clear sky'],
  '02d': ['few-clouds-day', 'Few clouds'],
  '03d': ['scattered-clouds-day', 'Scattered clouds'],
  '04d': ['broken-clouds-day', 'Broken clouds'],
  '09d': ['shower-rain-day', 'Shower rain'],
  '10d': ['rain-day', 'Rain'],
  '11d': ['thunderstorm-day', 'Thunderstorm'],
  '13d': ['snow-day', 'Snow'],
  '50d': ['mist-day', 'Mist'],
  '01n': ['clear-sky-night', 'Clear sky'],
  '02n': ['few-clouds-night', 'Few clouds'],
  '03n': ['scattered-clouds-night', 'Scattered clouds'],
  '04n': ['broken-clouds-night', 'Broken clouds'],
  '09n': ['shower-rain-night', 'Shower rain'],
  '10n': ['rain-night', 'Rain'],
  '11n': ['thunderstorm-night', 'Thunderstorm'],
  '13n': ['snow-night', 'Snow'],
  '50n': ['mist-night', 'Mist'],
};

export interface TodayWeatherProps {
  temp: number | null;
  wind: number | null;
  humidity: number | null;
  time: number;
  city: string;
  description: string;
  icon: IconsKeysProps;
  ready: boolean;
}

export interface WeatherProps {
  todayWeather: TodayWeatherProps;
  weeklyWeather: TodayWeatherProps[];
}

export interface CoordsProps {
  latitude?: number;
  longitude?: number;
}

export type UnitsProps = 'metric' | 'imperial';

export interface DayForecastProps {
  day: number;
  url: string;
  condition: string;
  tempMax: number;
  tempMin: number;
  wind: number;
}
interface DayForecastResponseProps {
  time: number;
  temperature: { minimum: number; maximum: number };
  condition: { icon_url: string; description: string };
  wind: { speed: number };
}

export const convertResponseDaily = (response: DayForecastResponseProps[]) => {
  return response.map((day) => ({
    time: new Date(day.time * 1000).getHours(),
    day: new Date(day.time * 1000).getDay(),
    tempMax: day.temperature.maximum,
    tempMin: day.temperature.minimum,
    url: day.condition.icon_url,
    wind: day.wind.speed,
    condition: day.condition.description,
  }));
};
