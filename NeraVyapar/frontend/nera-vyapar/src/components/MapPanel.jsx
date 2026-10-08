/**
 * Small map-style panel: a schematic route line with waypoints and a truck marker.
 * Purely illustrative; swap for a real map component when an API is wired in.
 */
const waypoints = [
  { name: 'Hubballi', x: 40, y: 150 },
  { name: 'Haveri', x: 130, y: 120 },
  { name: 'Davanagere', x: 235, y: 95 },
  { name: 'Chitradurga', x: 340, y: 100 },
  { name: 'Tumakuru', x: 450, y: 60 },
  { name: 'Bengaluru', x: 560, y: 80 },
];

function pointAt(progress) {
  const total = waypoints.length - 1;
  const pos = (Math.min(100, Math.max(0, progress)) / 100) * total;
  const i = Math.min(Math.floor(pos), total - 1);
  const f = pos - i;
  const a = waypoints[i];
  const b = waypoints[i + 1];
  return { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f };
}

export default function MapPanel({ progress = 0 }) {
  const path = waypoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const done = pointAt(progress);
  const donePath =
    path.split(' ').slice(0, Math.max(1, Math.floor((progress / 100) * (waypoints.length - 1)) + 1)).join(' ') +
    ` L${done.x},${done.y}`;

  return (
    <div className="overflow-hidden rounded-lg border border-navy-100 bg-navy-50">
      <svg viewBox="0 0 600 200" className="h-auto w-full" role="img" aria-label="Route overview">
        <defs>
          <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M30 0H0V30" fill="none" stroke="#dde2ea" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="600" height="200" fill="url(#grid)" />

        <path d={path} fill="none" stroke="#c9d1dc" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1 0" />
        <path d={donePath} fill="none" stroke="#2f855a" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />

        {waypoints.map((p, i) => (
          <g key={p.name}>
            <circle cx={p.x} cy={p.y} r={i === 0 || i === waypoints.length - 1 ? 7 : 4} fill="#fff" stroke="#0e1621" strokeWidth="2" />
            <text
              x={p.x}
              y={p.y + 22}
              textAnchor={i === 0 ? 'start' : i === waypoints.length - 1 ? 'end' : 'middle'}
              dx={i === 0 ? -8 : i === waypoints.length - 1 ? 8 : 0}
              fontSize="12"
              fill="#34445c"
              fontFamily="Inter, sans-serif"
            >
              {p.name}
            </text>
          </g>
        ))}

        <g transform={`translate(${done.x},${done.y})`}>
          <circle r="11" fill="#0e1621" />
          <path d="M-5 -3h6v6h-6zM1 -1h3l2 2v2h-5z" fill="#fff" transform="scale(0.9) translate(-0.5,-0.5)" />
        </g>
      </svg>
    </div>
  );
}
