// Lightweight stand-in for the Three.js hero scene on small/low-power screens.
// Pure SVG + CSS — no WebGL context, no Three.js bundle, no per-frame JS work.
// Respects prefers-reduced-motion via the global rule in index.css.

const nodes = [
  { x: 200, y: 90 }, { x: 120, y: 150 }, { x: 280, y: 140 },
  { x: 80, y: 230 }, { x: 200, y: 200 }, { x: 320, y: 220 },
  { x: 150, y: 290 }, { x: 250, y: 300 }, { x: 200, y: 360 },
];

const edges: [number, number][] = [
  [0, 1], [0, 2], [1, 4], [2, 4], [1, 3], [2, 5],
  [3, 4], [4, 5], [3, 6], [5, 7], [4, 6], [4, 7],
  [6, 8], [7, 8], [6, 7],
];

export default function HeroSceneFallback() {
  return (
    <svg
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid slice"
      className="w-full h-full hero-fallback-pulse"
      aria-hidden="true"
    >
      <g stroke="#159A9C" strokeWidth="1" opacity="0.18">
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
          />
        ))}
      </g>
      <g fill="#3157D5">
        {nodes.map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r={i === 4 ? 4 : 2.5} opacity="0.75" />
        ))}
      </g>
      <polygon
        points="200,150 260,190 240,260 160,260 140,190"
        fill="none"
        stroke="#3157D5"
        strokeWidth="1"
        opacity="0.12"
      />
    </svg>
  );
}
