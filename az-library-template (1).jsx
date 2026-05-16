import { useState, useCallback } from "react";

/*
 ╔══════════════════════════════════════════════════════════════╗
 ║  A-Z LIBRARY TEMPLATE                                       ║
 ║  Artifact Template Brand                                     ║
 ║  WCAG 2.1 AA Accessible + Mobile Optimized                  ║
 ║                                                              ║
 ║  HOW TO CUSTOMIZE:                                           ║
 ║  1. Replace LIBRARY_CONFIG with your topic details           ║
 ║  2. Replace the entries array with your A-Z content          ║
 ║  3. Update category filters to match your content            ║
 ║  4. Each entry needs: letter, name, icon, summary,           ║
 ║     details, example, whoItsFor                              ║
 ╚══════════════════════════════════════════════════════════════╝
*/

// ─── STEP 1: CONFIGURE YOUR LIBRARY ─────────────────────────
const LIBRARY_CONFIG = {
  title: "Your A-Z Library Title",
  titleAccent: "Library",
  subtitle: "COMPLETE A-Z GUIDE",
  heroDescription: "Replace this with a compelling description of your A-Z library. What will readers discover? Why does it matter? This is your hook.",
  ctaText: "Your Call to Action",
  ctaUrl: "https://your-link-here.com",
  // ─── VIDEO CONFIG ──────────────────────────────────────────
  // Option A: YouTube link with auto-thumbnail
  videoUrl: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID",
  videoId: "YOUR_VIDEO_ID",  // extract from YouTube URL
  // Option B: Custom thumbnail (base64 or external URL)
  // videoThumb: "data:image/jpeg;base64,YOUR_BASE64_HERE",
  videoThumb: null,
};

// ─── STEP 2: ADD YOUR A-Z ENTRIES ────────────────────────────
// Replace the name, icon, summary, details, example, and whoItsFor
// for each letter. Add multiple entries per letter if needed
// (just use the same letter value).
const entries = [
  {
    letter: "A",
    name: "Alpha Entry",
    icon: "\u{2728}",
    summary: "Replace with a one-line summary of your A entry.",
    details: "Replace with a fuller explanation of why this matters, what problem it solves, and what value it creates.",
    example: "Replace with a concrete, real-world example.",
    whoItsFor: "Replace with who benefits most from this.",
  },
  {
    letter: "B",
    name: "Bravo Entry",
    icon: "\u{1F4CA}",
    summary: "Replace with a one-line summary of your B entry.",
    details: "Replace with a fuller explanation of why this matters.",
    example: "Replace with a concrete, real-world example.",
    whoItsFor: "Replace with who benefits most from this.",
  },
  {
    letter: "C",
    name: "Charlie Entry",
    icon: "\u{1F3C6}",
    summary: "Replace with a one-line summary of your C entry.",
    details: "Replace with a fuller explanation of why this matters.",
    example: "Replace with a concrete, real-world example.",
    whoItsFor: "Replace with who benefits most from this.",
  },
  {
    letter: "D",
    name: "Delta Entry",
    icon: "\u{1F4B0}",
    summary: "Replace with a one-line summary of your D entry.",
    details: "Replace with a fuller explanation of why this matters.",
    example: "Replace with a concrete, real-world example.",
    whoItsFor: "Replace with who benefits most from this.",
  },
  {
    letter: "E",
    name: "Echo Entry",
    icon: "\u{1F3A4}",
    summary: "Replace with a one-line summary of your E entry.",
    details: "Replace with a fuller explanation of why this matters.",
    example: "Replace with a concrete, real-world example.",
    whoItsFor: "Replace with who benefits most from this.",
  },
  {
    letter: "F",
    name: "Foxtrot Entry",
    icon: "\u{1F5FA}\u{FE0F}",
    summary: "Replace with a one-line summary of your F entry.",
    details: "Replace with a fuller explanation of why this matters.",
    example: "Replace with a concrete, real-world example.",
    whoItsFor: "Replace with who benefits most from this.",
  },
  {
    letter: "G",
    name: "Golf Entry",
    icon: "\u{2B50}",
    summary: "Replace with a one-line summary of your G entry.",
    details: "Replace with a fuller explanation of why this matters.",
    example: "Replace with a concrete, real-world example.",
    whoItsFor: "Replace with who benefits most from this.",
  },
  {
    letter: "H",
    name: "Hotel Entry",
    icon: "\u{26A1}",
    summary: "Replace with a one-line summary of your H entry.",
    details: "Replace with a fuller explanation of why this matters.",
    example: "Replace with a concrete, real-world example.",
    whoItsFor: "Replace with who benefits most from this.",
  },
  {
    letter: "I",
    name: "India Entry",
    icon: "\u{1F331}",
    summary: "Replace with a one-line summary of your I entry.",
    details: "Replace with a fuller explanation of why this matters.",
    example: "Replace with a concrete, real-world example.",
    whoItsFor: "Replace with who benefits most from this.",
  },
  {
    letter: "J",
    name: "Juliet Entry",
    icon: "\u{1F517}",
    summary: "Replace with a one-line summary of your J entry.",
    details: "Replace with a fuller explanation of why this matters.",
    example: "Replace with a concrete, real-world example.",
    whoItsFor: "Replace with who benefits most from this.",
  },
  {
    letter: "K",
    name: "Kilo Entry",
    icon: "\u{1F4DA}",
    summary: "Replace with a one-line summary of your K entry.",
    details: "Replace with a fuller explanation of why this matters.",
    example: "Replace with a concrete, real-world example.",
    whoItsFor: "Replace with who benefits most from this.",
  },
  {
    letter: "L",
    name: "Lima Entry",
    icon: "\u{1F534}",
    summary: "Replace with a one-line summary of your L entry.",
    details: "Replace with a fuller explanation of why this matters.",
    example: "Replace with a concrete, real-world example.",
    whoItsFor: "Replace with who benefits most from this.",
  },
  {
    letter: "M",
    name: "Mike Entry",
    icon: "\u{1F9E0}",
    summary: "Replace with a one-line summary of your M entry.",
    details: "Replace with a fuller explanation of why this matters.",
    example: "Replace with a concrete, real-world example.",
    whoItsFor: "Replace with who benefits most from this.",
  },
  {
    letter: "N",
    name: "November Entry",
    icon: "\u{1F91D}",
    summary: "Replace with a one-line summary of your N entry.",
    details: "Replace with a fuller explanation of why this matters.",
    example: "Replace with a concrete, real-world example.",
    whoItsFor: "Replace with who benefits most from this.",
  },
  {
    letter: "O",
    name: "Oscar Entry",
    icon: "\u{1F4D6}",
    summary: "Replace with a one-line summary of your O entry.",
    details: "Replace with a fuller explanation of why this matters.",
    example: "Replace with a concrete, real-world example.",
    whoItsFor: "Replace with who benefits most from this.",
  },
  {
    letter: "P",
    name: "Papa Entry",
    icon: "\u{1F504}",
    summary: "Replace with a one-line summary of your P entry.",
    details: "Replace with a fuller explanation of why this matters.",
    example: "Replace with a concrete, real-world example.",
    whoItsFor: "Replace with who benefits most from this.",
  },
  {
    letter: "Q",
    name: "Quebec Entry",
    icon: "\u{2753}",
    summary: "Replace with a one-line summary of your Q entry.",
    details: "Replace with a fuller explanation of why this matters.",
    example: "Replace with a concrete, real-world example.",
    whoItsFor: "Replace with who benefits most from this.",
  },
  {
    letter: "R",
    name: "Romeo Entry",
    icon: "\u{1F52C}",
    summary: "Replace with a one-line summary of your R entry.",
    details: "Replace with a fuller explanation of why this matters.",
    example: "Replace with a concrete, real-world example.",
    whoItsFor: "Replace with who benefits most from this.",
  },
  {
    letter: "S",
    name: "Sierra Entry",
    icon: "\u{1F4DD}",
    summary: "Replace with a one-line summary of your S entry.",
    details: "Replace with a fuller explanation of why this matters.",
    example: "Replace with a concrete, real-world example.",
    whoItsFor: "Replace with who benefits most from this.",
  },
  {
    letter: "T",
    name: "Tango Entry",
    icon: "\u{1F3E0}",
    summary: "Replace with a one-line summary of your T entry.",
    details: "Replace with a fuller explanation of why this matters.",
    example: "Replace with a concrete, real-world example.",
    whoItsFor: "Replace with who benefits most from this.",
  },
  {
    letter: "U",
    name: "Uniform Entry",
    icon: "\u{1F3AC}",
    summary: "Replace with a one-line summary of your U entry.",
    details: "Replace with a fuller explanation of why this matters.",
    example: "Replace with a concrete, real-world example.",
    whoItsFor: "Replace with who benefits most from this.",
  },
  {
    letter: "V",
    name: "Victor Entry",
    icon: "\u{1F49C}",
    summary: "Replace with a one-line summary of your V entry.",
    details: "Replace with a fuller explanation of why this matters.",
    example: "Replace with a concrete, real-world example.",
    whoItsFor: "Replace with who benefits most from this.",
  },
  {
    letter: "W",
    name: "Whiskey Entry",
    icon: "\u{1F527}",
    summary: "Replace with a one-line summary of your W entry.",
    details: "Replace with a fuller explanation of why this matters.",
    example: "Replace with a concrete, real-world example.",
    whoItsFor: "Replace with who benefits most from this.",
  },
  {
    letter: "X",
    name: "X-Ray Entry",
    icon: "\u{1F512}",
    summary: "Replace with a one-line summary of your X entry.",
    details: "Replace with a fuller explanation of why this matters.",
    example: "Replace with a concrete, real-world example.",
    whoItsFor: "Replace with who benefits most from this.",
  },
  {
    letter: "Y",
    name: "Yankee Entry",
    icon: "\u{1F3AF}",
    summary: "Replace with a one-line summary of your Y entry.",
    details: "Replace with a fuller explanation of why this matters.",
    example: "Replace with a concrete, real-world example.",
    whoItsFor: "Replace with who benefits most from this.",
  },
  {
    letter: "Z",
    name: "Zulu Entry",
    icon: "\u{1F310}",
    summary: "Replace with a one-line summary of your Z entry.",
    details: "Replace with a fuller explanation of why this matters.",
    example: "Replace with a concrete, real-world example.",
    whoItsFor: "Replace with who benefits most from this.",
  },
];

// ─── STEP 3: DEFINE YOUR CATEGORY FILTERS ────────────────────
const categories = [
  { label: "All", filter: null },
  { label: "Category 1", filter: ["A", "B", "C", "D", "E", "F"] },
  { label: "Category 2", filter: ["G", "H", "I", "J", "K", "L", "M"] },
  { label: "Category 3", filter: ["N", "O", "P", "Q", "R", "S"] },
  { label: "Category 4", filter: ["T", "U", "V", "W", "X", "Y", "Z"] },
];

// ─── DESIGN SYSTEM ───────────────────────────────────────────
const accentColors = ["#E8845C", "#4CAF80", "#7C6BC4"];
const getAccentColor = (i) => accentColors[i % 3];

export default function AZLibraryTemplate() {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [savedEntries, setSavedEntries] = useState(new Set());

  const toggleSave = useCallback((idx) => {
    setSavedEntries((prev) => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });
  }, []);

  const toggleExpand = useCallback((idx) => {
    setExpandedIndex((prev) => (prev === idx ? null : idx));
  }, []);

  const handleCardKeyDown = useCallback((e, idx) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleExpand(idx); }
  }, [toggleExpand]);

  const handleSaveKeyDown = useCallback((e, idx) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); e.stopPropagation(); toggleSave(idx); }
  }, [toggleSave]);

  const filtered = entries.filter((entry) => {
    const catFilter = categories[activeCategory].filter;
    const matchesCat = !catFilter || catFilter.includes(entry.letter);
    const matchesSearch = !searchTerm || entry.name.toLowerCase().includes(searchTerm.toLowerCase()) || entry.summary.toLowerCase().includes(searchTerm.toLowerCase()) || entry.letter.toLowerCase() === searchTerm.toLowerCase();
    return matchesCat && matchesSearch;
  });

  const uniqueLetters = [...new Set(entries.map((e) => e.letter))];
  const savedCount = savedEntries.size;

  // Video thumbnail source
  const thumbSrc = LIBRARY_CONFIG.videoThumb || (LIBRARY_CONFIG.videoId && LIBRARY_CONFIG.videoId !== "YOUR_VIDEO_ID" ? "https://img.youtube.com/vi/" + LIBRARY_CONFIG.videoId + "/hqdefault.jpg" : null);

  return (
    <div style={{ minHeight: "100vh", background: "#FAF6F1", fontFamily: "'DM Sans', sans-serif", color: "#2D2A33" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=DM+Sans:wght@400;500;700&family=Space+Mono:wght@400;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: rgba(45,42,51,0.03); }
        ::-webkit-scrollbar-thumb { background: rgba(232,132,92,0.3); border-radius: 3px; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        *:focus-visible { outline: 2px solid #E8845C; outline-offset: 2px; border-radius: 4px; }
        button:focus:not(:focus-visible), a:focus:not(:focus-visible) { outline: none; }
        .entry-card { transition: all 0.2s ease; }
        .entry-card:hover, .entry-card:focus-within { box-shadow: 0 4px 16px rgba(45,42,51,0.08); transform: translateY(-1px); }
        .cat-btn { transition: all 0.2s ease; cursor: pointer; border: none; font-family: 'DM Sans', sans-serif; }
        .cat-btn:hover, .cat-btn:focus-visible { background: rgba(232,132,92,0.08) !important; }
        .save-btn { transition: all 0.2s ease; cursor: pointer; }
        .save-btn:hover, .save-btn:focus-visible { transform: scale(1.15); }
        .letter-pill { transition: all 0.15s ease; cursor: pointer; border: none; }
        .letter-pill:hover, .letter-pill:focus-visible { background: rgba(232,132,92,0.12) !important; color: #E8845C !important; }
        .cta-link { transition: all 0.2s ease; }
        .cta-link:hover, .cta-link:focus-visible { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(232,132,92,0.35); }
        .vid-card { transition: border-color 0.2s ease, transform 0.2s ease; }
        .vid-card:hover, .vid-card:focus-visible { border-color: rgba(232,132,92,0.4) !important; transform: translateY(-2px); }
        .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; }
        .skip-link { position: absolute; top: -60px; left: 0; z-index: 9999; background: #E8845C; color: #FFFFFF; padding: 12px 20px; font-weight: 700; font-size: 14px; text-decoration: none; border-radius: 0 0 8px 0; }
        .skip-link:focus { top: 0; }
        @media (max-width: 520px) {
          .hero-title { font-size: 24px !important; }
          .stat-num { font-size: 22px !important; }
          .detail-grid { grid-template-columns: 1fr !important; }
          .letter-nav { gap: 3px !important; }
          .letter-pill { width: 28px !important; height: 28px !important; font-size: 11px !important; min-width: 28px !important; min-height: 28px !important; }
          .cat-filters { gap: 4px !important; }
          .cat-btn { padding: 7px 10px !important; font-size: 12px !important; }
          .card-header { padding: 14px 12px !important; gap: 10px !important; }
          .card-circle { width: 38px !important; height: 38px !important; font-size: 12px !important; min-width: 38px !important; }
          .card-name { font-size: 14px !important; }
          .card-summary { font-size: 12px !important; }
          .expanded-content { padding: 0 12px 16px !important; }
          .detail-box { padding: 12px 14px !important; }
          .step-list { gap: 8px !important; }
          .footer-cta { padding: 36px 16px !important; }
          .footer-btns { flex-direction: column !important; align-items: stretch !important; }
          .footer-btns a { justify-content: center !important; }
          .vid-wrap { max-width: 100% !important; }
        }
      `}</style>

      <a href="#main-content" className="skip-link">Skip to main content</a>

      {/* ═══ HERO ═══ */}
      <header role="banner" style={{ background: "linear-gradient(135deg, #1E1B2E, #2A2540)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "repeating-linear-gradient(90deg, rgba(232,132,92,0.03) 0px, rgba(232,132,92,0.03) 1px, transparent 1px, transparent 60px), repeating-linear-gradient(0deg, rgba(232,132,92,0.03) 0px, rgba(232,132,92,0.03) 1px, transparent 1px, transparent 60px)" }} aria-hidden="true" />
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(circle at 30% 40%, rgba(232,132,92,0.08), transparent 60%)" }} aria-hidden="true" />
        <div style={{ position: "relative", maxWidth: 680, margin: "0 auto", padding: "48px 20px 40px", textAlign: "center" }}>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "#E8845C", marginBottom: 16, textTransform: "uppercase" }}>{LIBRARY_CONFIG.subtitle}</p>
          <h1 className="hero-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px, 5vw, 38px)", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.2, marginBottom: 16 }}>
            {LIBRARY_CONFIG.title.split(LIBRARY_CONFIG.titleAccent).map((part, i, arr) => (
              <span key={i}>{part}{i < arr.length - 1 && <em style={{ color: "#E8845C", fontStyle: "italic", fontWeight: 700 }}>{LIBRARY_CONFIG.titleAccent}</em>}</span>
            ))}
          </h1>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: "#C5C0CC", maxWidth: 520, margin: "0 auto 24px" }}>{LIBRARY_CONFIG.heroDescription}</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap" }} role="group" aria-label="Library statistics">
            {[{ v: uniqueLetters.length, l: "Letters", c: "#E8845C" }, { v: entries.length, l: "Entries", c: "#E8845C" }, { v: savedCount, l: "Saved", c: "#4CAF80" }].map((s, i, arr) => (
              <div key={s.l} style={{ display: "flex", alignItems: "center", gap: i < arr.length - 1 ? 24 : 0 }}>
                <div style={{ textAlign: "center" }} aria-label={s.v + " " + s.l}>
                  <div className="stat-num" style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 800, color: s.c }} aria-hidden="true">{s.v}</div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, fontWeight: 700, letterSpacing: 1.5, color: "#C5C0CC", textTransform: "uppercase" }}>{s.l}</div>
                </div>
                {i < arr.length - 1 && <div style={{ width: 1, height: 32, background: "rgba(255,255,255,0.1)" }} aria-hidden="true" />}
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ═══ LETTER NAV ═══ */}
      <nav aria-label="Jump to letter" style={{ background: "#FAF6F1", borderBottom: "1px solid rgba(45,42,51,0.06)", padding: "14px 20px" }}>
        <div className="letter-nav" style={{ maxWidth: 680, margin: "0 auto", display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 4 }}>
          {uniqueLetters.map((letter, i) => (
            <button key={letter} className="letter-pill" aria-label={"Jump to letter " + letter}
              onClick={() => { setSearchTerm(""); setActiveCategory(0); const el = document.getElementById("letter-" + letter); if (el) el.scrollIntoView({ behavior: "smooth", block: "center" }); }}
              style={{ width: 34, height: 34, borderRadius: 8, background: "rgba(45,42,51,0.04)", color: getAccentColor(i), fontSize: 12, fontWeight: 700, fontFamily: "'Space Mono', monospace", display: "flex", alignItems: "center", justifyContent: "center", minWidth: 34, minHeight: 34 }}>
              {letter}
            </button>
          ))}
        </div>
      </nav>

      {/* ═══ MAIN ═══ */}
      <main id="main-content" tabIndex={-1} style={{ maxWidth: 680, margin: "0 auto", padding: "28px 20px 0" }}>

        {/* Video thumbnail card */}
        <a href={LIBRARY_CONFIG.videoUrl} target="_blank" rel="noopener noreferrer" className="vid-card"
          aria-label="Watch the full video on YouTube (opens in new tab)"
          style={{ display: "block", maxWidth: 480, margin: "0 auto 28px", borderRadius: 14, overflow: "hidden", border: "1px solid rgba(45,42,51,0.08)", background: "#FFFFFF", textDecoration: "none", color: "inherit", boxShadow: "0 1px 4px rgba(45,42,51,0.03)" }}>
          <div style={{ position: "relative", background: "linear-gradient(135deg, #1E1B2E, #2A2540)", aspectRatio: "16/9" }}>
            {thumbSrc ? (
              <img src={thumbSrc} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            ) : (
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: "rgba(232,132,92,0.5)", textTransform: "uppercase" }}>Video Thumbnail</div>
                <div style={{ fontSize: 11, color: "rgba(197,192,204,0.5)" }}>Replace videoId in LIBRARY_CONFIG</div>
              </div>
            )}
            <div style={{ position: "absolute", inset: 0, background: "rgba(30,27,46,0.35)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#E8845C", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.25)" }}>
                <div style={{ width: 0, height: 0, borderTop: "10px solid transparent", borderBottom: "10px solid transparent", borderLeft: "16px solid #FFFFFF", marginLeft: 3 }} />
              </div>
            </div>
          </div>
          <div style={{ padding: "10px 14px", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: "#E8845C", fontSize: 14 }} aria-hidden="true">&#x25B6;</span>
            <span style={{ fontSize: 13, fontWeight: 500, color: "#6B6575" }}>Watch the full video</span>
          </div>
        </a>

        {/* About */}
        <section aria-label="About this library" style={{ borderLeft: "3px solid #E8845C", background: "#FFFFFF", padding: "16px 20px", borderRadius: "0 12px 12px 0", marginBottom: 24, boxShadow: "0 1px 4px rgba(45,42,51,0.03)" }}>
          <h2 style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: "#E8845C", textTransform: "uppercase", marginBottom: 6 }}>What Is This</h2>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: "#4A4555" }}>This is your A-Z library. Browse by letter, search by keyword, or filter by category. Tap any entry to expand the full details. Star the ones that resonate with you so you can find them quickly later.</p>
        </section>

        {/* Search */}
        <div style={{ position: "relative", marginBottom: 14 }}>
          <label htmlFor="az-search" className="sr-only">Search entries</label>
          <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#9B95A5", fontSize: 14, pointerEvents: "none" }} aria-hidden="true">&#x2315;</span>
          <input id="az-search" type="search" placeholder="Search by name, keyword, or letter..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: "100%", padding: "14px 16px 14px 40px", borderRadius: 10, background: "#FFFFFF", border: "1px solid rgba(45,42,51,0.1)", color: "#2D2A33", fontSize: 15, fontFamily: "'DM Sans', sans-serif", outline: "none", minHeight: 48 }}
            onFocus={(e) => { e.target.style.borderColor = "#E8845C"; }} onBlur={(e) => { e.target.style.borderColor = "rgba(45,42,51,0.1)"; }} />
        </div>

        {/* Filters */}
        <div className="cat-filters" role="group" aria-label="Filter by category" style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
          {categories.map((cat, i) => (
            <button key={cat.label} className="cat-btn" aria-pressed={activeCategory === i} onClick={() => { setActiveCategory(i); setSearchTerm(""); }}
              style={{ padding: "8px 14px", borderRadius: 20, background: activeCategory === i ? "rgba(232,132,92,0.12)" : "#FFFFFF", border: "1px solid " + (activeCategory === i ? "#E8845C" : "rgba(45,42,51,0.08)"), color: activeCategory === i ? "#E8845C" : "#4A4555", fontSize: 13, fontWeight: 600, minHeight: 36 }}>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Live count */}
        <div role="status" aria-live="polite" aria-atomic="true" style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: "#6B6575", marginBottom: 16, textTransform: "uppercase" }}>
          {filtered.length} entr{filtered.length !== 1 ? "ies" : "y"} shown
          {savedCount > 0 && <span style={{ marginLeft: 12, color: "#4CAF80" }}>{savedCount} saved</span>}
        </div>

        {/* ═══ CARDS ═══ */}
        <div role="list" aria-label="A-Z entries" style={{ display: "flex", flexDirection: "column", gap: 10, paddingBottom: 40 }}>
          {filtered.map((entry, i) => {
            const gIdx = entries.indexOf(entry);
            const isOpen = expandedIndex === gIdx;
            const isSaved = savedEntries.has(gIdx);
            const accent = getAccentColor(gIdx);
            const cId = "content-" + gIdx;
            return (
              <article key={entry.letter + "-" + entry.name} id={i === 0 || (i > 0 && filtered[i - 1]?.letter !== entry.letter) ? "letter-" + entry.letter : undefined}
                role="listitem" className="entry-card"
                style={{ background: "#FFFFFF", border: "1px solid " + (isOpen ? accent + "40" : "rgba(45,42,51,0.06)"), borderLeft: "4px solid " + accent, borderRadius: "0 14px 14px 0", overflow: "hidden", boxShadow: isOpen ? "0 4px 16px rgba(45,42,51,0.08)" : "0 1px 4px rgba(45,42,51,0.03)", animation: "fadeUp 0.4s ease " + Math.min(i * 0.03, 0.3) + "s both" }}>
                <div className="card-header" role="button" tabIndex={0} aria-expanded={isOpen} aria-controls={cId}
                  onClick={() => toggleExpand(gIdx)} onKeyDown={(e) => handleCardKeyDown(e, gIdx)}
                  style={{ padding: "16px 18px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }}>
                  <div className="card-circle" style={{ width: 44, height: 44, borderRadius: "50%", flexShrink: 0, background: accent, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Space Mono', monospace", fontSize: 14, fontWeight: 700, color: "#FFFFFF", minWidth: 44 }} aria-hidden="true">{entry.letter}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                      <span aria-hidden="true" style={{ fontSize: 18 }}>{entry.icon}</span>
                      <h3 className="card-name" style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700, color: "#2D2A33", margin: 0 }}>{entry.name}</h3>
                    </div>
                    <p className="card-summary" style={{ fontSize: 13, color: "#4A4555", lineHeight: 1.5, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: isOpen ? "normal" : "nowrap" }}>{entry.summary}</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                    <button className="save-btn" onClick={(e) => { e.stopPropagation(); toggleSave(gIdx); }} onKeyDown={(e) => handleSaveKeyDown(e, gIdx)}
                      aria-label={isSaved ? "Remove " + entry.name + " from saved" : "Save " + entry.name} aria-pressed={isSaved}
                      style={{ width: 40, height: 40, borderRadius: 8, border: "none", background: isSaved ? "rgba(76,175,128,0.12)" : "rgba(45,42,51,0.04)", color: isSaved ? "#4CAF80" : "#4A4555", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", minWidth: 40, minHeight: 40 }}>
                      {isSaved ? "\u2605" : "\u2606"}
                    </button>
                    <span style={{ color: "#6B6575", fontSize: 12, transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s ease", display: "inline-block" }} aria-hidden="true">&#x25BC;</span>
                  </div>
                </div>
                {isOpen && (
                  <div id={cId} role="region" aria-label={"Details for " + entry.name} className="expanded-content" style={{ padding: "0 18px 20px", animation: "fadeUp 0.3s ease" }}>
                    <div style={{ height: 1, background: "linear-gradient(90deg, " + accent + "30, transparent)", marginBottom: 18 }} aria-hidden="true" />
                    <div className="detail-box" style={{ background: "linear-gradient(135deg, " + accent + "0A, " + accent + "04)", borderLeft: "3px solid " + accent, borderRadius: "0 12px 12px 0", padding: "16px 20px", marginBottom: 12 }}>
                      <h4 style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: accent, textTransform: "uppercase", marginBottom: 6 }}>Why It Matters</h4>
                      <p style={{ fontSize: 14, lineHeight: 1.7, color: "#4A4555", margin: 0 }}>{entry.details}</p>
                    </div>
                    <div className="detail-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 10 }}>
                      <div className="detail-box" style={{ background: "#FFFFFF", borderRadius: 12, border: "1px solid rgba(45,42,51,0.06)", padding: "14px 16px" }}>
                        <h4 style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: "#4CAF80", textTransform: "uppercase", marginBottom: 6 }}>Example</h4>
                        <p style={{ fontSize: 13, lineHeight: 1.7, color: "#4A4555", margin: 0 }}>{entry.example}</p>
                      </div>
                      <div className="detail-box" style={{ background: "#FFFFFF", borderRadius: 12, border: "1px solid rgba(45,42,51,0.06)", padding: "14px 16px" }}>
                        <h4 style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: "#7C6BC4", textTransform: "uppercase", marginBottom: 6 }}>Who It Is For</h4>
                        <p style={{ fontSize: 13, lineHeight: 1.7, color: "#4A4555", margin: 0 }}>{entry.whoItsFor}</p>
                      </div>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
          {filtered.length === 0 && (
            <div role="status" style={{ textAlign: "center", padding: 48, color: "#6B6575" }}>
              <div style={{ fontSize: 32, marginBottom: 12 }} aria-hidden="true">&#x1F50D;</div>
              <p style={{ fontSize: 14, margin: 0 }}>No entries match your search. Try a different term or clear filters.</p>
            </div>
          )}
        </div>

        {/* ═══ CUSTOMIZE ═══ */}
        <section aria-labelledby="customize-heading" style={{ textAlign: "center", margin: "8px 0 24px" }}>
          <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#7C6BC4", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 12, fontSize: 20, color: "#FFFFFF" }} aria-hidden="true">&#x270E;</div>
          <h2 id="customize-heading" style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 800, color: "#2D2A33", marginBottom: 4 }}>
            Make It <em style={{ color: "#E8845C", fontStyle: "italic", fontWeight: 700 }}>Yours</em>
          </h2>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, fontWeight: 700, letterSpacing: 1.5, color: "#6B6575", textTransform: "uppercase" }}>Template Customization Guide</p>
        </section>
        <ol className="step-list" style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 40, listStyle: "none", padding: 0 }}>
          {[
            { step: "01", title: "Update LIBRARY_CONFIG", desc: "Change the title, subtitle, description, CTA link, and video URL. Set videoId to your YouTube video ID for auto-thumbnail, or provide a custom videoThumb as base64." },
            { step: "02", title: "Replace the entries array", desc: "Swap in your own A-Z content. Each entry needs: letter, name, icon, summary, details, example, and whoItsFor. Use the same letter for multiple entries under one letter." },
            { step: "03", title: "Set your category filters", desc: "Update the categories array with your own groupings. Each has a label and a filter array of letters." },
            { step: "04", title: "Deploy to static.app", desc: "Export as HTML with React CDN, zip as index.html, drag-drop onto static.app. Point a custom domain through DNS if desired." },
          ].map((item) => (
            <li key={item.step} style={{ background: "#FFFFFF", borderRadius: 12, border: "1px solid rgba(45,42,51,0.06)", padding: "16px 20px", display: "flex", alignItems: "flex-start", gap: 14, boxShadow: "0 1px 4px rgba(45,42,51,0.03)" }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", flexShrink: 0, background: "#E8845C", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Space Mono', monospace", fontSize: 12, fontWeight: 700, color: "#FFFFFF", minWidth: 36 }} aria-hidden="true">{item.step}</div>
              <div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 700, color: "#2D2A33", marginBottom: 4 }}><span className="sr-only">Step {item.step}: </span>{item.title}</h3>
                <p style={{ fontSize: 13, lineHeight: 1.7, color: "#4A4555", margin: 0 }}>{item.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </main>

      {/* ═══ FOOTER ═══ */}
      <footer role="contentinfo" style={{ background: "linear-gradient(135deg, #1E1B2E, #2A2540)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "repeating-linear-gradient(90deg, rgba(232,132,92,0.03) 0px, rgba(232,132,92,0.03) 1px, transparent 1px, transparent 60px), repeating-linear-gradient(0deg, rgba(232,132,92,0.03) 0px, rgba(232,132,92,0.03) 1px, transparent 1px, transparent 60px)" }} aria-hidden="true" />
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(circle at 30% 40%, rgba(232,132,92,0.08), transparent 60%)" }} aria-hidden="true" />
        <div className="footer-cta" style={{ position: "relative", maxWidth: 680, margin: "0 auto", padding: "48px 20px", textAlign: "center" }}>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, fontWeight: 700, letterSpacing: 2, color: "#E8845C", marginBottom: 12, textTransform: "uppercase" }}>Ready to Take Action?</p>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: "#C5C0CC", maxWidth: 440, margin: "0 auto 24px" }}>Pick the entries that resonate with you. Start with one, build from there. Everything gets easier once you know your direction.</p>
          <div className="footer-btns" style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            {LIBRARY_CONFIG.videoUrl && (
              <a href={LIBRARY_CONFIG.videoUrl} target="_blank" rel="noopener noreferrer" aria-label="Watch video (opens in new tab)"
                style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "14px 24px", borderRadius: 50, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "#C5C0CC", fontSize: 14, fontWeight: 600, textDecoration: "none", fontFamily: "'DM Sans', sans-serif", minHeight: 48 }}>
                &#x25B6; Watch Video
              </a>
            )}
            <a href={LIBRARY_CONFIG.ctaUrl} target="_blank" rel="noopener noreferrer" className="cta-link" aria-label={LIBRARY_CONFIG.ctaText + " (opens in new tab)"}
              style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "14px 28px", borderRadius: 50, background: "#E8845C", color: "#FFFFFF", fontSize: 15, fontWeight: 700, textDecoration: "none", fontFamily: "'DM Sans', sans-serif", minHeight: 48 }}>
              {LIBRARY_CONFIG.ctaText} &#x2192;
            </a>
          </div>
          <div style={{ marginTop: 40, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,0.3)", margin: 0 }}>A-Z {LIBRARY_CONFIG.titleAccent}</p>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, fontWeight: 400, letterSpacing: 1, color: "rgba(255,255,255,0.15)", marginTop: 4, textTransform: "uppercase" }}>Built with the A-Z Library Template</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
