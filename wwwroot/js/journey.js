/**
 * Meridian Group v3 — Corporate Journey
 * Theme: The Architecture of Business
 *
 * Camera travels along the Z-axis through five corporate zones.
 * Each zone function returns { update(dt) } like v2.
 */

import * as THREE from 'three'

// ── ZONE Z-POSITIONS ──────────────────────────────────────────────────────────
const Z = { skyline: 0, data: -40, earth: -80, monoliths: -120, boardroom: -165 }

// ── HELPERS ───────────────────────────────────────────────────────────────────
function lerp(a, b, t) { return a + (b - a) * t }
function rand(min, max) { return min + Math.random() * (max - min) }

// Corporate palette
const GOLD  = 0xD97706
const GOLD2 = 0xF59E0B
const BLUE  = 0x3B82F6
const BLUE2 = 0x60A5FA
const GREEN = 0x10B981
const PURP  = 0x8B5CF6

// ─────────────────────────────────────────────────────────────────────────────
// ZONE 1 — SKYLINE (Hero)
// A rotating corporate polyhedron wrapped in gold orbit rings + particle cloud
// ─────────────────────────────────────────────────────────────────────────────
function buildSkylineZone(scene) {
  const group = new THREE.Group()
  group.position.z = Z.skyline

  // Central rotating dodecahedron — the "corporate crystal"
  const core = new THREE.Mesh(
    new THREE.DodecahedronGeometry(1.5, 0),
    new THREE.MeshBasicMaterial({ color: GOLD2, wireframe: true, transparent: true, opacity: 0.95 })
  )
  group.add(core)

  // Outer octahedron, counter-rotating
  const outer = new THREE.Mesh(
    new THREE.OctahedronGeometry(2.6, 1),
    new THREE.MeshBasicMaterial({ color: GOLD, wireframe: true, transparent: true, opacity: 0.3 })
  )
  group.add(outer)

  // Equatorial orbit ring (gold)
  const ring1 = new THREE.Mesh(
    new THREE.TorusGeometry(3.5, 0.015, 8, 128),
    new THREE.MeshBasicMaterial({ color: GOLD2 })
  )
  ring1.rotation.x = Math.PI / 2
  group.add(ring1)

  // Tilted ring (blue)
  const ring2 = new THREE.Mesh(
    new THREE.TorusGeometry(4.2, 0.009, 8, 128),
    new THREE.MeshBasicMaterial({ color: BLUE, transparent: true, opacity: 0.55 })
  )
  ring2.rotation.x = Math.PI / 3
  ring2.rotation.z = Math.PI / 5
  group.add(ring2)

  // Third ring (green)
  const ring3 = new THREE.Mesh(
    new THREE.TorusGeometry(2.8, 0.007, 8, 100),
    new THREE.MeshBasicMaterial({ color: GREEN, transparent: true, opacity: 0.4 })
  )
  ring3.rotation.x = Math.PI / 6
  ring3.rotation.y = Math.PI / 4
  group.add(ring3)

  // Fast orbiting dot (gold)
  const dot = new THREE.Mesh(
    new THREE.SphereGeometry(0.07, 8, 8),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
  )
  group.add(dot)

  // Second orbiting dot (blue)
  const dot2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.05, 8, 8),
    new THREE.MeshBasicMaterial({ color: BLUE2 })
  )
  group.add(dot2)

  // Particle cloud — spherical, gold/blue gradient
  const COUNT = 3000
  const positions = new Float32Array(COUNT * 3)
  const colors    = new Float32Array(COUNT * 3)
  const cGold = new THREE.Color(GOLD2)
  const cBlue = new THREE.Color(BLUE2)
  for (let i = 0; i < COUNT; i++) {
    const r     = rand(4, 10)
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
    size: 0.03, vertexColors: true, transparent: true, opacity: 0.7, sizeAttenuation: true,
  })))

  // City skyline silhouette behind the main shape
  const skylineData = [
    [-9, 5, 0.6], [-7.5, 8, 0.5], [-6, 11, 0.7], [-4.5, 7, 0.6],
    [-3, 14, 0.8], [-1.5, 9, 0.7], [1.5, 9, 0.7], [3, 14, 0.8],
    [4.5, 7, 0.6], [6, 11, 0.7], [7.5, 8, 0.5], [9, 5, 0.6],
  ]
  skylineData.forEach(([x, h, w]) => {
    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(w, h, w)),
      new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: 0.22 })
    )
    edges.position.set(x, h / 2 - 18, -8)
    group.add(edges)
  })

  scene.add(group)

  const gl1 = new THREE.PointLight(GOLD2, 8, 30); gl1.position.set(4, 3, 3)
  const gl2 = new THREE.PointLight(BLUE2, 5, 22); gl2.position.set(-4, -2, -2)
  const gl3 = new THREE.PointLight(GREEN, 3, 16); gl3.position.set(0, 5, 0)
  scene.add(gl1, gl2, gl3)

  let t = 0
  return {
    update(dt) {
      t += dt
      core.rotation.x  += 0.005; core.rotation.y  += 0.008
      outer.rotation.x -= 0.003; outer.rotation.z  += 0.005
      ring1.rotation.z += 0.003; ring2.rotation.y  += 0.002; ring3.rotation.x += 0.004
      dot.position.x = Math.cos(t * 0.7) * 3.5
      dot.position.y = 0
      dot.position.z = Math.sin(t * 0.7) * 3.5 + Z.skyline
      dot2.position.x = Math.cos(t * 0.4 + Math.PI) * 4.2
      dot2.position.y = Math.sin(t * 0.3) * 0.5
      dot2.position.z = Math.sin(t * 0.4 + Math.PI) * 4.2 + Z.skyline
      gl1.intensity = 7 + Math.sin(t * 1.1) * 1.5
      gl2.intensity = 4 + Math.cos(t * 0.7) * 1.0
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// ZONE 2 — DATA (Stats)
// Four rising bar columns with pulsing caps and floating network nodes
// ─────────────────────────────────────────────────────────────────────────────
function buildDataZone(scene) {
  const group = new THREE.Group()
  group.position.z = Z.data

  const bars = [
    { x: -7.5, h: 7,   color: GOLD2 },
    { x: -2.5, h: 4.5, color: BLUE  },
    { x:  2.5, h: 9,   color: GREEN },
    { x:  7.5, h: 8,   color: PURP  },
  ]

  const barMeshes = []
  bars.forEach(({ x, h, color }, i) => {
    const geo = new THREE.BoxGeometry(1.6, h, 1.6)

    const body = new THREE.Mesh(geo, new THREE.MeshPhongMaterial({
      color, emissive: color, emissiveIntensity: 0.25,
      transparent: true, opacity: 0.1,
    }))
    body.position.set(x, h / 2 - 8, 0)
    group.add(body)

    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(geo),
      new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.9 })
    )
    edges.position.copy(body.position)
    group.add(edges)

    const cap = new THREE.Mesh(
      new THREE.PlaneGeometry(1.8, 1.8),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.65, side: THREE.DoubleSide })
    )
    cap.rotation.x = -Math.PI / 2
    cap.position.set(x, h - 8 + 0.02, 0)
    group.add(cap)

    const pl = new THREE.PointLight(color, 2.5, 14)
    pl.position.copy(cap.position)
    group.add(pl)

    barMeshes.push({ body, pl, i })
  })

  // Trend line across tops
  const trendPts = bars.map(b => new THREE.Vector3(b.x, b.h - 8 + 0.1, 0))
  group.add(new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(trendPts),
    new THREE.LineBasicMaterial({ color: GOLD2, transparent: true, opacity: 0.6 })
  ))

  // Floor grid
  const grid = new THREE.GridHelper(40, 20, 0x1a2f55, 0x0d1a33)
  grid.position.y = -8
  group.add(grid)

  // Floating data nodes
  const nodeData = []
  const nColors = [GOLD2, BLUE, GREEN, PURP]
  for (let i = 0; i < 60; i++) {
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.06 + Math.random() * 0.08, 8, 8),
      new THREE.MeshBasicMaterial({ color: nColors[i % 4], transparent: true, opacity: 0.85 })
    )
    const ox = rand(-18, 18), oy = rand(-10, 6)
    sphere.position.set(ox, oy, rand(-5, 5))
    group.add(sphere)
    nodeData.push({ mesh: sphere, ox, oy, speed: rand(0.15, 0.4), radius: rand(0.6, 2.5), phase: Math.random() * Math.PI * 2 })
  }

  // Static connection lines
  for (let i = 0; i < 20; i++) {
    const a = new THREE.Vector3(rand(-16, 16), rand(-8, 5), rand(-3, 3))
    const b = new THREE.Vector3(rand(-16, 16), rand(-8, 5), rand(-3, 3))
    group.add(new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([a, b]),
      new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: 0.15 })
    ))
  }

  scene.add(group)

  let t = 0
  return {
    update(dt) {
      t += dt
      barMeshes.forEach(({ body, pl, i }) => {
        body.material.opacity = 0.08 + Math.abs(Math.sin(t * 1.8 + i * 0.9)) * 0.15
        pl.intensity = 2 + Math.sin(t * 2.5 + i * 1.3) * 1.2
      })
      nodeData.forEach(nd => {
        nd.mesh.position.x = nd.ox + Math.sin(t * nd.speed + nd.phase) * nd.radius
        nd.mesh.position.y = nd.oy + Math.cos(t * nd.speed * 0.7 + nd.phase) * nd.radius * 0.5
      })
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// ZONE 3 — EARTH (Global Presence)
// ─────────────────────────────────────────────────────────────────────────────
function buildEarthZone(scene) {
  const group = new THREE.Group()
  group.position.z = Z.earth
  group.position.x = 3

  const R = 4.5
  const earthGeo = new THREE.SphereGeometry(R, 64, 64)

  // Procedural vertex colors
  const vColors = []
  const posArr  = earthGeo.attributes.position.array
  for (let i = 0; i < posArr.length; i += 3) {
    const nx = posArr[i], ny = posArr[i+1], nz = posArr[i+2]
    const len = Math.sqrt(nx*nx + ny*ny + nz*nz)
    const noise = Math.sin((nx/len)*9) * Math.cos((ny/len)*6) * Math.sin((nz/len)*8)
    vColors.push(...(noise > 0.1 ? [0.04, 0.12, 0.30] : [0.02, 0.05, 0.15]))
  }
  earthGeo.setAttribute('color', new THREE.Float32BufferAttribute(new Float32Array(vColors), 3))

  const earth = new THREE.Mesh(earthGeo, new THREE.MeshPhongMaterial({
    vertexColors: true, shininess: 20,
  }))
  group.add(earth)

  // Gold wireframe overlay (separate geometry to avoid conflicts)
  const wireGeo = new THREE.SphereGeometry(R + 0.02, 32, 32)
  const wire = new THREE.Mesh(wireGeo, new THREE.MeshBasicMaterial({
    color: GOLD, wireframe: true, transparent: true, opacity: 0.08,
  }))
  group.add(wire)

  // Blue atmosphere
  group.add(new THREE.Mesh(
    new THREE.SphereGeometry(R + 0.3, 64, 64),
    new THREE.MeshBasicMaterial({ color: BLUE, transparent: true, opacity: 0.09, side: THREE.BackSide })
  ))

  // Lat/lon helper (local group coordinates)
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
      new THREE.SphereGeometry(0.1, 8, 8),
      new THREE.MeshBasicMaterial({ color: GOLD2 })
    )
    dot.position.copy(pos)
    group.add(dot)

    const ring = new THREE.Mesh(
      new THREE.RingGeometry(0.13, 0.26, 16),
      new THREE.MeshBasicMaterial({ color: GOLD2, transparent: true, opacity: 0.55, side: THREE.DoubleSide })
    )
    ring.position.copy(pos)
    ring.lookAt(new THREE.Vector3(0, 0, 0))
    group.add(ring)
    rings.push({ ring, idx })
  })

  // Gold arcs
  const pairs = [[0,1],[1,2],[0,5],[2,3],[3,4],[4,5],[0,3],[1,5]]
  pairs.forEach(([a, b]) => {
    const p1  = latLon(offices[a].lat, offices[a].lon, R + 0.1)
    const p2  = latLon(offices[b].lat, offices[b].lon, R + 0.1)
    const mid = p1.clone().add(p2).multiplyScalar(0.5).normalize().multiplyScalar(R + 2.4)
    group.add(new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(new THREE.QuadraticBezierCurve3(p1, mid, p2).getPoints(56)),
      new THREE.LineBasicMaterial({ color: GOLD2, transparent: true, opacity: 0.65 })
    ))
  })

  scene.add(group)

  const keyL = new THREE.PointLight(BLUE, 3, 28)
  keyL.position.set(-10, 5, Z.earth - 5)
  scene.add(keyL)
  const rimL = new THREE.PointLight(GOLD, 2, 22)
  rimL.position.set(16, -3, Z.earth)
  scene.add(rimL)

  let t = 0
  return {
    update(dt) {
      t += dt
      earth.rotation.y = t * 0.055
      wire.rotation.y  = t * 0.055
      rings.forEach(({ ring, idx }) => {
        const s = 1 + Math.abs(Math.sin(t * 1.2 + idx * 0.9)) * 1.8
        ring.scale.setScalar(s)
        ring.material.opacity = 0.55 / s
      })
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// ZONE 4 — MONOLITHS (Services / Technology)
// Four tall floating corporate slabs with halo rings
// ─────────────────────────────────────────────────────────────────────────────
function buildMonolithZone(scene) {
  const group = new THREE.Group()
  group.position.z = Z.monoliths

  const configs = [
    { x: -8,   y:  3.5, color: GOLD2, rotY:  0.4, h: 9,   w: 2.4, d: 0.5 },
    { x:  8,   y:  3.5, color: BLUE,  rotY: -0.4, h: 9,   w: 2.4, d: 0.5 },
    { x: -4.5, y: -3,   color: GREEN, rotY:  0.2, h: 6,   w: 1.8, d: 0.45 },
    { x:  4.5, y: -3,   color: PURP,  rotY: -0.2, h: 6,   w: 1.8, d: 0.45 },
  ]

  const monoliths = configs.map(cfg => {
    const geo = new THREE.BoxGeometry(cfg.w, cfg.h, cfg.d)

    const body = new THREE.Mesh(geo, new THREE.MeshPhongMaterial({
      color: 0x050a16, emissive: cfg.color, emissiveIntensity: 0.06,
      shininess: 100, transparent: true, opacity: 0.92,
    }))
    body.position.set(cfg.x, cfg.y, 0)
    body.rotation.y = cfg.rotY
    group.add(body)

    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(geo),
      new THREE.LineBasicMaterial({ color: cfg.color, transparent: true, opacity: 0.9 })
    )
    edges.position.copy(body.position)
    edges.rotation.copy(body.rotation)
    group.add(edges)

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(cfg.h * 0.65, 0.03, 8, 80),
      new THREE.MeshBasicMaterial({ color: cfg.color, transparent: true, opacity: 0.35 })
    )
    ring.position.copy(body.position)
    ring.rotation.x = Math.PI / 2
    group.add(ring)

    const beam = new THREE.Mesh(
      new THREE.BoxGeometry(0.07, 9, 0.07),
      new THREE.MeshBasicMaterial({ color: cfg.color, transparent: true, opacity: 0.13 })
    )
    beam.position.set(cfg.x, cfg.y + cfg.h / 2 + 4.5, 0)
    group.add(beam)

    const pl = new THREE.PointLight(cfg.color, 2, 14)
    pl.position.copy(body.position)
    group.add(pl)

    return { body, edges, ring, beam, pl, cfg, bx: cfg.x, by: cfg.y }
  })

  const outerRing = new THREE.Mesh(
    new THREE.TorusGeometry(16, 0.05, 8, 140),
    new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: 0.2 })
  )
  outerRing.rotation.x = Math.PI / 3.5
  group.add(outerRing)

  const innerRing = new THREE.Mesh(
    new THREE.TorusGeometry(10, 0.03, 8, 100),
    new THREE.MeshBasicMaterial({ color: BLUE, transparent: true, opacity: 0.22 })
  )
  innerRing.rotation.x = Math.PI / 4
  innerRing.rotation.z = Math.PI / 6
  group.add(innerRing)

  // Ambient particles
  const N = 2500
  const aPos = new Float32Array(N * 3)
  for (let i = 0; i < N; i++) {
    aPos[i*3]   = rand(-28, 28)
    aPos[i*3+1] = rand(-18, 18)
    aPos[i*3+2] = rand(-10, 10)
  }
  const pGeo = new THREE.BufferGeometry()
  pGeo.setAttribute('position', new THREE.BufferAttribute(aPos, 3))
  group.add(new THREE.Points(pGeo, new THREE.PointsMaterial({
    color: GOLD, size: 0.055, transparent: true, opacity: 0.45,
  })))

  scene.add(group)

  let t = 0
  return {
    update(dt) {
      t += dt
      monoliths.forEach(({ body, edges, ring, beam, pl, cfg, bx, by }, i) => {
        const float = Math.sin(t * 0.5 + i * 1.35) * 0.4
        body.position.y  = by + float
        edges.position.y = by + float
        ring.position.y  = by + float
        beam.position.y  = by + cfg.h / 2 + 4.5 + float
        pl.position.y    = by + float
        ring.rotation.z  = t * 0.3 * (i % 2 === 0 ? 1 : -1)
        pl.intensity = 1.8 + Math.sin(t * 1.9 + i * 1.2) * 0.7
      })
      outerRing.rotation.z = t * 0.035
      innerRing.rotation.z = -t * 0.06
      innerRing.rotation.y = t * 0.025
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// ZONE 5 — BOARDROOM (Contact)
// Wireframe conference table + floating holographic screens + gold dust
// ─────────────────────────────────────────────────────────────────────────────
function buildBoardroomZone(scene) {
  const group = new THREE.Group()
  group.position.z = Z.boardroom

  // Conference table
  const tableGeo = new THREE.BoxGeometry(16, 0.22, 6)
  const table = new THREE.Mesh(tableGeo, new THREE.MeshPhongMaterial({
    color: 0x060d1e, emissive: 0x1a2f55, emissiveIntensity: 0.18, shininess: 130,
  }))
  table.position.y = -4
  group.add(table)

  const tableEdges = new THREE.LineSegments(
    new THREE.EdgesGeometry(tableGeo),
    new THREE.LineBasicMaterial({ color: GOLD2, transparent: true, opacity: 0.9 })
  )
  tableEdges.position.copy(table.position)
  group.add(tableEdges)

  // Chairs
  [-6, -3.2, -0.4, 2.4, 5.2].forEach(x => {
    [-4.2, 4.2].forEach(side => {
      const chair = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.BoxGeometry(1, 1.4, 0.9)),
        new THREE.LineBasicMaterial({ color: BLUE, transparent: true, opacity: 0.35 })
      )
      chair.position.set(x, -3.9, side)
      group.add(chair)
    })
  })

  // Holographic screens
  const screenCfgs = [
    { x: -5, color: GOLD2 },
    { x:  0, color: BLUE  },
    { x:  5, color: GREEN },
  ]

  const screens = screenCfgs.map(({ x, color }) => {
    const sGeo = new THREE.PlaneGeometry(3.4, 2.1)

    const bg = new THREE.Mesh(sGeo, new THREE.MeshBasicMaterial({
      color, transparent: true, opacity: 0.07, side: THREE.DoubleSide,
    }))
    bg.position.set(x, 1.2, 0)
    bg.rotation.x = -0.12
    group.add(bg)

    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(sGeo),
      new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.75 })
    )
    edges.position.copy(bg.position)
    edges.rotation.copy(bg.rotation)
    group.add(edges)

    const scan = new THREE.Mesh(
      new THREE.PlaneGeometry(3.2, 0.03),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.55, side: THREE.DoubleSide })
    )
    scan.position.copy(bg.position)
    scan.rotation.copy(bg.rotation)
    group.add(scan)

    const pl = new THREE.PointLight(color, 0.9, 9)
    pl.position.copy(bg.position)
    group.add(pl)

    return { bg, edges, scan, pl }
  })

  // Overhead gold spot
  const spot = new THREE.SpotLight(GOLD2, 6, 35, Math.PI / 7.5, 0.3)
  spot.position.set(0, 16, 2)
  spot.target.position.set(0, -4, 0)
  group.add(spot)
  group.add(spot.target)

  // Gold ambient dust particles
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
    color: GOLD2, size: 0.055, transparent: true, opacity: 0.5,
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
        pl.intensity = 0.75 + Math.sin(t * 1.9 + i * 0.9) * 0.3
      })

      const a = pGeo.attributes.position.array
      for (let i = 0; i < N; i++) {
        a[i*3+1] += pVel[i]
        if (a[i*3+1] > 16)  a[i*3+1] = -16
        if (a[i*3+1] < -16) a[i*3+1] = 16
      }
      pGeo.attributes.position.needsUpdate = true
      spot.intensity = 5.5 + Math.sin(t * 0.4) * 1.0
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN — exported init function (mirrors v2 structure exactly)
// ─────────────────────────────────────────────────────────────────────────────
export function initJourney(canvas) {
  const W = window.innerWidth, H = window.innerHeight

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
  renderer.setSize(W, H)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.toneMapping         = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.4
  renderer.outputColorSpace    = THREE.SRGBColorSpace

  const scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2(0x04060f, 0.008)

  const camera = new THREE.PerspectiveCamera(70, W / H, 0.1, 400)
  camera.position.set(0, 0, 6)

  scene.add(new THREE.AmbientLight(0x304060, 1.0))

  // Build zones
  const zones = [
    buildSkylineZone(scene),
    buildDataZone(scene),
    buildEarthZone(scene),
    buildMonolithZone(scene),
    buildBoardroomZone(scene),
  ]

  // Camera Z target for each zone
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

    // Map scroll → camera Z
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
