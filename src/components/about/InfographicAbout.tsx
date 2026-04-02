"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./about.module.scss";

// ─── Types ────────────────────────────────────────────────────────────────────
type Certification = {
  name: string;
  url: string;
};

type Experience = {
  company: string;
  role: string;
  timeframe: string;
  summary: React.ReactNode;
  achievements: React.ReactNode[];
  tags?: { name: string; icon?: string }[];
};

// ─── Group config (6 spokes) ──────────────────────────────────────────────────
const GROUPS = [
  { id: "arch",       label: "Data Architecture\n& Engineering",       color: "#0e7490", dot: "#06b6d4", indices: [0, 1, 2]    },
  { id: "cloud",      label: "Cloud &\nInfrastructure",                 color: "#0d9488", dot: "#14b8a6", indices: [4, 5]       },
  { id: "aiml",       label: "AI / ML, Analytics\n& BI",                color: "#6d28d9", dot: "#8b5cf6", indices: [7]          },
  { id: "leadership", label: "Leadership &\nPre-Sales",                 color: "#c2410c", dot: "#f97316", indices: [9, 10]      },
  { id: "training",   label: "Training &\nPublications",                color: "#991b1b", dot: "#ef4444", indices: [11, 12]     },
  { id: "ops",        label: "Streaming, DevOps\n& Governance",         color: "#1d4ed8", dot: "#3b82f6", indices: [3, 6, 8]    },
] as const;

// ─── SVG geometry ─────────────────────────────────────────────────────────────
const W = 1000, H = 680;
const CX = W / 2, CY = H / 2;
const R_RING = 145;

const NODE_POS = [
  { x: 500, y: 62  },
  { x: 822, y: 178 },
  { x: 822, y: 502 },
  { x: 500, y: 618 },
  { x: 178, y: 502 },
  { x: 178, y: 178 },
];

function ringEdge(nx: number, ny: number) {
  const dx = nx - CX, dy = ny - CY;
  const len = Math.sqrt(dx * dx + dy * dy);
  return { x: CX + (dx / len) * R_RING, y: CY + (dy / len) * R_RING };
}

// ─── Modal panel ──────────────────────────────────────────────────────────────
type ModalContent =
  | { kind: "group"; group: (typeof GROUPS)[number] & { items: Experience[] } }
  | { kind: "certs"; certifications: Certification[] };

function Modal({ content, onClose }: { content: ModalContent; onClose: () => void }) {
  const color = content.kind === "group" ? content.group.color : "#d14b2f";

  return (
    <div className={styles.backdrop} onClick={onClose} role="dialog" aria-modal="true">
      <div
        className={styles.modal}
        style={{ "--modal-color": color } as React.CSSProperties}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={styles.modalHeader}>
          <span className={styles.modalDot} />
          <h2 className={styles.modalTitle}>
            {content.kind === "group"
              ? content.group.label.replace(/\n/g, " ")
              : "Certifications"}
          </h2>
          <button type="button" className={styles.modalClose} onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        {/* Body */}
        <div className={styles.modalBody}>
          {content.kind === "certs" ? (
            <ul className={styles.certList}>
              {content.certifications.map((cert, i) => (
                <li key={i} className={styles.certItem}>
                  <a href={cert.url} target="_blank" rel="noopener noreferrer" className={styles.certLink}>
                    {cert.name} <span className={styles.certArrow}>↗</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            content.group.items.map((exp, i) => (
              <div key={i} className={styles.expBlock}>
                <h3 className={styles.expTitle}>{exp.company}</h3>
                <p className={styles.expMeta}>{exp.role} · {exp.timeframe}</p>
                {exp.summary && (
                  <div className={styles.expSummary}>{exp.summary}</div>
                )}
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className={styles.achList}>
                    {exp.achievements.map((ach, ai) => (
                      <li key={ai}>{ach}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function InfographicAbout({
  name, role, avatar, experiences, certifications,
}: {
  name: string; role: string; avatar: string;
  experiences: Experience[]; certifications: Certification[];
}) {
  const [modal, setModal] = useState<ModalContent | null>(null);

  const groups = GROUPS.map((g) => ({
    ...g,
    items: g.indices.map((i) => experiences[i]).filter(Boolean),
  }));

  return (
    <div className={styles.wrap}>
      {/* ══ Desktop radial diagram ══ */}
      <div className={styles.diagram}>
        <svg viewBox={`0 0 ${W} ${H}`} className={styles.diagramSvg} aria-hidden="true" preserveAspectRatio="xMidYMid meet">
          {/* Outer dashed guide ring */}
          <circle cx={CX} cy={CY} r="220" fill="none" stroke="rgba(148,163,184,0.13)" strokeWidth="1" strokeDasharray="5 5" />
          {/* Connector lines (drawn first, masked later) */}
          {NODE_POS.map((p, i) => {
            const from = ringEdge(p.x, p.y);
            return (
              <line key={i} x1={from.x} y1={from.y} x2={p.x} y2={p.y}
                stroke={groups[i]?.color ?? "#64748b"} strokeWidth="2"
                strokeDasharray="7 5" opacity="0.55" />
            );
          })}
          {/* Filled mask circle — covers line stubs at center */}
          <circle cx={CX} cy={CY} r={R_RING - 1} className={styles.hubMask} />
          {/* Decorative ring border drawn on top */}
          <circle cx={CX} cy={CY} r={R_RING + 6} fill="none" stroke="var(--accent-solid-strong, #d14b2f)" strokeWidth="2" />
        </svg>

        {/* Profile hub */}
        <div className={styles.hub}>
          <Image src={avatar} alt={name} width={132} height={132} className={styles.hubPhoto} priority />
          <strong className={styles.hubName}>{name}</strong>
          <span className={styles.hubRole}>{role}</span>
          <button
            type="button"
            className={styles.hubCertsBtn}
            onClick={() => setModal({ kind: "certs", certifications })}
          >
            {certifications.length} Certifications ↗
          </button>
        </div>

        {/* Spoke nodes */}
        {groups.map((group, i) => {
          const p = NODE_POS[i];
          return (
            <button
              key={group.id}
              type="button"
              className={styles.spoke}
              style={{ left: `${(p.x / W) * 100}%`, top: `${(p.y / H) * 100}%`, "--spoke-color": group.color, "--spoke-dot": group.dot } as React.CSSProperties}
              onClick={() => setModal({ kind: "group", group })}
            >
              <span className={styles.spokeDot} />
              <span className={styles.spokeTitle}>{group.label}</span>
              <div className={styles.spokePills}>
                {group.items.slice(0, 2).map((exp, ei) => (
                  <span key={ei} className={styles.spokePill}>{exp.company}</span>
                ))}
                {group.items.length > 2 && (
                  <span className={styles.spokePill}>+{group.items.length - 2} more</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* ══ Mobile card list ══ */}
      <div className={styles.mobileGrid}>
        <div className={styles.mobileProfile}>
          <Image src={avatar} alt={name} width={72} height={72} className={styles.mobilePhoto} />
          <div>
            <strong className={styles.mobileName}>{name}</strong>
            <span className={styles.mobileRole}>{role}</span>
            <button type="button" className={styles.hubCertsBtn} onClick={() => setModal({ kind: "certs", certifications })}>
              {certifications.length} Certifications ↗
            </button>
          </div>
        </div>
        {groups.map((group) => (
          <button
            key={group.id}
            type="button"
            className={styles.mobileCard}
            style={{ "--spoke-color": group.color, "--spoke-dot": group.dot } as React.CSSProperties}
            onClick={() => setModal({ kind: "group", group })}
          >
            <span className={styles.spokeDot} />
            <strong className={styles.mobileCardTitle}>{group.label.replace(/\n/g, " ")}</strong>
            <ul className={styles.mobileCardList}>
              {group.items.map((exp, i) => <li key={i}>{exp.company}</li>)}
            </ul>
          </button>
        ))}
      </div>

      {/* ══ Modal ══ */}
      {modal && <Modal content={modal} onClose={() => setModal(null)} />}
    </div>
  );
}
