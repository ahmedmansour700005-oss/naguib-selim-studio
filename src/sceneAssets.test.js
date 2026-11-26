import test from 'node:test'
import assert from 'node:assert/strict'
import { describeMaterialFidelity, getRoomViewingModes, isUsableFabricMaterial, isValidPanoramaAsset } from './sceneAssets.js'

test('accepts only real 2:1 equirectangular panorama assets', () => {
  assert.equal(isValidPanoramaAsset({ src: 'https://assets.example/room.jpg', projection: 'equirectangular', width: 6000, height: 3000 }), true)
  assert.equal(isValidPanoramaAsset({ src: 'blob:https://studio.local/room-preview', projection: 'equirectangular', width: 6000, height: 3000 }), true)
  assert.equal(isValidPanoramaAsset({ src: '/room.jpg', projection: 'equirectangular', width: 6000, height: 3000 }), false)
  assert.equal(isValidPanoramaAsset({ src: 'https://assets.example/room.jpg', projection: 'perspective', width: 6000, height: 3000 }), false)
  assert.equal(isValidPanoramaAsset({ src: 'https://assets.example/room.jpg', projection: 'equirectangular', width: 4000, height: 3000 }), false)
})

test('room modes never claim panorama readiness when its asset is missing', () => {
  const modes = getRoomViewingModes({ panorama: null })
  assert.equal(modes.panorama.available, false)
  assert.equal(modes.model3d.available, true)
  assert.match(modes.panorama.description, /نقاط تصوير/)
})

test('fabric color references are not treated as photorealistic material maps', () => {
  assert.equal(isUsableFabricMaterial({ productCode: 'NS-01', verified: 1, baseColor: '#b9a58b', previewLevel: 'color-reference' }), true)
  assert.equal(describeMaterialFidelity({ verified: 1, baseColor: '#b9a58b' }), 'مرجع لون فقط — ليس محاكاة لنسيج القماش')
  assert.equal(isUsableFabricMaterial({ productCode: 'NS-02', verified: 0, baseColor: '#b9a58b' }), false)
})

test('PBR fabric requires verified product identity and usable map URLs', () => {
  const material = { productCode: 'NS-LINEN-01', verified: 1, albedoUrl: 'https://assets.example/albedo.jpg', normalUrl: 'https://assets.example/normal.jpg' }
  assert.equal(isUsableFabricMaterial(material), true)
  assert.match(describeMaterialFidelity(material), /تحتاج اعتمادًا بصريًا/)
})
