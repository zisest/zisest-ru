export const clamp = (num: number, min: number, max: number = Infinity) =>
  Math.min(Math.max(num, min), max)
