type OrdinalSuffix = "st" | "nd" | "rd" | "th";

export function capitalize<T extends string>(str: T): Capitalize<T> {
  if (str.length === 0) return '' as Capitalize<T>;
  return (str.charAt(0).toUpperCase() + str.slice(1)) as Capitalize<T>;
}

export function getOrdinalSuffix(n: number): OrdinalSuffix {
  const lastTwoDigits = n % 100;

  if(lastTwoDigits >= 11 && lastTwoDigits <= 13) return 'th';

  const lastDigit = Math.abs(n) % 10;

  switch (lastDigit) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}