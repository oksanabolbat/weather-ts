interface Props {
  date: { format: string; date: number };
}

const DateTime: React.FC<Props> = (props) => {
  const days = [
    ['Sunday', 'Sun'],
    ['Monday', 'Mon'],
    ['Tuesday', 'Tue'],
    ['Wednesday', 'Wed'],
    ['Thursday', 'Thu'],
    ['Friday', 'Fri'],
    ['Saturday', 'Sat'],
  ];

  let currDate = new Date(props.date.date * 1000);

  return (
    <>
      {props.date.format === 'long' ? (
        <span>{days[currDate.getDay()][0]}</span>
      ) : (
        <>
          <span>{days[props.date.date][1]}</span> <br />
        </>
      )}

      {props.date.format === 'long' && (
        <span>{` ${
          currDate.getHours() > 9
            ? currDate.getHours()
            : `0${currDate.getHours()}`
        }:${
          currDate.getMinutes() > 9
            ? currDate.getMinutes()
            : `0${currDate.getMinutes()}`
        }`}</span>
      )}
    </>
  );
};

export default DateTime;
