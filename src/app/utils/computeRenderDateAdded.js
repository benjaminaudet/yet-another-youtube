import moment from 'moment';

export default function computeRenderDateAdded(dateAdd) {
  const dateAdded = moment(new Date(dateAdd));
  const dateNow = moment(new Date());
  const duration = moment.duration(dateNow.diff(dateAdded));
  const durationScale = {
    years: {
      value: duration.asYears(),
      translation: 'ans',
    },
    months: {
      value: duration.asMonths(),
      translation: 'mois',
    },
    days: {
      value: duration.asDays(),
      translation: 'jours',
    },
    hours: {
      value: duration.asHours(),
      translation: 'heures',
    },
    minutes: {
      value: duration.asMinutes(),
      translation: 'minutes',
    },
    seconds: {
      value: duration.asSeconds(),
      translation: 'secondes',
    },
  };
  let goodScale = '';
  Object.keys(durationScale).every(key => {
    if (durationScale[key].value >= 1) {
      goodScale = key;
      return false;
    }
    return true;
  });
  return `${dateNow.diff(dateAdded, goodScale)} ${durationScale[goodScale] &&
    durationScale[goodScale].translation}`;
}
