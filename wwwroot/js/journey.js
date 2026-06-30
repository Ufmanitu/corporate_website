/**
 * Meridian Group v2 — Three.js Journey
 *
 * Single WebGL scene where the camera travels along a Z-axis path
 * driven by scroll position. Each "zone" along the path hosts a different
 * 3D environment: hero logo → data network → earth globe → tech cubes → contact.
 *
 * Post-processing: UnrealBloomPass for cinematic glow.
 */

import * as THREE from 'three'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass }     from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass }from 'three/addons/postprocessing/UnrealBloomPass.js'
import { OutputPass }     from 'three/addons/postprocessing/OutputPass.js'

// ── ZONE Z-POSITIONS ─────────────────────────────────────────────────────────
const Z = { hero: 0, network: -35, earth: -70, cubes: -105, contact: -145 }

// ── HELPERS ──────────────────────────────────────────────────────────────────
function rand(min, max) { return min + Math.random() * (max - min) }
function lerp(a, b, t)  { return a + (b - a) * t }

// ── SCENE BUILDERS ───────────────────────────────────────────────────────────

/** Zone 1 – Hero: rotating wireframe logo + particle cloud */
function buildHeroZone(scene) {
  const group = new THREE.Group()
  group.position.z = Z.hero

  // Core icosahedron (Meridian logo stand-in)
  const coreGeo = new THREE.IcosahedronGeometry(1.4, 1)
  const coreMat = new THREE.MeshBasicMaterial({
    color: 0x4F6EF7, wireframe: true, transparent: true, opacity: 0.9,
  })
  const core = new THREE.Mesh(coreGeo, coreMat)
  group.add(core)

  // Outer octahedron counter-rotating
  const outerGeo = new THREE.OctahedronGeometry(2.2, 0)
  const outerMat = new THREE.MeshBasicMaterial({
    color: 0x8B5CF6, wireframe: true, transparent: true, opacity: 0.35,
  })
  const outer = new THREE.Mesh(outerGeo, outerMat)
  group.add(outer)

  // Equatorial ring
  const ringGeo = new THREE.TorusGeometry(2.8, 0.012, 6, 120)
  const ringMat = new THREE.MeshBasicMaterial({ color: 0x06B6D4 })
  const ring1 = new THREE.Mesh(ringGeo, ringMat)
  ring1.rotation.x = Math.PI / 2
  group.add(ring1)

  // Tilted ring
  const ring2 = new THREE.Mesh(
    new THREE.TorusGeometry(3.4, 0.008, 6, 120),
    new THREE.MeshBasicMaterial({ color: 0x8B5CF6, transparent: true, opacity: 0.5 })
  )
  ring2.rotation.x = Math.PI / 3
  ring2.rotation.z = Math.PI / 6
  group.add(ring2)

  // Orbiting bright dot
  const dotGeo = new THREE.SphereGeometry(0.06, 8, 8)
  const dotMat = new THREE.MeshBasicMaterial({ color: 0xffffff })
  const dot = new THREE.Mesh(dotGeo, dotMat)
  group.add(dot)

  // Particle cloud — sphere distribution
  const COUNT = 3000
  const positions = new Float32Array(COUNT * 3)
  const colors    = new Float32Array(COUNT * 3)
  const palette   = [
    new THREE.Color(0x4F6EF7),
    new THREE.Color(0x8B5CF6),
    new THREE.Color(0x06B6D4),
    new THREE.Color(0xffffff),
  ]

  for (let i = 0; i < COUNT; i++) {
    const r     = rand(4, 9)
    const theta = Math.random() * Math.PI * 2
    const phi   = Math.acos(2 * Math.random() - 1)
    positions[i*3]   = r * Math.sin(phi) * Math.cos(theta)
    positions[i*3+1] = r * Math.sin(phi) * Math.sin(theta)
    positions[i*3+2] = r * Math.cos(phi)
    const c = palette[Math.floor(Math.random() * palette.length)]
    colors[i*3] = c.r; colors[i*3+1] = c.g; colors[i*3+2] = c.b
  }

  const pGeo = new THREE.BufferGeometry()
  pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  pGeo.setAttribute('color',    new THREE.BufferAttribute(colors,    3))
  const pMat = new THREE.PointsMaterial({
    size: 0.025, vertexColors: true,
    transparent: true, opacity: 0.75, sizeAttenuation: true,
  })
  const particles = new THREE.Points(pGeo, pMat)
  group.add(particles)

  scene.add(group)

  // Ambient glow lights
  const bl = new THREE.PointLight(0x4F6EF7, 4, 18); bl.position.set(4, 2, 2)
  const pl = new THREE.PointLight(0x8B5CF6, 3, 18); pl.position.set(-4, -2, -2)
  const cl = new THREE.PointLight(0x06B6D4, 2, 14); cl.position.set(0, 4, 0)
  scene.add(bl, pl, cl)

  // Update function called each frame
  let t = 0
  return {
    update(dt) {
      t += dt
      core.rotation.x  += 0.003; core.rotation.y  += 0.005
      outer.rotation.x -= 0.002; outer.rotation.z  += 0.004
      ring1.rotation.z += 0.002; ring2.rotation.y  += 0.003
      // Orbiting dot on ring1
      dot.position.x = Math.cos(t * 0.6) * 2.8
      dot.position.y = 0
      dot.position.z = Math.sin(t * 0.6) * 2.8 + Z.hero
      // Orbiting lights
      bl.position.x = Math.cos(t * 0.4) * 4
      bl.position.z = Math.sin(t * 0.4) * 4
      pl.position.x = Math.cos(t * 0.4 + Math.PI) * 4
      pl.position.z = Math.sin(t * 0.4 + Math.PI) * 4
    },
  }
}

/** Zone 2 – Network: animated node graph with data pulses */
function buildNetworkZone(scene) {
  const group = new THREE.Group()
  group.position.z = Z.network

  const NODE_COUNT = 80
  const nodePositions = []

  // Nodes
  const nodeMat = new THREE.MeshBasicMaterial({ color: 0x4F6EF7 })
  for (let i = 0; i < NODE_COUNT; i++) {
    const pos = new THREE.Vector3(rand(-14, 14), rand(-8, 8), rand(-6, 6))
    nodePositions.push(pos)
    const size = rand(0.04, 0.14)
    const geo  = new THREE.SphereGeometry(size, 6, 6)
    const node = new THREE.Mesh(geo, nodeMat.clone())
    node.position.copy(pos)
    group.add(node)
  }

  // Edges — connect nearby nodes
  const edgePositions = []
  for (let i = 0; i < NODE_COUNT; i++) {
    for (let j = i + 1; j < NODE_COUNT; j++) {
      if (nodePositions[i].distanceTo(nodePositions[j]) < 6) {
        edgePositions.push(nodePositions[i].x, nodePositions[i].y, nodePositions[i].z)
        edgePositions.push(nodePositions[j].x, nodePositions[j].y, nodePositions[j].z)
      }
    }
  }

  const edgeGeo = new THREE.BufferGeometry()
  edgeGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(edgePositions), 3))
  const edgeMat = new THREE.LineBasicMaterial({
    color: 0x4F6EF7, transparent: true, opacity: 0.2,
  })
  group.add(new THREE.LineSegments(edgeGeo, edgeMat))

  // Pulse spheres that travel along edges
  const pulses = []
  const pulseMat = new THREE.MeshBasicMaterial({ color: 0x06B6D4 })
  for (let k = 0; k < 12; k++) {
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.06, 6, 6), pulseMat.clone())
    const i = Math.floor(Math.random() * NODE_COUNT)
    let j = Math.floor(Math.random() * NODE_COUNT)
    while (j === i) j = Math.floor(Math.random() * NODE_COUNT)
    pulses.push({ mesh, from: nodePositions[i], to: nodePositions[j], t: Math.random() })
    group.add(mesh)
  }

  scene.add(group)

  // Glow light for this zone
  const netLight = new THREE.PointLight(0x4F6EF7, 3, 30)
  netLight.position.set(0, 0, Z.network)
  scene.add(netLight)

  return {
    update(dt) {
      pulses.forEach(p => {
        p.t += dt * 0.4
        if (p.t > 1) { p.t = 0 }
        p.mesh.position.lerpVectors(p.from, p.to, p.t)
        // adjust for group Z
        p.mesh.position.z += Z.network
      })
      group.rotation.y += 0.001
    },
  }
}

/** Zone 3 – Earth: glowing sphere with atmosphere + office markers */
function buildEarthZone(scene) {
  const group = new THREE.Group()
  group.position.z = Z.earth

  // Earth sphere — dark ocean base
  const earthGeo = new THREE.SphereGeometry(4, 64, 64)

  // Procedural vertex colors: lat/long based green/blue tones
  const count    = earthGeo.attributes.position.count
  const colorArr = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const x = earthGeo.attributes.position.getX(i)
    const y = earthGeo.attributes.position.getY(i)
    const z = earthGeo.attributes.position.getZ(i)
    const lat  = Math.asin(y / 4) // -PI/2 to PI/2
    const lon  = Math.atan2(z, x)
    const land = Math.sin(lat * 3) * Math.cos(lon * 5) > 0.2
    colorArr[i*3]   = land ? 0.05 : 0.02
    colorArr[i*3+1] = land ? 0.18 : 0.08
    colorArr[i*3+2] = land ? 0.08 : 0.22
  }
  earthGeo.setAttribute('color', new THREE.BufferAttribute(colorArr, 3))

  const earthMat = new THREE.MeshBasicMaterial({ vertexColors: true })
  const earth = new THREE.Mesh(earthGeo, earthMat)
  group.add(earth)

  // Wireframe overlay
  const wireMat = new THREE.MeshBasicMaterial({
    color: 0x1a3a6e, wireframe: true, transparent: true, opacity: 0.15,
  })
  group.add(new THREE.Mesh(new THREE.SphereGeometry(4.01, 32, 32), wireMat))

  // Atmosphere glow shell
  const atmGeo = new THREE.SphereGeometry(4.4, 32, 32)
  const atmMat = new THREE.MeshBasicMaterial({
    color: 0x1a4aff, transparent: true, opacity: 0.06, side: THREE.BackSide,
  })
  group.add(new THREE.Mesh(atmGeo, atmMat))

  // Office markers (lat, lon in degrees → sphere surface)
  const offices = [
    { name: 'New York',   lat:  40.7, lon: -74.0 },
    { name: 'London',     lat:  51.5, lon:  -0.1 },
    { name: 'Singapore',  lat:   1.3, lon: 103.8 },
    { name: 'Istanbul',   lat:  41.0, lon:  28.9 },
    { name: 'Budapest',   lat:  47.5, lon:  19.0 },
    { name: 'Dubai',      lat:  25.2, lon:  55.3 },
  ]

  const markerMat = new THREE.MeshBasicMaterial({ color: 0x06B6D4 })
  const glowMat   = new THREE.MeshBasicMaterial({ color: 0x06B6D4, transparent: true, opacity: 0.3 })

  function latLonToVec3(lat, lon, r) {
    const phi   = (90 - lat) * (Math.PI / 180)
    const theta = (lon + 180) * (Math.PI / 180)
    return new THREE.Vector3(
      -r * Math.sin(phi) * Math.cos(theta),
       r * Math.cos(phi),
       r * Math.sin(phi) * Math.sin(theta)
    )
  }

  const markerPositions = []
  offices.forEach(o => {
    const pos = latLonToVec3(o.lat, o.lon, 4.08)
    markerPositions.push(pos)
    // Marker dot
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 8), markerMat)
    m.position.copy(pos); group.add(m)
    // Pulse ring
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.012, 8, 24), glowMat.clone())
    ring.position.copy(pos)
    ring.lookAt(new THREE.Vector3(0, 0, 0))
    group.add(ring)
  })

  // Arc connections between offices
  const arcMat = new THREE.LineBasicMaterial({ color: 0x4F6EF7, transparent: true, opacity: 0.4 })
  const arcPairs = [[0,1],[1,2],[0,3],[3,4],[2,5],[4,5]]
  arcPairs.forEach(([a, b]) => {
    const pa = markerPositions[a], pb = markerPositions[b]
    const mid = pa.clone().add(pb).multiplyScalar(0.5).normalize().multiplyScalar(5.5)
    const curve = new THREE.QuadraticBezierCurve3(pa, mid, pb)
    const pts   = curve.getPoints(50)
    const geo   = new THREE.BufferGeometry().setFromPoints(pts)
    group.add(new THREE.Line(geo, arcMat))
  })

  scene.add(group)

  const earthLight = new THREE.PointLight(0x4F6EF7, 5, 40)
  earthLight.position.set(8, 4, Z.earth)
  scene.add(earthLight)

  return {
    update() {
      earth.rotation.y += 0.0008
      group.rotation.y  += 0.0005
    },
  }
}

/** Zone 4 – Tech cubes: floating glass-look boxes with technology names */
function buildCubesZone(scene) {
  const group = new THREE.Group()
  group.position.z = Z.cubes

  const techs = [
    { name: 'AI / ML',        color: 0x4F6EF7 },
    { name: 'Cloud',          color: 0x06B6D4 },
    { name: 'Blockchain',     color: 0x8B5CF6 },
    { name: 'Quantum',        color: 0xEC4899 },
    { name: 'IoT',            color: 0x06B6D4 },
    { name: 'Data Science',   color: 0x4F6EF7 },
    { name: 'Cybersecurity',  color: 0x8B5CF6 },
    { name: 'AR / XR',        color: 0xEC4899 },
  ]

  const cubes = []
  techs.forEach((tech, i) => {
    const angle = (i / techs.length) * Math.PI * 2
    const r     = 6
    const x     = Math.cos(angle) * r
    const y     = Math.sin(angle) * r * 0.5
    const z     = Math.sin(angle) * r * 0.3

    // Canvas texture label
    const canvas2d = document.createElement('canvas')
    canvas2d.width = 256; canvas2d.height = 256
    const ctx = canvas2d.getContext('2d')
    ctx.clearRect(0, 0, 256, 256)
    ctx.fillStyle = `rgba(255,255,255,0.06)`
    ctx.roundRect(8, 8, 240, 240, 20)
    ctx.fill()
    ctx.strokeStyle = 'rgba(255,255,255,0.15)'
    ctx.lineWidth = 1
    ctx.stroke()
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 28px "Space Grotesk", sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(tech.name, 128, 128)

    const tex    = new THREE.CanvasTexture(canvas2d)
    const geo    = new THREE.BoxGeometry(2, 2, 2)
    const mat    = new THREE.MeshBasicMaterial({
      color: tech.color, transparent: true, opacity: 0.15, wireframe: false,
    })
    const cube   = new THREE.Mesh(geo, mat)

    // Wireframe overlay
    const wire = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({
      color: tech.color, wireframe: true, transparent: true, opacity: 0.4,
    }))

    // Face with texture
    const face = new THREE.Mesh(
      new THREE.PlaneGeometry(1.8, 1.8),
      new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0.85 })
    )
    face.position.z = 1.01

    cube.add(wire, face)
    cube.position.set(x, y, z)
    cube.userData = { baseY: y, phase: Math.random() * Math.PI * 2, speed: rand(0.3, 0.8) }
    group.add(cube)
    cubes.push(cube)
  })

  scene.add(group)

  const cubeLight = new THREE.PointLight(0x8B5CF6, 4, 35)
  cubeLight.position.set(0, 0, Z.cubes)
  scene.add(cubeLight)

  let t = 0
  return {
    update(dt) {
      t += dt
      group.rotation.y += 0.003
      cubes.forEach(c => {
        const { baseY, phase, speed } = c.userData
        c.position.y = baseY + Math.sin(t * speed + phase) * 0.4
        c.rotation.x += 0.005
        c.rotation.y += 0.008
      })
    },
  }
}

/** Zone 5 – Contact: particle system that slowly contracts */
function buildContactZone(scene) {
  const group = new THREE.Group()
  group.position.z = Z.contact

  const COUNT = 5000
  const positions  = new Float32Array(COUNT * 3)
  const basePos    = new Float32Array(COUNT * 3)
  const colors     = new Float32Array(COUNT * 3)
  const palette    = [new THREE.Color(0x4F6EF7), new THREE.Color(0x8B5CF6), new THREE.Color(0x06B6D4)]

  // Particles arranged in loose cloud
  for (let i = 0; i < COUNT; i++) {
    const r = rand(2, 12)
    const theta = Math.random() * Math.PI * 2
    const phi   = Math.acos(2 * Math.random() - 1)
    const x = r * Math.sin(phi) * Math.cos(theta)
    const y = r * Math.sin(phi) * Math.sin(theta)
    const z = r * Math.cos(phi)
    positions[i*3] = basePos[i*3] = x
    positions[i*3+1] = basePos[i*3+1] = y
    positions[i*3+2] = basePos[i*3+2] = z
    const c = palette[Math.floor(Math.random() * 3)]
    colors[i*3] = c.r; colors[i*3+1] = c.g; colors[i*3+2] = c.b
  }

  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geo.setAttribute('color',    new THREE.BufferAttribute(colors,    3))
  const mat = new THREE.PointsMaterial({
    size: 0.035, vertexColors: true, transparent: true, opacity: 0.9, sizeAttenuation: true,
  })
  const pts = new THREE.Points(geo, mat)
  group.add(pts)

  scene.add(group)

  const contactLight = new THREE.PointLight(0x4F6EF7, 5, 35)
  contactLight.position.set(0, 0, Z.contact)
  scene.add(contactLight)

  let t = 0, contracted = 0

  // Public API to trigger dispersion when form is active
  let disperse = false
  window._contactDisperse = (val) => { disperse = val }

  return {
    update(dt) {
      t += dt
      contracted = THREE.MathUtils.lerp(contracted, disperse ? 0.2 : 0.8, 0.03)
      const pos = geo.attributes.position.array

      for (let i = 0; i < COUNT; i++) {
        const bx = basePos[i*3], by = basePos[i*3+1], bz = basePos[i*3+2]
        // Slowly contract toward center, drift a bit
        pos[i*3]   = bx * (1 - contracted) + Math.sin(t * 0.3 + i) * 0.05
        pos[i*3+1] = by * (1 - contracted) + Math.cos(t * 0.3 + i) * 0.05
        pos[i*3+2] = bz * (1 - contracted) + Math.sin(t * 0.3 + i * 0.7) * 0.05
      }
      geo.attributes.position.needsUpdate = true
      group.rotation.y += 0.001
    },
  }
}

// ── MAIN EXPORT ──────────────────────────────────────────────────────────────
export function initJourney(canvas) {
  // ── RENDERER ──────────────────────────────────────────────────────────────
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.toneMapping       = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.1
  renderer.outputColorSpace  = THREE.SRGBColorSpace

  // ── SCENE + CAMERA ────────────────────────────────────────────────────────
  const scene  = new THREE.Scene()
  scene.fog    = new THREE.FogExp2(0x050505, 0.012)

  const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 300)
  camera.position.set(0, 0, 6)

  // Ambient light — very dim, let point lights carry the scene
  scene.add(new THREE.AmbientLight(0x111122, 0.4))

  // ── POST-PROCESSING ───────────────────────────────────────────────────────
  const composer = new EffectComposer(renderer)
  composer.addPass(new RenderPass(scene, camera))

  const bloom = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    0.9,   // strength
    0.5,   // radius
    0.15   // threshold
  )
  composer.addPass(bloom)
  composer.addPass(new OutputPass())

  // ── BUILD ALL ZONES ───────────────────────────────────────────────────────
  const zones = [
    buildHeroZone(scene),
    buildNetworkZone(scene),
    buildEarthZone(scene),
    buildCubesZone(scene),
    buildContactZone(scene),
  ]

  // ── SCROLL-DRIVEN CAMERA ──────────────────────────────────────────────────
  const zPositions = [Z.hero + 6, Z.network + 8, Z.earth + 10, Z.cubes + 10, Z.contact + 10]
  let scrollProgress = 0

  ScrollTrigger.create({
    trigger: 'body',
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: self => { scrollProgress = self.progress },
  })

  let camTargetZ = zPositions[0]
  let camTargetX = 0
  let camTargetY = 0
  let mouseX = 0, mouseY = 0

  document.addEventListener('mousemove', e => {
    mouseX = (e.clientX / window.innerWidth  - 0.5) * 2
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2
  })

  // ── RENDER LOOP ───────────────────────────────────────────────────────────
  const clock   = new THREE.Clock()
  let prevTime  = 0

  function animate() {
    requestAnimationFrame(animate)

    const elapsed = clock.getElapsedTime()
    const dt      = elapsed - prevTime
    prevTime      = elapsed

    // Map scroll progress → camera target Z
    const t    = scrollProgress
    const segCount = zPositions.length - 1
    const seg  = Math.min(Math.floor(t * segCount), segCount - 1)
    const frac = (t * segCount) - seg
    camTargetZ = lerp(zPositions[seg], zPositions[seg + 1] ?? zPositions[seg], frac)

    // Mouse parallax offset
    camTargetX = mouseX * 1.2
    camTargetY = -mouseY * 0.8

    camera.position.x = lerp(camera.position.x, camTargetX, 0.04)
    camera.position.y = lerp(camera.position.y, camTargetY, 0.04)
    camera.position.z = lerp(camera.position.z, camTargetZ,   0.055)
    camera.lookAt(camera.position.x * 0.2, camera.position.y * 0.2, camera.position.z - 5)

    // Update all zones
    zones.forEach(z => z.update(dt))

    composer.render()
  }

  animate()

  // ── RESIZE ────────────────────────────────────────────────────────────────
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    composer.setSize(window.innerWidth, window.innerHeight)
  })
}
