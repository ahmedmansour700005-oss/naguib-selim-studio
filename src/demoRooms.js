// Event demo room presets. A room is not marked as 360-capable until a verified panorama asset is assigned.
export const demoRooms = [
  { id: 'living', name: 'غرفة المعيشة', en: 'Living room', kind: 'living', panorama: null, panoramaStatus: 'asset-needed', openings: [{ id: 'living-window', name: 'شباك غرفة المعيشة', type: 'window', widthCm: '300', heightCm: '270', hasPelmet: true, pelmetDepthCm: '18', slopeCm: '0', topAllowanceCm: '20', bottomAllowanceCm: '20', fullness: '2', layers: '2', notes: '' }] },
  { id: 'bedroom', name: 'غرفة النوم', en: 'Bedroom', kind: 'bedroom', panorama: null, panoramaStatus: 'asset-needed', openings: [{ id: 'bedroom-window', name: 'شباك غرفة النوم', type: 'window', widthCm: '220', heightCm: '250', hasPelmet: false, pelmetDepthCm: '15', slopeCm: '0', topAllowanceCm: '18', bottomAllowanceCm: '18', fullness: '2', layers: '2', notes: '' }] },
  { id: 'balcony', name: 'البلكونة', en: 'Balcony', kind: 'balcony', panorama: null, panoramaStatus: 'asset-needed', openings: [{ id: 'balcony-door', name: 'باب البلكونة الجرار', type: 'balcony', widthCm: '280', heightCm: '240', hasPelmet: false, pelmetDepthCm: '15', slopeCm: '0', topAllowanceCm: '15', bottomAllowanceCm: '10', fullness: '1.8', layers: '1', notes: '' }] },
]

export const designDirections = [
  { id: 'essential', name: 'Essential Style', tier: 'اقتصادي', description: 'تصميم بسيط بخامة عملية وطبقة واحدة، مع الحفاظ على تناسق الألوان.', fabricId: 'ivory', styleId: 'wave', layers: 1, fullness: 1.5 },
  { id: 'smart', name: 'Smart Elegance', tier: 'متوسط', description: 'طبقتان شفافة ومعتمة بخامة متوسطة وثنيات متوازنة.', fabricId: 'linen', styleId: 'wave', layers: 2, fullness: 2 },
  { id: 'signature', name: 'Luxury Signature', tier: 'فاخر', description: 'ثنيات أغنى وخامة مميزة وتفاصيل تركيب أكثر فخامة.', fabricId: 'taupe', styleId: 'classic', layers: 2, fullness: 2.5 },
]
