export const normalize = (
  num: number,
  currentMin: number,
  currentMax: number,
  newMin: number = 0,
  newMax: number = 1
) => {
  // Normalize between 0 and 1
  const normalized = (num - currentMin) / (currentMax - currentMin)
  // Normalize to fit new scale
  return (newMax - newMin) * normalized + newMin
}
