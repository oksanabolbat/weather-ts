import OneDay from './OneDay';
import { DayForecastProps, UnitsProps } from '../helpers/helpers';
interface Props {
  data: DayForecastProps[];
  units: UnitsProps;
}

const DailyForecast: React.FC<Props> = (props) => {
  return (
    <div className="row justify-content-around my-3  fw-light">
      {props.data.map((day, i) => (
        <OneDay day={day} units={props.units} key={i} />
      ))}
    </div>
  );
};

export default DailyForecast;
