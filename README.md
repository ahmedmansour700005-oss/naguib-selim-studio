# Naguib Selim Studio

واجهة أولية تفاعلية لاستوديو تصميم الستائر والأقمشة، مبنية باستخدام React وVite.

## التشغيل محلياً
يتطلب Node.js 18 أو أحدث.

```bash
npm install
npm run dev
```

## بناء نسخة النشر
```bash
npm run build
```

ينتج مجلد `dist`.

## إعداد Cloudflare Pages (Git integration)
- Framework preset: Vite
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: `/`

## ملاحظات
- معاينة الغرفة الحالية رسم توضيحي CSS تفاعلي وليست صورة فوتوغرافية أو جولة 360 درجة حقيقية.
- الأسعار الظاهرة تقديرية تجريبية وليست عرض سعر معتمداً.
- حفظ التصميم محلياً داخل المتصفح.
- نموذج التواصل يفتح WhatsApp برسالة جاهزة ولا يرسل البيانات تلقائياً.
- لا توجد مفاتيح API أو أسرار مضمنة في المشروع.
