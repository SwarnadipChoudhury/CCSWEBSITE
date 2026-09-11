import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useScroll } from 'framer-motion';
import * as THREE from 'three';
import { getActiveDomain } from '@/lib/networkState';

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function isCoarsePointer() {
  return typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
}

// --- Formation generators ---------------------------------------------
// Each returns a flat [x0,y0,z0, x1,y1,z1, ...] array of node positions.
// The same node set blends between these as the page scrolls, which is
// what makes it read as one continuous world rather than separate
// decorations bolted onto each section.

function sphereFormation(n: number, radius: number, spread: number): Float32Array {
  const arr = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = radius * (1 - spread + Math.random() * spread);
    arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    arr[i * 3 + 2] = r * Math.cos(phi);
  }
  return arr;
}

function gridFormation(n: number, extent: number): Float32Array {
  const arr = new Float32Array(n * 3);
  const side = Math.max(2, Math.ceil(Math.cbrt(n)));
  let i = 0;
  for (let x = 0; x < side && i < n; x++) {
    for (let y = 0; y < side && i < n; y++) {
      for (let z = 0; z < side && i < n; z++) {
        arr[i * 3] = (x / (side - 1) - 0.5) * extent * 2 + (Math.random() - 0.5) * 0.35;
        arr[i * 3 + 1] = (y / (side - 1) - 0.5) * extent * 2 + (Math.random() - 0.5) * 0.35;
        arr[i * 3 + 2] = (z / (side - 1) - 0.5) * extent * 2 + (Math.random() - 0.5) * 0.35;
        i++;
      }
    }
  }
  return arr;
}

function helixFormation(n: number, radius: number, height: number, turns: number): Float32Array {
  const arr = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const t = n === 1 ? 0 : i / (n - 1);
    const angle = t * Math.PI * 2 * turns;
    arr[i * 3] = Math.cos(angle) * radius;
    arr[i * 3 + 1] = (t - 0.5) * height;
    arr[i * 3 + 2] = Math.sin(angle) * radius;
  }
  return arr;
}

function offsetSphereFormation(n: number, radius: number, offsetX: number): Float32Array {
  const arr = sphereFormation(n, radius, 0.4);
  for (let i = 0; i < n; i++) arr[i * 3] += offsetX;
  return arr;
}

// Scroll progress (0-1 across the whole page) maps to 7 formations, one
// per major beat of the scroll story specified: hero / about / domains /
// events / projects / community / join. The 8th stop repeats the final
// formation so the network holds its converged shape through the Join CTA
// instead of continuing to morph.
const PHASE_STOPS = [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1];
const PHASE_FORMATION = [0, 1, 2, 3, 4, 5, 6, 6];
const PHASE_OPACITY = [0.85, 0.5, 0.14, 0.14, 0.14, 0.35, 0.85, 0.9];
const PHASE_CAMERA_Z = [8, 9, 10, 9.5, 8.5, 10, 6.5, 5.5];

function lerpScalar(keyframes: number[], progress: number): number {
  for (let i = 0; i < PHASE_STOPS.length - 1; i++) {
    if (progress <= PHASE_STOPS[i + 1] || i === PHASE_STOPS.length - 2) {
      const span = PHASE_STOPS[i + 1] - PHASE_STOPS[i];
      const t = span === 0 ? 0 : (progress - PHASE_STOPS[i]) / span;
      return keyframes[i] + (keyframes[i + 1] - keyframes[i]) * t;
    }
  }
  return keyframes[keyframes.length - 1];
}

const MAX_EDGES = 140;
const EDGE_DISTANCE = 3.2;

function CCSNetworkScene() {
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const lineRef = useRef<THREE.LineSegments>(null);
  const highlightRef = useRef<THREE.Mesh>(null);

  const reduceMotion = useMemo(() => prefersReducedMotion(), []);
  const coarse = useMemo(() => isCoarsePointer(), []);
  const nodeCount = coarse ? 32 : 56;

  const formations = useMemo(
    () => [
      sphereFormation(nodeCount, 3.0, 0.35),
      sphereFormation(nodeCount, 6.0, 0.5),
      gridFormation(nodeCount, 3.5),
      offsetSphereFormation(nodeCount, 3.2, 3.4),
      helixFormation(nodeCount, 3, 7, 2.5),
      sphereFormation(nodeCount, 8, 0.6),
      sphereFormation(nodeCount, 1.3, 0.2),
    ],
    [nodeCount],
  );

  // Live, eased position buffer — what's actually rendered. It chases the
  // scroll-driven target formation each frame instead of snapping to it,
  // which is what makes the transitions read as continuous rather than
  // stepped.
  const current = useMemo(() => new Float32Array(formations[0]), [formations]);
  const target = useMemo(() => new Float32Array(nodeCount * 3), [nodeCount]);
  const linePositions = useMemo(() => new Float32Array(MAX_EDGES * 6), []);

  const mouse = useRef({ x: 0, y: 0 });
  const [visible, setVisible] = useState(true);
  const frameCount = useRef(0);

  useEffect(() => {
    if (coarse || reduceMotion) return;
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [coarse, reduceMotion]);

  useEffect(() => {
    const onChange = () => setVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', onChange);
    return () => document.removeEventListener('visibilitychange', onChange);
  }, []);

  const { scrollYProgress } = useScroll();

  useFrame((state) => {
    if (!visible) return;
    const progress = scrollYProgress.get();

    let bandIndex = PHASE_STOPS.length - 2;
    for (let i = 0; i < PHASE_STOPS.length - 1; i++) {
      if (progress <= PHASE_STOPS[i + 1]) {
        bandIndex = i;
        break;
      }
    }
    const span = PHASE_STOPS[bandIndex + 1] - PHASE_STOPS[bandIndex];
    const localT = span === 0 ? 0 : (progress - PHASE_STOPS[bandIndex]) / span;
    const fromShape = formations[PHASE_FORMATION[bandIndex]];
    const toShape = formations[PHASE_FORMATION[bandIndex + 1]];
    for (let i = 0; i < target.length; i++) {
      target[i] = fromShape[i] + (toShape[i] - fromShape[i]) * localT;
    }

    // Reduced motion: snap directly to the scroll-driven target so the
    // scene still reflects position without a continuous idle animation.
    const ease = reduceMotion ? 1 : 0.045;
    for (let i = 0; i < current.length; i++) {
      current[i] += (target[i] - current[i]) * ease;
    }
    if (pointsRef.current) {
      const attr = pointsRef.current.geometry.getAttribute('position') as THREE.BufferAttribute;
      attr.needsUpdate = true;
    }

    // Throttled edge recompute — O(n^2) over at most 56 nodes is trivial,
    // but there's no need to redo it every single frame.
    frameCount.current++;
    if (lineRef.current && frameCount.current % 6 === 0) {
      let edgeCount = 0;
      for (let i = 0; i < nodeCount && edgeCount < MAX_EDGES; i++) {
        for (let j = i + 1; j < nodeCount && edgeCount < MAX_EDGES; j++) {
          const dx = current[i * 3] - current[j * 3];
          const dy = current[i * 3 + 1] - current[j * 3 + 1];
          const dz = current[i * 3 + 2] - current[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < EDGE_DISTANCE) {
            const base = edgeCount * 6;
            linePositions[base] = current[i * 3];
            linePositions[base + 1] = current[i * 3 + 1];
            linePositions[base + 2] = current[i * 3 + 2];
            linePositions[base + 3] = current[j * 3];
            linePositions[base + 4] = current[j * 3 + 1];
            linePositions[base + 5] = current[j * 3 + 2];
            edgeCount++;
          }
        }
      }
      const attr = lineRef.current.geometry.getAttribute('position') as THREE.BufferAttribute;
      attr.needsUpdate = true;
      lineRef.current.geometry.setDrawRange(0, edgeCount * 2);
    }

    const opacity = lerpScalar(PHASE_OPACITY, progress);
    if (pointsRef.current) {
      (pointsRef.current.material as THREE.PointsMaterial).opacity = opacity * 0.85;
    }
    if (lineRef.current) {
      (lineRef.current.material as THREE.LineBasicMaterial).opacity = opacity * 0.3;
    }

    const camZ = lerpScalar(PHASE_CAMERA_Z, progress);
    state.camera.position.z += (camZ - state.camera.position.z) * 0.06;

    if (groupRef.current && !reduceMotion) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.06;
      const targetRotX = mouse.current.y * 0.12;
      const targetRotZ = -mouse.current.x * 0.1;
      groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.04;
      groupRef.current.rotation.z += (targetRotZ - groupRef.current.rotation.z) * 0.04;
    }

    // Gentle highlight for the domain currently hovered in the Domains
    // section, if any — the tangible link the spec asks for between that
    // section and the network.
    const active = getActiveDomain();
    if (highlightRef.current) {
      if (active !== null && active < nodeCount) {
        highlightRef.current.visible = true;
        highlightRef.current.position.set(current[active * 3], current[active * 3 + 1], current[active * 3 + 2]);
        const s = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.15;
        highlightRef.current.scale.setScalar(s);
      } else {
        highlightRef.current.visible = false;
      }
    }
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={nodeCount} array={current} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.065} color="#3157D5" transparent opacity={0.7} sizeAttenuation />
      </points>
      <lineSegments ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#159A9C" transparent opacity={0.15} />
      </lineSegments>
      <mesh ref={highlightRef} visible={false}>
        <sphereGeometry args={[0.14, 12, 12]} />
        <meshBasicMaterial color="#8AA63F" transparent opacity={0.9} />
      </mesh>
    </group>
  );
}

export default function CCSNetwork() {
  const coarse = useMemo(() => isCoarsePointer(), []);

  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      dpr={coarse ? [1, 1] : [1, 1.5]}
      gl={{ antialias: !coarse, alpha: true }}
      style={{ width: '100%', height: '100%' }}
    >
      <CCSNetworkScene />
    </Canvas>
  );
}
