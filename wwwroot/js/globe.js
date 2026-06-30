/**
 * Meridian Group — Interactive Presence Globe
 * Standalone Three.js rotating globe with draggable interaction.
 * Rendered into the .presence-globe container.
 */

import * as THREE from 'three'

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
  renderer.toneMappingExposure = 1.3
  renderer.outputColorSpace = THREE.SRGBColorSpace

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 50)
  camera.position.set(0, 0, 3.8)

  const R = 1.3

  // All globe geometry rotates together in this group
  const globeGroup = new THREE.Group()
  scene.add(globeGroup)

  // Sphere with procedural land/ocean vertex colors
  const geo = new THREE.SphereGeometry(R, 64, 64)
  const posArr = geo.attributes.position.array
  const vColors = new Float32Array(posArr.length)
  for (let i = 0; i < posArr.length; i += 3) {
    const nx = posArr[i] / R, ny = posArr[i + 1] / R, nz = posArr[i + 2] / R
    const noise = Math.sin(nx * 9) * Math.cos(ny * 6) * Math.sin(nz * 8)
    if (noise > 0.1) {
      vColors[i] = 0.04; vColors[i + 1] = 0.14; vColors[i + 2] = 0.32
    } else {
      vColors[i] = 0.02; vColors[i + 1] = 0.05; vColors[i + 2] = 0.15
    }
  }
  geo.setAttribute('color', new THREE.BufferAttribute(vColors, 3))

  const earth = new THREE.Mesh(geo, new THREE.MeshPhongMaterial({
    vertexColors: true, shininess: 30,
  }))
  globeGroup.add(earth)

  // Gold wireframe grid overlay
  globeGroup.add(new THREE.Mesh(
    new THREE.SphereGeometry(R + 0.012, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0xD97706, wireframe: true, transparent: true, opacity: 0.09 })
  ))

  // Atmosphere glow
  globeGroup.add(new THREE.Mesh(
    new THREE.SphereGeometry(R + 0.12, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0x3B82F6, transparent: true, opacity: 0.07, side: THREE.BackSide })
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

  // Lights
  scene.add(new THREE.AmbientLight(0x304060, 1.0))
  const keyL = new THREE.PointLight(0x3B82F6, 3.5, 15)
  keyL.position.set(-4, 3, 4)
  scene.add(keyL)
  const rimL = new THREE.PointLight(0xD97706, 2.5, 12)
  rimL.position.set(4, -2, 3)
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
