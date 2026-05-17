import { useState } from "react";

const milestones = [
  { title: "Open AI Once", desc: "Open ChatGPT and send one very simple message so the blank box stops feeling unfamiliar.", reward: "You have crossed the hardest first line: AI is no longer something you only think about using.", altitude: "Day 1", num: "01" },
  { title: "Ask For Plain English", desc: "Use AI to explain one confusing sentence, letter, or message in words you would actually use.", reward: "You have seen the first real use: AI can make confusing things easier to understand.", altitude: "Day 2", num: "02" },
  { title: "Rewrite A Message", desc: "Take one awkward text or email and ask AI to make it clearer, warmer, or more polite.", reward: "You now know AI can help you say things without overthinking every word.", altitude: "Day 3", num: "03" },
  { title: "Use A Prompt From The Pack", desc: "Choose one ready-made prompt from the Prompt Pack and use it for a real situation today.", reward: "You have moved from experimenting with AI to using a tool that solves a moment.", altitude: "Day 4", num: "04" },
  { title: "Ask For Next Steps", desc: "Give AI a small messy problem and ask it to turn the situation into a short action list.", reward: "You have learned to turn uncertainty into movement instead of sitting inside it.", altitude: "Day 5", num: "05" },
  { title: "Compare Two Options", desc: "Use AI to compare two choices you are considering, including pros, cons, and what you still need to know.", reward: "You have seen that AI is useful for thinking, not just writing.", altitude: "Day 6", num: "06" },
  { title: "Check A Risk", desc: "Ask AI to help you spot red flags in a message, offer, or decision while remembering to verify important facts yourself.", reward: "You have started using AI as a second pair of eyes, not a replacement for judgment.", altitude: "Day 7", num: "07" },
  { title: "Improve A Bad Answer", desc: "Take one weak AI answer and ask a better follow-up so the result becomes more useful.", reward: "You have learned the hidden skill: good AI use is often one more question, not one perfect prompt.", altitude: "Day 8", num: "08" },
  { title: "Add Your Context", desc: "Give AI more background about your situation and notice how much better the answer becomes.", reward: "You now know that context is one of the main levers that makes AI feel intelligent.", altitude: "Day 9", num: "09" },
  { title: "Use AI For Admin", desc: "Ask AI to help organise one small life-admin task such as a checklist, packing list, phone call notes, or appointment prep.", reward: "You have used AI to reduce friction in ordinary life, where the gains compound quietly.", altitude: "Day 10", num: "10" },
  { title: "Create Your Own Prompt", desc: "Use the Custom Prompt Builder or write your own request for a situation that is not already in the pack.", reward: "You are no longer limited to the examples. You can now create a useful starting point for new situations.", altitude: "Day 11", num: "11" },
  { title: "Ask For A Safer Version", desc: "Take a question that includes personal information and ask AI to help you make it safer before you share it.", reward: "You have built a healthy instinct: useful does not mean careless.", altitude: "Day 12", num: "12" },
  { title: "Make AI Part Of A Routine", desc: "Choose one repeated moment where AI could help you each week and decide when you will use it.", reward: "You have shifted from occasional novelty to a repeatable personal system.", altitude: "Day 13", num: "13" },
  { title: "Finish With Confidence", desc: "Look back at what you have used AI for, choose your three most useful prompts, and save them for reuse.", reward: "You are not behind anymore. You have a practical way to use AI in your own life.", altitude: "Summit", num: "14" },
];

const campPositions = [
  { x: 120, y: 420, labelSide: "left" },
  { x: 165, y: 395, labelSide: "right" },
  { x: 210, y: 370, labelSide: "left" },
  { x: 250, y: 340, labelSide: "right" },
  { x: 285, y: 310, labelSide: "left" },
  { x: 320, y: 280, labelSide: "right" },
  { x: 350, y: 250, labelSide: "left" },
  { x: 375, y: 220, labelSide: "right" },
  { x: 350, y: 190, labelSide: "left" },
  { x: 380, y: 160, labelSide: "right" },
  { x: 350, y: 130, labelSide: "left" },
  { x: 385, y: 105, labelSide: "right" },
  { x: 365, y: 82, labelSide: "left" },
  { x: 370, y: 60, labelSide: "right" },
];

export default function MilestoneTracker() {
  const [reached, setReached] = useState({});
  const [selected, setSelected] = useState(0);

  const toggleReached = (i) => {
    setReached(p => ({ ...p, [i]: !p[i] }));
    setSelected(i);
  };

  const selectCamp = (i) => setSelected(i);

  const doneCount = milestones.filter((_, i) => reached[i]).length;
  const progress = doneCount / milestones.length;
  const highestReached = (() => {
    for (let i = milestones.length - 1; i >= 0; i--) { if (reached[i]) return i; }
    return -1;
  })();

  const selectedMs = milestones[selected];

  const trailPath = campPositions.reduce((path, pos, i) => {
    if (i === 0) return `M${pos.x},${pos.y}`;
    const prev = campPositions[i - 1];
    const cpx = (prev.x + pos.x) / 2 + (i % 2 === 0 ? -30 : 30);
    const cpy = (prev.y + pos.y) / 2;
    return `${path} Q${cpx},${cpy} ${pos.x},${pos.y}`;
  }, "");

  const PaperScraps = () => (
    <>
      {/* Top right - large note with lines */}
      <svg style={{ position: "fixed", top: 80, right: 20, width: 180, height: 200, opacity: 0.15, transform: "rotate(12deg)", pointerEvents: "none", zIndex: 0 }} viewBox="0 0 180 200">
        <path d="M10,5 Q30,0 50,8 Q70,2 90,6 Q110,0 130,5 Q150,2 170,8 L175,10 Q172,40 175,70 Q170,100 175,130 Q172,160 175,190 L170,195 Q150,192 130,198 Q110,195 90,192 Q70,198 50,195 Q30,192 10,198 L5,190 Q8,160 5,130 Q8,100 5,70 Q8,40 5,10 Z" fill="#e8e0d4"/>
        <line x1="30" y1="50" x2="150" y2="50" stroke="#d4cbbe" strokeWidth="0.8"/>
        <line x1="30" y1="70" x2="150" y2="70" stroke="#d4cbbe" strokeWidth="0.8"/>
        <line x1="30" y1="90" x2="120" y2="90" stroke="#d4cbbe" strokeWidth="0.8"/>
        <line x1="30" y1="110" x2="140" y2="110" stroke="#d4cbbe" strokeWidth="0.8"/>
      </svg>
      {/* Left side */}
      <svg style={{ position: "fixed", top: "45%", left: 10, width: 140, height: 160, opacity: 0.12, transform: "rotate(-8deg)", pointerEvents: "none", zIndex: 0 }} viewBox="0 0 140 160">
        <path d="M8,3 Q30,0 60,5 Q90,0 120,4 Q135,6 137,10 Q134,50 137,90 Q134,130 137,155 Q120,158 90,155 Q60,160 30,156 Q10,154 7,150 Q10,110 7,70 Q10,30 7,10 Z" fill="#ede5d8"/>
      </svg>
      {/* Bottom right */}
      <svg style={{ position: "fixed", bottom: "20%", right: 30, width: 130, height: 150, opacity: 0.13, transform: "rotate(18deg)", pointerEvents: "none", zIndex: 0 }} viewBox="0 0 120 140">
        <path d="M5,5 Q25,0 50,6 Q75,0 100,5 Q115,8 117,12 Q114,45 117,80 Q114,110 117,135 Q100,138 75,135 Q50,140 25,136 Q8,133 5,128 Q8,95 5,60 Q8,25 5,10 Z" fill="#e0d8cc"/>
        <line x1="20" y1="40" x2="100" y2="40" stroke="#d4cbbe" strokeWidth="0.6"/>
        <line x1="20" y1="58" x2="100" y2="58" stroke="#d4cbbe" strokeWidth="0.6"/>
      </svg>
      {/* Top left - small */}
      <svg style={{ position: "fixed", top: 200, left: 30, width: 100, height: 110, opacity: 0.1, transform: "rotate(-15deg)", pointerEvents: "none", zIndex: 0 }} viewBox="0 0 100 110">
        <path d="M5,5 Q20,0 40,6 Q60,0 80,5 Q95,8 97,12 Q94,35 97,60 Q94,85 97,105 Q80,108 60,105 Q40,110 20,106 Q8,103 5,98 Q8,75 5,50 Q8,25 5,10 Z" fill="#e8e2d6"/>
      </svg>
      {/* Mid right small */}
      <svg style={{ position: "fixed", top: "65%", right: 50, width: 90, height: 100, opacity: 0.1, transform: "rotate(25deg)", pointerEvents: "none", zIndex: 0 }} viewBox="0 0 90 100">
        <path d="M5,5 Q20,0 45,6 Q70,0 85,5 L88,10 Q85,35 88,60 Q85,85 88,95 Q70,98 45,95 Q20,100 5,96 L3,90 Q6,65 3,40 Q6,15 3,10 Z" fill="#e4dcd0"/>
      </svg>
    </>
  );

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#faf6f1", backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='400' height='400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")", minHeight: "100vh", color: "#2d2a33", position: "relative" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700;1,800&family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&family=Space+Mono:wght@400;700&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}

        .hdr{background:linear-gradient(180deg,#1e1b2e,#2a2540);padding:48px 24px 20px;text-align:center;position:relative;overflow:hidden;z-index:2}
        .hdr::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% 0%,rgba(232,132,92,0.06) 0%,transparent 60%);pointer-events:none}
        .hdr-label{font-family:'Space Mono',monospace;font-size:11px;letter-spacing:5px;text-transform:uppercase;color:#e8845c;margin-bottom:16px;position:relative}
        .hdr-title{font-family:'Playfair Display',serif;font-weight:800;font-size:clamp(28px,5.5vw,48px);color:#faf6f1;line-height:1.1;position:relative}
        .hdr-accent{font-style:italic;color:#e8845c;display:block}
        .hdr-sub{font-family:'Playfair Display',serif;font-style:italic;font-size:clamp(14px,2vw,17px);color:rgba(250,246,241,0.45);margin-top:14px;max-width:460px;margin-left:auto;margin-right:auto;line-height:1.5;position:relative}

        .mtn-container{max-width:760px;margin:0 auto;padding:0 16px;position:relative;z-index:2}
        .mtn-card{background:transparent;border-radius:20px;padding:20px 0 0;overflow:hidden;margin-top:32px;position:relative}
        .mtn-card::before{content:'';position:absolute;inset:0;background:
          repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(200,190,175,0.08) 28px, rgba(200,190,175,0.08) 29px),
          repeating-linear-gradient(90deg, transparent, transparent 28px, rgba(200,190,175,0.06) 28px, rgba(200,190,175,0.06) 29px);
          pointer-events:none;z-index:0;border-radius:20px}
        .mtn-card::after{content:'';position:absolute;inset:0;background:
          url("data:image/svg+xml,%3Csvg width='300' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events:none;z-index:0;border-radius:20px;opacity:0.6}
        .mtn-svg{width:100%;display:block;position:relative;z-index:1}

        .camp-group{cursor:pointer}

        .detail-area{max-width:660px;margin:0 auto;padding:0 24px;position:relative;z-index:2}

        .detail-card{margin-top:28px;background:#fff;border-radius:16px;padding:28px 24px;border:1px solid rgba(45,42,51,0.06);position:relative;overflow:hidden}
        .detail-card.is-reached{border-left:4px solid #4caf80}
        .detail-card.not-reached{border-left:4px solid #e8845c}

        .detail-top{display:flex;align-items:center;gap:12px;margin-bottom:14px}
        .detail-num-circle{width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Space Mono',monospace;font-size:13px;font-weight:700;flex-shrink:0}
        .detail-num-circle.pending{background:rgba(232,132,92,0.12);color:#e8845c}
        .detail-num-circle.done{background:#4caf80;color:#fff}
        .detail-meta{display:flex;flex-direction:column}
        .detail-milestone-label{font-family:'Space Mono',monospace;font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#9b95a5}
        .detail-altitude{font-family:'Space Mono',monospace;font-size:9px;letter-spacing:1px;color:#e8845c;margin-top:1px}

        .detail-title{font-family:'Playfair Display',serif;font-weight:800;font-size:clamp(20px,3vw,24px);color:#2d2a33;line-height:1.25;margin-bottom:8px}
        .detail-card.is-reached .detail-title{color:#3a8f5c}
        .detail-desc{font-size:14.5px;line-height:1.7;color:#5a5565}

        .reward{margin-top:16px;padding:16px 18px;background:rgba(76,175,128,0.06);border:1px solid rgba(76,175,128,0.12);border-radius:12px;animation:slideIn .4s ease}
        @keyframes slideIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        .reward-label{font-family:'Space Mono',monospace;font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#3a8f5c;font-weight:700;margin-bottom:6px}
        .reward-text{font-size:14px;line-height:1.6;color:#3a8f5c}

        .detail-btn{margin-top:16px;font-family:'Space Mono',monospace;font-size:11px;letter-spacing:1px;font-weight:700;padding:12px 24px;border-radius:50px;border:none;cursor:pointer;transition:all .2s}
        .detail-btn.mark{color:#e8845c;background:rgba(232,132,92,0.1)}
        .detail-btn.mark:hover{background:rgba(232,132,92,0.18)}
        .detail-btn.reached{color:#fff;background:#4caf80}

        .nav-dots{display:flex;justify-content:center;gap:6px;margin-top:20px}
        .nav-dot{width:8px;height:8px;border-radius:50%;border:none;cursor:pointer;transition:all .2s;padding:0}
        .nav-dot.off{background:rgba(45,42,51,0.12)}
        .nav-dot.on{background:#4caf80}
        .nav-dot.active{background:#e8845c;width:24px;border-radius:4px}

        .nav-arrows{display:flex;justify-content:space-between;align-items:center;margin-top:16px}
        .nav-arrow{font-family:'DM Sans',sans-serif;font-weight:700;font-size:13px;border:none;cursor:pointer;transition:all .15s;padding:10px 20px;border-radius:50px;display:flex;align-items:center;gap:6px}
        .nav-arrow.prev{background:rgba(45,42,51,0.06);color:#6b6575}
        .nav-arrow.prev:hover{background:rgba(45,42,51,0.1)}
        .nav-arrow.next{background:#e8845c;color:#fff}
        .nav-arrow.next:hover{background:#d4743f}
        .nav-arrow:disabled{opacity:.3;cursor:default}

        .what-card{border-left:3px solid #e8845c;padding:18px 22px;background:rgba(232,132,92,0.04);border-radius:0 12px 12px 0;margin-top:32px}
        .what-label{font-family:'Space Mono',monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#e8845c;font-weight:700;display:inline}
        .what-text{display:inline;font-size:14.5px;line-height:1.7;color:#5a5565}

        .prog{margin-top:32px}
        .prog-card{background:linear-gradient(135deg,#2a2540,#1e1b2e);border-radius:16px;padding:24px 28px}
        .prog-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px}
        .prog-label{font-family:'Space Mono',monospace;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:rgba(250,246,241,0.5)}
        .prog-count{font-family:'Space Mono',monospace;font-size:14px;font-weight:700;color:#e8845c}
        .prog-bg{width:100%;height:6px;background:rgba(250,246,241,0.1);border-radius:3px;overflow:hidden}
        .prog-fill{height:100%;border-radius:3px;transition:width .6s cubic-bezier(.34,1.56,.64,1);background:linear-gradient(90deg,#e8845c,#4caf80)}

        .cta-btn{display:inline-flex;align-items:center;gap:8px;background:#e8845c;color:#fff;font-family:'DM Sans',sans-serif;font-weight:700;font-size:15px;padding:14px 32px;border-radius:50px;border:none;cursor:pointer;transition:all .25s;text-decoration:none}
        .cta-btn:hover{background:#d4743f;transform:translateY(-2px);box-shadow:0 8px 24px rgba(232,132,92,0.3)}

        .bottom-section{background:linear-gradient(180deg,#1e1b2e,#1a1730);padding:60px 24px 48px;text-align:center;margin-top:48px;position:relative;z-index:2}
        .bottom-title{font-family:'Playfair Display',serif;font-weight:700;font-size:clamp(22px,4vw,32px);color:#faf6f1;margin-bottom:14px;max-width:500px;margin-left:auto;margin-right:auto;line-height:1.25}
        .bottom-title em{font-style:italic;color:#e8845c}
        .bottom-text{font-size:15px;line-height:1.7;color:rgba(250,246,241,0.5);max-width:460px;margin:0 auto}
        .bottom-btn{display:inline-flex;align-items:center;gap:8px;background:#e8845c;color:#fff;font-family:'DM Sans',sans-serif;font-weight:700;font-size:16px;padding:18px 42px;border-radius:50px;border:none;cursor:pointer;margin-top:28px;transition:all .25s;text-decoration:none;box-shadow:0 6px 24px rgba(232,132,92,0.3)}
        .bottom-btn:hover{background:#d4743f;transform:translateY(-2px);box-shadow:0 10px 32px rgba(232,132,92,0.45)}
        .bottom-divider{width:200px;height:1px;background:rgba(250,246,241,0.08);margin:48px auto 36px}
        .bottom-brand{font-family:'Playfair Display',serif;font-weight:700;font-size:16px;color:rgba(250,246,241,0.6);margin-bottom:6px}
        .bottom-details{font-size:12px;color:rgba(250,246,241,0.25);margin-bottom:6px}
        .bottom-links{font-size:12px;color:rgba(250,246,241,0.2)}
        .bottom-links a{color:rgba(250,246,241,0.25);text-decoration:none}
        .bottom-links a:hover{color:#e8845c}

        @media(max-width:520px){
          .hdr{padding:36px 20px 16px}
          .detail-area{padding:0 16px}
          .detail-card{padding:22px 18px}
          .nav-arrow{padding:8px 14px;font-size:12px}
        }
      `}</style>

      {/* Ripped paper decorations */}
      <PaperScraps />

      {/* Header */}
      <div className="hdr">
        <div className="hdr-label">AI CONFIDENCE KIT</div>
        <div className="hdr-title">Your 14-Day<span className="hdr-accent">AI Confidence Climb</span></div>
        <div className="hdr-sub">A simple daily path from "I do not know what to ask" to using AI in ordinary life with confidence.</div>
      </div>

      {/* Mountain */}
      <div className="mtn-container">
        <div className="mtn-card">
          <svg viewBox="0 0 560 460" className="mtn-svg">
            <defs>
              <linearGradient id="greenFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#348040"/>
                <stop offset="100%" stopColor="#2a6a35"/>
              </linearGradient>
              <clipPath id="greenClip">
                <rect x="0" y={460 - progress * 400} width="560" height={progress * 400} style={{ transition: "all 0.7s ease" }}/>
              </clipPath>
            </defs>

            {/* Distant range */}
            <path d="M0,360 L60,310 L120,335 L200,280 L280,315 L360,270 L440,300 L520,260 L560,285 L560,460 L0,460 Z" fill="rgba(45,42,51,0.04)"/>

            {/* Main mountain */}
            <path d="M60,450 L200,190 L370,50 L490,190 L560,450 Z" fill="#c8bfb0"/>
            <path d="M100,450 L220,210 L370,70 L470,210 L520,450 Z" fill="#d6cdc0"/>

            {/* Green fill */}
            <g clipPath="url(#greenClip)">
              <path d="M60,450 L200,190 L370,50 L490,190 L560,450 Z" fill="#3a8a45" opacity="0.45"/>
              <path d="M100,450 L220,210 L370,70 L470,210 L520,450 Z" fill="url(#greenFill)" opacity="0.55"/>
            </g>

            {/* Side mountains */}
            <path d="M0,450 L0,340 L60,290 L130,340 L130,450 Z" fill="#bab0a0"/>
            <path d="M430,450 L490,320 L560,355 L560,450 Z" fill="#bab0a0"/>

            {/* Snow caps */}
            <path d="M348,90 L370,50 L392,90 Q382,78 370,82 Q358,78 348,90 Z" fill="rgba(250,246,241,0.85)"/>
            <path d="M182,215 L200,190 L218,215 Q210,205 200,208 Q190,205 182,215 Z" fill="rgba(250,246,241,0.5)"/>

            {/* Trail dashed */}
            <path d={trailPath} fill="none" stroke="rgba(45,42,51,0.15)" strokeWidth="2.5" strokeDasharray="6 5" strokeLinecap="round"/>

            {/* Trail filled */}
            {highestReached >= 0 && (
              <path d={trailPath} fill="none" stroke="#4caf80" strokeWidth="3.5" strokeLinecap="round" opacity="0.85" style={{ transition: "all 0.5s" }}
                strokeDasharray={(() => {
                  const totalLength = 600;
                  const filledLength = ((highestReached + 1) / milestones.length) * totalLength;
                  return `${filledLength} ${totalLength}`;
                })()}
              />
            )}

            {/* Ground */}
            <path d="M0,442 Q140,430 280,440 Q420,450 560,435 L560,460 L0,460 Z" fill={`rgba(50,120,55,${0.08 + progress * 0.25})`} style={{ transition: "fill 0.5s" }}/>

            {/* Trees */}
            {[{x:80,y:432},{x:130,y:425},{x:460,y:428},{x:500,y:436},{x:50,y:440},{x:520,y:430}].map((t,i) => (
              <g key={i} opacity={i < Math.ceil(progress * 6) ? 0.9 : 0.12} style={{ transition: "opacity 0.5s" }}>
                <rect x={t.x-1} y={t.y} width="2" height="8" fill="#5a3a2a"/>
                <path d={`M${t.x-5},${t.y} L${t.x},${t.y-11} L${t.x+5},${t.y} Z`} fill={i < Math.ceil(progress * 6) ? "rgba(50,130,60,0.8)" : "rgba(150,140,130,0.25)"}/>
              </g>
            ))}

            {/* Camp markers with readable labels */}
            {campPositions.map((pos, i) => {
              const isReached = reached[i];
              const isSelected = selected === i;
              const isNext = !isReached && (i === 0 || reached[i - 1]);
              const onLeft = pos.labelSide === "left";
              const labelX = onLeft ? pos.x - 22 : pos.x + 22;
              const labelAnchor = onLeft ? "end" : "start";
              return (
                <g key={i} className="camp-group" onClick={() => selectCamp(i)}>
                  {/* Selection ring */}
                  {isSelected && (
                    <circle cx={pos.x} cy={pos.y} r="22" fill="none" stroke={isReached ? "#4caf80" : "#e8845c"} strokeWidth="2" opacity="0.6">
                      <animate attributeName="r" values="22;26;22" dur="2s" repeatCount="indefinite"/>
                      <animate attributeName="opacity" values="0.6;0.25;0.6" dur="2s" repeatCount="indefinite"/>
                    </circle>
                  )}
                  {/* Camp dot */}
                  <circle cx={pos.x} cy={pos.y} r="15" fill={isReached ? "#4caf80" : isNext ? "#e8845c" : "#fff"} stroke={isReached ? "#3a8f5c" : isNext ? "#d4743f" : "rgba(45,42,51,0.12)"} strokeWidth="2.5" style={{ transition: "all 0.3s" }}/>
                  {/* Number */}
                  <text x={pos.x} y={pos.y + 5} textAnchor="middle" fontSize="11" fontFamily="'Space Mono',monospace" fontWeight="700" fill={isReached || isNext ? "#fff" : "#9b95a5"} style={{ pointerEvents: "none" }}>
                    {isReached ? "✓" : milestones[i].num}
                  </text>
                  {/* Label with background pill */}
                  <rect x={onLeft ? labelX - (milestones[i].title.length * 5.5 + 12) : labelX - 6} y={pos.y - 10} width={milestones[i].title.length * 5.5 + 16} height="20" rx="10" fill={isSelected ? "rgba(45,42,51,0.75)" : "rgba(45,42,51,0.5)"} style={{ transition: "fill 0.2s" }}/>
                  <text x={onLeft ? labelX - 6 : labelX + 2} y={pos.y + 3} textAnchor={labelAnchor} fontSize="9" fontFamily="'DM Sans',sans-serif" fontWeight="700" fill="#faf6f1" letterSpacing="0.3" style={{ pointerEvents: "none" }}>
                    {milestones[i].title}
                  </text>
                </g>
              );
            })}

            {/* Summit flag */}
            <g opacity={progress >= 1 ? 1 : 0.3} style={{ transition: "opacity 0.5s" }}>
              <line x1="370" y1="50" x2="370" y2="28" stroke={progress >= 1 ? "#e8845c" : "#9b95a5"} strokeWidth="2" strokeLinecap="round"/>
              <path d="M370,28 L388,34 L370,40" fill={progress >= 1 ? "#e8845c" : "rgba(155,149,165,0.4)"}/>
            </g>
          </svg>
        </div>
      </div>

      {/* Progress bar right below mountain */}
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "16px 16px 0" }}>
        <div className="prog-card">
          <div className="prog-top">
            <span className="prog-label">YOUR PROGRESS</span>
            <span className="prog-count">{doneCount} / {milestones.length}</span>
          </div>
          <div className="prog-bg">
            <div className="prog-fill" style={{ width: `${progress * 100}%` }}/>
          </div>
        </div>
      </div>

      {/* Detail card */}
      <div className="detail-area">
        <div className={`detail-card ${reached[selected] ? "is-reached" : "not-reached"}`}>
          <div className="detail-top">
            <div className={`detail-num-circle ${reached[selected] ? "done" : "pending"}`}>
              {reached[selected] ? "✓" : selectedMs.num}
            </div>
            <div className="detail-meta">
              <div className="detail-milestone-label">MILESTONE {selected + 1} OF {milestones.length}</div>
              <div className="detail-altitude">▲ {selectedMs.altitude}</div>
            </div>
          </div>
          <div className="detail-title">{selectedMs.title}</div>
          <div className="detail-desc">{selectedMs.desc}</div>
          {reached[selected] && (
            <div className="reward">
              <div className="reward-label">🎁 UNLOCKED</div>
              <div className="reward-text">{selectedMs.reward}</div>
            </div>
          )}
          <button className={`detail-btn ${reached[selected] ? "reached" : "mark"}`} onClick={() => toggleReached(selected)}>
            {reached[selected] ? "✓ Milestone Reached" : "✎ Mark as Reached"}
          </button>
        </div>

        <div className="nav-dots">
          {milestones.map((_, i) => (
            <button key={i} className={`nav-dot ${selected === i ? "active" : reached[i] ? "on" : "off"}`} onClick={() => selectCamp(i)}/>
          ))}
        </div>

        <div className="nav-arrows">
          <button className="nav-arrow prev" onClick={() => selectCamp(Math.max(0, selected - 1))} disabled={selected === 0}>← Previous</button>
          <button className="nav-arrow next" onClick={() => selectCamp(Math.min(milestones.length - 1, selected + 1))} disabled={selected === milestones.length - 1}>Next →</button>
        </div>

        <div className="what-card">
          <span className="what-label">WHAT IS THIS: </span>
          <span className="what-text">
            This is your 14-day starter plan. Click a camp to see the day's action, complete it in real life, then mark it as reached. Each day gives you one small use of AI so confidence grows from evidence, not theory.
          </span>
        </div>
      </div>

      {/* Bottom: CTA + Footer */}
      <div className="bottom-section">
        <div className="bottom-title">{doneCount === milestones.length
          ? <>You Reached the <em>Summit</em></>
          : <>One Small Step A Day Builds <em>Real Confidence</em></>}
        </div>
        <div className="bottom-text">{doneCount === milestones.length
          ? "You have used AI to understand, write, decide, organise, and move through real situations. You do not need to feel behind anymore; you now know how to begin."
          : "Do not try to become an AI expert in one sitting. Finish one small task today, mark the milestone, and let the trail build under your feet."}
        </div>
        <a href="#" className="bottom-btn">{doneCount === milestones.length ? "Return to the Prompt Pack" : "Start Day 1"}</a>
        <div className="bottom-divider"/>
        <div className="bottom-brand">AI Confidence Kit</div>
        <div className="bottom-details">A practical 14-day starter plan for everyday AI use</div>
        <div className="bottom-links"><a href="#">Prompt Pack</a> · <a href="#">Custom Prompt Builder</a></div>
      </div>
    </div>
  );
}
