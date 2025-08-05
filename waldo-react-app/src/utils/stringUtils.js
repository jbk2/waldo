export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getOrdinalSuffix(n) {
  const lastTwoDigits = n % 100;

  if(lastTwoDigits >= 11 && lastTwoDigits <= 13) return 'th';

  const lastDigit = n % 10;

  switch(lastDigit) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}