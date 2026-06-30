/**
 * Meridian Group v3 — Corporate Journey
 * Theme: The Architecture of Business
 * Zones: Skyline · Data Columns · Earth · Monoliths · Boardroom
 */

import * as THREE from 'three'
import { EffectComposer }   from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass }       from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass }  from 'three/addons/postprocessing/UnrealBloomPass.js'
import { OutputPass }       from 'three/addons/postprocessing/OutputPass.js'

// ── Zone Z-positions (camera travels along -Z)
const Z = [0, -55, -110, -165, -220]

const GOLD   = 0xD97706
const GOLD2  = 0xF59E0B
const BLUE   = 0x2563EB
const BLUE2  = 0x3B82F6
const GREEN  = 0x059669
const PURPLE = 0x9333EA

let scrollProgress = 0
const tickers = []
const clock = new THREE.Clock()
let renderer, composer, camera, scene

function lerp(a, b, t) { return a + (b - a) * t }

// ── PUBLIC INIT ──────────────────────────────────────────────────────────────
export function initJourney(canvas) {
  const W = window.innerWidth, H = window.innerHeight

  renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
  renderer.setSize(W, H)
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.1

  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x04060f)
  scene.fog = new THREE.FogExp2(0x04060f, 0.009)

  camera = new THREE.PerspectiveCamera(68, W / H, 0.1, 800)
  camera.position.set(0, 1, Z[0] + 10)

  scene.add(new THREE.AmbientLight(0xffffff, 0.2))

  composer = new EffectComposer(renderer)
  composer.addPass(new RenderPass(scene, camera))
  composer.addPass(new UnrealBloomPass(new THREE.Vector2(W, H), 0.65, 0.4, 0.18))
  composer.addPass(new OutputPass())

  buildSkylineZone()
  buildDataZone()
  buildEarthZone()
  buildMonolithZone()
  buildBoardroomZone()

  ScrollTrigger.create({
    trigger: 'body', start: 'top top', end: 'bottom bottom',
    onUpdate: self => { scrollProgress = self.progress }
  })

  window.addEventListener('resize', () => {
    const W = window.innerWidth, H = window.innerHeight
    camera.aspect = W / H
    camera.updateProjectionMatrix()
    renderer.setSize(W, H)
    composer.setSize(W, H)
  })

  tick()
}

function tick() {
  requestAnimationFrame(tick)
  const t = clock.getElapsedTime()

  const total = Z.length - 1
  const sp  = scrollProgress * total
  const seg = Math.min(Math.floor(sp), total - 1)
  const frac = sp - seg
  const targetZ = lerp(Z[seg], Z[seg + 1], frac)
  camera.position.z = lerp(camera.position.z, targetZ + 10, 0.05)
  camera.position.y = lerp(camera.position.y, Math.sin(scrollProgress * Math.PI * 1.5) * 0.6, 0.04)
  camera.lookAt(0, camera.position.y * 0.2, camera.position.z - 10)

  tickers.forEach(fn => fn(t))
  composer.render()
}

// ─────────────────────────────────────────────────────────────────────────────
// ZONE 1 — SKYLINE (Hero)
// Corporate city rising from darkness with a gold central spire
// ─────────────────────────────────────────────────────────────────────────────
function buildSkylineZone() {
  const z0 = Z[0]

  const layout = [
    { x: -11, z: -1, h: 5,  w: 0.8, d: 0.8 },
    { x:  -9, z:  2, h: 8,  w: 0.7, d: 0.7 },
    { x:  -7, z: -3, h: 6,  w: 1.0, d: 0.8 },
    { x:  -5, z:  1, h: 11, w: 0.9, d: 0.9 },
    { x:  -3, z: -2, h: 14, w: 1.0, d: 1.0 },
    { x:  -1, z:  0, h: 16, w: 1.1, d: 1.1 },
    { x:   0, z:  0, h: 22, w: 1.5, d: 1.5 }, // central spire
    { x:   1, z:  0, h: 16, w: 1.1, d: 1.1 },
    { x:   3, z: -2, h: 14, w: 1.0, d: 1.0 },
    { x:   5, z:  1, h: 11, w: 0.9, d: 0.9 },
    { x:   7, z: -3, h: 6,  w: 1.0, d: 0.8 },
    { x:   9, z:  2, h: 8,  w: 0.7, d: 0.7 },
    { x:  11, z: -1, h: 5,  w: 0.8, d: 0.8 },
    { x:  -8, z: -6, h: 4,  w: 1.2, d: 1.2 },
    { x:  -4, z: -6, h: 5,  w: 1.0, d: 1.0 },
    { x:   0, z: -6, h: 6,  w: 1.1, d: 1.1 },
    { x:   4, z: -6, h: 5,  w: 1.0, d: 1.0 },
    { x:   8, z: -6, h: 4,  w: 1.2, d: 1.2 },
  ]

  layout.forEach((b, i) => {
    const isSpire = i === 6
    const geo = new THREE.BoxGeometry(b.w, b.h, b.d)

    const solid = new THREE.Mesh(geo, new THREE.MeshPhongMaterial({
      color: isSpire ? 0x0a1628 : 0x060d1e,
      emissive: isSpire ? 0x1a3a6e : 0x040810,
      emissiveIntensity: isSpire ? 0.2 : 0.04,
      shininess: isSpire ? 80 : 30,
    }))
    solid.position.set(b.x, b.h / 2 - 11, z0 + b.z)
    scene.add(solid)

    const edgeColor = isSpire ? GOLD2 : (i % 3 === 0 ? GOLD : BLUE)
    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(geo),
      new THREE.LineBasicMaterial({ color: edgeColor, transparent: true, opacity: isSpire ? 0.95 : 0.4 })
    )
    edges.position.copy(solid.position)
    scene.add(edges)

    // Window lights on tall buildings
    if (b.h > 8 && !isSpire) {
      for (let w = 0; w < Math.floor(b.h / 2); w++) {
        if (Math.random() < 0.55) {
          const win = new THREE.Mesh(
            new THREE.PlaneGeometry(0.12, 0.12),
            new THREE.MeshBasicMaterial({
              color: Math.random() > 0.5 ? GOLD : BLUE2,
              transparent: true, opacity: 0.35 + Math.random() * 0.3,
            })
          )
          win.position.set(
            solid.position.x + (Math.random() - 0.5) * b.w * 0.6,
            solid.position.y - b.h / 2 + w * 2.2 + 1,
            z0 + b.z + b.d / 2 + 0.01
          )
          scene.add(win)
        }
      }
    }
  })

  // Ground grid
  scene.add(Object.assign(new THREE.GridHelper(60, 30, 0x1a2f55, 0x0d1a33), {
    position: new THREE.Vector3(0, -11, z0)
  }))

  // Rising particles (gold → blue, ascending continuously)
  const N = 4000
  const pos = new Float32Array(N * 3)
  const col = new Float32Array(N * 3)
  const vel = new Float32Array(N)

  for (let i = 0; i < N; i++) {
    const spread = Math.random() < 0.5 ? 8 : 22
    pos[i*3]   = (Math.random() - 0.5) * spread
    pos[i*3+1] = (Math.random() - 0.5) * 40
    pos[i*3+2] = z0 + (Math.random() - 0.5) * 10
    vel[i] = 0.008 + Math.random() * 0.018

    const t = Math.random()
    const c = new THREE.Color(GOLD2).lerp(new THREE.Color(BLUE2), t)
    col[i*3] = c.r; col[i*3+1] = c.g; col[i*3+2] = c.b
  }

  const pGeo = new THREE.BufferGeometry()
  pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  pGeo.setAttribute('color',    new THREE.BufferAttribute(col, 3))
  scene.add(new THREE.Points(pGeo, new THREE.PointsMaterial({
    size: 0.07, vertexColors: true, transparent: true, opacity: 0.75
  })))

  tickers.push(() => {
    const a = pGeo.attributes.position.array
    for (let i = 0; i < N; i++) {
      a[i*3+1] += vel[i]
      if (a[i*3+1] > 22) a[i*3+1] = -18
    }
    pGeo.attributes.position.needsUpdate = true
  })

  const goldLight = new THREE.PointLight(GOLD2, 3, 40)
  goldLight.position.set(2, 12, z0)
  scene.add(goldLight)

  const blueLight = new THREE.PointLight(BLUE, 2, 30)
  blueLight.position.set(-6, 6, z0)
  scene.add(blueLight)

  tickers.push(t => {
    goldLight.intensity = 2.8 + Math.sin(t * 0.7) * 0.6
    blueLight.intensity = 1.6 + Math.cos(t * 0.5) * 0.5
    goldLight.position.x = Math.sin(t * 0.2) * 4
  })
}

// ─────────────────────────────────────────────────────────────────────────────
// ZONE 2 — DATA COLUMNS (Stats / Network)
// 3D bar chart with pulsing light columns and floating nodes
// ─────────────────────────────────────────────────────────────────────────────
function buildDataZone() {
  const z1 = Z[1]

  const bars = [
    { color: GOLD2,  h: 7.5 },
    { color: BLUE2,  h: 4.5 },
    { color: GREEN,  h: 9.5 },
    { color: PURPLE, h: 8.5 },
  ]

  const spacing = 5.5
  const startX = -(bars.length - 1) * spacing / 2

  bars.forEach((bar, i) => {
    const x = startX + i * spacing
    const geo = new THREE.BoxGeometry(1.5, bar.h, 1.5)

    const mesh = new THREE.Mesh(geo, new THREE.MeshPhongMaterial({
      color: bar.color, transparent: true, opacity: 0.12,
      emissive: bar.color, emissiveIntensity: 0.3,
    }))
    mesh.position.set(x, bar.h / 2 - 10, z1)
    scene.add(mesh)

    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(geo),
      new THREE.LineBasicMaterial({ color: bar.color, transparent: true, opacity: 0.9 })
    )
    edges.position.copy(mesh.position)
    scene.add(edges)

    // Glowing top cap
    const cap = new THREE.Mesh(
      new THREE.PlaneGeometry(1.7, 1.7),
      new THREE.MeshBasicMaterial({ color: bar.color, transparent: true, opacity: 0.6, side: THREE.DoubleSide })
    )
    cap.rotation.x = -Math.PI / 2
    cap.position.set(x, bar.h - 10.02, z1)
    scene.add(cap)

    const pl = new THREE.PointLight(bar.color, 2.5, 14)
    pl.position.copy(cap.position)
    scene.add(pl)

    // Vertical beam
    const beam = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, bar.h, 0.08),
      new THREE.MeshBasicMaterial({ color: bar.color, transparent: true, opacity: 0.15 })
    )
    beam.position.copy(mesh.position)
    scene.add(beam)

    tickers.push(t => {
      const pulse = 0.1 + Math.abs(Math.sin(t * 1.8 + i * 0.9)) * 0.14
      mesh.material.opacity = pulse
      beam.material.opacity = pulse * 1.5
      pl.intensity = 2 + Math.sin(t * 2.5 + i * 1.3) * 1
    })
  })

  // Trend line across tops
  const pts = bars.map((b, i) => new THREE.Vector3(startX + i * spacing, b.h - 10, z1))
  scene.add(new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(pts),
    new THREE.LineBasicMaterial({ color: GOLD2, transparent: true, opacity: 0.55 })
  ))

  // Floor grid
  scene.add(Object.assign(new THREE.GridHelper(50, 25, 0x1a2f55, 0x0d1a33), {
    position: new THREE.Vector3(0, -10, z1)
  }))

  // Floating nodes
  const nodeColors = [GOLD2, BLUE2, GREEN, PURPLE]
  for (let i = 0; i < 50; i++) {
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.05 + Math.random() * 0.07, 8, 8),
      new THREE.MeshBasicMaterial({ color: nodeColors[i % 4], transparent: true, opacity: 0.8 })
    )
    const ox = (Math.random() - 0.5) * 28
    const oy = (Math.random() - 0.5) * 16
    sphere.position.set(ox, oy, z1 + (Math.random() - 0.5) * 6)
    scene.add(sphere)

    const speed  = 0.15 + Math.random() * 0.35
    const radius = 0.8 + Math.random() * 2.5
    const phase  = Math.random() * Math.PI * 2
    tickers.push(t => {
      sphere.position.x = ox + Math.sin(t * speed + phase) * radius
      sphere.position.y = oy + Math.cos(t * speed * 0.7 + phase) * radius * 0.5
    })
  }

  // Sparse connection lines
  for (let i = 0; i < 15; i++) {
    const a = new THREE.Vector3((Math.random() - 0.5) * 24, (Math.random() - 0.5) * 12, z1)
    const b = a.clone().add(new THREE.Vector3((Math.random() - 0.5) * 8, (Math.random() - 0.5) * 6, 0))
    scene.add(new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([a, b]),
      new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: 0.2 })
    ))
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// ZONE 3 — EARTH (Global Presence)
// Corporate globe with gold arcs and pulsing office markers
// ─────────────────────────────────────────────────────────────────────────────
function buildEarthZone() {
  const z2 = Z[2]
  const R = 4.5

  const earthGeo = new THREE.SphereGeometry(R, 64, 64)
  const earthColors = []
  const posArr = earthGeo.attributes.position.array
  for (let i = 0; i < posArr.length; i += 3) {
    const v = new THREE.Vector3(posArr[i], posArr[i+1], posArr[i+2]).normalize()
    const n = Math.sin(v.x * 9) * Math.cos(v.y * 6) * Math.sin(v.z * 8)
    earthColors.push(...(n > 0.08 ? [0.04, 0.12, 0.28] : [0.02, 0.05, 0.14]))
  }
  earthGeo.setAttribute('color', new THREE.Float32BufferAttribute(earthColors, 3))

  const earth = new THREE.Mesh(earthGeo, new THREE.MeshPhongMaterial({
    vertexColors: true, shininess: 25
  }))
  earth.position.set(3.5, 0, z2)
  scene.add(earth)

  // Gold wireframe overlay
  const wire = new THREE.Mesh(earthGeo, new THREE.MeshBasicMaterial({
    color: GOLD, wireframe: true, transparent: true, opacity: 0.07
  }))
  wire.position.copy(earth.position)
  scene.add(wire)

  // Atmosphere
  scene.add(Object.assign(
    new THREE.Mesh(
      new THREE.SphereGeometry(R + 0.28, 64, 64),
      new THREE.MeshBasicMaterial({ color: BLUE, transparent: true, opacity: 0.1, side: THREE.BackSide })
    ),
    { position: earth.position.clone() }
  ))

  function latLonTo3D(lat, lon, r) {
    const phi   = (90 - lat) * (Math.PI / 180)
    const theta = (lon + 180) * (Math.PI / 180)
    return new THREE.Vector3(
      -r * Math.sin(phi) * Math.cos(theta),
       r * Math.cos(phi),
       r * Math.sin(phi) * Math.sin(theta)
    ).add(earth.position)
  }

  const offices = [
    { lat: 40.71, lon: -74.01 },
    { lat: 51.51, lon: -0.13  },
    { lat: 1.35,  lon: 103.82 },
    { lat: 41.01, lon: 28.98  },
    { lat: 47.50, lon: 19.04  },
    { lat: 25.20, lon: 55.27  },
  ]

  offices.forEach((o, idx) => {
    const pos = latLonTo3D(o.lat, o.lon, R + 0.08)
    const dot = new THREE.Mesh(
      new THREE.SphereGeometry(0.08, 8, 8),
      new THREE.MeshBasicMaterial({ color: GOLD2 })
    )
    dot.position.copy(pos)
    scene.add(dot)

    const ring = new THREE.Mesh(
      new THREE.RingGeometry(0.1, 0.22, 16),
      new THREE.MeshBasicMaterial({ color: GOLD2, transparent: true, opacity: 0.5, side: THREE.DoubleSide })
    )
    ring.position.copy(pos)
    ring.lookAt(earth.position)
    scene.add(ring)

    tickers.push(t => {
      const s = 1 + Math.abs(Math.sin(t * 1.2 + idx * 0.9)) * 1.5
      ring.scale.setScalar(s)
      ring.material.opacity = 0.5 / s
    })
  })

  // Gold arcs
  const pairs = [[0,1],[1,2],[0,5],[2,3],[3,4],[4,5],[0,3]]
  pairs.forEach(([a, b]) => {
    const p1 = latLonTo3D(offices[a].lat, offices[a].lon, R + 0.08)
    const p2 = latLonTo3D(offices[b].lat, offices[b].lon, R + 0.08)
    const mid = p1.clone().add(p2).multiplyScalar(0.5).normalize().multiplyScalar(R + 2.2).add(earth.position)
    scene.add(new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(new THREE.QuadraticBezierCurve3(p1, mid, p2).getPoints(48)),
      new THREE.LineBasicMaterial({ color: GOLD2, transparent: true, opacity: 0.6 })
    ))
  })

  scene.add(Object.assign(new THREE.PointLight(BLUE, 2.5, 22), { position: new THREE.Vector3(-9, 5, z2) }))
  scene.add(Object.assign(new THREE.PointLight(GOLD, 1.8, 18), { position: new THREE.Vector3(12, -3, z2) }))

  tickers.push(t => {
    earth.rotation.y = t * 0.055
    wire.rotation.y  = earth.rotation.y
  })
}

// ─────────────────────────────────────────────────────────────────────────────
// ZONE 4 — MONOLITHS (Services / Technology / Timeline / Projects / Team)
// Four floating corporate pillars with halo rings
// ─────────────────────────────────────────────────────────────────────────────
function buildMonolithZone() {
  const z3 = Z[3]

  const configs = [
    { x: -7,  y:  3,   color: GOLD2,  rotY:  0.35, h: 8,   w: 2.2, d: 0.45 },
    { x:  7,  y:  3,   color: BLUE2,  rotY: -0.35, h: 8,   w: 2.2, d: 0.45 },
    { x: -4,  y: -3.5, color: GREEN,  rotY:  0.15, h: 5.5, w: 1.7, d: 0.4  },
    { x:  4,  y: -3.5, color: PURPLE, rotY: -0.15, h: 5.5, w: 1.7, d: 0.4  },
  ]

  const monoliths = configs.map(cfg => {
    const geo = new THREE.BoxGeometry(cfg.w, cfg.h, cfg.d)

    const solid = new THREE.Mesh(geo, new THREE.MeshPhongMaterial({
      color: 0x04080f, emissive: cfg.color, emissiveIntensity: 0.07,
      shininess: 90, transparent: true, opacity: 0.88,
    }))
    solid.position.set(cfg.x, cfg.y, z3)
    solid.rotation.y = cfg.rotY
    scene.add(solid)

    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(geo),
      new THREE.LineBasicMaterial({ color: cfg.color, transparent: true, opacity: 0.88 })
    )
    edges.position.copy(solid.position)
    edges.rotation.copy(solid.rotation)
    scene.add(edges)

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(cfg.h * 0.62, 0.028, 8, 80),
      new THREE.MeshBasicMaterial({ color: cfg.color, transparent: true, opacity: 0.35 })
    )
    ring.position.copy(solid.position)
    ring.rotation.x = Math.PI / 2
    scene.add(ring)

    const beam = new THREE.Mesh(
      new THREE.BoxGeometry(0.06, 8, 0.06),
      new THREE.MeshBasicMaterial({ color: cfg.color, transparent: true, opacity: 0.12 })
    )
    beam.position.set(cfg.x, cfg.y + cfg.h / 2 + 4, z3)
    scene.add(beam)

    const pl = new THREE.PointLight(cfg.color, 1.8, 12)
    pl.position.copy(solid.position)
    scene.add(pl)

    return { solid, edges, ring, beam, pl, cfg }
  })

  // Outer orbit rings
  const outerRing = new THREE.Mesh(
    new THREE.TorusGeometry(14, 0.045, 8, 120),
    new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: 0.18 })
  )
  outerRing.position.set(0, -0.5, z3)
  outerRing.rotation.x = Math.PI / 3.5
  scene.add(outerRing)

  const innerRing = new THREE.Mesh(
    new THREE.TorusGeometry(9, 0.025, 8, 100),
    new THREE.MeshBasicMaterial({ color: BLUE, transparent: true, opacity: 0.22 })
  )
  innerRing.position.set(0, -0.5, z3)
  innerRing.rotation.x = Math.PI / 4
  innerRing.rotation.z = Math.PI / 6
  scene.add(innerRing)

  // Ambient particles
  const N = 2000
  const pos = new Float32Array(N * 3)
  for (let i = 0; i < N; i++) {
    pos[i*3]   = (Math.random() - 0.5) * 34
    pos[i*3+1] = (Math.random() - 0.5) * 22
    pos[i*3+2] = z3 + (Math.random() - 0.5) * 10
  }
  const pGeo = new THREE.BufferGeometry()
  pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  scene.add(new THREE.Points(pGeo, new THREE.PointsMaterial({
    color: GOLD, size: 0.05, transparent: true, opacity: 0.4
  })))

  tickers.push(t => {
    monoliths.forEach(({ solid, edges, ring, beam, pl, cfg }, i) => {
      const float = Math.sin(t * 0.5 + i * 1.3) * 0.35
      solid.position.y = cfg.y + float
      edges.position.y = solid.position.y
      ring.position.y  = solid.position.y
      beam.position.y  = cfg.y + cfg.h / 2 + 4 + float
      pl.position.y    = solid.position.y
      ring.rotation.z  = t * 0.28 * (i % 2 === 0 ? 1 : -1)
      pl.intensity = 1.5 + Math.sin(t * 1.8 + i * 1.1) * 0.6
    })
    outerRing.rotation.z = t * 0.04
    innerRing.rotation.z = -t * 0.07
    innerRing.rotation.y = t * 0.03
  })
}

// ─────────────────────────────────────────────────────────────────────────────
// ZONE 5 — BOARDROOM (Contact)
// Wireframe conference table, floating holographic screens, gold dust
// ─────────────────────────────────────────────────────────────────────────────
function buildBoardroomZone() {
  const z4 = Z[4]

  // Table
  const tableGeo = new THREE.BoxGeometry(15, 0.2, 5.5)
  const table = new THREE.Mesh(tableGeo, new THREE.MeshPhongMaterial({
    color: 0x060d1e, emissive: 0x1a2f55, emissiveIntensity: 0.15, shininess: 120,
  }))
  table.position.set(0, -3.5, z4)
  scene.add(table)

  const tableEdges = new THREE.LineSegments(
    new THREE.EdgesGeometry(tableGeo),
    new THREE.LineBasicMaterial({ color: GOLD2, transparent: true, opacity: 0.9 })
  )
  tableEdges.position.copy(table.position)
  scene.add(tableEdges)

  // Chairs
  [-5.5, -3, -0.5, 2, 4.5].forEach(x => {
    [-3.8, 3.8].forEach(side => {
      const chair = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.BoxGeometry(0.9, 1.3, 0.85)),
        new THREE.LineBasicMaterial({ color: BLUE, transparent: true, opacity: 0.4 })
      )
      chair.position.set(x, -3.65, z4 + side)
      scene.add(chair)
    })
  })

  // Holographic screens
  const screenData = [
    { x: -4.5, color: GOLD2 },
    { x:  0,   color: BLUE2 },
    { x:  4.5, color: GREEN },
  ]

  const screens = screenData.map(({ x, color }) => {
    const sGeo = new THREE.PlaneGeometry(3.2, 2)

    const bg = new THREE.Mesh(sGeo, new THREE.MeshBasicMaterial({
      color, transparent: true, opacity: 0.07, side: THREE.DoubleSide
    }))
    bg.position.set(x, 1, z4)
    bg.rotation.x = -0.15
    scene.add(bg)

    const edg = new THREE.LineSegments(
      new THREE.EdgesGeometry(sGeo),
      new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.7 })
    )
    edg.position.copy(bg.position)
    edg.rotation.copy(bg.rotation)
    scene.add(edg)

    // Scan line
    const scan = new THREE.Mesh(
      new THREE.PlaneGeometry(3.0, 0.03),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.5, side: THREE.DoubleSide })
    )
    scan.position.copy(bg.position)
    scan.rotation.copy(bg.rotation)
    scene.add(scan)

    const pl = new THREE.PointLight(color, 0.8, 8)
    pl.position.copy(bg.position)
    scene.add(pl)

    return { bg, edg, scan, pl }
  })

  // Spotlights
  const spot = new THREE.SpotLight(GOLD2, 5, 30, Math.PI / 8, 0.3)
  spot.position.set(0, 14, z4)
  spot.target.position.set(0, -3.5, z4)
  scene.add(spot, spot.target)

  scene.add(Object.assign(
    new THREE.SpotLight(BLUE, 2.5, 22, Math.PI / 7, 0.4),
    { position: new THREE.Vector3(-10, 10, z4) }
  ))

  // Gold dust particles
  const N = 3000
  const pos = new Float32Array(N * 3)
  const vel = new Float32Array(N)
  for (let i = 0; i < N; i++) {
    pos[i*3]   = (Math.random() - 0.5) * 32
    pos[i*3+1] = (Math.random() - 0.5) * 20
    pos[i*3+2] = z4 + (Math.random() - 0.5) * 12
    vel[i] = (Math.random() - 0.5) * 0.005
  }
  const pGeo = new THREE.BufferGeometry()
  pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  scene.add(new THREE.Points(pGeo, new THREE.PointsMaterial({
    color: GOLD2, size: 0.05, transparent: true, opacity: 0.45
  })))

  tickers.push(t => {
    screens.forEach(({ bg, edg, scan, pl }, i) => {
      const floatY = 1 + Math.sin(t * 0.55 + i * 1.4) * 0.22
      bg.position.y   = floatY
      edg.position.y  = floatY
      scan.position.y = floatY + Math.sin(t * 1.2 + i) * 0.7
      pl.position.y   = floatY
      pl.intensity = 0.7 + Math.sin(t * 1.8 + i * 0.9) * 0.3
    })

    const a = pGeo.attributes.position.array
    for (let i = 0; i < N; i++) {
      a[i*3+1] += vel[i]
      if (a[i*3+1] > 10) a[i*3+1] = -10
      if (a[i*3+1] < -10) a[i*3+1] = 10
    }
    pGeo.attributes.position.needsUpdate = true
    spot.intensity = 4.5 + Math.sin(t * 0.35) * 0.8
  })
}
