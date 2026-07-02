import { useEffect, useRef } from 'react'

export default function Globe({ selectedOffice }) {
  const containerRef = useRef(null)
  const animRef      = useRef(null)
  const rendererRef  = useRef(null)
  const roRef        = useRef(null)
  const listenersRef = useRef([])
  // Mutable rotation state — shared between event handlers and animation loop
  const stateRef  = useRef({ rotY: 0.5, rotX: -0.15, vx: 0, vy: 0, dragging: false })
  const targetRef = useRef(null) // { y, x } while a city is selected; null = auto-rotate

  // Recompute target whenever the parent changes the selected office
  useEffect(() => {
    if (!selectedOffice) { targetRef.current = null; return }
    // tY: spin globe so the city's longitude reaches the front meridian.
    // Derivation: lon=-90 maps to +Z (front) at rotY=0, so we need
    // rotY = -(lon + 90) * PI/180. tX is reset to 0 (globe upright) so
    // the city appears at its correct latitude in the upper/lower half.
    let tY = -(selectedOffice.lon + 90) * Math.PI / 180
    const tX = 0
    // Shortest-path wrap so the globe never spins more than 180°
    const curY = stateRef.current.rotY
    const diff = ((tY - curY) % (2 * Math.PI) + 3 * Math.PI) % (2 * Math.PI) - Math.PI
    targetRef.current = { y: curY + diff, x: tX }
  }, [selectedOffice])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    import('three').then(THREE => {
      let canvasSize = container.offsetWidth || 420
      container.style.position = 'relative'

      const canvas = document.createElement('canvas')
      canvas.style.cssText = 'display:block;width:100%;height:100%;cursor:grab;'
      container.innerHTML = ''
      container.appendChild(canvas)

      const overlay = document.createElement('div')
      overlay.style.cssText = 'position:absolute;inset:0;pointer-events:none;overflow:hidden;'
      container.appendChild(overlay)

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
      renderer.setSize(canvasSize, canvasSize)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.2
      renderer.outputColorSpace = THREE.SRGBColorSpace
      rendererRef.current = renderer

      const scene  = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 50)
      camera.position.set(0, 0, 3.8)

      const R = 1.3
      const globe = new THREE.Group()
      scene.add(globe)

      // Real Earth texture
      const earthTex = new THREE.TextureLoader().load('/earth.jpg')
      globe.add(new THREE.Mesh(
        new THREE.SphereGeometry(R, 64, 64),
        new THREE.MeshPhongMaterial({ map: earthTex, shininess: 18, specular: new THREE.Color(0x1a3a6a) })
      ))

      // Amber wireframe grid
      globe.add(new THREE.Mesh(
        new THREE.SphereGeometry(R + 0.012, 32, 32),
        new THREE.MeshBasicMaterial({ color: 0xD97706, wireframe: true, transparent: true, opacity: 0.09 })
      ))

      // Atmosphere glow
      globe.add(new THREE.Mesh(
        new THREE.SphereGeometry(R + 0.14, 32, 32),
        new THREE.MeshBasicMaterial({ color: 0x4B9FFF, transparent: true, opacity: 0.13, side: THREE.BackSide })
      ))

      function latLon(lat, lon, r) {
        const phi   = (90 - lat) * (Math.PI / 180)
        const theta = (lon + 180) * (Math.PI / 180)
        return new THREE.Vector3(
          -r * Math.sin(phi) * Math.cos(theta),
           r * Math.cos(phi),
           r * Math.sin(phi) * Math.sin(theta)
        )
      }

      const offices = [
        { lat: 51.51,  lon:  -0.13,  name: 'London'    },
        { lat: 40.71,  lon: -74.01,  name: 'New York'  },
        { lat:  1.35,  lon: 103.82,  name: 'Singapore' },
        { lat: 25.20,  lon:  55.27,  name: 'Dubai'     },
        { lat: 35.68,  lon: 139.69,  name: 'Tokyo'     },
        { lat:-23.55,  lon: -46.63,  name: 'São Paulo' },
        { lat:-33.87,  lon: 151.21,  name: 'Sydney'    },
        { lat: 19.08,  lon:  72.88,  name: 'Mumbai'    },
      ]

      const rings      = []
      const labelItems = []

      for (const o of offices) {
        const localPos = latLon(o.lat, o.lon, R + 0.015)

        const dot = new THREE.Mesh(
          new THREE.SphereGeometry(0.028, 8, 8),
          new THREE.MeshBasicMaterial({ color: 0xF59E0B })
        )
        dot.position.copy(localPos)
        globe.add(dot)

        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(0.055, 0.009, 8, 24),
          new THREE.MeshBasicMaterial({ color: 0xF59E0B, transparent: true, opacity: 0.65 })
        )
        ring.position.copy(localPos)
        ring.lookAt(new THREE.Vector3(0, 0, 0))
        globe.add(ring)
        rings.push(ring)

        const el = document.createElement('div')
        el.textContent = o.name
        el.style.cssText = [
          'position:absolute',
          'transform:translate(-50%,calc(-100% - 11px))',
          'background:rgba(8,18,32,0.82)',
          'color:#fff',
          'font-family:system-ui,sans-serif',
          'font-size:10px',
          'font-weight:700',
          'letter-spacing:.07em',
          'text-transform:uppercase',
          'padding:3px 8px',
          'border-radius:4px',
          'border:1px solid rgba(232,168,71,.55)',
          'white-space:nowrap',
          'pointer-events:none',
          'transition:opacity .12s',
          'opacity:0',
        ].join(';')
        overlay.appendChild(el)
        labelItems.push({ el, localPos: localPos.clone() })
      }

      // Lighting
      scene.add(new THREE.AmbientLight(0x334455, 0.9))
      const sun = new THREE.DirectionalLight(0xfff5e0, 2.2)
      sun.position.set(-3, 2, 4)
      scene.add(sun)
      const fill = new THREE.DirectionalLight(0x2244aa, 0.5)
      fill.position.set(4, -1, -3)
      scene.add(fill)

      // Drag + touch — write directly into stateRef
      const s = stateRef.current
      let lastX = 0, lastY = 0

      const on = (el, ev, fn, opts) => { el.addEventListener(ev, fn, opts); listenersRef.current.push([el, ev, fn]) }

      on(canvas, 'mousedown', e  => { s.dragging = true; lastX = e.clientX; lastY = e.clientY; canvas.style.cursor = 'grabbing' })
      on(window, 'mouseup',   ()  => { s.dragging = false; canvas.style.cursor = 'grab' })
      on(window, 'mousemove', e  => {
        if (!s.dragging) return
        s.vx = (e.clientX - lastX) * 0.007; s.vy = (e.clientY - lastY) * 0.005
        s.rotY += s.vx; s.rotX += s.vy; lastX = e.clientX; lastY = e.clientY
      })
      on(canvas, 'touchstart', e => { s.dragging = true; lastX = e.touches[0].clientX; lastY = e.touches[0].clientY }, { passive: true })
      on(window, 'touchend',   ()  => { s.dragging = false })
      on(window, 'touchmove',  e  => {
        if (!s.dragging) return
        s.vx = (e.touches[0].clientX - lastX) * 0.007; s.vy = (e.touches[0].clientY - lastY) * 0.005
        s.rotY += s.vx; s.rotX += s.vy; lastX = e.touches[0].clientX; lastY = e.touches[0].clientY
      }, { passive: true })

      const clock = new THREE.Clock()
      let t = 0

      function animate() {
        animRef.current = requestAnimationFrame(animate)
        const dt = clock.getDelta(); t += dt
        const target = targetRef.current

        if (s.dragging) {
          s.vx *= 0.9; s.vy *= 0.9
        } else if (target) {
          // Smooth ease-out to selected city; stops when close enough
          s.rotY += (target.y - s.rotY) * 0.045
          s.rotX += (target.x - s.rotX) * 0.045
        } else {
          // Free auto-rotate with momentum decay
          s.rotY += 0.008
          s.vx *= 0.92; s.vy *= 0.92
          s.rotY += s.vx; s.rotX += s.vy
        }
        s.rotX = Math.max(-1.2, Math.min(1.2, s.rotX))

        globe.rotation.y = s.rotY
        globe.rotation.x = s.rotX

        for (let i = 0; i < rings.length; i++) {
          const sc = 1 + Math.abs(Math.sin(t * 1.5 + i * 1.1)) * 0.7
          rings[i].scale.setScalar(sc)
          rings[i].material.opacity = 0.65 / sc
        }

        renderer.render(scene, camera)

        // Project labels to screen — hide back-facing ones
        globe.updateMatrixWorld()
        for (const { el, localPos } of labelItems) {
          const worldPos = localPos.clone().applyMatrix4(globe.matrixWorld)
          const toCamera = camera.position.clone().sub(worldPos).normalize()
          const dot      = worldPos.clone().normalize().dot(toCamera)
          if (dot < 0.08) { el.style.opacity = '0'; continue }
          const projected = worldPos.clone().project(camera)
          const px = (projected.x + 1) / 2 * canvasSize
          const py = -(projected.y - 1) / 2 * canvasSize
          el.style.opacity = Math.min(1, (dot - 0.08) / 0.14).toString()
          el.style.left    = px + 'px'
          el.style.top     = py + 'px'
        }
      }
      animate()

      const ro = new ResizeObserver(() => {
        const sz = container.offsetWidth
        if (sz > 0) { renderer.setSize(sz, sz); canvasSize = sz }
      })
      ro.observe(container)
      roRef.current = ro
    })

    return () => {
      if (animRef.current)     cancelAnimationFrame(animRef.current)
      if (roRef.current)       roRef.current.disconnect()
      if (rendererRef.current) rendererRef.current.dispose()
      listenersRef.current.forEach(([el, ev, fn]) => el.removeEventListener(ev, fn))
      listenersRef.current = []
    }
  }, [])

  return <div ref={containerRef} className="globe-wrap" />
}
