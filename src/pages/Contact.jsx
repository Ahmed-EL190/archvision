import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send, CheckCircle } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await addDoc(collection(db, 'contacts'), {
        ...form,
        createdAt: serverTimestamp(),
        read: false,
      });
      setStatus('success');
      setForm({ name: '', email: '', phone: '', service: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-32"
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <motion.p className="font-sans text-xs tracking-[0.4em] text-gold uppercase mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          تحدث معنا
        </motion.p>
        <motion.h1 className="font-display text-5xl md:text-7xl font-bold text-marble" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.8 }}>
          لنبدأ
        </motion.h1>
        <motion.h1 className="font-display text-5xl md:text-7xl font-bold italic gold-text" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}>
          رحلتك المعمارية
        </motion.h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-32 grid grid-cols-1 md:grid-cols-5 gap-20">
        {/* Contact info */}
        <div className="md:col-span-2">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <p className="font-sans text-sm text-marble/50 leading-relaxed mb-12">
              سواء كنت تبحث عن تصميم فيلا حلمك أو مشروع تجاري طموح، نحن هنا لنتحول أفكارك إلى واقع معماري استثنائي.
            </p>

            <div className="space-y-8 mb-12">
              {[
                { icon: MapPin, label: 'العنوان', value: 'القاهرة، مصر — شارع التحرير، برج النيل، الدور ١٢' },
                { icon: Phone, label: 'الهاتف', value: '+20 100 000 0000' },
                { icon: Mail, label: 'البريد', value: 'info@archvision.com' },
              ].map(({ icon: Icon, label, value }, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                    <Icon size={14} className="text-gold" />
                  </div>
                  <div>
                    <p className="font-sans text-xs text-gold tracking-wider mb-1">{label}</p>
                    <p className="font-sans text-sm text-marble/60">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="relative h-48 overflow-hidden border border-gold/10">
              <img
                src="https://images.unsplash.com/photo-1524813686514-a57563d77965?w=600&q=80"
                alt="Cairo map"
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 bg-obsidian/40 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={24} className="text-gold mx-auto mb-2" />
                  <p className="font-sans text-xs text-marble/60 tracking-wider">القاهرة، مصر</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Form */}
        <motion.div
          className="md:col-span-3"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center h-full gap-6 py-20">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <CheckCircle size={64} className="text-gold" />
              </motion.div>
              <h3 className="font-display text-3xl font-bold text-marble">تم الإرسال بنجاح!</h3>
              <p className="font-sans text-sm text-marble/50 text-center">سيتواصل معك فريقنا خلال ٢٤ ساعة. شكراً لثقتك بـ ArchVision.</p>
              <button onClick={() => setStatus('idle')} className="btn-outline">إرسال رسالة أخرى</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="font-sans text-xs tracking-widest text-gold/70 uppercase block mb-3">الاسم الكامل *</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="محمد أحمد"
                    className="arch-input"
                  />
                </div>
                <div>
                  <label className="font-sans text-xs tracking-widest text-gold/70 uppercase block mb-3">البريد الإلكتروني *</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="name@example.com"
                    className="arch-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="font-sans text-xs tracking-widest text-gold/70 uppercase block mb-3">رقم الهاتف</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+20 1XX XXX XXXX"
                    className="arch-input"
                  />
                </div>
                <div>
                  <label className="font-sans text-xs tracking-widest text-gold/70 uppercase block mb-3">الخدمة المطلوبة</label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className="arch-input bg-transparent"
                  >
                    <option value="" className="bg-obsidian">اختر الخدمة</option>
                    <option value="تصميم معماري" className="bg-obsidian">تصميم معماري</option>
                    <option value="تصميم داخلي" className="bg-obsidian">تصميم داخلي</option>
                    <option value="استشارة هندسية" className="bg-obsidian">استشارة هندسية</option>
                    <option value="إدارة مشروع" className="bg-obsidian">إدارة مشروع</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-sans text-xs tracking-widest text-gold/70 uppercase block mb-3">رسالتك *</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="أخبرنا عن مشروعك وأحلامك..."
                  className="arch-input resize-none"
                />
              </div>

              {status === 'error' && (
                <p className="font-sans text-sm text-red-400">حدث خطأ في الإرسال. يرجى المحاولة مرة أخرى.</p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary flex items-center gap-3 disabled:opacity-50"
              >
                <span>{status === 'loading' ? 'جارٍ الإرسال...' : 'أرسل رسالتك'}</span>
                <Send size={14} />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </motion.main>
  );
}
