import DateTime from './DateTime';
import { UnitsProps, DayForecastProps } from '../helpers/helpers';

interface Props {
  day: DayForecastProps;
  units: UnitsProps;
}

const OneDay: React.FC<Props> = (props) => {
  const day = props.day;
  return (
    <div className={`col text-center`}>
      <div className="fs-6">
        <DateTime date={{ date: day.day, format: 'short' }} />
      </div>
      <div className="forecast-icon">
        <img className=" img-fluid" src={day.url} alt={day.condition} />
      </div>
      <div className="forecast-temp">
        <span className="fw-bold">{Math.round(day.tempMax)} </span>
        &nbsp;{Math.round(day.tempMin)}
      </div>
      <div className="opacity-75">
        <small>
          {day.wind} {props.units === 'metric' ? 'm / s' : 'nmph'}
        </small>
      </div>
    </div>
  );
};

export default OneDay;
