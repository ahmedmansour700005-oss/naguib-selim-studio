// Asset contracts for the hybrid room experience.
// A panorama is only considered ready when a real 2:1 equirectangular asset is supplied.
// Keep photographic 360 viewpoints separate from the free-orbit 3D scene.
export function isValidPanoramaAsset(asset) {
  if (!asset || typeof asset !== 'object') return false
  if (typeof asset.src !== 'string' || !/^https?:\/\//i.test(asset.src)) return false
  if (asset.projection !== 'equirectangular') return false
  if (Number(asset.width) <= 0 || Number(asset.height) <= 0) return false
  return Math.abs(Number(asset.width) / Number(asset.height) - 2) < 0.015
}

export function getRoomViewingModes(room) {
  const panoramaReady = isValidPanoramaAsset(room?.panorama)
  return {
    panorama: {
      available: panoramaReady,
      label: panoramaReady ? 'جولة 360° مصوّرة' : '360° — الصورة الأصلية مطلوبة',
      description: 'دوران وزوم داخل نقطة تصوير حقيقية، والانتقال فقط بين نقاط تصوير مرتبطة.'
    },
    model3d: {
      available: true,
      label: 'استوديو 3D تفاعلي',
      description: 'دوران حر حول المجسم وتغيير الخامات؛ لا يمثل تصويرًا فوتوغرافيًا للمكان.'
    }
  }
}

export function isUsableFabricMaterial(material) {
  if (!material || typeof material !== 'object') return false
  const hasColor = typeof material.baseColor === 'string' && /^#[0-9a-f]{6}$/i.test(material.baseColor)
  const hasAlbedo = typeof material.albedoUrl === 'string' && /^https?:\/\//i.test(material.albedoUrl)
  const hasNormal = typeof material.normalUrl === 'string' && /^https?:\/\//i.test(material.normalUrl)
  return Boolean(material.productCode && (hasAlbedo || hasColor) && Number(material.verified) === 1 && (hasNormal || material.previewLevel === 'color-reference'))
}

export function describeMaterialFidelity(material) {
  if (!material || Number(material.verified) !== 1) return 'غير متحقق — لا يُعرض كخامة مطابقة للمنتج'
  if (material.albedoUrl && material.normalUrl) return 'خامة رقمية موثقة مبدئيًا — تحتاج اعتمادًا بصريًا على المشهد'
  if (material.baseColor) return 'مرجع لون فقط — ليس محاكاة لنسيج القماش'
  return 'أصول الخامة غير مكتملة'
}
