/**
 * Meridian Group — Interactive Presence Globe
 * Standalone Three.js rotating globe with draggable interaction.
 * Rendered into the .presence-globe container.
 */

import * as THREE from 'three'

function lp(a, b, t) { return a + (b - a) * t }

// Procedural realistic Earth color per vertex (normalized nx,ny,nz on unit sphere)
function earthCol(nx, ny, nz) {
  const latDeg = Math.asin(Math.max(-1, Math.min(1, ny))) * (180 / Math.PI)
  const lat = Math.abs(latDeg)

  // Multi-octave terrain noise
  const n1 = Math.sin(nx * 8 + nz * 5.5) * Math.cos(ny * 7 - nz * 3.2)
  const n2 = Math.sin(nx * 15 + 1.1 + nz * 9) * Math.cos(ny * 12 - nx * 4) * 0.4
  const noise = n1 + n2

  // Polar ice caps
  if (lat > 68) {
    const t = Math.min(1, (lat - 68) / 16)
    return [lp(0.12, 0.88, t), lp(0.35, 0.91, t), lp(0.65, 0.95, t)]
  }

  if (noise > 0.18) {
    // Land
    if (noise > 1.05) return [0.60, 0.55, 0.48]        // mountain grey
    if (lat > 56)    return [0.32, 0.40, 0.25]          // tundra
    if (lat < 22) {
      return Math.sin(nx * 23 + nz * 17) > 0.28
        ? [0.72, 0.56, 0.24]                             // tropical desert
        : [0.13, 0.50, 0.20]                             // tropical forest
    }
    if (lat < 48) {
      return Math.sin(nx * 11 + ny * 8 - nz * 7) > 0.22
        ? [0.64, 0.51, 0.27]                             // steppe/savanna
        : [0.22, 0.43, 0.22]                             // temperate forest
    }
    return [0.28, 0.38, 0.24]                            // boreal/taiga
  }

  // Ocean — shallow to deep
  const depth = Math.max(0, Math.min(1, (0.18 - noise) / 1.58))
  return [lp(0.07, 0.02, depth), lp(0.35, 0.13, depth), lp(0.72, 0.46, depth)]
}

export function initGlobe(container) {
  const size = container.offsetWidth || 420

  const canvas = document.createElement('canvas')
  canvas.style.cssText = 'display:block;width:100%;height:100%;cursor:grab;'
  container.innerHTML = ''
  container.appendChild(canvas)
  container.style.overflow = 'hidden'

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
  renderer.setSize(size, size)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.2
  renderer.outputColorSpace = THREE.SRGBColorSpace

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 50)
  camera.position.set(0, 0, 3.8)

  const R = 1.3

  // All globe geometry rotates together in this group
  const globeGroup = new THREE.Group()
  scene.add(globeGroup)

  // Earth sphere with realistic procedural vertex colors
  const geo = new THREE.SphereGeometry(R, 80, 80)
  const posArr = geo.attributes.position.array
  const vColors = new Float32Array(posArr.length)
  for (let i = 0; i < posArr.length; i += 3) {
    const nx = posArr[i] / R, ny = posArr[i + 1] / R, nz = posArr[i + 2] / R
    const [r, g, b] = earthCol(nx, ny, nz)
    vColors[i] = r; vColors[i + 1] = g; vColors[i + 2] = b
  }
  geo.setAttribute('color', new THREE.BufferAttribute(vColors, 3))

  const earth = new THREE.Mesh(geo, new THREE.MeshPhongMaterial({
    vertexColors: true, shininess: 45,
  }))
  globeGroup.add(earth)

  // Thin cloud layer — semi-transparent white sphere
  globeGroup.add(new THREE.Mesh(
    new THREE.SphereGeometry(R + 0.025, 32, 32),
    new THREE.MeshPhongMaterial({ color: 0xffffff, transparent: true, opacity: 0.10, depthWrite: false })
  ))

  // Subtle lat/lon grid overlay (gold, very faint)
  globeGroup.add(new THREE.Mesh(
    new THREE.SphereGeometry(R + 0.013, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0xD97706, wireframe: true, transparent: true, opacity: 0.06 })
  ))

  // Atmosphere glow
  globeGroup.add(new THREE.Mesh(
    new THREE.SphereGeometry(R + 0.14, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0x4a90d9, transparent: true, opacity: 0.15, side: THREE.BackSide })
  ))

  // Lat/lon → 3D position helper
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
    { lat: 40.71, lon: -74.01 },
    { lat: 51.51, lon:  -0.13 },
    { lat:  1.35, lon: 103.82 },
    { lat: 41.01, lon:  28.98 },
    { lat: 47.50, lon:  19.04 },
    { lat: 25.20, lon:  55.27 },
  ]

  const rings = []
  for (const o of offices) {
    const pos = latLon(o.lat, o.lon, R + 0.015)

    const dot = new THREE.Mesh(
      new THREE.SphereGeometry(0.03, 8, 8),
      new THREE.MeshBasicMaterial({ color: 0xF59E0B })
    )
    dot.position.copy(pos)
    globeGroup.add(dot)

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.06, 0.01, 8, 24),
      new THREE.MeshBasicMaterial({ color: 0xF59E0B, transparent: true, opacity: 0.65 })
    )
    ring.position.copy(pos)
    ring.lookAt(new THREE.Vector3(0, 0, 0))
    globeGroup.add(ring)
    rings.push(ring)
  }

  // Lights — neutral ambient + warm-white sun + blue-space rim
  scene.add(new THREE.AmbientLight(0x5a6070, 1.0))
  const keyL = new THREE.PointLight(0xfff5e0, 6.5, 20)  // warm white sun
  keyL.position.set(-3, 2, 5)
  scene.add(keyL)
  const rimL = new THREE.PointLight(0x2060b0, 1.2, 12)  // cold blue space rim
  rimL.position.set(4, -1, -4)
  scene.add(rimL)

  // Drag interaction
  let dragging = false, lastX = 0, lastY = 0, vx = 0, vy = 0
  let rotY = 0.5, rotX = -0.15

  canvas.addEventListener('mousedown', e => {
    dragging = true; lastX = e.clientX; lastY = e.clientY
    canvas.style.cursor = 'grabbing'
  })
  window.addEventListener('mouseup', () => { dragging = false; canvas.style.cursor = 'grab' })
  window.addEventListener('mousemove', e => {
    if (!dragging) return
    vx = (e.clientX - lastX) * 0.007
    vy = (e.clientY - lastY) * 0.005
    rotY += vx; rotX += vy
    lastX = e.clientX; lastY = e.clientY
  })
  canvas.addEventListener('touchstart', e => {
    dragging = true; lastX = e.touches[0].clientX; lastY = e.touches[0].clientY
  }, { passive: true })
  window.addEventListener('touchend', () => { dragging = false })
  window.addEventListener('touchmove', e => {
    if (!dragging) return
    vx = (e.touches[0].clientX - lastX) * 0.007
    vy = (e.touches[0].clientY - lastY) * 0.005
    rotY += vx; rotX += vy
    lastX = e.touches[0].clientX; lastY = e.touches[0].clientY
  }, { passive: true })

  const clock = new THREE.Clock()
  let t = 0

  function animate() {
    requestAnimationFrame(animate)
    const dt = clock.getDelta()
    t += dt

    if (!dragging) {
      rotY += 0.003
      vx *= 0.92; vy *= 0.92
      rotY += vx; rotX += vy
    } else {
      vx *= 0.9; vy *= 0.9
    }
    rotX = Math.max(-1.2, Math.min(1.2, rotX))

    globeGroup.rotation.y = rotY
    globeGroup.rotation.x = rotX

    for (let i = 0; i < rings.length; i++) {
      const s = 1 + Math.abs(Math.sin(t * 1.5 + i * 1.1)) * 0.7
      rings[i].scale.setScalar(s)
      rings[i].material.opacity = 0.65 / s
    }

    renderer.render(scene, camera)
  }
  animate()

  // Responsive resize
  const ro = new ResizeObserver(() => {
    const s = container.offsetWidth
    if (s > 0) renderer.setSize(s, s)
  })
  ro.observe(container)
}
