// All customer-entered dimensions are centimeters.
// Convert only at calculation boundaries; keep UI values in cm.
export function parseCentimeters(value) {
  const number = Number(value)
  return Number.isFinite(number) && number > 0 ? number : 0
}

export function centimetersToMeters(value) {
  return parseCentimeters(value) / 100
}

export function calculateAreaSquareMeters(widthCm, heightCm) {
  return centimetersToMeters(widthCm) * centimetersToMeters(heightCm)
}

export function formatCentimeters(value) {
  return `${value} سم`
}
