import React, { useState, useEffect } from 'react'
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
  Target,
  PieChart as PieIcon,
  Activity
} from 'lucide-react'
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts'
import './App.css'

interface Slide {
  id: string;
  type: 'hero' | 'content' | 'split' | 'grid' | 'quote' | 'chart' | 'team' | 'pricing' | 'tam' | 'matrix' | 'ask';
  title: string;
  subtitle?: string;
  content?: string | string[];
  features?: { title: string; desc: string }[];
  team?: { name: string; role: string; bio?: string }[];
  pricing?: { plan: string; price: string; features: string[]; popular?: boolean }[];
  tamData?: { tam: string; sam: string; som: string };
  matrixData?: { xLabel: string; yLabel: string; points: { name: string; x: number; y: number; isUs?: boolean }[] };
  askData?: { amount: string; usage: { label: string; value: number }[] };
  chartType?: 'bar' | 'line' | 'pie';
  chartData?: any[];
  imageKeyword?: string;
  theme?: 'aurora' | 'snow' | 'slate';
  notes?: string;
}

const INITIAL_SLIDES: Slide[] = [
  {
    id: '1',
    type: 'hero',
    title: 'Strategic Elite Deck',
    subtitle: 'Powered by the Pitch Deck Skill Framework',
    content: 'A high-stakes narrative engine for investors and executives.',
    theme: 'aurora'
  },
  {
    id: '2',
    type: 'tam',
    title: 'Market Opportunity',
    subtitle: 'The billion-dollar prize',
    tamData: { tam: '$12.5B', sam: '$4.2B', som: '$850M' }
  },
  {
    id: '3',
    type: 'matrix',
    title: 'Competitive Landscape',
    subtitle: 'Uniquely positioned for scale',
    matrixData: {
      xLabel: 'Integration Ease',
      yLabel: 'Intelligence Depth',
      points: [
        { name: 'Legacy Tools', x: 20, y: 30 },
        { name: 'Modern Rivals', x: 80, y: 40 },
        { name: 'PitchDeck Elite', x: 85, y: 90, isUs: true }
      ]
    }
  },
  {
    id: '4',
    type: 'chart',
    title: 'Growth Traction',
    chartType: 'bar',
    chartData: [
      { name: 'Q1', value: 120 },
      { name: 'Q2', value: 340 },
      { name: 'Q3', value: 890 },
      { name: 'Q4', value: 2100 },
    ]
  },
  {
    id: '5',
    type: 'ask',
    title: 'The Ask',
    subtitle: 'Fuelling the next phase of growth',
    askData: {
      amount: '$3.5M Seed Round',
      usage: [
        { label: 'Engineering', value: 45 },
        { label: 'Sales & Marketing', value: 35 },
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
      const bgColor = s.theme === 'snow' ? 'FFFFFF' : '030712';
      const textColor = s.theme === 'snow' ? '111827' : 'FFFFFF';
      const accentColor = '6366f1';

      slide.background = { fill: bgColor };

      // Title
      slide.addText(s.title, { 
        x: 0.5, y: 0.5, w: '90%', h: 1, 
        fontSize: 44, bold: true, color: textColor,
        fontFace: 'Arial Black'
      });

      if (s.subtitle) {
        slide.addText(s.subtitle, { 
          x: 0.5, y: 1.2, w: '90%', h: 0.5, 
          fontSize: 24, color: accentColor, bold: true 
        });
      }

      // Content mapping
      if (s.type === 'hero') {
        slide.addText(s.content as string || '', { x: 0.5, y: 2.5, w: '90%', fontSize: 32, align: 'center', color: textColor });
      } else if (Array.isArray(s.content)) {
        slide.addText(s.content.join('\n'), { x: 0.5, y: 2, w: '90%', fontSize: 20, bullet: true, color: textColor });
      } else if (s.content) {
        slide.addText(s.content, { x: 0.5, y: 2, w: '90%', fontSize: 20, color: textColor });
      }

      if (s.notes) slide.addNotes(s.notes);
    });

    pres.writeFile({ fileName: 'PitchDeck_Elite_Export.pptx' });
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

  const renderSlideContent = (s: Slide) => {
    switch (s.type) {
      case 'tam':
        return (
          <div className="tam-container">
            <div className="tam-ring tam-tam"><span>TAM: {s.tamData?.tam}</span></div>
            <div className="tam-ring tam-sam"><span>SAM: {s.tamData?.sam}</span></div>
            <div className="tam-ring tam-som"><span>SOM: {s.tamData?.som}</span></div>
          </div>
        );
      case 'matrix':
        return (
          <div className="matrix-container">
            <div className="matrix-label-y">{s.matrixData?.yLabel}</div>
            <div className="matrix-label-x">{s.matrixData?.xLabel}</div>
            <div className="matrix-quadrant"></div><div className="matrix-quadrant"></div>
            <div className="matrix-quadrant"></div><div className="matrix-quadrant"></div>
            {s.matrixData?.points.map((p, i) => (
              <div key={i} className={`matrix-point ${p.isUs ? 'us' : ''}`} style={{ left: `${p.x}%`, top: `${100 - p.y}%` }}>
                {p.name}
              </div>
            ))}
          </div>
        );
      case 'ask':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem' }}>
            <h2 style={{ fontSize: '4rem', fontWeight: 800, color: 'white', marginBottom: '3rem' }}>{s.askData?.amount}</h2>
            <div style={{ display: 'flex', gap: '2rem', width: '100%' }}>
              {s.askData?.usage.map((u, i) => (
                <div key={i} style={{ flex: 1, padding: '2rem', background: 'var(--glass-bg)', borderRadius: '24px', border: '1px solid var(--glass-border)', textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary-color)' }}>{u.value}%</div>
                  <div style={{ fontWeight: 600, marginTop: '0.5rem' }}>{u.label}</div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'chart':
        const colors = ['#6366f1', '#ec4899', '#8b5cf6', '#3b82f6'];
        return (
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              {s.chartType === 'line' ? (
                <LineChart data={s.chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip contentStyle={{ background: '#111827', border: '1px solid rgba(255,255,255,0.1)' }} />
                  <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={4} dot={{ r: 6 }} />
                </LineChart>
              ) : s.chartType === 'pie' ? (
                <PieChart>
                  <Pie data={s.chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} label>
                    {s.chartData?.map((_, index) => <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              ) : (
                <BarChart data={s.chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip contentStyle={{ background: '#111827', border: '1px solid rgba(255,255,255,0.1)' }} />
                  <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        );
      case 'grid':
        return (
          <div className="feature-grid">
            {s.features?.map((f, i) => (
              <div key={i} className="feature-card">
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        );
      case 'team':
        return (
          <div className="team-grid">
            {s.team?.map((m, i) => (
              <div key={i} className="team-member">
                <div className="member-avatar">{m.name[0]}</div>
                <h3 style={{ color: 'white' }}>{m.name}</h3>
                <p style={{ color: 'var(--primary-color)', fontWeight: 600 }}>{m.role}</p>
                <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>{m.bio}</p>
              </div>
            ))}
          </div>
        );
      case 'pricing':
        return (
          <div className="pricing-grid">
            {s.pricing?.map((p, i) => (
              <div key={i} className={`pricing-card ${p.popular ? 'popular' : ''}`}>
                <h3 style={{ marginBottom: '0.5rem' }}>{p.plan}</h3>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, margin: '1rem 0' }}>{p.price}</div>
                <ul style={{ listStyle: 'none', marginBottom: '2rem' }}>
                  {p.features.map((f, j) => (
                    <li key={j} style={{ marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Check size={16} color="var(--primary-color)" /> {f}
                    </li>
                  ))}
                </ul>
                <button className="primary-button" style={{ marginTop: 'auto' }}>Get Started</button>
              </div>
            ))}
          </div>
        );
      default:
        return Array.isArray(s.content) ? (
          <ul className="slide-list">{s.content.map((item, i) => <li key={i}>{item}</li>)}</ul>
        ) : (
          <p className="slide-body">{s.content}</p>
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

      <div className="app-wrapper">
        <header className="header">
          <div className="logo">
            <Rocket size={24} style={{ marginRight: '10px' }} /> PitchDeck Elite
            {isLive && <span className="live-badge">MCP LIVE</span>}
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="secondary-button" onClick={exportToPPTX}><FileText size={20} /> .pptx</button>
            <button className="secondary-button" onClick={() => window.print()}><Download size={20} /> .pdf</button>
            <button className="secondary-button" onClick={() => setIsEditorOpen(!isEditorOpen)}><Settings size={20} /> Settings</button>
          </div>
        </header>

        <main className="main-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.5 }}
              className="deck-container glass-panel"
            >
              {slide.imageKeyword && (
                <img src={`https://source.unsplash.com/featured/?${slide.imageKeyword}`} className="slide-bg-image" alt="bg" />
              )}
              <div className={`slide layout-${slide.type}`}>
                <div className="slide-type-indicator">{slide.type}</div>
                <div className="slide-content">
                  <h1 className="slide-title">{slide.title}</h1>
                  {slide.subtitle && <p className="slide-subtitle">{slide.subtitle}</p>}
                  {renderSlideContent(slide)}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </main>

        <div className="controls glass-panel">
          <button onClick={prevSlide} disabled={currentSlide === 0}><ChevronLeft size={32} /></button>
          <div className="slide-counter">{currentSlide + 1} / {slides.length}</div>
          <button onClick={nextSlide} disabled={currentSlide === slides.length - 1}><ChevronRight size={32} /></button>
        </div>

        <div className="progress-bar" style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }} />

        <div className={`editor-sidebar ${isEditorOpen ? 'open' : ''}`}>
          <h2>Elite Config</h2>
          <textarea className="editor-textarea" value={jsonInput} onChange={(e) => setJsonInput(e.target.value)} />
          <button className="primary-button" onClick={handleUpdateSlides}>Apply</button>
        </div>
      </div>
    </div>
  )
}

export default App
