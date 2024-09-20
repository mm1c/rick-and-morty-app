export const getArrayOfNumbers = (from: number, to: number) =>
  Array.from({ length: to }, (_, i) => i + from);
