import { useState, useEffect, useRef } from "react";

const C = {
  bg: "#F5F2EC",
  navy: "#1A1A2E",
  pink: "#E8A0E8",
  green: "#7EECD4",
  purple: "#B88CED",
  lavender: "#C5B8E8",
  white: "#FFFFFF",
  muted: "#8A8680",
  border: "#D4CFC7",
  card: "#FAF8F4",
};

const PROMPT_BUILDER_TYPES = [
  { id: "content", label: "Content", emoji: "✍️", desc: "Blog posts, captions, emails, scripts" },
  { id: "image", label: "Image", emoji: "🖼️", desc: "Midjourney, DALL-E, Ideogram prompts" },
  { id: "code", label: "Code", emoji: "💻", desc: "Components, scripts, refactors" },
  { id: "analysis", label: "Analysis", emoji: "📊", desc: "Data reviews, feedback, audits" },
  { id: "brainstorm", label: "Brainstorm", emoji: "💡", desc: "Ideas, angles, hooks, names" },
  { id: "plan", label: "Plan", emoji: "🗺️", desc: "Strategies, launches, roadmaps" },
];

const PROMPT_BUILDER_TEMPLATES = [
  {
    name: "Instagram caption from a transcript",
    type: "content",
    goal: "Turn a 3-minute voice memo transcript into a scroll-stopping Instagram caption.",
    audience: "Female coaches and creators aged 25 to 45 who follow me for business and mindset content.",
    format: "One short hook (under 10 words), three paragraphs of body copy, one line break between each, end with a soft CTA asking a question. No emojis, no hashtags.",
    constraints: "Keep it conversational. No em dashes. No repetitive staccato patterns. Do not oversell or use generic advice.",
  },
  {
    name: "Midjourney ad image prompt",
    type: "image",
    goal: "Generate 5 on-brand Meta ad image prompts showing a coach at her desk working on her laptop.",
    audience: "Prompt tool is Midjourney. Style should feel warm, editorial, lifestyle photography.",
    format: "One full paragraph per prompt, 40 to 60 words each. Describe subject, setting, lighting, camera angle, and mood. End each with aspect ratio and style parameters.",
    constraints: "No text in the image. No logos. Diverse representation across the 5 prompts. Natural daylight, not studio lighting.",
  },
  {
    name: "React component refactor",
    type: "code",
    goal: "Refactor a long React component into smaller composable pieces without changing behavior.",
    audience: "A mid-level React developer who knows hooks but not advanced patterns.",
    format: "Return the refactored code in one code block. Add a short explanation above it listing what was extracted and why.",
    constraints: "Do not add new dependencies. Keep the same file structure. Preserve all prop names exactly. Use function components with hooks only.",
  },
  {
    name: "Sales page audit",
    type: "analysis",
    goal: "Audit a sales page and give prioritized feedback on copy, structure, and conversion blockers.",
    audience: "A coach or creator selling a $50 to $200 digital product. They wrote the page themselves.",
    format: "Return feedback as a numbered list ordered by impact. For each item: what is wrong, why it hurts conversions, and one specific rewrite suggestion.",
    constraints: "Be direct but kind. No generic advice. Cite specific sentences or sections from the page.",
  },
];

function PromptBuilderStepDot({ step, current, label, onClick }) {
  const isDone = step < current;
  const isActive = step === current;
  return (
    <button
      className="pb-btn"
      onClick={onClick}
      aria-label={`Go to step ${step + 1}: ${label}`}
      aria-current={isActive ? "step" : undefined}
      style={{
        flex: 1,
        minWidth: 0,
        background: "transparent",
        border: "none",
        cursor: "pointer",
        padding: "6px 4px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
      }}
    >
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: isActive ? C.pink : isDone ? C.green : C.card,
          border: `2px solid ${isActive ? C.pink : isDone ? C.green : C.border}`,
          color: isActive || isDone ? C.navy : C.muted,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Space Mono', monospace",
          fontSize: 11,
          fontWeight: 700,
          transition: "all 0.2s ease",
        }}
        aria-hidden="true"
      >
        {isDone ? "✓" : step + 1}
      </div>
      <div
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 9,
          letterSpacing: 1.2,
          color: isActive ? C.navy : C.muted,
          textTransform: "uppercase",
          fontWeight: 700,
          textAlign: "center",
          lineHeight: 1.2,
        }}
      >
        {label}
      </div>
    </button>
  );
}

function PromptBuilderTextarea({ value, onChange, placeholder, rows = 4, label, hint }) {
  return (
    <div>
      {label && (
        <label
          style={{
            display: "block",
            fontFamily: "'Space Mono', monospace",
            fontSize: 10,
            letterSpacing: 2,
            color: C.muted,
            textTransform: "uppercase",
            fontWeight: 700,
            marginBottom: 8,
          }}
        >
          {label}
        </label>
      )}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        style={{
          width: "100%",
          padding: "14px 16px",
          background: C.white,
          border: `1px solid ${C.border}`,
          borderRadius: 10,
          fontFamily: "'Outfit', sans-serif",
          fontSize: 15,
          color: C.navy,
          lineHeight: 1.55,
          resize: "vertical",
          outline: "none",
          boxSizing: "border-box",
          transition: "border-color 0.15s ease, box-shadow 0.15s ease",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = C.pink;
          e.target.style.boxShadow = `0 0 0 3px ${C.pink}30`;
        }}
        onBlur={(e) => {
          e.target.style.borderColor = C.border;
          e.target.style.boxShadow = "none";
        }}
      />
      {hint && (
        <div
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 12,
            color: C.muted,
            lineHeight: 1.5,
            marginTop: 8,
          }}
        >
          {hint}
        </div>
      )}
    </div>
  );
}

function assemblePrompt({ type, goal, audience, format, constraints }) {
  const typeLabel = PROMPT_BUILDER_TYPES.find((t) => t.id === type)?.label || "task";
  const parts = [];
  parts.push(`You are helping me with a ${typeLabel.toLowerCase()} task.`);
  parts.push("");
  if (goal) parts.push(`**Goal**\n${goal}`);
  if (audience) parts.push(`**Audience / Use case**\n${audience}`);
  if (format) parts.push(`**Format**\n${format}`);
  if (constraints) parts.push(`**Constraints**\n${constraints}`);
  parts.push("");
  parts.push("Return the result directly without preamble or summary.");
  return parts.join("\n\n");
}

export default function PromptBuilder() {
  // Load Google Fonts
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Space+Mono:wght@400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const STEPS = [
    { key: "type", label: "Type" },
    { key: "goal", label: "Goal" },
    { key: "audience", label: "Audience" },
    { key: "format", label: "Format" },
    { key: "constraints", label: "Constraints" },
    { key: "review", label: "Review" },
  ];

  const [current, setCurrent] = useState(0);
  const [form, setForm] = useState({
    type: "content",
    goal: "",
    audience: "",
    format: "",
    constraints: "",
  });
  const [saved, setSaved] = useState([]);
  const [copied, setCopied] = useState(false);
  const [savedToast, setSavedToast] = useState(false);
  const copyTimerRef = useRef(null);
  const saveTimerRef = useRef(null);

  const assembledPrompt = assemblePrompt(form);
  const isFinalStep = current === STEPS.length - 1;

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function loadTemplate(tpl) {
    setForm({
      type: tpl.type,
      goal: tpl.goal,
      audience: tpl.audience,
      format: tpl.format,
      constraints: tpl.constraints,
    });
    setCurrent(STEPS.length - 1);
  }

  function reset() {
    setForm({ type: "content", goal: "", audience: "", format: "", constraints: "" });
    setCurrent(0);
  }

  async function copyPrompt() {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(assembledPrompt);
      } else {
        const ta = document.createElement("textarea");
        ta.value = assembledPrompt;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      clearTimeout(copyTimerRef.current);
      copyTimerRef.current = setTimeout(() => setCopied(false), 1800);
    } catch (e) {
      // silent fail
    }
  }

  function savePrompt() {
    const name = form.goal ? form.goal.slice(0, 60) : "Untitled prompt";
    setSaved((prev) => [{ name, form: { ...form }, assembled: assembledPrompt, id: Date.now() }, ...prev]);
    setSavedToast(true);
    clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => setSavedToast(false), 1600);
  }

  function loadSaved(item) {
    setForm({ ...item.form });
    setCurrent(STEPS.length - 1);
  }

  useEffect(() => () => {
    clearTimeout(copyTimerRef.current);
    clearTimeout(saveTimerRef.current);
  }, []);

  return (
    <div style={{ background: C.bg, minHeight: "100vh", padding: "clamp(16px, 3vw, 32px)" }}>
      <style>{`
        .pb-btn:focus-visible {
          outline: 3px solid ${C.pink};
          outline-offset: 2px;
        }
        @media (prefers-reduced-motion: reduce) {
          .pb-btn, .pb-btn * { transition: none !important; }
        }
      `}</style>

      <main
        style={{
          background: C.bg,
          backgroundImage:
            "linear-gradient(rgba(180,175,165,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(180,175,165,.15) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          border: `1px solid ${C.border}`,
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 4px 16px rgba(26,26,46,0.08)",
          maxWidth: 1100,
          margin: "0 auto",
        }}
        aria-label="Prompt Builder wizard"
      >
        {/* Header */}
        <header
          style={{
            background: C.navy,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            padding: "28px 28px 24px",
            color: C.white,
          }}
        >
          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 10,
              letterSpacing: 2.5,
              color: C.pink,
              textTransform: "uppercase",
              fontWeight: 700,
              marginBottom: 10,
            }}
          >
            Guided Wizard · 6 Steps
          </div>
          <h2
            style={{
              margin: "0 0 10px 0",
              fontFamily: "'Outfit', sans-serif",
              fontSize: "clamp(22px, 3vw, 28px)",
              fontWeight: 800,
              color: C.white,
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
            }}
          >
            Build a prompt that{" "}
            <span
              style={{
                background: `linear-gradient(135deg, ${C.pink}, ${C.purple}, ${C.green})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              works the first time
            </span>
          </h2>
          <p
            style={{
              margin: 0,
              fontFamily: "'Outfit', sans-serif",
              fontSize: 14,
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.55,
              maxWidth: 620,
            }}
          >
            Answer 5 quick questions. Watch your prompt assemble in real time. Copy it, paste it into any AI tool, get a usable result on the first try.
          </p>
        </header>

        {/* Progress dots */}
        <nav
          aria-label="Wizard progress"
          style={{
            display: "flex",
            gap: 4,
            padding: "18px 20px",
            background: C.white,
            borderBottom: `1px solid ${C.border}`,
          }}
        >
          {STEPS.map((s, i) => (
            <PromptBuilderStepDot
              key={s.key}
              step={i}
              current={current}
              label={s.label}
              onClick={() => setCurrent(i)}
            />
          ))}
        </nav>

        {/* Step content */}
        <section
          style={{ padding: "28px", background: C.white, borderBottom: `1px solid ${C.border}` }}
          aria-live="polite"
        >
          {/* Step 0: Type */}
          {current === 0 && (
            <div>
              <h3
                style={{
                  margin: "0 0 6px 0",
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 20,
                  fontWeight: 700,
                  color: C.navy,
                }}
              >
                What are you creating?
              </h3>
              <p
                style={{
                  margin: "0 0 20px 0",
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 14,
                  color: C.muted,
                  lineHeight: 1.55,
                }}
              >
                Pick the closest match. This sets the shape of your prompt.
              </p>

              <div
                role="radiogroup"
                aria-label="Prompt type"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: 10,
                  marginBottom: 24,
                }}
              >
                {PROMPT_BUILDER_TYPES.map((t) => {
                  const isSelected = form.type === t.id;
                  return (
                    <button
                      key={t.id}
                      className="pb-btn"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => updateField("type", t.id)}
                      style={{
                        padding: "14px 16px",
                        background: isSelected ? `${C.pink}20` : C.card,
                        border: `2px solid ${isSelected ? C.pink : C.border}`,
                        borderRadius: 10,
                        cursor: "pointer",
                        textAlign: "left",
                        display: "flex",
                        flexDirection: "column",
                        gap: 4,
                        transition: "all 0.15s ease",
                        minHeight: 76,
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 18 }} aria-hidden="true">
                          {t.emoji}
                        </span>
                        <span
                          style={{
                            fontFamily: "'Outfit', sans-serif",
                            fontSize: 15,
                            fontWeight: 700,
                            color: C.navy,
                          }}
                        >
                          {t.label}
                        </span>
                      </div>
                      <div
                        style={{
                          fontFamily: "'Outfit', sans-serif",
                          fontSize: 12,
                          color: C.muted,
                          lineHeight: 1.45,
                        }}
                      >
                        {t.desc}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Starter templates */}
              <div>
                <div
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 10,
                    letterSpacing: 2,
                    color: C.muted,
                    textTransform: "uppercase",
                    fontWeight: 700,
                    marginBottom: 10,
                  }}
                >
                  Or start from a template
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: 8,
                  }}
                >
                  {PROMPT_BUILDER_TEMPLATES.map((tpl, i) => (
                    <button
                      key={i}
                      className="pb-btn"
                      onClick={() => loadTemplate(tpl)}
                      style={{
                        padding: "12px 14px",
                        background: C.card,
                        border: `1px dashed ${C.border}`,
                        borderRadius: 8,
                        cursor: "pointer",
                        textAlign: "left",
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: 13,
                        color: C.navy,
                        lineHeight: 1.4,
                        fontWeight: 600,
                        minHeight: 44,
                        transition: "all 0.15s ease",
                      }}
                    >
                      {tpl.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Goal */}
          {current === 1 && (
            <div>
              <h3
                style={{
                  margin: "0 0 6px 0",
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 20,
                  fontWeight: 700,
                  color: C.navy,
                }}
              >
                Describe the goal in one sentence
              </h3>
              <p
                style={{
                  margin: "0 0 20px 0",
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 14,
                  color: C.muted,
                  lineHeight: 1.55,
                }}
              >
                What exactly do you want the AI to produce? Be specific. Include the deliverable and the outcome.
              </p>
              <PromptBuilderTextarea
                value={form.goal}
                onChange={(v) => updateField("goal", v)}
                placeholder="Example: Write a 200-word Instagram caption that turns a coaching insight into a scroll-stopping story."
                rows={4}
                hint="Vague goals produce vague outputs. A sentence works better than a paragraph."
              />
            </div>
          )}

          {/* Step 2: Audience */}
          {current === 2 && (
            <div>
              <h3
                style={{
                  margin: "0 0 6px 0",
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 20,
                  fontWeight: 700,
                  color: C.navy,
                }}
              >
                Who is this for?
              </h3>
              <p
                style={{
                  margin: "0 0 20px 0",
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 14,
                  color: C.muted,
                  lineHeight: 1.55,
                }}
              >
                Who will read, see, or use the output? The more specific, the better the tone and vocabulary match.
              </p>
              <PromptBuilderTextarea
                value={form.audience}
                onChange={(v) => updateField("audience", v)}
                placeholder="Example: Female coaches aged 30 to 45 who follow me for business and marketing content. They know the basics and want tactical advice, not beginner explanations."
                rows={4}
                hint="Include background, experience level, and what they already know."
              />
            </div>
          )}

          {/* Step 3: Format */}
          {current === 3 && (
            <div>
              <h3
                style={{
                  margin: "0 0 6px 0",
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 20,
                  fontWeight: 700,
                  color: C.navy,
                }}
              >
                How should the output be structured?
              </h3>
              <p
                style={{
                  margin: "0 0 20px 0",
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 14,
                  color: C.muted,
                  lineHeight: 1.55,
                }}
              >
                Length, structure, tone. Format rules are what turn "pretty good" into usable.
              </p>
              <PromptBuilderTextarea
                value={form.format}
                onChange={(v) => updateField("format", v)}
                placeholder="Example: One short hook under 10 words. Three paragraphs of body copy with a line break between each. End with a soft CTA question. Conversational tone."
                rows={5}
                hint="Specify word counts, paragraph structure, bullet formats, and tone."
              />
            </div>
          )}

          {/* Step 4: Constraints */}
          {current === 4 && (
            <div>
              <h3
                style={{
                  margin: "0 0 6px 0",
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 20,
                  fontWeight: 700,
                  color: C.navy,
                }}
              >
                What should it avoid?
              </h3>
              <p
                style={{
                  margin: "0 0 20px 0",
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 14,
                  color: C.muted,
                  lineHeight: 1.55,
                }}
              >
                The "do not do this" list. Constraints are where most prompts leak. Be explicit.
              </p>
              <PromptBuilderTextarea
                value={form.constraints}
                onChange={(v) => updateField("constraints", v)}
                placeholder="Example: No em dashes. No hyperbolic salesy language. No generic advice. Do not use emojis or hashtags. Avoid repetitive staccato patterns."
                rows={5}
                hint="Banned words, tones, formats, or topics. Things that would ruin the output if left in."
              />
            </div>
          )}

          {/* Step 5: Review */}
          {current === 5 && (
            <div>
              <h3
                style={{
                  margin: "0 0 6px 0",
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 20,
                  fontWeight: 700,
                  color: C.navy,
                }}
              >
                Review and copy
              </h3>
              <p
                style={{
                  margin: "0 0 20px 0",
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 14,
                  color: C.muted,
                  lineHeight: 1.55,
                }}
              >
                This is your finished prompt. Copy it and paste into Claude, ChatGPT, or any AI tool.
              </p>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
                <button
                  className="pb-btn"
                  onClick={copyPrompt}
                  style={{
                    padding: "12px 20px",
                    background: copied ? C.green : C.pink,
                    color: C.navy,
                    border: "none",
                    borderRadius: 8,
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: 1.5,
                    textTransform: "uppercase",
                    cursor: "pointer",
                    minHeight: 44,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    transition: "background 0.2s ease",
                  }}
                >
                  <span aria-hidden="true">{copied ? "✓" : "📋"}</span>
                  <span>{copied ? "Copied to clipboard" : "Copy Prompt"}</span>
                </button>
                <button
                  className="pb-btn"
                  onClick={savePrompt}
                  style={{
                    padding: "12px 20px",
                    background: C.card,
                    color: C.navy,
                    border: `1px solid ${C.border}`,
                    borderRadius: 8,
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: 1.5,
                    textTransform: "uppercase",
                    cursor: "pointer",
                    minHeight: 44,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span aria-hidden="true">💾</span>
                  <span>{savedToast ? "Saved" : "Save Prompt"}</span>
                </button>
                <button
                  className="pb-btn"
                  onClick={reset}
                  style={{
                    padding: "12px 20px",
                    background: "transparent",
                    color: C.muted,
                    border: `1px solid ${C.border}`,
                    borderRadius: 8,
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: 1.5,
                    textTransform: "uppercase",
                    cursor: "pointer",
                    minHeight: 44,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span aria-hidden="true">↺</span>
                  <span>Start Over</span>
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Live preview */}
        <section
          style={{ padding: "24px 28px", background: C.card, borderBottom: `1px solid ${C.border}` }}
          aria-labelledby="pb-preview"
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
            <h3
              id="pb-preview"
              style={{
                margin: 0,
                fontFamily: "'Space Mono', monospace",
                fontSize: 11,
                letterSpacing: 3,
                color: C.muted,
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            >
              Live Preview
            </h3>
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 10,
                letterSpacing: 1.5,
                color: C.muted,
                fontWeight: 700,
              }}
            >
              {assembledPrompt.split(/\s+/).filter(Boolean).length} words
            </div>
          </div>
          <pre
            style={{
              margin: 0,
              padding: "18px 20px",
              background: C.navy,
              color: "rgba(255,255,255,0.92)",
              borderRadius: 10,
              fontFamily: "'Space Mono', monospace",
              fontSize: 13,
              lineHeight: 1.65,
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              maxHeight: 320,
              overflowY: "auto",
            }}
          >
            {assembledPrompt}
          </pre>
        </section>

        {/* Saved prompts sidebar-style list */}
        {saved.length > 0 && (
          <section
            style={{ padding: "24px 28px", background: C.white, borderBottom: `1px solid ${C.border}` }}
            aria-labelledby="pb-saved"
          >
            <h3
              id="pb-saved"
              style={{
                margin: "0 0 12px 0",
                fontFamily: "'Space Mono', monospace",
                fontSize: 11,
                letterSpacing: 3,
                color: C.muted,
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            >
              Saved This Session ({saved.length})
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {saved.map((item) => (
                <button
                  key={item.id}
                  className="pb-btn"
                  onClick={() => loadSaved(item)}
                  style={{
                    padding: "12px 16px",
                    background: C.card,
                    border: `1px solid ${C.border}`,
                    borderRadius: 8,
                    cursor: "pointer",
                    textAlign: "left",
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 14,
                    color: C.navy,
                    lineHeight: 1.45,
                    fontWeight: 600,
                    minHeight: 44,
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <span style={{ fontSize: 16 }} aria-hidden="true">
                    {PROMPT_BUILDER_TYPES.find((t) => t.id === item.form.type)?.emoji || "📝"}
                  </span>
                  <span style={{ flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {item.name}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: 9,
                      letterSpacing: 1.5,
                      color: C.muted,
                      textTransform: "uppercase",
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    Load →
                  </span>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Wizard nav */}
        <div
          style={{
            padding: "20px 28px",
            background: C.white,
            display: "flex",
            justifyContent: "space-between",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          <button
            className="pb-btn"
            onClick={() => setCurrent((c) => Math.max(0, c - 1))}
            disabled={current === 0}
            style={{
              padding: "12px 20px",
              background: current === 0 ? "transparent" : C.card,
              color: current === 0 ? C.muted : C.navy,
              border: `1px solid ${C.border}`,
              borderRadius: 8,
              fontFamily: "'Space Mono', monospace",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              cursor: current === 0 ? "not-allowed" : "pointer",
              opacity: current === 0 ? 0.4 : 1,
              minHeight: 44,
            }}
          >
            ← Back
          </button>

          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 11,
              letterSpacing: 2,
              color: C.muted,
              textTransform: "uppercase",
              alignSelf: "center",
              fontWeight: 700,
            }}
          >
            Step {current + 1} of {STEPS.length}
          </div>

          <button
            className="pb-btn"
            onClick={() => setCurrent((c) => Math.min(STEPS.length - 1, c + 1))}
            disabled={isFinalStep}
            style={{
              padding: "12px 20px",
              background: isFinalStep ? "transparent" : C.pink,
              color: isFinalStep ? C.muted : C.navy,
              border: isFinalStep ? `1px solid ${C.border}` : "none",
              borderRadius: 8,
              fontFamily: "'Space Mono', monospace",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              cursor: isFinalStep ? "not-allowed" : "pointer",
              opacity: isFinalStep ? 0.4 : 1,
              minHeight: 44,
            }}
          >
            Next →
          </button>
        </div>
      </main>
    </div>
  );
}


// ============================================================
// COACH GROWTH COMPANY LEGAL FOOTER
// ============================================================

