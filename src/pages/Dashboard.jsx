import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard, FolderOpen, Users, MessageSquare,
  Settings, LogOut, Bell, Search, TrendingUp, TrendingDown,
  Eye, Plus, MoreHorizontal, CheckCircle, Clock, XCircle,
  Home, Star, BarChart3, ChevronRight
} from 'lucide-react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import {
  collection, onSnapshot, query, orderBy, limit, getDocs
} from 'firebase/firestore';
import { auth, db } from '../firebase';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';

const sidebarItems = [
  { icon: LayoutDashboard, label: 'الرئيسية', id: 'overview' },
  { icon: FolderOpen, label: 'المشاريع', id: 'projects' },
  { icon: MessageSquare, label: 'الرسائل', id: 'messages' },
  { icon: Users, label: 'العملاء', id: 'clients' },
  { icon: BarChart3, label: 'التحليلات', id: 'analytics' },
  { icon: Settings, label: 'الإعدادات', id: 'settings' },
];

const monthlyData = [
  { month: 'يناير', revenue: 320000, projects: 4 },
  { month: 'فبراير', revenue: 450000, projects: 6 },
  { month: 'مارس', revenue: 380000, projects: 5 },
  { month: 'أبريل', revenue: 510000, projects: 7 },
  { month: 'مايو', revenue: 620000, projects: 8 },
  { month: 'يونيو', revenue: 580000, projects: 7 },
  { month: 'يوليو', revenue: 750000, projects: 10 },
  { month: 'أغسطس', revenue: 680000, projects: 9 },
  { month: 'سبتمبر', revenue: 820000, projects: 11 },
  { month: 'أكتوبر', revenue: 760000, projects: 10 },
  { month: 'نوفمبر', revenue: 900000, projects: 12 },
  { month: 'ديسمبر', revenue: 1050000, projects: 14 },
];

const categoryData = [
  { name: 'تجاري', value: 40, color: '#C9A84C' },
  { name: 'سكني', value: 30, color: '#E2C97E' },
  { name: 'فندقي', value: 20, color: '#9B7A2F' },
  { name: 'ثقافي', value: 10, color: '#5C4A1E' },
];

const recentProjects = [
  { id: 'PRJ-001', name: 'برج النخيل', client: 'شركة العمران', value: '٢.٥م جنيه', status: 'جارٍ', date: '١٥ مايو ٢٠٢٦' },
  { id: 'PRJ-002', name: 'فيلا الأحلام', client: 'م. سامي خليل', value: '٨٥٠ ألف', status: 'مكتمل', date: '١٢ مايو ٢٠٢٦' },
  { id: 'PRJ-003', name: 'مجمع الواحة', client: 'مجموعة الخليج', value: '٥.٢م جنيه', status: 'مراجعة', date: '١٠ مايو ٢٠٢٦' },
  { id: 'PRJ-004', name: 'منتجع الأرز', client: 'القاهرة للسياحة', value: '٣.٨م جنيه', status: 'جارٍ', date: '٨ مايو ٢٠٢٦' },
  { id: 'PRJ-005', name: 'مركز التقنية', client: 'دلتا للتطوير', value: '١.٢م جنيه', status: 'متوقف', date: '٥ مايو ٢٠٢٦' },
];

const StatusBadge = ({ status }) => {
  const map = {
    'مكتمل': { color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20', icon: CheckCircle },
    'جارٍ': { color: 'text-blue-400 bg-blue-400/10 border-blue-400/20', icon: Clock },
    'مراجعة': { color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20', icon: Eye },
    'متوقف': { color: 'text-red-400 bg-red-400/10 border-red-400/20', icon: XCircle },
  };
  const { color, icon: Icon } = map[status] || map['مراجعة'];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-sans tracking-wider border ${color}`}>
      <Icon size={10} />
      {status}
    </span>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-dark p-3 border border-gold/20">
        <p className="font-sans text-xs text-gold mb-1">{label}</p>
        {payload.map((entry, i) => (
          <p key={i} className="font-mono text-xs text-marble/80">
            {entry.name}: {typeof entry.value === 'number' && entry.value > 10000
              ? `${(entry.value / 1000).toFixed(0)}K`
              : entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) navigate('/admin');
      else setUser(u);
    });
    return unsub;
  }, [navigate]);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'contacts'), orderBy('createdAt', 'desc'), limit(20));
    const unsub = onSnapshot(q, (snap) => {
      setContacts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, [user]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/admin');
  };

  const stats = [
    { label: 'إجمالي الإيرادات', value: '٧.٦م', suffix: 'جنيه', change: '+١٢٪', up: true, icon: TrendingUp },
    { label: 'المشاريع النشطة', value: '٢٤', suffix: 'مشروع', change: '+٣', up: true, icon: FolderOpen },
    { label: 'رسائل جديدة', value: contacts.length || '٠', suffix: 'رسالة', change: 'غير مقروء', up: null, icon: MessageSquare },
    { label: 'تقييم العملاء', value: '٤.٩', suffix: '/٥', change: '٩٥٪ رضا', up: true, icon: Star },
  ];

  return (
    <div className="min-h-screen flex bg-obsidian" dir="rtl">
      {/* Sidebar - matching the design from screenshots */}
      <motion.aside
        className={`flex-shrink-0 flex flex-col border-l border-gold/10 bg-obsidian-light/80 backdrop-blur-xl transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-16'}`}
        initial={{ x: 60 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo */}
        <div className="p-5 border-b border-gold/10 flex items-center gap-3">
          <svg width="30" height="30" viewBox="0 0 80 80" className="flex-shrink-0">
            <path d="M10 70 L10 40 Q10 10 40 10 Q70 10 70 40 L70 70" fill="none" stroke="#C9A84C" strokeWidth="3"/>
            <line x1="10" y1="70" x2="70" y2="70" stroke="#C9A84C" strokeWidth="3"/>
          </svg>
          {sidebarOpen && (
            <div className="font-display text-base font-bold tracking-wider">
              <span className="gold-text">ARCH</span>
              <span className="text-marble">VISION</span>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 transition-all duration-200 text-right ${
                activeTab === item.id
                  ? 'bg-gold/10 text-gold border-r-2 border-gold'
                  : 'text-marble/50 hover:text-marble hover:bg-white/5'
              }`}
            >
              <item.icon size={16} className="flex-shrink-0" />
              {sidebarOpen && <span className="font-sans text-sm">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* User + logout */}
        <div className="p-3 border-t border-gold/10 space-y-2">
          {sidebarOpen && user && (
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                <span className="font-sans text-xs text-gold">{user.email?.[0]?.toUpperCase()}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-sans text-xs text-marble truncate">{user.email}</p>
                <p className="font-sans text-[10px] text-gold">مدير النظام</p>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-marble/40 hover:text-red-400 transition-colors"
          >
            <LogOut size={16} />
            {sidebarOpen && <span className="font-sans text-sm">تسجيل الخروج</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-gold/10 bg-obsidian/80 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-marble/40 hover:text-gold transition-colors"
            >
              <LayoutDashboard size={18} />
            </button>
            <div className="relative hidden md:flex items-center">
              <Search size={14} className="absolute right-3 text-marble/30" />
              <input
                placeholder="بحث..."
                className="bg-white/5 border border-gold/10 text-marble text-sm pr-9 pl-4 py-2 w-64 focus:outline-none focus:border-gold/30 font-sans"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-marble/40 hover:text-gold transition-colors">
              <Home size={16} />
            </Link>
            <button className="relative text-marble/40 hover:text-gold transition-colors">
              <Bell size={16} />
              {contacts.length > 0 && (
                <span className="absolute -top-1 -left-1 w-3 h-3 bg-gold rounded-full text-[8px] flex items-center justify-center text-obsidian font-bold">
                  {contacts.length > 9 ? '9+' : contacts.length}
                </span>
              )}
            </button>
            <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center">
              <span className="font-sans text-xs text-gold">{user?.email?.[0]?.toUpperCase()}</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Page title */}
              <div className="mb-8">
                <h1 className="font-display text-2xl font-bold text-marble">لوحة التحكم</h1>
                <p className="font-sans text-xs text-marble/40 mt-1">مرحباً — آخر تحديث: الآن</p>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="glass border border-gold/10 p-5 hover:border-gold/25 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <stat.icon size={18} className="text-gold" />
                      <span className={`font-sans text-[10px] tracking-wider ${
                        stat.up === true ? 'text-emerald-400' : stat.up === false ? 'text-red-400' : 'text-gold'
                      }`}>
                        {stat.change}
                      </span>
                    </div>
                    <div className="font-display text-2xl font-bold text-marble mb-1">{stat.value}</div>
                    <div className="font-sans text-[10px] text-marble/40 tracking-wider">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Revenue chart */}
                <div className="lg:col-span-2 glass border border-gold/10 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-display text-base font-bold text-marble">الإيرادات الشهرية</h3>
                    <span className="font-mono text-[10px] text-gold">هذا العام</span>
                  </div>
                  <ResponsiveContainer width="100%" height={220}>
                    <AreaChart data={monthlyData}>
                      <defs>
                        <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#C9A84C" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#C9A84C" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(201,168,76,0.08)" />
                      <XAxis dataKey="month" tick={{ fill: 'rgba(245,240,232,0.3)', fontSize: 10, fontFamily: 'DM Sans' }} />
                      <YAxis tick={{ fill: 'rgba(245,240,232,0.3)', fontSize: 10 }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Area type="monotone" dataKey="revenue" name="الإيرادات" stroke="#C9A84C" strokeWidth={2} fill="url(#goldGrad)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Pie chart */}
                <div className="glass border border-gold/10 p-6">
                  <h3 className="font-display text-base font-bold text-marble mb-6">توزيع المشاريع</h3>
                  <ResponsiveContainer width="100%" height={180}>
                    <PieChart>
                      <Pie data={categoryData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" strokeWidth={0}>
                        {categoryData.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-2 mt-4">
                    {categoryData.map((cat, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-sm" style={{ background: cat.color }} />
                          <span className="font-sans text-xs text-marble/60">{cat.name}</span>
                        </div>
                        <span className="font-mono text-xs text-gold">{cat.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent projects table */}
              <div className="glass border border-gold/10 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display text-base font-bold text-marble">آخر المشاريع</h3>
                  <button className="flex items-center gap-2 text-gold font-sans text-xs hover:text-gold/70 transition-colors">
                    عرض الكل <ChevronRight size={12} />
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gold/10">
                        {['رقم المشروع', 'المشروع', 'العميل', 'القيمة', 'التاريخ', 'الحالة', ''].map((h, i) => (
                          <th key={i} className="text-right pb-3 font-sans text-[10px] tracking-wider text-marble/30 uppercase font-normal pr-4">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {recentProjects.map((project, i) => (
                        <tr key={i} className="border-b border-gold/5 hover:bg-gold/3 transition-colors">
                          <td className="py-3 pr-4 font-mono text-xs text-gold">{project.id}</td>
                          <td className="py-3 pr-4 font-sans text-sm text-marble">{project.name}</td>
                          <td className="py-3 pr-4 font-sans text-xs text-marble/60">{project.client}</td>
                          <td className="py-3 pr-4 font-mono text-xs text-marble/80">{project.value}</td>
                          <td className="py-3 pr-4 font-sans text-xs text-marble/40">{project.date}</td>
                          <td className="py-3 pr-4"><StatusBadge status={project.status} /></td>
                          <td className="py-3 pr-4">
                            <button className="text-marble/30 hover:text-gold transition-colors">
                              <MoreHorizontal size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'messages' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h1 className="font-display text-2xl font-bold text-marble">رسائل العملاء</h1>
                  <p className="font-sans text-xs text-marble/40 mt-1">{contacts.length} رسالة واردة</p>
                </div>
              </div>
              {contacts.length === 0 ? (
                <div className="glass border border-gold/10 p-20 text-center">
                  <MessageSquare size={48} className="text-gold/20 mx-auto mb-4" />
                  <p className="font-sans text-sm text-marble/30">لا توجد رسائل بعد</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {contacts.map((contact) => (
                    <div key={contact.id} className="glass border border-gold/10 p-6 hover:border-gold/25 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-display text-base font-bold text-marble">{contact.name}</h3>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="font-mono text-xs text-gold">{contact.email}</span>
                            {contact.phone && <span className="font-mono text-xs text-marble/40">{contact.phone}</span>}
                          </div>
                        </div>
                        {contact.service && (
                          <span className="glass px-3 py-1 font-sans text-xs text-gold border border-gold/20">{contact.service}</span>
                        )}
                      </div>
                      <p className="font-sans text-sm text-marble/60 leading-relaxed">{contact.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {(activeTab !== 'overview' && activeTab !== 'messages') && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="font-display text-6xl text-gold/20 mb-4">🚧</div>
                <h2 className="font-display text-2xl font-bold text-marble mb-2">قريباً</h2>
                <p className="font-sans text-sm text-marble/40">هذا القسم قيد التطوير</p>
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}
