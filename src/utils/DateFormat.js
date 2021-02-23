const DateFormat = date => {
  const userDate = new Date(date);
  let month = `${userDate.getMonth() + 1}`;
  const year = `${userDate.getFullYear()}`;
  let day = `${userDate.getDate()}`;

  if (month.length < 2) {
    month = `0${month}`;
  }
  if (day.length < 2) {
    day = `0${day}`;
  }

  return [year, month, day].join('-');
};

export default DateFormat;
