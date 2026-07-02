import { useEffect, useRef } from 'react'

export default function Globe() {
  const containerRef = useRef(null)
  const animRef      = useRef(null)
  const rendererRef  = useRef(null)
  const roRef        = useRef(null)
  const listenersRef = useRef([])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    import('three').then(THREE => {
      const size = container.offsetWidth || 420

      const canvas = document.createElement('canvas')
      canvas.style.cssText = 'display:block;width:100%;height:100%;cursor:grab;'
      container.innerHTML = ''
      container.appendChild(canvas)

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
      renderer.setSize(size, size)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.3
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
      const geo = new THREE.SphereGeometry(R, 64, 64)
      globe.add(new THREE.Mesh(geo, new THREE.MeshPhongMaterial({
        map: earthTex,
        shininess: 18,
        specular: new THREE.Color(0x1a3a6a),
      })))

      // Amber wireframe grid
      globe.add(new THREE.Mesh(
        new THREE.SphereGeometry(R + 0.012, 32, 32),
        new THREE.MeshBasicMaterial({ color: 0xD97706, wireframe: true, transparent: true, opacity: 0.09 })
      ))

      // Atmosphere glow — slightly thicker and more visible
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
        { lat: 51.51,  lon:  -0.13  }, // London
        { lat: 40.71,  lon: -74.01  }, // New York
        { lat:  1.35,  lon: 103.82  }, // Singapore
        { lat: 25.20,  lon:  55.27  }, // Dubai
        { lat: 35.68,  lon: 139.69  }, // Tokyo
        { lat:-23.55,  lon: -46.63  }, // São Paulo
        { lat:-33.87,  lon: 151.21  }, // Sydney
        { lat: 19.08,  lon:  72.88  }, // Mumbai
      ]

      const rings = []
      for (const o of offices) {
        const pos = latLon(o.lat, o.lon, R + 0.015)

        const dot = new THREE.Mesh(
          new THREE.SphereGeometry(0.03, 8, 8),
          new THREE.MeshBasicMaterial({ color: 0xF59E0B })
        )
        dot.position.copy(pos)
        globe.add(dot)

        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(0.06, 0.01, 8, 24),
          new THREE.MeshBasicMaterial({ color: 0xF59E0B, transparent: true, opacity: 0.65 })
        )
        ring.position.copy(pos)
        ring.lookAt(new THREE.Vector3(0, 0, 0))
        globe.add(ring)
        rings.push(ring)
      }

      // Lighting — sunlight from the front-left, soft fill to keep dark side visible
      scene.add(new THREE.AmbientLight(0x334455, 0.9))
      const sun = new THREE.DirectionalLight(0xfff5e0, 2.2)
      sun.position.set(-3, 2, 4)
      scene.add(sun)
      const fill = new THREE.DirectionalLight(0x2244aa, 0.5)
      fill.position.set(4, -1, -3)
      scene.add(fill)

      // Drag + touch
      let dragging = false, lastX = 0, lastY = 0, vx = 0, vy = 0
      let rotY = 0.5, rotX = -0.15

      const on = (el, ev, fn, opts) => { el.addEventListener(ev, fn, opts); listenersRef.current.push([el, ev, fn]) }

      on(canvas, 'mousedown', e => { dragging = true; lastX = e.clientX; lastY = e.clientY; canvas.style.cursor = 'grabbing' })
      on(window, 'mouseup',   ()  => { dragging = false; canvas.style.cursor = 'grab' })
      on(window, 'mousemove', e  => {
        if (!dragging) return
        vx = (e.clientX - lastX) * 0.007; vy = (e.clientY - lastY) * 0.005
        rotY += vx; rotX += vy; lastX = e.clientX; lastY = e.clientY
      })
      on(canvas, 'touchstart', e => { dragging = true; lastX = e.touches[0].clientX; lastY = e.touches[0].clientY }, { passive: true })
      on(window, 'touchend',   ()  => { dragging = false })
      on(window, 'touchmove',  e  => {
        if (!dragging) return
        vx = (e.touches[0].clientX - lastX) * 0.007; vy = (e.touches[0].clientY - lastY) * 0.005
        rotY += vx; rotX += vy; lastX = e.touches[0].clientX; lastY = e.touches[0].clientY
      }, { passive: true })

      const clock = new THREE.Clock()
      let t = 0

      function animate() {
        animRef.current = requestAnimationFrame(animate)
        const dt = clock.getDelta(); t += dt

        if (!dragging) { rotY += 0.008; vx *= 0.92; vy *= 0.92; rotY += vx; rotX += vy }
        else           { vx *= 0.9; vy *= 0.9 }
        rotX = Math.max(-1.2, Math.min(1.2, rotX))

        globe.rotation.y = rotY
        globe.rotation.x = rotX

        for (let i = 0; i < rings.length; i++) {
          const s = 1 + Math.abs(Math.sin(t * 1.5 + i * 1.1)) * 0.7
          rings[i].scale.setScalar(s)
          rings[i].material.opacity = 0.65 / s
        }

        renderer.render(scene, camera)
      }
      animate()

      const ro = new ResizeObserver(() => {
        const s = container.offsetWidth
        if (s > 0) renderer.setSize(s, s)
      })
      ro.observe(container)
      roRef.current = ro
    })

    return () => {
      if (animRef.current)    cancelAnimationFrame(animRef.current)
      if (roRef.current)      roRef.current.disconnect()
      if (rendererRef.current) rendererRef.current.dispose()
      listenersRef.current.forEach(([el, ev, fn]) => el.removeEventListener(ev, fn))
      listenersRef.current = []
    }
  }, [])

  return <div ref={containerRef} className="globe-wrap" />
}
