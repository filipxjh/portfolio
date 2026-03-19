import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Skills", "Projects", "Case Studies", "Contact"];

const SKILLS = [
  { category: "Analytics & Data", items: ["Google Analytics 4", "Looker Studio", "BigQuery", "Python (pandas)", "SQL"], color: "#00f5c4" },
  { category: "Performance Marketing", items: ["Google Ads", "Meta Ads", "LinkedIn Ads", "TikTok Ads", "Programmatic"], color: "#7b61ff" },
  { category: "Tools & Platforms", items: ["Google Tag Manager", "HubSpot", "Klaviyo", "Segment", "Zapier"], color: "#ff6b6b" },
  { category: "Reporting & BI", items: ["Tableau", "Power BI", "Looker Studio", "GA4 Explorations", "Excel / Sheets"], color: "#ffd166" },
];

const METRICS = [
  { value: "3.2x", label: "Average ROAS", icon: "◈" },
  { value: "47%", label: "Avg. CPA Reduction", icon: "↓" },
  { value: "€2.4M+", label: "Ad Spend Managed", icon: "◉" },
  { value: "12+", label: "Campaigns Optimized", icon: "⬡" },
];

// ← Vymeň URL za svoje GitHub Pages / Vercel linky po nasadení
const LIVE_PROJECTS = [
  {
    id: "dashboard",
    title: "GA4 Marketing Analytics Dashboard",
    type: "Data Visualization",
    tags: ["Chart.js", "GA4", "JavaScript", "KPI Tracking"],
    result: "Live Tool",
    resultDetail: "interactive demo",
    description: "Interactive marketing analytics dashboard visualizing campaign performance across channels. Displays KPIs, traffic sources, channel breakdown and top campaigns with animated charts.",
    color: "#00f5c4",
    liveUrl: "/dashboard",
    githubUrl: "https://github.com/yourusername/ga4-dashboard",
  },
  {
    id: "dnd",
    title: "Web Application with External API Integration",
    type: "Full-Stack Development",
    tags: ["JavaScript", "REST API", "HTML/CSS", "Database Logic"],
    result: "Live App",
    resultDetail: "real-time data",
    description: "Full-stack web application fetching and processing structured data from an external REST API. Users can dynamically filter, combine and save data configurations with real-time updates.",
    color: "#7b61ff",
    liveUrl: "/dnd-builds",
    githubUrl: "https://github.com/yourusername/api-web-app",
  },
];

const CASE_STUDY = {
  title: "DTC Brand: Full-Funnel Attribution Rebuild",
  challenge: "The client had 4 ad platforms all claiming credit for the same conversions. True ROAS was unknown. Budget decisions were made on vanity metrics.",
  solution: [
    "Implemented server-side GTM to fix iOS tracking loss",
    "Built unified data warehouse in BigQuery pulling all platforms",
    "Created custom attribution model (time-decay + position-based)",
    "Launched executive Looker Studio dashboard with real-time spend vs. revenue",
  ],
  results: [
    { metric: "Tracked Conversions", before: "~34%", after: "~91%" },
    { metric: "Blended ROAS", before: "1.8x", after: "3.4x" },
    { metric: "Monthly Ad Spend", before: "€18K", after: "€42K" },
    { metric: "CPA", before: "€87", after: "€38" },
  ],
};

// ---- HOOKS ----
function useCounter(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const numeric = parseFloat(target.replace(/[^0-9.]/g, ""));
    if (isNaN(numeric)) { setCount(target); return; }
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const current = eased * numeric;
      const prefix = target.match(/^[^0-9]*/)[0];
      const suffix = target.match(/[^0-9.]*$/)[0];
      setCount(prefix + (Number.isInteger(numeric) ? Math.floor(current) : current.toFixed(1)) + suffix);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count || target;
}

function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

// ---- MODAL ----
function ProjectModal({ project, onClose }) {
  const [loaded, setLoaded] = useState(false);
  const isPlaceholder = project.liveUrl.includes("YOUR_");

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(4,6,12,0.93)", backdropFilter: "blur(10px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 20, animation: "fadeIn 0.2s ease",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: "100%", maxWidth: 1100,
        background: "#0d1220",
        border: `1px solid ${project.color}33`,
        borderRadius: 20, overflow: "hidden",
        display: "flex", flexDirection: "column",
        maxHeight: "90vh",
        animation: "slideUp 0.25s ease",
        boxShadow: `0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px ${project.color}18`,
      }}>
        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "16px 24px", borderBottom: `1px solid ${project.color}20`,
          background: "#080c14", flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 9, height: 9, borderRadius: "50%", background: project.color, boxShadow: `0 0 10px ${project.color}` }} />
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#fff" }}>{project.title}</div>
              <div style={{ fontSize: 11, color: "#64748b", fontFamily: "monospace", marginTop: 2 }}>{project.type} · Live Preview</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" style={{
              padding: "7px 14px", borderRadius: 8, fontSize: 12,
              border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8",
              textDecoration: "none", fontFamily: "monospace", transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = project.color; e.currentTarget.style.color = project.color; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#94a3b8"; }}
            >GitHub</a>
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{
              padding: "7px 14px", borderRadius: 8, fontSize: 12,
              background: project.color, color: "#080a10", fontWeight: 700,
              textDecoration: "none", fontFamily: "monospace",
            }}>↗ Open Full</a>
            <button onClick={onClose} style={{
              width: 30, height: 30, borderRadius: 8, border: "none",
              background: "rgba(255,255,255,0.06)", color: "#94a3b8",
              cursor: "pointer", fontSize: 14, transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.target.style.background = "rgba(255,255,255,0.14)"; e.target.style.color = "#fff"; }}
              onMouseLeave={e => { e.target.style.background = "rgba(255,255,255,0.06)"; e.target.style.color = "#94a3b8"; }}
            >✕</button>
          </div>
        </div>

        {/* Preview area */}
        <div style={{ flex: 1, position: "relative", minHeight: 500, background: "#060810" }}>
          {isPlaceholder ? (
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
              <div style={{ width: 60, height: 60, borderRadius: 14, background: `${project.color}18`, border: `1px solid ${project.color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>🔗</div>
              <div style={{ textAlign: "center" }}>
                <div style={{ color: "#fff", fontWeight: 700, fontSize: 16, marginBottom: 8 }}>Live preview bude tu</div>
                <div style={{ color: "#64748b", fontSize: 13, fontFamily: "monospace", maxWidth: 340, lineHeight: 1.6 }}>
                  Nahraď <code style={{ color: project.color }}>YOUR_..._URL_HERE</code> v kóde<br />za tvoj GitHub Pages alebo Vercel link
                </div>
              </div>
            </div>
          ) : (
            <>
              {!loaded && (
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12 }}>
                  <div style={{ width: 30, height: 30, borderRadius: "50%", border: `2px solid ${project.color}`, borderTopColor: "transparent", animation: "spin 0.8s linear infinite" }} />
                  <div style={{ color: "#64748b", fontSize: 12, fontFamily: "monospace" }}>Loading preview...</div>
                </div>
              )}
              <iframe src={project.liveUrl} title={project.title} onLoad={() => setLoaded(true)}
                style={{ width: "100%", height: "100%", border: "none", minHeight: 500, opacity: loaded ? 1 : 0, transition: "opacity 0.3s" }} />
            </>
          )}
        </div>

        {/* Tags */}
        <div style={{ padding: "12px 24px", borderTop: `1px solid ${project.color}20`, background: "#080c14", display: "flex", gap: 8, flexWrap: "wrap", flexShrink: 0 }}>
          {project.tags.map(t => (
            <span key={t} style={{ fontSize: 12, padding: "4px 10px", borderRadius: 12, background: `${project.color}11`, color: project.color, border: `1px solid ${project.color}22`, fontFamily: "monospace" }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---- UI COMPONENTS ----
function MetricCard({ value, label, icon, delay = 0 }) {
  const [ref, inView] = useInView();
  const animated = useCounter(value, 1600, inView);
  return (
    <div ref={ref} style={{
      background: "rgba(255,255,255,0.03)", border: "1px solid rgba(0,245,196,0.15)",
      borderRadius: 16, padding: "28px 24px", textAlign: "center",
      transition: `opacity 0.6s ${delay}ms, transform 0.6s ${delay}ms`,
      opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, #00f5c4, transparent)" }} />
      <div style={{ fontSize: 28, color: "#00f5c4", marginBottom: 8, fontFamily: "monospace" }}>{icon}</div>
      <div style={{ fontSize: 36, fontWeight: 800, color: "#fff", fontFamily: "monospace", letterSpacing: -1 }}>{animated}</div>
      <div style={{ fontSize: 13, color: "#8899aa", marginTop: 6, letterSpacing: 1, textTransform: "uppercase" }}>{label}</div>
    </div>
  );
}

function SkillBadge({ item, color, delay }) {
  const [ref, inView] = useInView(0.1);
  return (
    <span ref={ref} style={{
      display: "inline-block", padding: "6px 14px", borderRadius: 20,
      border: `1px solid ${color}44`, color, fontSize: 13, background: `${color}11`, margin: "4px",
      transition: `opacity 0.4s ${delay}ms, transform 0.4s ${delay}ms`,
      opacity: inView ? 1 : 0, transform: inView ? "scale(1)" : "scale(0.85)",
    }}>{item}</span>
  );
}

function SectionHeader({ label, title, inView, centered = false }) {
  return (
    <div style={{ textAlign: centered ? "center" : "left", transition: "opacity 0.6s, transform 0.6s", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)" }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <div style={{ width: 20, height: 1, background: "#00f5c4" }} />
        <span style={{ color: "#00f5c4", fontSize: 12, letterSpacing: 3, textTransform: "uppercase", fontFamily: "monospace" }}>{label}</span>
        <div style={{ width: 20, height: 1, background: "#00f5c4" }} />
      </div>
      <h2 style={{ color: "#fff", fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 900, margin: 0, letterSpacing: -1 }}>{title}</h2>
    </div>
  );
}

// ---- SECTIONS ----
function Nav({ active, setActive }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "0 5vw", height: 64,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(8,10,16,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(0,245,196,0.08)" : "none",
      transition: "all 0.3s",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg, #00f5c4, #7b61ff)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 11, fontWeight: 900, color: "#080a10" }}>FK</span>
        </div>
        <span style={{ color: "#fff", fontWeight: 700, letterSpacing: 1, fontSize: 15 }}>Filip Kušnír</span>
      </div>
      <div style={{ display: "flex", gap: 4 }}>
        {NAV_LINKS.map(l => (
          <a key={l} href={`#${l.toLowerCase().replace(" ", "-")}`} onClick={() => setActive(l)} style={{
            padding: "6px 14px", borderRadius: 8, fontSize: 13,
            color: active === l ? "#00f5c4" : "#8899aa",
            background: active === l ? "rgba(0,245,196,0.08)" : "transparent",
            textDecoration: "none", transition: "all 0.2s", fontWeight: active === l ? 600 : 400,
          }}>{l}</a>
        ))}
      </div>
    </nav>
  );
}

function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 100); }, []);
  return (
    <section id="about" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "0 5vw", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,245,196,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,196,0.04) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 600, height: 400, background: "radial-gradient(ellipse, rgba(123,97,255,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 900, margin: "0 auto", paddingTop: 80 }}>
        <div style={{ transition: "opacity 0.8s, transform 0.8s", opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(30px)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#00f5c4", boxShadow: "0 0 12px #00f5c4", animation: "pulse 2s infinite" }} />
            <span style={{ color: "#00f5c4", fontSize: 13, letterSpacing: 3, textTransform: "uppercase", fontFamily: "monospace" }}>Available for projects</span>
          </div>
          <h1 style={{ fontSize: "clamp(42px, 7vw, 80px)", fontWeight: 900, lineHeight: 1.05, margin: "0 0 20px", color: "#fff", letterSpacing: -2 }}>
            Data-Driven<br />
            <span style={{ background: "linear-gradient(90deg, #00f5c4, #7b61ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Marketing Analyst</span>
          </h1>
          <p style={{ fontSize: 18, color: "#8899aa", maxWidth: 580, lineHeight: 1.7, marginBottom: 40 }}>
            I turn marketing data into decisions. Specializing in GA4, performance marketing attribution, and building dashboards that actually make sense.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <a href="#projects" style={{ padding: "14px 32px", borderRadius: 10, background: "#00f5c4", color: "#080a10", fontWeight: 700, textDecoration: "none", fontSize: 15, transition: "transform 0.2s, box-shadow 0.2s" }}
              onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 32px rgba(0,245,196,0.4)"; }}
              onMouseLeave={e => { e.target.style.transform = "none"; e.target.style.boxShadow = "none"; }}>
              View Projects →
            </a>
            <a href="#contact" style={{ padding: "14px 32px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.15)", color: "#fff", fontWeight: 600, textDecoration: "none", fontSize: 15 }}>Get in Touch</a>
          </div>
        </div>
        <div style={{ marginTop: 80, display: "flex", flexWrap: "wrap", gap: 10, transition: "opacity 1s 0.5s", opacity: mounted ? 1 : 0 }}>
          {["GA4", "Google Ads", "Meta Ads", "BigQuery", "Looker Studio", "JavaScript", "REST API", "GTM", "Attribution Modeling"].map(t => (
            <span key={t} style={{ padding: "8px 16px", borderRadius: 20, border: "1px solid rgba(255,255,255,0.08)", color: "#8899aa", fontSize: 13, background: "rgba(255,255,255,0.02)" }}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function MetricsSection() {
  return (
    <section style={{ padding: "80px 5vw", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 20 }}>
          {METRICS.map((m, i) => <MetricCard key={m.label} {...m} delay={i * 100} />)}
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  const [ref, inView] = useInView();
  return (
    <section id="skills" style={{ padding: "80px 5vw" }} ref={ref}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <SectionHeader label="Expertise" title="Skills & Tools" inView={inView} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24, marginTop: 48 }}>
          {SKILLS.map((s, si) => (
            <div key={s.category} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 10, height: 10, borderRadius: 3, background: s.color }} />
                <span style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>{s.category}</span>
              </div>
              <div>{s.items.map((item, ii) => <SkillBadge key={item} item={item} color={s.color} delay={si * 100 + ii * 60} />)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project: p, onPreview }) {
  const [hovered, setHovered] = useState(false);
  const [ref, inView] = useInView(0.1);
  return (
    <div ref={ref} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{
      background: hovered ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
      border: `1px solid ${hovered ? p.color + "44" : "rgba(255,255,255,0.07)"}`,
      borderRadius: 16, padding: 28,
      transition: "all 0.3s",
      transform: inView ? (hovered ? "translateY(-4px)" : "none") : "translateY(20px)",
      opacity: inView ? 1 : 0,
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: hovered ? `linear-gradient(90deg, transparent, ${p.color}, transparent)` : "transparent", transition: "all 0.3s" }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <span style={{ fontSize: 12, color: p.color, textTransform: "uppercase", letterSpacing: 2, fontWeight: 600 }}>{p.type}</span>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 20, fontWeight: 900, color: p.color, fontFamily: "monospace" }}>{p.result}</div>
          <div style={{ fontSize: 11, color: "#8899aa" }}>{p.resultDetail}</div>
        </div>
      </div>
      <h3 style={{ color: "#fff", fontSize: 18, fontWeight: 700, margin: "0 0 10px" }}>{p.title}</h3>
      <p style={{ color: "#8899aa", fontSize: 14, lineHeight: 1.6, margin: "0 0 20px" }}>{p.description}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
        {p.tags.map(t => (
          <span key={t} style={{ fontSize: 12, padding: "4px 10px", borderRadius: 12, background: `${p.color}11`, color: p.color, border: `1px solid ${p.color}22` }}>{t}</span>
        ))}
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={onPreview} style={{
          flex: 1, padding: "11px 0", borderRadius: 10, background: p.color,
          border: "none", color: "#080a10", fontWeight: 700, fontSize: 13,
          cursor: "pointer", transition: "all 0.2s",
          transform: hovered ? "scale(1.02)" : "scale(1)",
        }}>▶ Live Preview</button>
        <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" style={{
          padding: "11px 16px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)",
          color: "#8899aa", textDecoration: "none", fontSize: 13, transition: "all 0.2s",
          display: "flex", alignItems: "center",
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = p.color; e.currentTarget.style.color = p.color; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#8899aa"; }}
        >GitHub</a>
      </div>
    </div>
  );
}

function ProjectsSection() {
  const [ref, inView] = useInView();
  const [activeModal, setActiveModal] = useState(null);
  return (
    <section id="projects" style={{ padding: "80px 5vw" }} ref={ref}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <SectionHeader label="Work" title="Live Projects" inView={inView} />
        <p style={{ color: "#8899aa", fontSize: 15, marginTop: 12, marginBottom: 48 }}>
          Click <span style={{ color: "#00f5c4", fontFamily: "monospace" }}>Live Preview</span> to explore each project directly here.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))", gap: 24 }}>
          {LIVE_PROJECTS.map(p => <ProjectCard key={p.id} project={p} onPreview={() => setActiveModal(p)} />)}
        </div>
      </div>
      {activeModal && <ProjectModal project={activeModal} onClose={() => setActiveModal(null)} />}
    </section>
  );
}

function CaseStudySection() {
  const [ref, inView] = useInView();
  return (
    <section id="case-studies" style={{ padding: "80px 5vw" }} ref={ref}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <SectionHeader label="Deep Dive" title="Case Study" inView={inView} />
        <div style={{ marginTop: 48, background: "rgba(0,245,196,0.03)", border: "1px solid rgba(0,245,196,0.12)", borderRadius: 20, overflow: "hidden" }}>
          <div style={{ padding: "32px 40px", borderBottom: "1px solid rgba(0,245,196,0.08)" }}>
            <h3 style={{ color: "#fff", fontSize: 22, fontWeight: 800, margin: 0 }}>{CASE_STUDY.title}</h3>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            <div style={{ padding: "32px 40px", borderRight: "1px solid rgba(0,245,196,0.08)" }}>
              <h4 style={{ color: "#ff6b6b", fontSize: 12, letterSpacing: 3, textTransform: "uppercase", margin: "0 0 12px" }}>Challenge</h4>
              <p style={{ color: "#8899aa", fontSize: 14, lineHeight: 1.7, margin: 0 }}>{CASE_STUDY.challenge}</p>
              <h4 style={{ color: "#00f5c4", fontSize: 12, letterSpacing: 3, textTransform: "uppercase", margin: "28px 0 12px" }}>Solution</h4>
              <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                {CASE_STUDY.solution.map((s, i) => (
                  <li key={i} style={{ color: "#8899aa", fontSize: 14, lineHeight: 1.7, paddingLeft: 20, position: "relative", marginBottom: 6 }}>
                    <span style={{ position: "absolute", left: 0, color: "#00f5c4" }}>→</span>{s}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ padding: "32px 40px" }}>
              <h4 style={{ color: "#7b61ff", fontSize: 12, letterSpacing: 3, textTransform: "uppercase", margin: "0 0 20px" }}>Results</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {CASE_STUDY.results.map(r => (
                  <div key={r.metric} style={{ background: "rgba(255,255,255,0.02)", borderRadius: 10, padding: "14px 18px" }}>
                    <div style={{ fontSize: 12, color: "#8899aa", marginBottom: 8 }}>{r.metric}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ fontSize: 16, fontWeight: 700, color: "#ff6b6b", fontFamily: "monospace" }}>{r.before}</span>
                      <span style={{ color: "#8899aa", fontSize: 18 }}>→</span>
                      <span style={{ fontSize: 20, fontWeight: 900, color: "#00f5c4", fontFamily: "monospace" }}>{r.after}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [ref, inView] = useInView();
  return (
    <section id="contact" style={{ padding: "80px 5vw 120px" }} ref={ref}>
      <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
        <SectionHeader label="Let's Talk" title="Get in Touch" inView={inView} centered />
        <p style={{ color: "#8899aa", fontSize: 16, lineHeight: 1.7, margin: "0 0 40px" }}>
          Looking for a performance marketing analyst or GA4 specialist? Let's discuss how data can grow your business.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
          {[
            { label: "Email", value: "kxsnirbusiness@gmail.com", icon: "✉" },
            { label: "LinkedIn", value: "linkedin.com/in/filipkusnir", icon: "in" },
            { label: "Location", value: "Bratislava, Slovakia / Remote", icon: "◎" },
          ].map(c => (
            <div key={c.label} style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 28px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)", width: "100%", maxWidth: 360 }}>
              <span style={{ fontSize: 18, width: 28, textAlign: "center", color: "#00f5c4" }}>{c.icon}</span>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: 11, color: "#8899aa", textTransform: "uppercase", letterSpacing: 2 }}>{c.label}</div>
                <div style={{ color: "#fff", fontSize: 14, fontWeight: 500 }}>{c.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [activeNav, setActiveNav] = useState("About");
  return (
<div style={{ background: "#080a10", minHeight: "100vh", width: "100%", maxWidth: "100%", overflowX: "hidden", fontFamily: "'Inter', 'Helvetica Neue', sans-serif", color: "#fff" }}>      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #080a10; }
        ::-webkit-scrollbar-thumb { background: rgba(0,245,196,0.3); border-radius: 3px; }
        @keyframes pulse { 0%,100%{opacity:1;box-shadow:0 0 6px #00f5c4;} 50%{opacity:0.5;box-shadow:0 0 20px #00f5c4;} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes slideUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin { to{transform:rotate(360deg)} }
      `}</style>
      <Nav active={activeNav} setActive={setActiveNav} />
      <Hero />
      <MetricsSection />
      <SkillsSection />
      <ProjectsSection />
      <CaseStudySection />
      <ContactSection />
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "24px 5vw", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: "#8899aa", fontSize: 13 }}>© 2026 Filip Kušnír — Digital Marketing & Data Analyst</span>
        <span style={{ color: "#8899aa", fontSize: 13, fontFamily: "monospace" }}>Built with React</span>
      </footer>
    </div>
  );
}
