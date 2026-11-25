import React, { useMemo, useState } from 'react'
import { calculateFabricRequirement } from './measurement.js'
import { ArrowDown, ArrowLeft, Check, ChevronDown, Eye, Menu, Ruler, Sparkles, X } from 'lucide-react'

const fabrics = [
  { id: 'linen', name: 'كتان طبيعي', en: 'Natural Linen', color: '#c9bda8', price: 680, texture: 'linen' },
  { id: 'ivory', name: 'أوف وايت', en: 'Soft Ivory', color: '#e8e1d3', price: 620, texture: 'plain' },
  { id: 'sage', name: 'أخضر سيج', en: 'Sage Green', color: '#9ba58f', price: 740, texture: 'woven' },
  { id: 'taupe', name: 'تاوب دافئ', en: 'Warm Taupe', color: '#9b8877', price: 720, texture: 'linen' },
  { id: 'blue', name: 'أزرق ضبابي', en: 'Misty Blue', color: '#9baeb4', price: 760, texture: 'woven' },
  { id: 'charcoal', name: 'رمادي فحمي', en: 'Charcoal', color: '#555957', price: 790, texture: 'plain' },
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

function RoomPreview({ fabric, open, style, setOpen }) {
  return <div className="room-shell">
    <div className="room-top"><span>معاينة التصميم</span><span className="live-dot">معاينة مباشرة</span></div>
    <div className="room-scene">
      <div className="ceiling" />
      <div className="wall">
        <div className="wall-art"><div className="art-inner" /></div>
        <div className="window">
          <div className="window-glass"><div className="sky" /><div className="building b1" /><div className="building b2" /><div className="plant-silhouette" /></div>
          <div className="window-frame" />
          <div className="rod"><i /><i /></div>
          <Curtain color={fabric.color} open={open} style={style} />
        </div>
        <div className="console"><div className="console-top" /><div className="console-body"><span /><span /><span /></div></div>
        <div className="vase"><i /></div>
        <div className="plant"><i /><i /><i /><b /></div>
      </div>
      <div className="floor"><div className="rug" /><div className="sofa"><div className="sofa-back" /><div className="sofa-seat" /><div className="sofa-arm left-arm" /><div className="sofa-arm right-arm" /><div className="cushion c1" /><div className="cushion c2" /></div><div className="table"><i /></div></div>
    </div>
    <button className="preview-toggle" onClick={() => setOpen(!open)}><Eye size={16}/>{open ? 'إغلاق الستائر' : 'فتح الستائر'}</button>
    <div className="preview-caption">غرفة معيشة · تصميم توضيحي قابل للتخصيص</div>
  </div>
}

export default function App() {
  const [fabricId, setFabricId] = useState('linen')
  const [style, setStyle] = useState('wave')
  const [open, setOpen] = useState(false)
  const [openings, setOpenings] = useState([{ id: 1, name: 'شباك غرفة المعيشة', type: 'window', widthCm: '300', heightCm: '270', hasPelmet: false, pelmetDepthCm: '15', slopeCm: '0', topAllowanceCm: '20', bottomAllowanceCm: '20', fullness: '2', layers: '1', notes: '' }])
  const [activeOpeningId, setActiveOpeningId] = useState(1)
  const activeOpening = openings.find(item => item.id === activeOpeningId) || openings[0]
  const updateOpening = (field, value) => setOpenings(items => items.map(item => item.id === activeOpeningId ? { ...item, [field]: value } : item))
  const addOpening = () => {
    const id = Math.max(0, ...openings.map(item => item.id)) + 1
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
  const openingEstimates = useMemo(() => openings.map(item => ({ ...item, ...calculateFabricRequirement(item, fabric.price) })), [openings, fabric])
  const estimate = openingEstimates.reduce((sum, item) => sum + item.estimateEgp, 0)
  const saveDesign = () => {
    const design = { fabric: fabric.name, style: styles.find(s => s.id === style).name, openings, openingEstimates, estimate, savedAt: new Date().toISOString() }
    localStorage.setItem('nss-design', JSON.stringify(design))
    setSaved(true)
    setTimeout(() => setSaved(false), 3500)
  }

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
        <div className="configurator">
          <div className="controls">
            <div className="control-block">
              <div className="control-title"><span className="step">01</span><div><h3>اختر الخامة</h3><small>FABRIC COLLECTION</small></div></div>
              <div className="fabric-grid">{fabrics.map(f => <button key={f.id} className={`fabric-option ${fabricId === f.id ? 'selected' : ''}`} onClick={() => setFabricId(f.id)}><span className={`swatch ${f.texture}`} style={{'--swatch': f.color}}>{fabricId === f.id && <Check size={15}/>}</span><span>{f.name}</span></button>)}</div>
              <div className="fabric-detail"><span className="detail-dot" style={{background:fabric.color}}/><span>{fabric.en}</span><b>{fabric.price.toLocaleString('en-US')} ج.م / م²</b></div>
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
              <div className="estimate"><span><Ruler size={16}/> إجمالي تقدير الخامات</span><b>{estimate.toLocaleString('en-US')} <small>ج.م</small></b></div>
              <div className="estimate-note">
                {openingEstimates.map(item => <p key={item.id}>{item.name}: {item.valid ? `${item.fabricAreaM2.toFixed(2)} م² خامة تقريبًا · ${item.estimateEgp.toLocaleString('en-US')} ج.م` : 'أدخل عرضًا وارتفاعًا صحيحين بالسم لإظهار التقدير.'}</p>)}
              </div>
              <p className="estimate-note">الحساب استرشادي ويعتمد على معامل الثنيات والزيادات وعدد الطبقات وهالك تقديري. لا يُعد مقايسة نهائية قبل المعاينة وقياس الموقع.</p>
              <p className="estimate-note">أي قياس مستخرج من صورة أو كاميرا يظل تقديريًا حتى المعايرة والتأكيد البشري. جميع المدخلات بالسنتيمتر.</p>
            </div>
            <button className="save-btn" onClick={saveDesign}>{saved ? <><Check size={17}/> تم حفظ التصميم على جهازك</> : <>احفظ اختياراتي <ArrowLeft size={17}/></>}</button>
          </div>
          <div className="preview-column"><RoomPreview fabric={fabric} open={open} style={style} setOpen={setOpen}/></div>
        </div>
      </section>

      <section className="collections" id="collections">
        <div className="section-heading"><div><div className="eyebrow dark"><span/> مختارات الاستوديو</div><h2>الخامة تحكي <em>حكاية</em></h2></div><p>درجات هادئة وملامس متنوعة تمنح كل مساحة شخصيتها الخاصة.</p></div>
        <div className="collection-cards">{fabrics.slice(0,4).map((f,i)=><button className="collection-card" key={f.id} onClick={()=>{setFabricId(f.id);document.getElementById('studio').scrollIntoView({behavior:'smooth'})}}><div className={`fabric-photo fabric-${i}`} style={{'--fabric':f.color}}><span className="fabric-number">0{i+1}</span><span className="fabric-chip"/></div><div className="collection-info"><span>{f.en}</span><b>{f.name}</b><ArrowLeft size={17}/></div></button>)}</div>
      </section>

      <section className="process" id="how"><div className="process-inner"><div><div className="eyebrow"><span/> من الفكرة للتنفيذ</div><h2>تفاصيلك تستحق<br/><em>اهتماماً خاصاً.</em></h2></div><div className="process-steps"><div><b>01</b><span><strong>اكتشف</strong><small>استكشف الخامات والتصميمات.</small></span></div><div><b>02</b><span><strong>خصّص</strong><small>اختار التفاصيل والمقاسات.</small></span></div><div><b>03</b><span><strong>تواصل</strong><small>ناقش اختيارك مع فريقنا.</small></span></div></div></div></section>

      <section className="contact" id="contact"><div className="contact-copy"><div className="eyebrow dark"><span/> خطوتك التالية</div><h2>خلّينا نبدأ <em>حكاية جديدة.</em></h2><p>شاركنا بياناتك واختياراتك، وفريقنا يقدر يساعدك في الخطوة التالية.</p></div><form className="contact-form" onSubmit={e=>{e.preventDefault();const details = openings.map(item => `${item.name}: ${item.widthCm} × ${item.heightCm} سم`).join('؛ ');const msg=`مرحباً، أنا ${fullName}. أريد الاستفسار عن تصميم ستائر بخامة ${fabric.name}، والمقاسات: ${details}. رقم التواصل: ${phone}`;window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`,'_blank')}}><label>الاسم<input required value={fullName} onChange={e=>setFullName(e.target.value)} placeholder="اكتب اسمك"/></label><label>رقم الهاتف<input required value={phone} onChange={e=>setPhone(e.target.value)} placeholder="01xxxxxxxxx" dir="ltr"/></label><button className="primary-btn" type="submit">تواصل عبر واتساب <ArrowLeft size={17}/></button><small>سيتم فتح واتساب برسالة جاهزة، ولن يتم إرسال بياناتك تلقائياً.</small></form></section>
    </main>
    <footer><a className="brand footer-brand" href="#home"><span className="brand-mark">NS</span><span><b>NAGUIB SELIM</b><small>STUDIO · CURTAINS & FABRICS</small></span></a><span>© 2026 Naguib Selim Studio. جميع الحقوق محفوظة.</span><a href="#home">العودة للأعلى <ArrowDown size={14}/></a></footer>
  </div>
}
