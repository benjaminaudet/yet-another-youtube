import moment from 'moment';

export default function computeRenderVideoLength(videoLength) {
  let goodScale;
  const timeFormatScales = [
    { value: 10 * 3600, format: 'HH:mm:ss' },
    { value: 3600, format: 'H:mm:ss' },
    { value: 10 * 60, format: 'mm:ss' },
    { value: 1, format: 'm:ss' },
  ];
  timeFormatScales.every(timeformatScale => {
    if (videoLength >= timeformatScale.value) {
      goodScale = timeformatScale;
      return false;
    }
    return true;
  });
  return moment()
    .startOf('day')
    .seconds(videoLength)
    .format(goodScale.format);
}
