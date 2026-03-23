import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface Props {
  departmentId: string | null
  color: string
  mouseX: number
  mouseY: number
}

/* ── 학과별 오브제 그룹 생성 ── */
function buildGroup(departmentId: string, color: string): THREE.Group {
  const mat = new THREE.LineBasicMaterial({ color: new THREE.Color(color) })
  const wf = (geo: THREE.BufferGeometry) =>
    new THREE.LineSegments(new THREE.WireframeGeometry(geo), mat.clone())

  const group = new THREE.Group()

  switch (departmentId) {
    /* 공업디자인: 의자 */
    case 'industrial-design': {
      const seat = wf(new THREE.BoxGeometry(1.0, 0.1, 0.9))
      seat.position.set(0, 0.3, 0)
      const back = wf(new THREE.BoxGeometry(1.0, 0.7, 0.1))
      back.position.set(0, 0.7, -0.4)
      const legGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.7, 6)
      const legPos: [number, number][] = [
        [0.4, 0.35], [-0.4, 0.35], [0.4, -0.35], [-0.4, -0.35],
      ]
      legPos.forEach(([x, z]) => {
        const leg = wf(legGeo.clone())
        leg.position.set(x, -0.05, z)
        group.add(leg)
      })
      group.add(seat, back)
      break
    }

    /* 시각디자인: 눈 */
    case 'visual-design': {
      const outer = wf(new THREE.TorusGeometry(0.75, 0.1, 6, 24))
      outer.scale.set(1, 0.45, 1)
      const pupil = wf(new THREE.SphereGeometry(0.28, 10, 8))
      group.add(outer, pupil)
      break
    }

    /* 금속공예: 반지 + 보석 */
    case 'metal-craft': {
      const ring = wf(new THREE.TorusGeometry(0.75, 0.14, 8, 28))
      const gem = wf(new THREE.OctahedronGeometry(0.28, 0))
      gem.position.set(0, 0.9, 0)
      group.add(ring, gem)
      break
    }

    /* 도자공예: 도자기 LatheGeometry */
    case 'ceramic-craft': {
      const pts = [
        new THREE.Vector2(0.42, 0),
        new THREE.Vector2(0.58, 0.25),
        new THREE.Vector2(0.34, 0.65),
        new THREE.Vector2(0.5,  1.0),
        new THREE.Vector2(0.46, 1.3),
        new THREE.Vector2(0.4,  1.4),
      ]
      const vase = wf(new THREE.LatheGeometry(pts, 12))
      vase.position.set(0, -0.7, 0)
      group.add(vase)
      break
    }

    /* 의상디자인: 드레스 실루엣 */
    case 'fashion-design': {
      const skirt = wf(new THREE.ConeGeometry(0.85, 1.2, 8))
      skirt.position.set(0, -0.3, 0)
      const torso = wf(new THREE.CylinderGeometry(0.28, 0.28, 0.75, 8))
      torso.position.set(0, 0.65, 0)
      const shoulder = wf(new THREE.BoxGeometry(1.0, 0.1, 0.28))
      shoulder.position.set(0, 1.05, 0)
      group.add(skirt, torso, shoulder)
      break
    }

    /* 공간디자인: 건물 프레임 */
    case 'spatial-design': {
      const outer = wf(new THREE.BoxGeometry(1.2, 1.6, 1.0))
      outer.position.set(0, 0, 0)
      const inner = wf(new THREE.BoxGeometry(0.5, 0.9, 0.5))
      inner.position.set(0.2, -0.2, 0)
      const floor = wf(new THREE.PlaneGeometry(1.4, 1.2))
      floor.rotation.x = -Math.PI / 2
      floor.position.set(0, -0.8, 0)
      group.add(outer, inner, floor)
      break
    }

    /* 영상디자인: 클래퍼보드 */
    case 'moving-image-design': {
      const body = wf(new THREE.BoxGeometry(1.3, 0.9, 0.07))
      const clapper = wf(new THREE.BoxGeometry(1.3, 0.2, 0.07))
      clapper.position.set(0, 0.55, 0)
      clapper.rotation.z = 0.35
      const play = wf(new THREE.ConeGeometry(0.2, 0.35, 4))
      play.rotation.z = -Math.PI / 2
      play.position.set(0.05, -0.05, 0.1)
      group.add(body, clapper, play)
      break
    }

    /* 자동차운송디자인: 자동차 실루엣 */
    case 'automotive-design': {
      const body = wf(new THREE.BoxGeometry(1.9, 0.48, 0.8))
      body.position.set(0, 0.1, 0)
      const cabin = wf(new THREE.BoxGeometry(1.1, 0.38, 0.72))
      cabin.position.set(-0.1, 0.44, 0)
      const wheelGeo = new THREE.TorusGeometry(0.22, 0.07, 6, 16)
      const w1 = wf(wheelGeo.clone()); w1.position.set(0.6, -0.15, 0); w1.rotation.x = Math.PI / 2
      const w2 = wf(wheelGeo.clone()); w2.position.set(-0.6, -0.15, 0); w2.rotation.x = Math.PI / 2
      group.add(body, cabin, w1, w2)
      break
    }

    /* AI디자인: 신경망 */
    case 'ai-design': {
      const nodeMat = new THREE.LineBasicMaterial({ color: new THREE.Color(color) })
      const nodePositions: [number, number, number][] = [
        [0, 0, 0], [0.7, 0.5, 0.2], [-0.65, 0.4, 0.15],
        [0.5, -0.55, 0.1], [-0.5, -0.45, 0.2], [0.2, 0.8, -0.2],
        [-0.3, -0.75, -0.15], [0.8, -0.1, -0.2],
      ]
      nodePositions.forEach(([x, y, z]) => {
        const node = wf(new THREE.SphereGeometry(0.1, 6, 4))
        node.position.set(x, y, z)
        group.add(node)
      })
      // 코어
      const core = wf(new THREE.IcosahedronGeometry(0.38, 1))
      group.add(core)
      // 엣지 연결선
      const edges: [number, number][] = [
        [0,1],[0,2],[0,3],[0,4],[1,5],[2,4],[3,7],[4,6],[1,7],[5,2],
      ]
      edges.forEach(([a, b]) => {
        const pa = nodePositions[a], pb = nodePositions[b]
        const geo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(...pa), new THREE.Vector3(...pb),
        ])
        group.add(new THREE.Line(geo, nodeMat.clone()))
      })
      break
    }

    default: {
      group.add(wf(new THREE.IcosahedronGeometry(1.0, 0)))
    }
  }

  return group
}

export default function DeptWireframe({ departmentId, color, mouseX, mouseY }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef(0)
  const posRef = useRef({ x: mouseX, y: mouseY })
  const mousePosRef = useRef({ x: mouseX, y: mouseY })

  // mouseX/mouseY 변경 시 ref 갱신 (re-render 없이)
  useEffect(() => {
    mousePosRef.current = { x: mouseX, y: mouseY }
  }, [mouseX, mouseY])

  useEffect(() => {
    if (!containerRef.current || !departmentId) return
    const container = containerRef.current

    const W = 150, H = 150
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    camera.position.set(0, 0, 4)

    const group = buildGroup(departmentId, color)
    // 오브제 크기 표준화
    const box = new THREE.Box3().setFromObject(group)
    const size = new THREE.Vector3()
    box.getSize(size)
    const maxDim = Math.max(size.x, size.y, size.z)
    group.scale.setScalar(2.2 / maxDim)
    // 수직 중앙 정렬
    const center = new THREE.Vector3()
    box.getCenter(center)
    group.position.sub(center.multiplyScalar(2.2 / maxDim))

    scene.add(group)

    let time = 0
    posRef.current = { x: mouseX, y: mouseY }

    function animate() {
      rafRef.current = requestAnimationFrame(animate)
      time += 0.016
      group.rotation.y += 0.02
      group.rotation.x = Math.sin(time) * 0.1

      // lerp 위치 추적
      const target = mousePosRef.current
      posRef.current.x += (target.x - posRef.current.x) * 0.15
      posRef.current.y += (target.y - posRef.current.y) * 0.15

      if (container.parentElement) {
        const el = container.parentElement as HTMLElement
        el.style.left = `${posRef.current.x + 20}px`
        el.style.top = `${posRef.current.y + 20}px`
      }

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(rafRef.current)
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.LineSegments || obj instanceof THREE.Line) {
          obj.geometry.dispose()
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose())
          else obj.material.dispose()
        }
      })
    }
  }, [departmentId, color])

  if (!departmentId) return null

  return (
    <div
      ref={containerRef}
      style={{ width: 150, height: 150, pointerEvents: 'none' }}
    />
  )
}
