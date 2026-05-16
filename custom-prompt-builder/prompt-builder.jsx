import { useEffect, useRef, useState } from "react";

const C = {
  bg: "#F5F2EC",
  navy: "#1A1A2E",
  pink: "#E8A0E8",
  green: "#7EECD4",
  white: "#FFFFFF",
  muted: "#8A8680",
  border: "#D4CFC7",
  card: "#FAF8F4",
};

const PROMPT_BUILDER_TYPES = [
  { id: "explain", label: "Explain", badge: "INFO", desc: "Letters, forms, jargon, and confusing messages" },
  { id: "write", label: "Write", badge: "PEN", desc: "Emails, replies, polite messages, and wording help" },
  { id: "decide", label: "Decide", badge: "CHK", desc: "Compare options, think clearly, and choose next steps" },
  { id: "organize", label: "Organize", badge: "BOX", desc: "Lists, plans, admin tasks, and practical steps" },
  { id: "safety", label: "Safety", badge: "SHD", desc: "Scam checks, red flags, and safer questions" },
  { id: "create", label: "Create", badge: "IDEA", desc: "Build a custom prompt for something more specific" },
];

const PROMPT_BUILDER_TEMPLATES = [
  {
    name: "Explain a confusing letter",
    type: "explain",
    goal: "Explain a letter or message in plain English so I can understand what it means and what I need to do next.",
    audience: "An everyday person who feels unsure, does not want jargon, and wants a calm, simple explanation.",
    format: "Start with a short plain-English summary. Then list the key points. End with the next 3 steps I should take.",
    constraints: "Do not use jargon. Keep the tone calm and clear. If something is uncertain, say so simply.",
    extra: "If there is a deadline or amount of money involved, point it out clearly.",
  },
  {
    name: "Write a polite email reply",
    type: "write",
    goal: "Write a polite email reply that says what I need clearly without sounding rude or awkward.",
    audience: "Someone replying to a business, landlord, school, service, or workplace message.",
    format: "Write one short subject line if needed, then a clear email reply in simple language.",
    constraints: "Keep it respectful. No overly formal phrases. No long paragraphs.",
    extra: "Make it sound warm, calm, and confident.",
  },
  {
    name: "Compare two options clearly",
    type: "decide",
    goal: "Help me compare two choices and understand the pros, cons, risks, and best next step.",
    audience: "Someone who feels stuck and wants help thinking clearly before making a decision.",
    format: "Use a simple comparison with pros, cons, risks, and a short recommendation based on the information given.",
    constraints: "Do not pretend to know facts that were not provided. Keep it balanced and practical.",
    extra: "If more information is needed, list the questions I should answer before deciding.",
  },
  {
    name: "Check if something feels like a scam",
    type: "safety",
    goal: "Help me review a message, offer, or website and spot warning signs before I respond or pay.",
    audience: "Someone who wants to stay safe online and avoid being pressured or tricked.",
    format: "List the red flags, what looks normal, what I should verify myself, and the safest next step.",
    constraints: "Do not guarantee that something is safe. Encourage checking trusted sources where needed.",
    extra: "Use plain English and do not make me feel silly for checking.",
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
          color: C.navy,
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
        {isDone ? "OK" : step + 1}
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
      {label ? (
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
      ) : null}
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
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
        onFocus={(event) => {
          event.target.style.borderColor = C.pink;
          event.target.style.boxShadow = `0 0 0 3px ${C.pink}30`;
        }}
        onBlur={(event) => {
          event.target.style.borderColor = C.border;
          event.target.style.boxShadow = "none";
        }}
      />
      {hint ? (
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
      ) : null}
    </div>
  );
}

function assemblePrompt({ type, goal, audience, format, constraints, extra }) {
  const typeLabel = PROMPT_BUILDER_TYPES.find((item) => item.id === type)?.label || "task";
  const parts = [];

  parts.push(`You are helping me with a ${typeLabel.toLowerCase()} task.`);
  parts.push("Use plain English, be practical, and make the result easy to follow.");
  parts.push("");

  if (goal) parts.push(`Goal\n${goal}`);
  if (audience) parts.push(`Audience / Use case\n${audience}`);
  if (format) parts.push(`Format\n${format}`);
  if (constraints) parts.push(`Constraints\n${constraints}`);
  if (extra) parts.push(`Anything else to include\n${extra}`);

  parts.push("");
  parts.push("Return the result directly in a clear, useful way without unnecessary preamble.");

  return parts.join("\n\n");
}

export default function PromptBuilder() {
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
    { key: "constraints", label: "Avoid" },
    { key: "extra", label: "Extra" },
    { key: "review", label: "Review" },
  ];

  const emptyForm = {
    type: "explain",
    goal: "",
    audience: "",
    format: "",
    constraints: "",
    extra: "",
  };

  const [current, setCurrent] = useState(0);
  const [form, setForm] = useState(emptyForm);
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

  function loadTemplate(template) {
    setForm({
      type: template.type,
      goal: template.goal,
      audience: template.audience,
      format: template.format,
      constraints: template.constraints,
      extra: template.extra,
    });
    setCurrent(STEPS.length - 1);
  }

  function reset() {
    setForm(emptyForm);
    setCurrent(0);
  }

  async function copyPrompt() {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(assembledPrompt);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = assembledPrompt;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }

      setCopied(true);
      clearTimeout(copyTimerRef.current);
      copyTimerRef.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      // Silent fail for quick utility behavior.
    }
  }

  function savePrompt() {
    const name = form.goal ? form.goal.slice(0, 60) : "Untitled prompt";
    setSaved((prev) => [{ name, form: { ...form }, id: Date.now() }, ...prev]);
    setSavedToast(true);
    clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => setSavedToast(false), 1600);
  }

  function loadSaved(item) {
    setForm({ ...item.form });
    setCurrent(STEPS.length - 1);
  }

  useEffect(() => {
    return () => {
      clearTimeout(copyTimerRef.current);
      clearTimeout(saveTimerRef.current);
    };
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
            Guided Builder · 7 Steps
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
            Build a custom prompt for real life tasks
          </h2>
          <p
            style={{
              margin: 0,
              fontFamily: "'Outfit', sans-serif",
              fontSize: 14,
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.55,
              maxWidth: 700,
            }}
          >
            Answer a few simple questions. The Builder turns your situation into a prompt you can paste into ChatGPT or another AI tool with much more control than a blank box.
          </p>
        </header>

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
          {STEPS.map((step, index) => (
            <PromptBuilderStepDot
              key={step.key}
              step={index}
              current={current}
              label={step.label}
              onClick={() => setCurrent(index)}
            />
          ))}
        </nav>

        <section
          style={{ padding: "28px", background: C.white, borderBottom: `1px solid ${C.border}` }}
          aria-live="polite"
        >
          {current === 0 ? (
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
                What do you need help with?
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
                Pick the closest match. This gives the prompt the right shape before we add your details.
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
                {PROMPT_BUILDER_TYPES.map((type) => {
                  const isSelected = form.type === type.id;

                  return (
                    <button
                      key={type.id}
                      className="pb-btn"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => updateField("type", type.id)}
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
                        minHeight: 92,
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            minWidth: 38,
                            minHeight: 24,
                            borderRadius: 999,
                            background: C.white,
                            border: `1px solid ${C.border}`,
                            fontFamily: "'Space Mono', monospace",
                            fontSize: 10,
                            fontWeight: 700,
                            color: C.navy,
                          }}
                          aria-hidden="true"
                        >
                          {type.badge}
                        </span>
                        <span
                          style={{
                            fontFamily: "'Outfit', sans-serif",
                            fontSize: 15,
                            fontWeight: 700,
                            color: C.navy,
                          }}
                        >
                          {type.label}
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
                        {type.desc}
                      </div>
                    </button>
                  );
                })}
              </div>

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
                  Or start from a ready-made example
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: 8,
                  }}
                >
                  {PROMPT_BUILDER_TEMPLATES.map((template, index) => (
                    <button
                      key={index}
                      className="pb-btn"
                      onClick={() => loadTemplate(template)}
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
                      {template.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          {current === 1 ? (
            <div>
              <h3 style={{ margin: "0 0 6px 0", fontFamily: "'Outfit', sans-serif", fontSize: 20, fontWeight: 700, color: C.navy }}>
                What do you want the AI to do?
              </h3>
              <p style={{ margin: "0 0 20px 0", fontFamily: "'Outfit', sans-serif", fontSize: 14, color: C.muted, lineHeight: 1.55 }}>
                Describe the result you want in one or two clear sentences.
              </p>
              <PromptBuilderTextarea
                value={form.goal}
                onChange={(value) => updateField("goal", value)}
                placeholder="Example: Explain this council letter in simple language and tell me what I need to do next."
                rows={4}
                hint="Specific goals give better results than vague ones."
              />
            </div>
          ) : null}

          {current === 2 ? (
            <div>
              <h3 style={{ margin: "0 0 6px 0", fontFamily: "'Outfit', sans-serif", fontSize: 20, fontWeight: 700, color: C.navy }}>
                Who is this for?
              </h3>
              <p style={{ margin: "0 0 20px 0", fontFamily: "'Outfit', sans-serif", fontSize: 14, color: C.muted, lineHeight: 1.55 }}>
                Tell the AI who will use the answer and how simple or detailed it should be.
              </p>
              <PromptBuilderTextarea
                value={form.audience}
                onChange={(value) => updateField("audience", value)}
                placeholder="Example: I want this written for someone who is not technical and may feel stressed or confused."
                rows={4}
                hint="You can mention age, experience level, confidence, or the situation they are in."
              />
            </div>
          ) : null}

          {current === 3 ? (
            <div>
              <h3 style={{ margin: "0 0 6px 0", fontFamily: "'Outfit', sans-serif", fontSize: 20, fontWeight: 700, color: C.navy }}>
                What should the answer look like?
              </h3>
              <p style={{ margin: "0 0 20px 0", fontFamily: "'Outfit', sans-serif", fontSize: 14, color: C.muted, lineHeight: 1.55 }}>
                Ask for bullet points, short paragraphs, step-by-step instructions, or whatever format helps you most.
              </p>
              <PromptBuilderTextarea
                value={form.format}
                onChange={(value) => updateField("format", value)}
                placeholder="Example: Start with a short summary, then use bullet points, then finish with 3 practical next steps."
                rows={5}
                hint="This is where you shape the result into something easy to use."
              />
            </div>
          ) : null}

          {current === 4 ? (
            <div>
              <h3 style={{ margin: "0 0 6px 0", fontFamily: "'Outfit', sans-serif", fontSize: 20, fontWeight: 700, color: C.navy }}>
                What should it avoid?
              </h3>
              <p style={{ margin: "0 0 20px 0", fontFamily: "'Outfit', sans-serif", fontSize: 14, color: C.muted, lineHeight: 1.55 }}>
                This helps the AI avoid answers that are too wordy, too robotic, too harsh, or just not useful.
              </p>
              <PromptBuilderTextarea
                value={form.constraints}
                onChange={(value) => updateField("constraints", value)}
                placeholder="Example: Do not use jargon. Do not sound robotic. Do not make anything up if the information is unclear."
                rows={5}
                hint="Say what would make the answer less useful for you."
              />
            </div>
          ) : null}

          {current === 5 ? (
            <div>
              <h3 style={{ margin: "0 0 6px 0", fontFamily: "'Outfit', sans-serif", fontSize: 20, fontWeight: 700, color: C.navy }}>
                Anything else you want to add?
              </h3>
              <p style={{ margin: "0 0 20px 0", fontFamily: "'Outfit', sans-serif", fontSize: 14, color: C.muted, lineHeight: 1.55 }}>
                This is your extra control box. Add tone, context, examples, or any small detail that will make the answer feel more like yours.
              </p>
              <PromptBuilderTextarea
                value={form.extra}
                onChange={(value) => updateField("extra", value)}
                placeholder="Example: Make it sound calm and reassuring. If there is a deadline, highlight it clearly. Keep the language very simple."
                rows={5}
                label="Extra creative control"
                hint="Use this for nuance that does not fit neatly into the earlier boxes."
              />
            </div>
          ) : null}

          {current === 6 ? (
            <div>
              <h3 style={{ margin: "0 0 6px 0", fontFamily: "'Outfit', sans-serif", fontSize: 20, fontWeight: 700, color: C.navy }}>
                Review and copy
              </h3>
              <p style={{ margin: "0 0 20px 0", fontFamily: "'Outfit', sans-serif", fontSize: 14, color: C.muted, lineHeight: 1.55 }}>
                This is your finished prompt. Copy it and paste it into ChatGPT or another AI tool.
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
                  <span>{copied ? "OK" : "COPY"}</span>
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
                  <span>{savedToast ? "SAVED" : "SAVE"}</span>
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
                  <span>RESET</span>
                  <span>Start Over</span>
                </button>
              </div>
            </div>
          ) : null}
        </section>

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

        {saved.length > 0 ? (
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
                  <span
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: 10,
                      fontWeight: 700,
                      color: C.muted,
                    }}
                    aria-hidden="true"
                  >
                    {PROMPT_BUILDER_TYPES.find((type) => type.id === item.form.type)?.badge || "SAVE"}
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
                    Load
                  </span>
                </button>
              ))}
            </div>
          </section>
        ) : null}

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
            onClick={() => setCurrent((step) => Math.max(0, step - 1))}
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
            Back
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
            onClick={() => setCurrent((step) => Math.min(STEPS.length - 1, step + 1))}
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
            Next
          </button>
        </div>
      </main>
    </div>
  );
}
