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

      // Procedural Earth-like sphere — ocean, land, desert, polar ice
      const geo     = new THREE.SphereGeometry(R, 64, 64)
      const posArr  = geo.attributes.position.array
      const vColors = new Float32Array(posArr.length)
      for (let i = 0; i < posArr.length; i += 3) {
        const nx = posArr[i] / R, ny = posArr[i + 1] / R, nz = posArr[i + 2] / R
        const lat  = ny  // −1 south pole … +1 north pole
        const n    = Math.sin(nx * 9) * Math.cos(ny * 6) * Math.sin(nz * 8)
        const n2   = Math.sin(nx * 5) * Math.cos(nz * 7)
        const polar = Math.abs(lat) > 0.72

        if (polar) {
          // Ice caps — bright blue-white
          const blend = (Math.abs(lat) - 0.72) / 0.28
          vColors[i] = 0.72 + blend * 0.25; vColors[i+1] = 0.82 + blend * 0.15; vColors[i+2] = 0.92 + blend * 0.07
        } else if (n > 0.08) {
          // Land — green in temperate, sandy-brown near equator
          const tropical = Math.abs(lat) < 0.25
          if (tropical && n2 > 0.1) {
            // Desert / arid band
            vColors[i] = 0.62; vColors[i+1] = 0.44; vColors[i+2] = 0.14
          } else if (tropical) {
            // Tropical forest — deep green
            vColors[i] = 0.07; vColors[i+1] = 0.38; vColors[i+2] = 0.10
          } else {
            // Temperate — mid green
            vColors[i] = 0.13; vColors[i+1] = 0.48; vColors[i+2] = 0.16
          }
        } else {
          // Ocean — brighter blue, slightly lighter near equator
          const depth = 0.5 + Math.abs(lat) * 0.3
          vColors[i] = 0.04; vColors[i+1] = 0.18 + depth * 0.08; vColors[i+2] = 0.52 + depth * 0.15
        }
      }
      geo.setAttribute('color', new THREE.BufferAttribute(vColors, 3))
      globe.add(new THREE.Mesh(geo, new THREE.MeshPhongMaterial({ vertexColors: true, shininess: 55, specular: 0x224488 })))

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

      // Lighting — brighter ambient so colours read clearly
      scene.add(new THREE.AmbientLight(0x607890, 1.4))
      const keyL = new THREE.PointLight(0xC8E0FF, 4.5, 20)
      keyL.position.set(-4, 3, 5)
      scene.add(keyL)
      const rimL = new THREE.PointLight(0xFFD070, 2.8, 14)
      rimL.position.set(4, -2, 3)
      scene.add(rimL)
      const fillL = new THREE.PointLight(0x80B0FF, 1.8, 18)
      fillL.position.set(2, 4, -4)
      scene.add(fillL)

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
