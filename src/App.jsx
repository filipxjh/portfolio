import { useState, useEffect, useRef } from "react";

const NAV_LINKS = [
  { label: "O mne",             href: "about" },
  { label: "Zručnosti",         href: "skills" },
  { label: "Projekty",          href: "projects" },
  { label: "Prípadová štúdia",  href: "case-studies" },
  { label: "Kontakt",           href: "contact" },
];

const SKILLS = [
  { category: "Analytics & Data", items: ["Google Analytics 4", "Looker Studio", "GTM", "SQL", "Excel / Sheets"], color: "#00f5c4" },
  { category: "Performance Marketing", items: ["Google Ads", "Meta Ads", "Inbound Marketing", "UTM Tracking", "PPC"], color: "#7b61ff" },
  { category: "Tools & Platforms", items: ["HubSpot", "AI nástroje pre marketing", "Databázové systémy", "REST API", "Git"], color: "#ff6b6b" },
  { category: "Web Development", items: ["JavaScript", "HTML / CSS", "React", "Node.js", "Vite"], color: "#ffd166" },
];

const CERTIFICATIONS = [
  { name: "Google Analytics 4 Certification", issuer: "Google", color: "#00f5c4" },
  { name: "Google Ads Search Certification", issuer: "Google", color: "#7b61ff" },
  { name: "Inbound Marketing Certification", issuer: "HubSpot Academy", color: "#ff6b6b" },
];

const LIVE_PROJECTS = [
  {
    id: "dashboard",
    title: "GA4 Marketing Analytics Dashboard",
    type: "Data Visualization",
    tags: ["Chart.js", "GA4 Demo Data", "JavaScript", "KPI Tracking"],
    result: "Live Tool",
    resultDetail: "reálne GA4 dáta",
    description: "Interaktívny analytický dashboard vizualizujúci výkonnosť kampaní. Dáta pochádzajú z Google Analytics Demo Account (Google Merchandise Store, Property ID: 213025502). Zobrazuje KPI metriky, traffic sources, channel breakdown a top kampane.",
    color: "#00f5c4",
    liveUrl: "/dashboard",
    githubUrl: "https://github.com/filipxjh/portfolio",
  },
  {
    id: "dnd",
    title: "Dark & Darker Build Editor",
    type: "Full-Stack Web App",
    tags: ["JavaScript", "REST API", "HTML/CSS", "Node.js"],
    result: "Live App",
    resultDetail: "real-time API dáta",
    description: "Webová aplikácia napojená na externé REST API (DarkerDB) pre real-time načítanie dát. Používatelia môžu zostavovať a ukladať konfigurácie s dynamickým výpočtom štatistík.",
    color: "#7b61ff",
    liveUrl: "/dnd-builds",
    githubUrl: "https://github.com/filipxjh/portfolio",
  },
];

const EXPERIENCE = [
  {
    company: "Ľudovít Nastišin (SZČO)",
    location: "Prešov",
    role: "Odborná prax – digitálny dizajn a marketingová komunikácia",
    period: "11/2024 — 02/2025",
    points: [
      "Príprava vizuálnych výstupov pre online komunikáciu",
      "Spracovanie grafických podkladov pre digitálne marketingové materiály",
      "Podpora pri tvorbe obsahovej komunikácie",
      "Oboznámenie sa s procesom tvorby marketingových výstupov",
    ],
    color: "#00f5c4",
  },
];

const EDUCATION = [
  { school: "Univerzita Komenského v Bratislave", faculty: "Fakulta manažmentu", degree: "Magisterské štúdium", field: "Digitálny manažment a online marketing", period: "09/2025 — súčasnosť", color: "#7b61ff" },
  { school: "Prešovská univerzita v Prešove", faculty: "Fakulta manažmentu", degree: "Bakalárske štúdium", field: "Obchodný manažment a marketing", period: "09/2022 — 06/2025", color: "#ff6b6b" },
  { school: "Stredná priemyselná škola elektrotechnická", faculty: "Prešov", degree: "Stredoškolské vzdelanie", field: "Informačné a sieťové technológie", period: "09/2018 — 06/2022", color: "#ffd166" },
];

const CASE_STUDY = {
  title: "GA4 Demo Account — Google Merchandise Store",
  challenge: "Analyzovať reálne dáta z GA4 Demo Account a identifikovať kľúčové trendy v akvizícii a správaní používateľov za obdobie Dec 2025 – Mar 2026.",
  solution: [
    "Napojenie na GA4 Demo Account (Property ID: 213025502)",
    "Analýza 226 286 relácií za 90-dňové obdobie",
    "Identifikácia dominantného kanála: Direct traffic (108k relácií, 47.7%)",
    "Vizualizácia dát v custom Chart.js dashboarde s animovanými KPI",
  ],
  results: [
    { metric: "Celkové relácie", before: "—", after: "226 286" },
    { metric: "Aktívni používatelia", before: "—", after: "160 000" },
    { metric: "Hlavný kanál", before: "Paid Search", after: "Direct (47.7%)" },
    { metric: "Organic Search", before: "—", after: "51 000 relácií" },
  ],
};

// ---- HOOKS ----
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
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(4,6,12,0.93)", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, animation: "fadeIn 0.2s ease" }}>
      <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 1100, background: "#0d1220", border: `1px solid ${project.color}33`, borderRadius: 20, overflow: "hidden", display: "flex", flexDirection: "column", maxHeight: "90vh", animation: "slideUp 0.25s ease", boxShadow: `0 40px 100px rgba(0,0,0,0.7)` }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px", borderBottom: `1px solid ${project.color}20`, background: "#080c14", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 9, height: 9, borderRadius: "50%", background: project.color, boxShadow: `0 0 10px ${project.color}` }} />
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#fff" }}>{project.title}</div>
              <div style={{ fontSize: 11, color: "#64748b", fontFamily: "monospace", marginTop: 2 }}>{project.type} · Live Preview</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" style={{ padding: "7px 14px", borderRadius: 8, fontSize: 12, border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8", textDecoration: "none", fontFamily: "monospace" }}>GitHub</a>
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{ padding: "7px 14px", borderRadius: 8, fontSize: 12, background: project.color, color: "#080a10", fontWeight: 700, textDecoration: "none", fontFamily: "monospace" }}>↗ Otvoriť</a>
            <button onClick={onClose} style={{ width: 30, height: 30, borderRadius: 8, border: "none", background: "rgba(255,255,255,0.06)", color: "#94a3b8", cursor: "pointer", fontSize: 14 }}>✕</button>
          </div>
        </div>
        <div style={{ flex: 1, position: "relative", minHeight: 500, background: "#060810" }}>
          {!loaded && (
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12 }}>
              <div style={{ width: 30, height: 30, borderRadius: "50%", border: `2px solid ${project.color}`, borderTopColor: "transparent", animation: "spin 0.8s linear infinite" }} />
              <div style={{ color: "#64748b", fontSize: 12, fontFamily: "monospace" }}>Načítavam...</div>
            </div>
          )}
          <iframe src={project.liveUrl} title={project.title} onLoad={() => setLoaded(true)} style={{ width: "100%", height: "100%", border: "none", minHeight: 500, opacity: loaded ? 1 : 0, transition: "opacity 0.3s" }} />
        </div>
        <div style={{ padding: "12px 24px", borderTop: `1px solid ${project.color}20`, background: "#080c14", display: "flex", gap: 8, flexWrap: "wrap", flexShrink: 0 }}>
          {project.tags.map(tag => (
            <span key={tag} style={{ fontSize: 12, padding: "4px 10px", borderRadius: 12, background: `${project.color}11`, color: project.color, border: `1px solid ${project.color}22`, fontFamily: "monospace" }}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---- UI ----
function SkillBadge({ item, color, delay }) {
  const [ref, inView] = useInView(0.1);
  return (
    <span ref={ref} style={{ display: "inline-block", padding: "6px 14px", borderRadius: 20, border: `1px solid ${color}44`, color, fontSize: 13, background: `${color}11`, margin: "4px", transition: `opacity 0.4s ${delay}ms, transform 0.4s ${delay}ms`, opacity: inView ? 1 : 0, transform: inView ? "scale(1)" : "scale(0.85)" }}>{item}</span>
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

// ---- NAV ----
function Nav({ active, setActive }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 5vw", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", background: scrolled ? "rgba(8,10,16,0.92)" : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none", borderBottom: scrolled ? "1px solid rgba(0,245,196,0.08)" : "none", transition: "all 0.3s" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg, #00f5c4, #7b61ff)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 11, fontWeight: 900, color: "#080a10" }}>FK</span>
        </div>
        <span style={{ color: "#fff", fontWeight: 700, letterSpacing: 1, fontSize: 15 }}>Filip Kušnír</span>
      </div>
      <div style={{ display: "flex", gap: 4 }}>
        {NAV_LINKS.map(l => (
          <a key={l.href} href={`#${l.href}`} onClick={() => setActive(l.href)} style={{ padding: "6px 14px", borderRadius: 8, fontSize: 13, color: active === l.href ? "#00f5c4" : "#8899aa", background: active === l.href ? "rgba(0,245,196,0.08)" : "transparent", textDecoration: "none", transition: "all 0.2s", fontWeight: active === l.href ? 600 : 400 }}>{l.label}</a>
        ))}
      </div>
    </nav>
  );
}

// ---- SECTIONS ----
function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 100); }, []);
  const tags = ["GA4", "Google Ads", "HubSpot", "JavaScript", "REST API", "GTM", "HTML/CSS", "Analytické myslenie"];
  return (
    <section id="about" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "0 5vw", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,245,196,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,196,0.04) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 600, height: 400, background: "radial-gradient(ellipse, rgba(123,97,255,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 900, margin: "0 auto", paddingTop: 80 }}>
        <div style={{ transition: "opacity 0.8s, transform 0.8s", opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(30px)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#00f5c4", boxShadow: "0 0 12px #00f5c4", animation: "pulse 2s infinite" }} />
            <span style={{ color: "#00f5c4", fontSize: 13, letterSpacing: 3, textTransform: "uppercase", fontFamily: "monospace" }}>Dostupný pre pracovné príležitosti</span>
          </div>
          <h1 style={{ fontSize: "clamp(42px, 7vw, 80px)", fontWeight: 900, lineHeight: 1.05, margin: "0 0 20px", color: "#fff", letterSpacing: -2 }}>
            Filip Kušnír<br />
            <span style={{ background: "linear-gradient(90deg, #00f5c4, #7b61ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Marketing Analytik</span>
          </h1>
          <p style={{ fontSize: 18, color: "#8899aa", maxWidth: 580, lineHeight: 1.7, marginBottom: 16 }}>
            Študent magisterského štúdia digitálneho manažmentu na UK Bratislava. Zaujímam sa o výkonnostný marketing, marketingovú analytiku a prácu s dátami.
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 40 }}>
            {CERTIFICATIONS.map(c => (
              <span key={c.name} style={{ fontSize: 12, padding: "5px 12px", borderRadius: 20, background: `${c.color}11`, color: c.color, border: `1px solid ${c.color}33`, fontFamily: "monospace" }}>✓ {c.name}</span>
            ))}
          </div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <a href="#projects" style={{ padding: "14px 32px", borderRadius: 10, background: "#00f5c4", color: "#080a10", fontWeight: 700, textDecoration: "none", fontSize: 15, transition: "transform 0.2s, box-shadow 0.2s" }}
              onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 32px rgba(0,245,196,0.4)"; }}
              onMouseLeave={e => { e.target.style.transform = "none"; e.target.style.boxShadow = "none"; }}>
              Zobraziť projekty →
            </a>
            <a href="#contact" style={{ padding: "14px 32px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.15)", color: "#fff", fontWeight: 600, textDecoration: "none", fontSize: 15 }}>Kontaktujte ma</a>
          </div>
        </div>
        <div style={{ marginTop: 60, display: "flex", flexWrap: "wrap", gap: 10, transition: "opacity 1s 0.5s", opacity: mounted ? 1 : 0 }}>
          {tags.map(tag => (
            <span key={tag} style={{ padding: "8px 16px", borderRadius: 20, border: "1px solid rgba(255,255,255,0.08)", color: "#8899aa", fontSize: 13, background: "rgba(255,255,255,0.02)" }}>{tag}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  const [ref, inView] = useInView();
  return (
    <section style={{ padding: "80px 5vw", borderTop: "1px solid rgba(255,255,255,0.05)" }} ref={ref}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <SectionHeader label="Skúsenosti" title="Prax & Vzdelanie" inView={inView} />
        <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <div>
            <div style={{ fontSize: 11, color: "#00f5c4", letterSpacing: 3, textTransform: "uppercase", fontFamily: "monospace", marginBottom: 20 }}>Pracovné skúsenosti</div>
            {EXPERIENCE.map(e => (
              <div key={e.company} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: 24, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${e.color}, transparent)` }} />
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontWeight: 700, color: "#fff", fontSize: 14 }}>{e.company}</span>
                  <span style={{ fontSize: 11, color: "#64748b", fontFamily: "monospace" }}>{e.location}</span>
                </div>
                <div style={{ fontSize: 13, color: "#00f5c4", marginBottom: 4 }}>{e.role}</div>
                <div style={{ fontSize: 11, color: "#64748b", fontFamily: "monospace", marginBottom: 14 }}>{e.period}</div>
                <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                  {e.points.map((p, i) => (
                    <li key={i} style={{ color: "#8899aa", fontSize: 13, lineHeight: 1.7, paddingLeft: 16, position: "relative", marginBottom: 4 }}>
                      <span style={{ position: "absolute", left: 0, color: "#00f5c4" }}>→</span>{p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 11, color: "#7b61ff", letterSpacing: 3, textTransform: "uppercase", fontFamily: "monospace", marginBottom: 20 }}>Vzdelanie</div>
            {EDUCATION.map(e => (
              <div key={e.school} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: 20, marginBottom: 12, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${e.color}, transparent)` }} />
                <div style={{ fontWeight: 700, color: "#fff", fontSize: 13, marginBottom: 2 }}>{e.school}</div>
                <div style={{ fontSize: 12, color: e.color, marginBottom: 4 }}>{e.degree} — {e.field}</div>
                <div style={{ fontSize: 11, color: "#64748b", fontFamily: "monospace" }}>{e.faculty} · {e.period}</div>
              </div>
            ))}
          </div>
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
        <SectionHeader label="Odbornosť" title="Zručnosti & Nástroje" inView={inView} />
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
    <div ref={ref} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ background: hovered ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)", border: `1px solid ${hovered ? p.color + "44" : "rgba(255,255,255,0.07)"}`, borderRadius: 16, padding: 28, transition: "all 0.3s", transform: inView ? (hovered ? "translateY(-4px)" : "none") : "translateY(20px)", opacity: inView ? 1 : 0, position: "relative", overflow: "hidden" }}>
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
        {p.tags.map(tag => (
          <span key={tag} style={{ fontSize: 12, padding: "4px 10px", borderRadius: 12, background: `${p.color}11`, color: p.color, border: `1px solid ${p.color}22` }}>{tag}</span>
        ))}
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={onPreview} style={{ flex: 1, padding: "11px 0", borderRadius: 10, background: p.color, border: "none", color: "#080a10", fontWeight: 700, fontSize: 13, cursor: "pointer", transition: "all 0.2s", transform: hovered ? "scale(1.02)" : "scale(1)" }}>▶ Live Preview</button>
        <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" style={{ padding: "11px 16px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", color: "#8899aa", textDecoration: "none", fontSize: 13, display: "flex", alignItems: "center" }}
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
        <SectionHeader label="Práca" title="Projekty" inView={inView} />
        <p style={{ color: "#8899aa", fontSize: 15, marginTop: 12, marginBottom: 48 }}>
          Klikni na <span style={{ color: "#00f5c4", fontFamily: "monospace" }}>Live Preview</span> pre zobrazenie projektu priamo tu.
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
        <SectionHeader label="Hĺbková analýza" title="Prípadová štúdia" inView={inView} />
        <div style={{ marginTop: 48, background: "rgba(0,245,196,0.03)", border: "1px solid rgba(0,245,196,0.12)", borderRadius: 20, overflow: "hidden" }}>
          <div style={{ padding: "32px 40px", borderBottom: "1px solid rgba(0,245,196,0.08)" }}>
            <h3 style={{ color: "#fff", fontSize: 22, fontWeight: 800, margin: 0 }}>{CASE_STUDY.title}</h3>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            <div style={{ padding: "32px 40px", borderRight: "1px solid rgba(0,245,196,0.08)" }}>
              <h4 style={{ color: "#ff6b6b", fontSize: 12, letterSpacing: 3, textTransform: "uppercase", margin: "0 0 12px" }}>Cieľ analýzy</h4>
              <p style={{ color: "#8899aa", fontSize: 14, lineHeight: 1.7, margin: 0 }}>{CASE_STUDY.challenge}</p>
              <h4 style={{ color: "#00f5c4", fontSize: 12, letterSpacing: 3, textTransform: "uppercase", margin: "28px 0 12px" }}>Postup</h4>
              <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                {CASE_STUDY.solution.map((s, i) => (
                  <li key={i} style={{ color: "#8899aa", fontSize: 14, lineHeight: 1.7, paddingLeft: 20, position: "relative", marginBottom: 6 }}>
                    <span style={{ position: "absolute", left: 0, color: "#00f5c4" }}>→</span>{s}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ padding: "32px 40px" }}>
              <h4 style={{ color: "#7b61ff", fontSize: 12, letterSpacing: 3, textTransform: "uppercase", margin: "0 0 20px" }}>Zistenia</h4>
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
        <SectionHeader label="Spojme sa" title="Kontakt" inView={inView} centered />
        <p style={{ color: "#8899aa", fontSize: 16, lineHeight: 1.7, margin: "0 0 40px" }}>
          Hľadáte junior analytika alebo niekoho pre digitálny marketing? Rád sa ozvem.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
          {[
            { label: "Email", value: "kxsnirbusiness@gmail.com", icon: "✉", href: "mailto:kxsnirbusiness@gmail.com" },
            { label: "LinkedIn", value: "linkedin.com/in/filip-kušnír", icon: "in", href: "https://www.linkedin.com/in/filip-kušnír-053173210/" },
            { label: "GitHub", value: "github.com/filipxjh", icon: "⌥", href: "https://github.com/filipxjh" },
            { label: "Lokalita", value: "Bratislava, Slovensko / Remote", icon: "◎", href: null },
          ].map(c => (
            <a key={c.label} href={c.href || "#"} target={c.href ? "_blank" : undefined} rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 28px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)", width: "100%", maxWidth: 360, textDecoration: "none", transition: "border-color 0.2s" }}
              onMouseEnter={e => { if(c.href) e.currentTarget.style.borderColor = "rgba(0,245,196,0.3)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
            >
              <span style={{ fontSize: 18, width: 28, textAlign: "center", color: "#00f5c4" }}>{c.icon}</span>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: 11, color: "#8899aa", textTransform: "uppercase", letterSpacing: 2 }}>{c.label}</div>
                <div style={{ color: "#fff", fontSize: 14, fontWeight: 500 }}>{c.value}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [activeNav, setActiveNav] = useState("about");
  return (
    <div style={{ background: "#080a10", minHeight: "100vh", width: "100%", overflowX: "hidden", fontFamily: "'Inter', 'Helvetica Neue', sans-serif", color: "#fff" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        html, body { margin: 0; padding: 0; }
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
      <ExperienceSection />
      <SkillsSection />
      <ProjectsSection />
      <CaseStudySection />
      <ContactSection />
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "24px 5vw", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: "#8899aa", fontSize: 13 }}>© 2026 Filip Kušnír — Digitálny marketing & Analytika</span>
        <span style={{ color: "#8899aa", fontSize: 13, fontFamily: "monospace" }}>Built with React</span>
      </footer>
    </div>
  );
}
