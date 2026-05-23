# 🏛️ ArchVision — دليل الإعداد والنشر الكامل

## 📦 متطلبات التشغيل
- Node.js v18 أو أحدث
- Git
- حساب Firebase (مجاني)
- حساب GitHub
- حساب Vercel (مجاني)

---

## 🚀 خطوات الإعداد

### 1. تثبيت الحزم
```bash
npm install
```

### 2. إعداد Firebase

#### أ) إنشاء مشروع Firebase:
1. اذهب إلى [console.firebase.google.com](https://console.firebase.google.com)
2. اضغط "Add project" واختر اسم (مثلاً: `archvision-prod`)
3. من القائمة الجانبية → **Build** → **Firestore Database**
4. اضغط "Create database" → اختر "Start in test mode"

#### ب) إضافة تطبيق ويب:
1. في صفحة المشروع → اضغط أيقونة `</>` (Web app)
2. سمّه "ArchVision Web"
3. **انسخ** بيانات الـ `firebaseConfig` الظاهرة

#### ج) تحديث الملف `src/firebase.js`:
```js
const firebaseConfig = {
  apiKey: "AIza...",           // ← ضع قيمتك هنا
  authDomain: "archvision.firebaseapp.com",
  projectId: "archvision-prod",
  storageBucket: "archvision-prod.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123:web:abc123"
};
```

#### د) تفعيل Auth للأدمن:
1. Firebase Console → **Authentication** → **Sign-in method**
2. فعّل "Email/Password"
3. من **Users** → **Add user** → أضف إيميلك وكلمة مرور

#### هـ) قواعد Firestore:
في **Firestore → Rules** الصق:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // أي شخص يقدر يكتب رسالة تواصل
    match /contacts/{doc} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
    // الأدمن فقط
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

### 3. تشغيل المشروع محلياً
```bash
npm run dev
```
افتح `http://localhost:5173`

---

## 📤 الرفع على GitHub

```bash
# 1. أنشئ Repository جديد على github.com (اسمه: archvision)
# 2. نفّذ الأوامر التالية:

git init
git add .
git commit -m "🏛️ ArchVision - Initial commit"
git branch -M main
git remote add origin https://github.com/USERNAME/archvision.git
git push -u origin main
```

---

## ⚡ النشر على Vercel

### الطريقة السهلة (بدون CLI):
1. اذهب إلى [vercel.com](https://vercel.com) وسجّل الدخول بـ GitHub
2. اضغط **"New Project"**
3. اختر Repository `archvision`
4. Framework: **Vite** (أو سيُكتشف تلقائياً)
5. اضغط **Deploy** 🚀

### إعداد المتغيرات البيئية (مهم):
في Vercel → Project Settings → **Environment Variables** أضف:

```
VITE_FIREBASE_API_KEY = AIza...
VITE_FIREBASE_AUTH_DOMAIN = archvision.firebaseapp.com
VITE_FIREBASE_PROJECT_ID = archvision-prod
VITE_FIREBASE_STORAGE_BUCKET = archvision-prod.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID = 123456789
VITE_FIREBASE_APP_ID = 1:123:web:abc123
```

ثم حدّث `src/firebase.js` ليستخدم:
```js
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
```

---

## 🌐 بنية الموقع

```
/              → الرئيسية (Hero 3D + مشاريع + خدمات)
/projects      → معرض المشاريع مع فلتر
/about         → من نحن + الفريق + Timeline
/contact       → تواصل معنا (Firebase Firestore)
/admin         → تسجيل دخول الأدمن (Firebase Auth)
/dashboard     → لوحة التحكم الكاملة
```

---

## 🎨 التخصيص

### تغيير الألوان (tailwind.config.js):
```js
colors: {
  gold: { DEFAULT: '#C9A84C' },   // ← اللون الذهبي
  obsidian: { DEFAULT: '#0A0A0F' } // ← الخلفية الداكنة
}
```

### تغيير بيانات الشركة:
- **الاسم والعنوان**: `src/components/Footer.jsx`
- **المشاريع**: `src/pages/Projects.jsx` → مصفوفة `allProjects`
- **الفريق**: `src/pages/About.jsx` → مصفوفة `team`

---

## 📱 الميزات

- ✅ تصميم RTL عربي كامل
- ✅ Three.js - مدينة ثلاثية الأبعاد تدور 360°
- ✅ انيميشن Framer Motion في كل صفحة
- ✅ Custom cursor ذهبي
- ✅ Loading screen احترافية
- ✅ Navbar شفاف + Mobile menu
- ✅ صفحة تواصل تحفظ في Firebase Firestore
- ✅ لوحة تحكم مع Charts (Recharts)
- ✅ Firebase Auth للأدمن
- ✅ Scroll animations
- ✅ Animated counters
- ✅ Project gallery مع filter
- ✅ Team section
- ✅ Timeline
- ✅ Footer كامل

---

## 🔧 Build للإنتاج
```bash
npm run build
```
الملفات في مجلد `dist/` جاهزة للرفع.

---

> 🏛️ **ArchVision** — شركة معمار راقية
> Built with React + Vite + Tailwind + Three.js + Firebase
