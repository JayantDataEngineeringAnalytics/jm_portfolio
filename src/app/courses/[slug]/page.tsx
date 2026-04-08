"use client";

import React from "react";
import { notFound, useParams } from "next/navigation";
import { COURSES, type Course } from "../coursesData";

// ─── PDF Generator (same as listing page) ─────────────────────────────────────
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

// ─── Section heading style ─────────────────────────────────────────────────────
function SectionHeading({ children, accent }: { children: React.ReactNode; accent: string }) {
  return (
    <h2 style={{
      fontSize: "0.7rem",
      fontWeight: 700,
      textTransform: "uppercase" as const,
      letterSpacing: "0.12em",
      color: accent,
      marginBottom: "14px",
      paddingBottom: "8px",
      borderBottom: `1.5px solid ${accent}35`,
    }}>
      {children}
    </h2>
  );
}

// ─── Detail Page ──────────────────────────────────────────────────────────────
export default function CourseDetailPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : params.slug?.[0] ?? "";
  const course = COURSES.find((c) => c.id === slug);

  if (!course) notFound();

  const totalHours = course.modules.reduce((s, m) => s + m.hours, 0);
  const { accent, color1, color2 } = course;

  return (
    <div style={{ maxWidth: "860px", margin: "0 auto", padding: "8px 24px 80px" }}>

      {/* Back link */}
      <a
        href="/courses"
        style={{
          color: accent,
          textDecoration: "none",
          fontSize: "0.82rem",
          fontWeight: 600,
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          marginBottom: "20px",
          opacity: 0.85,
        }}
      >
        ← All Courses
      </a>

      {/* Cover */}
      <div style={{
        background: `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`,
        borderRadius: "20px",
        padding: "36px 36px 32px",
        color: "#fff",
        marginBottom: "36px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* PDF download button — top right inside cover */}
        <button
          onClick={() => generateOutlinePDF(course)}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            background: "rgba(255,255,255,0.18)",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: "8px",
            padding: "7px 14px",
            fontSize: "0.78rem",
            fontWeight: 700,
            cursor: "pointer",
            backdropFilter: "blur(4px)",
            letterSpacing: "0.01em",
          }}
        >
          ⬇ Download PDF
        </button>

        <div style={{
          display: "inline-block",
          fontSize: "0.68rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          color: "rgba(255,255,255,0.7)",
          background: "rgba(255,255,255,0.12)",
          borderRadius: "20px",
          padding: "3px 12px",
          marginBottom: "14px",
        }}>
          {course.track} · {course.level}
        </div>

        <h1 style={{
          fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          margin: "0 0 8px",
          color: "#fff",
        }}>
          {course.title}
        </h1>
        <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.72)", margin: "0 0 26px" }}>
          {course.subtitle}
        </p>

        {/* Stats bar */}
        <div style={{
          display: "flex",
          background: "rgba(255,255,255,0.1)",
          borderRadius: "12px",
          overflow: "hidden",
        }}>
          {[
            { value: course.duration, label: "Duration" },
            { value: String(course.modules.length), label: "Modules" },
            { value: `${course.labHours}h`, label: "Lab Hours" },
            { value: "30 Days", label: "Support" },
          ].map((stat, i, arr) => (
            <div key={stat.label} style={{
              flex: 1,
              padding: "12px 14px",
              borderRight: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.15)" : "none",
            }}>
              <div style={{ fontSize: "1rem", fontWeight: 800, color: "#fff", lineHeight: 1, marginBottom: "3px" }}>
                {stat.value}
              </div>
              <div style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.6)" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery badges */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "32px" }}>
        {course.delivery.map(d => (
          <span key={d} style={{
            fontSize: "0.82rem",
            fontWeight: 600,
            borderRadius: "20px",
            padding: "5px 16px",
            background: d === "Corporate" ? "rgba(99,102,241,0.15)" : "rgba(16,185,129,0.15)",
            color: d === "Corporate" ? "#818cf8" : "#34d399",
          }}>
            {d === "Corporate" ? "🏢 Corporate Training" : "💻 Live Online"}
          </span>
        ))}
      </div>

      {/* What You'll Achieve */}
      <section style={{ marginBottom: "32px" }}>
        <SectionHeading accent={accent}>What You&apos;ll Achieve</SectionHeading>
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
          {course.outcomes.map((o, i) => (
            <li key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "0.92rem", color: "var(--neutral-on-background-medium)", lineHeight: 1.6 }}>
              <span style={{ color: accent, fontWeight: 700, flexShrink: 0, marginTop: "1px" }}>✓</span>
              <span>{o}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Target Audience */}
      <section style={{ marginBottom: "32px" }}>
        <SectionHeading accent={accent}>Target Audience</SectionHeading>
        <p style={{ fontSize: "0.92rem", color: "var(--neutral-on-background-medium)", lineHeight: 1.65, margin: 0 }}>
          {course.audience}
        </p>
      </section>

      {/* Prerequisites */}
      <section style={{ marginBottom: "32px" }}>
        <SectionHeading accent={accent}>Prerequisites</SectionHeading>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {course.prerequisites.map((p, i) => (
            <span key={i} style={{
              fontSize: "0.78rem",
              color: "var(--neutral-on-background-weak)",
              background: "var(--neutral-background-weak)",
              border: "1px solid var(--neutral-border-weak)",
              borderRadius: "20px",
              padding: "4px 12px",
            }}>
              {p}
            </span>
          ))}
        </div>
      </section>

      {/* What's Included */}
      <section style={{ marginBottom: "32px" }}>
        <SectionHeading accent={accent}>What&apos;s Included</SectionHeading>
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
          {[
            "Hands-On Labs — real-world lab exercise on live datasets for every module",
            "Course Materials — slide decks, code notebooks, and reference guides",
            "30-Day Post-Training Support — email and async Slack access",
            "Private Code Repository — all lab solutions, sample pipelines, and templates via GitHub",
            "Lifetime Access to Updates — enrolments include all future course revisions",
          ].map((item, i) => (
            <li key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontSize: "0.88rem", color: "var(--neutral-on-background-medium)", lineHeight: 1.6 }}>
              <span style={{ color: accent, fontWeight: 700, flexShrink: 0 }}>✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Full Module Outline */}
      <section style={{ marginBottom: "40px" }}>
        <SectionHeading accent={accent}>Full Course Outline</SectionHeading>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {course.modules.map((mod, i) => (
            <div key={i} style={{
              border: "1px solid var(--neutral-border-medium)",
              borderRadius: "12px",
              overflow: "hidden",
              background: "var(--page-background)",
            }}>
              {/* Module header */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "13px 18px",
                background: "var(--neutral-background-weak)",
                borderBottom: "1px solid var(--neutral-border-weak)",
              }}>
                <span style={{
                  width: "26px",
                  height: "26px",
                  borderRadius: "50%",
                  background: color2,
                  color: "#fff",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}>
                  {i + 1}
                </span>
                <span style={{ flex: 1, fontSize: "0.9rem", fontWeight: 700, color: "var(--neutral-on-background-strong)" }}>
                  {mod.title}
                </span>
                <span style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "var(--neutral-on-background-weak)",
                  background: "var(--neutral-background-weak)",
                  border: "1px solid var(--neutral-border-weak)",
                  padding: "2px 10px",
                  borderRadius: "20px",
                  whiteSpace: "nowrap",
                }}>
                  {mod.hours}h
                </span>
              </div>

              {/* Topics */}
              <ul style={{
                margin: 0,
                padding: "12px 18px 14px 36px",
                listStyle: "disc",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}>
                {mod.topics.map((t, ti) => (
                  <li key={ti} style={{ fontSize: "0.82rem", color: "var(--neutral-on-background-weak)", lineHeight: 1.6 }}>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Total row */}
        <div style={{
          marginTop: "16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 18px",
          background: "var(--neutral-background-weak)",
          border: "1px solid var(--neutral-border-medium)",
          borderRadius: "10px",
          fontSize: "0.88rem",
          color: "var(--neutral-on-background-weak)",
        }}>
          <span>Total course duration</span>
          <strong style={{ color: accent, fontSize: "0.92rem" }}>
            {totalHours}h · {course.labHours}h labs · {course.modules.length} modules
          </strong>
        </div>
      </section>

      {/* Enquire footer */}
      <div style={{
        borderTop: "1px solid var(--neutral-border-weak)",
        paddingTop: "28px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "12px",
        textAlign: "center",
      }}>
        <p style={{ fontSize: "0.9rem", color: "var(--neutral-on-background-weak)", margin: 0 }}>
          Interested in this training? Get in touch for pricing and scheduling.
        </p>
        <a
          href={`mailto:hello@jayantmohite.com?subject=${encodeURIComponent(course.title + " Training Enquiry")}`}
          style={{
            display: "inline-block",
            background: accent,
            color: "#000",
            textDecoration: "none",
            fontWeight: 700,
            fontSize: "0.9rem",
            padding: "12px 28px",
            borderRadius: "10px",
          }}
        >
          Enquire Now →
        </a>
      </div>
    </div>
  );
}
