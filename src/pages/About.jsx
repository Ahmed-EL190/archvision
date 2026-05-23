import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Users, Globe, Zap } from 'lucide-react';

function RevealSection({ children, delay = 0 }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

const team = [
  { name: 'م. خالد الشافعي', role: 'المؤسس والمدير التنفيذي', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80' },
  { name: 'م. سارة منصور', role: 'المديرة الإبداعية', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80' },
  { name: 'م. يوسف حمدان', role: 'رئيس قسم الهندسة الإنشائية', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
  { name: 'م. نور الدين أحمد', role: 'مدير مشاريع التصميم الداخلي', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80' },
];

const values = [
  { icon: Award, title: 'التميز', desc: 'نسعى للكمال في كل تفصيلة صغيرة وكبيرة' },
  { icon: Users, title: 'التعاون', desc: 'نعمل كفريق متكامل مع عملائنا وشركائنا' },
  { icon: Globe, title: 'الاستدامة', desc: 'نلتزم بمبادئ البناء المستدام والصديق للبيئة' },
  { icon: Zap, title: 'الابتكار', desc: 'نتبنى أحدث التقنيات والأساليب المعمارية' },
];

export default function About() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-32"
    >
      {/* Hero */}
      <div className="relative max-w-7xl mx-auto px-6 mb-32">
        <motion.p className="font-sans text-xs tracking-[0.4em] text-gold uppercase mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          من نحن
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
          <div>
            <motion.h1 className="font-display text-5xl md:text-7xl font-bold text-marble mb-8 leading-none" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}>
              نحن<br /><span className="gold-text italic">ArchVision</span>
            </motion.h1>
            <motion.p className="font-sans text-base text-marble/60 leading-relaxed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              تأسست شركة ArchVision عام ٢٠٠٦ على يد المهندس المعماري خالد الشافعي برؤية واضحة: تقديم تصاميم معمارية تتجاوز التوقعات وتُلهم المستخدمين والزائرين على حد سواء.
            </motion.p>
          </div>
          <motion.div className="relative h-[400px]" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>
            <img src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=700&q=80" alt="Our studio" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/50 to-transparent" />
            <div className="absolute -top-4 -right-4 w-20 h-20 border-t-2 border-r-2 border-gold/40" />
          </motion.div>
        </div>
      </div>

      {/* Values */}
      <section className="py-32 bg-obsidian-light/30 relative">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="relative max-w-7xl mx-auto px-6">
          <RevealSection>
            <div className="text-center mb-20">
              <p className="font-sans text-xs tracking-[0.4em] text-gold uppercase mb-4">مبادئنا</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-marble">ما يميزنا</h2>
            </div>
          </RevealSection>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
            {values.map((val, i) => (
              <RevealSection key={i} delay={i * 0.1}>
                <div className="group p-10 border border-gold/10 hover:border-gold/30 text-center hover:bg-gold/5 transition-all duration-500">
                  <val.icon size={32} className="text-gold mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="font-display text-xl font-bold text-marble mb-3">{val.title}</h3>
                  <p className="font-sans text-sm text-marble/50 leading-relaxed">{val.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-32 max-w-7xl mx-auto px-6">
        <RevealSection>
          <div className="text-center mb-20">
            <p className="font-sans text-xs tracking-[0.4em] text-gold uppercase mb-4">خبراؤنا</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-marble">فريق <span className="gold-text italic">النخبة</span></h2>
          </div>
        </RevealSection>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <RevealSection key={i} delay={i * 0.1}>
              <div className="group text-center">
                <div className="relative overflow-hidden mb-4 aspect-[3/4]">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/30 transition-colors duration-300" />
                </div>
                <h3 className="font-display text-lg font-bold text-marble mb-1">{member.name}</h3>
                <p className="font-sans text-xs text-gold tracking-wider">{member.role}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="py-32 bg-obsidian-light/20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6">
          <RevealSection>
            <div className="text-center mb-20">
              <p className="font-sans text-xs tracking-[0.4em] text-gold uppercase mb-4">رحلتنا</p>
              <h2 className="font-display text-4xl font-bold text-marble">مسيرة <span className="gold-text italic">الإنجازات</span></h2>
            </div>
          </RevealSection>
          <div className="relative">
            <div className="absolute top-0 bottom-0 right-1/2 w-px bg-gold/20" />
            {[
              { year: '2006', event: 'تأسيس الشركة في القاهرة' },
              { year: '2010', event: 'أول جائزة دولية للتصميم المعماري' },
              { year: '2014', event: 'توسع الشركة لتشمل ٥ دول عربية' },
              { year: '2018', event: 'تنفيذ أكبر مشروع في تاريخ الشركة بـ ٥٠٠ مليون جنيه' },
              { year: '2024', event: 'الاحتفال بـ ١٥٠ مشروع ناجح وتوظيف ٢٠٠ مهندس' },
            ].map((item, i) => (
              <RevealSection key={i} delay={i * 0.1}>
                <div className={`flex items-center gap-8 mb-12 ${i % 2 === 0 ? 'flex-row-reverse text-right' : ''}`}>
                  <div className="flex-1">
                    <p className="font-mono text-sm text-gold mb-2">{item.year}</p>
                    <p className="font-sans text-base text-marble/70">{item.event}</p>
                  </div>
                  <div className="relative flex-shrink-0">
                    <div className="w-4 h-4 rounded-full border-2 border-gold bg-obsidian" />
                    <div className="absolute inset-0 w-4 h-4 rounded-full bg-gold/30 animate-ping" />
                  </div>
                  <div className="flex-1" />
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>
    </motion.main>
  );
}
