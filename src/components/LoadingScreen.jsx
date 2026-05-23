import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState('تهيئة البيئة المعمارية');

  const messages = [
    'تهيئة البيئة المعمارية',
    'رسم الخطوط الهندسية',
    'بناء الرؤية المعمارية',
    'مرحباً بك في ArchVision',
  ];

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 1.5;
      setProgress(Math.min(current, 100));
      const msgIndex = Math.floor((current / 100) * messages.length);
      setText(messages[Math.min(msgIndex, messages.length - 1)]);
      if (current >= 100) clearInterval(interval);
    }, 35);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-obsidian noise-overlay"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Animated grid */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Rotating geometric */}
      <motion.div
        className="absolute opacity-10"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <svg width="600" height="600" viewBox="0 0 600 600">
          <polygon points="300,50 550,200 550,400 300,550 50,400 50,200" fill="none" stroke="#C9A84C" strokeWidth="1"/>
          <polygon points="300,100 500,220 500,380 300,500 100,380 100,220" fill="none" stroke="#C9A84C" strokeWidth="0.5"/>
          <polygon points="300,150 450,240 450,360 300,450 150,360 150,240" fill="none" stroke="#C9A84C" strokeWidth="0.3"/>
        </svg>
      </motion.div>

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="relative z-10 text-center mb-16"
      >
        {/* Arch logo SVG */}
        <motion.svg
          width="80" height="80" viewBox="0 0 80 80"
          className="mx-auto mb-6"
          initial={{ pathLength: 0 }}
        >
          <motion.path
            d="M10 70 L10 40 Q10 10 40 10 Q70 10 70 40 L70 70"
            fill="none"
            stroke="#C9A84C"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />
          <motion.line
            x1="10" y1="70" x2="70" y2="70"
            stroke="#C9A84C"
            strokeWidth="2"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            style={{ transformOrigin: '40px 70px' }}
          />
          <motion.line
            x1="40" y1="10" x2="40" y2="70"
            stroke="rgba(201,168,76,0.3)"
            strokeWidth="1"
            strokeDasharray="4 4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.4 }}
          />
        </motion.svg>

        <motion.h1
          className="font-display text-4xl font-bold tracking-wider"
          initial={{ opacity: 0, letterSpacing: '0.5em' }}
          animate={{ opacity: 1, letterSpacing: '0.2em' }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <span className="gold-text">ARCH</span>
          <span className="text-marble">VISION</span>
        </motion.h1>

        <motion.p
          className="font-sans text-xs tracking-[0.4em] text-marble/40 mt-2 uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          الرؤية المعمارية
        </motion.p>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        className="relative z-10 w-64"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="h-px bg-marble/10 mb-3">
          <motion.div
            className="h-full loader-progress"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between items-center">
          <p className="font-sans text-xs text-marble/40 tracking-wider">{text}</p>
          <p className="font-mono text-xs text-gold">{Math.round(progress)}%</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
