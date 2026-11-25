// Customer-facing dimensions are always centimeters (cm).
// Meter conversion is kept inside calculation helpers only.
export function parseCentimeters(value, { allowZero = false } = {}) {
  const number = typeof value === 'number' ? value : Number(String(value ?? '').trim())
  if (!Number.isFinite(number)) return 0
  if (allowZero ? number < 0 : number <= 0) return 0
  return number
}

export function centimetersToMeters(value) {
  return parseCentimeters(value) / 100
}

export function calculateAreaSquareMeters(widthCm, heightCm) {
  return centimetersToMeters(widthCm) * centimetersToMeters(heightCm)
}

export function calculateFabricRequirement(opening, pricePerSquareMeter, wasteFactor = 1.1) {
  const widthCm = parseCentimeters(opening.widthCm)
  const heightCm = parseCentimeters(opening.heightCm)
  const topAllowanceCm = parseCentimeters(opening.topAllowanceCm ?? 0, { allowZero: true })
  const bottomAllowanceCm = parseCentimeters(opening.bottomAllowanceCm ?? 0, { allowZero: true })
  const slopeCm = parseCentimeters(opening.slopeCm ?? 0, { allowZero: true })
  const fullness = parseCentimeters(opening.fullness ?? 2)
  const layers = Math.max(1, Math.min(2, Math.round(Number(opening.layers) || 1)))
  const price = Math.max(0, Number(pricePerSquareMeter) || 0)
  const valid = widthCm > 0 && heightCm > 0 && fullness > 0
  if (!valid) return { valid: false, fabricAreaM2: 0, estimateEgp: 0, dropCm: 0 }
  const dropCm = heightCm + topAllowanceCm + bottomAllowanceCm + slopeCm
  const fabricAreaM2 = (widthCm / 100) * (dropCm / 100) * fullness * layers * wasteFactor
  return {
    valid: true,
    dropCm,
    fabricAreaM2,
    estimateEgp: Math.round(fabricAreaM2 * price * 1.8),
    assumptions: { fullness, layers, wasteFactor, pricingMultiplier: 1.8 }
  }
}

export function formatCentimeters(value) {
  return `${value} سم`
}
