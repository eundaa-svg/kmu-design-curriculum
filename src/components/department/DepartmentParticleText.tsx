import { useEffect, useRef } from 'react'

interface Props {
  departmentId: string
}

const CONFIG: Record<string, { text: string; bgColor: string; particleColor: string }> = {
  'industrial-design':   { text: 'Industrial',    bgColor: '#FF0017', particleColor: '#FFFFFF' },
  'visual-design':       { text: 'Visual',         bgColor: '#FF006A', particleColor: '#FFFFFF' },
  'metal-craft':         { text: 'Metal Craft',    bgColor: '#FFC900', particleColor: '#FFFFFF' },
  'ceramic-craft':       { text: 'Ceramic',        bgColor: '#FF7700', particleColor: '#FFFFFF' },
  'fashion-design':      { text: 'Fashion',        bgColor: '#8E008E', particleColor: '#FFFFFF' },
  'spatial-design':      { text: 'Spatial',        bgColor: '#008AC2', particleColor: '#FFFFFF' },
  'moving-image-design': { text: 'Moving Image',   bgColor: '#00BCB5', particleColor: '#FFFFFF' },
  'automotive-design':   { text: 'Automotive',     bgColor: '#2B50B6', particleColor: '#FFFFFF' },
  'ai-design':           { text: 'AI Design',      bgColor: '#111111', particleColor: '#00FF00' },
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
    // 복원력 (스프링)
    const dx = this.originX - this.x
    const dy = this.originY - this.y
    this.vx += dx * 0.08
    this.vy += dy * 0.08

    // 마우스 반발력
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

    // 마찰
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

      // offscreen canvas에 텍스트 렌더링
      const off = document.createElement('canvas')
      off.width = w
      off.height = h
      const octx = off.getContext('2d')!

      // 폰트 크기: 텍스트가 캔버스 너비의 80%를 차지하도록
      let fontSize = Math.floor(h * 0.55)
      octx.font = `900 ${fontSize}px "Helvetica Neue", Helvetica, Arial, sans-serif`
      let measured = octx.measureText(cfg.text).width
      if (measured > w * 0.82) {
        fontSize = Math.floor(fontSize * ((w * 0.82) / measured))
      }
      octx.font = `900 ${fontSize}px "Helvetica Neue", Helvetica, Arial, sans-serif`
      octx.fillStyle = '#FFFFFF'
      octx.textAlign = 'center'
      octx.textBaseline = 'middle'
      octx.fillText(cfg.text, w / 2, h / 2)

      // 픽셀 데이터 추출
      const imageData = octx.getImageData(0, 0, w, h)
      const data = imageData.data
      const gap = isMobile ? 4 : 3
      const newParticles: Particle[] = []

      for (let y = 0; y < h; y += gap) {
        for (let x = 0; x < w; x += gap) {
          const idx = (y * w + x) * 4
          // alpha 채널이 충분히 밝은 픽셀만 파티클 생성
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

      // 배경
      ctx.fillStyle = cfg.bgColor
      ctx.beginPath()
      ctx.roundRect(0, 0, canvas.width, canvas.height, 16)
      ctx.fill()

      // 파티클 업데이트 & 렌더링
      ctx.fillStyle = cfg.particleColor
      for (const p of particles) {
        p.update(mouseX, mouseY, mouseActive)
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2)
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    // 마우스 이벤트
    function onMouseMove(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect()
      const scaleX = canvas.width / rect.width
      const scaleY = canvas.height / rect.height
      mouseX = (e.clientX - rect.left) * scaleX
      mouseY = (e.clientY - rect.top) * scaleY
      mouseActive = true
    }
    function onMouseLeave() {
      mouseActive = false
    }

    // 터치 이벤트
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
    function onTouchEnd() {
      mouseActive = false
    }

    // ResizeObserver
    const ro = new ResizeObserver(() => {
      resize()
    })
    ro.observe(containerRef.current)

    // IntersectionObserver (화면 밖이면 애니메이션 정지)
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
