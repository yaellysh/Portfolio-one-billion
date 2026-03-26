import { useState, useRef, useEffect } from 'react'
import type React from 'react'
import './App.css'

// ── Toolbar Icons (inline SVG) ────────────────────────────────────────────────

const Icon = {
  Folder: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M1 4a1 1 0 011-1h3.5l1 1.5H14a1 1 0 011 1V12a1 1 0 01-1 1H2a1 1 0 01-1-1V4z" fill="#888" stroke="#aaa" strokeWidth="1"/>
      <ellipse cx="11" cy="5.5" rx="2.5" ry="2.5" fill="#555" stroke="#888" strokeWidth="0.8"/>
      <circle cx="11" cy="5.5" r="1" fill="#222"/>
    </svg>
  ),
  CD: () => (
    <svg width="16" height="16" viewBox="0 0 16 16">
      <circle cx="8" cy="8" r="7" fill="#3a3a3a" stroke="#aaa" strokeWidth="1"/>
      <circle cx="8" cy="8" r="4" fill="none" stroke="#777" strokeWidth="0.8"/>
      <circle cx="8" cy="8" r="1.5" fill="#222" stroke="#888" strokeWidth="0.8"/>
    </svg>
  ),
  Download: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <line x1="8" y1="2" x2="8" y2="10"/>
      <polyline points="5,7 8,11 11,7"/>
      <line x1="2" y1="14" x2="14" y2="14"/>
    </svg>
  ),
  Save: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
      <rect x="2" y="2" width="12" height="12" rx="1" fill="#555" stroke="#aaa"/>
      <rect x="5" y="2" width="6" height="4" fill="#888" stroke="none"/>
      <rect x="3" y="8" width="10" height="5" rx="0.5" fill="#333" stroke="#777" strokeWidth="0.8"/>
    </svg>
  ),
  Layout: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
      <rect x="2" y="2" width="5.5" height="5.5" rx="0.5" fill="#666" stroke="#aaa"/>
      <rect x="8.5" y="2" width="5.5" height="5.5" rx="0.5" fill="#666" stroke="#aaa"/>
      <rect x="2" y="8.5" width="5.5" height="5.5" rx="0.5" fill="#666" stroke="#aaa"/>
      <rect x="8.5" y="8.5" width="5.5" height="5.5" rx="0.5" fill="#666" stroke="#aaa"/>
    </svg>
  ),
  Text: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <text x="2" y="13" fontSize="13" fontWeight="bold" fontFamily="serif" fill="#ccc">A</text>
    </svg>
  ),
  Stacks: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
      <rect x="3" y="9" width="10" height="4" rx="0.5" fill="#555" stroke="#888"/>
      <rect x="3" y="5.5" width="10" height="4" rx="0.5" fill="#666" stroke="#999"/>
      <rect x="3" y="2" width="10" height="4" rx="0.5" fill="#777" stroke="#aaa"/>
    </svg>
  ),
  Crosshair: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
      <circle cx="8" cy="8" r="4"/>
      <line x1="8" y1="1" x2="8" y2="4"/>
      <line x1="8" y1="12" x2="8" y2="15"/>
      <line x1="1" y1="8" x2="4" y2="8"/>
      <line x1="12" y1="8" x2="15" y2="8"/>
    </svg>
  ),
  Zoom: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
      <circle cx="6.5" cy="6.5" r="4.5"/>
      <line x1="10" y1="10" x2="14" y2="14"/>
      <line x1="4.5" y1="6.5" x2="8.5" y2="6.5"/>
      <line x1="6.5" y1="4.5" x2="6.5" y2="8.5"/>
    </svg>
  ),
  Ruler: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
      <rect x="1" y="5" width="14" height="6" rx="0.5" fill="#555" stroke="#aaa"/>
      <line x1="4" y1="5" x2="4" y2="7.5" stroke="#aaa" strokeWidth="1"/>
      <line x1="7" y1="5" x2="7" y2="8" stroke="#aaa" strokeWidth="1"/>
      <line x1="10" y1="5" x2="10" y2="7.5" stroke="#aaa" strokeWidth="1"/>
      <line x1="13" y1="5" x2="13" y2="7.5" stroke="#aaa" strokeWidth="1"/>
    </svg>
  ),
  Navigate: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
      <polyline points="5,5 8,2 11,5"/>
      <line x1="8" y1="2" x2="8" y2="14"/>
      <polyline points="5,11 8,14 11,11"/>
    </svg>
  ),
  Patient: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
      <rect x="1" y="2" width="14" height="12" rx="1" fill="#444" stroke="#888"/>
      <circle cx="5.5" cy="6.5" r="2" fill="#666" stroke="#aaa"/>
      <path d="M2 13c0-2 1.5-3 3.5-3s3.5 1 3.5 3" fill="#555" stroke="none"/>
      <line x1="10" y1="6" x2="14" y2="6" stroke="#777" strokeWidth="1"/>
      <line x1="10" y1="8.5" x2="14" y2="8.5" stroke="#666" strokeWidth="1"/>
      <line x1="10" y1="11" x2="13" y2="11" stroke="#555" strokeWidth="1"/>
    </svg>
  ),
  Help: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
      <circle cx="8" cy="8" r="6.5" fill="#444" stroke="#888"/>
      <text x="5.5" y="12" fontSize="10" fontWeight="bold" fill="#ccc" stroke="none">?</text>
    </svg>
  ),
  Fullscreen: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
      <polyline points="1,5 1,1 5,1"/>
      <polyline points="11,1 15,1 15,5"/>
      <polyline points="15,11 15,15 11,15"/>
      <polyline points="5,15 1,15 1,11"/>
    </svg>
  ),
}

const TOOLBAR: Array<{ icon: React.ReactNode; label: string; active?: boolean } | 'sep'> = [
  { icon: <Icon.Folder />, label: 'Open' },
  { icon: <Icon.CD />,     label: 'CD/DVD' },
  { icon: <Icon.Download />, label: 'Receive' },
  { icon: <Icon.Save />,   label: 'Export' },
  'sep',
  { icon: <Icon.Layout />, label: 'Layout' },
  { icon: <Icon.Text />,   label: 'Annotate' },
  { icon: <Icon.Stacks />, label: 'Series' },
  'sep',
  { icon: <Icon.Crosshair />, label: 'Crosshair' },
  { icon: <Icon.Zoom />,   label: 'Zoom' },
  { icon: <Icon.Ruler />,  label: 'Measure' },
  { icon: <Icon.Navigate />, label: 'Scroll' },
  'sep',
  { icon: <Icon.Patient />, label: 'Patient' },
  { icon: <span className="tb-label">MR</span>,  label: 'Modality' },
  { icon: <span className="tb-label active-label">R</span>, label: 'Report', active: true },
  { icon: <Icon.Help />,   label: 'Help' },
  { icon: <Icon.Fullscreen />, label: 'Fullscreen' },
]

function Toolbar() {
  return (
    <div className="toolbar">
      {TOOLBAR.map((item, i) =>
        item === 'sep'
          ? <div key={i} className="tb-sep" />
          : (
            <button key={i} className={`tb-btn${item.active ? ' active' : ''}`} title={item.label}>
              {item.icon}
            </button>
          )
      )}
    </div>
  )
}

// ── Data ──────────────────────────────────────────────────────────────────────

const PATIENT_HEADER = '*** (56y) - 2010-07-26 17:'

const META_RIGHT = ['***', '1953-07-29 M', 'Institution Name', 'S4', 'Vascular^AngioRunOff(Adult)']

const SERIES = [
  { name: 'Patient Profile',   count: 1    },
  { name: 'Patient Experience', count: 2 },
  // { name: '<VRT Range[1]>',       count: 3   },
]

interface VP {
  im: string; se: number
  type: 'topo' | 'axial' | 'axial2' | 'chest' | 'vrt' | 'empty'
  protocol: string
  wl: number | string; ww: number
  mA: string; kV: string; time: string; t: string; loc: string
}

const VIEWPORTS: VP[] = [
  { im: '1/1',     se: 1, type: 'topo',   protocol: 'Topogram 0.6 T80s',     wl: 50,    ww: 350,  mA: '25mA',  kV: '110kV', time: '17:40:22', t: '0.6mm',  loc: '-160.0mm' },
  { im: '1/1',     se: 2, type: 'axial',  protocol: 'PreMonitoring 10 B31s', wl: 40,    ww: 300,  mA: '34mA',  kV: '110kV', time: '17:41:53', t: '10.0mm', loc: '893.0mm'  },
  { im: '1/3',     se: 3, type: 'axial2', protocol: 'Monitoring 10 B31s',    wl: 40,    ww: 300,  mA: '34mA',  kV: '110kV', time: '17:42:38', t: '10.0mm', loc: '893.0mm'  },
  { im: '37/1444', se: 5, type: 'chest',  protocol: 'AngioRunOff 1.5 B31s',  wl: 'TTE', ww: 1378, mA: '125mA', kV: '110kV', time: '17:42:50', t: '1.5mm',  loc: '870.2mm'  },
  { im: '',        se: 0, type: 'empty',  protocol: '',                       wl: 0,     ww: 0,    mA: '',      kV: '',      time: '',         t: '',       loc: ''          },
  { im: '1/20',    se: 7, type: 'vrt',    protocol: '<VRT Range[1]>',         wl: 128,   ww: 256,  mA: '',      kV: '',      time: '17:42:49', t: '',       loc: ''          },
]

// ── Sidebar ───────────────────────────────────────────────────────────────────

function Sidebar({ onSeriesClick }: { onSeriesClick: (i: number) => void }) {
  return (
    <div className="sidebar">
      {SERIES.map((s, i) => (
        <div key={i} className="series-item" onClick={() => onSeriesClick(i)}>
          <div className="series-label">{s.name}</div>
          <div className="series-thumb">
            {i === 0 && <img src="/dicom.png" alt="" className="series-thumb-img" />}
            <span className="series-count">{s.count}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Viewport Panel ────────────────────────────────────────────────────────────

function ViewportPanel({ data, selected, onSelect }: {
  data: VP
  selected: boolean
  onSelect: () => void
}) {
  const isEmpty = data.type === 'empty'
  return (
    <div className={`viewport${selected ? ' selected' : ''}`} onClick={onSelect}>
      <div className="vp-header">
        <span className="vp-title">{isEmpty ? '' : PATIENT_HEADER}</span>
        <span className="vp-controls">
          <button>□</button>
          <button>□</button>
          <button className="vp-btn-close">×</button>
        </span>
      </div>
      <div className="vp-body">
        {!isEmpty && (
          <>
            <div className="meta tl">
              <div>Im: {data.im}</div>
              <div>Se: {data.se}</div>
            </div>
            <div className="meta tr">
              {[...META_RIGHT, data.protocol].map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
            <div className="meta bl">
              {data.wl !== 0 && <div>WL: {data.wl} WW: {data.ww} [D]</div>}
              {data.t && <div>T: {data.t} L: {data.loc}</div>}
            </div>
            <div className="meta br">
              {data.mA && <div>{data.mA} {data.kV}</div>}
              {data.time && <div>2010-07-26 {data.time}</div>}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// ── Detail View ───────────────────────────────────────────────────────────────

const DICOM_TAGS = [
  { group: 'Patient',  rows: [
    ['Patient Name',       'Yael Lyshkow'],
    ['Patient Birth Date', '28/01/2004'],
    ['Patient Sex',        'Female'],
    ['Patient Age',        '22'],
    ['Patient Address',    'Portland, ME, USA'],
  ]},
  { group: 'Education', rows: [
    ['Location',        'University of Toronto'],
    ['Start Date',        'September 2022'],
    ['End Date',          'December 2025'],
    ['Degree',    'Honours Bachelor of Science'],
    ['Major', 'Computer Science (AI)'],
    ['Minor', 'Mathematics']
  ]},
  { group: 'Series', rows: [
    ['Series Date',        '14-October-2005'],
    ['Series Time',        '12:54:35'],
    ['Series Description', 'anonymized'],
  ]},
]

const DRAWINGS = ['/drawings/1.PNG', '/drawings/2.PNG', '/drawings/3.PNG', '/drawings/4.PNG']

const FRAME_LABELS: string[][] = [
  ['anonymized', 'anonymized', 'anonymized', 'MR'],
  ['anonymized', 'anonymized', 'anonymized', 'MR'],
  ['anonymized', 'anonymized', 'anonymized', 'MR'],
  ['anonymized', 'anonymized', 'anonymized', 'MR'],
]

// Per-frame DICOM-style annotations
// Coordinates are in a 0–100 viewBox so they scale with the viewport
interface LineAnno  { type: 'line';   x1: number; y1: number; x2: number; y2: number; label: string[]; lx: number; ly: number }
type Anno = LineAnno

const ANNOTATIONS: Anno[][] = [
  [ // frame 1 — label side is x1 for line1, x2 for line2
    { type: 'line', x1: 38, y1: 72, x2: 20, y2: 58, label: ['Entry Level','Full-Stack','Software Engineer','working in',' Healthcare'], lx: 4, ly: 52 },
    { type: 'line', x1: 76, y1: 40, x2: 83, y2: 30, label: ['Patient Name:','Yael Lyshkow','Address:','Portland, ME','Age: 22'], lx: 86, ly: 24 },
  ],
  [], // frame 2
  [], // frame 3
  [], // frame 4
  [ // frame 2
    { type: 'line', x1: 20, y1: 18, x2: 40, y2: 18, label: [
      'Experience',
      'Worked with multiple hospitals including ',
      '- University Health Network (Toronto General Hospital)',
      '- SickKids Hospital',
      '- Stanford Health Care',
      '- UCLH (University College London Hospitals)',
    ], lx: 16, ly: 12 },
    ],
]

function AnnotationOverlay({ frame }: { frame: number }) {
  const annos = ANNOTATIONS[frame] ?? []
  const Y = '#e8e800' // DICOM yellow

  return (
    <svg
      className="anno-svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      {annos.map((a, i) => {
        if (a.type === 'line') {
          return (
            <g key={i}>
              <line x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2} stroke={Y} strokeWidth="0.1" />
              {a.label.map((line, li) => (
                <text key={li} x={a.lx} y={a.ly + li * 1.8} fill={Y} fontSize="1.5" fontFamily="monospace">{line}</text>
              ))}
            </g>
          )
        }
        return null
      })}
    </svg>
  )
}

function DetailView({ onBack }: { onBack: () => void }) {
  const [frame, setFrame] = useState(0)
  const accumulated = useRef(0)

  // preload all images so frame switches are instant
  useEffect(() => {
    DRAWINGS.forEach(src => { new Image().src = src })
  }, [])


  // HERE IS SCROLL SPEED
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    accumulated.current += e.deltaY
    const threshold = 20
    if (accumulated.current > threshold) {
      accumulated.current = 0
      setFrame(f => Math.min(f + 1, DRAWINGS.length - 1))
    } else if (accumulated.current < -threshold) {
      accumulated.current = 0
      setFrame(f => Math.max(f - 1, 0))
    }
  }

  return (
    <div className="detail-layout">
      <Sidebar onSeriesClick={onBack} />
      {/* main black viewport */}
      <div className="detail-viewport" onWheel={handleWheel}>
      

        <img
          className="detail-image"
          src={DRAWINGS[frame]}
          alt={`frame ${frame + 1}`}
        />
        <AnnotationOverlay frame={frame} />

        <div className="meta tl">
          {FRAME_LABELS[frame].map((line, i) => <div key={i}>{line}</div>)}
        </div>

        <div className="meta tr">
          <div>anonymized</div>
          <div>MAGNETOM EXPERT</div>
          <div>anonymized</div>
          <div>14-October-2005</div>
          <div>12:52:56</div>
          <div>Im: {frame + 1}/{DRAWINGS.length}</div>
          <div>Series 1</div>
        </div>

        <div className="meta bl">
          <div>anonymized</div>
          <div>ST 10.00</div>
          <div>RT 20.00</div>
          <div>ET 6.00</div>
        </div>

        <div className="meta br">
          <div>L: 350.00</div>
          <div>W: 630.00</div>
          <div>Zoom: 206%</div>
        </div>

        {/* scroll hint */}
        <div className="scroll-hint">
          <svg width="110" height="48" viewBox="0 0 110 48" fill="none">
            {/* left arrow — sweeps left-and-down, tip points right at bottom */}
            <path d="M 44 7 C 14 5, 3 16, 3 24 C 3 33, 16 41, 42 43"
              stroke="#e8e800" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
            <polyline points="38,39 42,43 38,47"
              stroke="#e8e800" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            {/* right arrow — tip points left at top, sweeps right-and-down */}
            <path d="M 66 7 C 96 5, 107 16, 107 24 C 107 33, 94 41, 68 43"
              stroke="#e8e800" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
            <polyline points="70,3 66,7 70,11"
              stroke="#e8e800" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="scroll-hint-text">scroll to browse</span>
        </div>
      </div>

      {/* DICOM Tags panel */}
      <div className="tags-panel">
        <div className="tags-header">
          <span>DICOM Tags</span>
          <span className="tags-controls">
            <button>–</button>
            <button>×</button>
          </span>
        </div>
        <div className="tags-body">
          {DICOM_TAGS.map((section) => (
            <div key={section.group} className="tags-section">
              {section.rows.map(([field, value]) => (
                <div key={field} className="tags-row">
                  <span className="tags-field">{field}</span>
                  <span className="tags-value">{value}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="tags-tabs">
          <button className="tags-tab active">Patient Inf.</button>
          <button className="tags-tab">All Tags</button>
          <button className="tags-tab">Custom To.</button>
        </div>
      </div>
    </div>
  )
}

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [selected, setSelected] = useState(3)
  const [detailOpen, setDetailOpen] = useState(true)

  const handleSeriesClick = (i: number) => {
    if (i === 0) setDetailOpen(true)
  }

  return (
    <div className="dicom-viewer">
      <Toolbar />
      {detailOpen ? (
        <DetailView onBack={() => setDetailOpen(false)} />
      ) : (
        <div className="dicom-main">
          <Sidebar onSeriesClick={handleSeriesClick} />
          <div className="viewport-grid">
            {VIEWPORTS.map((vp, i) => (
              <ViewportPanel
                key={i}
                data={vp}
                selected={selected === i}
                onSelect={() => setSelected(i)}
              />
            ))}
          </div>
        </div>
      )}
      <div className="statusbar">
        {detailOpen ? 'Measured size: Calibrated' : 'Ready'}
        {detailOpen && <span className="statusbar-right">1,920 × 1,020</span>}
      </div>
    </div>
  )
}
