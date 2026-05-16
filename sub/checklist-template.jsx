import { useState } from "react";

const checklistData = {
  label: "ARTIFACT KICKSTART KIT",
  title: "The Perfect",
  titleAccent: "Checklist Checklist",
  subtitle: "Your step-by-step guide to creating checklists your audience will actually complete",
  intro: "This checklist walks you through every decision you need to make to create a checklist that gets completed, gets shared, and brings people back for more. Check off each item as you go and watch your progress build. By the end, you will have a clear blueprint for a checklist your audience will love.",
  cta: {
    text: "Join the Community for Updates",
    url: "#"
  },
  sections: [
    {
      label: "FOUNDATION",
      title: "Define Your",
      titleAccent: "Checklist Purpose",
      items: [
        {
          title: "Identify the single specific outcome your checklist delivers",
          description: "Every great checklist promises one clear result. Not three, not five. One. Ask yourself: when someone finishes this checklist, what will they have done, decided, or created? Write that outcome down before anything else."
        },
        {
          title: "Choose a topic your audience actively struggles with right now",
          description: "The best checklists solve an urgent, tangible problem. Look at the questions your audience asks most often, the steps they keep skipping, or the process they find overwhelming. That is your checklist topic."
        },
        {
          title: "Decide on your checklist format",
          description: "Quick-win checklists help someone do something in under 10 minutes. Process checklists walk someone through a multi-step workflow. Audit checklists help someone evaluate what they already have. Pick the format that fits your topic."
        }
      ]
    },
    {
      label: "STRUCTURE",
      title: "Organize for",
      titleAccent: "Maximum Completion",
      items: [
        {
          title: "Keep your total items between 7 and 15",
          description: "Fewer than 7 and your checklist feels too light to be valuable. More than 15 and completion rates drop dramatically. The sweet spot is enough items to feel substantial without feeling overwhelming."
        },
        {
          title: "Group items into 2 to 4 clearly labeled sections",
          description: "Sections create natural progress milestones. They break the work into digestible chunks and give your audience a sense of momentum. Each section should feel like its own mini achievement."
        },
        {
          title: "Order items in a logical sequence from first step to final result",
          description: "Your audience should never have to wonder what comes next. Each item should flow naturally from the one before it. Think of it as a path: every step moves them closer to the outcome you promised."
        }
      ]
    },
    {
      label: "COPY",
      title: "Write Clear,",
      titleAccent: "Actionable Items",
      items: [
        {
          title: "Start each checklist item with a strong action verb",
          description: "Define, choose, write, add, test, review. Action verbs tell your audience exactly what to do. Avoid vague language like 'think about' or 'consider.' Make every item a concrete, completable action."
        },
        {
          title: "Add a brief description explaining why the step matters",
          description: "A title tells someone what to do. A description tells them why it matters and how to do it well. This is what separates a forgettable checklist from one that actually teaches something."
        },
        {
          title: "Make each item completable in a single sitting",
          description: "If an item takes more than 10 to 15 minutes, break it into smaller steps. The dopamine hit of checking something off is what keeps people going. Do not make them wait too long for that feeling."
        }
      ]
    },
    {
      label: "ENGAGEMENT",
      title: "Design for",
      titleAccent: "Momentum & Action",
      items: [
        {
          title: "Add a progress tracker so users see their momentum building",
          description: "A visual progress bar transforms a static list into a game. People are wired to want to see that bar fill up. It creates a sense of investment and makes them far more likely to finish."
        },
        {
          title: "Write an introduction that tells users exactly what they will achieve",
          description: "Your intro should answer three questions: what is this checklist, who is it for, and what will they walk away with. Keep it to 2 to 3 sentences. Make it feel like a promise."
        },
        {
          title: "End with a clear next step or call to action",
          description: "Once someone completes your checklist, they are at peak engagement. That is the moment to invite them into your community, your membership, your next offer, or your discovery call. Do not waste it."
        }
      ]
    }
  ]
};

const totalItems = checklistData.sections.reduce((sum, s) => sum + s.items.length, 0);

export default function ChecklistTemplate() {
  const [checked, setChecked] = useState({});

  const toggle = (sectionIdx, itemIdx) => {
    const key = `${sectionIdx}-${itemIdx}`;
    setChecked(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const checkedCount = Object.values(checked).filter(Boolean).length;
  const progress = (checkedCount / totalItems) * 100;

  let globalItemIndex = 0;

  return (
    <div style={{ 
      fontFamily: "'DM Sans', sans-serif",
      background: "#faf6f1",
      minHeight: "100vh",
      color: "#2d2a33"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700;1,800&family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&family=Space+Mono:wght@400;700&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        .header-section {
          background: linear-gradient(180deg, #1e1b2e 0%, #2a2540 100%);
          padding: 60px 24px 80px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .header-section::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: radial-gradient(ellipse at 50% 0%, rgba(232,132,92,0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .artifact-label {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: #e8845c;
          margin-bottom: 20px;
        }

        .main-title {
          font-family: 'Playfair Display', serif;
          font-weight: 800;
          font-size: clamp(32px, 6vw, 52px);
          color: #faf6f1;
          line-height: 1.15;
          margin-bottom: 6px;
        }

        .main-title-accent {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-style: italic;
          font-size: clamp(32px, 6vw, 52px);
          color: #e8845c;
          line-height: 1.15;
          display: block;
        }

        .subtitle {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(15px, 2.5vw, 19px);
          color: rgba(250,246,241,0.7);
          margin-top: 16px;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.5;
        }

        .intro-text {
          max-width: 600px;
          margin: 0 auto;
          padding: 40px 24px 0;
          text-align: center;
          font-size: 15.5px;
          line-height: 1.75;
          color: #4a4555;
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #e8845c;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-weight: 700;
          font-size: 15px;
          padding: 16px 36px;
          border-radius: 50px;
          border: none;
          cursor: pointer;
          margin-top: 32px;
          transition: all 0.25s ease;
          text-decoration: none;
          letter-spacing: 0.3px;
        }

        .cta-button:hover {
          background: #d4743f;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(232,132,92,0.3);
        }

        .progress-wrapper {
          max-width: 660px;
          margin: 48px auto 0;
          padding: 0 24px;
        }

        .progress-card {
          background: linear-gradient(135deg, #2a2540 0%, #1e1b2e 100%);
          border-radius: 16px;
          padding: 28px 32px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.12);
        }

        .progress-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .progress-label {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(250,246,241,0.6);
        }

        .progress-count {
          font-family: 'Space Mono', monospace;
          font-size: 15px;
          font-weight: 700;
          color: #e8845c;
        }

        .progress-bar-bg {
          width: 100%;
          height: 6px;
          background: rgba(250,246,241,0.1);
          border-radius: 3px;
          overflow: hidden;
        }

        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #e8845c, #f0a67a);
          border-radius: 3px;
          transition: width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .whatisthis {
          max-width: 660px;
          margin: 32px auto 0;
          padding: 0 24px;
        }

        .whatisthis-card {
          border-left: 3px solid #e8845c;
          padding: 20px 24px;
          background: rgba(232,132,92,0.04);
          border-radius: 0 12px 12px 0;
        }

        .whatisthis-label {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #e8845c;
          font-weight: 700;
          display: inline;
        }

        .whatisthis-text {
          display: inline;
          font-size: 14.5px;
          line-height: 1.7;
          color: #5a5565;
        }

        .section-block {
          max-width: 660px;
          margin: 48px auto 0;
          padding: 0 24px;
        }

        .section-header {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 28px;
        }

        .section-number {
          width: 40px;
          height: 40px;
          min-width: 40px;
          border-radius: 50%;
          background: rgba(232,132,92,0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Space Mono', monospace;
          font-size: 13px;
          font-weight: 700;
          color: #e8845c;
          margin-top: 2px;
        }

        .section-label {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #9b95a5;
          margin-bottom: 4px;
        }

        .section-title {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: clamp(22px, 4vw, 28px);
          color: #2d2a33;
          line-height: 1.25;
        }

        .section-title-accent {
          font-style: italic;
          color: #e8845c;
        }

        .checklist-item {
          display: flex;
          gap: 16px;
          padding: 20px 0;
          border-bottom: 1px solid rgba(45,42,51,0.06);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .checklist-item:hover {
          padding-left: 4px;
        }

        .checklist-item:last-child {
          border-bottom: none;
        }

        .check-circle {
          width: 28px;
          height: 28px;
          min-width: 28px;
          border-radius: 50%;
          border: 2px solid #ccc5bc;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 2px;
          transition: all 0.3s ease;
          background: transparent;
        }

        .check-circle.checked {
          border-color: #e8845c;
          background: #e8845c;
        }

        .check-circle.checked svg {
          opacity: 1;
          transform: scale(1);
        }

        .check-circle svg {
          opacity: 0;
          transform: scale(0.5);
          transition: all 0.25s ease;
        }

        .item-content {
          flex: 1;
        }

        .item-title {
          font-weight: 700;
          font-size: 15.5px;
          color: #2d2a33;
          line-height: 1.4;
          margin-bottom: 6px;
          transition: color 0.2s ease;
        }

        .item-title.checked {
          color: #9b95a5;
          text-decoration: line-through;
          text-decoration-color: rgba(155,149,165,0.4);
        }

        .item-description {
          font-size: 14px;
          line-height: 1.7;
          color: #6b6575;
        }

        .completion-card {
          max-width: 660px;
          margin: 56px auto 0;
          padding: 0 24px 80px;
        }

        .completion-inner {
          background: linear-gradient(135deg, #1e1b2e 0%, #2a2540 100%);
          border-radius: 20px;
          padding: 48px 36px;
          text-align: center;
        }

        .completion-emoji {
          font-size: 40px;
          margin-bottom: 16px;
        }

        .completion-title {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: 24px;
          color: #faf6f1;
          margin-bottom: 12px;
        }

        .completion-text {
          font-size: 15px;
          line-height: 1.7;
          color: rgba(250,246,241,0.65);
          max-width: 440px;
          margin: 0 auto;
        }

        .ideas-section {
          max-width: 660px;
          margin: 0 auto;
          padding: 0 24px 56px;
        }

        .ideas-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .ideas-label {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #9b95a5;
          margin-bottom: 8px;
        }

        .ideas-title {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: clamp(22px, 4vw, 28px);
          color: #2d2a33;
          line-height: 1.25;
        }

        .ideas-title-accent {
          font-style: italic;
          color: #e8845c;
        }

        .ideas-subtitle {
          font-size: 14.5px;
          line-height: 1.7;
          color: #6b6575;
          margin-top: 10px;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }

        .ideas-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        .idea-card {
          background: #fff;
          border-radius: 14px;
          padding: 22px 20px;
          border: 1px solid rgba(45,42,51,0.06);
          transition: all 0.2s ease;
        }

        .idea-card:hover {
          border-color: rgba(232,132,92,0.25);
          box-shadow: 0 4px 16px rgba(232,132,92,0.08);
          transform: translateY(-2px);
        }

        .idea-name {
          font-weight: 700;
          font-size: 14px;
          color: #2d2a33;
          margin-bottom: 5px;
        }

        .idea-desc {
          font-size: 13px;
          line-height: 1.6;
          color: #7a7485;
        }

        .idea-preview {
          margin-top: 4px;
        }

        .footer-section {
          background: linear-gradient(180deg, #1e1b2e 0%, #171525 100%);
          padding: 48px 24px;
          text-align: center;
        }

        .footer-brand {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: 18px;
          color: #faf6f1;
          margin-bottom: 8px;
        }

        .footer-tagline {
          font-size: 13px;
          color: rgba(250,246,241,0.45);
          margin-bottom: 24px;
        }

        .footer-details {
          font-size: 12px;
          line-height: 1.8;
          color: rgba(250,246,241,0.35);
          margin-bottom: 20px;
        }

        .footer-links {
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
          margin-bottom: 24px;
        }

        .footer-link {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: rgba(250,246,241,0.4);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .footer-link:hover {
          color: #e8845c;
        }

        .footer-divider {
          width: 40px;
          height: 1px;
          background: rgba(250,246,241,0.1);
          margin: 0 auto 20px;
        }

        .footer-credit {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(250,246,241,0.25);
        }

        @media (max-width: 480px) {
          .header-section { padding: 40px 20px 60px; }
          .progress-card { padding: 20px 20px; }
          .section-block { padding: 0 16px; }
          .completion-inner { padding: 36px 24px; }
          .ideas-grid { grid-template-columns: 1fr; }
          .ideas-section { padding: 0 16px 56px; }
        }
      `}</style>

      {/* Header */}
      <div className="header-section">
        <div className="artifact-label">{checklistData.label}</div>
        <div className="main-title">
          {checklistData.title}
          <span className="main-title-accent">{checklistData.titleAccent}</span>
        </div>
        <div className="subtitle">{checklistData.subtitle}</div>
      </div>

      {/* Intro */}
      <div className="intro-text">
        <p>{checklistData.intro}</p>
        <a href={checklistData.cta.url} className="cta-button">
          {checklistData.cta.text} <span>→</span>
        </a>
      </div>

      {/* Progress Bar */}
      <div className="progress-wrapper">
        <div className="progress-card">
          <div className="progress-header">
            <span className="progress-label">YOUR PROGRESS</span>
            <span className="progress-count">{checkedCount} / {totalItems}</span>
          </div>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      {/* What Is This */}
      <div className="whatisthis">
        <div className="whatisthis-card">
          <span className="whatisthis-label">WHAT IS THIS: </span>
          <span className="whatisthis-text">
            This progress bar tracks how many items you have checked off. It updates automatically as you work through the checklist. It creates momentum and a sense of completion that keeps people engaged.
          </span>
        </div>
      </div>

      {/* Sections */}
      {checklistData.sections.map((section, sectionIdx) => (
        <div className="section-block" key={sectionIdx}>
          <div className="section-header">
            <div className="section-number">
              {String(sectionIdx + 1).padStart(2, "0")}
            </div>
            <div>
              <div className="section-label">{section.label}</div>
              <div className="section-title">
                {section.title}{" "}
                <span className="section-title-accent">{section.titleAccent}</span>
              </div>
            </div>
          </div>

          {section.items.map((item, itemIdx) => {
            const key = `${sectionIdx}-${itemIdx}`;
            const isChecked = checked[key] || false;
            globalItemIndex++;
            return (
              <div
                className="checklist-item"
                key={itemIdx}
                onClick={() => toggle(sectionIdx, itemIdx)}
              >
                <div className={`check-circle ${isChecked ? "checked" : ""}`}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M2.5 7.5L5.5 10.5L11.5 3.5"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="item-content">
                  <div className={`item-title ${isChecked ? "checked" : ""}`}>
                    {item.title}
                  </div>
                  <div className="item-description">{item.description}</div>
                </div>
              </div>
            );
          })}
        </div>
      ))}

      {/* Ideas Section */}
      <div className="ideas-section">
        <div className="ideas-header">
          <div className="ideas-label">TAKE IT FURTHER</div>
          <div className="ideas-title">
            Elements Claude Can <span className="ideas-title-accent">Add for You</span>
          </div>
          <div className="ideas-subtitle">
            Ask Claude to include any of these in your checklist to make it even more engaging and valuable for your audience.
          </div>
        </div>
        <div className="ideas-grid">

          {/* Time Estimates */}
          <div className="idea-card">
            <div className="idea-name">⏱️ Time Estimates per Item</div>
            <div className="idea-desc">Show how long each step takes so users can plan their time and feel less overwhelmed.</div>
            <div className="idea-preview">
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: "#faf6f1", borderRadius: 8, marginTop: 12 }}>
                <div style={{ width: 18, height: 18, borderRadius: "50%", border: "2px solid #ccc5bc", flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#2d2a33" }}>Write your introduction paragraph</div>
                </div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "#e8845c", background: "rgba(232,132,92,0.1)", padding: "3px 8px", borderRadius: 20, whiteSpace: "nowrap", letterSpacing: "0.5px" }}>~5 MIN</div>
              </div>
            </div>
          </div>

          {/* Pro Tips */}
          <div className="idea-card">
            <div className="idea-name">💡 Expandable Pro Tips</div>
            <div className="idea-desc">Collapsible tips beneath items that reveal extra advice when clicked. Adds depth without clutter.</div>
            <div className="idea-preview">
              <div style={{ marginTop: 12, background: "#faf6f1", borderRadius: 8, overflow: "hidden" }}>
                <div style={{ padding: "10px 12px", display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 11, color: "#e8845c" }}>▼</span>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, fontWeight: 700, color: "#e8845c", letterSpacing: "1px", textTransform: "uppercase" }}>PRO TIP</span>
                </div>
                <div style={{ padding: "0 12px 10px", fontSize: 11, lineHeight: 1.6, color: "#6b6575", borderTop: "1px dashed rgba(232,132,92,0.2)", paddingTop: 8 }}>
                  Start with your most impactful item first. Early wins build momentum that carries people through the rest.
                </div>
              </div>
            </div>
          </div>

          {/* Completion Badges */}
          <div className="idea-card">
            <div className="idea-name">🏆 Section Completion Badges</div>
            <div className="idea-desc">Small celebration moments when a full section is complete. A badge, animation, or motivational quote.</div>
            <div className="idea-preview">
              <div style={{ marginTop: 12, background: "linear-gradient(135deg, #1e1b2e, #2a2540)", borderRadius: 8, padding: "14px 12px", textAlign: "center" }}>
                <div style={{ fontSize: 20, marginBottom: 4 }}>✨</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 12, fontWeight: 700, color: "#faf6f1" }}>Section Complete</div>
                <div style={{ fontSize: 10, color: "rgba(250,246,241,0.5)", marginTop: 2 }}>Foundation unlocked</div>
              </div>
            </div>
          </div>

          {/* Resource Links */}
          <div className="idea-card">
            <div className="idea-name">📎 Resource Links per Step</div>
            <div className="idea-desc">Link to a template, video, or tool directly from each item so users have everything they need in one place.</div>
            <div className="idea-preview">
              <div style={{ marginTop: 12, background: "#faf6f1", borderRadius: 8, padding: "10px 12px" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#2d2a33", marginBottom: 8 }}>Choose your checklist format</div>
                <div style={{ display: "flex", gap: 6 }}>
                  <span style={{ fontSize: 10, color: "#e8845c", background: "rgba(232,132,92,0.1)", padding: "3px 8px", borderRadius: 4, display: "inline-flex", alignItems: "center", gap: 3 }}>📄 Template</span>
                  <span style={{ fontSize: 10, color: "#e8845c", background: "rgba(232,132,92,0.1)", padding: "3px 8px", borderRadius: 4, display: "inline-flex", alignItems: "center", gap: 3 }}>▶️ Video</span>
                  <span style={{ fontSize: 10, color: "#e8845c", background: "rgba(232,132,92,0.1)", padding: "3px 8px", borderRadius: 4, display: "inline-flex", alignItems: "center", gap: 3 }}>🔗 Guide</span>
                </div>
              </div>
            </div>
          </div>

          {/* Priority Tags */}
          <div className="idea-card">
            <div className="idea-name">🎯 Difficulty & Priority Tags</div>
            <div className="idea-desc">Label items as quick win, essential, or advanced so users know where to start and what to tackle first.</div>
            <div className="idea-preview">
              <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#faf6f1", borderRadius: 8, padding: "8px 12px" }}>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, fontWeight: 700, color: "#fff", background: "#4caf80", padding: "2px 6px", borderRadius: 3, letterSpacing: "0.5px" }}>QUICK WIN</span>
                  <span style={{ fontSize: 11, color: "#2d2a33" }}>Pick your topic</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#faf6f1", borderRadius: 8, padding: "8px 12px" }}>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, fontWeight: 700, color: "#fff", background: "#e8845c", padding: "2px 6px", borderRadius: 3, letterSpacing: "0.5px" }}>ESSENTIAL</span>
                  <span style={{ fontSize: 11, color: "#2d2a33" }}>Define your outcome</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#faf6f1", borderRadius: 8, padding: "8px 12px" }}>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, fontWeight: 700, color: "#fff", background: "#7b68a8", padding: "2px 6px", borderRadius: 3, letterSpacing: "0.5px" }}>ADVANCED</span>
                  <span style={{ fontSize: 11, color: "#2d2a33" }}>Add conditional logic</span>
                </div>
              </div>
            </div>
          </div>

          {/* Color-Coded Sections */}
          <div className="idea-card">
            <div className="idea-name">🎨 Color-Coded Sections</div>
            <div className="idea-desc">Give each section its own accent color so users can quickly scan and navigate the checklist visually.</div>
            <div className="idea-preview">
              <div style={{ marginTop: 12, display: "flex", gap: 6 }}>
                <div style={{ flex: 1, borderRadius: 6, overflow: "hidden" }}>
                  <div style={{ height: 4, background: "#e8845c" }} />
                  <div style={{ background: "#faf6f1", padding: "8px 8px", fontSize: 9, fontWeight: 700, color: "#2d2a33", textAlign: "center" }}>Foundation</div>
                </div>
                <div style={{ flex: 1, borderRadius: 6, overflow: "hidden" }}>
                  <div style={{ height: 4, background: "#5da4d6" }} />
                  <div style={{ background: "#faf6f1", padding: "8px 8px", fontSize: 9, fontWeight: 700, color: "#2d2a33", textAlign: "center" }}>Structure</div>
                </div>
                <div style={{ flex: 1, borderRadius: 6, overflow: "hidden" }}>
                  <div style={{ height: 4, background: "#7b68a8" }} />
                  <div style={{ background: "#faf6f1", padding: "8px 8px", fontSize: 9, fontWeight: 700, color: "#2d2a33", textAlign: "center" }}>Copy</div>
                </div>
                <div style={{ flex: 1, borderRadius: 6, overflow: "hidden" }}>
                  <div style={{ height: 4, background: "#4caf80" }} />
                  <div style={{ background: "#faf6f1", padding: "8px 8px", fontSize: 9, fontWeight: 700, color: "#2d2a33", textAlign: "center" }}>Launch</div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="idea-card">
            <div className="idea-name">📊 Dynamic Results Summary</div>
            <div className="idea-desc">A live summary that updates as items are checked off, showing completion rate and personalized next steps.</div>
            <div className="idea-preview">
              <div style={{ marginTop: 12, background: "#faf6f1", borderRadius: 8, padding: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: "#2d2a33" }}>Your Results</span>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, fontWeight: 700, color: "#e8845c" }}>75%</span>
                </div>
                <div style={{ height: 4, background: "rgba(232,132,92,0.15)", borderRadius: 2, marginBottom: 10 }}>
                  <div style={{ height: 4, width: "75%", background: "#e8845c", borderRadius: 2 }} />
                </div>
                <div style={{ fontSize: 9, color: "#6b6575", lineHeight: 1.5 }}>
                  ✅ Foundation complete &nbsp; ✅ Structure complete<br />
                  ✅ Copy complete &nbsp; ⬜ Engagement: 1 remaining
                </div>
              </div>
            </div>
          </div>

          {/* Reset Button */}
          <div className="idea-card">
            <div className="idea-name">🔄 Reset & Reuse Button</div>
            <div className="idea-desc">Let users clear all checkmarks and start fresh. Great for repeatable processes like weekly or launch checklists.</div>
            <div className="idea-preview">
              <div style={{ marginTop: 12, textAlign: "center" }}>
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  background: "linear-gradient(135deg, #1e1b2e, #2a2540)",
                  color: "#faf6f1",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: 11,
                  padding: "10px 20px",
                  borderRadius: 50,
                  letterSpacing: "0.3px"
                }}>
                  ↺ Reset Checklist
                </div>
                <div style={{ fontSize: 9, color: "#9b95a5", marginTop: 6 }}>Clears all checkmarks so you can run through it again</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Completion CTA */}
      <div className="completion-card">
        <div className="completion-inner">
          <div className="completion-emoji">{checkedCount === totalItems ? "🎉" : "✨"}</div>
          <div className="completion-title">
            {checkedCount === totalItems
              ? "Your Checklist Blueprint Is Complete"
              : "Keep Going, You Are Building Something Great"}
          </div>
          <div className="completion-text">
            {checkedCount === totalItems
              ? "You have worked through every step of creating a checklist that will genuinely help your audience. Now go build it. Your people are waiting."
              : "Every item you check off gets you closer to a checklist your audience will actually complete and share. Take it one step at a time."}
          </div>
          <a href={checklistData.cta.url} className="cta-button" style={{ marginTop: 28 }}>
            {checklistData.cta.text} <span>→</span>
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="footer-section">
        <div className="footer-brand">Your Brand Name</div>
        <div className="footer-tagline">Your tagline or short description goes here</div>
        <div className="footer-details">
          Your Company Name<br />
          123 Your Street Address<br />
          City, State/Province, Postal Code<br />
          Country<br /><br />
          your@email.com
        </div>
        <div className="footer-links">
          <a href="#" className="footer-link">Privacy Policy</a>
          <a href="#" className="footer-link">Terms of Service</a>
          <a href="#" className="footer-link">Disclaimer</a>
          <a href="#" className="footer-link">Contact</a>
        </div>
        <div className="footer-divider" />
        <div className="footer-credit">ARTIFACT KICKSTART KIT • CREATED WITH CLAUDE</div>
      </div>
    </div>
  );
}
