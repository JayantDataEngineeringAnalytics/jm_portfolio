"use client";

import React, { useState } from "react";
import { Column, Meta } from "@once-ui-system/core";
import styles from "./courses.module.css";

// ─── Course data ──────────────────────────────────────────────────────────────
const COURSES = [
  {
    id: "databricks-data-engineer",
    title: "Databricks Data Engineer",
    subtitle: "Enterprise-grade data pipelines on the Lakehouse",
    level: "Intermediate – Advanced",
    duration: "40 hours",
    audience: "Data Engineers, Platform Architects",
    color1: "#FF3621",
    color2: "#FF6B35",
    accent: "#FF3621",
    logoType: "databricks",
    modules: [
      { title: "Databricks Platform & Lakehouse Architecture",   hours: 4, topics: ["Workspace overview", "Cluster types & configuration", "Databricks Runtime", "Delta Lake fundamentals"] },
      { title: "Delta Lake & Medallion Architecture",            hours: 6, topics: ["Bronze / Silver / Gold layers", "ACID transactions", "Schema evolution", "Time travel & versioning"] },
      { title: "Data Ingestion — Auto Loader & COPY INTO",       hours: 4, topics: ["Auto Loader internals", "Schema inference & hints", "COPY INTO patterns", "Handling malformed records"] },
      { title: "Spark SQL & DataFrame API",                      hours: 6, topics: ["Catalyst optimizer", "Query plans & hints", "Joins & window functions", "Partitioning strategies"] },
      { title: "PySpark for Data Engineering",                   hours: 6, topics: ["RDD vs DataFrame", "Transformations & actions", "Broadcast variables", "UDFs & Pandas UDFs"] },
      { title: "Databricks Workflows & Orchestration",           hours: 4, topics: ["Jobs & task dependencies", "Cluster reuse policies", "Error handling & alerts", "Integration with ADF/Airflow"] },
      { title: "Unity Catalog & Data Governance",                hours: 4, topics: ["Three-level namespace", "Fine-grained access control", "Data lineage", "Audit logging"] },
      { title: "Performance Tuning & Optimization",              hours: 4, topics: ["Adaptive Query Execution", "Z-ordering & liquid clustering", "Photon engine", "Cost-based optimization"] },
      { title: "CI/CD for Databricks",                           hours: 2, topics: ["Repos & Git integration", "Databricks Asset Bundles", "Testing notebooks", "Deployment pipelines"] },
    ],
  },
  {
    id: "databricks-admin",
    title: "Databricks Administration",
    subtitle: "Secure, scalable workspace governance",
    level: "Intermediate",
    duration: "24 hours",
    audience: "Platform Admins, Cloud Architects",
    color1: "#1B1B2F",
    color2: "#2E2E5F",
    accent: "#7C6AF7",
    logoType: "databricks-admin",
    modules: [
      { title: "Workspace Administration Essentials",            hours: 4, topics: ["Workspace setup & regions", "Admin console walkthrough", "User & group management", "SSO & SCIM provisioning"] },
      { title: "Cluster Policies & Compute Management",          hours: 4, topics: ["Cluster policies", "Instance pools", "Auto-termination & tagging", "GPU & spot instance strategies"] },
      { title: "Identity & Access Management",                   hours: 4, topics: ["PAT & OAuth tokens", "Service principals", "Secrets management", "IP access lists"] },
      { title: "Unity Catalog Administration",                   hours: 4, topics: ["Metastore setup", "Storage credentials & external locations", "Privilege inheritance", "Row/column-level security"] },
      { title: "Cost Management & FinOps",                       hours: 4, topics: ["DBU pricing model", "Usage dashboards", "Chargeback tagging", "Optimization playbook"] },
      { title: "Monitoring, Alerting & Troubleshooting",         hours: 4, topics: ["Cluster event logs", "Ganglia & Spark UI", "Azure Monitor / CloudWatch integration", "Incident runbooks"] },
    ],
  },
  {
    id: "databricks-ai-analyst",
    title: "Databricks AI & ML Analyst",
    subtitle: "From ML experimentation to GenAI deployment",
    level: "Intermediate – Advanced",
    duration: "32 hours",
    audience: "Data Scientists, ML Engineers, AI Practitioners",
    color1: "#4A1D96",
    color2: "#7C3AED",
    accent: "#A78BFA",
    logoType: "databricks-ai",
    modules: [
      { title: "ML on Databricks — Platform Overview",           hours: 4, topics: ["MLflow architecture", "Managed MLflow on Databricks", "Feature Store", "AutoML quick-start"] },
      { title: "Feature Engineering with Spark & Feature Store", hours: 4, topics: ["Batch vs streaming features", "Point-in-time lookups", "Sharing features across teams", "Offline/online serving"] },
      { title: "MLflow Experiment Tracking & Model Registry",    hours: 4, topics: ["Runs, experiments & tags", "Artifact logging", "Model versioning & lifecycle", "Custom models (pyfunc)"] },
      { title: "Model Training & Hyperparameter Tuning",         hours: 6, topics: ["Distributed training with SparkTrials", "Hyperopt integration", "XGBoost / LightGBM / scikit-learn", "Cross-validation at scale"] },
      { title: "LLM Integration & Databricks AI Gateway",        hours: 6, topics: ["Foundation models API", "External model endpoints", "Prompt engineering basics", "Rate limits & governance"] },
      { title: "Model Serving & Real-Time Inference",            hours: 4, topics: ["Serverless model serving", "Canary deployments", "A/B testing", "Latency & throughput tuning"] },
      { title: "Vector Search & RAG Pipelines",                  hours: 4, topics: ["Databricks Vector Search", "Embedding models", "Retrieval-Augmented Generation end-to-end", "Evaluation with MLflow"] },
    ],
  },
  {
    id: "power-bi-analyst",
    title: "Power BI Data Analyst",
    subtitle: "End-to-end analytics from data to insight",
    level: "Beginner – Intermediate",
    duration: "32 hours",
    audience: "Business Analysts, BI Developers, Data Professionals",
    color1: "#F2C811",
    color2: "#E8A000",
    accent: "#D4900A",
    logoType: "powerbi",
    modules: [
      { title: "Power BI Ecosystem & Desktop Fundamentals",      hours: 4, topics: ["Desktop, Service & Mobile", "Data sources & connectors", "Report canvas & visuals", "Publish & share basics"] },
      { title: "Power Query — Data Transformation",              hours: 6, topics: ["M language basics", "Query folding", "Merges & appends", "Custom functions & parameters"] },
      { title: "Data Modeling & Star Schema Design",             hours: 4, topics: ["Fact & dimension tables", "Relationships & cardinality", "Role-playing dimensions", "Slowly changing dimensions"] },
      { title: "DAX Fundamentals",                               hours: 6, topics: ["Calculated columns vs measures", "CALCULATE & filter context", "SUMX & iterator functions", "Variables & debugging"] },
      { title: "Advanced DAX & Time Intelligence",               hours: 4, topics: ["DATESINPERIOD / SAMEPERIODLASTYEAR", "Running totals & moving averages", "Semi-additive measures", "Calculation groups"] },
      { title: "Report Design, UX & Storytelling",               hours: 4, topics: ["Layout principles", "Custom visuals & AppSource", "Bookmarks & drill-through", "Accessibility standards"] },
      { title: "Power BI Service, Security & Deployment",        hours: 4, topics: ["Workspaces & deployment pipelines", "Row-level security (RLS)", "Scheduled refresh & gateways", "Sensitivity labels & DLP"] },
    ],
  },
  {
    id: "ms-fabric-analyst",
    title: "Microsoft Fabric Analyst",
    subtitle: "Unified analytics on Microsoft's end-to-end platform",
    level: "Intermediate",
    duration: "36 hours",
    audience: "Data Engineers, Analysts, Platform Architects",
    color1: "#0F6CBD",
    color2: "#0078D4",
    accent: "#50E6FF",
    logoType: "fabric",
    modules: [
      { title: "Microsoft Fabric Architecture & Experiences",    hours: 4, topics: ["Fabric capacities & workspaces", "OneLake unified storage", "Experience overview: DE, DS, DW, BI, RTA", "Licensing model"] },
      { title: "OneLake & Lakehouse",                            hours: 4, topics: ["OneLake shortcuts", "Lakehouse vs Warehouse", "Delta-Parquet in OneLake", "Managed vs external tables"] },
      { title: "Data Factory in Fabric",                         hours: 4, topics: ["Pipelines & data flows", "Copy activity deep-dive", "Connectors & staged copy", "Monitoring & error handling"] },
      { title: "Synapse Data Engineering",                       hours: 6, topics: ["Spark notebooks & job definitions", "Managed environments", "Native Delta support", "Lakehouse APIs"] },
      { title: "Synapse Data Science",                           hours: 4, topics: ["ML experiments in Fabric", "Synapse ML library", "Model storage in MLflow", "Semantic link for BI"] },
      { title: "Real-Time Analytics with Eventhouse & KQL",      hours: 4, topics: ["Eventstream ingestion", "KQL database design", "KQL query basics & aggregations", "Real-time dashboards"] },
      { title: "Power BI in Fabric & DirectLake",                hours: 4, topics: ["DirectLake mode", "Semantic models in Fabric", "OneLake integration", "Composite models"] },
      { title: "Data Activator & Governance",                    hours: 4, topics: ["Triggers & alerts on streaming data", "Purview integration", "Information protection", "Workspace-level governance"] },
      { title: "Fabric Administration & Security",               hours: 2, topics: ["Capacity admin portal", "Tenant settings", "Domain management", "Audit logs & compliance"] },
    ],
  },
];

// ─── SVG Logos ────────────────────────────────────────────────────────────────
function DatabricksLogo({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <polygon points="50,5 95,30 95,70 50,95 5,70 5,30" fill="white" fillOpacity="0.15" />
      <polygon points="50,15 85,33 85,67 50,85 15,67 15,33" fill="white" fillOpacity="0.2" />
      <path d="M50 28 L72 40 L72 62 L50 74 L28 62 L28 40 Z" fill="white" fillOpacity="0.9" />
      <path d="M50 35 L65 43 L65 57 L50 65 L35 57 L35 43 Z" fill="#FF3621" fillOpacity="0.8" />
    </svg>
  );
}

function PowerBILogo({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.2} viewBox="0 0 80 96" fill="none">
      <rect x="0"  y="48" width="20" height="48" rx="4" fill="white" fillOpacity="0.5" />
      <rect x="24" y="28" width="20" height="68" rx="4" fill="white" fillOpacity="0.7" />
      <rect x="48" y="8"  width="20" height="88" rx="4" fill="white" fillOpacity="0.95" />
      <rect x="72" y="0"  width="8"  height="96" rx="4" fill="#F2C811" />
    </svg>
  );
}

function FabricLogo({ size = 48 }: { size?: number }) {
  const s = size;
  return (
    <svg width={s} height={s} viewBox="0 0 100 100" fill="none">
      {/* Fabric-like weave pattern */}
      <rect x="10" y="10" width="35" height="35" rx="6" fill="white" fillOpacity="0.9" />
      <rect x="55" y="10" width="35" height="35" rx="6" fill="white" fillOpacity="0.6" />
      <rect x="10" y="55" width="35" height="35" rx="6" fill="white" fillOpacity="0.6" />
      <rect x="55" y="55" width="35" height="35" rx="6" fill="white" fillOpacity="0.9" />
      <rect x="32" y="32" width="36" height="36" rx="6" fill="#50E6FF" fillOpacity="0.85" />
    </svg>
  );
}

function AdminLogo({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="38" fill="white" fillOpacity="0.15" stroke="white" strokeWidth="2" strokeOpacity="0.4" />
      <circle cx="50" cy="50" r="22" fill="white" fillOpacity="0.2" />
      <circle cx="50" cy="50" r="10" fill="white" fillOpacity="0.9" />
      {[0,60,120,180,240,300].map((deg, i) => {
        const r = deg * Math.PI / 180;
        const x1 = 50 + 24 * Math.cos(r), y1 = 50 + 24 * Math.sin(r);
        const x2 = 50 + 36 * Math.cos(r), y2 = 50 + 36 * Math.sin(r);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeWidth="3" strokeOpacity="0.85" strokeLinecap="round" />;
      })}
    </svg>
  );
}

function AILogo({ size = 48 }: { size?: number }) {
  const nodes = [[50,20],[20,55],[80,55],[35,85],[65,85]];
  const edges = [[0,1],[0,2],[1,2],[1,3],[2,4],[3,4]];
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {edges.map(([a,b],i) => (
        <line key={i}
          x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]}
          stroke="white" strokeWidth="2" strokeOpacity="0.5" />
      ))}
      {nodes.map(([cx,cy],i) => (
        <circle key={i} cx={cx} cy={cy} r={i===0?9:6} fill="white" fillOpacity={i===0?0.95:0.75} />
      ))}
    </svg>
  );
}

// ─── Course cover ─────────────────────────────────────────────────────────────
function CourseCover({ course }: { course: typeof COURSES[0] }) {
  const Logo = course.logoType === "powerbi" ? PowerBILogo
    : course.logoType === "fabric" ? FabricLogo
    : course.logoType === "databricks-admin" ? AdminLogo
    : course.logoType === "databricks-ai" ? AILogo
    : DatabricksLogo;

  return (
    <div className={styles.cover} style={{ background: `linear-gradient(135deg, ${course.color1} 0%, ${course.color2} 100%)` }}>
      {/* Decorative circles */}
      <div className={styles.coverCircle1} style={{ borderColor: `${course.accent}40` }} />
      <div className={styles.coverCircle2} style={{ borderColor: `${course.accent}25` }} />
      <div className={styles.coverLogoWrap}>
        <Logo size={52} />
      </div>
      <div className={styles.coverText}>
        <span className={styles.coverDuration}>{course.duration}</span>
        <span className={styles.coverLevel}>{course.level}</span>
      </div>
    </div>
  );
}

// ─── Course card ──────────────────────────────────────────────────────────────
function CourseCard({ course, open, onToggle }: { course: typeof COURSES[0]; open: boolean; onToggle: () => void }) {
  const totalHours = course.modules.reduce((s, m) => s + m.hours, 0);

  return (
    <div className={styles.card} style={{ "--course-accent": course.accent } as React.CSSProperties}>
      <CourseCover course={course} />
      <div className={styles.cardBody}>
        <div className={styles.cardMeta}>
          <span className={styles.badge} style={{ background: `${course.accent}22`, color: course.accent }}>{course.level}</span>
          <span className={styles.metaDot} />
          <span className={styles.metaText}>{course.duration} · {course.modules.length} modules</span>
        </div>
        <h3 className={styles.cardTitle}>{course.title}</h3>
        <p className={styles.cardSubtitle}>{course.subtitle}</p>
        <p className={styles.cardAudience}><strong>For:</strong> {course.audience}</p>

        <button
          type="button"
          className={styles.outlineToggle}
          style={{ color: course.accent, borderColor: `${course.accent}40` }}
          onClick={onToggle}
        >
          {open ? "Hide Outline ↑" : "View Course Outline ↓"}
        </button>

        {open && (
          <div className={styles.outline}>
            {course.modules.map((mod, i) => (
              <div key={i} className={styles.module}>
                <div className={styles.moduleHeader}>
                  <span className={styles.moduleNum} style={{ background: course.color1, color: "#fff" }}>{i + 1}</span>
                  <span className={styles.moduleTitle}>{mod.title}</span>
                  <span className={styles.moduleHours}>{mod.hours}h</span>
                </div>
                <ul className={styles.topicList}>
                  {mod.topics.map((t, ti) => (
                    <li key={ti} className={styles.topic}>{t}</li>
                  ))}
                </ul>
              </div>
            ))}
            <div className={styles.totalRow}>
              <span>Total duration</span>
              <strong>{totalHours} hours</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function CoursesPage() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className={styles.page}>
      <div className={styles.grid}>
        {COURSES.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            open={openId === course.id}
            onToggle={() => setOpenId(openId === course.id ? null : course.id)}
          />
        ))}
      </div>
    </div>
  );
}
