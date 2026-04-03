"use client";

import React, { useState } from "react";
import { notFound } from "next/navigation";
import { use } from "react";
import styles from "./project.module.css";
import { PROJECTS, type PowerBILayer, type ModelTable } from "../portfolioData";

function StackBadge({ name, accent }: { name: string; accent: string }) {
  const colors: Record<string, { bg: string; text: string }> = {
    "Databricks": { bg: "rgba(255,54,33,0.15)",  text: "#ff6b4a" },
    "Delta Lake":  { bg: "rgba(0,183,255,0.12)",  text: "#38bdf8" },
    "PySpark":     { bg: "rgba(255,180,0,0.12)",   text: "#fbbf24" },
    "SQL":         { bg: "rgba(100,200,100,0.12)", text: "#4ade80" },
    "Power BI":    { bg: "rgba(242,200,17,0.15)",  text: "#eab308" },
    "Python":      { bg: "rgba(90,130,230,0.15)",  text: "#818cf8" },
  };
  const c = colors[name] || { bg: "rgba(150,150,150,0.15)", text: "#94a3b8" };
  return (
    <span className={styles.stackBadge} style={{ background: c.bg, color: c.text }}>
      {name}
    </span>
  );
}

function PipelineViz({ pipeline, accent }: { pipeline: typeof PROJECTS[0]["pipeline"]; accent: string }) {
  const layerColors = { Bronze: "#b45309", Silver: "#475569", Gold: "#d97706" };
  const bgColors    = { Bronze: "rgba(180,83,9,0.12)", Silver: "rgba(71,85,105,0.12)", Gold: "rgba(217,119,6,0.12)" };

  return (
    <div className={styles.pipeline}>
      {pipeline.map((layer, i) => (
        <React.Fragment key={layer.name}>
          <div className={styles.pipelineLayer} style={{ background: bgColors[layer.name], borderColor: `${layerColors[layer.name]}40` }}>
            <div className={styles.layerHeader}>
              <span className={styles.layerBadge} style={{ background: layerColors[layer.name] }}>
                {layer.name}
              </span>
              <p className={styles.layerDesc}>{layer.description}</p>
            </div>
            <ul className={styles.layerSteps}>
              {layer.steps.map((step, si) => (
                <li key={si} className={styles.layerStep}>
                  <span className={styles.stepDot} style={{ background: layerColors[layer.name] }} />
                  {step}
                </li>
              ))}
            </ul>
          </div>
          {i < pipeline.length - 1 && (
            <div className={styles.pipelineArrow}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 4 L12 18 M6 13 L12 19 L18 13" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// ─── Power BI Section ─────────────────────────────────────────────────────────
function ModelCard({ table }: { table: ModelTable }) {
  const typeColors = {
    fact:      { bg: "rgba(56,189,248,0.1)",  border: "rgba(56,189,248,0.25)",  label: "#38bdf8",  tag: "FACT" },
    dimension: { bg: "rgba(167,139,250,0.1)", border: "rgba(167,139,250,0.25)", label: "#a78bfa",  tag: "DIM" },
    bridge:    { bg: "rgba(251,146,60,0.1)",  border: "rgba(251,146,60,0.25)",  label: "#fb923c",  tag: "BRIDGE" },
  };
  const c = typeColors[table.type];
  return (
    <div className={styles.modelCard} style={{ background: c.bg, borderColor: c.border }}>
      <div className={styles.modelCardHeader}>
        <span className={styles.modelTableName}>{table.name}</span>
        <span className={styles.modelTypeBadge} style={{ color: c.label, borderColor: c.border, background: c.bg }}>
          {c.tag}
        </span>
      </div>
      <ul className={styles.modelColumns}>
        {table.columns.map((col, i) => (
          <li key={i} className={styles.modelCol}>
            <span className={styles.modelColDot} style={{ background: col.includes("(PK)") ? "#f59e0b" : col.includes("(FK)") ? "#a78bfa" : "rgba(255,255,255,0.2)" }} />
            <span className={styles.modelColName}>{col}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DAXBlock({ measure }: { measure: { name: string; description: string; dax: string } }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.daxBlock}>
      <button
        type="button"
        className={styles.daxToggle}
        onClick={() => setOpen(!open)}
      >
        <div className={styles.daxToggleLeft}>
          <span className={styles.daxFx}>[fx]</span>
          <span className={styles.daxName}>{measure.name}</span>
        </div>
        <div className={styles.daxToggleRight}>
          <span className={styles.daxDesc}>{measure.description}</span>
          <span className={styles.daxChevron}>{open ? "▲" : "▼"}</span>
        </div>
      </button>
      {open && (
        <pre className={styles.daxCode}><code>{measure.dax}</code></pre>
      )}
    </div>
  );
}

function PowerBISection({ pbi }: { pbi: PowerBILayer }) {
  const [activeTab, setActiveTab] = useState<"model" | "measures" | "pages">("model");

  return (
    <div className={styles.pbiSection}>
      {/* Tab switcher */}
      <div className={styles.pbiTabs}>
        {([
          { key: "model",    label: "Data Model" },
          { key: "measures", label: "DAX Measures" },
          { key: "pages",    label: "Report Pages" },
        ] as const).map(({ key, label }) => (
          <button
            key={key}
            type="button"
            className={styles.pbiTab}
            data-active={activeTab === key}
            onClick={() => setActiveTab(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Model tab */}
      {activeTab === "model" && (
        <div>
          <p className={styles.pbiNote}>
            Star schema derived from the Gold layer. The <span style={{ color: "#f59e0b" }}>★ yellow</span> dots are primary keys, <span style={{ color: "#a78bfa" }}>◆ purple</span> are foreign keys. <code className={styles.inlineCode}>dim_customers</code> implements SCD Type 2 with <code className={styles.inlineCode}>valid_from / valid_to / is_current</code> for historical customer tracking.
          </p>
          <div className={styles.modelGrid}>
            {pbi.modelTables.map((t) => (
              <ModelCard key={t.name} table={t} />
            ))}
          </div>
          <div className={styles.pbiLegend}>
            <span className={styles.legendItem}><span className={styles.legendDot} style={{ background: "#38bdf8" }} /> Fact table</span>
            <span className={styles.legendItem}><span className={styles.legendDot} style={{ background: "#a78bfa" }} /> Dimension table</span>
            <span className={styles.legendItem}><span className={styles.legendDot} style={{ background: "#f59e0b" }} /> Primary key column</span>
            <span className={styles.legendItem}><span className={styles.legendDot} style={{ background: "#a78bfa", opacity: 0.7 }} /> Foreign key column</span>
          </div>
        </div>
      )}

      {/* Measures tab */}
      {activeTab === "measures" && (
        <div>
          <p className={styles.pbiNote}>
            All measures are written in DAX and designed to work correctly with Power BI filter context. Each measure respects slicers on date, category, state, and order status. Click any measure to expand the full DAX expression.
          </p>
          <div className={styles.daxList}>
            {pbi.measures.map((m) => (
              <DAXBlock key={m.name} measure={m} />
            ))}
          </div>
        </div>
      )}

      {/* Pages tab */}
      {activeTab === "pages" && (
        <div>
          <p className={styles.pbiNote}>
            A 5-page report structure covering every stakeholder — from executive summary to logistics deep-dives. All pages share a common slicer panel (date range, state, category) for cross-page filtering.
          </p>
          <div className={styles.pagesGrid}>
            {pbi.reportPages.map((page, i) => (
              <div key={i} className={styles.pageCard}>
                <div className={styles.pageCardHeader}>
                  <span className={styles.pageIcon}>{page.icon}</span>
                  <div>
                    <div className={styles.pageNum}>Page {i + 1}</div>
                    <div className={styles.pageName}>{page.name}</div>
                  </div>
                </div>
                <ul className={styles.pageVisuals}>
                  {page.visuals.map((v, vi) => (
                    <li key={vi} className={styles.pageVisual}>
                      <span className={styles.pageVisualDot} />
                      {v}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) notFound();

  return (
    <div className={styles.page}>

      {/* ── Back nav ── */}
      <div className={styles.breadcrumb}>
        <a href="/portfolio" className={styles.backLink}>← Portfolio</a>
        <span className={styles.breadSep}>/</span>
        <span className={styles.breadCurrent}>{project.title}</span>
      </div>

      {/* ── Hero ── */}
      <div className={styles.hero} style={{ background: `linear-gradient(135deg, ${project.color1}22 0%, ${project.color2}11 100%)`, borderColor: `${project.accent}25` }}>
        <div className={styles.heroTop}>
          <div className={styles.heroMeta}>
            <span className={styles.statusBadge} data-status={project.status}>
              {project.status === "live" ? "● Live" : project.status === "wip" ? "◐ In Progress" : "○ Coming Soon"}
            </span>
            <span className={styles.categoryBadge}>{project.category}</span>
          </div>
          <a href={project.github} target="_blank" rel="noopener noreferrer" className={styles.githubLink}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            GitHub
          </a>
        </div>
        <h1 className={styles.heroTitle}>{project.title}</h1>
        <p className={styles.heroSubtitle}>{project.subtitle}</p>

        {/* Metrics */}
        <div className={styles.metricsRow}>
          {project.metrics.map((m, i) => (
            <div key={i} className={styles.metric}>
              <span className={styles.metricValue} style={{ color: project.accent }}>{m.value}</span>
              <span className={styles.metricLabel}>{m.label}</span>
            </div>
          ))}
        </div>

        {/* Stack */}
        <div className={styles.stackRow}>
          {project.stack.map((s) => (
            <StackBadge key={s} name={s} accent={project.accent} />
          ))}
        </div>
      </div>

      {/* ── Two-col layout: left = content, right = sidebar ── */}
      <div className={styles.body}>

        {/* LEFT COLUMN */}
        <div className={styles.main}>

          {/* Dashboard embed */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionIcon}>📊</span>
              Interactive Dashboard
            </h2>
            <p className={styles.sectionSubtitle}>
              Live report with cross-filtering and drill-through. Click any visual to filter the rest.
            </p>
            {project.dashboardEmbed ? (
              <div className={styles.embedWrapper}>
                <iframe
                  src={project.dashboardEmbed}
                  className={styles.embedIframe}
                  allowFullScreen
                  title={`${project.title} Dashboard`}
                />
              </div>
            ) : (
              <div className={styles.embedPlaceholder}>
                <div className={styles.placeholderInner}>
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <rect x="4" y="28" width="12" height="16" rx="3" fill={project.accent} fillOpacity="0.4" />
                    <rect x="18" y="18" width="12" height="26" rx="3" fill={project.accent} fillOpacity="0.65" />
                    <rect x="32" y="8" width="12" height="36" rx="3" fill={project.accent} />
                  </svg>
                  <p className={styles.placeholderText}>Dashboard embed coming soon</p>
                  <p className={styles.placeholderSub}>Power BI report will be embedded here once published</p>
                </div>
              </div>
            )}
          </section>

          {/* Problem & Solution */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionIcon}>🎯</span>
              Problem & Solution
            </h2>
            <div className={styles.problemSolution}>
              <div className={styles.problemCard}>
                <h3 className={styles.psLabel}>The Problem</h3>
                <p className={styles.psText}>{project.problem}</p>
              </div>
              <div className={styles.solutionCard} style={{ borderColor: `${project.accent}40` }}>
                <h3 className={styles.psLabel} style={{ color: project.accent }}>The Solution</h3>
                <p className={styles.psText}>{project.solution}</p>
              </div>
            </div>
          </section>

          {/* Pipeline architecture */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionIcon}>🏗️</span>
              Pipeline Architecture
            </h2>
            <p className={styles.sectionSubtitle}>
              Medallion Architecture on Databricks — Bronze ingestion → Silver cleansing → Gold aggregation
            </p>
            <PipelineViz pipeline={project.pipeline} accent={project.accent} />
          </section>

          {/* Power BI Layer */}
          {project.powerbi && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ display: "inline", verticalAlign: "middle" }}>
                    <rect x="2" y="13" width="5" height="9" rx="1.5" fill="#F2C811" fillOpacity=".9"/>
                    <rect x="9" y="8"  width="5" height="14" rx="1.5" fill="#F2C811"/>
                    <rect x="16" y="3" width="5" height="19" rx="1.5" fill="#F2C811"/>
                  </svg>
                </span>
                Power BI Implementation
              </h2>
              <p className={styles.sectionSubtitle}>
                How the Gold layer tables map to a star schema data model, the key DAX measures, and the report structure — designed for any Power BI developer to pick up and implement.
              </p>
              <PowerBISection pbi={project.powerbi} />
            </section>
          )}

        </div>

        {/* RIGHT SIDEBAR */}
        <aside className={styles.sidebar}>

          {/* Dataset */}
          <div className={styles.sideCard}>
            <h3 className={styles.sideCardTitle}>Dataset</h3>
            <p className={styles.sideCardValue}>{project.dataset}</p>
            <p className={styles.sideCardSub}>{project.datasetSource}</p>
          </div>

          {/* Highlights */}
          <div className={styles.sideCard}>
            <h3 className={styles.sideCardTitle}>Highlights</h3>
            <div className={styles.highlightsList}>
              {project.highlights.map((h, i) => (
                <div key={i} className={styles.highlightItem}>
                  <span className={styles.highlightDot} style={{ background: project.accent }} />
                  {h}
                </div>
              ))}
            </div>
          </div>

          {/* Tech stack */}
          <div className={styles.sideCard}>
            <h3 className={styles.sideCardTitle}>Tech Stack</h3>
            <div className={styles.sideStack}>
              {project.stack.map((s) => (
                <StackBadge key={s} name={s} accent={project.accent} />
              ))}
            </div>
          </div>

          {/* Links */}
          <div className={styles.sideCard}>
            <h3 className={styles.sideCardTitle}>Links</h3>
            <a href={project.github} target="_blank" rel="noopener noreferrer" className={styles.sideLink}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              View on GitHub
            </a>
          </div>

        </aside>
      </div>
    </div>
  );
}
