import { useState } from 'react'
import { Sidebar } from './App'

// ── Data ──────────────────────────────────────────────────────────────────────

const PATIENT_HEADER = '*** (56y) - 2010-07-26 17:'

const META_RIGHT = ['***', '1953-07-29 M', 'Institution Name', 'S4', 'Vascular^AngioRunOff(Adult)']

interface VP {
  im: string; se: number
  type: 'topo' | 'axial' | 'axial2' | 'chest' | 'vrt' | 'empty'
  protocol: string
  wl: number | string; ww: number
  mA: string; kV: string; time: string; t: string; loc: string
  img?: string
}

const VIEWPORTS: VP[] = [
  { im: '1/1',     se: 1, type: 'topo',   protocol: 'Topogram 0.6 T80s',     wl: 50,    ww: 350,  mA: '25mA',  kV: '110kV', time: '17:40:22', t: '0.6mm',  loc: '-160.0mm', img: '' },
  { im: '1/1',     se: 2, type: 'axial',  protocol: 'PreMonitoring 10 B31s', wl: 40,    ww: 300,  mA: '34mA',  kV: '110kV', time: '17:41:53', t: '10.0mm', loc: '893.0mm',  img: '' },
  { im: '1/3',     se: 3, type: 'axial2', protocol: 'Monitoring 10 B31s',    wl: 40,    ww: 300,  mA: '34mA',  kV: '110kV', time: '17:42:38', t: '10.0mm', loc: '893.0mm',  img: '' },
  { im: '37/1444', se: 5, type: 'chest',  protocol: 'AngioRunOff 1.5 B31s',  wl: 'TTE', ww: 1378, mA: '125mA', kV: '110kV', time: '17:42:50', t: '1.5mm',  loc: '870.2mm',  img: '' },
  { im: '',        se: 0, type: 'empty',  protocol: '',                       wl: 0,     ww: 0,    mA: '',      kV: '',      time: '',         t: '',       loc: '',         img: '' },
  { im: '1/20',    se: 7, type: 'vrt',    protocol: '<VRT Range[1]>',         wl: 128,   ww: 256,  mA: '',      kV: '',      time: '17:42:49', t: '',       loc: '',         img: '' },
]

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
            {data.img && (
              <img src={data.img} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            )}
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

// ── Grid Page ─────────────────────────────────────────────────────────────────

export default function GridPage({ onSeriesClick }: { onSeriesClick: (i: number) => void }) {
  const [selected, setSelected] = useState(3)

  return (
    <div className="dicom-main">
      <Sidebar onSeriesClick={onSeriesClick} />
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
  )
}
