const computeToFixed = number => (Number.isInteger(number) ? 0 : 1);

export default function computeRenderNumber(number) {
  if (!number) {
    return '';
  }
  let goodScale;
  const numberScales = [
    {
      value: Math.pow(10, 9),
      text: 'Md',
    },
    { value: Math.pow(10, 6), text: 'M' },
    { value: Math.pow(10, 3), text: 'K' },
    { value: 1, text: '' },
  ];
  numberScales.every(numberScale => {
    if (number >= numberScale.value) {
      goodScale = numberScale;
      return false;
    }
    return true;
  });
  return `${(number / goodScale.value).toFixed(
    computeToFixed(number / goodScale.value),
  )} ${goodScale.text}`;
}
