import React, { useEffect, useMemo, useRef, useState } from 'react'
import { calculateFabricRequirement } from './measurement.js'
import { enrichedFabricCatalog as fabricCatalog } from './fabricCatalog.js'
import { demoRooms, designDirections } from './demoRooms.js'
import { getRoomViewingModes } from './sceneAssets.js'
import { ArrowDown, ArrowLeft, Check, ChevronDown, Eye, Menu, Ruler, Sparkles, X } from 'lucide-react'

const fabrics = [
  { id: 'linen', name: 'كتان طبيعي', en: 'Natural Linen', color: '#c9bda8', price: null, texture: 'linen' },
  { id: 'ivory', name: 'أوف وايت', en: 'Soft Ivory', color: '#e8e1d3', price: null, texture: 'plain' },
  { id: 'sage', name: 'أخضر سيج', en: 'Sage Green', color: '#9ba58f', price: null, texture: 'woven' },
  { id: 'taupe', name: 'تاوب دافئ', en: 'Warm Taupe', color: '#9b8877', price: null, texture: 'linen' },
  { id: 'blue', name: 'أزرق ضبابي', en: 'Misty Blue', color: '#9baeb4', price: null, texture: 'woven' },
  { id: 'charcoal', name: 'رمادي فحمي', en: 'Charcoal', color: '#555957', price: null, texture: 'plain' },
]

const styles = [
  { id: 'wave', name: 'ويف مودرن', desc: 'تموجات هادئة وانسيابية' },
  { id: 'classic', name: 'كلاسيك', desc: 'ثنيات غنية بطابع راقٍ' },
  { id: 'eyelet', name: 'حلقات معدنية', desc: 'مظهر بسيط وعصري' },
]

function Curtain({ color, open, style }) {
  return <div className={`curtain-pair ${open ? 'is-open' : ''} style-${style}`} style={{ '--fabric': color }}>
    <div className="curtain left"><span /></div>
    <div className="curtain right"><span /></div>
  </div>
}

function PanoramaPreview({ panorama, roomName }) {
  const host = useRef(null); const [status, setStatus] = useState('loading'); const [error, setError] = useState('')
  useEffect(() => {
    const THREE = window.THREE; const mount = host.current
    if (!mount || !THREE || !THREE.OrbitControls || !panorama?.src) { setStatus('unavailable'); return }
    let renderer, controls, observer, frame, texture
    const scene = new THREE.Scene(); const camera = new THREE.PerspectiveCamera(72, mount.clientWidth / mount.clientHeight, 0.1, 1100); camera.position.set(0, 0, 0.1)
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true }); renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2)); renderer.setSize(mount.clientWidth, mount.clientHeight); renderer.outputEncoding = THREE.sRGBEncoding; mount.appendChild(renderer.domElement)
      const geometry = new THREE.SphereGeometry(500, 72, 48); geometry.scale(-1, 1, 1); const material = new THREE.MeshBasicMaterial({ color: 0xffffff }); scene.add(new THREE.Mesh(geometry, material))
      controls = new THREE.OrbitControls(camera, renderer.domElement); controls.enableDamping = true; controls.dampingFactor = 0.055; controls.enablePan = false; controls.minDistance = 0.1; controls.maxDistance = 0.1; controls.minPolarAngle = 0.01; controls.maxPolarAngle = Math.PI - 0.01; controls.rotateSpeed = -0.28
      const loader = new THREE.TextureLoader(); loader.setCrossOrigin('anonymous'); loader.load(panorama.src, loaded => { texture = loaded; texture.encoding = THREE.sRGBEncoding; material.map = texture; material.needsUpdate = true; setStatus('ready') }, undefined, () => { setError('تعذر تحميل صورة البانوراما. تأكد من الرابط وإعدادات CORS.'); setStatus('error') })
      const resize = () => { if (!mount.clientWidth || !mount.clientHeight) return; camera.aspect = mount.clientWidth / mount.clientHeight; camera.updateProjectionMatrix(); renderer.setSize(mount.clientWidth, mount.clientHeight) }; observer = new ResizeObserver(resize); observer.observe(mount)
      const animate = () => { frame = requestAnimationFrame(animate); controls.update(); renderer.render(scene, camera) }; animate()
    } catch { setError('المتصفح لم يتمكن من تشغيل عارض 360° على هذا الجهاز.'); setStatus('error') }
    return () => { cancelAnimationFrame(frame); observer?.disconnect(); controls?.dispose(); texture?.dispose(); scene.traverse(object => { object.geometry?.dispose(); if (object.material) object.material.dispose() }); renderer?.dispose(); if (renderer?.domElement?.parentNode === mount) mount.removeChild(renderer.domElement) }
  }, [panorama?.src])
  return <div className="room-shell panorama-shell"><div className="room-top"><span>{roomName} · جولة 360° مصوّرة</span><span className="live-dot">{status === 'ready' ? 'البانوراما جاهزة' : status === 'error' ? 'تعذر التحميل' : 'جارٍ تحميل الصورة'}</span></div><div className="panorama-stage" ref={host} aria-label="جولة بانوراما 360 درجة">{status !== 'ready' && <div className="panorama-message">{status === 'error' ? error : 'جارٍ تحميل صورة الغرفة الأصلية…'}</div>}<div className="model-badge">360° · اسحب للتدوير واستخدم عجلة الماوس للتقريب</div></div><p className="panorama-note">هذه جولة مصوّرة من نقطة تصوير ثابتة؛ التنقل بين الغرف أو النقاط يتطلب صور بانوراما مرتبطة، وليست حركة حرة داخل مجسم ثلاثي الأبعاد.</p></div>
}
function RoomPreview({ fabric, style, open, setOpen, roomId, materialImage }) {
  const host = useRef(null)
  const sceneRef = useRef(null)
  const [ready, setReady] = useState(false)
  const [upholstery, setUpholstery] = useState('#b9a58b')

  useEffect(() => {
    const THREE = window.THREE
    if (!host.current || !THREE || !THREE.OrbitControls) return
    const mount = host.current
    const scene = new THREE.Scene()
    const roomTone = roomId === 'bedroom' ? '#d8d2cb' : roomId === 'balcony' ? '#d6dfd9' : '#d9d1c4'
    scene.background = new THREE.Color(roomTone)
    scene.fog = new THREE.Fog(roomTone, 13, 28)
    const camera = new THREE.PerspectiveCamera(48, mount.clientWidth / mount.clientHeight, 0.1, 100)
    camera.position.set(0, 3.1, 8.8)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.outputEncoding = THREE.sRGBEncoding
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.12
    mount.appendChild(renderer.domElement)

    const controls = new THREE.OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.06
    controls.target.set(0, 1.35, 0)
    controls.minDistance = 4.5
    controls.maxDistance = 12
    controls.maxPolarAngle = Math.PI * 0.49
    controls.minPolarAngle = Math.PI * 0.18

    const mat = (color, roughness=.78, metalness=0) => new THREE.MeshStandardMaterial({color,roughness,metalness})
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(18,18),mat('#b5a58e'))
    floor.rotation.x = -Math.PI/2; floor.position.y = -0.03; floor.receiveShadow = true; scene.add(floor)
    const backWall = new THREE.Mesh(new THREE.PlaneGeometry(12,6),mat('#e8e0d3'))
    backWall.position.set(0,3,-3.2); backWall.receiveShadow=true; scene.add(backWall)
    const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(6.5,6),mat('#d8cbbb'))
    leftWall.rotation.y=Math.PI/2; leftWall.position.set(-6,3,0); scene.add(leftWall)
    const rightWall = new THREE.Mesh(new THREE.PlaneGeometry(6.5,6),mat('#d8cbbb'))
    rightWall.rotation.y=-Math.PI/2; rightWall.position.set(6,3,0); scene.add(rightWall)

    const windowFrame = new THREE.Group()
    const frameMat=mat('#8b745a',.42)
    const glassMat=new THREE.MeshStandardMaterial({color:'#9bbbc0',roughness:.18,metalness:.08,transparent:true,opacity:.72,emissive:'#263c40',emissiveIntensity:.16})
    const glass=new THREE.Mesh(new THREE.PlaneGeometry(4.15,2.65),glassMat)
    glass.position.set(0,2.45,-3.12); windowFrame.add(glass)
    ;[[-2.13,0.12],[2.13,0.12]].forEach(([x])=>{const v=new THREE.Mesh(new THREE.BoxGeometry(.09,2.85,.12),frameMat);v.position.set(x,2.45,-3.08);windowFrame.add(v)})
    ;[1.02,3.88].forEach(y=>{const h=new THREE.Mesh(new THREE.BoxGeometry(4.35,.09,.12),frameMat);h.position.set(0,y,-3.08);windowFrame.add(h)})
    const mullion=new THREE.Mesh(new THREE.BoxGeometry(.045,2.65,.1),frameMat);mullion.position.set(0,2.45,-3.04);windowFrame.add(mullion)
    scene.add(windowFrame)

    const makeFabricTexture = (hex, pattern='linen') => {
      const canvas=document.createElement('canvas');canvas.width=256;canvas.height=256
      const ctx=canvas.getContext('2d');ctx.fillStyle=hex;ctx.fillRect(0,0,256,256)
      for(let n=0;n<1250;n++){
        const x=Math.random()*256,y=Math.random()*256
        ctx.strokeStyle=n%2?'rgba(255,255,255,.12)':'rgba(40,30,20,.10)'
        ctx.lineWidth=pattern==='woven'?1.4:.8;ctx.beginPath()
        if(pattern==='woven'){ctx.moveTo(x,y);ctx.lineTo(x+Math.random()*5,y+5)}else{ctx.moveTo(x,y);ctx.lineTo(x+3,y)}
        ctx.stroke()
      }
      const texture=new THREE.CanvasTexture(canvas);texture.wrapS=texture.wrapT=THREE.RepeatWrapping
      texture.repeat.set(2,2);texture.encoding=THREE.sRGBEncoding;return texture
    }
    const curtainMat = new THREE.MeshStandardMaterial({map:makeFabricTexture('#c7b79e'),roughness:.96,side:THREE.DoubleSide})
    const sofaMat = new THREE.MeshStandardMaterial({map:makeFabricTexture(upholstery,'woven'),roughness:.95})
    const curtainGroup = new THREE.Group()
    const curtainMeshes=[]
    const createCurtainPanel = (side) => {
      const width=1.22, height=2.95, segments=72, rows=24
      const positions=[],uvs=[],indices=[]
      for(let y=0;y<=rows;y++){
        const v=y/rows
        for(let x=0;x<=segments;x++){
          const u=x/segments
          positions.push((u-.5)*width, (v-.5)*height, 0)
          uvs.push(u*2,v*2)
        }
      }
      for(let y=0;y<rows;y++)for(let x=0;x<segments;x++){
        const a=y*(segments+1)+x,b=a+segments+1
        indices.push(a,b,a+1,b,b+1,a+1)
      }
      const geo=new THREE.BufferGeometry()
      geo.setAttribute('position',new THREE.Float32BufferAttribute(positions,3))
      geo.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2));geo.setIndex(indices);geo.computeVertexNormals()
      const mesh=new THREE.Mesh(geo,curtainMat);mesh.castShadow=true;mesh.receiveShadow=true
      mesh.position.set(side*1.35,2.42,-2.94);mesh.userData.closedX=side*1.35;mesh.userData.openX=side*2.25
      mesh.userData.applyStyle=(styleId='wave')=>{
        const presets={wave:{count:18,depth:.075,ripple:.045},classic:{count:24,depth:.105,ripple:.065},eyelet:{count:10,depth:.045,ripple:.025}}
        const preset=presets[styleId]||presets.wave;const attribute=geo.attributes.position
        for(let y=0;y<=rows;y++)for(let x=0;x<=segments;x++){
          const u=x/segments;const index=y*(segments+1)+x;const phase=u*Math.PI*preset.count
          attribute.setXYZ(index,(u-.5)*width+Math.cos(phase)*preset.depth,(y/rows-.5)*height,Math.sin(phase)*preset.ripple)
        }
        attribute.needsUpdate=true;geo.computeVertexNormals()
      }
      mesh.userData.applyStyle(style)
      curtainGroup.add(mesh);curtainMeshes.push(mesh)
    }
    createCurtainPanel(-1);createCurtainPanel(1);scene.add(curtainGroup)

    const sofa = new THREE.Group()
    const addSofaBox=(w,h,d,x,y,z,material,round=false)=>{
      const geometry=round?new THREE.BoxGeometry(w,h,d,4,2,4):new THREE.BoxGeometry(w,h,d)
      const mesh=new THREE.Mesh(geometry,material);mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;sofa.add(mesh);return mesh
    }
    const cushionMat=new THREE.MeshStandardMaterial({map:makeFabricTexture('#d7c9b4','woven'),roughness:1})
    if(roomId === 'bedroom'){
      addSofaBox(2.65,.38,2.15,0,.48,1.0,sofaMat)
      addSofaBox(2.7,.48,.28,0,.88,-.02,sofaMat)
      for(let x=-.72;x<=.73;x+=1.44){
        const pillow=new THREE.Mesh(new THREE.BoxGeometry(.88,.2,.62),cushionMat)
        pillow.position.set(x, .78, .18);pillow.castShadow=true;sofa.add(pillow)
      }
      const bedThrow=new THREE.Mesh(new THREE.BoxGeometry(1.35,.06,1.15),cushionMat)
      bedThrow.position.set(.48,.7,1.28);sofa.add(bedThrow)
    } else if(roomId === 'balcony'){
      for(const x of [-1.25,1.25]){
        addSofaBox(.95,.18,.9,x,.62,.75,sofaMat)
        addSofaBox(.95,.82,.18,x,1.02,.32,sofaMat)
        addSofaBox(.14,.58,.72,x-.38,.78,.7,sofaMat)
        addSofaBox(.14,.58,.72,x+.38,.78,.7,sofaMat)
      }
    } else {
      addSofaBox(3.55,.42,1.12,0,.58,.35,sofaMat)
      addSofaBox(3.5,1.05,.34,0,1.18,-.16,sofaMat)
      addSofaBox(.42,.88,1.05,-1.78,.86,.38,sofaMat)
      addSofaBox(.42,.88,1.05,1.78,.86,.38,sofaMat)
      for(let x=-1.15;x<=1.16;x+=1.15){
        const cushion=new THREE.Mesh(new THREE.BoxGeometry(1.02,.22,.72),cushionMat)
        cushion.position.set(x,.9,.28);cushion.rotation.x=-.08;cushion.castShadow=true;sofa.add(cushion)
        const back=new THREE.Mesh(new THREE.BoxGeometry(1.02,.72,.24),cushionMat)
        back.position.set(x,1.48,-.03);back.castShadow=true;sofa.add(back)
      }
    }
    sofa.position.z=1.25;scene.add(sofa)

    const coffeeTable=new THREE.Mesh(new THREE.CylinderGeometry(.9,.9,.12,64),mat('#4b4036',.22,.55))
    coffeeTable.position.set(0,.42,2.95);coffeeTable.castShadow=true;scene.add(coffeeTable)
    const tableBase=new THREE.Mesh(new THREE.CylinderGeometry(.48,.55,.38,32),mat('#92744e',.28,.65))
    tableBase.position.set(0,.22,2.95);scene.add(tableBase)
    const rug=new THREE.Mesh(new THREE.BoxGeometry(6,.045,4.2),mat('#d8ccba'))
    rug.position.set(0,.02,1.55);rug.receiveShadow=true;scene.add(rug)
    const plant=new THREE.Group()
    const pot=new THREE.Mesh(new THREE.CylinderGeometry(.25,.19,.48,24),mat('#ad8c68'));pot.position.y=.25;plant.add(pot)
    for(let n=0;n<9;n++){const leaf=new THREE.Mesh(new THREE.SphereGeometry(.12,10,8),mat('#4d6553'));leaf.scale.set(1.1,3.2,.55);leaf.position.set(Math.sin(n*2.1)*.28,1+n*.07,Math.cos(n*2.1)*.22);leaf.rotation.z=(n-4)*.16;plant.add(leaf)}
    plant.position.set(-3.25,0,-.7);scene.add(plant)

    const ambient=new THREE.HemisphereLight('#fff4df','#77634d',2.0);scene.add(ambient)
    const sun=new THREE.DirectionalLight('#fff0d8',3.0);sun.position.set(-3,7,5);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);scene.add(sun)
    const fillLight=new THREE.PointLight('#d5e7ef',18,12);fillLight.position.set(0,3,-2.2);scene.add(fillLight)

    const resize=()=>{if(!mount.clientWidth||!mount.clientHeight)return;camera.aspect=mount.clientWidth/mount.clientHeight;camera.updateProjectionMatrix();renderer.setSize(mount.clientWidth,mount.clientHeight)}
    const observer=new ResizeObserver(resize);observer.observe(mount)
    let frame=0
    const animate=()=>{frame=requestAnimationFrame(animate);controls.update();renderer.render(scene,camera)}
    animate()
    sceneRef.current={THREE,scene,renderer,camera,controls,curtainMeshes,curtainMat,sofaMat,makeFabricTexture}
    setReady(true)
    return ()=>{cancelAnimationFrame(frame);observer.disconnect();controls.dispose();renderer.dispose();scene.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material){const ms=Array.isArray(o.material)?o.material:[o.material];ms.forEach(m=>m.dispose())}});if(renderer.domElement.parentNode===mount)mount.removeChild(renderer.domElement);sceneRef.current=null;setReady(false)}
  }, [roomId])

  useEffect(()=>{
    const state=sceneRef.current;if(!state)return
    const color=fabric?.color||'#c7b79e'
    const fallbackTexture=state.makeFabricTexture(color, fabric?.texture||'linen')
    state.curtainMat.map?.dispose();state.curtainMat.map=fallbackTexture;state.curtainMat.needsUpdate=true
    let active=true
    if(materialImage){
      const loader=new state.THREE.TextureLoader();loader.setCrossOrigin('anonymous')
      loader.load(materialImage,texture=>{
        if(!active){texture.dispose();return}
        texture.wrapS=state.THREE.RepeatWrapping;texture.wrapT=state.THREE.RepeatWrapping
        texture.repeat.set(2,2);texture.encoding=state.THREE.sRGBEncoding
        state.curtainMat.map?.dispose();state.curtainMat.map=texture;state.curtainMat.needsUpdate=true
      },undefined,()=>{})
    }
    const sofaTexture=state.makeFabricTexture(upholstery,'woven')
    state.sofaMat.map?.dispose();state.sofaMat.map=sofaTexture;state.sofaMat.needsUpdate=true
    state.curtainMeshes.forEach(mesh=>{mesh.position.x=open?mesh.userData.openX:mesh.userData.closedX;mesh.userData.applyStyle?.(style)})
    return ()=>{active=false}
  },[fabric,upholstery,open,style,ready,materialImage])

  return <div className="room-shell model-shell">
    <div className="room-top"><span>{demoRooms.find(room=>room.id===roomId)?.name || 'استوديو ثلاثي الأبعاد'}</span><span className="live-dot">{ready?'3D تفاعلي جاهز · 360° يتطلب صور الغرف':'جارٍ تجهيز المشهد'}</span></div>
    <div className="model-stage" ref={host} aria-label="غرفة ثلاثية الأبعاد قابلة للدوران وتخصيص الأقمشة">
      {!ready&&<div className="model-loading">جارٍ تحميل الاستوديو ثلاثي الأبعاد…</div>}
      <div className="model-badge">3D · تحريك وتدوير بالماوس أو اللمس</div>
    </div>
    <div className="model-tools">
      <button type="button" className="preview-toggle" onClick={()=>setOpen(!open)}>{open?'إغلاق الستائر':'فتح الستائر'}</button>
      <span>خامة الستارة: {fabric?.name||'كتان طبيعي'}</span>
      <div className="upholstery-picker"><span>تنجيد الأثاث</span>{['#b9a58b','#777f87','#53685a','#3d4654','#9a755b'].map(color=><button key={color} type="button" aria-label={'لون التنجيد '+color} className={upholstery===color?'active':''} style={{background:color}} onClick={()=>setUpholstery(color)}/>)}</div>
    </div>
    <div className="preview-caption">مشهد 3D تجريبي مولّد داخل المتصفح؛ يمكن تدويره بحرية. {materialImage ? 'تم تطبيق صورة الخامة المختارة كنسيج بصري إرشادي على الستارة، وليست خريطة PBR معايرة أو محاكاة دقيقة لاتجاه النسيج والإضاءة.' : 'يُستخدم نسيج إجرائي مؤقت حتى اختيار خامة لها صورة موثقة.'} ليس تصويرًا فوتوغرافيًا أو جولة 360° ملتقطة.</div>
  </div>
}

export default function App() {
  const [roomId, setRoomId] = useState('living')
  const [viewMode, setViewMode] = useState('3d')
  const [fabricId, setFabricId] = useState('linen')
  const [catalogQuery, setCatalogQuery] = useState('')
  const [selectedCatalogId, setSelectedCatalogId] = useState('')
  const selectedCatalog = fabricCatalog.find(item => item.id === selectedCatalogId)
  const filteredCatalog = fabricCatalog.filter(item => item.name.toLocaleLowerCase().includes(catalogQuery.trim().toLocaleLowerCase())).slice(0, 80)
  const [style, setStyle] = useState('wave')
  const [open, setOpen] = useState(false)
  const [openings, setOpenings] = useState(demoRooms[0].openings)
  const activeRoom = demoRooms.find(room => room.id === roomId) || demoRooms[0]
  const viewingModes = getRoomViewingModes(activeRoom)
  const changeRoom = id => { const room = demoRooms.find(item => item.id === id); if (!room) return; setRoomId(id); setViewMode('3d'); setOpenings(room.openings.map(item => ({...item}))); setActiveOpeningId(room.openings[0].id) }
  const [activeOpeningId, setActiveOpeningId] = useState(1)
  const activeOpening = openings.find(item => item.id === activeOpeningId) || openings[0]
  const updateOpening = (field, value) => setOpenings(items => items.map(item => item.id === activeOpeningId ? { ...item, [field]: value } : item))
  const addOpening = () => {
    const id = Math.max(0, ...openings.map(item => Number(item.id) || 0)) + 1
    setOpenings(items => [...items, { id, name: `فتحة جديدة ${id}`, type: 'window', widthCm: '', heightCm: '', hasPelmet: false, pelmetDepthCm: '15', slopeCm: '0', topAllowanceCm: '20', bottomAllowanceCm: '20', fullness: '2', layers: '1', notes: '' }])
    setActiveOpeningId(id)
  }
  const removeOpening = id => {
    if (openings.length === 1) return
    const remaining = openings.filter(item => item.id !== id)
    setOpenings(remaining)
    if (activeOpeningId === id) setActiveOpeningId(remaining[0].id)
  }
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [saved, setSaved] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const fabric = fabrics.find(f => f.id === fabricId)
  const openingEstimates = useMemo(() => openings.map(item => ({ ...item, ...calculateFabricRequirement(item, fabric.price) })), [openings, fabric, selectedCatalog])
  const estimate = openingEstimates.every(item => item.pricingAvailable) ? openingEstimates.reduce((sum, item) => sum + item.estimateEgp, 0) : null
  const saveDesign = () => {
    const design = { roomId, roomName: activeRoom.name, fabricId, fabric: fabric.name, catalogFabricId: selectedCatalogId || null, catalogFabric: selectedCatalog?.name || null, catalogSource: selectedCatalog?.sourceUrl || null, styleId: style, style: styles.find(s => s.id === style).name, openings, openingEstimates, estimate, pricingStatus: 'awaiting-approved-price-list', savedAt: new Date().toISOString() }
    localStorage.setItem('nss-design', JSON.stringify(design))
    setSaved(true)
    setTimeout(() => setSaved(false), 3500)
  }
  const restoreDesign = () => {
    try {
      const design = JSON.parse(localStorage.getItem('nss-design') || 'null')
      if (!design || !Array.isArray(design.openings) || !design.openings.length) return
      if (demoRooms.some(item => item.id === design.roomId)) setRoomId(design.roomId)
      if (fabrics.some(item => item.id === design.fabricId)) setFabricId(design.fabricId)
      else if (design.fabric) setFabricId(fabrics.find(item => item.name === design.fabric)?.id || 'linen')
      const catalogId = design.catalogFabricId || fabricCatalog.find(item => item.name === design.catalogFabric)?.id || ''
      setSelectedCatalogId(catalogId)
      if (styles.some(item => item.id === design.styleId)) setStyle(design.styleId)
      else if (design.style) setStyle(styles.find(item => item.name === design.style)?.id || 'wave')
      setOpenings(design.openings)
      setActiveOpeningId(design.openings[0].id)
      setSaved(false)
    } catch {
      window.alert('تعذر قراءة التصميم المحفوظ. احفظ التصميم مرة أخرى من فضلك.')
    }
  }
  const hasSavedDesign = Boolean(localStorage.getItem('nss-design'))

  return <div className="app">
    <header className="header">
      <a className="brand" href="#home"><span className="brand-mark">NS</span><span><b>NAGUIB SELIM</b><small>STUDIO · CURTAINS & FABRICS</small></span></a>
      <nav className={menuOpen ? 'nav nav-open' : 'nav'}>
        <a href="#studio" onClick={() => setMenuOpen(false)}>الاستوديو</a><a href="#collections" onClick={() => setMenuOpen(false)}>الخامات</a><a href="#how" onClick={() => setMenuOpen(false)}>كيف نعمل</a>
      </nav>
      <a className="header-cta" href="#contact">اطلب استشارة <ArrowLeft size={16}/></a>
      <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="القائمة">{menuOpen ? <X/> : <Menu/>}</button>
    </header>

    <main id="home">
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span /> فن التفاصيل يصنع الفرق</div>
          <h1>مساحتك،<br/><em>بلمستك الخاصة.</em></h1>
          <p>اكتشف كيف يمكن للقماش المناسب والتصميم المدروس أن يحوّلا تفاصيل منزلك إلى مساحة تعبّر عنك.</p>
          <a className="primary-btn" href="#studio">ابدأ تصميمك <ArrowLeft size={17}/></a>
          <div className="hero-note"><Sparkles size={15}/> اختيارات مدروسة · تفاصيل تصنع الفارق</div>
        </div>
        <div className="hero-visual">
          <div className="hero-image">
            <div className="hero-window"><div className="hero-light" /><div className="hero-drape d-left"/><div className="hero-drape d-right"/></div>
            <div className="hero-sofa"><span/><span/><i/></div>
            <div className="hero-table"/>
            <div className="hero-plant"><i/><i/><i/><b/></div>
          </div>
          <div className="hero-stamp"><b>01</b><span>DESIGN<br/>YOUR SPACE</span></div>
        </div>
      </section>

      <section className="studio-section" id="studio">
        <div className="section-heading"><div><div className="eyebrow dark"><span/> مساحة التجربة</div><h2>صمّمها كما <em>تتخيّلها</em></h2></div><p>غيّر الخامة والستايل، وعاين النتيجة فوراً. اختياراتك محفوظة على جهازك.</p></div>
        <div className="design-directions"><div className="directions-heading"><b>3 اتجاهات تصميم مقترحة</b><small>اختار مستوى يناسب ذوقك وميزانيتك؛ الأسعار النهائية تعتمد على تسعير المعرض</small></div><div className="direction-cards">{designDirections.map(direction=><button type="button" key={direction.id} className="direction-card" onClick={()=>{setFabricId(direction.fabricId);setSelectedCatalogId('');setStyle(direction.styleId);setOpenings(items=>items.map(item=>({...item,layers:String(direction.layers),fullness:String(direction.fullness)})))}}><span>{direction.tier}</span><b>{direction.name}</b><small>{direction.description}</small><em>جرّب التصميم</em></button>)}</div></div><div className="demo-room-switcher" aria-label="اختيار غرفة العرض"><div><b>اختر مساحة التجربة</b><small>شقة تجريبية متنوعة · Living / Bedroom / Balcony</small></div><div className="demo-room-buttons">{demoRooms.map(room=><button type="button" key={room.id} className={roomId===room.id?'active':''} onClick={()=>changeRoom(room.id)}>{room.name}</button>)}</div></div><div className="view-mode-status" aria-label="حالة أوضاع المعاينة"><button type="button" className={viewMode === "3d" ? "view-mode-card active" : "view-mode-card"} onClick={() => setViewMode("3d")}><b>{viewingModes.model3d.label}</b><small>{viewingModes.model3d.description}</small><span>متاح الآن</span></button><button type="button" className={viewingModes.panorama.available ? (viewMode === "360" ? "view-mode-card active" : "view-mode-card") : "view-mode-card unavailable"} disabled={!viewingModes.panorama.available} onClick={() => setViewMode("360")}><b>{viewingModes.panorama.label}</b><small>{viewingModes.panorama.description}</small><span>{viewingModes.panorama.available ? "افتح الجولة المصوّرة" : "بانوراما أصلية مرخصة غير مضافة بعد"}</span></button></div><div className="configurator">
          <div className="controls">
            <div className="control-block">
              <div className="control-title"><span className="step">01</span><div><h3>اختر الخامة</h3><small>FABRIC COLLECTION</small></div></div>
              <div className="fabric-grid">{fabrics.map(f => <button key={f.id} className={`fabric-option ${fabricId === f.id ? 'selected' : ''}`} onClick={() => {setFabricId(f.id);setSelectedCatalogId('')}}><span className={`swatch ${f.texture}`} style={{'--swatch': f.color}}>{fabricId === f.id && !selectedCatalog && <Check size={15}/>}</span><span>{f.name}</span></button>)}</div>
              <div className="catalog-picker">
                <label htmlFor="fabric-catalog-search">كتالوج خامات المعرض — ابحث بالاسم أو الكود</label>
                <input id="fabric-catalog-search" type="search" value={catalogQuery} onChange={e => setCatalogQuery(e.target.value)} placeholder="مثال: moon أو 31366 أو rabbit" />
                <div className="catalog-results">
                  {filteredCatalog.map(item => <button type="button" key={item.id} className={selectedCatalogId === item.id ? 'catalog-item selected' : 'catalog-item'} onClick={() => setSelectedCatalogId(item.id)}>{item.imageUrl && <img src={item.imageUrl} alt="" loading="lazy" />}<span>{item.name}</span></button>)}
                </div>
                <small>تمت إضافة {fabricCatalog.length} اسم/كود بعد إزالة التكرارات. اكتب أي اسم أو كود للبحث؛ نعرض أول 80 نتيجة مطابقة في كل مرة. لا نعرض سعراً أو صورة كبيانات مؤكدة إلا بعد التحقق من مصدرها.</small>
                {selectedCatalog && <div className="catalog-selected"><b>الخامة المختارة: {selectedCatalog.name}</b><a href={selectedCatalog.sourceUrl} target="_blank" rel="noreferrer">{selectedCatalog.sourceUrl.includes('/products/') ? 'صفحة المنتج الرسمية' : 'ابحث في الموقع الرسمي'}</a>{selectedCatalog.alternateSourceUrl && <a href={selectedCatalog.alternateSourceUrl} target="_blank" rel="noreferrer">النسخة الأخرى من الخامة</a>}{selectedCatalog.alternateSourceUrl2 && <a href={selectedCatalog.alternateSourceUrl2} target="_blank" rel="noreferrer">النسخة الثالثة من الخامة</a>}{selectedCatalog.alternateSourceUrl2 && <a href={selectedCatalog.alternateSourceUrl2} target="_blank" rel="noreferrer">نسخة إضافية من الخامة</a>}{selectedCatalog.imageUrl && <img src={selectedCatalog.imageUrl} alt={selectedCatalog.name} />}<small>{selectedCatalog.note ? `${selectedCatalog.note} ` : ''}{selectedCatalog.imageUrl ? 'تُستخدم الصورة الآن كنسيج بصري إرشادي على الستارة؛ لكنها ليست خريطة PBR معايرة، وقد يختلف مظهرها عن القماش الحقيقي بسبب إضاءة صورة المنتج واتجاه النسيج.' : 'لا توجد صورة رسمية موثقة لهذه الخامة حتى الآن؛ ستظل المعاينة على نسيج إجرائي مؤقت.'}</small></div>}
              </div>
              <div className="fabric-detail"><span className="detail-dot" style={{background:fabric.color}}/><span>{selectedCatalog ? selectedCatalog.name : fabric.en}</span><b>{selectedCatalog ? (selectedCatalog.priceEgp ? `${selectedCatalog.priceEgp.toLocaleString('en-US')} ج.م · سعر مرصود يحتاج تأكيد وحدة البيع` : 'السعر ووحدة البيع: يلزم تأكيد من المعرض') : 'السعر ووحدة البيع: يلزم تأكيد من المعرض'}</b></div>
            </div>
            <div className="control-block">
              <div className="control-title"><span className="step">02</span><div><h3>اختار شكل الستارة</h3><small>CURTAIN STYLE</small></div></div>
              <div className="style-list">{styles.map(s => <button key={s.id} className={`style-option ${style === s.id ? 'selected' : ''}`} onClick={() => setStyle(s.id)}><span className={`style-icon ${s.id}`}><i/><i/><i/></span><span><b>{s.name}</b><small>{s.desc}</small></span>{style === s.id && <Check className="style-check" size={17}/>}</button>)}</div>
            </div>
            <div className="control-block dimensions">
              <div className="control-title"><span className="step">03</span><div><h3>قياسات الشبابيك والبلكونات</h3><small>ALL DIMENSIONS IN CM · سم</small></div></div>
              <div className="opening-tabs">
                {openings.map(item => <div className={item.id === activeOpeningId ? 'opening-tab active' : 'opening-tab'} key={item.id}>
                  <button type="button" onClick={() => setActiveOpeningId(item.id)}>{item.name}</button>
                  {openings.length > 1 && <button type="button" aria-label="حذف الفتحة" onClick={() => removeOpening(item.id)}>×</button>}
                </div>)}
                <button type="button" className="add-opening" onClick={addOpening}>+ إضافة شباك / بلكونة</button>
              </div>
              <label className="wide-field">اسم الفتحة<input value={activeOpening.name} onChange={e => updateOpening('name', e.target.value)} placeholder="مثال: شباك غرفة النوم" /></label>
              <label className="wide-field">نوع الفتحة<select value={activeOpening.type} onChange={e => updateOpening('type', e.target.value)}><option value="window">شباك</option><option value="balcony">بلكونة / باب جرار</option></select></label>
              <div className="dimension-fields">
                <label>العرض (سم)<input type="number" min="1" max="2000" step="0.1" inputMode="decimal" value={activeOpening.widthCm} onChange={e => updateOpening('widthCm', e.target.value)} /></label>
                <label>الارتفاع (سم)<input type="number" min="1" max="2000" step="0.1" inputMode="decimal" value={activeOpening.heightCm} onChange={e => updateOpening('heightCm', e.target.value)} /></label>
              </div>
              <div className="dimension-fields">
                <label>زيادة أعلى الستارة (سم)<input type="number" min="0" max="200" step="0.5" value={activeOpening.topAllowanceCm} onChange={e => updateOpening('topAllowanceCm', e.target.value)} /></label>
                <label>زيادة الذيل أسفل (سم)<input type="number" min="0" max="200" step="0.5" value={activeOpening.bottomAllowanceCm} onChange={e => updateOpening('bottomAllowanceCm', e.target.value)} /></label>
              </div>
              <div className="dimension-fields">
                <label>فرق الميل / عدم الاستواء (سم)<input type="number" min="0" max="200" step="0.5" value={activeOpening.slopeCm} onChange={e => updateOpening('slopeCm', e.target.value)} /></label>
                <label>امتلاء الثنيات<select value={activeOpening.fullness} onChange={e => updateOpening('fullness', e.target.value)}><option value="1.5">خفيف × 1.5</option><option value="2">متوسط × 2</option><option value="2.5">كثيف × 2.5</option><option value="3">فاخر × 3</option></select></label>
              </div>
              <label className="wide-field">طبقات القماش<select value={activeOpening.layers} onChange={e => updateOpening('layers', e.target.value)}><option value="1">طبقة واحدة</option><option value="2">شفاف + بلاك أوت (طبقتان)</option></select></label>
              <label className="pelmet-toggle"><input type="checkbox" checked={activeOpening.hasPelmet} onChange={e => updateOpening('hasPelmet', e.target.checked)} /> يوجد بيت ستارة / صندوق مخفي</label>
              {activeOpening.hasPelmet && <label className="wide-field">عمق بيت الستارة (سم)<input type="number" min="1" max="200" step="0.5" value={activeOpening.pelmetDepthCm} onChange={e => updateOpening('pelmetDepthCm', e.target.value)} /></label>}
              <label className="wide-field">ملاحظات المعاينة<textarea rows="2" value={activeOpening.notes} onChange={e => updateOpening('notes', e.target.value)} placeholder="ميول، بروز، عوائق، طريقة التثبيت..." /></label>
              <div className="estimate"><span><Ruler size={16}/> استهلاك الخامات التقديري</span><b>{openingEstimates.every(item => item.valid) ? `${openingEstimates.reduce((sum,item)=>sum+item.fabricAreaM2,0).toFixed(2)} م²` : '—'}</b></div><p className="estimate-note">سعر البيع غير معروض حاليًا لعدم توفر قائمة أسعار معتمدة ووحدة بيع مؤكدة من الاستوديو. لن نخترع سعرًا أو نقدم مقايسة غير موثوقة.</p>
              <div className="estimate-note">
                {openingEstimates.map(item => <p key={item.id}>{item.name}: {item.valid ? `${item.fabricAreaM2.toFixed(2)} م² خامة تقريبًا${item.pricingAvailable ? ` · ${item.estimateEgp.toLocaleString('en-US')} ج.م` : ''}` : 'أدخل عرضًا وارتفاعًا صحيحين بالسم لإظهار التقدير.'}</p>)}
              </div>
              {selectedCatalog && <p className="estimate-note">تنبيه: سعر صفحة المنتج المعروض مرجعي فقط وقد يكون مرتبطاً بمتغير أو وحدة بيع مختلفة. تقدير التكلفة الحالي ما زال تجريبياً ولا يستخدم سعر هذه الخامة كمقايسة.</p>}
              <p className="estimate-note">الحساب استرشادي ويعتمد على معامل الثنيات والزيادات وعدد الطبقات وهالك تقديري. لا يُعد مقايسة نهائية قبل المعاينة وقياس الموقع.</p>
              <p className="estimate-note">أي قياس مستخرج من صورة أو كاميرا يظل تقديريًا حتى المعايرة والتأكيد البشري. جميع المدخلات بالسنتيمتر.</p>
            </div>
            <div className="save-actions"><button className="save-btn" onClick={saveDesign}>{saved ? <><Check size={17}/> تم حفظ التصميم على جهازك</> : <>احفظ اختياراتي <ArrowLeft size={17}/></>}</button><button className="restore-btn" type="button" onClick={restoreDesign} disabled={!hasSavedDesign}>استرجاع آخر تصميم محفوظ</button></div>
          </div>
          <div className="preview-column">{viewMode === "360" && viewingModes.panorama.available ? <PanoramaPreview panorama={activeRoom.panorama} roomName={activeRoom.name} /> : <RoomPreview fabric={fabric} style={style} open={open} setOpen={setOpen} roomId={roomId} materialImage={selectedCatalog?.imageUrl || null} />}</div>
        </div>
      </section>

      <section className="collections" id="collections">
        <div className="section-heading"><div><div className="eyebrow dark"><span/> مختارات الاستوديو</div><h2>الخامة تحكي <em>حكاية</em></h2></div><p>درجات هادئة وملامس متنوعة تمنح كل مساحة شخصيتها الخاصة.</p></div>
        <div className="collection-cards">{fabrics.slice(0,4).map((f,i)=><button className="collection-card" key={f.id} onClick={()=>{setFabricId(f.id);document.getElementById('studio').scrollIntoView({behavior:'smooth'})}}><div className={`fabric-photo fabric-${i}`} style={{'--fabric':f.color}}><span className="fabric-number">0{i+1}</span><span className="fabric-chip"/></div><div className="collection-info"><span>{f.en}</span><b>{f.name}</b><ArrowLeft size={17}/></div></button>)}</div>
      </section>

      <section className="process" id="how"><div className="process-inner"><div><div className="eyebrow"><span/> من الفكرة للتنفيذ</div><h2>تفاصيلك تستحق<br/><em>اهتماماً خاصاً.</em></h2></div><div className="process-steps"><div><b>01</b><span><strong>اكتشف</strong><small>استكشف الخامات والتصميمات.</small></span></div><div><b>02</b><span><strong>خصّص</strong><small>اختار التفاصيل والمقاسات.</small></span></div><div><b>03</b><span><strong>تواصل</strong><small>ناقش اختيارك مع فريقنا.</small></span></div></div></div></section>

      <section className="contact" id="contact"><div className="contact-copy"><div className="eyebrow dark"><span/> خطوتك التالية</div><h2>خلّينا نبدأ <em>حكاية جديدة.</em></h2><p>شاركنا بياناتك واختياراتك، وفريقنا يقدر يساعدك في الخطوة التالية.</p></div><form className="contact-form" onSubmit={e=>{e.preventDefault();const selectedStyle=styles.find(item=>item.id===style)?.name||style;const details=openings.map((item,index)=>{const calc=openingEstimates[index];return `• ${item.name} (${item.type==='balcony'?'بلكونة/باب جرار':'شباك'}): العرض ${item.widthCm} سم × الارتفاع ${item.heightCm} سم؛ زيادة أعلى ${item.topAllowanceCm} سم؛ ذيل ${item.bottomAllowanceCm} سم؛ فرق ميل ${item.slopeCm} سم؛ ثنيات ×${item.fullness}؛ طبقات ${item.layers}; بيت ستارة ${item.hasPelmet?'نعم، عمق '+item.pelmetDepthCm+' سم':'لا'}؛ استهلاك تقديري ${calc.valid?calc.fabricAreaM2.toFixed(2)+' م²':'يحتاج استكمال القياسات'}${item.notes?'؛ ملاحظات: '+item.notes:''}`}).join('\\n');const msg=[ 'طلب معاينة وتصميم — Naguib Selim Studio', 'الاسم: '+fullName, 'رقم التواصل: '+phone, 'الغرفة: '+activeRoom.name, 'الخامة: '+(selectedCatalog?.name||fabric.name), 'الموديل: '+selectedStyle, 'حالة الستارة: '+(open?'مفتوحة':'مغلقة'), 'الفتحات والمقاسات:', details, 'إجمالي استهلاك الخامات التقديري: '+(openingEstimates.every(item=>item.valid)?openingEstimates.reduce((sum,item)=>sum+item.fabricAreaM2,0).toFixed(2)+' م²':'غير مكتمل'), 'السعر النهائي: مطلوب تأكيده من المعرض بعد مراجعة وحدة البيع والمعاينة.', 'برجاء التواصل لتأكيد الخامات والمقاسات والتكلفة.' ].join('\\n');window.open('https://wa.me/?text='+encodeURIComponent(msg),'_blank','noopener,noreferrer')}}><label>الاسم<input required value={fullName} onChange={e=>setFullName(e.target.value)} placeholder="اكتب اسمك"/></label><label>رقم الهاتف<input required value={phone} onChange={e=>setPhone(e.target.value)} placeholder="01xxxxxxxxx" dir="ltr"/></label><button className="primary-btn" type="submit">تواصل عبر واتساب <ArrowLeft size={17}/></button><small>سيتم فتح واتساب برسالة جاهزة، ولن يتم إرسال بياناتك تلقائياً.</small></form></section>
    </main>
    <footer><a className="brand footer-brand" href="#home"><span className="brand-mark">NS</span><span><b>NAGUIB SELIM</b><small>STUDIO · CURTAINS & FABRICS</small></span></a><span>© 2026 Naguib Selim Studio. جميع الحقوق محفوظة.</span><a href="#home">العودة للأعلى <ArrowDown size={14}/></a></footer>
  </div>
}
