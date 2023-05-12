import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapPin } from '@fortawesome/free-solid-svg-icons';

import { getCityNameByCoords } from '../helpers/api_helpers';

interface Props {
  currentCity?: string;
  updateCity: (city: string) => void;
  updateWeather: (city: string) => void;
}

const SearchForm: React.FC<Props> = (props) => {
  const [currenrCity, setCurrentCity] = useState<string>(
    props.currentCity ? props.currentCity : ''
  );

  const currentPositionHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();

    navigator.geolocation.getCurrentPosition((position) =>
      getCityNameByCoords({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }).then((res) => {
        props.updateCity(res);
        props.updateWeather(res);
        setCurrentCity(res);
      })
    );
  };

  const submitHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (currenrCity.length > 1) {
      props.updateWeather(currenrCity);
    }
  };
  return (
    <form className="row justify-content-around" onSubmit={submitHandler}>
      <div className="col-9">
        <input
          type="text"
          className="form-control col-1"
          placeholder="Enter a city name ..."
          value={currenrCity}
          onChange={(e) => setCurrentCity(e.target.value)}
        />
      </div>
      <button
        type="submit"
        title="Search"
        className=" btn btn-primary col-1 px-1 mx-1"
      >
        OK
      </button>
      <button
        title="Your current location"
        className="btn btn-primary col-1 px-1 mx-1"
        onClick={currentPositionHandler}
      >
        <FontAwesomeIcon icon={faMapPin} />
      </button>
    </form>
  );
};

export default SearchForm;
