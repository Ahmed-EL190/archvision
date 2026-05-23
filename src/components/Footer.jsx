import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Instagram, Twitter, Linkedin, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-obsidian border-t border-gold/10 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-20" />

      {/* Top CTA band */}
      <div className="relative border-b border-gold/10">
        <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="font-sans text-xs tracking-[0.4em] text-gold uppercase mb-3">هل أنت مستعد؟</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-marble">
              لنبني رؤيتك معاً
            </h2>
          </div>
          <Link to="/contact" className="btn-primary group flex items-center gap-3">
            <span>ابدأ مشروعك الآن</span>
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </div>

      {/* Main footer */}
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <svg width="32" height="32" viewBox="0 0 80 80">
                <path d="M10 70 L10 40 Q10 10 40 10 Q70 10 70 40 L70 70" fill="none" stroke="#C9A84C" strokeWidth="3"/>
                <line x1="10" y1="70" x2="70" y2="70" stroke="#C9A84C" strokeWidth="3"/>
              </svg>
              <div className="font-display text-xl font-bold tracking-[0.15em]">
                <span className="gold-text">ARCH</span>
                <span className="text-marble">VISION</span>
              </div>
            </div>
            <p className="font-sans text-sm text-marble/50 leading-relaxed max-w-xs mb-8">
              نحن شركة معمار راقية تجمع بين الإبداع والدقة الهندسية لخلق فراغات معمارية استثنائية تلهم وتدوم.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Instagram, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Linkedin, href: '#' },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 border border-gold/20 flex items-center justify-center text-marble/40 hover:text-gold hover:border-gold/60 transition-all duration-300"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p className="font-sans text-xs tracking-[0.3em] text-gold uppercase mb-6">روابط سريعة</p>
            <ul className="space-y-3">
              {[
                { label: 'الرئيسية', href: '/' },
                { label: 'مشاريعنا', href: '/projects' },
                { label: 'من نحن', href: '/about' },
                { label: 'تواصل معنا', href: '/contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="font-sans text-sm text-marble/50 hover:text-gold transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-4 h-px bg-gold/30 group-hover:w-6 group-hover:bg-gold transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-sans text-xs tracking-[0.3em] text-gold uppercase mb-6">تواصل معنا</p>
            <ul className="space-y-4">
              {[
                { icon: MapPin, text: 'القاهرة، مصر — شارع التحرير' },
                { icon: Phone, text: '+20 100 000 0000' },
                { icon: Mail, text: 'info@archvision.com' },
              ].map(({ icon: Icon, text }, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Icon size={14} className="text-gold mt-0.5 flex-shrink-0" />
                  <span className="font-sans text-sm text-marble/50">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-gold/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-marble/30">
            © {currentYear} ArchVision. جميع الحقوق محفوظة.
          </p>
          <p className="font-sans text-xs text-marble/20 tracking-widest">
            ARCHITECTURE · DESIGN · VISION
          </p>
        </div>
      </div>
    </footer>
  );
}
