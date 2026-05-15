import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import pptxgen from 'pptxgenjs'
import {
  ChevronLeft,
  ChevronRight,
  Settings,
  Sparkles,
  Rocket,
  Download,
  FileText,
  Check,
  Activity,
  Zap,
  Map,
  Shield,
  Monitor
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area
} from 'recharts'
import './App.css'

interface Slide {
  id: string;
  type: 'hero' | 'content' | 'split' | 'grid' | 'quote' | 'chart' | 'team' | 'pricing' | 'tam' | 'matrix' | 'ask' | 'swot' | 'roadmap' | 'financials';
  title: string;
  subtitle?: string;
  content?: string | string[];
  features?: { title: string; desc: string; icon?: string }[];
  team?: { name: string; role: string; bio?: string; img?: string }[];
  pricing?: { plan: string; price: string; features: string[]; popular?: boolean }[];
  tamData?: { tam: string; sam: string; som: string };
  matrixData?: { xLabel: string; yLabel: string; points: { name: string; x: number; y: number; isUs?: boolean }[] };
  askData?: { amount: string; usage: { label: string; value: number }[] };
  swotData?: { s: string[]; w: string[]; o: string[]; t: string[] };
  roadmapData?: { phase: string; date: string; goals: string[] }[];
  financialData?: { label: string; values: string[] }[];
  chartType?: 'bar' | 'line' | 'pie' | 'area';
  chartData?: any[];
  imageKeyword?: string;
  theme?: 'aurora' | 'snow' | 'slate';
  notes?: string;
}

const INITIAL_SLIDES: Slide[] = [
  {
    id: '1',
    type: 'hero',
    title: 'Venture Elite X',
    subtitle: 'The Future of High-Stakes Narrative',
    content: 'Transforming complex strategies into compelling visual stories for the next generation of founders.',
    theme: 'aurora',
    imageKeyword: 'technology architecture'
  },
  {
    id: '2',
    type: 'grid',
    title: 'Core Value Propositions',
    subtitle: 'Unmatched competitive advantages',
    features: [
      { title: 'Predictive Storytelling', desc: 'AI-driven narrative flows that adapt to investor sentiment in real-time.', icon: 'Zap' },
      { title: 'High-Fidelity Rendering', desc: '4K vector-perfect exports for both digital and printed investor materials.', icon: 'Monitor' },
      { title: 'MPC Live Integration', desc: 'Direct connection to real-time data sources via Model Context Protocol.', icon: 'Activity' },
      { title: 'Elite Security', desc: 'Military-grade encryption for sensitive financial and product roadmaps.', icon: 'Shield' }
    ]
  },
  {
    id: '3',
    type: 'tam',
    title: 'Market Opportunity',
    subtitle: 'A multi-billion dollar displacement strategy',
    tamData: { tam: '$48.5B', sam: '$12.2B', som: '$2.4B' }
  },
  {
    id: '4',
    type: 'matrix',
    title: 'Competitive Positioning',
    subtitle: 'Dominating the upper-right quadrant',
    matrixData: {
      xLabel: 'Execution Speed',
      yLabel: 'Strategic Depth',
      points: [
        { name: 'Legacy PPT', x: 15, y: 25 },
        { name: 'Modern Design Tools', x: 45, y: 35 },
        { name: 'Niche Rivals', x: 75, y: 40 },
        { name: 'Venture Elite', x: 92, y: 94, isUs: true }
      ]
    }
  },
  {
    id: '5',
    type: 'chart',
    title: 'Unprecedented Growth',
    subtitle: 'Monthly recurring revenue (MRR) projection',
    chartType: 'area',
    chartData: [
      { name: 'Jan', value: 45000 },
      { name: 'Feb', value: 52000 },
      { name: 'Mar', value: 89000 },
      { name: 'Apr', value: 145000 },
      { name: 'May', value: 230000 },
      { name: 'Jun', value: 480000 },
    ]
  },
  {
    id: '6',
    type: 'roadmap',
    title: 'Execution Roadmap',
    subtitle: 'From Seed to Series A',
    roadmapData: [
      { phase: 'Phase 1: Foundation', date: 'Q3 2026', goals: ['Core Engine Launch', 'Beta Testing with 50 Tier-1 Funds', 'Seed Round Close'] },
      { phase: 'Phase 2: Scale', date: 'Q1 2027', goals: ['Global Enterprise Rollout', 'Advanced AI Integration', 'Series A Bridge'] },
      { phase: 'Phase 3: Dominance', date: 'Q4 2027', goals: ['Marketplace Ecosystem', 'Strategic M&A', 'Public Offering Prep'] }
    ]
  },
  {
    id: '7',
    type: 'financials',
    title: 'Key Financial Metrics',
    subtitle: 'Driving superior capital efficiency',
    financialData: [
      { label: 'Revenue Growth', values: ['+25%', '+45%', '+85%', '+120%'] },
      { label: 'Gross Margin', values: ['78%', '82%', '85%', '89%'] },
      { label: 'CAC / LTV', values: ['4.5x', '6.2x', '7.8x', '9.2x'] },
      { label: 'Burn Rate', values: ['$45k', '$35k', '$20k', 'Net Positive'] }
    ]
  },
  {
    id: '8',
    type: 'ask',
    title: 'The Investment Ask',
    subtitle: 'Fueling the next phase of exponential growth',
    askData: {
      amount: '$4.5M Seed Extension',
      usage: [
        { label: 'Engineering & R&D', value: 50 },
        { label: 'GTM & Expansion', value: 30 },
        { label: 'Operations', value: 20 }
      ]
    }
  }
];

function App() {
  const [slides, setSlides] = useState<Slide[]>(INITIAL_SLIDES);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [jsonInput, setJsonInput] = useState(JSON.stringify(INITIAL_SLIDES, null, 2));
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const pollInterval = setInterval(async () => {
      try {
        const response = await fetch('/deck.json?t=' + Date.now());
        if (response.ok) {
          const remoteSlides = await response.json();
          if (JSON.stringify(remoteSlides) !== JSON.stringify(slides)) {
            setSlides(remoteSlides);
            setIsLive(true);
            if (remoteSlides.length !== slides.length) setCurrentSlide(0);
          }
        }
      } catch (e) {}
    }, 2000);
    return () => clearInterval(pollInterval);
  }, [slides]);

  const nextSlide = () => { if (currentSlide < slides.length - 1) setCurrentSlide(currentSlide + 1); };
  const prevSlide = () => { if (currentSlide > 0) setCurrentSlide(currentSlide - 1); };

  const handleUpdateSlides = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setSlides(parsed);
      setCurrentSlide(0);
      setIsEditorOpen(false);
    } catch (e) { alert('Invalid JSON format'); }
  };

  const exportToPPTX = () => {
    const pres = new pptxgen();
    pres.layout = 'LAYOUT_16x9';

    slides.forEach(s => {
      const slide = pres.addSlide();
      const bgColor = s.theme === 'snow' ? 'F8FAFC' : '020617';
      const textColor = s.theme === 'snow' ? '0F172A' : 'FFFFFF';
      const accentColor = '6366F1';

      slide.background = { fill: bgColor };

      slide.addText(s.title, { 
        x: 0.5, y: 0.5, w: '90%', h: 1, 
        fontSize: 44, bold: true, color: textColor,
        fontFace: 'Arial'
      });

      if (s.subtitle) {
        slide.addText(s.subtitle, { 
          x: 0.5, y: 1.2, w: '90%', h: 0.5, 
          fontSize: 24, color: accentColor, bold: true 
        });
      }

      if (s.type === 'hero') {
        slide.addText(s.content as string || '', { x: 0.5, y: 2.5, w: '90%', fontSize: 32, align: 'center', color: textColor });
      } else if (Array.isArray(s.content)) {
        slide.addText(s.content.join('\n'), { x: 0.5, y: 2, w: '90%', fontSize: 20, bullet: true, color: textColor });
      }

      if (s.notes) slide.addNotes(s.notes);
    });

    pres.writeFile({ fileName: 'Venture_Elite_Export.pptx' });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, slides]);

  const slide = slides[currentSlide];
  const themeClass = slide.theme ? `theme-${slide.theme}` : 'theme-aurora';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as any } }
  };

  const renderSlideContent = (s: Slide) => {
    switch (s.type) {
      case 'tam':
        return (
          <motion.div className="tam-container" variants={containerVariants} initial="hidden" animate="visible">
            <motion.div className="tam-ring tam-tam" variants={itemVariants}><span>TAM: {s.tamData?.tam}</span></motion.div>
            <motion.div className="tam-ring tam-sam" variants={itemVariants}><span>SAM: {s.tamData?.sam}</span></motion.div>
            <motion.div className="tam-ring tam-som" variants={itemVariants}><span>SOM: {s.tamData?.som}</span></motion.div>
          </motion.div>
        );
      case 'matrix':
        return (
          <motion.div className="matrix-container" variants={containerVariants} initial="hidden" animate="visible">
            {s.matrixData?.points.map((p, i) => (
              <motion.div 
                key={i} 
                className={`matrix-point ${p.isUs ? 'us' : ''}`} 
                style={{ left: `${p.x}%`, top: `${100 - p.y}%` }}
                variants={itemVariants}
              >
                {p.name}
              </motion.div>
            ))}
          </motion.div>
        );
      case 'ask':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1rem' }}>
            <motion.h2 initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ fontSize: '6rem', fontWeight: 900, marginBottom: '3rem' }}>{s.askData?.amount}</motion.h2>
            <motion.div className="feature-grid" variants={containerVariants} initial="hidden" animate="visible" style={{ width: '100%' }}>
              {s.askData?.usage.map((u, i) => (
                <motion.div key={i} className="feature-card" variants={itemVariants} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--accent-primary)' }}>{u.value}%</div>
                  <div style={{ fontWeight: 700, fontSize: '1.2rem', marginTop: '0.5rem' }}>{u.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        );
      case 'chart':
        return (
          <motion.div className="chart-container" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}>
            <ResponsiveContainer width="100%" height="100%">
              {s.chartType === 'area' ? (
                <AreaChart data={s.chartData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--accent-primary)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="name" stroke="#64748b" axisLine={false} tickLine={false} />
                  <YAxis stroke="#64748b" axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: '#020617', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }} />
                  <Area type="monotone" dataKey="value" stroke="var(--accent-primary)" strokeWidth={4} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              ) : (
                <BarChart data={s.chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="name" stroke="#64748b" axisLine={false} tickLine={false} />
                  <YAxis stroke="#64748b" axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: '#020617', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }} />
                  <Bar dataKey="value" fill="var(--accent-primary)" radius={[8, 8, 0, 0]} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </motion.div>
        );
      case 'grid':
        return (
          <motion.div className="feature-grid" variants={containerVariants} initial="hidden" animate="visible">
            {s.features?.map((f, i) => (
              <motion.div key={i} className="feature-card" variants={itemVariants}>
                <div style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }}>
                  {f.icon === 'Zap' && <Zap size={32} />}
                  {f.icon === 'Monitor' && <Monitor size={32} />}
                  {f.icon === 'Activity' && <Activity size={32} />}
                  {f.icon === 'Shield' && <Shield size={32} />}
                  {!f.icon && <Sparkles size={32} />}
                </div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        );
      case 'roadmap':
        return (
          <motion.div className="feature-grid" variants={containerVariants} initial="hidden" animate="visible">
            {s.roadmapData?.map((r, i) => (
              <motion.div key={i} className="feature-card" variants={itemVariants}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span style={{ color: 'var(--accent-primary)', fontWeight: 800 }}>{r.date}</span>
                  <Map size={20} color="var(--text-muted)" />
                </div>
                <h3>{r.phase}</h3>
                <ul style={{ listStyle: 'none', marginTop: '1rem' }}>
                  {r.goals.map((g, j) => (
                    <li key={j} style={{ color: 'var(--text-body)', marginBottom: '0.5rem', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Check size={14} color="var(--accent-primary)" /> {g}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        );
      case 'financials':
        return (
          <motion.table className="financial-table" variants={containerVariants} initial="hidden" animate="visible">
            <thead>
              <tr>
                <th>Metric</th>
                <th>2026E</th>
                <th>2027E</th>
                <th>2028E</th>
                <th>2029E</th>
              </tr>
            </thead>
            <tbody>
              {s.financialData?.map((f, i) => (
                <motion.tr key={i} variants={itemVariants}>
                  <td>{f.label}</td>
                  {f.values.map((v, j) => <td key={j}>{v}</td>)}
                </motion.tr>
              ))}
            </tbody>
          </motion.table>
        );
      default:
        return (
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            {Array.isArray(s.content) ? (
              <ul className="slide-list">{s.content.map((item, i) => <motion.li key={i} variants={itemVariants}>{item}</motion.li>)}</ul>
            ) : (
              <motion.p className="slide-body" variants={itemVariants}>{s.content}</motion.p>
            )}
          </motion.div>
        );
    }
  };

  return (
    <div className={`app-container ${themeClass}`}>
      <div className="print-view">
        {slides.map(s => (
          <div key={s.id} className={`print-slide layout-${s.type} ${s.theme ? `theme-${s.theme}` : ''}`}>
            <div className="slide-content">
              <h1 className="slide-title">{s.title}</h1>
              {s.subtitle && <p className="slide-subtitle">{s.subtitle}</p>}
              {renderSlideContent(s)}
            </div>
          </div>
        ))}
      </div>

      <nav className="thumb-nav">
        {slides.map((_, i) => (
          <div 
            key={i} 
            className={`thumb-dot ${currentSlide === i ? 'active' : ''}`} 
            onClick={() => setCurrentSlide(i)}
          />
        ))}
      </nav>

      <div className="app-wrapper">
        <header className="header">
          <div className="logo">
            <Rocket size={28} style={{ marginRight: '12px' }} /> VENTURE ELITE X
            {isLive && <span className="live-badge">SYNCED</span>}
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="secondary-button" onClick={exportToPPTX}><FileText size={18} /> EXPORT .PPTX</button>
            <button className="secondary-button" onClick={() => window.print()}><Download size={18} /> PDF REPORT</button>
            <button className="primary-button" onClick={() => setIsEditorOpen(!isEditorOpen)}><Settings size={18} /> CONFIG</button>
          </div>
        </header>

        <main className="main-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, x: 20, scale: 0.98, rotateY: 5 }}
              animate={{ opacity: 1, x: 0, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, x: -20, scale: 0.98, rotateY: -5 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="deck-container glass-panel"
            >
              {slide.imageKeyword && (
                <img src={`https://source.unsplash.com/featured/?${slide.imageKeyword}`} className="slide-bg-image" alt="bg" />
              )}
              <div className={`slide layout-${slide.type}`}>
                <div className="slide-type-indicator">{slide.type}</div>
                <div className="slide-content">
                  <motion.h1 className="slide-title" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>{slide.title}</motion.h1>
                  {slide.subtitle && <motion.p className="slide-subtitle" initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>{slide.subtitle}</motion.p>}
                  {renderSlideContent(slide)}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </main>

        <div className="controls glass-panel">
          <button onClick={prevSlide} disabled={currentSlide === 0}><ChevronLeft size={28} /></button>
          <div className="slide-counter">{currentSlide + 1} / {slides.length}</div>
          <button onClick={nextSlide} disabled={currentSlide === slides.length - 1}><ChevronRight size={28} /></button>
        </div>

        <div className="progress-bar" style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }} />

        <div className={`editor-sidebar ${isEditorOpen ? 'open' : ''}`}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1.8rem' }}>Elite Schema</h2>
            <button onClick={() => setIsEditorOpen(false)} style={{ color: 'var(--text-muted)' }}>Close</button>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Directly modify the pitch deck JSON structure.</p>
          <textarea className="editor-textarea" value={jsonInput} onChange={(e) => setJsonInput(e.target.value)} />
          <button className="primary-button" style={{ width: '100%' }} onClick={handleUpdateSlides}>APPLY CHANGES</button>
        </div>
      </div>
    </div>
  )
}

export default App
