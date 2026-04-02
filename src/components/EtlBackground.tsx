"use client";

const SI   = "https://cdn.simpleicons.org";
const HEX  = "22d3ee";          // cyan-400
const CYAN = "rgba(34,211,238,";

const NW   = 46;   // node box width
const NH   = 46;   // node box height
const ICO  = 22;   // icon image size
const LBL  = 13;   // gap from box bottom to label baseline

// ── Custom icons (for types without a Simple Icons entry) ──────────────────────

/** Stacked layers — used for Iceberg */
function LayersIcon({ cx, cy, col }: { cx: number; cy: number; col: string }) {
  const pairs: [number, number][] = [
    [-14, -6], [14, -6],
    [-14,  0], [14,  0],
    [-14,  6], [14,  6],
  ];
  return (
    <g>
      {([[-6], [0], [6]] as [number][]).map(([dy], i) => (
        <path key={i}
          d={`M ${cx - 14} ${cy + dy} L ${cx} ${cy + dy - 4} L ${cx + 14} ${cy + dy} L ${cx} ${cy + dy + 4} Z`}
          fill={`${CYAN}${0.08 + i * 0.03})`}
          stroke={col} strokeWidth="1.2"
        />
      ))}
    </g>
  );
}

/** Database cylinder — used for Oracle RAC */
function CylinderIcon({ cx, cy, col }: { cx: number; cy: number; col: string }) {
  const w = 18, h = 20, ry = 4;
  return (
    <g>
      <rect x={cx - w / 2} y={cy - h / 2 + ry} width={w} height={h - ry}
        fill={`${CYAN}0.08)`} stroke={col} strokeWidth="1.4" />
      <ellipse cx={cx} cy={cy - h / 2 + ry} rx={w / 2} ry={ry}
        fill={`${CYAN}0.14)`} stroke={col} strokeWidth="1.4" />
      <ellipse cx={cx} cy={cy - h / 2 + ry * 2.6} rx={w / 2} ry={ry}
        fill="none" stroke={col} strokeWidth="0.9" strokeOpacity="0.55" />
    </g>
  );
}

/** Folder icon — used for Files / S3 */
function FolderIcon({ cx, cy, col }: { cx: number; cy: number; col: string }) {
  const w = 22, h = 16, tab = 8, tabH = 4;
  return (
    <g>
      {/* tab */}
      <path
        d={`M ${cx - w / 2} ${cy - h / 2} L ${cx - w / 2 + tab} ${cy - h / 2} L ${cx - w / 2 + tab + 4} ${cy - h / 2 - tabH} L ${cx - w / 2 + tab + 4 + tab} ${cy - h / 2 - tabH} L ${cx - w / 2 + tab + 4 + tab} ${cy - h / 2} L ${cx + w / 2} ${cy - h / 2}`}
        fill="none" stroke={col} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
      />
      {/* body */}
      <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx="2"
        fill={`${CYAN}0.08)`} stroke={col} strokeWidth="1.4" />
      {/* lines inside */}
      {[-3, 3].map(dy => (
        <line key={dy}
          x1={cx - w / 2 + 4} y1={cy + dy}
          x2={cx + w / 2 - 4} y2={cy + dy}
          stroke={col} strokeWidth="0.9" strokeOpacity="0.6"
        />
      ))}
    </g>
  );
}

/** </> bracket — used for REST API */
function BracketIcon({ cx, cy, col }: { cx: number; cy: number; col: string }) {
  return (
    <g>
      {/* < */}
      <polyline points={`${cx - 7},${cy - 6} ${cx - 13},${cy} ${cx - 7},${cy + 6}`}
        fill="none" stroke={col} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      {/* > */}
      <polyline points={`${cx + 7},${cy - 6} ${cx + 13},${cy} ${cx + 7},${cy + 6}`}
        fill="none" stroke={col} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      {/* / */}
      <line x1={cx + 4} y1={cy - 8} x2={cx - 4} y2={cy + 8}
        stroke={col} strokeWidth="1.8" strokeLinecap="round" />
    </g>
  );
}

// ── Node renderer ──────────────────────────────────────────────────────────────
type NodeDef = {
  x: number; y: number; label: string;
  siSlug?: string;   // Simple Icons slug → uses <image>
  custom?: "layers" | "bracket" | "cylinder" | "folder";
};

function Node({ n, col, lblCol }: { n: NodeDef; col: string; lblCol: string }) {
  const { x: cx, y: cy, label, siSlug, custom } = n;
  return (
    <g>
      {/* Box */}
      <rect
        x={cx - NW / 2} y={cy - NH / 2} width={NW} height={NH} rx="8"
        fill={`${CYAN}0.06)`} stroke={col} strokeWidth="1.5"
      />

      {/* Icon — brand image */}
      {siSlug && (
        <image
          href={`${SI}/${siSlug}/${HEX}`}
          x={cx - ICO / 2} y={cy - ICO / 2} width={ICO} height={ICO}
        />
      )}

      {/* Icon — custom SVG */}
      {custom === "layers"   && <LayersIcon   cx={cx} cy={cy} col={col} />}
      {custom === "bracket"  && <BracketIcon  cx={cx} cy={cy} col={col} />}
      {custom === "cylinder" && <CylinderIcon cx={cx} cy={cy} col={col} />}
      {custom === "folder"   && <FolderIcon   cx={cx} cy={cy} col={col} />}

      {/* Label */}
      <text
        x={cx} y={cy + NH / 2 + LBL}
        textAnchor="middle" fill={lblCol}
        fontSize="9.5" fontFamily="sans-serif"
      >{label}</text>
    </g>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function EtlBackground() {
  const W = 1440, H = 860;

  const col    = `${CYAN}0.6)`;
  const linCol = `${CYAN}0.22)`;
  const lblCol = `${CYAN}0.38)`;

  const src: NodeDef[] = [
    { x: 148, y: 148, label: "PostgreSQL",  siSlug: "postgresql" },
    { x: 148, y: 276, label: "Oracle RAC",  custom: "cylinder"   },
    { x: 148, y: 404, label: "MySQL",       siSlug: "mysql"      },
    { x: 148, y: 532, label: "REST API",    custom: "bracket"    },
    { x: 148, y: 660, label: "Files / S3",  custom: "folder"     },
  ];
  const kafka: NodeDef = { x: 520, y: 404, label: "Kafka Connect", siSlug: "apachekafka" };
  const proc: NodeDef[] = [
    { x: 882, y: 296, label: "Apache Flink", siSlug: "apacheflink" },
    { x: 882, y: 512, label: "PySpark",      siSlug: "apachespark"  },
  ];
  const sink: NodeDef[] = [
    { x: 1272, y: 186, label: "Iceberg",    custom: "layers"        },
    { x: 1272, y: 344, label: "Delta Lake", siSlug: "databricks"    },
    { x: 1272, y: 502, label: "Databricks", siSlug: "databricks"    },
    { x: 1272, y: 660, label: "Snowflake",  siSlug: "snowflake"     },
  ];

  const bez = (x1: number, y1: number, x2: number, y2: number) => {
    const mx = (x1 + x2) / 2;
    return `M ${x1} ${y1} C ${mx} ${y1} ${mx} ${y2} ${x2} ${y2}`;
  };
  const ex = NW / 2; // edge offset from centre

  type P = { d: string; dur: number; delay: number };
  const paths: P[] = [];

  src.forEach((s, i) =>
    paths.push({ d: bez(s.x + ex, s.y, kafka.x - ex, kafka.y), dur: 3.4 + i * 0.28, delay: i * 0.45 })
  );
  proc.forEach((p, i) =>
    paths.push({ d: bez(kafka.x + ex, kafka.y, p.x - ex, p.y), dur: 2.1 + i * 0.35, delay: 0.2 + i * 0.6 })
  );
  proc.forEach((p, pi) =>
    sink.forEach((s, si) =>
      paths.push({ d: bez(p.x + ex, p.y, s.x - ex, s.y), dur: 2.6 + (pi * 4 + si) * 0.18, delay: (pi * 4 + si) * 0.22 })
    )
  );

  const allNodes = [...src, kafka, ...proc, ...sink];

  return (
    <svg
      aria-hidden
      className="etlBg"
      style={{
        position: "fixed", inset: 0, width: "100%", height: "100%",
        pointerEvents: "none", zIndex: 0, opacity: 0.55,
      }}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {paths.map((p, i) => <path key={i} id={`ep${i}`} d={p.d} />)}
        <radialGradient id="etl-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#22d3ee" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0"    />
        </radialGradient>
      </defs>

      {/* Kafka glow */}
      <ellipse cx={kafka.x} cy={kafka.y} rx={130} ry={110} fill="url(#etl-glow)" />

      {/* Connection lines */}
      {paths.map((_, i) => (
        <use key={i} href={`#ep${i}`} stroke={linCol} strokeWidth="1.5" fill="none" />
      ))}

      {/* Flowing particles */}
      {paths.flatMap((p, i) =>
        [0, 0.5].map(offset => (
          <circle key={`${i}-${offset}`} r="2.6" fill="#22d3ee" opacity="0.9">
            <animateMotion
              dur={`${p.dur}s`}
              repeatCount="indefinite"
              begin={`${p.delay + offset * p.dur}s`}
            >
              <mpath href={`#ep${i}`} />
            </animateMotion>
          </circle>
        ))
      )}

      {/* Stage labels */}
      {[
        { x: 148,  y: 68,  label: "SOURCES" },
        { x: 520,  y: 308, label: "INGEST"  },
        { x: 882,  y: 210, label: "PROCESS" },
        { x: 1272, y: 98,  label: "SINK"    },
      ].map((l, i) => (
        <text key={i} x={l.x} y={l.y} textAnchor="middle"
          fill={`${CYAN}0.28)`} fontSize="9" fontFamily="sans-serif"
          fontWeight="700" letterSpacing="0.12em"
        >{l.label}</text>
      ))}

      {/* Nodes */}
      {allNodes.map((n) => (
        <Node key={n.label} n={n} col={col} lblCol={lblCol} />
      ))}
    </svg>
  );
}
