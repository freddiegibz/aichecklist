"use client";

import { useEffect, useMemo, useState } from "react";

type ChecklistItem = {
  title: string;
  description: string;
  tip?: string;
  prompt?: string;
};

type ChecklistSection = {
  label: string;
  title: string;
  titleAccent: string;
  intro: string;
  items: ChecklistItem[];
};

const checklistData: {
  label: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  intro: string;
  sections: ChecklistSection[];
} = {
  label: "AI CONFIDENCE CHECKLIST",
  title: "Use ChatGPT",
  titleAccent: "for the first time",
  subtitle:
    "A calm, step-by-step practice run for people who feel AI has moved faster than they have.",
  intro:
    "This guide walks you through opening ChatGPT, sending a safe first prompt, improving the answer, and trying one useful real-life task. You do not need technical knowledge. Just follow one step at a time.",
  sections: [
    {
      label: "START",
      title: "Get",
      titleAccent: "set up",
      intro:
        "First, get to a blank ChatGPT chat. These steps help you know whether you are in the right place.",
      items: [
        {
          title: "Open ChatGPT",
          description:
            "Go to chatgpt.com in your browser. If you already use the ChatGPT app, open the app instead.",
          tip:
            "You are looking for a page or app with a box where you can type a message.",
        },
        {
          title: "Create or sign in to your account",
          description:
            "Use your email, Google, Apple, or Microsoft account. Follow the steps on screen and keep your password somewhere safe.",
          tip:
            "If you already have an account, choose Log in instead of Sign up.",
        },
        {
          title: "Start a new chat",
          description:
            "Look for New chat. On a phone or tablet it may be inside a menu button.",
          tip:
            "A new empty conversation should open, ready for your first message.",
        },
      ],
    },
    {
      label: "FIRST PROMPT",
      title: "Send a",
      titleAccent: "safe first message",
      intro:
        "A prompt is just the message you type into ChatGPT. Start with this one so you are not staring at a blank box.",
      items: [
        {
          title: "Copy the beginner-safe prompt",
          description:
            "Copy this prompt, paste it into ChatGPT, then press Enter or tap the send button.",
          prompt:
            "Please explain what ChatGPT is in simple words. I am new to AI, so use plain language and give me one easy example.",
          tip:
            "This prompt tells ChatGPT your level, asks for plain language, and asks for an example.",
        },
        {
          title: "Read the answer slowly",
          description:
            "You do not have to understand everything at once. Look for the main idea first, then the example.",
          tip:
            "If the answer feels confusing, the next section shows exactly what to ask next.",
        },
      ],
    },
    {
      label: "IMPROVE",
      title: "Ask for",
      titleAccent: "a better answer",
      intro:
        "ChatGPT does not mind being corrected. If the answer is too long, too clever, or too vague, ask it to change the answer.",
      items: [
        {
          title: "Make the answer simpler",
          description:
            "Use this when the answer includes words you would not normally use.",
          prompt: "Make that simpler",
          tip:
            "Send this as a follow-up message in the same chat. You do not need to explain yourself.",
        },
        {
          title: "Make the answer shorter",
          description:
            "Use this when the answer is too long and you only want the main points.",
          prompt: "Make that shorter",
          tip:
            "This is useful when ChatGPT gives you too much information at once.",
        },
        {
          title: "Ask for an example",
          description:
            "Use this when you understand the idea but want to see what it looks like in real life.",
          prompt: "Give me an example",
          tip:
            "Examples often make AI easier to understand than explanations alone.",
        },
        {
          title: "Make it sound like you",
          description:
            "Use this when the reply is useful, but it sounds too polished, too formal, or not like something you would actually say.",
          prompt:
            "Make this sound natural, friendly, and like something I would actually say.",
          tip:
            "This is especially useful for emails, texts, replies, and messages where you want to still sound like yourself.",
        },
      ],
    },
    {
      label: "REAL LIFE",
      title: "Try one",
      titleAccent: "useful task",
      intro:
        "Now choose something practical. Pick the option closest to what you need today, then add your own details underneath the prompt.",
      items: [
        {
          title: "Writing a message",
          description:
            "Good for emails, texts, replies, complaints, thank-you notes, or asking for help.",
          prompt:
            "Help me write a clear, friendly message about this. Ask me one question first if you need more detail.",
        },
        {
          title: "Understanding a letter or document",
          description:
            "Good for official letters, confusing instructions, appointment notes, or forms.",
          prompt:
            "Explain this letter in plain English. Tell me what it means and what I may need to do next.",
        },
        {
          title: "Planning something",
          description:
            "Good for appointments, trips, phone calls, errands, meals, or getting started on a task.",
          prompt:
            "Help me make a simple step-by-step plan for this. Keep it realistic and easy to follow.",
        },
        {
          title: "Learning something",
          description:
            "Good for learning a new app, a new word, a news topic, or something a family member mentioned.",
          prompt:
            "Teach me the basics of this in simple words. Start with what I need to know first.",
        },
        {
          title: "Sorting out a problem",
          description:
            "Good for comparing choices, calming a messy situation, or deciding the next small step.",
          prompt:
            "Help me think through this problem calmly. Give me a few sensible options and the first small step.",
        },
      ],
    },
    {
      label: "SAFETY",
      title: "Check what",
      titleAccent: "not to share",
      intro:
        "Before pasting anything into ChatGPT, pause for ten seconds. AI can help, but some details should stay private.",
      items: [
        {
          title: "Do not paste passwords",
          description:
            "Never paste passwords, login codes, recovery codes, or security questions into ChatGPT.",
        },
        {
          title: "Do not paste bank or card details",
          description:
            "Do not paste card numbers, bank account numbers, sort codes, statements, or payment details.",
        },
        {
          title: "Be careful with medical or legal details",
          description:
            "You can ask for plain-English explanations, but remove names, addresses, dates of birth, reference numbers, and private details first.",
          prompt:
            "Can you explain this in plain English? I have removed private details.",
        },
      ],
    },
  ],
};

const storageKey = "ai-first-use-checklist-template-progress";
const totalItems = checklistData.sections.reduce(
  (sum, section) => sum + section.items.length,
  0
);

const reusablePrompts = [
  "Please explain what ChatGPT is in simple words. I am new to AI, so use plain language and give me one easy example.",
  "Make that simpler",
  "Make that shorter",
  "Give me an example",
  "Make this sound natural, friendly, and like something I would actually say.",
];

export default function AIFirstUseChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState("");
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (saved) {
      setChecked(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(checked));
  }, [checked]);

  const checkedCount = useMemo(
    () => Object.values(checked).filter(Boolean).length,
    [checked]
  );
  const progress = Math.round((checkedCount / totalItems) * 100);

  async function copyText(text: string, label: string) {
    await navigator.clipboard.writeText(text);
    setCopied(label);
    window.setTimeout(() => setCopied(""), 1800);
  }

  function toggle(sectionIndex: number, itemIndex: number) {
    const key = `${sectionIndex}-${itemIndex}`;
    setChecked((current) => ({ ...current, [key]: !current[key] }));
  }

  function resetChecklist() {
    setChecked({});
    setCopied("");
    setActiveSection(0);
  }

  const currentSection = checklistData.sections[activeSection];
  const currentSectionDone = currentSection.items.every((_, itemIndex) =>
    Boolean(checked[`${activeSection}-${itemIndex}`])
  );
  const isLastSection = activeSection === checklistData.sections.length - 1;

  return (
    <main>
      <section className="hero">
        <div className="heroInner">
          <p className="artifactLabel">{checklistData.label}</p>
          <h1>
            {checklistData.title}
            <span>{checklistData.titleAccent}</span>
          </h1>
          <p className="subtitle">{checklistData.subtitle}</p>
        </div>
      </section>

      <section className="intro">
        <p>{checklistData.intro}</p>
      </section>

      <section className="progressWrap" aria-label="Checklist progress">
        <div className="progressCard">
          <div className="progressHeader">
            <span>Your progress</span>
            <strong>
              {checkedCount} / {totalItems}
            </strong>
          </div>
          <div className="progressBg">
            <div className="progressFill" style={{ width: `${progress}%` }} />
          </div>
          <p>{progress}% complete</p>
        </div>
      </section>

      <section className="note">
        <p>
          <strong>How to use this:</strong> Read the step, do the action, then
          tick it off. If there is a prompt box, copy only the dark prompt area
          into ChatGPT.
        </p>
      </section>

      <nav className="stepNav" aria-label="Checklist steps">
        {checklistData.sections.map((section, sectionIndex) => {
          const isActive = sectionIndex === activeSection;
          const isDone = section.items.every((_, itemIndex) =>
            Boolean(checked[`${sectionIndex}-${itemIndex}`])
          );

          return (
            <button
              className={
                isActive ? "stepPill active" : isDone ? "stepPill done" : "stepPill"
              }
              key={section.label}
              onClick={() => setActiveSection(sectionIndex)}
            >
              <span>{sectionIndex + 1}</span>
              {section.label}
            </button>
          );
        })}
      </nav>

      <section className="sectionBlock">
        <div className="sectionCard">
          <div className="sectionHeader">
            <div className="sectionNumber">
              {String(activeSection + 1).padStart(2, "0")}
            </div>
            <div>
              <p className="sectionLabel">{currentSection.label}</p>
              <h2>
                {currentSection.title} <span>{currentSection.titleAccent}</span>
              </h2>
              <p className="sectionIntro">{currentSection.intro}</p>
            </div>
          </div>

          <div className="items">
            {currentSection.items.map((item, itemIndex) => {
              const key = `${activeSection}-${itemIndex}`;
              const isChecked = Boolean(checked[key]);
              const copyLabel = `${activeSection}-${itemIndex}-prompt`;

              return (
                <article className="item" key={item.title}>
                  <button
                    className={isChecked ? "checkCircle checked" : "checkCircle"}
                    onClick={() => toggle(activeSection, itemIndex)}
                    aria-label={
                      isChecked ? "Mark step as not done" : "Mark step as done"
                    }
                  >
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                      <path
                        d="M3 7.8L6.2 11L12 4"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  <div className="itemContent">
                    <h3 className={isChecked ? "done" : ""}>{item.title}</h3>
                    <p>{item.description}</p>

                    {item.prompt && (
                      <div className="promptBox">
                        <div className="copyPanel">
                          <span>Prompt to copy</span>
                          <p>{item.prompt}</p>
                        </div>
                        <button
                          className="copyButton"
                          onClick={() => copyText(item.prompt || "", copyLabel)}
                        >
                          {copied === copyLabel ? "Copied" : "Copy prompt"}
                        </button>
                        <p className="promptNote">
                          Paste this into ChatGPT. Add your own details below it
                          if the step is about your situation.
                        </p>
                      </div>
                    )}

                    {item.tip && (
                      <div className="tip">
                        <strong>What to look for:</strong> {item.tip}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          <div className="wizardControls">
            <button
              className="secondaryButton"
              onClick={() => setActiveSection((section) => Math.max(0, section - 1))}
              disabled={activeSection === 0}
            >
              Back
            </button>
            <div className="stepStatus">
              {currentSectionDone
                ? "This step is complete."
                : "Tick each item when you have done it."}
            </div>
            <button
              className="primaryButton"
              onClick={() =>
                setActiveSection((section) =>
                  Math.min(checklistData.sections.length - 1, section + 1)
                )
              }
              disabled={isLastSection}
            >
              {isLastSection ? "Final step" : "Next"}
            </button>
          </div>
        </div>
      </section>

      <section className="completion">
        <div className="completionInner">
          <p className="artifactLabel">FINISH</p>
          <h2>
            {checkedCount === totalItems
              ? "You have used AI properly once."
              : "Keep going one small step at a time."}
          </h2>
          <p>
            You are practising the useful habit: ask clearly, improve the reply,
            try a real task, and protect private information.
          </p>
          <div className="actions">
            <a href="/ai-confidence-guide.pdf">Back to the PDF</a>
            <a href="/book-setup-session">Book a 1:1 setup session</a>
            <button onClick={resetChecklist}>Reset checklist</button>
          </div>
        </div>
      </section>

      <section className="summary">
        <div className="summaryHeader">
          <p className="artifactLabel">KEEP THIS</p>
          <h2>
            Your <span>printable summary</span>
          </h2>
          <p>
            A simple reminder of what you practised, the prompts you can reuse,
            and the details to keep private.
          </p>
          <button onClick={() => window.print()}>Print this summary</button>
        </div>

        <div className="summaryGrid">
          <article>
            <h3>What you learned</h3>
            <ul>
              <li>How to open ChatGPT and start a new chat.</li>
              <li>How to send a clear first prompt.</li>
              <li>How to ask ChatGPT to make an answer simpler or shorter.</li>
              <li>How to use AI for one real-life task.</li>
              <li>How to pause before sharing private information.</li>
            </ul>
          </article>

          <article>
            <h3>5 prompts to reuse</h3>
            <ol>
              {reusablePrompts.map((prompt) => (
                <li key={prompt}>{prompt}</li>
              ))}
            </ol>
          </article>

          <article>
            <h3>Do not paste</h3>
            <ul>
              <li>Passwords, login codes, or recovery codes.</li>
              <li>Bank details, card numbers, or payment information.</li>
              <li>Full medical, legal, or official documents with private details.</li>
              <li>Names, addresses, dates of birth, or reference numbers.</li>
            </ul>
          </article>
        </div>
      </section>

      <style jsx>{`
        :global(*) {
          box-sizing: border-box;
        }

        :global(body) {
          margin: 0;
          background: #fbf7ef;
          color: #2d2a33;
          font-family: Arial, Helvetica, sans-serif;
        }

        .hero {
          background: #1f2430;
          color: #fbf7ef;
          padding: 52px 22px 66px;
          text-align: center;
        }

        .heroInner,
        .intro,
        .progressWrap,
        .note,
        .sectionBlock,
        .completion,
        .summary {
          width: min(100%, 720px);
          margin: 0 auto;
        }

        .artifactLabel,
        .sectionLabel {
          margin: 0 0 14px;
          color: #d78362;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        h1,
        h2,
        h3,
        p {
          margin-top: 0;
        }

        h1 {
          margin-bottom: 18px;
          font-size: clamp(42px, 11vw, 72px);
          line-height: 1.02;
          letter-spacing: 0;
        }

        h1 span {
          display: block;
          color: #e7ad79;
          font-style: italic;
        }

        .subtitle {
          max-width: 560px;
          margin: 0 auto;
          color: rgba(251, 247, 239, 0.78);
          font-size: 20px;
          line-height: 1.5;
        }

        .intro {
          padding: 34px 22px 0;
          text-align: center;
        }

        .intro p,
        .note p {
          color: #55505e;
          font-size: 18px;
          line-height: 1.7;
        }

        .progressWrap {
          padding: 30px 22px 0;
        }

        .progressCard {
          padding: 24px;
          border-radius: 14px;
          background: #1f2430;
          color: #fbf7ef;
        }

        .progressHeader {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 16px;
          font-size: 14px;
          font-weight: 800;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .progressHeader strong {
          color: #e7ad79;
        }

        .progressBg {
          height: 8px;
          overflow: hidden;
          border-radius: 999px;
          background: rgba(251, 247, 239, 0.14);
        }

        .progressFill {
          height: 100%;
          border-radius: 999px;
          background: #d78362;
          transition: width 260ms ease;
        }

        .progressCard p {
          margin: 12px 0 0;
          color: rgba(251, 247, 239, 0.72);
          font-size: 16px;
        }

        .note {
          padding: 24px 22px 0;
        }

        .note p {
          padding: 18px;
          border-left: 4px solid #d78362;
          border-radius: 0 8px 8px 0;
          background: rgba(215, 131, 98, 0.08);
        }

        .stepNav {
          display: flex;
          width: min(100%, 720px);
          gap: 10px;
          margin: 28px auto 0;
          padding: 0 22px 4px;
          overflow-x: auto;
          scrollbar-width: thin;
        }

        .stepPill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          min-height: 44px;
          padding: 0 14px;
          border: 1px solid rgba(45, 42, 51, 0.12);
          border-radius: 999px;
          background: #fffdf8;
          color: #625c69;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.6px;
          text-transform: uppercase;
          white-space: nowrap;
          cursor: pointer;
        }

        .stepPill span {
          display: grid;
          width: 24px;
          height: 24px;
          place-items: center;
          border-radius: 50%;
          background: rgba(45, 42, 51, 0.08);
          color: #625c69;
        }

        .stepPill.active {
          border-color: #b45f42;
          background: #1f2430;
          color: #fbf7ef;
        }

        .stepPill.active span,
        .stepPill.done span {
          background: #b45f42;
          color: #fff;
        }

        .stepPill.done {
          border-color: rgba(180, 95, 66, 0.35);
          color: #b45f42;
        }

        .sectionBlock {
          padding: 28px 22px 0;
        }

        .sectionCard {
          padding: 24px 20px;
          border: 1px solid rgba(45, 42, 51, 0.1);
          border-radius: 14px;
          background: rgba(255, 253, 248, 0.72);
        }

        .sectionHeader {
          display: grid;
          grid-template-columns: 44px 1fr;
          gap: 16px;
          align-items: start;
          margin-bottom: 18px;
        }

        .sectionNumber {
          display: grid;
          width: 44px;
          height: 44px;
          place-items: center;
          border-radius: 50%;
          background: rgba(215, 131, 98, 0.14);
          color: #b45f42;
          font-size: 14px;
          font-weight: 800;
        }

        h2 {
          margin-bottom: 10px;
          font-size: clamp(28px, 7vw, 40px);
          line-height: 1.12;
          letter-spacing: 0;
        }

        h2 span {
          color: #b45f42;
          font-style: italic;
        }

        .sectionIntro {
          margin-bottom: 0;
          color: #625c69;
          font-size: 18px;
          line-height: 1.6;
        }

        .items {
          display: grid;
          gap: 0;
        }

        .item {
          display: grid;
          grid-template-columns: 34px 1fr;
          gap: 16px;
          padding: 22px 0;
          border-bottom: 1px solid rgba(45, 42, 51, 0.1);
        }

        .checkCircle {
          display: grid;
          width: 30px;
          height: 30px;
          place-items: center;
          margin-top: 2px;
          border: 2px solid #c7bdb0;
          border-radius: 50%;
          background: transparent;
          color: transparent;
          cursor: pointer;
        }

        .checkCircle.checked {
          border-color: #b45f42;
          background: #b45f42;
          color: #fff;
        }

        .itemContent h3 {
          margin-bottom: 8px;
          font-size: 21px;
          line-height: 1.3;
          letter-spacing: 0;
        }

        .itemContent h3.done {
          color: #908797;
          text-decoration: line-through;
        }

        .itemContent > p {
          margin-bottom: 0;
          color: #625c69;
          font-size: 17px;
          line-height: 1.65;
        }

        .promptBox {
          display: grid;
          gap: 14px;
          margin-top: 16px;
          padding: 16px;
          border: 1px solid rgba(45, 42, 51, 0.1);
          border-radius: 10px;
          background: #fffdf8;
        }

        .copyPanel {
          padding: 16px;
          border-radius: 8px;
          background: #1f2430;
          color: #fbf7ef;
        }

        .copyPanel span {
          display: block;
          margin-bottom: 10px;
          color: #e7ad79;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 1.4px;
          text-transform: uppercase;
        }

        .copyPanel p {
          margin: 0;
          font-size: 18px;
          line-height: 1.55;
        }

        .copyButton,
        .actions a,
        .actions button {
          min-height: 50px;
          border: 0;
          border-radius: 8px;
          background: #b45f42;
          color: #fff;
          font-size: 17px;
          font-weight: 800;
          cursor: pointer;
          text-decoration: none;
        }

        .copyButton {
          padding: 0 18px;
        }

        .promptNote {
          margin: 0;
          color: #625c69;
          font-size: 16px;
          line-height: 1.5;
        }

        .tip {
          margin-top: 14px;
          padding: 14px 16px;
          border-left: 4px solid #7a8b73;
          border-radius: 0 8px 8px 0;
          background: rgba(122, 139, 115, 0.1);
          color: #4f594b;
          font-size: 16px;
          line-height: 1.55;
        }

        .wizardControls {
          display: grid;
          gap: 12px;
          margin-top: 24px;
          padding-top: 20px;
          border-top: 1px solid rgba(45, 42, 51, 0.1);
        }

        .primaryButton,
        .secondaryButton {
          min-height: 52px;
          border-radius: 8px;
          font-size: 17px;
          font-weight: 800;
          cursor: pointer;
        }

        .primaryButton {
          border: 0;
          background: #b45f42;
          color: #fff;
        }

        .secondaryButton {
          border: 1px solid rgba(45, 42, 51, 0.16);
          background: #fffdf8;
          color: #2d2a33;
        }

        .primaryButton:disabled,
        .secondaryButton:disabled {
          cursor: not-allowed;
          opacity: 0.45;
        }

        .stepStatus {
          display: grid;
          min-height: 44px;
          place-items: center;
          color: #625c69;
          font-size: 15px;
          text-align: center;
        }

        .completion {
          padding: 54px 22px 70px;
        }

        .completionInner {
          padding: 36px 24px;
          border-radius: 16px;
          background: #1f2430;
          color: #fbf7ef;
          text-align: center;
        }

        .completion h2 {
          color: #fbf7ef;
        }

        .completion h2 span {
          color: #e7ad79;
        }

        .completion p:not(.artifactLabel) {
          max-width: 540px;
          margin: 0 auto;
          color: rgba(251, 247, 239, 0.76);
          font-size: 18px;
          line-height: 1.6;
        }

        .actions {
          display: grid;
          gap: 12px;
          margin-top: 24px;
        }

        .actions a,
        .actions button {
          display: grid;
          place-items: center;
          padding: 0 18px;
        }

        .actions a:nth-child(2) {
          background: #fbf7ef;
          color: #1f2430;
        }

        .actions button {
          border: 1px solid rgba(251, 247, 239, 0.25);
          background: transparent;
          color: #fbf7ef;
        }

        .summary {
          padding: 0 22px 74px;
        }

        .summaryHeader {
          padding: 28px 0 22px;
          text-align: center;
        }

        .summaryHeader h2 {
          margin-bottom: 10px;
        }

        .summaryHeader p:not(.artifactLabel) {
          max-width: 560px;
          margin: 0 auto 18px;
          color: #625c69;
          font-size: 17px;
          line-height: 1.6;
        }

        .summaryHeader button {
          min-height: 50px;
          padding: 0 22px;
          border: 0;
          border-radius: 8px;
          background: #1f2430;
          color: #fbf7ef;
          font-size: 17px;
          font-weight: 800;
          cursor: pointer;
        }

        .summaryGrid {
          display: grid;
          gap: 14px;
        }

        .summaryGrid article {
          padding: 20px;
          border: 1px solid rgba(45, 42, 51, 0.1);
          border-radius: 12px;
          background: #fffdf8;
        }

        .summaryGrid h3 {
          margin-bottom: 12px;
          font-size: 22px;
          line-height: 1.25;
        }

        .summaryGrid ul,
        .summaryGrid ol {
          display: grid;
          gap: 10px;
          margin: 0;
          padding-left: 22px;
          color: #625c69;
          font-size: 16px;
          line-height: 1.5;
        }

        @media print {
          .hero,
          .intro,
          .progressWrap,
          .note,
          .stepNav,
          .sectionBlock,
          .completion,
          .summaryHeader button {
            display: none;
          }

          :global(body) {
            background: #fff;
            color: #111;
          }

          .summary {
            width: 100%;
            padding: 0;
          }

          .summaryHeader {
            text-align: left;
          }

          .summaryGrid article {
            break-inside: avoid;
            border-color: #ccc;
          }
        }

        @media (min-width: 680px) {
          .hero {
            padding-top: 68px;
          }

          .promptBox {
            grid-template-columns: 1fr 170px;
            align-items: center;
          }

          .promptNote {
            grid-column: 1 / -1;
          }

          .actions {
            grid-template-columns: repeat(3, 1fr);
          }

          .wizardControls {
            grid-template-columns: 130px 1fr 130px;
            align-items: center;
          }
        }
      `}</style>
    </main>
  );
}
