import { useEffect, useRef } from 'react'

interface Props {
  departmentId: string
}

const CONFIG: Record<string, { line1: string; line2: string; bgColor: string; particleColor: string }> = {
  'industrial-design':   { line1: 'DEPT. OF', line2: 'INDUSTRIAL DESIGN',                   bgColor: '#FF0017', particleColor: '#FFFFFF' },
  'visual-design':       { line1: 'DEPT. OF', line2: 'VISUAL COMMUNICATION DESIGN',          bgColor: '#FF006A', particleColor: '#FFFFFF' },
  'metal-craft':         { line1: 'DEPT. OF', line2: 'METAL CRAFT',                          bgColor: '#FFC900', particleColor: '#FFFFFF' },
  'ceramic-craft':       { line1: 'DEPT. OF', line2: 'CERAMIC CRAFT',                        bgColor: '#FF7700', particleColor: '#FFFFFF' },
  'fashion-design':      { line1: 'DEPT. OF', line2: 'FASHION DESIGN',                       bgColor: '#8E008E', particleColor: '#FFFFFF' },
  'spatial-design':      { line1: 'DEPT. OF', line2: 'SPATIAL DESIGN',                       bgColor: '#008AC2', particleColor: '#FFFFFF' },
  'moving-image-design': { line1: 'DEPT. OF', line2: 'MOVING IMAGE DESIGN',                  bgColor: '#00BCB5', particleColor: '#FFFFFF' },
  'automotive-design':   { line1: 'DEPT. OF', line2: 'AUTOMOTIVE & TRANSPORTATION DESIGN',   bgColor: '#2B50B6', particleColor: '#FFFFFF' },
  'ai-design':           { line1: 'DEPT. OF', line2: 'AI DESIGN',                            bgColor: '#111111', particleColor: '#00FF00' },
}

class Particle {
  originX: number
  originY: number
  x: number
  y: number
  vx = 0
  vy = 0

  constructor(x: number, y: number) {
    this.originX = x
    this.originY = y
    this.x = x
    this.y = y
  }

  update(mouseX: number, mouseY: number, mouseActive: boolean) {
    const dx = this.originX - this.x
    const dy = this.originY - this.y
    this.vx += dx * 0.08
    this.vy += dy * 0.08

    if (mouseActive) {
      const mdx = this.x - mouseX
      const mdy = this.y - mouseY
      const dist = Math.sqrt(mdx * mdx + mdy * mdy)
      const radius = 100
      if (dist < radius && dist > 0) {
        const force = ((radius - dist) / radius) * 8
        this.vx += (mdx / dist) * force
        this.vy += (mdy / dist) * force
      }
    }

    this.vx *= 0.9
    this.vy *= 0.9
    this.x += this.vx
    this.y += this.vy
  }
}

export default function DepartmentParticleText({ departmentId }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cfg = CONFIG[departmentId]
    if (!cfg || !canvasRef.current || !containerRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')!
    if (!ctx) return

    let particles: Particle[] = []
    let animId = 0
    let mouseX = 0
    let mouseY = 0
    let mouseActive = false
    let running = true

    function buildParticles() {
      const w = canvas.width
      const h = canvas.height
      const isMobile = w < 600

      const off = document.createElement('canvas')
      off.width = w
      off.height = h
      const octx = off.getContext('2d')!

      const fontFace = '"Helvetica Neue", Helvetica, Arial, sans-serif'

      // 2행 폰트 크기: 캔버스 너비의 80%를 차지하도록 자동 조절
      let fontSize2 = Math.floor(h * 0.38)
      octx.font = `900 ${fontSize2}px ${fontFace}`
      const measured2 = octx.measureText(cfg.line2).width
      if (measured2 > w * 0.82) {
        fontSize2 = Math.floor(fontSize2 * ((w * 0.82) / measured2))
      }

      // 1행 폰트 크기: 2행의 40%
      const fontSize1 = Math.max(10, Math.floor(fontSize2 * 0.4))
      // 줄 간격: 2행 폰트 크기의 20%
      const lineGap = Math.floor(fontSize2 * 0.2)
      // 두 줄 전체 높이 = fontSize1 + lineGap + fontSize2
      const totalH = fontSize1 + lineGap + fontSize2
      const centerY = h / 2
      // 1행 y: 중앙에서 올라감
      const y1 = centerY - totalH / 2 + fontSize1 / 2
      // 2행 y: 1행 아래 + 간격
      const y2 = y1 + fontSize1 / 2 + lineGap + fontSize2 / 2

      octx.textAlign = 'center'
      octx.textBaseline = 'middle'
      octx.fillStyle = '#FFFFFF'

      octx.font = `700 ${fontSize1}px ${fontFace}`
      octx.fillText(cfg.line1, w / 2, y1)

      octx.font = `900 ${fontSize2}px ${fontFace}`
      octx.fillText(cfg.line2, w / 2, y2)

      const imageData = octx.getImageData(0, 0, w, h)
      const data = imageData.data
      const gap = isMobile ? 4 : 3
      const newParticles: Particle[] = []

      for (let y = 0; y < h; y += gap) {
        for (let x = 0; x < w; x += gap) {
          const idx = (y * w + x) * 4
          if (data[idx + 3] > 128) {
            newParticles.push(new Particle(x, y))
          }
        }
      }

      particles = newParticles
    }

    function resize() {
      const w = containerRef.current!.clientWidth
      canvas.width = w
      canvas.height = 220
      buildParticles()
    }

    function draw() {
      if (!running) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = cfg.bgColor
      ctx.beginPath()
      ctx.roundRect(0, 0, canvas.width, canvas.height, 16)
      ctx.fill()

      ctx.fillStyle = cfg.particleColor
      for (const p of particles) {
        p.update(mouseX, mouseY, mouseActive)
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2)
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    function onMouseMove(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect()
      const scaleX = canvas.width / rect.width
      const scaleY = canvas.height / rect.height
      mouseX = (e.clientX - rect.left) * scaleX
      mouseY = (e.clientY - rect.top) * scaleY
      mouseActive = true
    }
    function onMouseLeave() { mouseActive = false }

    function onTouchMove(e: TouchEvent) {
      e.preventDefault()
      const rect = canvas.getBoundingClientRect()
      const scaleX = canvas.width / rect.width
      const scaleY = canvas.height / rect.height
      const t = e.touches[0]
      mouseX = (t.clientX - rect.left) * scaleX
      mouseY = (t.clientY - rect.top) * scaleY
      mouseActive = true
    }
    function onTouchEnd() { mouseActive = false }

    const ro = new ResizeObserver(() => { resize() })
    ro.observe(containerRef.current)

    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting
        if (running) draw()
      },
      { threshold: 0 }
    )
    io.observe(canvas)

    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mouseleave', onMouseLeave)
    canvas.addEventListener('touchmove', onTouchMove, { passive: false })
    canvas.addEventListener('touchend', onTouchEnd)

    resize()
    draw()

    return () => {
      running = false
      cancelAnimationFrame(animId)
      ro.disconnect()
      io.disconnect()
      canvas.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mouseleave', onMouseLeave)
      canvas.removeEventListener('touchmove', onTouchMove)
      canvas.removeEventListener('touchend', onTouchEnd)
    }
  }, [departmentId])

  if (!CONFIG[departmentId]) return null

  return (
    <div ref={containerRef} style={{ width: '100%', marginBottom: 24 }}>
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: 220,
          borderRadius: 16,
          cursor: 'default',
        }}
      />
    </div>
  )
}
