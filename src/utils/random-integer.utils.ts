import { normalize } from '.'

export const randomInteger = (min: number, max: number) =>
  Math.round(normalize(Math.random(), 0, 1, min, max))
