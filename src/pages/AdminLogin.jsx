import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('بيانات الدخول غير صحيحة');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl" />

      <motion.div
        className="relative z-10 w-full max-w-md px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Logo */}
        <div className="text-center mb-12">
          <svg width="48" height="48" viewBox="0 0 80 80" className="mx-auto mb-4">
            <path d="M10 70 L10 40 Q10 10 40 10 Q70 10 70 40 L70 70" fill="none" stroke="#C9A84C" strokeWidth="3"/>
            <line x1="10" y1="70" x2="70" y2="70" stroke="#C9A84C" strokeWidth="3"/>
          </svg>
          <h1 className="font-display text-2xl font-bold text-marble">
            <span className="gold-text">ARCH</span>VISION
          </h1>
          <p className="font-sans text-xs tracking-[0.3em] text-marble/30 uppercase mt-2">لوحة التحكم</p>
        </div>

        <div className="glass border border-gold/10 p-10">
          <h2 className="font-display text-2xl font-bold text-marble mb-2">تسجيل الدخول</h2>
          <p className="font-sans text-xs text-marble/40 mb-8 tracking-wider">أدمن فقط — تسجيل دخول آمن</p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="font-sans text-xs tracking-widest text-gold/70 uppercase block mb-3">البريد الإلكتروني</label>
              <div className="relative">
                <Mail size={14} className="absolute right-0 top-3 text-marble/30" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@archvision.com"
                  className="arch-input pr-6"
                />
              </div>
            </div>

            <div>
              <label className="font-sans text-xs tracking-widest text-gold/70 uppercase block mb-3">كلمة المرور</label>
              <div className="relative">
                <Lock size={14} className="absolute right-0 top-3 text-marble/30" />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="arch-input pr-6 pl-6"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute left-0 top-3 text-marble/30 hover:text-gold transition-colors"
                >
                  {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="font-sans text-xs text-red-400 bg-red-400/10 px-4 py-2 border border-red-400/20">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center flex items-center gap-2 disabled:opacity-50"
            >
              <span>{loading ? 'جارٍ الدخول...' : 'دخول'}</span>
            </button>
          </form>
        </div>
      </motion.div>
    </main>
  );
}
