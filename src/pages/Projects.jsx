import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, MapPin, Calendar } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const allProjects = [
  {
    id: 1, title: 'برج الضوء', category: 'تجاري', location: 'القاهرة الجديدة', year: '2024',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    size: 'large', desc: 'برج تجاري من ٤٠ طابقاً بتصميم معاصر يجمع بين الوظيفة والجمال'
  },
  {
    id: 2, title: 'فيلا الأفق', category: 'سكني', location: 'الشيخ زايد', year: '2024',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    size: 'small', desc: 'فيلا فاخرة بمسبح لانهائي وإطلالة بانورامية'
  },
  {
    id: 3, title: 'مجمع الأرز', category: 'متكامل', location: 'مدينة نصر', year: '2023',
    image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&q=80',
    size: 'small', desc: 'مجمع تجاري وسكني متكامل على مساحة ٢٠٠٠٠ متر مربع'
  },
  {
    id: 4, title: 'متحف الحضارة', category: 'ثقافي', location: 'وسط البلد', year: '2023',
    image: 'https://images.unsplash.com/photo-1569534403786-7b6c4a12cb5b?w=800&q=80',
    size: 'large', desc: 'متحف معاصر يحتضن ٥٠٠٠ قطعة أثرية بتصميم ملهم'
  },
  {
    id: 5, title: 'منتجع الواحة', category: 'فندقي', location: 'الساحل الشمالي', year: '2023',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
    size: 'small', desc: 'منتجع ساحلي فاخر بـ ٢٠٠ وحدة سياحية'
  },
  {
    id: 6, title: 'مركز الابتكار', category: 'تجاري', location: 'مدينة 6 أكتوبر', year: '2022',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80',
    size: 'small', desc: 'مركز أعمال مستدام بتصميم بيوفيليك'
  },
];

const categories = ['الكل', 'تجاري', 'سكني', 'فندقي', 'ثقافي', 'متكامل'];

function ProjectCard({ project, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`project-card group border border-gold/10 hover:border-gold/40 transition-all duration-500 ${
        project.size === 'large' ? 'md:col-span-2 h-[500px]' : 'h-[400px]'
      }`}
    >
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent" />

      {/* Category badge */}
      <div className="absolute top-4 right-4 glass px-3 py-1.5">
        <span className="font-mono text-[10px] tracking-widest text-gold uppercase">{project.category}</span>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        <h3 className="font-display text-2xl md:text-3xl font-bold text-marble mb-2">{project.title}</h3>
        <p className="font-sans text-xs text-marble/50 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">{project.desc}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <MapPin size={12} className="text-gold" />
              <span className="font-sans text-xs text-marble/50">{project.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar size={12} className="text-gold" />
              <span className="font-sans text-xs text-marble/50">{project.year}</span>
            </div>
          </div>
          <div className="w-8 h-8 border border-gold/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ArrowUpRight size={12} className="text-gold" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [active, setActive] = useState('الكل');

  const filtered = active === 'الكل'
    ? allProjects
    : allProjects.filter(p => p.category === active);

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
        <motion.p
          className="font-sans text-xs tracking-[0.4em] text-gold uppercase mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          معرض أعمالنا
        </motion.p>
        <motion.h1
          className="font-display text-5xl md:text-7xl font-bold text-marble"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          مشاريعنا
        </motion.h1>
        <motion.h1
          className="font-display text-5xl md:text-7xl font-bold italic gold-text"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          المتميزة
        </motion.h1>
      </div>

      {/* Filter tabs */}
      <motion.div
        className="max-w-7xl mx-auto px-6 mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`font-sans text-xs tracking-widest uppercase px-5 py-2.5 transition-all duration-300 border ${
                active === cat
                  ? 'bg-gold text-obsidian border-gold'
                  : 'border-gold/20 text-marble/50 hover:border-gold/50 hover:text-marble'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.main>
  );
}
