"use client";

import React, { useState } from "react";
import styles from "./portfolio.module.css";
import { PROJECTS, type PortfolioProject } from "./portfolioData";

const ALL_TAGS = ["All", "Data Engineering", "Analytics", "Machine Learning", "Real-Time"];

// ─── Cover icons per project ──────────────────────────────────────────────────
function MedallionIcon({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <rect x="8"  y="68" width="84" height="16" rx="5" fill="white" fillOpacity="0.25" />
      <text x="50" y="79.5" textAnchor="middle" fill="white" fontSize="8" fontWeight="700" fillOpacity="0.8">BRONZE</text>
      <rect x="16" y="48" width="68" height="16" rx="5" fill="white" fillOpacity="0.45" />
      <text x="50" y="59.5" textAnchor="middle" fill="white" fontSize="8" fontWeight="700" fillOpacity="0.9">SILVER</text>
      <rect x="24" y="28" width="52" height="16" rx="5" fill="#fbbf24" fillOpacity="0.9" />
      <text x="50" y="39.5" textAnchor="middle" fill="#78350f" fontSize="8" fontWeight="800">GOLD</text>
      <line x1="50" y1="28" x2="50" y2="20" stroke="white" strokeWidth="2" strokeOpacity="0.5" />
      <polygon points="50,8 58,18 50,20 42,18" fill="white" fillOpacity="0.85" />
    </svg>
  );
}

function StreamingIcon({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Wave lines */}
      <path d="M10,50 Q22.5,30 35,50 Q47.5,70 60,50 Q72.5,30 85,50 Q90,57 95,50"
            stroke="white" strokeWidth="3" strokeOpacity="0.9" fill="none" strokeLinecap="round"/>
      <path d="M10,65 Q22.5,45 35,65 Q47.5,85 60,65 Q72.5,45 85,65"
            stroke="white" strokeWidth="2" strokeOpacity="0.4" fill="none" strokeLinecap="round"/>
      <path d="M10,35 Q22.5,15 35,35 Q47.5,55 60,35 Q72.5,15 85,35"
            stroke="white" strokeWidth="2" strokeOpacity="0.3" fill="none" strokeLinecap="round"/>
      {/* Lightning bolt */}
      <polygon points="58,12 46,50 54,50 42,88 70,42 58,42" fill="white" fillOpacity="0.85" />
    </svg>
  );
}

function MLIcon({ size = 56 }: { size?: number }) {
  const nodes = [[50,18],[22,52],[78,52],[34,84],[66,84]];
  const edges: [number, number][] = [[0,1],[0,2],[1,2],[1,3],[2,4],[3,4],[1,4],[2,3]];
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {edges.map(([a, b], i) => (
        <line key={i}
          x1={nodes[a][0]} y1={nodes[a][1]}
          x2={nodes[b][0]} y2={nodes[b][1]}
          stroke="white" strokeWidth="1.5" strokeOpacity="0.35" />
      ))}
      {nodes.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={i === 0 ? 10 : 7}
          fill="white" fillOpacity={i === 0 ? 0.95 : 0.65} />
      ))}
      <circle cx="50" cy="18" r="4" fill="#34d399" fillOpacity="0.9" />
    </svg>
  );
}

const COVER_ICONS: Record<string, React.FC<{ size?: number }>> = {
  "e-commerce-analytics":   MedallionIcon,
  "real-time-streaming":    StreamingIcon,
  "ml-churn-prediction":    MLIcon,
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
            <span className={styles.heroStatValue}>2M+</span>
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
