import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface Props {
  departmentId: string | null
  color: string
}

function createGeometry(departmentId: string): THREE.BufferGeometry {
  switch (departmentId) {
    case 'industrial-design':   return new THREE.TorusKnotGeometry(1, 0.35, 80, 12)
    case 'visual-design':       return new THREE.IcosahedronGeometry(1.2, 0)
    case 'metal-craft':         return new THREE.OctahedronGeometry(1.3, 0)
    case 'ceramic-craft':       return new THREE.SphereGeometry(1.2, 16, 12)
    case 'fashion-design':      return new THREE.ConeGeometry(1, 2.2, 8)
    case 'spatial-design':      return new THREE.BoxGeometry(1.8, 1.8, 1.8)
    case 'moving-image-design': return new THREE.DodecahedronGeometry(1.2, 0)
    case 'automotive-design':   return new THREE.TorusGeometry(1.1, 0.45, 12, 48)
    case 'ai-design':           return new THREE.TetrahedronGeometry(1.2, 0)
    default:                    return new THREE.IcosahedronGeometry(1.2, 0)
  }
}

export default function DeptWireframe({ departmentId, color }: Props) {
  const canvasRef = useRef<HTMLDivElement>(null)
  const stateRef = useRef<{
    renderer: THREE.WebGLRenderer
    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
    mesh: THREE.Mesh | THREE.Group
    animId: number
  } | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    if (!departmentId) return

    const container = canvasRef.current
    const w = 300
    const h = 300

    // renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(w, h)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    // scene & camera
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100)
    camera.position.set(0, 0, 5)

    // wireframe material
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(color),
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    })

    let mesh: THREE.Mesh | THREE.Group

    if (departmentId === 'ai-design') {
      // AI: 3개 Tetrahedron 그룹
      const group = new THREE.Group()
      const positions: [number, number, number][] = [
        [0, 0, 0], [0.9, 0.5, 0.3], [-0.7, -0.4, 0.5],
      ]
      const scales = [1, 0.65, 0.5]
      positions.forEach(([x, y, z], idx) => {
        const geo = new THREE.TetrahedronGeometry(0.9, 0)
        const m = new THREE.Mesh(geo, mat.clone())
        m.position.set(x, y, z)
        m.scale.setScalar(scales[idx])
        group.add(m)
      })
      scene.add(group)
      mesh = group
    } else {
      const geo = createGeometry(departmentId)
      const m = new THREE.Mesh(geo, mat)
      scene.add(m)
      mesh = m
    }

    let animId = 0
    function animate() {
      animId = requestAnimationFrame(animate)
      mesh.rotation.y += 0.01
      mesh.rotation.x += 0.003
      renderer.render(scene, camera)
    }
    animate()

    stateRef.current = { renderer, scene, camera, mesh, animId }

    return () => {
      cancelAnimationFrame(animId)
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      // geometry & material dispose
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
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
      ref={canvasRef}
      style={{
        width: 300,
        height: 300,
        pointerEvents: 'none',
      }}
    />
  )
}
