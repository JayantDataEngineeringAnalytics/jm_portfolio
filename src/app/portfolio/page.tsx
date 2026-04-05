"use client";

import React, { useState } from "react";
import styles from "./portfolio.module.css";
import { PROJECTS, type PortfolioProject } from "./portfolioData";

const ALL_TAGS = ["All", "Data Engineering", "Analytics", "Machine Learning", "Real-Time"];

// ─── Cover icons per project ──────────────────────────────────────────────────

// E-Commerce: rising bar chart with shopping cart tag
function ECommerceIcon({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* 3 ascending bars */}
      <rect x="10" y="62" width="18" height="28" rx="4" fill="white" fillOpacity="0.35"/>
      <rect x="36" y="42" width="18" height="48" rx="4" fill="white" fillOpacity="0.6"/>
      <rect x="62" y="20" width="18" height="70" rx="4" fill="white" fillOpacity="0.88"/>
      {/* Trend line */}
      <polyline points="19,60 45,40 71,18" stroke="white" strokeWidth="2.5" strokeOpacity="0.9" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <circle cx="71" cy="18" r="4.5" fill="white" fillOpacity="0.95"/>
      {/* Shopping cart (top-left) */}
      <path d="M6,8 L10,8 L14,20 L24,20 L26,14 L12,14" stroke="white" strokeWidth="1.8" strokeOpacity="0.65" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="14" cy="23" r="2" fill="white" fillOpacity="0.65"/>
      <circle cx="23" cy="23" r="2" fill="white" fillOpacity="0.65"/>
    </svg>
  );
}

// HR: org-chart hierarchy of person silhouettes
function HRIcon({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Top person */}
      <circle cx="50" cy="16" r="10" fill="white" fillOpacity="0.92"/>
      <path d="M34,40 Q34,28 50,28 Q66,28 66,40Z" fill="white" fillOpacity="0.75"/>
      {/* Vertical stem + horizontal bar */}
      <line x1="50" y1="40" x2="50" y2="52" stroke="white" strokeWidth="2" strokeOpacity="0.5"/>
      <line x1="22" y1="52" x2="78" y2="52" stroke="white" strokeWidth="2" strokeOpacity="0.5"/>
      {/* Left branch */}
      <line x1="22" y1="52" x2="22" y2="62" stroke="white" strokeWidth="2" strokeOpacity="0.5"/>
      <circle cx="22" cy="70" r="8" fill="white" fillOpacity="0.65"/>
      <path d="M11,90 Q11,80 22,80 Q33,80 33,90Z" fill="white" fillOpacity="0.5"/>
      {/* Right branch */}
      <line x1="78" y1="52" x2="78" y2="62" stroke="white" strokeWidth="2" strokeOpacity="0.5"/>
      <circle cx="78" cy="70" r="8" fill="white" fillOpacity="0.65"/>
      <path d="M67,90 Q67,80 78,80 Q89,80 89,90Z" fill="white" fillOpacity="0.5"/>
    </svg>
  );
}

// Healthcare: heart silhouette with ECG line through it
function HealthcareIcon({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Heart */}
      <path d="M50,82 C50,82 12,56 12,32 C12,20 22,12 34,16 C42,19 50,28 50,28 C50,28 58,19 66,16 C78,12 88,20 88,32 C88,56 50,82 50,82Z"
            fill="white" fillOpacity="0.18" stroke="white" strokeWidth="2" strokeOpacity="0.45"/>
      {/* ECG line across the heart */}
      <polyline points="5,50 24,50 30,28 37,72 44,40 51,60 58,50 76,50 95,50"
                stroke="white" strokeWidth="3" strokeOpacity="0.95" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}

// Finance: loan grade bars A→G descending with a risk needle
function FinanceIcon({ size = 56 }: { size?: number }) {
  const bars = [
    { h: 55, op: 0.9 }, // A
    { h: 46, op: 0.8 }, // B
    { h: 38, op: 0.7 }, // C
    { h: 30, op: 0.6 }, // D
    { h: 22, op: 0.5 }, // E
    { h: 15, op: 0.4 }, // F
    { h: 9,  op: 0.3 }, // G
  ];
  const baseY = 82;
  const startX = 7;
  const barW = 10;
  const gap = 13;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {bars.map((b, i) => (
        <rect key={i}
          x={startX + i * gap} y={baseY - b.h}
          width={barW} height={b.h} rx="2"
          fill="white" fillOpacity={b.op}/>
      ))}
      {/* Dashed trend line from A to G */}
      <polyline
        points={bars.map((b, i) => `${startX + i * gap + barW / 2},${baseY - b.h}`).join(" ")}
        stroke="white" strokeWidth="1.5" strokeOpacity="0.45" strokeDasharray="4,3" fill="none"/>
      {/* Grade labels A / G */}
      <text x="12" y="96" textAnchor="middle" fill="white" fontSize="8" fontWeight="700" fillOpacity="0.8">A</text>
      <text x="90" y="96" textAnchor="middle" fill="white" fontSize="8" fontWeight="700" fillOpacity="0.5">G</text>
      {/* Risk arrow at top-right */}
      <path d="M76,10 L90,10 L90,24" stroke="white" strokeWidth="2.5" strokeOpacity="0.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <line x1="76" y1="10" x2="90" y2="24" stroke="white" strokeWidth="2.5" strokeOpacity="0.8" strokeLinecap="round"/>
    </svg>
  );
}

const COVER_ICONS: Record<string, React.FC<{ size?: number }>> = {
  "e-commerce-analytics": ECommerceIcon,
  "hr-analytics":         HRIcon,
  "health-analytics":     HealthcareIcon,
  "finance-analytics":    FinanceIcon,
};

function StackBadge({ name }: { name: string }) {
  const colors: Record<string, { bg: string; text: string }> = {
    "Databricks": { bg: "rgba(255,54,33,0.15)",  text: "#ff6b4a" },
    "Delta Lake":  { bg: "rgba(0,183,255,0.12)",  text: "#38bdf8" },
    "PySpark":     { bg: "rgba(255,180,0,0.12)",  text: "#fbbf24" },
    "SQL":         { bg: "rgba(100,200,100,0.12)",text: "#4ade80" },
    "Power BI":    { bg: "rgba(242,200,17,0.15)", text: "#eab308" },
    "Python":      { bg: "rgba(90,130,230,0.15)", text: "#818cf8" },
    "Kafka":       { bg: "rgba(180,180,180,0.12)",text: "#cbd5e1" },
    "MLflow":      { bg: "rgba(0,180,120,0.12)",  text: "#34d399" },
    "XGBoost":     { bg: "rgba(52,211,153,0.12)", text: "#6ee7b7" },
    "dbt":         { bg: "rgba(255,100,50,0.15)", text: "#fb923c" },
  };
  const c = colors[name] || { bg: "rgba(150,150,150,0.15)", text: "#94a3b8" };
  return (
    <span className={styles.stackBadge} style={{ background: c.bg, color: c.text }}>
      {name}
    </span>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({ project }: { project: PortfolioProject }) {
  const Icon = COVER_ICONS[project.id] || MedallionIcon;
  const isDisabled = project.status === "soon";

  return (
    <div className={styles.card} style={{ opacity: isDisabled ? 0.7 : 1 }}>
      {/* Cover */}
      <div
        className={styles.cover}
        style={{ background: `linear-gradient(135deg, ${project.color1} 0%, ${project.color2} 100%)` }}
      >
        <div className={styles.coverCircle1} style={{ borderColor: `${project.accent}35` }} />
        <div className={styles.coverCircle2} style={{ borderColor: `${project.accent}20` }} />
        <div className={styles.coverIcon}>
          <Icon size={56} />
        </div>
        <div className={styles.coverMeta}>
          <span className={styles.statusBadge} data-status={project.status}>
            {project.status === "live" ? "● Live" : project.status === "wip" ? "◐ In Progress" : "○ Coming Soon"}
          </span>
          <span className={styles.categoryBadge}>{project.category}</span>
        </div>
      </div>

      {/* Body */}
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{project.title}</h3>
        <p className={styles.cardSubtitle}>{project.subtitle}</p>
        <p className={styles.cardDesc}>{project.description}</p>

        {/* Metrics */}
        <div className={styles.metricsRow}>
          {project.metrics.map((m, i) => (
            <div key={i} className={styles.metric}>
              <span className={styles.metricValue} style={{ color: project.accent }}>{m.value}</span>
              <span className={styles.metricLabel}>{m.label}</span>
            </div>
          ))}
        </div>

        {/* Highlights */}
        <div className={styles.highlights}>
          {project.highlights.map((h, i) => (
            <span key={i} className={styles.highlight}>{h}</span>
          ))}
        </div>

        {/* Stack */}
        <div className={styles.stack}>
          {project.stack.map((s) => (
            <StackBadge key={s} name={s} />
          ))}
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          {isDisabled ? (
            <span className={styles.btnDisabled}>Coming Soon</span>
          ) : (
            <a
              href={`/portfolio/${project.slug}`}
              className={styles.btnPrimary}
              style={{ background: project.accent, color: "#000" }}
            >
              View Project →
            </a>
          )}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnSecondary}
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PortfolioPage() {
  const [activeTag, setActiveTag] = useState("All");

  const liveCount = PROJECTS.filter((p) => p.status === "live").length;

  const filtered = activeTag === "All"
    ? PROJECTS
    : PROJECTS.filter((p) =>
        p.category.toLowerCase().includes(activeTag.toLowerCase()) ||
        p.stack.some((s) => s.toLowerCase().includes(activeTag.toLowerCase()))
      );

  return (
    <div className={styles.page}>
      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroPill}>Data Engineering & Analytics</div>
        <h1 className={styles.heroTitle}>Portfolio</h1>
        <p className={styles.heroSub}>
          End-to-end projects built on real datasets — Medallion Architecture, Databricks pipelines,
          interactive dashboards, and AI-generated insights. No dummy data, no mock outputs.
        </p>

        {/* Stats row */}
        <div className={styles.heroStats}>
          <div className={styles.heroStat}>
            <span className={styles.heroStatValue}>{liveCount}</span>
            <span className={styles.heroStatLabel}>Live Project{liveCount !== 1 ? "s" : ""}</span>
          </div>
          <div className={styles.heroStatDivider} />
          <div className={styles.heroStat}>
            <span className={styles.heroStatValue}>{PROJECTS.length}</span>
            <span className={styles.heroStatLabel}>Total Projects</span>
          </div>
          <div className={styles.heroStatDivider} />
          <div className={styles.heroStat}>
            <span className={styles.heroStatValue}>1.6M+</span>
            <span className={styles.heroStatLabel}>Records Processed</span>
          </div>
          <div className={styles.heroStatDivider} />
          <div className={styles.heroStat}>
            <span className={styles.heroStatValue}>6+</span>
            <span className={styles.heroStatLabel}>Technologies</span>
          </div>
        </div>
      </div>

      {/* Filter tags */}
      <div className={styles.filters}>
        {ALL_TAGS.map((tag) => (
          <button
            key={tag}
            type="button"
            className={styles.filterTag}
            data-active={activeTag === tag}
            onClick={() => setActiveTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className={styles.grid}>
        {filtered.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </div>
  );
}
