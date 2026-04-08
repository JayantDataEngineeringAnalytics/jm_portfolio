"use client";

import React, { useState } from "react";
import styles from "./courses.module.css";
import { COURSES, type Course, type DeliveryFormat, type Track } from "./coursesData";


// ─── Delivery format colors ───────────────────────────────────────────────────
const DELIVERY_STYLES: Record<DeliveryFormat, { bg: string; color: string }> = {
  Corporate: { bg: "rgba(99,102,241,0.15)", color: "#818cf8" },
  Online:    { bg: "rgba(16,185,129,0.15)", color: "#34d399" },
};

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

function DatabricksSQLLogo({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <polygon points="50,5 95,30 95,70 50,95 5,70 5,30" fill="white" fillOpacity="0.12" />
      <path d="M50 28 L72 40 L72 62 L50 74 L28 62 L28 40 Z" fill="white" fillOpacity="0.85" />
      <text x="50" y="56" textAnchor="middle" fill="#F97316" fontSize="16" fontWeight="900" fontFamily="monospace">SQL</text>
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

function PowerBIAdvLogo({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <rect x="4"  y="55" width="16" height="40" rx="4" fill="white" fillOpacity="0.45" />
      <rect x="24" y="38" width="16" height="57" rx="4" fill="white" fillOpacity="0.6" />
      <rect x="44" y="20" width="16" height="75" rx="4" fill="white" fillOpacity="0.8" />
      <rect x="64" y="5"  width="16" height="90" rx="4" fill="white" fillOpacity="0.95" />
      <path d="M12,52 L32,35 L52,17 L72,3" stroke="#F59E0B" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="72" cy="3" r="5" fill="#F59E0B"/>
    </svg>
  );
}

function PowerBIAdminLogo({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="38" r="20" fill="white" fillOpacity="0.85"/>
      <path d="M18,82 Q18,60 50,60 Q82,60 82,82Z" fill="white" fillOpacity="0.65"/>
      <rect x="62" y="55" width="28" height="32" rx="6" fill="#EF4444" fillOpacity="0.9"/>
      <path d="M68,71 L72,76 L82,64" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}

function FabricLogo({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <rect x="10" y="10" width="35" height="35" rx="6" fill="white" fillOpacity="0.9" />
      <rect x="55" y="10" width="35" height="35" rx="6" fill="white" fillOpacity="0.6" />
      <rect x="10" y="55" width="35" height="35" rx="6" fill="white" fillOpacity="0.6" />
      <rect x="55" y="55" width="35" height="35" rx="6" fill="white" fillOpacity="0.9" />
      <rect x="32" y="32" width="36" height="36" rx="6" fill="#50E6FF" fillOpacity="0.85" />
    </svg>
  );
}

function FabricBILogo({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <rect x="10" y="10" width="35" height="35" rx="6" fill="white" fillOpacity="0.7" />
      <rect x="55" y="10" width="35" height="35" rx="6" fill="white" fillOpacity="0.5" />
      <rect x="10" y="55" width="35" height="35" rx="6" fill="white" fillOpacity="0.5" />
      <rect x="55" y="55" width="35" height="35" rx="6" fill="white" fillOpacity="0.7" />
      <rect x="32" y="32" width="36" height="36" rx="6" fill="#0078D4" fillOpacity="0.9" />
      <rect x="38" y="52" width="8" height="12" rx="2" fill="white" fillOpacity="0.9"/>
      <rect x="49" y="46" width="8" height="18" rx="2" fill="white" fillOpacity="0.9"/>
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
      <circle cx="50" cy="20" r="4" fill="#A78BFA" fillOpacity="0.9" />
    </svg>
  );
}

const LOGO_MAP: Record<string, React.FC<{ size?: number }>> = {
  "databricks":       DatabricksLogo,
  "databricks-sql":   DatabricksSQLLogo,
  "databricks-admin": AdminLogo,
  "databricks-ai":    AILogo,
  "powerbi":          PowerBILogo,
  "powerbi-adv":      PowerBIAdvLogo,
  "powerbi-admin":    PowerBIAdminLogo,
  "fabric":           FabricLogo,
  "fabric-bi":        FabricBILogo,
};

// ─── Course Cover ─────────────────────────────────────────────────────────────
function CourseCover({ course }: { course: Course }) {
  const Logo = LOGO_MAP[course.logoType] || DatabricksLogo;
  return (
    <div className={styles.cover} style={{ background: `linear-gradient(135deg, ${course.color1} 0%, ${course.color2} 100%)` }}>
      <div className={styles.coverCircle1} style={{ borderColor: `${course.accent}40` }} />
      <div className={styles.coverCircle2} style={{ borderColor: `${course.accent}25` }} />
      <div className={styles.coverLogoWrap}>
        <Logo size={52} />
      </div>
      <div className={styles.coverText}>
        <span className={styles.coverDuration}>{course.duration}</span>
        <span className={styles.coverLevel}>{course.level}</span>
      </div>
      <div className={styles.coverLabBadge}>
        <span className={styles.labDot} />
        {course.labHours}h hands-on labs
      </div>
    </div>
  );
}

// ─── PDF Generator ───────────────────────────────────────────────────────────
function generateOutlinePDF(course: Course) {
  const totalHours = course.modules.reduce((s, m) => s + m.hours, 0);

  const modulesHTML = course.modules.map((mod, i) => `
    <div class="module">
      <div class="module-header">
        <span class="module-num">${i + 1}</span>
        <span class="module-title">${mod.title}</span>
        <span class="module-hours">${mod.hours}h</span>
      </div>
      <ul class="topic-list">
        ${mod.topics.map(t => `<li>${t}</li>`).join("")}
      </ul>
    </div>
  `).join("");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>${course.title} — Training Outline</title>
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif;font-size:10pt;color:#1a1a1a;background:#fff;line-height:1.5}
    .page{width:210mm;margin:0 auto;background:#fff}
    @media print{body{margin:0}.page{margin:0;width:100%}.page-break{page-break-before:always}.no-break{page-break-inside:avoid}}
    .accent-bar{height:6px;background:linear-gradient(90deg,${course.accent} 0%,${course.color2} 100%)}
    .header{padding:20px 32px 16px;display:flex;justify-content:space-between;align-items:flex-start;border-bottom:1px solid #e5e7eb}
    .header-brand{font-size:13pt;font-weight:800;color:#111;letter-spacing:-0.02em}
    .header-brand span{color:${course.accent}}
    .header-label{font-size:7.5pt;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#6b7280;margin-top:3px}
    .header-contact{text-align:right;font-size:8pt;color:#6b7280;line-height:1.7}
    .header-contact a{color:${course.accent};text-decoration:none}
    .cover{padding:28px 32px 24px;background:linear-gradient(135deg,${course.color1} 0%,${course.color2} 100%);color:#fff}
    .cover-tag{display:inline-block;font-size:7pt;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:rgba(255,255,255,0.7);background:rgba(255,255,255,0.12);border-radius:20px;padding:3px 10px;margin-bottom:12px}
    .cover-title{font-size:22pt;font-weight:800;letter-spacing:-0.03em;line-height:1.1;margin-bottom:5px}
    .cover-subtitle{font-size:10pt;color:rgba(255,255,255,0.7);margin-bottom:18px}
    .cover-stats{display:flex;background:rgba(255,255,255,0.1);border-radius:10px;overflow:hidden}
    .cover-stat{flex:1;padding:10px 14px;border-right:1px solid rgba(255,255,255,0.15)}
    .cover-stat:last-child{border-right:none}
    .cover-stat-value{font-size:13pt;font-weight:800;color:#fff;display:block;line-height:1;margin-bottom:2px}
    .cover-stat-label{font-size:7pt;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.6)}
    .body{padding:24px 32px}
    .section{margin-bottom:20px}
    .section-title{font-size:7.5pt;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:${course.accent};margin-bottom:8px;padding-bottom:5px;border-bottom:1.5px solid ${course.accent}30}
    .outcomes{display:flex;flex-direction:column;gap:6px}
    .outcome{display:flex;gap:8px;align-items:flex-start;font-size:9.5pt;color:#374151;line-height:1.5}
    .outcome-check{color:${course.accent};font-weight:700;font-size:10pt;flex-shrink:0;margin-top:1px}
    .prereq-chips{display:flex;flex-wrap:wrap;gap:6px}
    .prereq-chip{font-size:8pt;color:#374151;background:#f3f4f6;border:1px solid #e5e7eb;border-radius:20px;padding:3px 10px}
    .delivery-badges{display:flex;gap:8px}
    .delivery-badge{font-size:8pt;font-weight:600;border-radius:20px;padding:3px 12px}
    .corporate{background:rgba(99,102,241,0.1);color:#4338ca}
    .online{background:rgba(16,185,129,0.1);color:#065f46}
    .divider{height:1px;background:#e5e7eb;margin:0 32px}
    .footer{padding:14px 32px;border-top:1px solid #e5e7eb;display:flex;justify-content:space-between;align-items:center}
    .footer-cta{font-size:8.5pt;color:#111;font-weight:600}
    .footer-cta a{color:${course.accent};text-decoration:none}
    .footer-right{font-size:8pt;color:#9ca3af}
    .page-break{page-break-before:always}
    .outline-header{padding:18px 32px 12px;border-bottom:1px solid #e5e7eb;display:flex;justify-content:space-between;align-items:center}
    .outline-header-title{font-size:10pt;font-weight:700;color:#111}
    .outline-header-sub{font-size:8pt;color:#6b7280}
    .modules{padding:18px 32px;display:flex;flex-direction:column;gap:14px}
    .module{display:flex;flex-direction:column;gap:5px;page-break-inside:avoid}
    .module-header{display:flex;align-items:center;gap:10px}
    .module-num{width:22px;height:22px;border-radius:50%;background:${course.color2};color:#fff;font-size:7.5pt;font-weight:700;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0}
    .module-title{font-size:9.5pt;font-weight:700;color:#111;flex:1}
    .module-hours{font-size:8pt;font-weight:600;color:#6b7280;background:#f3f4f6;padding:2px 8px;border-radius:20px;white-space:nowrap}
    .topic-list{margin:0;padding-left:32px;list-style:disc;display:flex;flex-direction:column;gap:2px}
    .topic-list li{font-size:8.5pt;color:#4b5563;line-height:1.5}
    .total-row{margin:8px 32px 0;display:flex;justify-content:space-between;align-items:center;padding:10px 16px;background:#fff7ed;border:1px solid #fed7aa;border-radius:8px;font-size:9pt;color:#6b7280}
    .total-row strong{font-size:9.5pt;color:${course.accent};font-weight:700}
  </style>
</head>
<body>
<div class="page">
  <div class="accent-bar"></div>
  <div class="header">
    <div>
      <div class="header-brand">JM <span>Analytics</span></div>
      <div class="header-label">Training Outline</div>
    </div>
    <div class="header-contact">hello@jayantmohite.com<br/><a href="https://jayantmohite.com">jayantmohite.com</a></div>
  </div>
  <div class="cover">
    <div class="cover-tag">${course.track} · ${course.level}</div>
    <div class="cover-title">${course.title}</div>
    <div class="cover-subtitle">${course.subtitle}</div>
    <div class="cover-stats">
      <div class="cover-stat"><span class="cover-stat-value">${totalHours}h</span><span class="cover-stat-label">Duration</span></div>
      <div class="cover-stat"><span class="cover-stat-value">${course.modules.length}</span><span class="cover-stat-label">Modules</span></div>
      <div class="cover-stat"><span class="cover-stat-value">${course.labHours}h</span><span class="cover-stat-label">Labs</span></div>
      <div class="cover-stat"><span class="cover-stat-value">30d</span><span class="cover-stat-label">Support</span></div>
    </div>
  </div>
  <div class="body">
    <div class="section">
      <div class="section-title">What You'll Achieve</div>
      <div class="outcomes">${course.outcomes.map(o => `<div class="outcome"><span class="outcome-check">✓</span><span>${o}</span></div>`).join("")}</div>
    </div>
    <div class="section">
      <div class="section-title">Target Audience</div>
      <p style="font-size:9.5pt;color:#374151">${course.audience}</p>
    </div>
    <div class="section">
      <div class="section-title">Prerequisites</div>
      <div class="prereq-chips">${course.prerequisites.map(p => `<span class="prereq-chip">${p}</span>`).join("")}</div>
    </div>
    <div class="section">
      <div class="section-title">Delivery Formats</div>
      <div class="delivery-badges">${course.delivery.map(d => `<span class="delivery-badge ${d === "Corporate" ? "corporate" : "online"}">${d === "Corporate" ? "🏢 Corporate Training" : "💻 Live Online"}</span>`).join("")}</div>
    </div>
    <div class="section">
      <div class="section-title">What's Included</div>
      <div class="outcomes">
        <div class="outcome"><span class="outcome-check">✓</span><span>Hands-on lab exercise on live datasets for every module</span></div>
        <div class="outcome"><span class="outcome-check">✓</span><span>Comprehensive slide decks, code notebooks, and reference guides</span></div>
        <div class="outcome"><span class="outcome-check">✓</span><span>30-day post-training support via email and async Slack</span></div>
        <div class="outcome"><span class="outcome-check">✓</span><span>Private GitHub repository access — all lab solutions, sample pipelines, and templates</span></div>
        <div class="outcome"><span class="outcome-check">✓</span><span>Lifetime access to course material updates as the platform evolves</span></div>
      </div>
    </div>
  </div>
  <div class="divider"></div>
  <div class="footer">
    <div class="footer-cta">Enquire: <a href="mailto:hello@jayantmohite.com?subject=${encodeURIComponent(course.title + " Training Enquiry")}">hello@jayantmohite.com</a></div>
    <div class="footer-right">Page 1 of 2</div>
  </div>
</div>

<div class="page page-break">
  <div class="accent-bar"></div>
  <div class="header">
    <div>
      <div class="header-brand">JM <span>Analytics</span></div>
      <div class="header-label">Training Outline</div>
    </div>
    <div class="header-contact">hello@jayantmohite.com<br/><a href="https://jayantmohite.com">jayantmohite.com</a></div>
  </div>
  <div class="outline-header">
    <div class="outline-header-title">${course.title} — Full Course Outline</div>
    <div class="outline-header-sub">${course.modules.length} modules · ${totalHours} hours · ${course.labHours}h labs</div>
  </div>
  <div class="modules">${modulesHTML}</div>
  <div class="total-row"><span>Total course duration</span><strong>${totalHours} hours · ${course.labHours}h hands-on labs · ${course.modules.length} modules</strong></div>
  <div style="height:20px"></div>
  <div class="divider"></div>
  <div class="footer">
    <div class="footer-cta">Enquire: <a href="mailto:hello@jayantmohite.com?subject=${encodeURIComponent(course.title + " Training Enquiry")}">hello@jayantmohite.com</a></div>
    <div class="footer-right">Page 2 of 2 · jayantmohite.com</div>
  </div>
</div>
<script>window.onload=()=>{window.print()}</script>
</body>
</html>`;

  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, "_blank");
  if (win) setTimeout(() => URL.revokeObjectURL(url), 60000);
}

// ─── Course Card ──────────────────────────────────────────────────────────────
function CourseCard({ course }: { course: Course }) {
  const totalHours = course.modules.reduce((s, m) => s + m.hours, 0);

  return (
    <div className={styles.card} style={{ "--course-accent": course.accent } as React.CSSProperties}>
      <CourseCover course={course} />

      <div className={styles.cardBody}>
        {/* Meta row */}
        <div className={styles.cardMeta}>
          <span className={styles.trackBadge} style={{ background: `${course.accent}18`, color: course.accent, borderColor: `${course.accent}35` }}>
            {course.track}
          </span>
          <span className={styles.levelBadge}>{course.level}</span>
        </div>

        {/* Delivery formats */}
        <div className={styles.deliveryRow}>
          {course.delivery.map(d => (
            <span key={d} className={styles.deliveryBadge} style={{ background: DELIVERY_STYLES[d].bg, color: DELIVERY_STYLES[d].color }}>
              {d === "Corporate" ? "🏢 Corporate" : "💻 Online"}
            </span>
          ))}
        </div>

        <h3 className={styles.cardTitle}>{course.title}</h3>
        <p className={styles.cardTagline}>{course.tagline}</p>

        {/* Outcomes */}
        <div className={styles.outcomes}>
          <span className={styles.outcomesLabel}>What you'll achieve</span>
          <ul className={styles.outcomeList}>
            {course.outcomes.map((o, i) => (
              <li key={i} className={styles.outcomeItem}>
                <span className={styles.outcomeCheck} style={{ color: course.accent }}>✓</span>
                {o}
              </li>
            ))}
          </ul>
        </div>

        {/* Prerequisites */}
        <div className={styles.prereqs}>
          <span className={styles.prereqsLabel}>Prerequisites</span>
          <div className={styles.prereqChips}>
            {course.prerequisites.map((p, i) => (
              <span key={i} className={styles.prereqChip}>{p}</span>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div className={styles.courseStats}>
          <div className={styles.courseStat}>
            <strong>{course.modules.length}</strong>
            <span>modules</span>
          </div>
          <div className={styles.courseStatDivider} />
          <div className={styles.courseStat}>
            <strong>{totalHours}h</strong>
            <span>total</span>
          </div>
          <div className={styles.courseStatDivider} />
          <div className={styles.courseStat}>
            <strong>{course.labHours}h</strong>
            <span>labs</span>
          </div>
          <div className={styles.courseStatDivider} />
          <div className={styles.courseStat}>
            <strong>30d</strong>
            <span>support</span>
          </div>
        </div>

        {/* View details + PDF download */}
        <div className={styles.outlineActions}>
          <a
            href={`/courses/${course.id}`}
            className={styles.outlineToggle}
            style={{ color: course.accent, borderColor: `${course.accent}40`, textDecoration: "none", display: "inline-flex", alignItems: "center" }}
          >
            View Full Details →
          </a>
          <button
            type="button"
            className={styles.downloadBtn}
            onClick={() => generateOutlinePDF(course)}
            title="Download training outline as PDF"
          >
            ⬇ PDF
          </button>
        </div>

        {/* CTA */}
        <a
          href="mailto:hello@jayantmohite.com?subject=Course Enquiry"
          className={styles.enquireBtn}
          style={{ background: course.accent, color: "#000" }}
        >
          Enquire Now →
        </a>
      </div>
    </div>
  );
}

// ─── What's Included ──────────────────────────────────────────────────────────
const INCLUDED_ITEMS = [
  { icon: "🧪", title: "Hands-On Labs", desc: "Every module includes a real-world lab exercise on live datasets — not toy examples." },
  { icon: "📚", title: "Course Materials", desc: "Comprehensive slide decks, code notebooks, and reference guides for every module." },
  { icon: "💬", title: "30-Day Post-Training Support", desc: "Email and async Slack access to ask follow-up questions after the training ends." },
  { icon: "🗃️", title: "Private Code Repository", desc: "Access to all lab solutions, sample pipelines, and templates via a private GitHub repo." },
  { icon: "🔄", title: "Lifetime Access to Updates", desc: "Courses are updated as platforms evolve — enrolments include all future revisions." },
];

const DELIVERY_DETAILS = [
  {
    type: "Corporate Training",
    icon: "🏢",
    color: "#818cf8",
    bg: "rgba(99,102,241,0.08)",
    border: "rgba(99,102,241,0.2)",
    features: [
      "Onsite at your office or remote via Teams/Zoom",
      "Customised curriculum aligned to your tech stack",
      "Dedicated trainer for your team (up to 20 participants)",
      "Custom labs using your own data and infrastructure",
      "Pre-training skill assessment and post-training evaluation",
      "Private Slack channel for the duration of training",
      "30-day post-training support for all participants",
    ],
  },
  {
    type: "Live Online Training",
    icon: "💻",
    color: "#34d399",
    bg: "rgba(16,185,129,0.08)",
    border: "rgba(16,185,129,0.2)",
    features: [
      "Live instructor-led sessions via Zoom/Teams",
      "Small cohorts (max 15 participants) for personal attention",
      "Scheduled cohort calendar — join a fixed batch",
      "Session recordings available for 90 days post-training",
      "Shared lab environment provisioned for all participants",
      "Community Slack with access to all alumni",
      "30-day post-training support and Q&A access",
    ],
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function CoursesPage() {
  const [activeTrack, setActiveTrack] = useState<"All" | Track>("All");

  const tracks: ("All" | Track)[] = ["All", "Databricks", "Power BI", "Microsoft Fabric"];

  const filtered = activeTrack === "All"
    ? COURSES
    : COURSES.filter(c => c.track === activeTrack);

  const totalHours = COURSES.reduce((s, c) => s + c.modules.reduce((ss, m) => ss + m.hours, 0), 0);

  return (
    <div className={styles.page}>
      {/* ── Hero ── */}
      <div className={styles.hero}>
        <div className={styles.heroPill}>Corporate & Online Training</div>
        <h1 className={styles.heroTitle}>Expert-Led Data Engineering<br />& Analytics Courses</h1>
        <p className={styles.heroSub}>
          Real-world, hands-on training for Databricks, Microsoft Fabric, and Power BI —
          delivered as corporate on-site workshops or live online cohorts.
          Every course built from production experience, not textbooks.
        </p>
        <div className={styles.heroStats}>
          <div className={styles.heroStat}>
            <span className={styles.heroStatValue}>{COURSES.length}</span>
            <span className={styles.heroStatLabel}>Courses</span>
          </div>
          <div className={styles.heroStatDivider} />
          <div className={styles.heroStat}>
            <span className={styles.heroStatValue}>{totalHours}h+</span>
            <span className={styles.heroStatLabel}>Total Content</span>
          </div>
          <div className={styles.heroStatDivider} />
          <div className={styles.heroStat}>
            <span className={styles.heroStatValue}>3</span>
            <span className={styles.heroStatLabel}>Technologies</span>
          </div>
          <div className={styles.heroStatDivider} />
          <div className={styles.heroStat}>
            <span className={styles.heroStatValue}>2</span>
            <span className={styles.heroStatLabel}>Delivery Formats</span>
          </div>
        </div>
      </div>

      {/* ── Track filter ── */}
      <div className={styles.trackFilters}>
        {tracks.map(t => (
          <button
            key={t}
            type="button"
            className={styles.trackFilter}
            data-active={activeTrack === t}
            onClick={() => setActiveTrack(t)}
          >
            {t === "All" ? `All Courses (${COURSES.length})`
              : t === "Databricks" ? `🧱 Databricks (${COURSES.filter(c => c.track === "Databricks").length})`
              : t === "Power BI" ? `📊 Power BI (${COURSES.filter(c => c.track === "Power BI").length})`
              : `🔷 Microsoft Fabric (${COURSES.filter(c => c.track === "Microsoft Fabric").length})`}
          </button>
        ))}
      </div>

      {/* ── Course grid ── */}
      <div className={styles.grid}>
        {filtered.map(course => (
          <CourseCard
            key={course.id}
            course={course}
          />
        ))}
      </div>

      {/* ── What's Included ── */}
      <div className={styles.whatsIncluded}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionPill}>Every Course Includes</div>
          <h2 className={styles.sectionTitle}>No extras, no upsells — everything is included</h2>
          <p className={styles.sectionSub}>All courses are complete packages. The price you see is the price you pay.</p>
        </div>
        <div className={styles.includedGrid}>
          {INCLUDED_ITEMS.map((item, i) => (
            <div key={i} className={styles.includedCard}>
              <span className={styles.includedIcon}>{item.icon}</span>
              <div>
                <h4 className={styles.includedTitle}>{item.title}</h4>
                <p className={styles.includedDesc}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Delivery formats ── */}
      <div className={styles.deliverySection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionPill}>Delivery Options</div>
          <h2 className={styles.sectionTitle}>Training that fits your schedule and budget</h2>
          <p className={styles.sectionSub}>All formats include the same comprehensive curriculum and hands-on labs.</p>
        </div>
        <div className={styles.deliveryCards}>
          {DELIVERY_DETAILS.map((d, i) => (
            <div key={i} className={styles.deliveryCard} style={{ background: d.bg, borderColor: d.border }}>
              <div className={styles.deliveryCardHeader}>
                <span className={styles.deliveryCardIcon}>{d.icon}</span>
                <h3 className={styles.deliveryCardTitle} style={{ color: d.color }}>{d.type}</h3>
              </div>
              <ul className={styles.deliveryFeatures}>
                {d.features.map((f, fi) => (
                  <li key={fi} className={styles.deliveryFeature}>
                    <span style={{ color: d.color }}>✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div className={styles.cta}>
        <div className={styles.ctaInner}>
          <div className={styles.ctaPill}>Ready to Upskill?</div>
          <h2 className={styles.ctaTitle}>Let's build your team's data capability</h2>
          <p className={styles.ctaSub}>
            Whether you're training a team of 5 or 50, looking for a focused workshop or a multi-week programme —
            get in touch and I'll put together a custom training plan with timeline and pricing.
          </p>
          <div className={styles.ctaActions}>
            <a href="mailto:hello@jayantmohite.com?subject=Corporate Training Enquiry" className={styles.ctaBtnPrimary}>
              Request Corporate Quote →
            </a>
            <a href="mailto:hello@jayantmohite.com?subject=Online Training Enquiry" className={styles.ctaBtnSecondary}>
              Book Online Training
            </a>
          </div>
          <p className={styles.ctaNote}>Typically responds within 24 hours · All enquiries are confidential</p>
        </div>
      </div>
    </div>
  );
}
