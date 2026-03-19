import { useState, useEffect, useRef } from "react";

const NAV_LINKS = [
  { label: "O mne",            href: "about" },
  { label: "Zručnosti",        href: "skills" },
  { label: "Projekty",         href: "projects" },
  { label: "Prípadové štúdie", href: "case-studies" },
  { label: "Kontakt",          href: "contact" },
];

const SKILLS = [
  { category: "Analytics & Data",       items: ["Google Analytics 4", "Looker Studio", "GTM", "SQL", "Excel / Sheets"],            bg: "#eff6ff", accent: "#1d4ed8", border: "#bfdbfe" },
  { category: "Performance Marketing",  items: ["Google Ads", "Meta Ads", "Inbound Marketing", "UTM Tracking", "PPC"],             bg: "#eef2ff", accent: "#4338ca", border: "#c7d2fe" },
  { category: "Tools & Platforms",      items: ["HubSpot", "AI nástroje", "Databázové systémy", "REST API", "Git"],                bg: "#f5f3ff", accent: "#6d28d9", border: "#ddd6fe" },
  { category: "Web Development",        items: ["JavaScript", "HTML / CSS", "React", "Node.js", "Vite"],                           bg: "#faf5ff", accent: "#7c3aed", border: "#e9d5ff" },
];

const CERTIFICATIONS = [
  { name: "Google Analytics 4", issuer: "Google" },
  { name: "Google Ads Search",  issuer: "Google" },
  { name: "Inbound Marketing",  issuer: "HubSpot Academy" },
];

const LIVE_PROJECTS = [
  {
    id: "dashboard",
    title: "GA4 Marketing Analytics Dashboard",
    type: "Data Visualization",
    tags: ["Chart.js", "GA4", "JavaScript", "KPI"],
    description: "Dashboard vizualizujúci výkonnosť kampaní z GA4 Demo Account (Google Merchandise Store). Zobrazuje KPI metriky, traffic sources a channel breakdown za Q4 2025 – Q1 2026.",
    liveUrl: "/dashboard",
    githubUrl: "https://github.com/filipxjh/portfolio",
  },
  {
    id: "dnd",
    title: "Dark & Darker Build Editor",
    type: "Full-Stack Web App",
    tags: ["JavaScript", "REST API", "HTML/CSS", "Node.js"],
    description: "Webová aplikácia napojená na DarkerDB API pre real-time načítanie herných dát. Dynamický výpočet 20+ štatistík postavy, výber vybavenia a ukladanie zostáv.",
    liveUrl: "/dnd-builds",
    githubUrl: "https://github.com/filipxjh/portfolio",
  },
];

const EXPERIENCE = [
  {
    company: "Ľudovít Nastišin (SZČO)",
    location: "Prešov",
    role: "Digitálny dizajn & marketingová komunikácia",
    period: "11/2024 — 02/2025",
    points: [
      "Tvorba vizuálnych podkladov pre online komunikáciu klienta",
      "Príprava grafických materiálov pre digitálne kampane",
      "Podpora pri tvorbe obsahovej stratégie",
    ],
  },
];

const EDUCATION = [
  { school: "Univerzita Komenského, Bratislava", degree: "Mgr.", field: "Digitálny manažment a online marketing", period: "2025 — súčasnosť" },
  { school: "Prešovská univerzita",              degree: "Bc.",  field: "Obchodný manažment a marketing",         period: "2022 — 2025" },
  { school: "SPŠE Prešov",                       degree: "Maturita", field: "Informačné a sieťové technológie",  period: "2018 — 2022" },
];

const CASE_STUDIES = [
  {
    id: "ga4",
    index: "01",
    color: "#1d4ed8",
    colorLight: "#eef2ff",
    title: "GA4 Demo Account — Analýza akvizície",
    subtitle: "Google Merchandise Store · Dec 2025 – Mar 2026",
    context: "Použil som verejne dostupný GA4 Demo Account od Google (Property ID: 213025502) ako reálny dátový zdroj. Cieľom bolo prejsť celý analytický proces — od zberu dát cez interpretáciu až po vizualizáciu — rovnako ako by som to robil pri skutočnom klientovi.",
    what: [
      "Preskúmal som 90-dňové dáta: 226 418 relácií, 164 579 aktívnych používateľov",
      "Identifikoval som dominantný kanál — Direct traffic tvorí 47.9 % všetkých relácií",
      "Porovnal mieru interakcie naprieč kanálmi (Cross-network 79.5 % vs. Direct 34.6 %)",
      "Navrhol custom Chart.js dashboard s animovanými KPI pre rýchlu orientáciu",
    ],
    findings: [
      { label: "Celkové relácie", value: "226 418" },
      { label: "Miera interakcie", value: "45.95 %" },
      { label: "Direct podiel", value: "47.9 %" },
      { label: "Organic Search", value: "22.4 %" },
    ],
    takeaway: "Dominancia Direct trafficu pri nízkej miere interakcie (34.6 %) naznačuje, že značná časť návštevníkov prichádza bez jasného zámeru — priestor pre lepší remarketing a obsahovú stratégiu.",
  },
  {
    id: "dnd",
    index: "02",
    color: "#4338ca",
    colorLight: "#eef2ff",
    title: "Build Editor — od API po funkčný produkt",
    subtitle: "Dark & Darker · Full-Stack projekt",
    context: "Začal som s jednoduchým nápadom: vytvoriť nástroj pre hráčov, ktorý im pomôže plánovať herné zostavy. Projekt prerástol do full-stack aplikácie s externým API, serverless proxy a vlastným dizajnom.",
    what: [
      "Analyzoval som DarkerDB API dokumentáciu a pochopil bitmask systém pre filtrovanie tried",
      "Vytvoril Vercel serverless proxy (/api/items.js) na obídenie CORS obmedzení externého API",
      "Implementoval dynamický výpočet 20+ herných štatistík podľa reálnych vzorcov z hry",
      "Navrhol UI v metalickom štýle — cut-corner elementy, tmavá paleta, grain textúra",
    ],
    findings: [
      { label: "API endpoint",  value: "DarkerDB v1" },
      { label: "Herné vzorce", value: "20+" },
      { label: "Herné triedy", value: "10" },
      { label: "Ukladanie",    value: "localStorage" },
    ],
    takeaway: "Hlavná technická výzva bola CORS — vyriešil som ju Vercel serverless funkciou ktorá proxy-uje requesty na externé API. Projekt ukázal, že aj fanúšikovský projekt môže mať produkčnú kvalitu.",
  },
];

const TICKER_ITEMS = ["GA4", "Google Ads", "Meta Ads", "HubSpot", "REST API", "UTM Tracking", "Chart.js", "React", "JavaScript", "Looker Studio", "GTM", "PPC", "Inbound Marketing", "SQL", "Node.js"];

// ── HOOKS ─────────────────────────────────────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

// ── XJH LOGO ──────────────────────────────────────────────────────────────────

function KusnirLogo({ dark = true }) {
  const color = dark ? "#1a1a1a" : "#fcfaf7";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
      <span style={{
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: 900,
        fontSize: 15,
        letterSpacing: 3,
        textTransform: "uppercase",
        color: color,
        lineHeight: 1,
      }}>Kušnír</span>
      <span style={{
        width: 5, height: 5, borderRadius: "50%",
        background: "linear-gradient(135deg, #1d4ed8, #6d28d9)",
        flexShrink: 0, marginBottom: 1,
      }} />
    </div>
  );
}

// ── NAV ───────────────────────────────────────────────────────────────────────

function Nav({ active, setActive }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleLink = (href) => { setActive(href); setMenuOpen(false); };

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        height: 60, display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 5vw", position: "fixed",
        background: scrolled ? "rgba(252,250,247,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,0.06)" : "none",
        transition: "all 0.3s ease",
      }}>
        {/* Logo left */}
        <a href="#about" onClick={() => handleLink("about")} style={{ textDecoration: "none", display: "flex", alignItems: "center", minWidth: 100 }}>
          <KusnirLogo dark={true} />
        </a>
        {/* Nav center */}
        <div className="nav-desktop" style={{ display: "flex", gap: 2, position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
          {NAV_LINKS.map(l => (
            <a key={l.href} href={`#${l.href}`} onClick={() => handleLink(l.href)}
              style={{ padding: "6px 14px", fontSize: 13, textDecoration: "none", color: active === l.href ? "#1a1a1a" : "#888", fontWeight: active === l.href ? 600 : 400, borderBottom: active === l.href ? "1.5px solid #1a1a1a" : "1.5px solid transparent", transition: "all 0.15s", whiteSpace: "nowrap" }}
              onMouseEnter={e => { if (active !== l.href) e.currentTarget.style.color = "#1a1a1a"; }}
              onMouseLeave={e => { if (active !== l.href) e.currentTarget.style.color = "#888"; }}
            >{l.label}</a>
          ))}
        </div>
        <button className="nav-hamburger" onClick={() => setMenuOpen(v => !v)}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 8, display: "none", flexDirection: "column", gap: 5 }}>
          <span style={{ display: "block", width: 22, height: 1.5, background: "#1a1a1a", transition: "all 0.2s", transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : "none" }} />
          <span style={{ display: "block", width: 22, height: 1.5, background: "#1a1a1a", transition: "all 0.2s", opacity: menuOpen ? 0 : 1 }} />
          <span style={{ display: "block", width: 22, height: 1.5, background: "#1a1a1a", transition: "all 0.2s", transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none" }} />
        </button>
      </nav>
      <div style={{ position: "fixed", inset: 0, zIndex: 190, background: "#fcfaf7", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? "all" : "none", transition: "opacity 0.2s" }}>
        {NAV_LINKS.map(l => (
          <a key={l.href} href={`#${l.href}`} onClick={() => handleLink(l.href)}
            style={{ fontSize: 32, fontWeight: 800, color: "#1a1a1a", textDecoration: "none", padding: "12px 20px", letterSpacing: -1, fontFamily: "'Montserrat', sans-serif" }}>
            {l.label}
          </a>
        ))}
      </div>
    </>
  );
}

// ── TICKER ────────────────────────────────────────────────────────────────────

function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div style={{ overflow: "hidden", borderTop: "1px solid rgba(0,0,0,0.07)", borderBottom: "1px solid rgba(0,0,0,0.07)", padding: "11px 0", background: "#fff" }}>
      <div style={{ display: "flex", gap: 0, animation: "ticker 28s linear infinite", width: "max-content" }}>
        {items.map((item, i) => (
          <span key={i} style={{ fontSize: 12, color: "#aaa", fontFamily: "'DM Mono', monospace", letterSpacing: 2, textTransform: "uppercase", padding: "0 28px", borderRight: "1px solid rgba(0,0,0,0.07)", whiteSpace: "nowrap" }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── HERO ──────────────────────────────────────────────────────────────────────

function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);
  return (
    <section id="about" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 5vw", background: "#fcfaf7", position: "relative", overflow: "hidden" }}>
      {/* Grain texture overlay */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2, opacity: 0.55, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23grain)' opacity='0.25'/%3E%3C/svg%3E")`, backgroundRepeat: "repeat" }} />
      {/* Subtle animated gradient blobs */}
      <div style={{ position: "absolute", top: "15%", right: "5%", width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle, rgba(29,78,216,0.09) 0%, transparent 70%)", pointerEvents: "none", animation: "blobFloat 8s ease-in-out infinite" }} />
      <div style={{ position: "absolute", bottom: "10%", left: "0%", width: 500, height: 360, borderRadius: "50%", background: "radial-gradient(circle, rgba(109,40,217,0.07) 0%, transparent 70%)", pointerEvents: "none", animation: "blobFloat 11s ease-in-out infinite reverse" }} />
      <div style={{ position: "absolute", top: "55%", left: "40%", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(67,56,202,0.06) 0%, transparent 70%)", pointerEvents: "none", animation: "blobFloat 14s ease-in-out infinite 2s" }} />

      <div style={{ maxWidth: 900, margin: "0 auto", paddingTop: 80, width: "100%", position: "relative", transition: "opacity 0.9s, transform 0.9s", opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(24px)" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", border: "1px solid rgba(0,0,0,0.08)", marginBottom: 40, background: "#fff" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "block", flexShrink: 0 }} />
          <span style={{ fontSize: 11.5, color: "#555", letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "'DM Mono', monospace" }}>Dostupný pre pracovné príležitosti</span>
        </div>

        <h1 style={{ fontSize: "clamp(52px, 9vw, 96px)", fontWeight: 800, lineHeight: 0.95, margin: "0 0 28px", color: "#1a1a1a", letterSpacing: -4, fontFamily: "'Montserrat', sans-serif" }}>
          Filip<br />
          <span style={{ position: "relative", display: "inline-block" }}>
            Kušnír
            <span style={{ position: "absolute", bottom: 4, left: 0, right: 0, height: 6, background: "linear-gradient(90deg, #1d4ed8, #6d28d9)", opacity: 0.3, zIndex: -1 }} />
          </span>
        </h1>

        <p style={{ fontSize: "clamp(16px, 2vw, 20px)", color: "#555", marginBottom: 18, fontWeight: 400, letterSpacing: -0.2 }}>
          Marketing analytik & výkonnostný marketing
        </p>

        <p style={{ fontSize: 15.5, color: "#888", maxWidth: 500, lineHeight: 1.8, marginBottom: 40 }}>
          Študujem digitálny manažment na UK Bratislava. Zaujíma ma priestor kde sa stretávajú dáta, kampane a reálne obchodné výsledky — nie len štatistiky pre štatistiky.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 48 }}>
          {CERTIFICATIONS.map(c => (
            <span key={c.name} style={{ fontSize: 11.5, padding: "5px 12px", border: "1px solid rgba(0,0,0,0.1)", color: "#555", background: "#fff", fontFamily: "'DM Mono', monospace" }}>
              {c.name} · {c.issuer}
            </span>
          ))}
        </div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a href="#projects" style={{ padding: "13px 28px", background: "#1a1a1a", color: "#fcfaf7", fontWeight: 600, textDecoration: "none", fontSize: 14, transition: "background 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.background = "#333"}
            onMouseLeave={e => e.currentTarget.style.background = "#1a1a1a"}>
            Zobraziť projekty
          </a>
          <a href="#contact" style={{ padding: "13px 28px", border: "1px solid rgba(0,0,0,0.15)", color: "#1a1a1a", fontWeight: 500, textDecoration: "none", fontSize: 14, background: "transparent", transition: "background 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(0,0,0,0.04)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
            Kontakt
          </a>
        </div>
      </div>
    </section>
  );
}

// ── SECTION HEADER ────────────────────────────────────────────────────────────

function SectionHeader({ index, title, inView }) {
  return (
    <div style={{ marginBottom: 52, transition: "opacity 0.6s, transform 0.6s", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(16px)" }}>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#bbb", letterSpacing: 3, textTransform: "uppercase", marginBottom: 10 }}>{index}</div>
      <h2 style={{ fontSize: "clamp(30px, 4.5vw, 48px)", fontWeight: 800, color: "#1a1a1a", margin: 0, letterSpacing: -1.5, fontFamily: "'Montserrat', sans-serif", lineHeight: 1.05 }}>{title}</h2>
    </div>
  );
}

// ── EXPERIENCE ────────────────────────────────────────────────────────────────

function ExperienceSection() {
  const [ref, inView] = useInView();
  return (
    <section style={{ padding: "100px 5vw", background: "#fff", borderTop: "1px solid rgba(0,0,0,0.06)" }} ref={ref}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <SectionHeader index="Kariéra" title="Prax & Vzdelanie" inView={inView} />
        <div className="exp-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
          <div>
            <div style={{ fontSize: 11, color: "#bbb", letterSpacing: 3, textTransform: "uppercase", fontFamily: "'DM Mono', monospace", marginBottom: 24 }}>Skúsenosti</div>
            {EXPERIENCE.map(e => (
              <div key={e.company} style={{ borderLeft: "3px solid #1d4ed8", paddingLeft: 24 }}>
                <div style={{ fontWeight: 700, color: "#1a1a1a", fontSize: 15, marginBottom: 2 }}>{e.company}</div>
                <div style={{ fontSize: 13, color: "#555", marginBottom: 2 }}>{e.role}</div>
                <div style={{ fontSize: 11, color: "#bbb", fontFamily: "'DM Mono', monospace", marginBottom: 14 }}>{e.period} · {e.location}</div>
                <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                  {e.points.map((p, i) => (
                    <li key={i} style={{ color: "#666", fontSize: 13.5, lineHeight: 1.7, marginBottom: 5, paddingLeft: 14, position: "relative" }}>
                      <span style={{ position: "absolute", left: 0, color: "#1d4ed8" }}>–</span>{p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 11, color: "#bbb", letterSpacing: 3, textTransform: "uppercase", fontFamily: "'DM Mono', monospace", marginBottom: 24 }}>Vzdelanie</div>
            {EDUCATION.map((e, i) => (
              <div key={e.school} style={{ borderLeft: `3px solid ${["#1d4ed8","#4338ca","#6d28d9"][i]}`, paddingLeft: 24, marginBottom: 28 }}>
                <div style={{ fontWeight: 600, color: "#1a1a1a", fontSize: 14, marginBottom: 3 }}>{e.school}</div>
                <div style={{ fontSize: 13, color: "#555", marginBottom: 3 }}>{e.degree} — {e.field}</div>
                <div style={{ fontSize: 11, color: "#bbb", fontFamily: "'DM Mono', monospace" }}>{e.period}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── SKILLS ────────────────────────────────────────────────────────────────────

function SkillsSection() {
  const [ref, inView] = useInView();
  return (
    <section id="skills" style={{ padding: "100px 5vw", background: "#fcfaf7" }} ref={ref}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <SectionHeader index="Odbornosť" title="Zručnosti & Nástroje" inView={inView} />
        <div className="skills-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
          {SKILLS.map(s => (
            <div key={s.category} style={{ background: s.bg, padding: "28px 24px", border: `1px solid ${s.border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <span style={{ width: 10, height: 10, borderRadius: 2, background: s.accent, display: "block", flexShrink: 0 }} />
                <div style={{ fontWeight: 700, fontSize: 13, color: "#1a1a1a" }}>{s.category}</div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {s.items.map(item => (
                  <span key={item} style={{ fontSize: 12.5, padding: "5px 11px", border: `1px solid ${s.border}`, color: s.accent, background: "#fff", fontWeight: 500 }}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── PROJECTS ──────────────────────────────────────────────────────────────────

function ProjectModal({ project, onClose }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, animation: "fadeIn 0.2s ease" }}>
      <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 1100, background: "#fff", overflow: "hidden", display: "flex", flexDirection: "column", maxHeight: "90vh", animation: "slideUp 0.22s ease" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderBottom: "1px solid rgba(0,0,0,0.07)", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontWeight: 700, fontSize: 14, color: "#1a1a1a" }}>{project.title}</span>
            <span style={{ fontSize: 11, color: "#bbb", fontFamily: "'DM Mono', monospace" }}>{project.type}</span>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" style={{ padding: "6px 14px", fontSize: 12, border: "1px solid rgba(0,0,0,0.1)", color: "#555", textDecoration: "none", fontFamily: "'DM Mono', monospace" }}>GitHub</a>
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{ padding: "6px 14px", fontSize: 12, background: "#1a1a1a", color: "#fff", fontWeight: 600, textDecoration: "none" }}>↗ Otvoriť</a>
            <button onClick={onClose} style={{ width: 30, height: 30, border: "1px solid rgba(0,0,0,0.1)", background: "none", color: "#777", cursor: "pointer", fontSize: 14 }}>✕</button>
          </div>
        </div>
        <div style={{ flex: 1, position: "relative", minHeight: 500 }}>
          {!loaded && (
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12, background: "#f8f8f8" }}>
              <div style={{ width: 24, height: 24, border: "2px solid #1a1a1a", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
              <div style={{ color: "#bbb", fontSize: 12, fontFamily: "'DM Mono', monospace" }}>Načítavam...</div>
            </div>
          )}
          <iframe src={project.liveUrl} title={project.title} onLoad={() => setLoaded(true)} style={{ width: "100%", height: "100%", border: "none", minHeight: 500, opacity: loaded ? 1 : 0, transition: "opacity 0.3s" }} />
        </div>
        <div style={{ padding: "10px 20px", borderTop: "1px solid rgba(0,0,0,0.06)", display: "flex", gap: 6, flexWrap: "wrap", flexShrink: 0 }}>
          {project.tags.map(tag => (
            <span key={tag} style={{ fontSize: 11, padding: "3px 8px", border: "1px solid rgba(0,0,0,0.1)", color: "#555", fontFamily: "'DM Mono', monospace" }}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project: p, onPreview }) {
  const [hovered, setHovered] = useState(false);
  const [ref, inView] = useInView(0.1);
  return (
    <div ref={ref} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ border: "1px solid rgba(0,0,0,0.07)", padding: "32px 28px", background: hovered ? "#fff" : "#fcfaf7", transition: "all 0.22s", transform: inView ? "none" : "translateY(14px)", opacity: inView ? 1 : 0 }}>
      <div style={{ fontSize: 11, color: "#bbb", textTransform: "uppercase", letterSpacing: 2, fontFamily: "'DM Mono', monospace", marginBottom: 14 }}>{p.type}</div>
      <h3 style={{ color: "#1a1a1a", fontSize: 20, fontWeight: 700, margin: "0 0 12px", letterSpacing: -0.5, fontFamily: "'Montserrat', sans-serif" }}>{p.title}</h3>
      <p style={{ color: "#777", fontSize: 14, lineHeight: 1.75, margin: "0 0 22px" }}>{p.description}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 22 }}>
        {p.tags.map(tag => (
          <span key={tag} style={{ fontSize: 11, padding: "4px 10px", border: "1px solid rgba(0,0,0,0.08)", color: "#666", fontFamily: "'DM Mono', monospace" }}>{tag}</span>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={onPreview} style={{ flex: 1, padding: "11px 0", background: "#1a1a1a", border: "none", color: "#fff", fontWeight: 600, fontSize: 13, cursor: "pointer", transition: "background 0.18s" }}
          onMouseEnter={e => e.currentTarget.style.background = "#333"}
          onMouseLeave={e => e.currentTarget.style.background = "#1a1a1a"}>
          Live Preview
        </button>
        <a href={p.githubUrl} target="_blank" rel="noopener noreferrer"
          style={{ padding: "11px 16px", border: "1px solid rgba(0,0,0,0.1)", color: "#666", textDecoration: "none", fontSize: 13, display: "flex", alignItems: "center", transition: "all 0.15s" }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "#1a1a1a"; e.currentTarget.style.color = "#1a1a1a"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.1)"; e.currentTarget.style.color = "#666"; }}>
          GitHub
        </a>
      </div>
    </div>
  );
}

function ProjectsSection() {
  const [ref, inView] = useInView();
  const [activeModal, setActiveModal] = useState(null);
  return (
    <section id="projects" style={{ padding: "100px 5vw", background: "#fff", borderTop: "1px solid rgba(0,0,0,0.06)" }} ref={ref}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <SectionHeader index="Práca" title="Projekty" inView={inView} />
        <div className="proj-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 16 }}>
          {LIVE_PROJECTS.map(p => <ProjectCard key={p.id} project={p} onPreview={() => setActiveModal(p)} />)}
        </div>
      </div>
      {activeModal && <ProjectModal project={activeModal} onClose={() => setActiveModal(null)} />}
    </section>
  );
}

// ── CASE STUDIES ──────────────────────────────────────────────────────────────

function CaseStudyCard({ cs }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ borderTop: "1px solid rgba(0,0,0,0.07)", paddingTop: 52, marginTop: 52, transition: "opacity 0.7s, transform 0.7s", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(18px)" }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 24, marginBottom: 40 }}>
        <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(48px, 6vw, 72px)", fontWeight: 900, color: cs.color, lineHeight: 1, opacity: 0.9, flexShrink: 0 }}>{cs.index}</span>
        <div style={{ paddingTop: 8 }}>
          <h3 style={{ fontSize: "clamp(18px, 2.8vw, 26px)", fontWeight: 800, color: "#1a1a1a", margin: 0, letterSpacing: -0.5, fontFamily: "'Montserrat', sans-serif" }}>{cs.title}</h3>
          <div style={{ fontSize: 11.5, color: "#bbb", fontFamily: "'DM Mono', monospace", marginTop: 5 }}>{cs.subtitle}</div>
        </div>
      </div>

      <div className="cs-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
        <div>
          <div style={{ fontSize: 11, color: "#bbb", letterSpacing: 2, textTransform: "uppercase", fontFamily: "'DM Mono', monospace", marginBottom: 10 }}>Kontext</div>
          <p style={{ color: "#555", fontSize: 14, lineHeight: 1.8, margin: "0 0 28px" }}>{cs.context}</p>
          <div style={{ fontSize: 11, color: "#bbb", letterSpacing: 2, textTransform: "uppercase", fontFamily: "'DM Mono', monospace", marginBottom: 10 }}>Čo som robil</div>
          <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {cs.what.map((w, i) => (
              <li key={i} style={{ color: "#555", fontSize: 14, lineHeight: 1.75, marginBottom: 8, paddingLeft: 18, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, color: cs.color, fontWeight: 700 }}>→</span>{w}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div style={{ fontSize: 11, color: "#bbb", letterSpacing: 2, textTransform: "uppercase", fontFamily: "'DM Mono', monospace", marginBottom: 10 }}>Kľúčové čísla</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "rgba(0,0,0,0.06)", marginBottom: 24 }}>
            {cs.findings.map(f => (
              <div key={f.label} style={{ background: cs.colorLight, padding: "20px 18px" }}>
                <div style={{ fontSize: 11, color: "#aaa", fontFamily: "'DM Mono', monospace", marginBottom: 6 }}>{f.label}</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: cs.color, letterSpacing: -0.5, fontFamily: "'Montserrat', sans-serif" }}>{f.value}</div>
              </div>
            ))}
          </div>
          <div style={{ padding: "18px 20px", borderLeft: `3px solid ${cs.color}`, background: cs.colorLight }}>
            <div style={{ fontSize: 11, color: "#bbb", letterSpacing: 2, textTransform: "uppercase", fontFamily: "'DM Mono', monospace", marginBottom: 8 }}>Zistenie</div>
            <p style={{ color: "#444", fontSize: 14, lineHeight: 1.75, margin: 0, fontStyle: "italic" }}>{cs.takeaway}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CaseStudySection() {
  const [ref, inView] = useInView();
  return (
    <section id="case-studies" style={{ padding: "100px 5vw", background: "#fcfaf7", borderTop: "1px solid rgba(0,0,0,0.06)" }} ref={ref}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <SectionHeader index="Hĺbková analýza" title="Prípadové štúdie" inView={inView} />
        {CASE_STUDIES.map((cs) => <CaseStudyCard key={cs.id} cs={cs} />)}
      </div>
    </section>
  );
}

// ── CONTACT ───────────────────────────────────────────────────────────────────

function ContactSection() {
  const [ref, inView] = useInView();
  return (
    <section id="contact" style={{ padding: "100px 5vw 120px", background: "#1a1a1a" }} ref={ref}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ transition: "opacity 0.6s, transform 0.6s", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(16px)" }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#444", letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>Kontakt</div>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 58px)", fontWeight: 800, color: "#fcfaf7", margin: "0 0 20px", letterSpacing: -2, fontFamily: "'Montserrat', sans-serif", lineHeight: 1.0 }}>
            Máte projekt<br />alebo otázku?
          </h2>
          <p style={{ color: "#666", fontSize: 15.5, lineHeight: 1.8, margin: "0 0 52px", maxWidth: 440 }}>
            Hľadám junior pozíciu v oblasti analytics alebo performance marketingu. Nebojte sa napísať aj keď len chcete prediskutovať nejakú tému.
          </p>
        </div>
        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 1, background: "rgba(255,255,255,0.06)" }}>
          {[
            { label: "Email",    value: "kxsnirbusiness@gmail.com",  href: "mailto:kxsnirbusiness@gmail.com", color: "#1d4ed8" },
            { label: "LinkedIn", value: "filip-kušnír",               href: "https://www.linkedin.com/in/filip-kušnír-053173210/", color: "#4338ca" },
            { label: "GitHub",   value: "filipxjh",                   href: "https://github.com/filipxjh", color: "#6d28d9" },
            { label: "Lokalita", value: "Bratislava / Remote",        href: null, color: "#7c3aed" },
          ].map(c => (
            <a key={c.label} href={c.href || "#"} target={c.href ? "_blank" : undefined} rel="noopener noreferrer"
              style={{ display: "block", padding: "26px 22px", background: "#1a1a1a", textDecoration: "none", transition: "background 0.15s", borderTop: `3px solid ${c.color}` }}
              onMouseEnter={e => { if (c.href) e.currentTarget.style.background = "#242424"; }}
              onMouseLeave={e => e.currentTarget.style.background = "#1a1a1a"}>
              <div style={{ fontSize: 10, color: "#444", textTransform: "uppercase", letterSpacing: 2, fontFamily: "'DM Mono', monospace", marginBottom: 8 }}>{c.label}</div>
              <div style={{ color: "#fcfaf7", fontSize: 13.5, fontWeight: 500 }}>{c.value}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── APP ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [activeNav, setActiveNav] = useState("about");
  return (
    <div style={{ background: "#fcfaf7", minHeight: "100vh", width: "100%", overflowX: "hidden", fontFamily: "'Montserrat', sans-serif", color: "#1a1a1a" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,700&display=swap');
        * { box-sizing: border-box; }
        html, body { margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #fcfaf7; }
        ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.12); }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes slideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes blobFloat { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(20px,-15px) scale(1.04)} 66%{transform:translate(-10px,20px) scale(0.97)} }

        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
          .exp-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .skills-grid { grid-template-columns: 1fr !important; }
          .proj-grid { grid-template-columns: 1fr !important; }
          .cs-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .contact-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <Nav active={activeNav} setActive={setActiveNav} />
      <Hero />
      <Ticker />
      <ExperienceSection />
      <SkillsSection />
      <ProjectsSection />
      <CaseStudySection />
      <ContactSection />
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "20px 5vw", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#1a1a1a", flexWrap: "wrap", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <KusnirLogo dark={false} />
          <span style={{ color: "#444", fontSize: 12, fontFamily: "'DM Mono', monospace" }}>© 2026 Filip Kušnír</span>
        </div>
        <span style={{ color: "#444", fontSize: 12, fontFamily: "'DM Mono', monospace" }}>Digital Marketing & Analytics</span>
      </footer>
    </div>
  );
}
