import React from 'react'

interface Props {
  departmentId: string
}

/* 공업디자인학과 #FF0017 – 제품 설계도 느낌 */
function IndustrialDesign() {
  const c = '#FF0017'
  return (
    <svg viewBox="0 0 800 200" width="100%" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="200" rx="16" fill={c} fillOpacity="0.05" />
      {/* 좌측 큰 원 (stroke only) */}
      <circle cx="160" cy="100" r="72" stroke={c} strokeWidth="2" fill="none" />
      <circle cx="160" cy="100" r="48" stroke={c} strokeWidth="1" strokeDasharray="6 4" fill="none" strokeOpacity="0.4" />
      <circle cx="160" cy="100" r="8" fill={c} fillOpacity="0.4" />
      {/* 십자 가이드라인 */}
      <line x1="160" y1="20" x2="160" y2="180" stroke={c} strokeWidth="1" strokeOpacity="0.25" />
      <line x1="80" y1="100" x2="240" y2="100" stroke={c} strokeWidth="1" strokeOpacity="0.25" />
      {/* 중앙 라운드 사각형 (filled) */}
      <rect x="310" y="60" width="180" height="80" rx="12" fill={c} fillOpacity="0.15" stroke={c} strokeWidth="2" />
      <rect x="326" y="76" width="148" height="48" rx="6" stroke={c} strokeWidth="1" fill="none" strokeOpacity="0.4" />
      {/* 중앙 사각형 내부 아이콘 */}
      <line x1="360" y1="100" x2="440" y2="100" stroke={c} strokeWidth="2" strokeOpacity="0.6" />
      <line x1="400" y1="84" x2="400" y2="116" stroke={c} strokeWidth="2" strokeOpacity="0.6" />
      {/* 우측 작은 원 3개 세로 배열 */}
      <circle cx="640" cy="60" r="20" stroke={c} strokeWidth="2" fill="none" />
      <circle cx="640" cy="60" r="6" fill={c} fillOpacity="0.5" />
      <circle cx="640" cy="100" r="20" stroke={c} strokeWidth="2" fill={c} fillOpacity="0.15" />
      <circle cx="640" cy="100" r="6" fill={c} fillOpacity="0.5" />
      <circle cx="640" cy="140" r="20" stroke={c} strokeWidth="2" fill="none" />
      <circle cx="640" cy="140" r="6" fill={c} fillOpacity="0.5" />
      {/* 우측 연결선 */}
      <line x1="640" y1="80" x2="640" y2="80" stroke={c} strokeWidth="1" strokeOpacity="0.3" />
      {/* 격자 점 (우상단) */}
      {[700, 720, 740, 760].map((x) =>
        [30, 50, 70].map((y) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="2" fill={c} fillOpacity="0.3" />
        ))
      )}
    </svg>
  )
}

/* 시각디자인학과 #FF006A – 타이포그래피적 리듬 */
function VisualDesign() {
  const c = '#FF006A'
  return (
    <svg viewBox="0 0 800 200" width="100%" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="200" rx="16" fill={c} fillOpacity="0.05" />
      {/* 좌측 큰 삼각형 (stroke only) */}
      <polygon points="100,30 190,170 10,170" stroke={c} strokeWidth="2" fill="none" />
      <polygon points="100,65 160,155 40,155" stroke={c} strokeWidth="1" fill={c} fillOpacity="0.1" />
      {/* 중앙 원 (filled) */}
      <circle cx="400" cy="100" r="55" fill={c} fillOpacity="0.15" stroke={c} strokeWidth="2" />
      <circle cx="400" cy="100" r="30" stroke={c} strokeWidth="1.5" fill="none" strokeOpacity="0.5" />
      <circle cx="400" cy="100" r="8" fill={c} fillOpacity="0.6" />
      {/* 우측 소삼각형들 회전 배치 */}
      <polygon points="580,40 606,86 554,86" stroke={c} strokeWidth="1.5" fill="none" strokeOpacity="0.8" />
      <polygon points="660,60 678,92 642,92" stroke={c} strokeWidth="1.5" fill={c} fillOpacity="0.2" />
      <polygon points="620,110 646,156 594,156" stroke={c} strokeWidth="1.5" fill="none" strokeOpacity="0.5" />
      <polygon points="700,115 712,137 688,137" stroke={c} strokeWidth="1.5" fill={c} fillOpacity="0.3" />
      {/* 대각선 리듬선 */}
      <line x1="220" y1="20" x2="320" y2="180" stroke={c} strokeWidth="1" strokeOpacity="0.2" />
      <line x1="240" y1="20" x2="340" y2="180" stroke={c} strokeWidth="1" strokeOpacity="0.15" />
      <line x1="480" y1="20" x2="550" y2="100" stroke={c} strokeWidth="1" strokeOpacity="0.2" />
    </svg>
  )
}

/* 금속공예학과 #FFC900 – 보석 커팅 */
function MetalCraft() {
  const c = '#FFC900'
  return (
    <svg viewBox="0 0 800 200" width="100%" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="200" rx="16" fill={c} fillOpacity="0.05" />
      {/* 중앙 큰 마름모 (stroke only) */}
      <polygon points="400,20 530,100 400,180 270,100" stroke={c} strokeWidth="2" fill="none" />
      <polygon points="400,48 502,100 400,152 298,100" stroke={c} strokeWidth="1" fill={c} fillOpacity="0.1" />
      {/* 마름모 내부 구조선 */}
      <line x1="400" y1="20" x2="400" y2="180" stroke={c} strokeWidth="1" strokeOpacity="0.3" />
      <line x1="270" y1="100" x2="530" y2="100" stroke={c} strokeWidth="1" strokeOpacity="0.3" />
      <line x1="335" y1="60" x2="465" y2="140" stroke={c} strokeWidth="1" strokeOpacity="0.2" />
      <line x1="465" y1="60" x2="335" y2="140" stroke={c} strokeWidth="1" strokeOpacity="0.2" />
      {/* 방사형 가느다란 선 */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
        const rad = (deg * Math.PI) / 180
        return (
          <line
            key={deg}
            x1={400}
            y1={100}
            x2={400 + Math.cos(rad) * 160}
            y2={100 + Math.sin(rad) * 90}
            stroke={c}
            strokeWidth="0.5"
            strokeOpacity="0.2"
          />
        )
      })}
      {/* 좌측 소육각형 */}
      <polygon points="120,100 140,86 160,86 170,100 160,114 140,114" stroke={c} strokeWidth="1.5" fill="none" />
      <polygon points="100,100 115,91 130,91 137,100 130,109 115,109" stroke={c} strokeWidth="1" fill={c} fillOpacity="0.2" />
      {/* 우측 소육각형들 */}
      <polygon points="640,75 656,65 672,65 680,75 672,85 656,85" stroke={c} strokeWidth="1.5" fill={c} fillOpacity="0.15" />
      <polygon points="660,115 672,107 684,107 690,115 684,123 672,123" stroke={c} strokeWidth="1.5" fill="none" />
      <polygon points="700,80 710,74 720,74 725,80 720,86 710,86" stroke={c} strokeWidth="1" fill={c} fillOpacity="0.3" />
    </svg>
  )
}

/* 도자공예학과 #FF7700 – 유기적 곡선 */
function CeramicCraft() {
  const c = '#FF7700'
  return (
    <svg viewBox="0 0 800 200" width="100%" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="200" rx="16" fill={c} fillOpacity="0.05" />
      {/* 좌측 큰 원 (filled) */}
      <circle cx="140" cy="100" r="70" fill={c} fillOpacity="0.12" stroke={c} strokeWidth="2" />
      <circle cx="140" cy="100" r="44" stroke={c} strokeWidth="1" fill="none" strokeOpacity="0.3" />
      {/* 중앙 물결 곡선 (sine wave) */}
      <path
        d="M220,100 C250,60 290,60 320,100 C350,140 390,140 420,100 C450,60 490,60 520,100 C550,140 580,140 600,100"
        stroke={c} strokeWidth="2.5" fill="none"
      />
      <path
        d="M220,100 C250,70 290,70 320,100 C350,130 390,130 420,100 C450,70 490,70 520,100 C550,130 580,130 600,100"
        stroke={c} strokeWidth="1" fill="none" strokeOpacity="0.3"
      />
      {/* 우측 타원들 겹침 */}
      <ellipse cx="680" cy="100" rx="80" ry="40" stroke={c} strokeWidth="2" fill="none" />
      <ellipse cx="680" cy="100" rx="56" ry="28" fill={c} fillOpacity="0.15" stroke={c} strokeWidth="1.5" />
      <ellipse cx="680" cy="100" rx="28" ry="14" fill={c} fillOpacity="0.25" />
      {/* 장식 점 */}
      <circle cx="140" cy="100" r="6" fill={c} fillOpacity="0.6" />
      <circle cx="680" cy="100" r="5" fill={c} fillOpacity="0.6" />
    </svg>
  )
}

/* 의상디자인학과 #8E008E – 패션 실루엣 */
function FashionDesign() {
  const c = '#8E008E'
  return (
    <svg viewBox="0 0 800 200" width="100%" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="200" rx="16" fill={c} fillOpacity="0.05" />
      {/* 세로 직사각형 3개 (높이 다름) */}
      <rect x="240" y="30" width="40" height="140" rx="4" stroke={c} strokeWidth="2" fill="none" />
      <rect x="380" y="50" width="40" height="120" rx="4" stroke={c} strokeWidth="2" fill={c} fillOpacity="0.18" />
      <rect x="520" y="20" width="40" height="160" rx="4" stroke={c} strokeWidth="2" fill="none" />
      {/* 사각형 사이를 잇는 부드러운 곡선 */}
      <path d="M280,100 C310,80 360,90 380,100" stroke={c} strokeWidth="1.5" fill="none" strokeOpacity="0.5" />
      <path d="M420,100 C450,110 490,90 520,100" stroke={c} strokeWidth="1.5" fill="none" strokeOpacity="0.5" />
      {/* 좌측 수직선들 (직물 패턴) */}
      {[120, 140, 160, 180, 200].map((x) => (
        <line key={x} x1={x} y1="40" x2={x} y2="160" stroke={c} strokeWidth="1" strokeOpacity={x === 160 ? 0.5 : 0.2} />
      ))}
      {/* 좌측 가로선 (직물 격자) */}
      {[60, 80, 100, 120, 140].map((y) => (
        <line key={y} x1="112" y1={y} x2="208" y2={y} stroke={c} strokeWidth="1" strokeOpacity="0.15" />
      ))}
      {/* 우측 장식 곡선 */}
      <path d="M600,40 Q660,100 600,160" stroke={c} strokeWidth="1.5" fill="none" strokeOpacity="0.4" />
      <path d="M620,55 Q668,100 620,145" stroke={c} strokeWidth="1" fill="none" strokeOpacity="0.25" />
      <path d="M650,70 Q680,100 650,130" stroke={c} strokeWidth="1.5" fill="none" strokeOpacity="0.5" />
    </svg>
  )
}

/* 공간디자인학과 #008AC2 – 아이소메트릭 공간감 */
function SpatialDesign() {
  const c = '#008AC2'
  return (
    <svg viewBox="0 0 800 200" width="100%" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="200" rx="16" fill={c} fillOpacity="0.05" />
      {/* 아이소메트릭 박스 1 (큰 것, 중앙) */}
      {/* 상면 */}
      <polygon points="400,30 500,65 400,100 300,65" fill={c} fillOpacity="0.15" stroke={c} strokeWidth="2" />
      {/* 좌면 */}
      <polygon points="300,65 400,100 400,170 300,135" fill={c} fillOpacity="0.08" stroke={c} strokeWidth="2" />
      {/* 우면 */}
      <polygon points="400,100 500,65 500,135 400,170" fill={c} fillOpacity="0.12" stroke={c} strokeWidth="2" />

      {/* 아이소메트릭 박스 2 (작은 것, 좌측 뒤) */}
      <polygon points="200,60 270,84 200,108 130,84" fill="none" stroke={c} strokeWidth="1.5" strokeOpacity="0.5" />
      <polygon points="130,84 200,108 200,160 130,136" fill="none" stroke={c} strokeWidth="1.5" strokeOpacity="0.4" />
      <polygon points="200,108 270,84 270,136 200,160" fill={c} fillOpacity="0.08" stroke={c} strokeWidth="1.5" strokeOpacity="0.5" />

      {/* 격자 점 우측 */}
      {[580, 610, 640, 670, 700, 730].map((x) =>
        [50, 80, 110, 140, 170].map((y) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="2" fill={c} fillOpacity="0.3" />
        ))
      )}
      {/* 대각선 강조 */}
      <line x1="400" y1="30" x2="400" y2="170" stroke={c} strokeWidth="1" strokeOpacity="0.2" strokeDasharray="4 4" />
    </svg>
  )
}

/* 영상디자인학과 #00BCB5 – 프레임과 모션 */
function MovingImage() {
  const c = '#00BCB5'
  return (
    <svg viewBox="0 0 800 200" width="100%" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="200" rx="16" fill={c} fillOpacity="0.05" />
      {/* 좌측 라운드 사각형 프레임 */}
      <rect x="60" y="35" width="220" height="130" rx="12" stroke={c} strokeWidth="2" fill="none" />
      <rect x="74" y="49" width="192" height="102" rx="6" stroke={c} strokeWidth="1" fill={c} fillOpacity="0.08" strokeOpacity="0.4" />
      {/* 프레임 모서리 장식 */}
      {[[60,35],[280,35],[60,165],[280,165]].map(([x,y], i) => (
        <circle key={i} cx={x} cy={y} r="4" fill={c} fillOpacity="0.5" />
      ))}
      {/* 재생 삼각형 */}
      <polygon points="148,76 148,124 196,100" fill={c} fillOpacity="0.35" stroke={c} strokeWidth="2" />
      {/* 우측 동심원 */}
      <circle cx="600" cy="100" r="80" stroke={c} strokeWidth="1.5" fill="none" strokeOpacity="0.3" />
      <circle cx="600" cy="100" r="60" stroke={c} strokeWidth="1.5" fill="none" strokeOpacity="0.4" />
      <circle cx="600" cy="100" r="40" stroke={c} strokeWidth="2" fill="none" strokeOpacity="0.55" />
      <circle cx="600" cy="100" r="20" fill={c} fillOpacity="0.2" stroke={c} strokeWidth="2" />
      <circle cx="600" cy="100" r="6" fill={c} fillOpacity="0.7" />
      {/* 중앙 연결 점선 */}
      <line x1="310" y1="100" x2="510" y2="100" stroke={c} strokeWidth="1" strokeDasharray="6 4" strokeOpacity="0.3" />
    </svg>
  )
}

/* 자동차운송디자인학과 #2B50B6 – 속도, 유선형 */
function AutomotiveDesign() {
  const c = '#2B50B6'
  return (
    <svg viewBox="0 0 800 200" width="100%" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="200" rx="16" fill={c} fillOpacity="0.05" />
      {/* 속도감 가로 평행선들 */}
      {[55, 70, 85, 100, 115, 130, 145].map((y, i) => (
        <line
          key={y}
          x1={40 + i * 8}
          y1={y}
          x2={500 - i * 4}
          y2={y}
          stroke={c}
          strokeWidth={i === 3 ? 1.5 : 1}
          strokeOpacity={i === 3 ? 0.4 : 0.18}
        />
      ))}
      {/* 유선형 차체 실루엣 */}
      <path
        d="M80,130 C100,130 130,95 200,85 C270,75 340,80 420,80 C490,80 540,90 560,110 C570,120 560,130 540,130 Z"
        fill={c} fillOpacity="0.15" stroke={c} strokeWidth="2"
      />
      {/* 앞유리 라인 */}
      <path
        d="M200,85 C215,85 235,95 250,115"
        stroke={c} strokeWidth="1.5" fill="none" strokeOpacity="0.5"
      />
      {/* 바퀴 2개 */}
      <circle cx="200" cy="130" r="30" fill={c} fillOpacity="0.15" stroke={c} strokeWidth="2" />
      <circle cx="200" cy="130" r="16" stroke={c} strokeWidth="1.5" fill="none" strokeOpacity="0.5" />
      <circle cx="200" cy="130" r="5" fill={c} fillOpacity="0.6" />
      <circle cx="450" cy="130" r="30" fill={c} fillOpacity="0.15" stroke={c} strokeWidth="2" />
      <circle cx="450" cy="130" r="16" stroke={c} strokeWidth="1.5" fill="none" strokeOpacity="0.5" />
      <circle cx="450" cy="130" r="5" fill={c} fillOpacity="0.6" />
      {/* 우측 속도선 강조 */}
      <line x1="600" y1="80" x2="770" y2="80" stroke={c} strokeWidth="2" strokeOpacity="0.5" />
      <line x1="620" y1="95" x2="770" y2="95" stroke={c} strokeWidth="1.5" strokeOpacity="0.35" />
      <line x1="640" y1="110" x2="770" y2="110" stroke={c} strokeWidth="1" strokeOpacity="0.25" />
      <line x1="655" y1="125" x2="770" y2="125" stroke={c} strokeWidth="1" strokeOpacity="0.18" />
    </svg>
  )
}

/* AI디자인학과 #00FF00 (bg) / #00CC00 (stroke) – 신경망 네트워크 */
function AIDesign() {
  const stroke = '#00CC00'
  const bg = '#00FF00'

  const nodes: [number, number][] = [
    [160, 60], [140, 150], [300, 40], [340, 130], [280, 170],
    [470, 70], [500, 150], [640, 50], [680, 120], [660, 175],
    [760, 90],
  ]
  const edges: [number, number][] = [
    [0,1],[0,2],[0,3],[1,3],[1,4],[2,3],[2,5],[3,4],[3,5],[3,6],
    [4,6],[5,6],[5,7],[6,8],[6,9],[7,8],[8,9],[8,10],[9,10],
  ]

  return (
    <svg viewBox="0 0 800 200" width="100%" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="200" rx="16" fill={bg} fillOpacity="0.05" />
      {/* 중앙 사각형 (filled) */}
      <rect x="340" y="65" width="120" height="70" rx="8" fill={stroke} fillOpacity="0.12" stroke={stroke} strokeWidth="1.5" />
      {/* 엣지 (선) */}
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a][0]} y1={nodes[a][1]}
          x2={nodes[b][0]} y2={nodes[b][1]}
          stroke={stroke} strokeWidth="1" strokeOpacity="0.3"
        />
      ))}
      {/* 노드 (원) */}
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="10" fill={bg} fillOpacity="0.15" stroke={stroke} strokeWidth="1.5" />
          <circle cx={x} cy={y} r="4" fill={stroke} fillOpacity="0.6" />
        </g>
      ))}
    </svg>
  )
}

const GRAPHICS: Record<string, () => React.ReactElement> = {
  'industrial-design': IndustrialDesign,
  'visual-design': VisualDesign,
  'metal-craft': MetalCraft,
  'ceramic-craft': CeramicCraft,
  'fashion-design': FashionDesign,
  'spatial-design': SpatialDesign,
  'moving-image': MovingImage,
  'automotive-design': AutomotiveDesign,
  'ai-design': AIDesign,
}

export default function DepartmentGraphic({ departmentId }: Props) {
  const Graphic = GRAPHICS[departmentId]
  if (!Graphic) return null
  return (
    <div style={{ width: '100%', marginBottom: 24, borderRadius: 16, overflow: 'hidden' }}>
      <Graphic />
    </div>
  )
}
