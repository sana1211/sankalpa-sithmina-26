import { Suspense, useEffect, useMemo, useRef, useState, type MutableRefObject } from 'react';
import { Canvas, ThreeEvent, useFrame, useLoader, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import badgeFront from '../assets/lanyard-front.png';
import badgeBack from '../assets/lanyard-back.png';
import { profile } from '../data';

const BADGE_WIDTH = 2.72;
const BADGE_HEIGHT = 3.86;
const STRAP_SAMPLES = 36;
const STRAP_HALF_WIDTH = .185; // ~3.7 cm wide appearance in our 3D composition
const HOME_CLIP_HEIGHT = 1.54;
const clamp = THREE.MathUtils.clamp;

type HangerPosition = { x: number; y: number };
type MotionState = HangerPosition & { vx: number; vy: number; targetX: number; targetY: number; angle: number; angularSpeed: number };

// One true circular corner radius on ALL four edges, on BOTH sides of the ID.
// Use quarter-circle arcs (not quadratic corners) so the curve is exactly
// symmetrical even while the card is rotating in the 3D scene.
const BADGE_CORNER_RADIUS = .205;

function makeCardShape() {
  const halfW = BADGE_WIDTH / 2;
  const halfH = BADGE_HEIGHT / 2;
  const r = Math.min(BADGE_CORNER_RADIUS, halfW, halfH);
  const s = new THREE.Shape();

  // Clockwise around the card, starting on the bottom edge. All the four
  // arc centres are inset by the identical radius r.
  s.moveTo(-halfW + r, -halfH);
  s.lineTo(halfW - r, -halfH);
  s.absarc(halfW - r, -halfH + r, r, -Math.PI / 2, 0, false);
  s.lineTo(halfW, halfH - r);
  s.absarc(halfW - r, halfH - r, r, 0, Math.PI / 2, false);
  s.lineTo(-halfW + r, halfH);
  s.absarc(-halfW + r, halfH - r, r, Math.PI / 2, Math.PI, false);
  s.lineTo(-halfW, -halfH + r);
  s.absarc(-halfW + r, -halfH + r, r, Math.PI, Math.PI * 1.5, false);
  s.closePath();
  return s;
}

function makeFaceGeometry(shape: THREE.Shape) {
  const geometry = new THREE.ShapeGeometry(shape, 24);
  const uv = geometry.getAttribute('uv');
  const pos = geometry.getAttribute('position');
  for (let i = 0; i < pos.count; i++) {
    uv.setXY(i, (pos.getX(i) + BADGE_WIDTH / 2) / BADGE_WIDTH, (pos.getY(i) + BADGE_HEIGHT / 2) / BADGE_HEIGHT);
  }
  uv.needsUpdate = true;
  return geometry;
}

/** Texture is locally generated: woven black fabric, two narrow accent seams, and repeated studio print. */
function makeStrapTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 1024;
  const context = canvas.getContext('2d');
  if (context) {
    context.fillStyle = '#24282f';
    context.fillRect(0, 0, 256, 1024);
    // Fabric ribs are deliberately restrained so the lanyard looks like textile, not neon plastic.
    for (let y = 0; y < 1024; y += 4) {
      context.fillStyle = y % 8 ? 'rgba(0,0,0,.09)' : 'rgba(240,245,255,.035)';
      context.fillRect(0, y, 256, 1);
    }
    context.fillStyle = '#bda7ff';
    context.fillRect(13, 0, 11, 1024);
    context.fillRect(232, 0, 11, 1024);
    context.fillStyle = '#f5f7f8';
    context.font = 'bold 28px Arial, sans-serif';
    context.textAlign = 'center';
    for (let y = 100; y < 1100; y += 245) {
      context.save();
      context.translate(128, y);
      context.rotate(-Math.PI / 2);
      context.fillText('SANKALPA', 0, 10);
      context.restore();
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

/** The fabric is anchored above the screen and bends toward the moving metal buckle. */
function FabricLanyard({ side, hanger }: { side: -1 | 1; hanger: MutableRefObject<HangerPosition> }) {
  const geometry = useMemo(() => {
    const positions = new Float32Array((STRAP_SAMPLES + 1) * 2 * 3);
    const uv = new Float32Array((STRAP_SAMPLES + 1) * 2 * 2);
    const indices: number[] = [];
    for (let i = 0; i <= STRAP_SAMPLES; i++) {
      const t = i / STRAP_SAMPLES;
      for (let sideIndex = 0; sideIndex < 2; sideIndex++) {
        uv[4 * i + sideIndex * 2] = sideIndex;
        uv[4 * i + sideIndex * 2 + 1] = t;
      }
      if (i < STRAP_SAMPLES) {
        const n = i * 2;
        indices.push(n, n + 1, n + 2, n + 1, n + 3, n + 2);
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    g.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
    g.setIndex(indices);
    return g;
  }, []);
  const texture = useMemo(() => makeStrapTexture(), []);

  useFrame(() => {
    const { x, y } = hanger.current;
    // V4.6: Keep the card, clip, and edge-to-edge drag unchanged.
    // ONLY the two wide fabric ribbons start at the TOP CENTER of the hero.
    // Fixed anchors feel like an office lanyard suspended from the neck.
    // Both ribbons flex smoothly toward the clasp as the card is dragged.
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(side * .41, 4.45, -.20),
      new THREE.Vector3(side * .55, 3.88, -.18),
      new THREE.Vector3(side * .81 + x * .15, 3.24 + y * .10, -.14),
      new THREE.Vector3(side * .48 + x * .54, 2.40 + y * .44, -.08),
      new THREE.Vector3(x + side * .125, HOME_CLIP_HEIGHT + .10 + y, .04),
    ]);
    const pos = geometry.getAttribute('position') as THREE.BufferAttribute;
    for (let i = 0; i <= STRAP_SAMPLES; i++) {
      const t = i / STRAP_SAMPLES;
      const point = curve.getPoint(t);
      const tangent = curve.getTangent(t).normalize();
      const nx = -tangent.y;
      const ny = tangent.x;
      for (let index = 0; index < 2; index++) {
        const s = index === 0 ? -1 : 1;
        pos.setXYZ(i * 2 + index,
          point.x + nx * STRAP_HALF_WIDTH * s,
          point.y + ny * STRAP_HALF_WIDTH * s,
          point.z + .015 * s);
      }
    }
    pos.needsUpdate = true;
    geometry.computeVertexNormals();
  });

  useEffect(() => () => { geometry.dispose(); texture.dispose(); }, [geometry, texture]);
  return (
    <mesh geometry={geometry} castShadow>
      <meshStandardMaterial map={texture} color="#f4f4f4" roughness={.91} metalness={0} side={THREE.DoubleSide} />
    </mesh>
  );
}

function HangingId({ onGrabChange, reduceMotion: _reduceMotion }: { onGrabChange: (value: boolean) => void; reduceMotion: boolean }) {
  // Viewport is calculated in 3D world units, so drag distance stays accurate
  // at every desktop/mobile width instead of hitting a small fixed ±1.55 cap.
  const { viewport } = useThree();
  const dragLimit = Math.max(.01, viewport.width / 2 - BADGE_WIDTH / 2 - .12);
  const metalGroup = useRef<THREE.Group>(null);
  const badgeSwing = useRef<THREE.Group>(null);
  const badgeFlip = useRef<THREE.Group>(null);
  const hanger = useRef<HangerPosition>({ x: 0, y: 0 });
  const motion = useRef<MotionState>({ x: 0, y: 0, vx: 0, vy: 0, targetX: 0, targetY: 0, angle: 0, angularSpeed: 0 });
  const dragging = useRef({ active: false, pointerId: -1, clientX: 0, clientY: 0, startX: 0, startY: 0, moved: false, lastX: 0, lastY: 0, lastTime: 0 });
  const [flipped, setFlipped] = useState(false);
  const [frontTexture, backTexture] = useLoader(THREE.TextureLoader, [badgeFront, badgeBack]);
  const shape = useMemo(() => makeCardShape(), []);
  const faceGeometry = useMemo(() => makeFaceGeometry(shape), [shape]);

  useEffect(() => {
    for (const texture of [frontTexture, backTexture]) {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 8;
      texture.needsUpdate = true;
    }
    return () => faceGeometry.dispose();
  }, [frontTexture, backTexture, faceGeometry]);

  useEffect(() => {
    const onMove = (evt: PointerEvent) => {
      const state = dragging.current;
      if (!state.active || evt.pointerId !== state.pointerId) return;
      const canvas = document.querySelector<HTMLCanvasElement>('.lanyard-drag-canvas canvas');
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dx = evt.clientX - state.clientX;
      const dy = evt.clientY - state.clientY;
      state.moved = state.moved || Math.hypot(dx, dy) > 8;
      // Map cursor pixels to the actual full-width 3D viewport.
      const nextX = clamp(state.startX + dx / rect.width * viewport.width, -dragLimit, dragLimit);
      const nextY = clamp(state.startY - dy / rect.height * viewport.height, -1.02, .85);
      const t = performance.now();
      const dt = Math.max((t - state.lastTime) / 1000, .012);
      const m = motion.current;
      m.vx = clamp((nextX - state.lastX) / dt, -3.5, 3.5);
      m.vy = clamp((nextY - state.lastY) / dt, -3, 3);
      m.targetX = nextX;
      m.targetY = nextY;
      state.lastX = nextX;
      state.lastY = nextY;
      state.lastTime = t;
    };
    const release = (evt: PointerEvent) => {
      const state = dragging.current;
      if (!state.active || evt.pointerId !== state.pointerId) return;
      state.active = false;
      onGrabChange(false);
      const m = motion.current;
      // Preserve the exact current position for the next interaction. The previous
      // drag target must never be reused when the visitor clicks again mid-swing.
      m.targetX = m.x;
      m.targetY = m.y;
      if (!state.moved) {
        // Clicking flips the badge in place; it must not create sideways motion.
        setFlipped(value => !value);
        m.vx = 0;
        m.vy = 0;
        m.angularSpeed *= .4;
      } else {
        // Let go with a gentle, bounded sway instead of a sudden sideward throw.
        // Pointer velocity can spike if the last pointer event arrives very late.
        if (performance.now() - state.lastTime > 100) {
          m.vx = 0;
          m.vy = 0;
        } else {
          m.vx = clamp(m.vx * .2, -.7, .7);
          m.vy = clamp(m.vy * .2, -.6, .6);
        }
        m.angularSpeed += clamp(m.vx * -.25, -.28, .28);
      }
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerup', release);
    window.addEventListener('pointercancel', release);
    const onBlur = () => {
      dragging.current.active = false;
      onGrabChange(false);
    };
    window.addEventListener('blur', onBlur);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', release);
      window.removeEventListener('pointercancel', release);
      window.removeEventListener('blur', onBlur);
    };
  }, [onGrabChange, dragLimit, viewport.width, viewport.height]);

  const onGrab = (event: ThreeEvent<PointerEvent>) => {
    if (event.button !== 0 || dragging.current.active) return;
    event.stopPropagation();
    const e = event.nativeEvent;
    dragging.current = {
      active: true, pointerId: event.pointerId,
      clientX: e.clientX, clientY: e.clientY,
      startX: motion.current.x, startY: motion.current.y,
      lastX: motion.current.x, lastY: motion.current.y,
      moved: false, lastTime: performance.now(),
    };
    // A re-grab may happen while the spring is still returning from the previous
    // drag. Rebase the target to the card's ACTUAL position, not its stale target.
    // Otherwise the first frame of a click jumps to the former drag endpoint.
    motion.current.targetX = motion.current.x;
    motion.current.targetY = motion.current.y;
    motion.current.vx = 0;
    motion.current.vy = 0;
    onGrabChange(true);
  };

  useFrame((_, delta) => {
    const dt = Math.min(delta, .035);
    const m = motion.current;
    if (dragging.current.active) {
      m.x = THREE.MathUtils.damp(m.x, m.targetX, 26, dt);
      m.y = THREE.MathUtils.damp(m.y, m.targetY, 26, dt);
    } else {
      // Close to critically damped: return to center smoothly even after a
      // full-width drag. The older underdamped spring could overshoot sideways.
      m.vx += (-m.x * 16 - m.vx * 8) * dt;
      m.vy += (-m.y * 18 - m.vy * 8.5) * dt;
      m.x += m.vx * dt;
      m.y += m.vy * dt;
      // Keep the badge within the display while its spring settles.
      if (Math.abs(m.x) > dragLimit) {
        m.x = clamp(m.x, -dragLimit, dragLimit);
        m.vx *= -.16;
      }
      if (Math.abs(m.x) < .001 && Math.abs(m.vx) < .001) { m.x = 0; m.vx = 0; }
      if (Math.abs(m.y) < .001 && Math.abs(m.vy) < .001) { m.y = 0; m.vy = 0; }
    }
    hanger.current.x = m.x;
    hanger.current.y = m.y;
    if (metalGroup.current) {
      metalGroup.current.position.set(m.x, HOME_CLIP_HEIGHT + m.y, .05);
      metalGroup.current.rotation.z = -m.x * .085;
      metalGroup.current.rotation.y = -m.x * .04;
    }
    const swayForce = -m.angle * 8.0 - m.angularSpeed * 2.2;
    m.angularSpeed += swayForce * dt;
    m.angle = clamp(m.angle + m.angularSpeed * dt, -.34, .34);
    if (badgeSwing.current) {
      // Keep the ID perfectly straight at rest.
      // Swing only comes from actual drag / release physics, not an idle tilt.
      badgeSwing.current.rotation.z = m.angle - m.x * .095;
      badgeSwing.current.rotation.x = -m.y * .035;
      badgeSwing.current.rotation.y = m.x * -.045;
    }
    if (badgeFlip.current) {
      badgeFlip.current.rotation.y = THREE.MathUtils.damp(badgeFlip.current.rotation.y, flipped ? Math.PI : 0, 7.0, dt);
    }
  });

  return (
    <>
      <ambientLight intensity={1.3} />
      <hemisphereLight args={['#ffffff', '#22254b', 1.45]} />
      <directionalLight position={[3, 6, 8]} intensity={2.0} />
      <pointLight position={[-4, 2, 3]} intensity={12} distance={11} color="#d5c4ff" />
      <pointLight position={[4, -1, 5]} intensity={8} distance={11} color="#94b9ff" />

      <FabricLanyard side={-1} hanger={hanger} />
      <FabricLanyard side={1} hanger={hanger} />

      {/* The complete metal swivel and badge move as one hanging object. */}
      <group ref={metalGroup}>
        <mesh position={[0, .015, .11]} castShadow>
          <boxGeometry args={[.43, .22, .13]} />
          <meshStandardMaterial color="#9ca6b3" metalness={.92} roughness={.23} />
        </mesh>
        <mesh position={[0, -.18, .13]}>
          <torusGeometry args={[.175, .043, 12, 34]} />
          <meshStandardMaterial color="#d8dfe6" metalness={.94} roughness={.17} />
        </mesh>
        <mesh position={[0, -.31, .12]}>
          <capsuleGeometry args={[.064, .20, 6, 16]} />
          <meshStandardMaterial color="#b6c0cb" metalness={.95} roughness={.2} />
        </mesh>
        <group ref={badgeSwing} position={[0, -.37, .02]}>
          <group ref={badgeFlip} position={[0, -1.76, 0]} onPointerDown={onGrab}>
            {/* A single rounded outline is shared by both ID faces.
                No independently scaled rim layers: those were visible as
                unequal white/dark strips, especially after flipping the ID. */}
            <mesh geometry={faceGeometry} position={[0, 0, .003]}>
              <meshBasicMaterial map={frontTexture} toneMapped={false} side={THREE.FrontSide} />
            </mesh>
            <mesh geometry={faceGeometry} position={[0, 0, -.003]} rotation={[0, Math.PI, 0]}>
              <meshBasicMaterial map={backTexture} toneMapped={false} side={THREE.FrontSide} />
            </mesh>
            {/* Reinforced slot at the top of the ID holder */}
            <mesh position={[0, BADGE_HEIGHT / 2 - .118, .024]}>
              <boxGeometry args={[.46, .08, .028]} />
              <meshStandardMaterial metalness={.92} roughness={.22} color="#d5dce2" />
            </mesh>
            <mesh position={[0, BADGE_HEIGHT / 2 - .118, .046]}>
              <boxGeometry args={[.31, .036, .008]} />
              <meshBasicMaterial color="#11151b" />
            </mesh>
          </group>
        </group>
      </group>
    </>
  );
}

/** A draggable accessible 2D fallback for no-WebGL browsers and reduced motion. */
function FallbackBadge() {
  const [flipped, setFlipped] = useState(false);
  const [shift, setShift] = useState({ x: 0, y: 0, rotation: 0 });
  const start = useRef({ active: false, x: 0, y: 0, startX: 0, startY: 0, moved: false });
  const [held, setHeld] = useState(false);
  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (!start.current.active) return;
      const dx = e.clientX - start.current.x;
      const dy = e.clientY - start.current.y;
      if (Math.hypot(dx, dy) > 7) start.current.moved = true;
      const stage = document.querySelector<HTMLElement>('.hero-stage-lanyard-only');
      const card = stage?.querySelector<HTMLElement>('.lanyard-fallback-id');
      const available = stage?.clientWidth ?? window.innerWidth;
      const badgeSize = card?.offsetWidth ?? 300;
      const limit = Math.max(42, (available - badgeSize) / 2 - 12);
      const moveX = clamp(start.current.startX + dx, -limit, limit);
      setShift({ x: moveX, y: clamp(start.current.startY + dy, -105, 110), rotation: clamp(moveX / 17, -18, 18) });
    };
    const finish = () => {
      if (!start.current.active) return;
      if (!start.current.moved) setFlipped(current => !current);
      start.current.active = false;
      setHeld(false);
      setShift({ x: 0, y: 0, rotation: 0 });
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', finish);
    window.addEventListener('pointercancel', finish);
    return () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', finish); window.removeEventListener('pointercancel', finish); };
  }, []);

  return (
    <div className="lanyard-fallback">
      {/* Two fabric straps hang from the top center, bending with the dragged clasp. */}
      <svg className="lanyard-fallback-ribbons" viewBox="0 0 1000 700" preserveAspectRatio="none" aria-hidden="true">
        {([-1, 1] as const).map(side => {
          const toX = 500 + shift.x / Math.max(1, window.innerWidth) * 1000;
          const toY = 230 + shift.y / Math.max(1, window.innerHeight) * 700;
          const path = `M ${500 + side * 45} -55 C ${500 + side * 112} 30, ${500 + side * 94 + (toX - 500) * .38} 138, ${toX + side * 8} ${toY}`;
          return <g key={side}>
            <path d={path} stroke="#bda7ff" strokeWidth="28" fill="none" />
            <path d={path} stroke="#242a32" strokeWidth="21" fill="none" />
            <path d={path} stroke="#727780" strokeWidth="1" fill="none" strokeDasharray="3 8" />
          </g>;
        })}
      </svg>
      <span className="lanyard-fallback-clip" style={{ transform: `translate(${shift.x}px, ${shift.y}px)` }} />
      <button
        type="button"
        className={`lanyard-fallback-id ${held ? 'is-held' : ''}`}
        style={{ transform: `translate(${shift.x}px, ${shift.y + 60}px) rotate(${shift.rotation}deg)` }}
        onPointerDown={e => {
          if (e.button !== 0) return;
          // Capture the computed (currently visible) transform before interrupting
          // a CSS return animation. Without this, re-grabbing makes the ID snap.
          const matrix = new DOMMatrixReadOnly(getComputedStyle(e.currentTarget).transform);
          const x = matrix.m41;
          const y = matrix.m42 - 60;
          const rotation = Math.atan2(matrix.m12, matrix.m11) * 180 / Math.PI;
          start.current = {
            active: true, x: e.clientX, y: e.clientY,
            startX: x, startY: y, moved: false,
          };
          setShift({ x, y, rotation });
          setHeld(true);
        }}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setFlipped(v => !v); }}
        aria-label={flipped ? 'Show front of ID badge' : 'View back of ID badge'}
      >
        <img src={flipped ? badgeBack : badgeFront} alt={`${profile.fullName} portfolio ID`} draggable={false} />
      </button>
    </div>
  );
}

export default function ThreeHeroStage() {
  const stage = useRef<HTMLDivElement>(null);
  const [webGL, setWebGL] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [active, setActive] = useState(true);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(media.matches);
    try {
      const canvas = document.createElement('canvas');
      setWebGL(Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl')));
    } catch { setWebGL(false); }
  }, []);
  useEffect(() => {
    if (!stage.current || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { threshold: .02 });
    observer.observe(stage.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={stage} className={`hero-stage hero-stage-lanyard-only ${dragging ? 'lanyard-is-dragging' : ''}`}>
      <div className="lanyard-drag-canvas" role="img" aria-label={`Draggable 3D office lanyard with ${profile.fullName}'s portfolio ID. Drag the ID with your mouse, release to swing, or click to flip.`}>
        {webGL && !reducedMotion ? (
          <Canvas camera={{ position: [0, .22, 10.4], fov: 35 }} dpr={[1, 1.5]} frameloop={active ? 'always' : 'demand'} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}>
            <Suspense fallback={null}>
              <HangingId onGrabChange={setDragging} reduceMotion={reducedMotion} />
            </Suspense>
          </Canvas>
        ) : <FallbackBadge />}
      </div>
    </div>
  );
}
