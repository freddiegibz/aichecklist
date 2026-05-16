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

const HELP_TYPES = [
  { id: "explain", label: "Explain it clearly", badge: "INFO" },
  { id: "steps", label: "Give me the next steps", badge: "STEP" },
  { id: "decide", label: "Help me decide", badge: "CHK" },
  { id: "write", label: "Write something for me", badge: "PEN" },
  { id: "check", label: "Check for risks or red flags", badge: "SAFE" },
  { id: "other", label: "Something else", badge: "OTR" },
];

const STYLE_OPTIONS = [
  { id: "simple", label: "Keep it simple" },
  { id: "steps", label: "Use steps" },
  { id: "concise", label: "Keep it short" },
  { id: "gentle", label: "Be calm and reassuring" },
  { id: "questions", label: "Ask me questions if needed" },
];

const STARTERS = [
  {
    name: "Explain a confusing letter",
    helpType: "explain",
    situation: "I have received a letter I do not understand. I want to know what it means, what matters most, and what I need to do next.",
    preferredHelp: ["simple", "steps", "gentle"],
    extra: "If there is a deadline or amount of money involved, point it out clearly.",
  },
  {
    name: "Write a polite reply",
    helpType: "write",
    situation: "I need to reply to a message politely, clearly, and without sounding rude or awkward.",
    preferredHelp: ["simple", "concise"],
    extra: "Make the wording warm, calm, and confident.",
  },
  {
    name: "Compare two options",
    helpType: "decide",
    situation: "I am choosing between two options and want help comparing the pros, cons, risks, and best next step.",
    preferredHelp: ["simple", "steps", "questions"],
    extra: "If more information is needed before deciding, tell me what I should find out.",
  },
  {
    name: "Check if something seems risky",
    helpType: "check",
    situation: "I want to review a message, offer, or website and understand if there are warning signs before I respond or pay.",
    preferredHelp: ["simple", "steps", "gentle"],
    extra: "Do not guarantee that something is safe. Tell me what I should verify myself.",
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
        <label style={{ display: "block", fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: 2, color: C.muted, textTransform: "uppercase", fontWeight: 700, marginBottom: 8 }}>
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
        }}
      />
      {hint ? <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, color: C.muted, lineHeight: 1.5, marginTop: 8 }}>{hint}</div> : null}
    </div>
  );
}

function assemblePrompt({ helpType, otherHelp, situation, preferredHelp, extra }) {
  const selectedType = HELP_TYPES.find((item) => item.id === helpType);
  const helpLabel = helpType === "other" ? otherHelp || "custom help" : selectedType?.label || "help";
  const styles = preferredHelp
    .map((id) => STYLE_OPTIONS.find((item) => item.id === id)?.label)
    .filter(Boolean);

  const parts = [
    `I need help with this situation:`,
    situation || "[Describe the situation here]",
    "",
    `Please ${helpLabel.toLowerCase()}.`,
  ];

  if (styles.length) {
    parts.push(`How I want the answer: ${styles.join(", ")}.`);
  }

  if (extra) {
    parts.push(`Anything else that matters: ${extra}`);
  }

  parts.push("");
  parts.push("Use plain English. Be practical. If important information is missing, say what else I should provide.");

  return parts.join("\n\n");
}

export default function PromptBuilder() {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Space+Mono:wght@400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const STEPS = [
    { key: "situation", label: "Situation" },
    { key: "help", label: "Help" },
    { key: "review", label: "Review" },
  ];

  const emptyForm = {
    helpType: "explain",
    otherHelp: "",
    situation: "",
    preferredHelp: ["simple"],
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

  function toggleStyle(id) {
    setForm((prev) => ({
      ...prev,
      preferredHelp: prev.preferredHelp.includes(id)
        ? prev.preferredHelp.filter((item) => item !== id)
        : [...prev.preferredHelp, id],
    }));
  }

  function loadStarter(starter) {
    setForm({
      helpType: starter.helpType,
      otherHelp: "",
      situation: starter.situation,
      preferredHelp: starter.preferredHelp,
      extra: starter.extra,
    });
    setCurrent(STEPS.length - 1);
  }

  function reset() {
    setForm(emptyForm);
    setCurrent(0);
  }

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(assembledPrompt);
      setCopied(true);
      clearTimeout(copyTimerRef.current);
      copyTimerRef.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      // Silent fail for utility behavior.
    }
  }

  function savePrompt() {
    const name = form.situation ? form.situation.slice(0, 60) : "Untitled prompt";
    setSaved((prev) => [{ name, form: { ...form }, id: Date.now() }, ...prev]);
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
        .pb-btn:focus-visible { outline: 3px solid ${C.pink}; outline-offset: 2px; }
      `}</style>

      <main style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 16px rgba(26,26,46,0.08)", maxWidth: 1100, margin: "0 auto" }}>
        <header style={{ background: C.navy, padding: "28px 28px 24px", color: C.white }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: 2.5, color: C.pink, textTransform: "uppercase", fontWeight: 700, marginBottom: 10 }}>
            Guided Builder · 3 Steps
          </div>
          <h2 style={{ margin: "0 0 10px", fontFamily: "'Outfit', sans-serif", fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 800 }}>
            Make a prompt for any situation
          </h2>
          <p style={{ margin: 0, fontFamily: "'Outfit', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.55, maxWidth: 700 }}>
            Tell us what is going on, choose the kind of help you want, and copy a ready-to-use prompt. No prompt-writing knowledge needed.
          </p>
        </header>

        <nav aria-label="Builder progress" style={{ display: "flex", gap: 4, padding: "18px 20px", background: C.white, borderBottom: `1px solid ${C.border}` }}>
          {STEPS.map((step, index) => (
            <PromptBuilderStepDot key={step.key} step={index} current={current} label={step.label} onClick={() => setCurrent(index)} />
          ))}
        </nav>

        <section style={{ padding: 28, background: C.white, borderBottom: `1px solid ${C.border}` }}>
          {current === 0 ? (
            <div style={{ display: "grid", gap: 18 }}>
              <div>
                <h3 style={{ margin: "0 0 6px", fontFamily: "'Outfit', sans-serif", fontSize: 20, color: C.navy }}>What is going on?</h3>
                <p style={{ margin: 0, fontFamily: "'Outfit', sans-serif", fontSize: 14, color: C.muted, lineHeight: 1.55 }}>
                  Write it in your own words. Messy is fine. The builder will turn it into the prompt.
                </p>
              </div>
              <PromptBuilderTextarea
                value={form.situation}
                onChange={(value) => updateField("situation", value)}
                placeholder="Example: I got a letter from my energy supplier and I do not understand whether I owe money or what I need to do next."
                rows={6}
                label="Describe your situation"
              />
              <div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: 2, color: C.muted, textTransform: "uppercase", fontWeight: 700, marginBottom: 10 }}>
                  Or start from an example
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
                  {STARTERS.map((starter) => (
                    <button key={starter.name} className="pb-btn" onClick={() => loadStarter(starter)} style={{ padding: "12px 14px", background: C.card, border: `1px dashed ${C.border}`, borderRadius: 8, cursor: "pointer", textAlign: "left", fontFamily: "'Outfit', sans-serif", fontSize: 13, color: C.navy, fontWeight: 600 }}>
                      {starter.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          {current === 1 ? (
            <div style={{ display: "grid", gap: 20 }}>
              <div>
                <h3 style={{ margin: "0 0 6px", fontFamily: "'Outfit', sans-serif", fontSize: 20, color: C.navy }}>What kind of help would be most useful?</h3>
                <p style={{ margin: 0, fontFamily: "'Outfit', sans-serif", fontSize: 14, color: C.muted, lineHeight: 1.55 }}>
                  Pick the closest match. If none fit, choose something else and describe it.
                </p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 10 }}>
                {HELP_TYPES.map((type) => {
                  const selected = form.helpType === type.id;
                  return (
                    <button key={type.id} className="pb-btn" onClick={() => updateField("helpType", type.id)} style={{ padding: "14px 16px", background: selected ? `${C.pink}20` : C.card, border: `2px solid ${selected ? C.pink : C.border}`, borderRadius: 10, cursor: "pointer", textAlign: "left" }}>
                      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: C.muted, marginBottom: 6 }}>{type.badge}</div>
                      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, fontWeight: 700, color: C.navy }}>{type.label}</div>
                    </button>
                  );
                })}
              </div>
              {form.helpType === "other" ? (
                <PromptBuilderTextarea
                  value={form.otherHelp}
                  onChange={(value) => updateField("otherHelp", value)}
                  placeholder="Example: Help me turn this into a clear message for my support worker."
                  rows={3}
                  label="What help do you want?"
                />
              ) : null}
              <div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: 2, color: C.muted, textTransform: "uppercase", fontWeight: 700, marginBottom: 10 }}>
                  Optional controls
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {STYLE_OPTIONS.map((option) => {
                    const selected = form.preferredHelp.includes(option.id);
                    return (
                      <button key={option.id} className="pb-btn" onClick={() => toggleStyle(option.id)} style={{ minHeight: 38, padding: "0 12px", borderRadius: 999, border: `1px solid ${selected ? C.pink : C.border}`, background: selected ? `${C.pink}20` : C.white, color: C.navy, fontFamily: "'Outfit', sans-serif", fontSize: 13, cursor: "pointer" }}>
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>
              <PromptBuilderTextarea
                value={form.extra}
                onChange={(value) => updateField("extra", value)}
                placeholder="Example: Mention the deadline clearly, or keep the tone warm because I am worried."
                rows={4}
                label="Anything else that matters?"
                hint="Optional. Add nuance, tone, details, or special instructions."
              />
            </div>
          ) : null}

          {current === 2 ? (
            <div>
              <h3 style={{ margin: "0 0 6px", fontFamily: "'Outfit', sans-serif", fontSize: 20, color: C.navy }}>Your prompt is ready</h3>
              <p style={{ margin: "0 0 20px", fontFamily: "'Outfit', sans-serif", fontSize: 14, color: C.muted, lineHeight: 1.55 }}>
                Copy it into ChatGPT or another AI tool. You can always come back and adjust the situation if the result needs refining.
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button className="pb-btn" onClick={copyPrompt} style={{ padding: "12px 20px", background: copied ? C.green : C.pink, color: C.navy, border: "none", borderRadius: 8, fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>
                  {copied ? "Copied" : "Copy Prompt"}
                </button>
                <button className="pb-btn" onClick={savePrompt} style={{ padding: "12px 20px", background: C.card, color: C.navy, border: `1px solid ${C.border}`, borderRadius: 8, fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>
                  {savedToast ? "Saved" : "Save Prompt"}
                </button>
                <button className="pb-btn" onClick={reset} style={{ padding: "12px 20px", background: "transparent", color: C.muted, border: `1px solid ${C.border}`, borderRadius: 8, fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>
                  Start Over
                </button>
              </div>
            </div>
          ) : null}
        </section>

        <section style={{ padding: "24px 28px", background: C.card, borderBottom: `1px solid ${C.border}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, gap: 8 }}>
            <h3 style={{ margin: 0, fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: 3, color: C.muted, textTransform: "uppercase" }}>Live Preview</h3>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: C.muted }}>{assembledPrompt.split(/\s+/).filter(Boolean).length} words</div>
          </div>
          <pre style={{ margin: 0, padding: "18px 20px", background: C.navy, color: "rgba(255,255,255,0.92)", borderRadius: 10, fontFamily: "'Space Mono', monospace", fontSize: 13, lineHeight: 1.65, whiteSpace: "pre-wrap", wordBreak: "break-word", maxHeight: 320, overflowY: "auto" }}>
            {assembledPrompt}
          </pre>
        </section>

        {saved.length > 0 ? (
          <section style={{ padding: "24px 28px", background: C.white, borderBottom: `1px solid ${C.border}` }}>
            <h3 style={{ margin: "0 0 12px", fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: 3, color: C.muted, textTransform: "uppercase" }}>
              Saved This Session ({saved.length})
            </h3>
            <div style={{ display: "grid", gap: 8 }}>
              {saved.map((item) => (
                <button key={item.id} className="pb-btn" onClick={() => loadSaved(item)} style={{ padding: "12px 16px", background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, cursor: "pointer", textAlign: "left", fontFamily: "'Outfit', sans-serif", fontSize: 14, color: C.navy }}>
                  {item.name}
                </button>
              ))}
            </div>
          </section>
        ) : null}

        <div style={{ padding: "20px 28px", background: C.white, display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
          <button className="pb-btn" onClick={() => setCurrent((step) => Math.max(0, step - 1))} disabled={current === 0} style={{ padding: "12px 20px", background: current === 0 ? "transparent" : C.card, color: current === 0 ? C.muted : C.navy, border: `1px solid ${C.border}`, borderRadius: 8, fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700, cursor: current === 0 ? "not-allowed" : "pointer", opacity: current === 0 ? 0.4 : 1 }}>
            Back
          </button>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: 2, color: C.muted, textTransform: "uppercase", alignSelf: "center" }}>
            Step {current + 1} of {STEPS.length}
          </div>
          <button className="pb-btn" onClick={() => setCurrent((step) => Math.min(STEPS.length - 1, step + 1))} disabled={isFinalStep} style={{ padding: "12px 20px", background: isFinalStep ? "transparent" : C.pink, color: isFinalStep ? C.muted : C.navy, border: isFinalStep ? `1px solid ${C.border}` : "none", borderRadius: 8, fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700, cursor: isFinalStep ? "not-allowed" : "pointer", opacity: isFinalStep ? 0.4 : 1 }}>
            Next
          </button>
        </div>
      </main>
    </div>
  );
}
