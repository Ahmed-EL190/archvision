import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, Play, CheckCircle } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import BuildingScene from '../components/BuildingScene';

// Animated counter
function Counter({ end, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// Section reveal animation
function RevealSection({ children, delay = 0 }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Projects data with Unsplash images
const projects = [
  {
    id: 1,
    title: 'برج الضوء',
    category: 'برج تجاري',
    location: 'القاهرة الجديدة',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80',
    tag: 'COMMERCIAL',
  },
  {
    id: 2,
    title: 'فيلا الأفق',
    category: 'فيلا سكنية فاخرة',
    location: 'الشيخ زايد',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80',
    tag: 'RESIDENTIAL',
  },
  {
    id: 3,
    title: 'مجمع الأرز',
    category: 'مجمع تجاري',
    location: 'مدينة نصر',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600&q=80',
    tag: 'MIXED USE',
  },
];

const services = [
  { num: '01', title: 'التصميم المعماري', desc: 'نصمم مباني تلامس الروح وتحدي المألوف' },
  { num: '02', title: 'التصميم الداخلي', desc: 'فراغات داخلية تعبر عن الشخصية والفخامة' },
  { num: '03', title: 'الاستشارات الهندسية', desc: 'خبرة تقنية عميقة في كل مرحلة من مراحل البناء' },
  { num: '04', title: 'إدارة المشاريع', desc: 'إشراف كامل من الفكرة حتى التسليم' },
];

export default function Home() {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const heroY = useTransform(scrollY, [0, 600], [0, -100]);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* ======================== HERO ======================== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 grid-bg" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-obsidian via-obsidian/95 to-obsidian-light/50" />

        {/* 3D Building scene */}
        <motion.div
          className="absolute inset-0"
          style={{ opacity: heroOpacity }}
        >
          <BuildingScene height="100%" />
        </motion.div>

        {/* Radial gold glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl" />

        {/* Hero content */}
        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-6 pt-24"
          style={{ y: heroY }}
        >
          <div className="max-w-4xl">
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-8 h-px bg-gold" />
              <span className="font-sans text-xs tracking-[0.4em] text-gold uppercase">التميز في كل تفصيل</span>
            </motion.div>

            {/* Main heading */}
            <div className="overflow-hidden mb-4">
              <motion.h1
                className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-marble leading-none"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                نبني
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-4">
              <motion.h1
                className="font-display text-5xl md:text-7xl lg:text-8xl font-bold italic leading-none"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ delay: 0.55, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="gold-text">المستحيل</span>
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-8">
              <motion.h1
                className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-marble/70 leading-none"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ delay: 0.7, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                بيدين من ذهب
              </motion.h1>
            </div>

            {/* Sub */}
            <motion.p
              className="font-sans text-base md:text-lg text-marble/50 max-w-lg mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.7 }}
            >
              شركة معمار متخصصة في التصميم المعماري الفاخر والإبداعي. نحول أحلامك إلى واقع ملموس بأعلى معايير الجودة والإتقان.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.7 }}
            >
              <Link to="/projects" className="btn-primary group flex items-center gap-3">
                <span>استعرض مشاريعنا</span>
                <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
              <Link to="/contact" className="btn-outline flex items-center gap-3">
                <span>احجز استشارة</span>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.7 }}
        >
          <span className="font-sans text-[10px] tracking-[0.4em] text-marble/30 uppercase">اكتشف</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowDown size={14} className="text-gold" />
          </motion.div>
        </motion.div>

        {/* Corner coordinates */}
        <div className="absolute bottom-10 right-6 text-right hidden md:block">
          <p className="font-mono text-[10px] text-marble/20 tracking-wider">30.0444° N</p>
          <p className="font-mono text-[10px] text-marble/20 tracking-wider">31.2357° E</p>
        </div>
      </section>

      {/* ======================== STATS ======================== */}
      <section className="relative py-20 border-y border-gold/10 overflow-hidden">
        <div className="absolute inset-0 bg-obsidian-light/50" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { num: 150, suffix: '+', label: 'مشروع منجز' },
              { num: 18, suffix: ' عاماً', label: 'خبرة في السوق' },
              { num: 95, suffix: '%', label: 'رضا العملاء' },
              { num: 32, suffix: '', label: 'جائزة دولية' },
            ].map((stat, i) => (
              <RevealSection key={i} delay={i * 0.1}>
                <div className="text-center border-r border-gold/10 last:border-0 px-4">
                  <div className="font-display text-5xl md:text-6xl font-bold gold-text counter-number mb-2">
                    <Counter end={stat.num} suffix={stat.suffix} />
                  </div>
                  <p className="font-sans text-xs tracking-[0.3em] text-marble/40 uppercase">{stat.label}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ======================== FEATURED PROJECTS ======================== */}
      <section className="py-32 max-w-7xl mx-auto px-6">
        <RevealSection>
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
            <div>
              <p className="font-sans text-xs tracking-[0.4em] text-gold uppercase mb-4">أعمالنا المميزة</p>
              <h2 className="font-display text-4xl md:text-6xl font-bold text-marble">
                مشاريع تحكي<br />
                <span className="gold-text italic">قصص الإبداع</span>
              </h2>
            </div>
            <Link to="/projects" className="btn-outline flex items-center gap-2 group">
              <span>عرض الكل</span>
              <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>
        </RevealSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <RevealSection key={project.id} delay={i * 0.15}>
              <div className="project-card group h-[500px] relative overflow-hidden border border-gold/10 hover:border-gold/40 transition-colors duration-500">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent" />

                {/* Tag */}
                <div className="absolute top-4 right-4 glass px-3 py-1">
                  <span className="font-mono text-[10px] tracking-widest text-gold">{project.tag}</span>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="font-sans text-xs tracking-widest text-gold mb-2">{project.category}</p>
                  <h3 className="font-display text-2xl font-bold text-marble mb-1">{project.title}</h3>
                  <div className="flex justify-between items-center">
                    <p className="font-sans text-xs text-marble/50">{project.location} · {project.year}</p>
                    <div className="w-8 h-8 border border-gold/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowUpRight size={12} className="text-gold" />
                    </div>
                  </div>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* ======================== SERVICES ======================== */}
      <section className="py-32 bg-obsidian-light/30 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="relative max-w-7xl mx-auto px-6">
          <RevealSection>
            <div className="text-center mb-20">
              <p className="font-sans text-xs tracking-[0.4em] text-gold uppercase mb-4">ما نقدمه</p>
              <h2 className="font-display text-4xl md:text-6xl font-bold text-marble">خدماتنا الاحترافية</h2>
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {services.map((service, i) => (
              <RevealSection key={i} delay={i * 0.1}>
                <div className="group p-10 border border-gold/10 hover:border-gold/30 hover:bg-gold/5 transition-all duration-500 cursor-pointer relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-0 h-full bg-gradient-to-r from-gold/5 to-transparent group-hover:w-full transition-all duration-700" />
                  <div className="relative z-10">
                    <div className="flex items-start gap-6">
                      <span className="font-mono text-xs text-gold/40 mt-1.5">{service.num}</span>
                      <div>
                        <h3 className="font-display text-2xl font-bold text-marble mb-3 group-hover:text-gold transition-colors duration-300">{service.title}</h3>
                        <p className="font-sans text-sm text-marble/50 leading-relaxed">{service.desc}</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 h-px bg-gold/10 group-hover:bg-gold/30 transition-colors duration-300" />
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ======================== ABOUT STRIP ======================== */}
      <section className="py-32 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <RevealSection>
            <div>
              <p className="font-sans text-xs tracking-[0.4em] text-gold uppercase mb-6">رؤيتنا</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-marble mb-8 leading-tight">
                نصنع التراث المعماري<br />
                <span className="gold-text italic">للأجيال القادمة</span>
              </h2>
              <p className="font-sans text-sm text-marble/50 leading-relaxed mb-8">
                منذ أكثر من ١٨ عاماً، نصمم ونبني مبانٍ تجمع بين الجمال الجمالي والوظيفة العملية. فريقنا من المهندسين والمصممين الموهوبين يعملون بشغف حقيقي لتحويل كل مشروع إلى تحفة معمارية خالدة.
              </p>
              <ul className="space-y-3 mb-10">
                {['تصميم مخصص لكل عميل', 'إشراف هندسي دقيق', 'مواد بناء عالية الجودة', 'التزام بالمواعيد النهائية'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle size={14} className="text-gold" />
                    <span className="font-sans text-sm text-marble/60">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/about" className="btn-outline inline-flex items-center gap-2 group">
                <span>اعرف أكثر عنا</span>
                <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>
          </RevealSection>

          <RevealSection delay={0.2}>
            <div className="relative">
              <div className="relative h-[500px] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=700&q=80"
                  alt="Architecture process"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent mix-blend-multiply" />
              </div>

              {/* Floating stat card */}
              <motion.div
                className="absolute -bottom-8 -left-8 glass p-6 w-48"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              >
                <div className="font-display text-4xl font-bold gold-text mb-1">18+</div>
                <div className="font-sans text-xs text-marble/50 tracking-wider">سنة من الخبرة والإبداع</div>
              </motion.div>

              {/* Corner decoration */}
              <div className="absolute -top-4 -right-4 w-16 h-16 border-t-2 border-r-2 border-gold/40" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 border-b-2 border-l-2 border-gold/40" />
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ======================== TESTIMONIAL ======================== */}
      <section className="py-32 bg-obsidian-mid relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/3 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <RevealSection>
            <div className="font-display text-6xl text-gold/30 mb-8">"</div>
            <blockquote className="font-display text-2xl md:text-4xl font-bold text-marble leading-relaxed mb-10">
              ArchVision لم تبنِ لنا مبنى فحسب،<br />
              <span className="gold-text italic">بل بنت لنا هوية.</span>
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-gold/30">
                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&q=80" alt="Client" className="w-full h-full object-cover" />
              </div>
              <div className="text-right">
                <p className="font-sans text-sm font-medium text-marble">م. أحمد المصري</p>
                <p className="font-sans text-xs text-marble/40">المدير التنفيذي، مجموعة النور العقارية</p>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>
    </motion.main>
  );
}
