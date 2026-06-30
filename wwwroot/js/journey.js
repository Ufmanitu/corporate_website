/**
 * Meridian Group v3 — Corporate Journey
 * Theme: The Architecture of Business
 *
 * Solid filled geometry, rich materials, dark navy background.
 * Five corporate zones driven by scroll.
 */

import * as THREE from 'three'

const Z = { skyline: 0, data: -40, earth: -80, monoliths: -120, boardroom: -165 }

function lerp(a, b, t) { return a + (b - a) * t }
function rand(min, max) { return min + Math.random() * (max - min) }

const GOLD  = 0xD97706
const GOLD2 = 0xF59E0B
const BLUE  = 0x3B82F6
const BLUE2 = 0x60A5FA
const GREEN = 0x10B981
const PURP  = 0x8B5CF6

// ─────────────────────────────────────────────────────────────────────────────
// ZONE 1 — SKYLINE  (Hero)
// Solid gold crystal + filled city skyline buildings + particle field
// ─────────────────────────────────────────────────────────────────────────────
function buildSkylineZone(scene) {
  const group = new THREE.Group()
  group.position.z = Z.skyline

  // Solid inner gold core — IcosahedronGeometry for a gem-like look
  const coreSolid = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.0, 2),
    new THREE.MeshPhongMaterial({ color: GOLD2, emissive: GOLD2, emissiveIntensity: 0.7, shininess: 120 })
  )
  group.add(coreSolid)

  // Wireframe cage around the solid core
  const core = new THREE.Mesh(
    new THREE.DodecahedronGeometry(1.6, 0),
    new THREE.MeshBasicMaterial({ color: GOLD2, wireframe: true, transparent: true, opacity: 0.55 })
  )
  group.add(core)

  // Outer octahedron — solid semi-transparent gold facets
  const outer = new THREE.Mesh(
    new THREE.OctahedronGeometry(2.6, 1),
    new THREE.MeshPhongMaterial({
      color: 0x1a0800, emissive: GOLD, emissiveIntensity: 0.35,
      shininess: 80, transparent: true, opacity: 0.5, side: THREE.DoubleSide,
    })
  )
  group.add(outer)

  // Orbit rings — brighter than before
  const ring1 = new THREE.Mesh(
    new THREE.TorusGeometry(3.5, 0.025, 8, 128),
    new THREE.MeshBasicMaterial({ color: GOLD2 })
  )
  ring1.rotation.x = Math.PI / 2
  group.add(ring1)

  const ring2 = new THREE.Mesh(
    new THREE.TorusGeometry(4.2, 0.015, 8, 128),
    new THREE.MeshBasicMaterial({ color: BLUE2, transparent: true, opacity: 0.8 })
  )
  ring2.rotation.x = Math.PI / 3
  ring2.rotation.z = Math.PI / 5
  group.add(ring2)

  const ring3 = new THREE.Mesh(
    new THREE.TorusGeometry(2.8, 0.012, 8, 100),
    new THREE.MeshBasicMaterial({ color: GREEN, transparent: true, opacity: 0.7 })
  )
  ring3.rotation.x = Math.PI / 6
  ring3.rotation.y = Math.PI / 4
  group.add(ring3)

  const dot = new THREE.Mesh(
    new THREE.SphereGeometry(0.12, 8, 8),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
  )
  group.add(dot)

  const dot2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.09, 8, 8),
    new THREE.MeshBasicMaterial({ color: BLUE2 })
  )
  group.add(dot2)

  // City skyline — SOLID buildings, not wireframe outlines
  const skylineData = [
    [-9, 5.5, 0.7], [-7.5, 8.5, 0.6], [-6, 12, 0.8], [-4.5, 7.5, 0.7],
    [-3, 15, 0.9], [-1.5, 9.5, 0.8], [1.5, 9.5, 0.8], [3, 15, 0.9],
    [4.5, 7.5, 0.7], [6, 12, 0.8], [7.5, 8.5, 0.6], [9, 5.5, 0.7],
  ]
  skylineData.forEach(([x, h, w]) => {
    const bGeo = new THREE.BoxGeometry(w, h, w)

    const building = new THREE.Mesh(bGeo, new THREE.MeshPhongMaterial({
      color: 0x071220, emissive: 0x0d2040, emissiveIntensity: 0.5, shininess: 60,
      transparent: true, opacity: 0.88,
    }))
    building.position.set(x, h / 2 - 19, -8)
    group.add(building)

    const bEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(bGeo),
      new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: 0.55 })
    )
    bEdges.position.copy(building.position)
    group.add(bEdges)

    // Gold roof accent
    const roof = new THREE.Mesh(
      new THREE.BoxGeometry(w + 0.06, 0.07, w + 0.06),
      new THREE.MeshBasicMaterial({ color: GOLD2, transparent: true, opacity: 0.9 })
    )
    roof.position.set(x, h - 19 + 0.035, -8)
    group.add(roof)
  })

  // Dense particle cloud
  const COUNT = 5000
  const positions = new Float32Array(COUNT * 3)
  const colors    = new Float32Array(COUNT * 3)
  const cGold = new THREE.Color(GOLD2)
  const cBlue = new THREE.Color(BLUE2)
  for (let i = 0; i < COUNT; i++) {
    const r     = rand(3.5, 13)
    const theta = Math.random() * Math.PI * 2
    const phi   = Math.acos(2 * Math.random() - 1)
    positions[i*3]   = r * Math.sin(phi) * Math.cos(theta)
    positions[i*3+1] = r * Math.sin(phi) * Math.sin(theta)
    positions[i*3+2] = r * Math.cos(phi)
    const c = cGold.clone().lerp(cBlue, Math.random())
    colors[i*3] = c.r; colors[i*3+1] = c.g; colors[i*3+2] = c.b
  }
  const pGeo = new THREE.BufferGeometry()
  pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  pGeo.setAttribute('color',    new THREE.BufferAttribute(colors, 3))
  group.add(new THREE.Points(pGeo, new THREE.PointsMaterial({
    size: 0.05, vertexColors: true, transparent: true, opacity: 0.9, sizeAttenuation: true,
  })))

  scene.add(group)

  const gl1 = new THREE.PointLight(GOLD2, 10, 30); gl1.position.set(4, 3, 3)
  const gl2 = new THREE.PointLight(BLUE2,  6, 22); gl2.position.set(-4, -2, -2)
  const gl3 = new THREE.PointLight(GREEN,  4, 16); gl3.position.set(0, 5, 0)
  scene.add(gl1, gl2, gl3)

  let t = 0
  return {
    update(dt) {
      t += dt
      coreSolid.rotation.x += 0.004; coreSolid.rotation.y += 0.006
      core.rotation.x      += 0.005; core.rotation.y       += 0.008
      outer.rotation.x     -= 0.003; outer.rotation.z      += 0.005
      ring1.rotation.z += 0.003; ring2.rotation.y += 0.002; ring3.rotation.x += 0.004
      dot.position.x  = Math.cos(t * 0.7) * 3.5
      dot.position.y  = 0
      dot.position.z  = Math.sin(t * 0.7) * 3.5 + Z.skyline
      dot2.position.x = Math.cos(t * 0.4 + Math.PI) * 4.2
      dot2.position.y = Math.sin(t * 0.3) * 0.5
      dot2.position.z = Math.sin(t * 0.4 + Math.PI) * 4.2 + Z.skyline
      gl1.intensity = 9 + Math.sin(t * 1.1) * 2
      gl2.intensity = 5 + Math.cos(t * 0.7) * 1.5
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// ZONE 2 — DATA  (Stats)
// Solid coloured bar charts + reflective floor + floating data nodes
// ─────────────────────────────────────────────────────────────────────────────
function buildDataZone(scene) {
  const group = new THREE.Group()
  group.position.z = Z.data

  const bars = [
    { x: -7.5, h: 8,   color: GOLD2 },
    { x: -2.5, h: 5.5, color: BLUE  },
    { x:  2.5, h: 10,  color: GREEN },
    { x:  7.5, h: 9,   color: PURP  },
  ]

  const barMeshes = []
  bars.forEach(({ x, h, color }, i) => {
    const geo = new THREE.BoxGeometry(1.8, h, 1.8)

    // SOLID bar — full opacity, strong emissive colour
    const body = new THREE.Mesh(geo, new THREE.MeshPhongMaterial({
      color, emissive: color, emissiveIntensity: 0.45, shininess: 80,
    }))
    body.position.set(x, h / 2 - 8, 0)
    group.add(body)

    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(geo),
      new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.28 })
    )
    edges.position.copy(body.position)
    group.add(edges)

    // Bright glowing cap slab
    const cap = new THREE.Mesh(
      new THREE.BoxGeometry(2.0, 0.14, 2.0),
      new THREE.MeshBasicMaterial({ color })
    )
    cap.position.set(x, h - 8 + 0.07, 0)
    group.add(cap)

    // Wider translucent halo under cap
    const halo = new THREE.Mesh(
      new THREE.BoxGeometry(2.6, 0.06, 2.6),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.3 })
    )
    halo.position.set(x, h - 8 + 0.03, 0)
    group.add(halo)

    const pl = new THREE.PointLight(color, 4, 16)
    pl.position.set(x, h - 8 + 0.5, 0)
    group.add(pl)

    barMeshes.push({ body, pl, i })
  })

  // Trend line across bar tops
  const trendPts = bars.map(b => new THREE.Vector3(b.x, b.h - 8 + 0.15, 0))
  group.add(new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(trendPts),
    new THREE.LineBasicMaterial({ color: GOLD2, transparent: true, opacity: 0.9 })
  ))

  // Reflective floor slab
  const floor = new THREE.Mesh(
    new THREE.BoxGeometry(42, 0.07, 22),
    new THREE.MeshPhongMaterial({
      color: 0x050d1a, emissive: 0x0a1828, emissiveIntensity: 0.3, shininess: 200,
    })
  )
  floor.position.y = -8
  group.add(floor)

  const grid = new THREE.GridHelper(42, 21, 0x1a3060, 0x0d1830)
  grid.position.y = -7.96
  group.add(grid)

  // Floating data nodes
  const nodeData = []
  const nColors = [GOLD2, BLUE, GREEN, PURP]
  for (let i = 0; i < 80; i++) {
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.07 + Math.random() * 0.09, 8, 8),
      new THREE.MeshBasicMaterial({ color: nColors[i % 4] })
    )
    const ox = rand(-18, 18), oy = rand(-6, 7)
    sphere.position.set(ox, oy, rand(-6, 6))
    group.add(sphere)
    nodeData.push({ mesh: sphere, ox, oy, speed: rand(0.15, 0.4), radius: rand(0.6, 2.5), phase: Math.random() * Math.PI * 2 })
  }

  // Connection lines
  for (let i = 0; i < 30; i++) {
    const a = new THREE.Vector3(rand(-16, 16), rand(-7, 6), rand(-4, 4))
    const b = new THREE.Vector3(rand(-16, 16), rand(-7, 6), rand(-4, 4))
    group.add(new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([a, b]),
      new THREE.LineBasicMaterial({ color: nColors[i % 4], transparent: true, opacity: 0.28 })
    ))
  }

  scene.add(group)

  let t = 0
  return {
    update(dt) {
      t += dt
      barMeshes.forEach(({ body, pl, i }) => {
        pl.intensity = 3.5 + Math.sin(t * 2.5 + i * 1.3) * 1.5
      })
      nodeData.forEach(nd => {
        nd.mesh.position.x = nd.ox + Math.sin(t * nd.speed + nd.phase) * nd.radius
        nd.mesh.position.y = nd.oy + Math.cos(t * nd.speed * 0.7 + nd.phase) * nd.radius * 0.5
      })
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// ZONE 3 — EARTH  (Global Presence)
// Globe with brighter vertex colours, orbit ring, office markers + arcs
// ─────────────────────────────────────────────────────────────────────────────
function buildEarthZone(scene) {
  const group = new THREE.Group()
  group.position.z = Z.earth
  group.position.x = 3

  const R = 4.5

  // Real Earth texture map
  const earthTex = new THREE.TextureLoader().load('/img/earth.jpg')
  const earth = new THREE.Mesh(
    new THREE.SphereGeometry(R, 80, 80),
    new THREE.MeshPhongMaterial({ map: earthTex, shininess: 18 })
  )
  group.add(earth)

  // Thin cloud haze
  group.add(new THREE.Mesh(
    new THREE.SphereGeometry(R + 0.1, 32, 32),
    new THREE.MeshPhongMaterial({ color: 0xffffff, transparent: true, opacity: 0.09, depthWrite: false })
  ))

  // Very subtle gold grid for the "corporate" feel
  const wireGeo = new THREE.SphereGeometry(R + 0.05, 32, 32)
  const wire = new THREE.Mesh(wireGeo, new THREE.MeshBasicMaterial({
    color: GOLD, wireframe: true, transparent: true, opacity: 0.06,
  }))
  group.add(wire)

  // Atmosphere glow
  group.add(new THREE.Mesh(
    new THREE.SphereGeometry(R + 0.55, 64, 64),
    new THREE.MeshBasicMaterial({ color: 0x4a90d9, transparent: true, opacity: 0.14, side: THREE.BackSide })
  ))

  // Outer haze
  group.add(new THREE.Mesh(
    new THREE.SphereGeometry(R + 1.1, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0x0a2040, transparent: true, opacity: 0.07, side: THREE.BackSide })
  ))

  // Orbit ring around the globe
  const orbitRing = new THREE.Mesh(
    new THREE.TorusGeometry(R + 1.8, 0.04, 8, 120),
    new THREE.MeshBasicMaterial({ color: GOLD2, transparent: true, opacity: 0.55 })
  )
  orbitRing.rotation.x = Math.PI / 4
  group.add(orbitRing)

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
  offices.forEach((o, idx) => {
    const pos = latLon(o.lat, o.lon, R + 0.1)

    const dot = new THREE.Mesh(
      new THREE.SphereGeometry(0.14, 8, 8),
      new THREE.MeshBasicMaterial({ color: GOLD2 })
    )
    dot.position.copy(pos)
    group.add(dot)

    // Soft glow halo around each office dot
    const glow = new THREE.Mesh(
      new THREE.SphereGeometry(0.28, 8, 8),
      new THREE.MeshBasicMaterial({ color: GOLD2, transparent: true, opacity: 0.22 })
    )
    glow.position.copy(pos)
    group.add(glow)

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.18, 0.025, 8, 16),
      new THREE.MeshBasicMaterial({ color: GOLD2, transparent: true, opacity: 0.75 })
    )
    ring.position.copy(pos)
    ring.lookAt(new THREE.Vector3(0, 0, 0))
    group.add(ring)
    rings.push({ ring, idx })
  })

  const pairs = [[0,1],[1,2],[0,5],[2,3],[3,4],[4,5],[0,3],[1,5]]
  pairs.forEach(([a, b]) => {
    const p1  = latLon(offices[a].lat, offices[a].lon, R + 0.1)
    const p2  = latLon(offices[b].lat, offices[b].lon, R + 0.1)
    const mid = p1.clone().add(p2).multiplyScalar(0.5).normalize().multiplyScalar(R + 2.4)
    group.add(new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(new THREE.QuadraticBezierCurve3(p1, mid, p2).getPoints(56)),
      new THREE.LineBasicMaterial({ color: GOLD2, transparent: true, opacity: 0.7 })
    ))
  })

  scene.add(group)

  const keyL = new THREE.PointLight(0xfff5e0, 8, 40)   // warm-white sun
  keyL.position.set(-12, 6, Z.earth - 2)
  scene.add(keyL)
  const rimL = new THREE.PointLight(0x2060b0, 2.5, 28) // cool blue space rim
  rimL.position.set(16, -3, Z.earth)
  scene.add(rimL)

  let t = 0
  return {
    update(dt) {
      t += dt
      earth.rotation.y = t * 0.055
      wire.rotation.y  = t * 0.055
      orbitRing.rotation.z = t * 0.02
      rings.forEach(({ ring, idx }) => {
        const s = 1 + Math.abs(Math.sin(t * 1.2 + idx * 0.9)) * 1.6
        ring.scale.setScalar(s)
        ring.material.opacity = 0.75 / s
      })
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// ZONE 4 — MONOLITHS  (Services)
// Dark glass skyscrapers with strong colour glow + floor plane
// ─────────────────────────────────────────────────────────────────────────────
function buildMonolithZone(scene) {
  const group = new THREE.Group()
  group.position.z = Z.monoliths

  const configs = [
    { x: -8,   y:  3.5, color: GOLD2, rotY:  0.4, h: 10,  w: 2.4, d: 0.6 },
    { x:  8,   y:  3.5, color: BLUE,  rotY: -0.4, h: 10,  w: 2.4, d: 0.6 },
    { x: -4.5, y: -2.5, color: GREEN, rotY:  0.2, h: 7,   w: 1.8, d: 0.5 },
    { x:  4.5, y: -2.5, color: PURP,  rotY: -0.2, h: 7,   w: 1.8, d: 0.5 },
  ]

  const monoliths = configs.map(cfg => {
    const geo = new THREE.BoxGeometry(cfg.w, cfg.h, cfg.d)

    // Dark glass body — high emissive so colour actually shows
    const body = new THREE.Mesh(geo, new THREE.MeshPhongMaterial({
      color: 0x05101e, emissive: cfg.color, emissiveIntensity: 0.35,
      shininess: 160, transparent: true, opacity: 0.92,
    }))
    body.position.set(cfg.x, cfg.y, 0)
    body.rotation.y = cfg.rotY
    group.add(body)

    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(geo),
      new THREE.LineBasicMaterial({ color: cfg.color, transparent: true, opacity: 1.0 })
    )
    edges.position.copy(body.position)
    edges.rotation.copy(body.rotation)
    group.add(edges)

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(cfg.h * 0.65, 0.045, 8, 80),
      new THREE.MeshBasicMaterial({ color: cfg.color, transparent: true, opacity: 0.5 })
    )
    ring.position.copy(body.position)
    ring.rotation.x = Math.PI / 2
    group.add(ring)

    const beam = new THREE.Mesh(
      new THREE.BoxGeometry(0.1, 9, 0.1),
      new THREE.MeshBasicMaterial({ color: cfg.color, transparent: true, opacity: 0.22 })
    )
    beam.position.set(cfg.x, cfg.y + cfg.h / 2 + 4.5, 0)
    group.add(beam)

    const pl = new THREE.PointLight(cfg.color, 4, 18)
    pl.position.copy(body.position)
    group.add(pl)

    return { body, edges, ring, beam, pl, cfg, bx: cfg.x, by: cfg.y }
  })

  const outerRing = new THREE.Mesh(
    new THREE.TorusGeometry(16, 0.07, 8, 140),
    new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: 0.38 })
  )
  outerRing.rotation.x = Math.PI / 3.5
  group.add(outerRing)

  const innerRing = new THREE.Mesh(
    new THREE.TorusGeometry(10, 0.05, 8, 100),
    new THREE.MeshBasicMaterial({ color: BLUE, transparent: true, opacity: 0.42 })
  )
  innerRing.rotation.x = Math.PI / 4
  innerRing.rotation.z = Math.PI / 6
  group.add(innerRing)

  // Reflective floor
  const floor = new THREE.Mesh(
    new THREE.BoxGeometry(50, 0.07, 30),
    new THREE.MeshPhongMaterial({
      color: 0x040c1a, emissive: 0x0a1830, emissiveIntensity: 0.28, shininess: 160,
    })
  )
  floor.position.y = -6
  group.add(floor)

  const grid = new THREE.GridHelper(50, 25, 0x1a3060, 0x0d1830)
  grid.position.y = -5.96
  group.add(grid)

  // Multi-colour ambient particles
  const N = 4000
  const aPos = new Float32Array(N * 3)
  const aCol = new Float32Array(N * 3)
  const cPalette = [new THREE.Color(GOLD2), new THREE.Color(BLUE), new THREE.Color(GREEN), new THREE.Color(PURP)]
  for (let i = 0; i < N; i++) {
    aPos[i*3]   = rand(-28, 28)
    aPos[i*3+1] = rand(-18, 18)
    aPos[i*3+2] = rand(-12, 12)
    const c = cPalette[i % 4]
    aCol[i*3] = c.r; aCol[i*3+1] = c.g; aCol[i*3+2] = c.b
  }
  const pGeo = new THREE.BufferGeometry()
  pGeo.setAttribute('position', new THREE.BufferAttribute(aPos, 3))
  pGeo.setAttribute('color',    new THREE.BufferAttribute(aCol, 3))
  group.add(new THREE.Points(pGeo, new THREE.PointsMaterial({
    size: 0.07, vertexColors: true, transparent: true, opacity: 0.7,
  })))

  scene.add(group)

  let t = 0
  return {
    update(dt) {
      t += dt
      monoliths.forEach(({ body, edges, ring, beam, pl, cfg, bx, by }, i) => {
        const float = Math.sin(t * 0.5 + i * 1.35) * 0.45
        body.position.y  = by + float
        edges.position.y = by + float
        ring.position.y  = by + float
        beam.position.y  = by + cfg.h / 2 + 4.5 + float
        pl.position.y    = by + float
        ring.rotation.z  = t * 0.3 * (i % 2 === 0 ? 1 : -1)
        pl.intensity = 3.5 + Math.sin(t * 1.9 + i * 1.2) * 1.2
      })
      outerRing.rotation.z = t * 0.035
      innerRing.rotation.z = -t * 0.06
      innerRing.rotation.y = t * 0.025
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// ZONE 5 — BOARDROOM  (Contact)
// Solid polished table, detailed chairs, glowing screens with data rows, dust
// ─────────────────────────────────────────────────────────────────────────────
function buildBoardroomZone(scene) {
  const group = new THREE.Group()
  group.position.z = Z.boardroom

  // Polished conference table
  const tableGeo = new THREE.BoxGeometry(16, 0.25, 6)
  const table = new THREE.Mesh(tableGeo, new THREE.MeshPhongMaterial({
    color: 0x08111e, emissive: 0x1a2f55, emissiveIntensity: 0.25, shininess: 200,
  }))
  table.position.y = -4
  group.add(table)

  const tableEdges = new THREE.LineSegments(
    new THREE.EdgesGeometry(tableGeo),
    new THREE.LineBasicMaterial({ color: GOLD2, transparent: true, opacity: 1.0 })
  )
  tableEdges.position.copy(table.position)
  group.add(tableEdges)

  // Subtle gold surface sheen on table top
  const sheen = new THREE.Mesh(
    new THREE.BoxGeometry(15.8, 0.01, 5.8),
    new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: 0.08 })
  )
  sheen.position.set(0, -3.87, 0)
  group.add(sheen)

  // Floor
  const floor = new THREE.Mesh(
    new THREE.BoxGeometry(44, 0.07, 32),
    new THREE.MeshPhongMaterial({
      color: 0x04080f, emissive: 0x0a1428, emissiveIntensity: 0.22, shininess: 120,
    })
  )
  floor.position.y = -5.2
  group.add(floor)

  // Chairs — solid seat + backrest (for...of to avoid any forEach-on-undefined issues)
  for (const x of [-6, -3.2, -0.4, 2.4, 5.2]) {
    for (const side of [-4.2, 4.2]) {
      const seatGeo = new THREE.BoxGeometry(1.0, 0.1, 0.9)
      const seat = new THREE.Mesh(seatGeo, new THREE.MeshPhongMaterial({
        color: 0x0c1a2e, emissive: 0x1a2f55, emissiveIntensity: 0.22, shininess: 60,
      }))
      seat.position.set(x, -3.9, side)
      group.add(seat)

      const seatEdges = new THREE.LineSegments(
        new THREE.EdgesGeometry(seatGeo),
        new THREE.LineBasicMaterial({ color: BLUE, transparent: true, opacity: 0.5 })
      )
      seatEdges.position.copy(seat.position)
      group.add(seatEdges)

      const backGeo = new THREE.BoxGeometry(1.0, 1.2, 0.08)
      const back = new THREE.Mesh(backGeo, new THREE.MeshPhongMaterial({
        color: 0x0c1a2e, emissive: 0x1a2f55, emissiveIntensity: 0.22, shininess: 60,
      }))
      back.position.set(x, -3.3, side + (side > 0 ? 0.46 : -0.46))
      group.add(back)

      const backEdges = new THREE.LineSegments(
        new THREE.EdgesGeometry(backGeo),
        new THREE.LineBasicMaterial({ color: BLUE, transparent: true, opacity: 0.5 })
      )
      backEdges.position.copy(back.position)
      group.add(backEdges)
    }
  }

  // Holographic screens — visible glowing panels (BoxGeometry, not PlaneGeometry)
  const screenCfgs = [
    { x: -5, color: GOLD2 },
    { x:  0, color: BLUE  },
    { x:  5, color: GREEN },
  ]
  const screens = screenCfgs.map(({ x, color }) => {
    const bg = new THREE.Mesh(
      new THREE.BoxGeometry(3.4, 2.1, 0.02),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.2 })
    )
    bg.position.set(x, 1.2, 0)
    bg.rotation.x = -0.12
    group.add(bg)

    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(3.4, 2.1, 0.02)),
      new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.95 })
    )
    edges.position.copy(bg.position)
    edges.rotation.copy(bg.rotation)
    group.add(edges)

    // Data-line rows on the screen face
    for (let row = 0; row < 5; row++) {
      const w = 2.4 * (0.4 + Math.random() * 0.5)
      const lineBar = new THREE.Mesh(
        new THREE.BoxGeometry(w, 0.045, 0.015),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.45 })
      )
      lineBar.position.set(x, 1.72 - row * 0.36, 0.025)
      lineBar.rotation.x = -0.12
      group.add(lineBar)
    }

    const scan = new THREE.Mesh(
      new THREE.BoxGeometry(3.2, 0.04, 0.02),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.85 })
    )
    scan.position.copy(bg.position)
    scan.rotation.copy(bg.rotation)
    group.add(scan)

    const pl = new THREE.PointLight(color, 1.8, 10)
    pl.position.copy(bg.position)
    group.add(pl)

    return { bg, edges, scan, pl }
  })

  // Overhead point light
  const overheadPl = new THREE.PointLight(GOLD2, 8, 40)
  overheadPl.position.set(0, 12, 0)
  group.add(overheadPl)

  // Side accent columns
  for (const cx of [-12, 12]) {
    const col = new THREE.Mesh(
      new THREE.BoxGeometry(0.45, 13, 0.45),
      new THREE.MeshPhongMaterial({
        color: 0x060f1e, emissive: GOLD, emissiveIntensity: 0.22, shininess: 90,
      })
    )
    col.position.set(cx, 1.5, -3)
    group.add(col)
  }

  // Gold ambient dust
  const N = 3000
  const pPos = new Float32Array(N * 3)
  const pVel = new Float32Array(N)
  for (let i = 0; i < N; i++) {
    pPos[i*3]   = rand(-28, 28)
    pPos[i*3+1] = rand(-16, 16)
    pPos[i*3+2] = rand(-14, 14)
    pVel[i] = (Math.random() - 0.5) * 0.007
  }
  const pGeo = new THREE.BufferGeometry()
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
  group.add(new THREE.Points(pGeo, new THREE.PointsMaterial({
    color: GOLD2, size: 0.06, transparent: true, opacity: 0.6,
  })))

  scene.add(group)

  let t = 0
  return {
    update(dt) {
      t += dt
      screens.forEach(({ bg, edges, scan, pl }, i) => {
        const floatY = 1.2 + Math.sin(t * 0.55 + i * 1.4) * 0.28
        bg.position.y    = floatY
        edges.position.y = floatY
        scan.position.y  = floatY + Math.sin(t * 1.3 + i) * 0.75
        pl.position.y    = floatY
        pl.intensity = 1.5 + Math.sin(t * 1.9 + i * 0.9) * 0.6
      })

      const a = pGeo.attributes.position.array
      for (let i = 0; i < N; i++) {
        a[i*3+1] += pVel[i]
        if (a[i*3+1] > 16)  a[i*3+1] = -16
        if (a[i*3+1] < -16) a[i*3+1] = 16
      }
      pGeo.attributes.position.needsUpdate = true
      overheadPl.intensity = 7 + Math.sin(t * 0.4) * 1.5
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────────────────────
export function initJourney(canvas) {
  const W = window.innerWidth, H = window.innerHeight

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
  renderer.setSize(W, H)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.toneMapping         = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.6
  renderer.outputColorSpace    = THREE.SRGBColorSpace

  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x020b18)
  scene.fog = new THREE.FogExp2(0x020b18, 0.004)

  const camera = new THREE.PerspectiveCamera(70, W / H, 0.1, 400)
  camera.position.set(0, 0, 6)

  // Richer ambient + directional for solid object shading
  scene.add(new THREE.AmbientLight(0x304060, 1.5))
  const dirL = new THREE.DirectionalLight(0x5070a0, 0.8)
  dirL.position.set(5, 10, 5)
  scene.add(dirL)

  const zones = [
    buildSkylineZone(scene),
    buildDataZone(scene),
    buildEarthZone(scene),
    buildMonolithZone(scene),
    buildBoardroomZone(scene),
  ]

  const zCam = [
    Z.skyline   + 6,
    Z.data      + 8,
    Z.earth     + 10,
    Z.monoliths + 10,
    Z.boardroom + 10,
  ]

  let scrollProgress = 0
  ScrollTrigger.create({
    trigger: 'body',
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: self => { scrollProgress = self.progress }
  })

  let mouseX = 0, mouseY = 0
  document.addEventListener('mousemove', e => {
    mouseX = (e.clientX / window.innerWidth  - 0.5) * 2
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2
  })

  const clock  = new THREE.Clock()
  let prevTime = 0

  function animate() {
    requestAnimationFrame(animate)

    const elapsed = clock.getElapsedTime()
    const dt      = elapsed - prevTime
    prevTime      = elapsed

    const t    = scrollProgress
    const segN = zCam.length - 1
    const seg  = Math.min(Math.floor(t * segN), segN - 1)
    const frac = (t * segN) - seg
    const camTargetZ = lerp(zCam[seg], zCam[seg + 1] ?? zCam[seg], frac)

    camera.position.x = lerp(camera.position.x, mouseX * 1.5,  0.04)
    camera.position.y = lerp(camera.position.y, -mouseY * 1.0, 0.04)
    camera.position.z = lerp(camera.position.z, camTargetZ,    0.055)
    camera.lookAt(camera.position.x * 0.15, camera.position.y * 0.15, camera.position.z - 5)

    zones.forEach(z => z.update(dt))
    renderer.render(scene, camera)
  }
  animate()

  window.addEventListener('resize', () => {
    const W = window.innerWidth, H = window.innerHeight
    camera.aspect = W / H
    camera.updateProjectionMatrix()
    renderer.setSize(W, H)
  })
}
