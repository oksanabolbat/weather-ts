import { TodayWeatherProps, icons, UnitsProps } from '../helpers/helpers';
import DateTime from './DateTime';

interface Props {
  data: TodayWeatherProps;
  units: UnitsProps;
  changeUnits: () => void;
  updateCity: (city: string) => void;
}
const unitsClasses =
  'btn btn-link px-0 pt-2 text-black text-decoration-none fs-5';
const WeatherToday: React.FC<Props> = (props) => {
  return (
    <div className="row mt-3">
      <div className="col-7">
        <div className="row">
          <div className="col-3">
            {props.data.icon && (
              <img
                alt={props.data.description}
                src={`https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                  icons[props.data.icon][0]
                }.png`}
              />
            )}
          </div>
          <div className="col-2 text-end">
            <span className="display-2">{props.data.temp}</span>
          </div>
          <div className="col-2 ">
            <span
              className={`${unitsClasses} ${
                props.units === 'metric'
                  ? ' disabled opacity-100'
                  : 'opacity-50'
              }`}
              onClick={() => {
                props.changeUnits();
              }}
            >
              °C
            </span>{' '}
            <span className={unitsClasses}>|</span>
            <span
              className={`${unitsClasses} ${
                props.units === 'imperial'
                  ? ' disabled opacity-100'
                  : 'opacity-50'
              }`}
              onClick={() => {
                props.changeUnits();
              }}
            >
              °F
            </span>
          </div>

          <div className="col-5">
            <ul className="mt-3 list-unstyled opacity-50 small">
              <li className={''}>
                <span>{props.data.description}</span>
              </li>
              <li>
                Humidity: <span>{props.data.humidity}</span>%
              </li>
              <li>
                Wind: <span>{props.data.wind}</span>{' '}
                {props.units === 'metric' ? 'm/s' : 'nmph'}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="col-5 text-end">
        <h1 className="display-4">{props.data.city}</h1>
        <ul className="small list-unstyled opacity-75">
          <li>Last updated:</li>
          <li>
            <DateTime date={{ date: props.data.time, format: 'long' }} />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default WeatherToday;
