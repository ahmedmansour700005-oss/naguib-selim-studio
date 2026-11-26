import test from 'node:test'
import assert from 'node:assert/strict'
import { calculateAreaSquareMeters, calculateFabricRequirement, centimetersToMeters, parseCentimeters } from './measurement.js'

test('converts centimeters to meters only for calculations', () => {
  assert.equal(centimetersToMeters(250), 2.5)
  assert.ok(Math.abs(calculateAreaSquareMeters(300, 270) - 8.1) < 1e-9)
})

test('rejects invalid or non-positive dimensions', () => {
  assert.equal(parseCentimeters('abc'), 0)
  assert.equal(parseCentimeters(-10), 0)
  assert.equal(calculateFabricRequirement({ widthCm: '', heightCm: '200' }, 680).valid, false)
})

test('calculates fabric area for one layer with explicit allowances', () => {
  const result = calculateFabricRequirement({
    widthCm: '300', heightCm: '250', topAllowanceCm: '20',
    bottomAllowanceCm: '20', slopeCm: '0', fullness: '2', layers: '1'
  }, 680)
  assert.equal(result.valid, true)
  assert.equal(result.dropCm, 290)
  assert.equal(Number(result.fabricAreaM2.toFixed(4)), 19.14)
  assert.equal(result.estimateEgp, 23427)
})

test('two fabric layers double the required fabric area', () => {
  const single = calculateFabricRequirement({ widthCm: 200, heightCm: 200, fullness: 2, layers: 1 }, 600)
  const double = calculateFabricRequirement({ widthCm: 200, heightCm: 200, fullness: 2, layers: 2 }, 600)
  assert.equal(double.fabricAreaM2, single.fabricAreaM2 * 2)
})

test('does not invent a price when no verified price list is supplied', () => {
  const result = calculateFabricRequirement({ widthCm: 300, heightCm: 250, fullness: 2, layers: 2 }, null)
  assert.equal(result.valid, true)
  assert.equal(result.pricingAvailable, false)
  assert.equal(result.estimateEgp, null)
  assert.ok(result.fabricAreaM2 > 0)
})
