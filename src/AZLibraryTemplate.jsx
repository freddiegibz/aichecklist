import { useEffect, useMemo, useState } from "react";
import PromptBuilder from "../custom-prompt-builder/prompt-builder.jsx";

const LIBRARY_CONFIG = {
  title: "What To Ask AI",
  subtitle: "Prompt Library",
  description: "Choose your situation, copy the prompt, and know exactly what to ask AI.",
};

const BUILDER_PASSWORD = import.meta.env.VITE_BUILDER_PASSWORD || "change-me";
const BUILDER_UNLOCK_KEY = "builder-unlocked";

const categories = [
  "Explaining Confusing Things",
  "Emails and Messages",
  "Everyday Admin and Paperwork",
  "Decision-Making",
  "Planning and Organisation",
  "Learning Something New",
  "Safety, Scams and Trust",
  "Health Appointments and Wellbeing",
  "Shopping, Money and Purchases",
  "Family, Hobbies and Personal Life",
];

const starterPrompts = [
  {
    category: "Explaining Confusing Things",
    title: "Explain This In Plain English",
    useWhen: "You see a word, idea, or topic you do not understand.",
    copyPrompt: `Please explain [WORD / IDEA / TOPIC] in plain English.

Assume I am a complete beginner.

Tell me:
- What it means
- Why it matters
- A simple example
- What I should understand next`,
    changeThisPart: "Replace [WORD / IDEA / TOPIC] with the thing you want explained.",
    followUpQuestion: "Can you explain that even more simply?",
    beCareful: "If this is about health, money, law, or safety, use AI to understand the topic, not as final advice.",
  },
  {
    category: "Explaining Confusing Things",
    title: "Explain A Confusing Letter Or Message",
    useWhen: "You receive a letter, email, text, or notice you do not fully understand.",
    copyPrompt: `Please explain this message in plain English:

[PASTE MESSAGE HERE]

Tell me:
- What it is saying
- What it wants from me
- Whether I need to do anything
- Any words or parts that are confusing`,
    changeThisPart: "Replace [PASTE MESSAGE HERE] with the message you want explained.",
    followUpQuestion: "What should I do next based on this message?",
    beCareful: "Do not paste private details like bank numbers, passwords, medical records, or full addresses.",
  },
  {
    category: "Explaining Confusing Things",
    title: "Explain The Jargon",
    useWhen: "Something uses technical, official, medical, financial, legal, or complicated words.",
    copyPrompt: `Please explain the jargon in this text:

[PASTE TEXT HERE]

Make a simple list of the difficult words and explain each one in plain English.`,
    changeThisPart: "Replace [PASTE TEXT HERE] with the text that contains confusing words.",
    followUpQuestion: "Which words in this text are most important for me to understand?",
    beCareful: "AI can help explain difficult words, but it may not understand your full situation.",
  },
  {
    category: "Explaining Confusing Things",
    title: "Summarise The Main Points",
    useWhen: "You have a long article, email, document, or explanation and want the important parts only.",
    copyPrompt: `Please summarise this in simple bullet points:

[PASTE TEXT HERE]

Tell me:
- The main points
- Anything I need to remember
- Anything I may need to do next`,
    changeThisPart: "Replace [PASTE TEXT HERE] with the text you want summarised.",
    followUpQuestion: "Can you make the summary shorter and easier to understand?",
    beCareful: "For important documents, check the original before making decisions.",
  },
  {
    category: "Explaining Confusing Things",
    title: "Give Me A Simple Example",
    useWhen: "You understand the explanation a little, but need an example to make it clearer.",
    copyPrompt: `Please explain [THING I AM LEARNING] using a simple everyday example.

Assume I am new to this.

Make the example practical and easy to imagine.`,
    changeThisPart: "Replace [THING I AM LEARNING] with the topic you want an example for.",
    followUpQuestion: "Can you give me one more example from everyday life?",
    beCareful: "Examples are simplified, so they may not include every detail.",
  },
  {
    category: "Explaining Confusing Things",
    title: "Explain The Difference Between Two Things",
    useWhen: "You are confused about two similar words, ideas, products, tools, or options.",
    copyPrompt: `Please explain the difference between [THING 1] and [THING 2] in plain English.

Tell me:
- What each one means
- The main difference
- When I would use each one
- A simple example`,
    changeThisPart: "Replace [THING 1] and [THING 2] with the two things you want compared.",
    followUpQuestion: "Which one is more relevant for someone like me?",
    beCareful: "If this is about money, health, law, or safety, double-check before acting.",
  },
  {
    category: "Explaining Confusing Things",
    title: "Explain What This Means For Me",
    useWhen: "You understand the words, but not how it affects your situation.",
    copyPrompt: `Please explain what this means for someone in my situation:

[PASTE TEXT OR DESCRIBE SITUATION]

My situation is:

[EXPLAIN YOUR SITUATION BRIEFLY]

Tell me:
- What this means in plain English
- Why it matters to me
- What I should think about next
- Any questions I should ask`,
    changeThisPart: "Replace both bracketed sections with the text and your situation.",
    followUpQuestion: "What should I ask a real person or professional about this?",
    beCareful: "AI does not know your full life, so treat this as guidance, not final advice.",
  },
  {
    category: "Explaining Confusing Things",
    title: "Explain The Pros And Cons",
    useWhen: "You are trying to understand whether something is good, bad, useful, risky, or worth considering.",
    copyPrompt: `Please explain the pros and cons of [THING / OPTION / IDEA] in plain English.

Make it simple and balanced.

Tell me:
- The possible benefits
- The possible downsides
- Who it might be good for
- Who it might not be good for`,
    changeThisPart: "Replace [THING / OPTION / IDEA] with what you want to understand.",
    followUpQuestion: "What is the biggest risk or downside I should know about?",
    beCareful: "AI may miss details that depend on your personal situation.",
  },
  {
    category: "Emails and Messages",
    title: "Write a Clear Email",
    useWhen: "You need to write an email but do not know how to start.",
    copyPrompt: `Please write a clear email about [WHAT THE EMAIL IS ABOUT].

The email should be polite, easy to understand, and include a clear next step.

Here are the details to include:
[ADD DETAILS HERE]`,
    changeThisPart: "Replace [WHAT THE EMAIL IS ABOUT] with the subject of the email. Replace [ADD DETAILS HERE] with the facts, dates, names, or points you want included.",
    followUpQuestion: "Can you make this email shorter and more natural?",
    beCareful: "Check names, dates, prices, appointment times, and any important details before sending.",
  },
  {
    category: "Emails and Messages",
    title: "Reply to a Message",
    useWhen: "You received a message and need help replying.",
    copyPrompt: `Please help me reply to this message:

[PASTE MESSAGE HERE]

I want my reply to say:
[WHAT YOU WANT TO SAY]

Make it polite, clear, and natural.`,
    changeThisPart: "Replace [PASTE MESSAGE HERE] with the message you received. Replace [WHAT YOU WANT TO SAY] with the main point you want your reply to make.",
    followUpQuestion: "Can you give me a warmer version and a shorter version?",
    beCareful: "Do not paste private information such as passwords, bank details, full addresses, or sensitive personal details.",
  },
  {
    category: "Emails and Messages",
    title: "Make a Message Sound More Polite",
    useWhen: "You have written something, but it sounds too blunt or harsh.",
    copyPrompt: `Please make this message sound more polite without changing the meaning:

[PASTE MESSAGE HERE]

Keep it simple and natural.`,
    changeThisPart: "Replace [PASTE MESSAGE HERE] with the message you want softened.",
    followUpQuestion: "Can you make it polite but still clear and firm?",
    beCareful: "Make sure the softened version still says what you actually mean.",
  },
  {
    category: "Emails and Messages",
    title: "Make a Message Shorter",
    useWhen: "Your message is too long, messy, or hard to follow.",
    copyPrompt: `Please make this message shorter and clearer:

[PASTE MESSAGE HERE]

Keep the important meaning, but remove anything unnecessary.`,
    changeThisPart: "Replace [PASTE MESSAGE HERE] with your draft message.",
    followUpQuestion: "Can you make it even shorter while keeping the main point?",
    beCareful: "Check that no important details were removed.",
  },
  {
    category: "Emails and Messages",
    title: "Say No Politely",
    useWhen: "You want to say no without sounding rude.",
    copyPrompt: `Please help me say no politely.

The situation is:
[EXPLAIN THE SITUATION]

I want to say no because:
[REASON]

Make it kind, clear, and firm.`,
    changeThisPart: "Replace [EXPLAIN THE SITUATION] with what you are responding to. Replace [REASON] with the reason you are saying no, or write “I do not want to give a reason.”",
    followUpQuestion: "Can you make this shorter and firmer?",
    beCareful: "Do not let the message become so polite that your “no” becomes unclear.",
  },
  {
    category: "Emails and Messages",
    title: "Ask for Help",
    useWhen: "You need to ask someone for help, information, or support.",
    copyPrompt: `Please write a message asking for help with [WHAT YOU NEED HELP WITH].

Include what I need, why I need it, and what I would like them to do.

Details:
[ADD DETAILS HERE]`,
    changeThisPart: "Replace [WHAT YOU NEED HELP WITH] with the task or problem. Replace [ADD DETAILS HERE] with any useful information.",
    followUpQuestion: "Can you make this sound more friendly and less demanding?",
    beCareful: "Be clear about exactly what you are asking for, so the other person knows how to respond.",
  },
  {
    category: "Emails and Messages",
    title: "Write a Complaint",
    useWhen: "You need to complain about a product, service, bill, appointment, or problem.",
    copyPrompt: `Please write a polite but firm complaint message about [WHAT HAPPENED].

Include what the problem is, when it happened, and what I would like done about it.

Details:
[ADD DETAILS HERE]`,
    changeThisPart: "Replace [WHAT HAPPENED] with the main problem. Replace [ADD DETAILS HERE] with dates, order numbers, names, or what outcome you want.",
    followUpQuestion: "Can you make this firmer while still sounding polite?",
    beCareful: "Check all facts before sending, especially dates, amounts, order numbers, and names.",
  },
  {
    category: "Emails and Messages",
    title: "Write a Thank-You Message",
    useWhen: "You want to thank someone but do not know how to phrase it.",
    copyPrompt: `Please write a warm thank-you message for [WHAT THEY DID].

Make it sound natural, sincere, and not too formal.`,
    changeThisPart: "Replace [WHAT THEY DID] with what the person did for you.",
    followUpQuestion: "Can you make it shorter and more personal?",
    beCareful: "Read it before sending to make sure it sounds like you.",
  },
  {
    category: "Emails and Messages",
    title: "Make a Message Sound More Professional",
    useWhen: "You need a message for work, a business, an appointment, or an official situation.",
    copyPrompt: `Please make this message sound more professional and clear:

[PASTE MESSAGE HERE]

Keep it polite and easy to understand.`,
    changeThisPart: "Replace [PASTE MESSAGE HERE] with the message you want improved.",
    followUpQuestion: "Can you make it professional but still friendly?",
    beCareful: "Make sure the final version does not sound too stiff or unlike you.",
  },
  {
    category: "Emails and Messages",
    title: "Check a Message Before Sending",
    useWhen: "You have written a message and want to make sure it sounds right.",
    copyPrompt: `Please check this message before I send it:

[PASTE MESSAGE HERE]

Tell me:
1. If it is clear
2. If it sounds polite
3. If anything could be misunderstood
4. A better version if needed`,
    changeThisPart: "Replace [PASTE MESSAGE HERE] with your draft message.",
    followUpQuestion: "Can you give me the safest version to send?",
    beCareful: "AI may not understand the full relationship or situation, so use your judgement before sending.",
  },
  {
    category: "Everyday Admin and Paperwork",
    title: "Explain This Letter",
    useWhen: "You receive a letter, form, email, bill, or notice and do not fully understand it.",
    copyPrompt: `Please explain this in plain English:

[PASTE LETTER / EMAIL / NOTICE HERE]

Tell me:
1. What it is saying
2. Why it matters
3. Whether I need to do anything
4. Anything I should double-check`,
    changeThisPart: "Replace [PASTE LETTER / EMAIL / NOTICE HERE] with the text you want explained.",
    followUpQuestion: "Can you turn this into a simple action list?",
    beCareful: "Remove private details like full address, account numbers, passwords, bank details, or medical information before pasting.",
  },
  {
    category: "Everyday Admin and Paperwork",
    title: "Turn Paperwork Into A Checklist",
    useWhen: "You have paperwork and want to know what steps to take.",
    copyPrompt: `Please turn this paperwork into a simple checklist:

[PASTE PAPERWORK / INSTRUCTIONS HERE]

Make the checklist clear and in the right order.`,
    changeThisPart: "Replace [PASTE PAPERWORK / INSTRUCTIONS HERE] with the paperwork or instructions.",
    followUpQuestion: "Which steps are most urgent?",
    beCareful: "Check the original paperwork before acting, especially deadlines, dates, and official instructions.",
  },
  {
    category: "Everyday Admin and Paperwork",
    title: "Summarise A Document",
    useWhen: "You have a long document and want the main points.",
    copyPrompt: `Please summarise this document in simple bullet points:

[PASTE DOCUMENT TEXT HERE]

Tell me:
1. The main points
2. Anything important I should not miss
3. Any actions or deadlines mentioned`,
    changeThisPart: "Replace [PASTE DOCUMENT TEXT HERE] with the document text.",
    followUpQuestion: "Can you make this summary shorter and easier to understand?",
    beCareful: "AI can miss details, so check the original document before making important decisions.",
  },
  {
    category: "Everyday Admin and Paperwork",
    title: "Draft A Reply To A Letter Or Email",
    useWhen: "You need to reply to an admin letter, company, service provider, appointment, or official email.",
    copyPrompt: `Please help me write a clear reply to this:

[PASTE MESSAGE / LETTER HERE]

I want to say:
[WHAT YOU WANT TO SAY]

Make it polite, clear, and firm if needed.`,
    changeThisPart: "Replace [PASTE MESSAGE / LETTER HERE] with what you received. Replace [WHAT YOU WANT TO SAY] with your response or goal.",
    followUpQuestion: "Can you make this more formal and suitable to send?",
    beCareful: "Check any names, reference numbers, dates, and amounts before sending.",
  },
  {
    category: "Everyday Admin and Paperwork",
    title: "Prepare Questions Before A Phone Call",
    useWhen: "You need to call a company, service provider, council, bank, utility provider, doctor’s surgery, or support line.",
    copyPrompt: `I need to make a phone call about [WHAT THE CALL IS ABOUT].

Please help me prepare:
1. What to say at the start
2. The questions I should ask
3. Information I should have ready
4. Notes I should write down during the call`,
    changeThisPart: "Replace [WHAT THE CALL IS ABOUT] with the reason for the call.",
    followUpQuestion: "Can you make me a short script for the call?",
    beCareful: "Do not share passwords, PINs, or full bank details with AI or anyone on the phone unless you are certain it is safe.",
  },
  {
    category: "Everyday Admin and Paperwork",
    title: "Compare Two Options",
    useWhen: "You need to compare bills, subscriptions, services, quotes, plans, providers, or forms.",
    copyPrompt: `Please help me compare these two options:

Option 1: [PASTE OR DESCRIBE OPTION 1]
Option 2: [PASTE OR DESCRIBE OPTION 2]

Compare them in simple terms:
1. Cost
2. Benefits
3. Downsides
4. Important differences
5. Questions I should ask before choosing`,
    changeThisPart: "Replace [Option 1] and [Option 2] with the options you are comparing.",
    followUpQuestion: "Which option seems simpler or safer, based only on the information provided?",
    beCareful: "Do not treat AI’s comparison as financial, legal, or professional advice.",
  },
  {
    category: "Everyday Admin and Paperwork",
    title: "Find Missing Information",
    useWhen: "You are filling out a form, replying to paperwork, or preparing an application and want to know what is missing.",
    copyPrompt: `Please look at this and tell me what information seems missing:

[PASTE FORM / APPLICATION / MESSAGE HERE]

Tell me:
1. What information is missing
2. What I may need to check
3. What questions I should ask before submitting it`,
    changeThisPart: "Replace [PASTE FORM / APPLICATION / MESSAGE HERE] with the form, application, or message.",
    followUpQuestion: "Can you make a checklist of everything I need before I complete this?",
    beCareful: "Do not paste sensitive personal details unless necessary, and check official requirements yourself.",
  },
  {
    category: "Everyday Admin and Paperwork",
    title: "Organise Messy Notes",
    useWhen: "You have messy notes from a call, appointment, document, or task and want them organised.",
    copyPrompt: `Please organise these notes into a clear format:

[PASTE NOTES HERE]

Sort them into:
1. Main points
2. Things I need to do
3. Questions I still have
4. Deadlines or dates mentioned`,
    changeThisPart: "Replace [PASTE NOTES HERE] with your rough notes.",
    followUpQuestion: "Can you turn the action items into a simple checklist?",
    beCareful: "Check that AI has not changed the meaning of your notes.",
  },
  {
    category: "Everyday Admin and Paperwork",
    title: "Write A Complaint Or Refund Request",
    useWhen: "You need to complain, request a refund, challenge a charge, or ask for a problem to be fixed.",
    copyPrompt: `Please write a polite but firm message about this problem:

[DESCRIBE THE PROBLEM]

I would like:
[WHAT YOU WANT TO HAPPEN]

Include:
1. What happened
2. When it happened
3. Why I am unhappy
4. What I am asking for`,
    changeThisPart: "Replace [DESCRIBE THE PROBLEM] with the issue. Replace [WHAT YOU WANT TO HAPPEN] with the refund, replacement, correction, or response you want.",
    followUpQuestion: "Can you make this stronger but still polite?",
    beCareful: "Keep the message factual. Do not include claims you cannot support.",
  },
  {
    category: "Everyday Admin and Paperwork",
    title: "Create A Simple Admin Plan",
    useWhen: "You have several admin tasks and feel overwhelmed.",
    copyPrompt: `Please help me make a simple admin plan.

Here are the things I need to deal with:

[LIST YOUR ADMIN TASKS HERE]

Organise them into:
1. What to do first
2. What can wait
3. What information I need
4. A simple step-by-step plan`,
    changeThisPart: "Replace [LIST YOUR ADMIN TASKS HERE] with your tasks, such as bills, forms, calls, appointments, emails, or paperwork.",
    followUpQuestion: "Can you make this into a 30-minute plan for today?",
    beCareful: "Check any official deadlines yourself before deciding what can wait.",
  },
  {
    category: "Decision-Making",
    title: "Compare Two Choices",
    useWhen: "You are choosing between two options and want a clearer comparison.",
    copyPrompt: `Please help me compare these two choices:

Choice 1: [DESCRIBE CHOICE 1]
Choice 2: [DESCRIBE CHOICE 2]

Compare them in simple terms:
1. Benefits
2. Downsides
3. Risks
4. What each choice is best for
5. What I should think about before deciding`,
    changeThisPart: "Replace [DESCRIBE CHOICE 1] and [DESCRIBE CHOICE 2] with the options you are considering.",
    followUpQuestion: "Which choice seems better based only on the information I gave you, and why?",
    beCareful: "Use AI to think more clearly, not to make important decisions for you.",
  },
  {
    category: "Decision-Making",
    title: "List Pros and Cons",
    useWhen: "You are considering one option and want to see the good and bad sides.",
    copyPrompt: `Please list the pros and cons of [DECISION / OPTION].

Keep it simple and practical.

Tell me:
1. The main benefits
2. The main downsides
3. The biggest risk
4. What I should check before deciding`,
    changeThisPart: "Replace [DECISION / OPTION] with the thing you are considering.",
    followUpQuestion: "Which pro or con matters most?",
    beCareful: "AI may not know your personal priorities unless you explain them.",
  },
  {
    category: "Decision-Making",
    title: "Work Out What Matters Most",
    useWhen: "You feel unsure because there are too many things to consider.",
    copyPrompt: `Please help me work out what matters most in this decision:

[DESCRIBE THE DECISION]

My options are:
[LIST YOUR OPTIONS]

Ask me what information you need, then help me rank the most important factors.`,
    changeThisPart: "Replace [DESCRIBE THE DECISION] with the decision you are making. Replace [LIST YOUR OPTIONS] with the choices available.",
    followUpQuestion: "Can you turn the most important factors into a simple checklist?",
    beCareful: "Do not let AI decide your values for you. It can help organise them.",
  },
  {
    category: "Decision-Making",
    title: "Spot Hidden Risks",
    useWhen: "You want to understand what could go wrong before choosing.",
    copyPrompt: `Please help me spot the risks in this decision:

[DESCRIBE THE DECISION]

Tell me:
1. What could go wrong
2. What I might be overlooking
3. What warning signs to watch for
4. How I could reduce the risk`,
    changeThisPart: "Replace [DESCRIBE THE DECISION] with the choice or situation.",
    followUpQuestion: "What is the most serious risk here?",
    beCareful: "AI may imagine risks that are unlikely, so use your judgement.",
  },
  {
    category: "Decision-Making",
    title: "Think Through The Consequences",
    useWhen: "You want to understand what might happen after a choice.",
    copyPrompt: `Please help me think through the possible consequences of this decision:

[DESCRIBE THE DECISION]

Explain:
1. What might happen straight away
2. What might happen later
3. Who or what could be affected
4. What I should prepare for`,
    changeThisPart: "Replace [DESCRIBE THE DECISION] with the decision you are considering.",
    followUpQuestion: "What consequence am I most likely to underestimate?",
    beCareful: "AI is guessing based on the information you provide, so treat this as a thinking aid.",
  },
  {
    category: "Decision-Making",
    title: "Make A Simple Decision Checklist",
    useWhen: "You want a clear checklist to help you decide.",
    copyPrompt: `Please make me a simple decision checklist for [DECISION].

The checklist should help me decide whether this is a good idea.

Keep it practical and easy to answer.`,
    changeThisPart: "Replace [DECISION] with the decision you are making.",
    followUpQuestion: "Can you make the checklist shorter and easier to use?",
    beCareful: "A checklist helps you think, but it does not guarantee the right answer.",
  },
  {
    category: "Decision-Making",
    title: "Choose Based On My Priorities",
    useWhen: "You know what matters to you but need help applying it to a decision.",
    copyPrompt: `Please help me make this decision based on my priorities.

The decision is:
[DESCRIBE THE DECISION]

My priorities are:
[LIST YOUR PRIORITIES]

My options are:
[LIST YOUR OPTIONS]

Compare the options based on my priorities.`,
    changeThisPart: "Replace the bracketed sections with your decision, your priorities, and your options.",
    followUpQuestion: "Which option best matches my priorities, and what trade-off does it involve?",
    beCareful: "If your priorities are unclear, AI’s answer may be unclear too.",
  },
  {
    category: "Decision-Making",
    title: "Simplify An Overwhelming Decision",
    useWhen: "A decision feels too big, messy, or stressful.",
    copyPrompt: `Please help me simplify this decision:

[DESCRIBE THE DECISION]

Break it down into:
1. What I am really deciding
2. The main options
3. The most important factors
4. What information I still need
5. A simple next step`,
    changeThisPart: "Replace [DESCRIBE THE DECISION] with the decision you are struggling with.",
    followUpQuestion: "What is the next small step I can take without deciding everything yet?",
    beCareful: "Sometimes the best next step is gathering more information, not deciding immediately.",
  },
  {
    category: "Decision-Making",
    title: "Prepare Questions Before Deciding",
    useWhen: "You need to ask someone questions before making a choice.",
    copyPrompt: `Please help me prepare questions before I decide about [DECISION / SITUATION].

Give me questions to ask about:
1. Cost
2. Risks
3. Benefits
4. Timing
5. What happens if I change my mind
6. Anything unclear`,
    changeThisPart: "Replace [DECISION / SITUATION] with what you are deciding about.",
    followUpQuestion: "Which 5 questions are the most important to ask first?",
    beCareful: "Ask questions directly to the person, company, or professional involved before making important decisions.",
  },
  {
    category: "Decision-Making",
    title: "Check If I Am Rushing",
    useWhen: "You feel pressured, emotional, or unsure whether you are making a decision too quickly.",
    copyPrompt: `Please help me check whether I am rushing this decision:

[DESCRIBE THE DECISION]

Tell me:
1. What signs suggest I might be rushing
2. What signs suggest I have enough information
3. What I should check before deciding
4. What a calm next step would be`,
    changeThisPart: "Replace [DESCRIBE THE DECISION] with the decision you are about to make.",
    followUpQuestion: "What would be the safest next step that still keeps me moving forward?",
    beCareful: "AI can help you slow down and think, but you should make final decisions yourself.",
  },
  {
    category: "Planning and Organisation",
    title: "Plan My Day",
    useWhen: "You have things to do today and want a simple plan.",
    copyPrompt: `Please help me plan my day.

Here are the things I need to do:

[LIST YOUR TASKS HERE]

Organise them into a simple plan. Tell me:
1. What to do first
2. What can wait
3. What might take the most energy
4. A realistic order for the day`,
    changeThisPart: "Replace [LIST YOUR TASKS HERE] with your tasks for the day.",
    followUpQuestion: "Can you turn this into a simple morning, afternoon, and evening plan?",
    beCareful: "AI may underestimate how long things take, so adjust the plan to fit your real energy and time.",
  },
  {
    category: "Planning and Organisation",
    title: "Plan My Week",
    useWhen: "You want to organise the week ahead.",
    copyPrompt: `Please help me plan my week.

Here are the things I need to get done:

[LIST YOUR TASKS / APPOINTMENTS / GOALS HERE]

Make a simple weekly plan that spreads things out realistically.`,
    changeThisPart: "Replace [LIST YOUR TASKS / APPOINTMENTS / GOALS HERE] with what you need to do this week.",
    followUpQuestion: "Can you make this easier by giving me only the most important things for each day?",
    beCareful: "Check your real calendar before following the plan.",
  },
  {
    category: "Planning and Organisation",
    title: "Break A Big Task Into Steps",
    useWhen: "A task feels too big or overwhelming.",
    copyPrompt: `Please break this task into small, manageable steps:

[DESCRIBE THE TASK]

Make the steps simple and put them in a sensible order.`,
    changeThisPart: "Replace [DESCRIBE THE TASK] with the task you need to do.",
    followUpQuestion: "What is the easiest first step I can do today?",
    beCareful: "Do not let the list become too long. Ask AI to simplify it if it feels overwhelming.",
  },
  {
    category: "Planning and Organisation",
    title: "Make A Checklist",
    useWhen: "You want a clear checklist for a task, trip, appointment, project, or event.",
    copyPrompt: `Please make me a checklist for [TASK / EVENT / SITUATION].

Include everything important I should remember.

Keep it simple and practical.`,
    changeThisPart: "Replace [TASK / EVENT / SITUATION] with what you need a checklist for.",
    followUpQuestion: "Can you group this checklist into “must do,” “nice to do,” and “bring/prepare”?",
    beCareful: "Check the checklist yourself in case AI misses something specific to your situation.",
  },
  {
    category: "Planning and Organisation",
    title: "Organise A Messy List",
    useWhen: "You have a messy list of tasks, notes, or ideas and want it organised.",
    copyPrompt: `Please organise this messy list:

[PASTE YOUR LIST HERE]

Sort it into clear groups and tell me what should come first.`,
    changeThisPart: "Replace [PASTE YOUR LIST HERE] with your messy list.",
    followUpQuestion: "Can you turn this into a simple action plan?",
    beCareful: "AI may group things in a way that does not match your priorities, so check the final list.",
  },
  {
    category: "Planning and Organisation",
    title: "Plan A Trip Or Day Out",
    useWhen: "You want help planning a trip, visit, journey, or day out.",
    copyPrompt: `Please help me plan [TRIP / VISIT / DAY OUT].

Here are the details:

[WHERE, WHEN, WHO IS GOING, BUDGET, NEEDS OR PREFERENCES]

Make a simple plan with:
1. What to prepare
2. Travel or timing notes
3. Things to do
4. Anything I should check before going`,
    changeThisPart: "Replace the bracketed sections with your trip details.",
    followUpQuestion: "Can you make this into a simple checklist?",
    beCareful: "Check opening times, prices, travel times, and availability yourself before relying on the plan.",
  },
  {
    category: "Planning and Organisation",
    title: "Create A Routine",
    useWhen: "You want to build a simple daily or weekly routine.",
    copyPrompt: `Please help me create a simple routine for [AREA OF LIFE].

My goal is: [GOAL]

My usual situation is: [DESCRIBE YOUR TIME, ENERGY, OR LIMITS]

Make the routine realistic and easy to follow.`,
    changeThisPart: "Replace [AREA OF LIFE], [GOAL], and [DESCRIBE YOUR TIME, ENERGY, OR LIMITS] with your details.",
    followUpQuestion: "Can you make this easier to start with only 3 steps?",
    beCareful: "A routine only works if it fits your real life. Start smaller than you think.",
  },
  {
    category: "Planning and Organisation",
    title: "Prioritise My Tasks",
    useWhen: "You have too many things to do and need to decide what matters most.",
    copyPrompt: `Please help me prioritise these tasks:

[LIST YOUR TASKS HERE]

Sort them into:
1. Do first
2. Do later
3. Can wait
4. Could remove or simplify

Explain your reasoning in plain English.`,
    changeThisPart: "Replace [LIST YOUR TASKS HERE] with everything you are trying to organise.",
    followUpQuestion: "What are the top 3 things I should focus on today?",
    beCareful: "AI does not know every real-world consequence, so check deadlines and important obligations yourself.",
  },
  {
    category: "Planning and Organisation",
    title: "Prepare For An Appointment",
    useWhen: "You have an appointment, meeting, call, visit, or important conversation coming up.",
    copyPrompt: `Please help me prepare for [APPOINTMENT / MEETING / CALL].

The reason for it is: [REASON]

Help me make:
1. A list of what to bring or prepare
2. Questions I should ask
3. Notes I should write down
4. Anything I should check beforehand`,
    changeThisPart: "Replace [APPOINTMENT / MEETING / CALL] and [REASON] with your details.",
    followUpQuestion: "Can you make this into a short preparation checklist?",
    beCareful: "For medical, legal, financial, or official appointments, use AI to prepare questions, not as a replacement for professional advice.",
  },
  {
    category: "Planning and Organisation",
    title: "Make A Simple Project Plan",
    useWhen: "You have a project or goal and need to organise it.",
    copyPrompt: `Please help me make a simple project plan for [PROJECT / GOAL].

Tell me:
1. The main steps
2. What order to do them in
3. What I might need
4. What could delay me
5. What I should do first`,
    changeThisPart: "Replace [PROJECT / GOAL] with the thing you want to complete.",
    followUpQuestion: "Can you turn this into a 7-day plan?",
    beCareful: "AI may make the plan too neat. Build in extra time for real-life delays.",
  },
  {
    category: "Learning Something New",
    title: "Learn The Basics",
    useWhen: "You want a simple beginner introduction to a new topic.",
    copyPrompt: `Please teach me the basics of [TOPIC].

Assume I am a complete beginner.

Explain:
1. What it is
2. Why it matters
3. The most important things to know first
4. A simple example`,
    changeThisPart: "Replace [TOPIC] with what you want to learn.",
    followUpQuestion: "Can you make this even simpler and give me a beginner-friendly example?",
    beCareful: "AI can simplify a topic, but it may leave out important details. Use it as a starting point.",
  },
  {
    category: "Learning Something New",
    title: "Create A Beginner Lesson",
    useWhen: "You want AI to teach you something step by step.",
    copyPrompt: `Please create a beginner lesson on [TOPIC].

Make it simple and easy to follow.

Include:
1. A short explanation
2. The key points
3. One example
4. One small practice task`,
    changeThisPart: "Replace [TOPIC] with the thing you want to learn.",
    followUpQuestion: "Can you give me Lesson 2 after this?",
    beCareful: "If the topic is important or technical, double-check with trusted sources.",
  },
  {
    category: "Learning Something New",
    title: "Explain It Step By Step",
    useWhen: "You are learning something that feels confusing or has several stages.",
    copyPrompt: `Please explain [TOPIC / TASK] step by step.

Go slowly and assume I am new to it.

Use simple language and explain each step before moving to the next.`,
    changeThisPart: "Replace [TOPIC / TASK] with what you want explained.",
    followUpQuestion: "Can you repeat the steps as a simple checklist?",
    beCareful: "AI may skip steps that seem obvious to it. Ask it to slow down if needed.",
  },
  {
    category: "Learning Something New",
    title: "Teach Me With Examples",
    useWhen: "You understand better through examples than explanations.",
    copyPrompt: `Please teach me [TOPIC] using simple examples.

Give me:
1. A short explanation
2. Three everyday examples
3. What each example shows
4. A quick recap`,
    changeThisPart: "Replace [TOPIC] with what you want to learn.",
    followUpQuestion: "Can you give me an example that relates to my situation: [YOUR SITUATION]?",
    beCareful: "Examples make things easier, but they may simplify the full truth.",
  },
  {
    category: "Learning Something New",
    title: "Make A Glossary",
    useWhen: "A topic has lots of confusing words.",
    copyPrompt: `Please make a simple glossary for [TOPIC].

List the most important words I need to understand.

For each word, explain:
1. What it means
2. Why it matters
3. A simple example`,
    changeThisPart: "Replace [TOPIC] with the topic you are learning.",
    followUpQuestion: "Which 5 words should I learn first?",
    beCareful: "Definitions can change depending on the subject, so check important terms if accuracy matters.",
  },
  {
    category: "Learning Something New",
    title: "Quiz Me",
    useWhen: "You want to check whether you understood something.",
    copyPrompt: `Please quiz me on [TOPIC].

Ask me 5 beginner-friendly questions, one at a time.

After I answer, tell me if I was right and explain the answer simply.`,
    changeThisPart: "Replace [TOPIC] with what you want to be tested on.",
    followUpQuestion: "Can you make the next questions slightly harder?",
    beCareful: "AI may mark answers too generously or incorrectly, so use quizzes for practice, not official testing.",
  },
  {
    category: "Learning Something New",
    title: "Make A Learning Plan",
    useWhen: "You want to learn something over several days or weeks.",
    copyPrompt: `Please make me a simple learning plan for [TOPIC].

I can spend [TIME PER DAY / WEEK] learning.

Make a realistic plan for [NUMBER OF DAYS / WEEKS].

Include what to learn first, what to practise, and how to check my progress.`,
    changeThisPart: "Replace the bracketed parts with the topic, your available time, and the timeframe.",
    followUpQuestion: "Can you make this plan easier and less overwhelming?",
    beCareful: "Start smaller than you think. A plan only helps if you can actually follow it.",
  },
  {
    category: "Learning Something New",
    title: "Explain My Mistakes",
    useWhen: "You tried something and want to understand what went wrong.",
    copyPrompt: `I tried to do [TASK / EXERCISE / SKILL], but I got this result:

[PASTE OR DESCRIBE WHAT HAPPENED]

Please explain:
1. What I may have misunderstood
2. What mistake I might have made
3. How to fix it
4. What to try next`,
    changeThisPart: "Replace the bracketed parts with what you tried and what happened.",
    followUpQuestion: "Can you explain the mistake in a simpler way?",
    beCareful: "AI can help diagnose mistakes, but it may not see everything you did.",
  },
  {
    category: "Learning Something New",
    title: "Recommend What To Learn First",
    useWhen: "A topic feels too big and you do not know where to start.",
    copyPrompt: `I want to learn [TOPIC], but I do not know where to start.

Please tell me:
1. What to learn first
2. What to ignore for now
3. The easiest beginner starting point
4. A simple first task`,
    changeThisPart: "Replace [TOPIC] with the thing you want to learn.",
    followUpQuestion: "Can you give me a 3-step starting plan?",
    beCareful: "AI may suggest too much. Ask it to simplify if the answer feels overwhelming.",
  },
  {
    category: "Learning Something New",
    title: "Turn A Topic Into A Simple Cheat Sheet",
    useWhen: "You want a short reference guide for something you are learning.",
    copyPrompt: `Please turn [TOPIC] into a simple beginner cheat sheet.

Include:
1. Key ideas
2. Important words
3. Common mistakes
4. Simple examples
5. What to remember most`,
    changeThisPart: "Replace [TOPIC] with the topic you want a cheat sheet for.",
    followUpQuestion: "Can you make this fit on one page?",
    beCareful: "A cheat sheet is a summary, so it will not include everything.",
  },
  {
    category: "Safety, Scams and Trust",
    title: "Check If A Message Seems Suspicious",
    useWhen: "You receive a text, email, or message that feels strange, urgent, or suspicious.",
    copyPrompt: `Please check this message for possible scam warning signs:

[PASTE MESSAGE HERE]

Tell me:
1. What seems suspicious
2. What pressure tactics it may be using
3. What I should avoid clicking or sharing
4. What I should verify before replying`,
    changeThisPart: "Replace [PASTE MESSAGE HERE] with the message you want checked.",
    followUpQuestion: "What are the biggest red flags in this message?",
    beCareful: "AI cannot guarantee whether something is safe or unsafe. If money, passwords, bank details, or personal information are involved, verify directly through the official website or phone number.",
  },
  {
    category: "Safety, Scams and Trust",
    title: "Spot Red Flags In An Offer",
    useWhen: "You see an offer, advert, investment, prize, discount, job, or deal that seems too good to be true.",
    copyPrompt: `Please check this offer for possible red flags:

[PASTE OR DESCRIBE THE OFFER]

Tell me:
1. What seems trustworthy
2. What seems suspicious
3. What I should verify
4. What I should avoid doing until I know more`,
    changeThisPart: "Replace [PASTE OR DESCRIBE THE OFFER] with the offer you want checked.",
    followUpQuestion: "What would make this offer safer to trust?",
    beCareful: "Do not rely on AI alone before paying money, sharing details, or clicking links.",
  },
  {
    category: "Safety, Scams and Trust",
    title: "Check Before Clicking A Link",
    useWhen: "You are unsure whether a link in a message, email, advert, or website is safe.",
    copyPrompt: `I am unsure whether I should click this link or button.

Here is the message around it:

[PASTE MESSAGE HERE]

Please tell me:
1. What warning signs to look for
2. What I should check before clicking
3. A safer way to visit the website if needed
4. What information I should not enter`,
    changeThisPart: "Replace [PASTE MESSAGE HERE] with the message or website text around the link.",
    followUpQuestion: "What is the safest next step?",
    beCareful: "Do not paste or click suspicious links inside AI. Visit companies by typing their official website address yourself.",
  },
  {
    category: "Safety, Scams and Trust",
    title: "Know What Not To Share With AI",
    useWhen: "You are about to paste personal, private, financial, medical, or official information into AI.",
    copyPrompt: `I want to ask AI about this:

[DESCRIBE WHAT YOU WANT HELP WITH]

Please tell me:
1. What information I should not share
2. What details I should remove or hide
3. How to ask the question more safely
4. Whether this is something I should ask a real professional about instead`,
    changeThisPart: "Replace [DESCRIBE WHAT YOU WANT HELP WITH] with the situation, without including sensitive details.",
    followUpQuestion: "Can you rewrite my question in a safer way that removes private information?",
    beCareful: "Do not share passwords, PINs, full bank details, national insurance numbers, medical records, or private documents unless you fully understand the risks.",
  },
  {
    category: "Safety, Scams and Trust",
    title: "Check If AI Might Be Wrong",
    useWhen: "AI gives you an answer and you are not sure whether to trust it.",
    copyPrompt: `Please review this AI answer and tell me where it might be wrong or incomplete:

[PASTE AI ANSWER HERE]

Tell me:
1. What might need checking
2. What parts could be outdated
3. What assumptions it may be making
4. How I could verify the answer`,
    changeThisPart: "Replace [PASTE AI ANSWER HERE] with the answer you want checked.",
    followUpQuestion: "What should I double-check before acting on this?",
    beCareful: "AI can sound confident even when it is wrong. Always verify important information.",
  },
  {
    category: "Safety, Scams and Trust",
    title: "Check A Suspicious Phone Call Or Voicemail",
    useWhen: "You receive a phone call, voicemail, or missed-call message that asks for money, details, or urgent action.",
    copyPrompt: `Please help me check whether this phone call or voicemail sounds suspicious:

[DESCRIBE WHAT THEY SAID]

Tell me:
1. What red flags are present
2. What I should avoid doing
3. What I should verify
4. How to handle it safely`,
    changeThisPart: "Replace [DESCRIBE WHAT THEY SAID] with what the caller or voicemail said.",
    followUpQuestion: "Can you give me a safe script for calling the real company back?",
    beCareful: "Do not call back numbers from suspicious messages. Find the official number yourself from a trusted source.",
  },
  {
    category: "Safety, Scams and Trust",
    title: "Check A Website Or Company Before Buying",
    useWhen: "You are thinking of buying from a website or company you do not know.",
    copyPrompt: `Please help me check whether this website or company seems trustworthy before I buy:

[PASTE WEBSITE TEXT OR DESCRIBE COMPANY]

Tell me:
1. What trust signs to look for
2. What red flags to check
3. What I should verify before paying
4. What payment methods are safer`,
    changeThisPart: "Replace [PASTE WEBSITE TEXT OR DESCRIBE COMPANY] with the website text or company details.",
    followUpQuestion: "What should I check before entering payment details?",
    beCareful: "AI cannot browse or verify everything unless connected to live tools. Search independently, check reviews, and use safer payment methods where possible.",
  },
  {
    category: "Safety, Scams and Trust",
    title: "Make A Safer Version Of A Question",
    useWhen: "You want to ask AI something but are unsure how to avoid sharing too much personal information.",
    copyPrompt: `Please help me rewrite this question so it is safer to ask AI:

[PASTE YOUR QUESTION HERE]

Remove or generalise any private details, but keep the question useful.`,
    changeThisPart: "Replace [PASTE YOUR QUESTION HERE] with the question you want to ask.",
    followUpQuestion: "What private details did you remove or generalise?",
    beCareful: "Still read the safer version yourself before using it.",
  },
  {
    category: "Safety, Scams and Trust",
    title: "Verify A Claim",
    useWhen: "You see a claim online, in a message, in an advert, or from AI, and want to know how to check it.",
    copyPrompt: `I saw this claim:

[PASTE OR DESCRIBE CLAIM]

Please help me work out how to verify it.

Tell me:
1. What the claim is saying
2. What evidence would support it
3. What sources I should check
4. What warning signs would make it less trustworthy`,
    changeThisPart: "Replace [PASTE OR DESCRIBE CLAIM] with the claim you want to check.",
    followUpQuestion: "What search terms should I use to check this myself?",
    beCareful: "AI may not know if the claim is true. Use it to plan how to verify, not as the final answer.",
  },
  {
    category: "Safety, Scams and Trust",
    title: "Decide When To Ask A Real Person",
    useWhen: "You are unsure whether AI is enough or whether you need professional/human help.",
    copyPrompt: `Please help me decide whether this is something I should ask AI about or take to a real person/professional:

[DESCRIBE THE SITUATION]

Tell me:
1. What AI can safely help with
2. What AI should not decide for me
3. Who I might need to speak to
4. What questions I should ask them`,
    changeThisPart: "Replace [DESCRIBE THE SITUATION] with the issue you are dealing with.",
    followUpQuestion: "Can you help me prepare questions for the person I should speak to?",
    beCareful: "For health, legal, financial, safety, or urgent issues, use AI only to prepare and understand, not as the final authority.",
  },
  {
    category: "Health Appointments and Wellbeing",
    title: "Prepare For A Doctor’s Appointment",
    useWhen: "You have a doctor’s appointment and want to organise what to say.",
    copyPrompt: `Please help me prepare for a doctor’s appointment about [HEALTH ISSUE / SYMPTOM / CONCERN].

Help me make:
1. A short summary of what has been happening
2. Questions to ask the doctor
3. Information I should bring
4. Things I should not forget to mention`,
    changeThisPart: "Replace [HEALTH ISSUE / SYMPTOM / CONCERN] with what the appointment is about.",
    followUpQuestion: "Can you turn this into a short note I can bring to the appointment?",
    beCareful: "AI is not a doctor. Use this to prepare, not to diagnose or treat yourself.",
  },
  {
    category: "Health Appointments and Wellbeing",
    title: "Summarise My Symptoms",
    useWhen: "You want to explain your symptoms clearly before an appointment or call.",
    copyPrompt: `Please help me summarise these symptoms clearly:

[DESCRIBE YOUR SYMPTOMS]

Organise them into:
1. What I am feeling
2. When it started
3. How often it happens
4. What makes it better or worse
5. What I should tell a healthcare professional`,
    changeThisPart: "Replace [DESCRIBE YOUR SYMPTOMS] with your symptoms and timeline.",
    followUpQuestion: "Can you make this shorter and easier to read out loud?",
    beCareful: "If symptoms are severe, sudden, worsening, or urgent, contact a healthcare professional or emergency service.",
  },
  {
    category: "Health Appointments and Wellbeing",
    title: "Understand A Medical Term",
    useWhen: "You hear or read a medical word you do not understand.",
    copyPrompt: `Please explain [MEDICAL TERM] in plain English.

Assume I am a complete beginner.

Tell me:
1. What it means
2. Why it might matter
3. A simple example
4. What I should ask my doctor about it`,
    changeThisPart: "Replace [MEDICAL TERM] with the word or phrase you want explained.",
    followUpQuestion: "Can you give me 3 simple questions to ask my doctor about this?",
    beCareful: "Medical terms can depend on your personal situation, so ask a healthcare professional before making decisions.",
  },
  {
    category: "Health Appointments and Wellbeing",
    title: "Prepare Questions About Medication",
    useWhen: "You have been given or are considering a medication and want to ask better questions.",
    copyPrompt: `Please help me prepare questions to ask a doctor or pharmacist about [MEDICATION NAME].

Include questions about:
1. What it is for
2. How to take it
3. Possible side effects
4. What to avoid
5. What to do if I miss a dose`,
    changeThisPart: "Replace [MEDICATION NAME] with the name of the medication.",
    followUpQuestion: "Can you make this into a short checklist for the pharmacy or appointment?",
    beCareful: "Do not start, stop, or change medication based on AI. Ask a doctor or pharmacist.",
  },
  {
    category: "Health Appointments and Wellbeing",
    title: "Understand A Health Letter Or Test Result",
    useWhen: "You receive a health letter, appointment note, or test result and want it explained.",
    copyPrompt: `Please explain this health letter or result in plain English:

[PASTE TEXT HERE]

Tell me:
1. What it seems to be saying
2. Any terms I should understand
3. What questions I should ask
4. What I may need to do next`,
    changeThisPart: "Replace [PASTE TEXT HERE] with the letter or result, after removing private details.",
    followUpQuestion: "Can you make a list of questions I should ask my doctor about this?",
    beCareful: "Remove names, addresses, NHS numbers, patient IDs, and other private details before pasting. Confirm important information with a healthcare professional.",
  },
  {
    category: "Health Appointments and Wellbeing",
    title: "Make Notes After An Appointment",
    useWhen: "You have had an appointment and want to organise what was said.",
    copyPrompt: `Please organise my appointment notes:

[PASTE YOUR NOTES HERE]

Sort them into:
1. What the healthcare professional said
2. What I need to do next
3. Any medication or treatment mentioned
4. Questions I still have
5. Dates or follow-ups to remember`,
    changeThisPart: "Replace [PASTE YOUR NOTES HERE] with your notes from the appointment.",
    followUpQuestion: "Can you turn this into a simple action checklist?",
    beCareful: "Check your notes against any official instructions you were given.",
  },
  {
    category: "Health Appointments and Wellbeing",
    title: "Build A Simple Wellbeing Routine",
    useWhen: "You want a gentle routine for sleep, movement, stress, food, or general wellbeing.",
    copyPrompt: `Please help me create a simple wellbeing routine for [AREA OF WELLBEING].

My current situation is: [DESCRIBE YOUR SITUATION]

Make it realistic, gentle, and easy to start.`,
    changeThisPart: "Replace [AREA OF WELLBEING] with sleep, stress, movement, meals, hydration, or another wellbeing area. Replace [DESCRIBE YOUR SITUATION] with your current routine or limits.",
    followUpQuestion: "Can you make this easier by starting with only 3 small steps?",
    beCareful: "Do not use AI as a replacement for medical, mental health, diet, or fitness advice.",
  },
  {
    category: "Health Appointments and Wellbeing",
    title: "Track A Health Concern",
    useWhen: "You want to monitor something before speaking to a healthcare professional.",
    copyPrompt: `Please help me create a simple tracker for [HEALTH CONCERN / SYMPTOM].

Include:
1. What to record each day
2. When it happens
3. Possible triggers
4. Severity
5. Notes to bring to a healthcare professional`,
    changeThisPart: "Replace [HEALTH CONCERN / SYMPTOM] with what you want to track.",
    followUpQuestion: "Can you make this into a simple table I can copy?",
    beCareful: "Tracking is not treatment. If symptoms are serious, worsening, or worrying, seek medical help.",
  },
  {
    category: "Health Appointments and Wellbeing",
    title: "Prepare For A Health Phone Call",
    useWhen: "You need to call a GP surgery, clinic, pharmacy, insurer, or health service.",
    copyPrompt: `Please help me prepare for a health-related phone call about [REASON FOR CALL].

Help me with:
1. What to say first
2. What information to have ready
3. Questions to ask
4. Notes to write down
5. What to confirm before ending the call`,
    changeThisPart: "Replace [REASON FOR CALL] with why you are calling.",
    followUpQuestion: "Can you write a short phone script for me?",
    beCareful: "Do not share private medical details with AI unless you understand the risks. Keep urgent medical issues for real healthcare services.",
  },
  {
    category: "Health Appointments and Wellbeing",
    title: "Ask What To Double-Check",
    useWhen: "You have health information and want to know what needs confirming.",
    copyPrompt: `Please help me work out what I should double-check about this health information:

[PASTE OR DESCRIBE HEALTH INFORMATION]

Tell me:
1. What seems important
2. What might need confirming
3. What questions I should ask a healthcare professional
4. What I should not assume`,
    changeThisPart: "Replace [PASTE OR DESCRIBE HEALTH INFORMATION] with the information you want to understand.",
    followUpQuestion: "Can you give me the 5 most important questions to ask?",
    beCareful: "AI can help you prepare questions, but it should not be used as final medical advice.",
  },
  {
    category: "Shopping, Money and Purchases",
    title: "Compare Two Products",
    useWhen: "You are choosing between two products and want a simple comparison.",
    copyPrompt: `Please help me compare these two products:

Product 1: [PASTE OR DESCRIBE PRODUCT 1]
Product 2: [PASTE OR DESCRIBE PRODUCT 2]

Compare them in simple terms:
1. Main features
2. Pros and cons
3. Price/value
4. Who each one is best for
5. What I should check before buying`,
    changeThisPart: "Replace [Product 1] and [Product 2] with the products you are comparing.",
    followUpQuestion: "Which one seems better value based only on the information I gave you?",
    beCareful: "AI may not know current prices, stock, delivery costs, or recent reviews unless you provide them.",
  },
  {
    category: "Shopping, Money and Purchases",
    title: "Understand A Bill",
    useWhen: "You receive a bill and want to understand what it means.",
    copyPrompt: `Please explain this bill in plain English:

[PASTE BILL DETAILS HERE]

Tell me:
1. What I am being charged for
2. Any charges that seem unclear
3. What I should check
4. What questions I could ask the company`,
    changeThisPart: "Replace [PASTE BILL DETAILS HERE] with the bill text after removing private details.",
    followUpQuestion: "Can you help me write a message asking about any unclear charges?",
    beCareful: "Remove account numbers, full address, bank details, and private information before pasting.",
  },
  {
    category: "Shopping, Money and Purchases",
    title: "Check If A Purchase Is Worth It",
    useWhen: "You are thinking of buying something and want to slow down before spending.",
    copyPrompt: `Please help me decide whether this purchase is worth it:

[DESCRIBE THE PRODUCT OR SERVICE]

The price is: [PRICE]

Tell me:
1. What problem it solves
2. Whether the price seems reasonable
3. What alternatives I should consider
4. What I should check before buying`,
    changeThisPart: "Replace [DESCRIBE THE PRODUCT OR SERVICE] and [PRICE] with what you are considering buying.",
    followUpQuestion: "What questions should I ask before I buy this?",
    beCareful: "AI cannot know your full financial situation. Use this to think clearly, not as financial advice.",
  },
  {
    category: "Shopping, Money and Purchases",
    title: "Find Hidden Costs",
    useWhen: "You want to check whether a purchase, subscription, plan, or service has extra costs.",
    copyPrompt: `Please help me look for hidden costs in this offer:

[PASTE OR DESCRIBE OFFER]

Tell me:
1. Possible extra fees
2. Subscription or renewal costs
3. Cancellation terms to check
4. Delivery, setup, or service charges
5. Questions I should ask before buying`,
    changeThisPart: "Replace [PASTE OR DESCRIBE OFFER] with the offer, plan, or service.",
    followUpQuestion: "What small print should I check before paying?",
    beCareful: "Always check the official terms yourself before agreeing to a purchase or subscription.",
  },
  {
    category: "Shopping, Money and Purchases",
    title: "Compare Subscription Plans",
    useWhen: "You are choosing between subscription plans, phone plans, insurance options, software plans, memberships, or service packages.",
    copyPrompt: `Please compare these subscription plans:

Plan 1: [PASTE OR DESCRIBE PLAN 1]
Plan 2: [PASTE OR DESCRIBE PLAN 2]
Plan 3: [PASTE OR DESCRIBE PLAN 3, IF NEEDED]

Compare:
1. Monthly/yearly cost
2. What is included
3. What is missing
4. Best value
5. What I should check before choosing`,
    changeThisPart: "Replace the plan sections with the subscription options you are comparing.",
    followUpQuestion: "Which plan seems the simplest and best value for my needs?",
    beCareful: "AI may miss contract terms, price increases, exclusions, or cancellation rules.",
  },
  {
    category: "Shopping, Money and Purchases",
    title: "Summarise Reviews",
    useWhen: "You are looking at reviews and want the main themes.",
    copyPrompt: `Please summarise these customer reviews:

[PASTE REVIEWS HERE]

Tell me:
1. What people like most
2. What people complain about most
3. Any repeated problems
4. Whether the reviews seem useful or suspicious
5. What I should check before buying`,
    changeThisPart: "Replace [PASTE REVIEWS HERE] with customer reviews you want summarised.",
    followUpQuestion: "What are the biggest repeated complaints?",
    beCareful: "Reviews can be fake, biased, or outdated. Check multiple sources before buying.",
  },
  {
    category: "Shopping, Money and Purchases",
    title: "Write A Refund Request",
    useWhen: "You want to ask for a refund, return, replacement, or cancellation.",
    copyPrompt: `Please write a polite but firm refund request.

The product or service was: [PRODUCT / SERVICE]

The problem is: [DESCRIBE PROBLEM]

I would like: [REFUND / REPLACEMENT / CANCELLATION / OTHER]

Make the message clear and reasonable.`,
    changeThisPart: "Replace the bracketed sections with what you bought, what went wrong, and what you want.",
    followUpQuestion: "Can you make this firmer while staying polite?",
    beCareful: "Check the company’s refund policy before sending.",
  },
  {
    category: "Shopping, Money and Purchases",
    title: "Make A Simple Budget For A Purchase",
    useWhen: "You are planning a purchase and want to see if it fits your money situation.",
    copyPrompt: `Please help me make a simple budget for this purchase:

Purchase: [WHAT YOU WANT TO BUY]
Price: [PRICE]
My budget or monthly limit: [BUDGET / LIMIT]

Tell me:
1. Whether this seems affordable
2. What costs I should include
3. What I may need to cut back on
4. Whether I should wait before buying`,
    changeThisPart: "Replace [WHAT YOU WANT TO BUY], [PRICE], and [BUDGET / LIMIT] with your details.",
    followUpQuestion: "Can you give me a simple saving plan for this purchase?",
    beCareful: "This is not financial advice. Use it to organise your thinking, not to make major money decisions.",
  },
  {
    category: "Shopping, Money and Purchases",
    title: "Ask Better Questions Before Buying",
    useWhen: "You are interested in buying something but want to avoid mistakes.",
    copyPrompt: `Please give me a list of questions to ask before buying [PRODUCT / SERVICE].

Include questions about:
1. Price
2. Quality
3. Warranty or guarantee
4. Returns
5. Hidden costs
6. Whether it fits my needs`,
    changeThisPart: "Replace [PRODUCT / SERVICE] with what you are thinking of buying.",
    followUpQuestion: "Which 5 questions are most important to ask first?",
    beCareful: "The best questions depend on the product, so add anything specific to your situation.",
  },
  {
    category: "Shopping, Money and Purchases",
    title: "Decide Between Repairing Or Replacing",
    useWhen: "Something is broken or old and you are deciding whether to repair it or buy a new one.",
    copyPrompt: `Please help me decide whether to repair or replace [ITEM].

Here are the details:

Age of item: [AGE]
Repair cost: [REPAIR COST]
Replacement cost: [REPLACEMENT COST]
Problem: [DESCRIBE PROBLEM]

Compare:
1. Cost
2. Convenience
3. Risks
4. Long-term value
5. What I should check before deciding`,
    changeThisPart: "Replace the bracketed sections with the item and details.",
    followUpQuestion: "What would make repair the better choice, and what would make replacement the better choice?",
    beCareful: "Check with a qualified repair person before making expensive decisions.",
  },
  {
    category: "Family, Hobbies and Personal Life",
    title: "Write A Birthday Or Special Occasion Message",
    useWhen: "You want to write a thoughtful message but do not know how to phrase it.",
    copyPrompt: `Please write a warm message for [OCCASION].

It is for [PERSON].

I want it to sound [WARM / FUNNY / SIMPLE / HEARTFELT / CASUAL].

Include this detail if it helps:
[PERSONAL DETAIL]`,
    changeThisPart: "Replace [OCCASION], [PERSON], [STYLE], and [PERSONAL DETAIL] with your details.",
    followUpQuestion: "Can you make it shorter and more personal?",
    beCareful: "Read it before sending to make sure it sounds like you.",
  },
  {
    category: "Family, Hobbies and Personal Life",
    title: "Plan A Family Visit Or Gathering",
    useWhen: "You want to organise a family meal, visit, birthday, outing, or get-together.",
    copyPrompt: `Please help me plan [FAMILY VISIT / MEAL / GATHERING / OUTING].

The people coming are: [WHO IS COMING]

The date or timeframe is: [DATE / TIMEFRAME]

Help me plan:
1. What needs organising
2. Food, travel, or timing notes
3. What to prepare beforehand
4. A simple checklist`,
    changeThisPart: "Replace the bracketed sections with your event details.",
    followUpQuestion: "Can you make this into a simple checklist for the day before and the day itself?",
    beCareful: "Check real travel times, dietary needs, bookings, and availability yourself.",
  },
  {
    category: "Family, Hobbies and Personal Life",
    title: "Create Meal Ideas",
    useWhen: "You want ideas for meals based on what you like, what you have, or who you are cooking for.",
    copyPrompt: `Please suggest meal ideas based on this:

Food I have: [LIST FOOD YOU HAVE]
People eating: [WHO IS EATING]
Preferences or limits: [DIET / BUDGET / TIME / LIKES / DISLIKES]

Give me simple ideas that are realistic to make.`,
    changeThisPart: "Replace the bracketed sections with your food, people, and preferences.",
    followUpQuestion: "Can you turn one of these ideas into a simple step-by-step recipe?",
    beCareful: "Check allergies, dietary needs, cooking times, and food safety yourself.",
  },
  {
    category: "Family, Hobbies and Personal Life",
    title: "Find Ideas For A Hobby",
    useWhen: "You want to start or enjoy a hobby but need ideas.",
    copyPrompt: `Please suggest hobby ideas for me.

I am interested in: [INTERESTS]

My budget is: [BUDGET]

My energy/time level is: [LOW / MEDIUM / HIGH]

I prefer something [AT HOME / OUTDOORS / SOCIAL / QUIET / CREATIVE / PRACTICAL].`,
    changeThisPart: "Replace the bracketed sections with your interests and preferences.",
    followUpQuestion: "Can you give me 5 easy first steps to try one of these hobbies?",
    beCareful: "AI may suggest things that are not available locally, so check what is realistic for your area.",
  },
  {
    category: "Family, Hobbies and Personal Life",
    title: "Plan A Personal Project",
    useWhen: "You want to organise a personal project like decorating, sorting photos, writing memories, gardening, genealogy, or decluttering.",
    copyPrompt: `Please help me plan this personal project:

[DESCRIBE PROJECT]

Help me with:
1. The main steps
2. What I need
3. What to do first
4. How to make it manageable
5. A simple checklist`,
    changeThisPart: "Replace [DESCRIBE PROJECT] with the project you want to complete.",
    followUpQuestion: "Can you break this into small steps I can do over a week?",
    beCareful: "Keep the plan realistic. AI may make projects seem quicker or easier than they are.",
  },
  {
    category: "Family, Hobbies and Personal Life",
    title: "Write A Message To Family Or Friends",
    useWhen: "You want to send a personal message but are not sure how to say it.",
    copyPrompt: `Please help me write a message to [PERSON].

I want to say:
[WHAT YOU WANT TO SAY]

Make it sound [KIND / CLEAR / CASUAL / SUPPORTIVE / APOLOGETIC / GRATEFUL].`,
    changeThisPart: "Replace [PERSON], [WHAT YOU WANT TO SAY], and [STYLE] with your details.",
    followUpQuestion: "Can you make it sound more natural and less formal?",
    beCareful: "AI does not know your relationship fully, so adjust anything that feels wrong.",
  },
  {
    category: "Family, Hobbies and Personal Life",
    title: "Get Ideas For A Day Out Or Activity",
    useWhen: "You want ideas for something to do alone, with family, with friends, or with grandchildren.",
    copyPrompt: `Please suggest ideas for [A DAY OUT / ACTIVITY].

It is for: [WHO IT IS FOR]

Location: [AREA OR TYPE OF PLACE]

Budget: [BUDGET]

Preferences: [QUIET / ACTIVE / EDUCATIONAL / FUN / LOW-COST / INDOORS / OUTDOORS]`,
    changeThisPart: "Replace the bracketed sections with who it is for, where, budget, and preferences.",
    followUpQuestion: "Can you make a simple plan for one of these ideas?",
    beCareful: "Check opening times, prices, accessibility, travel, and weather before going.",
  },
  {
    category: "Family, Hobbies and Personal Life",
    title: "Write Down A Memory Or Story",
    useWhen: "You want help turning a memory into a written story, note, or family keepsake.",
    copyPrompt: `Please help me turn this memory into a short written story:

[DESCRIBE MEMORY]

Make it warm, clear, and easy to read.

Keep my meaning, but improve the wording.`,
    changeThisPart: "Replace [DESCRIBE MEMORY] with the memory you want to write about.",
    followUpQuestion: "Can you make it sound more like a personal story I could share with family?",
    beCareful: "Check names, dates, places, and details yourself.",
  },
  {
    category: "Family, Hobbies and Personal Life",
    title: "Create Conversation Starters",
    useWhen: "You want ideas for things to talk about with family, friends, grandchildren, neighbours, or new people.",
    copyPrompt: `Please give me conversation starters for [PERSON / GROUP / SITUATION].

I want the conversation to feel [LIGHT / MEANINGFUL / FUN / EASY / SUPPORTIVE].

Give me simple questions or topics I could use.`,
    changeThisPart: "Replace [PERSON / GROUP / SITUATION] and [STYLE] with your details.",
    followUpQuestion: "Can you make these more natural and less forced?",
    beCareful: "Choose questions that fit the relationship and situation.",
  },
  {
    category: "Family, Hobbies and Personal Life",
    title: "Organise Personal Notes Or Ideas",
    useWhen: "You have personal notes, ideas, plans, recipes, memories, hobby notes, or family information that feel messy.",
    copyPrompt: `Please organise these notes clearly:

[PASTE NOTES HERE]

Sort them into useful sections and give me a simple summary.

Also tell me if there are any actions I should take.`,
    changeThisPart: "Replace [PASTE NOTES HERE] with your notes or ideas.",
    followUpQuestion: "Can you turn this into a simple list of next steps?",
    beCareful: "Remove private details if you do not want them shared, and check that AI has not changed the meaning.",
  },
  {
    category: "Explaining Confusing Things",
    title: "Tell Me What I Need To Do Next",
    useWhen: "You understand something partly, but are not sure what action to take.",
    copyPrompt: `Please help me understand what I should do next.

Here is the situation:

[DESCRIBE SITUATION OR PASTE TEXT]

Tell me:
- What is happening
- What my possible next steps are
- What I should check before acting
- What I should not rush into`,
    changeThisPart: "Replace [DESCRIBE SITUATION OR PASTE TEXT] with the situation you need help with.",
    followUpQuestion: "Can you turn this into a simple step-by-step checklist?",
    beCareful: "For serious matters, use this to prepare, then check with a qualified person.",
  },
  {
    category: "Explaining Confusing Things",
    title: "Tell Me What Is Still Unclear",
    useWhen: "You want to know what you might be missing or what questions to ask next.",
    copyPrompt: `Please look at this and tell me what is unclear or what I should ask next:

[PASTE TEXT OR DESCRIBE SITUATION]

Tell me:
- What information is missing
- What questions I should ask
- What I should double-check
- What could be misunderstood`,
    changeThisPart: "Replace [PASTE TEXT OR DESCRIBE SITUATION] with the thing you are trying to understand.",
    followUpQuestion: "Can you give me the 3 most important questions to ask about this?",
    beCareful: "AI can help spot gaps, but it may also miss important details.",
  },
];

export default function AZLibraryTemplate() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [openPromptTitle, setOpenPromptTitle] = useState(null);
  const [copiedPromptTitle, setCopiedPromptTitle] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeView, setActiveView] = useState("library");
  const [builderPasswordInput, setBuilderPasswordInput] = useState("");
  const [builderUnlocked, setBuilderUnlocked] = useState(false);
  const [builderPasswordError, setBuilderPasswordError] = useState("");

  useEffect(() => {
    try {
      setBuilderUnlocked(window.localStorage.getItem(BUILDER_UNLOCK_KEY) === "true");
    } catch {
      setBuilderUnlocked(false);
    }
  }, []);

  const visiblePrompts = useMemo(
    () => {
      const normalizedQuery = searchQuery.trim().toLowerCase();

      if (!normalizedQuery) {
        return starterPrompts.filter((prompt) => prompt.category === activeCategory);
      }

      return starterPrompts.filter((prompt) =>
        [prompt.title, prompt.useWhen, prompt.copyPrompt, prompt.category]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery)
      );
    },
    [activeCategory, searchQuery]
  );

  const copyPrompt = async (title, text) => {
    await navigator.clipboard.writeText(text);
    setCopiedPromptTitle(title);
    setTimeout(() => setCopiedPromptTitle(null), 1600);
  };

  const unlockBuilder = (event) => {
    event.preventDefault();

    if (builderPasswordInput === BUILDER_PASSWORD) {
      setBuilderUnlocked(true);
      setBuilderPasswordError("");
      setBuilderPasswordInput("");

      try {
        window.localStorage.setItem(BUILDER_UNLOCK_KEY, "true");
      } catch {
        // ignore storage failures in quick-lock mode
      }
      return;
    }

    setBuilderPasswordError("That password is not correct.");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#FAF6F1", fontFamily: "'DM Sans', sans-serif", color: "#2D2A33" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;700&family=Space+Mono:wght@400;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        body { margin: 0; }
        button { font-family: inherit; }
        .category-pill { transition: all 0.18s ease; }
        .category-pill:hover { transform: translateY(-1px); }
        .help-links a { transition: all 0.18s ease; }
        .help-links a:hover { transform: translateY(-1px); }
        .help-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          min-height: 42px;
          padding: 0 14px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.18);
          background: rgba(255,255,255,0.08);
          color: #FFFFFF;
          font-size: 12px;
          font-weight: 700;
          text-decoration: none;
          white-space: nowrap;
        }
        .help-link-icon {
          width: 16px;
          height: 16px;
          flex: 0 0 auto;
        }
        .top-nav-button {
          transition: all 0.18s ease;
        }
        .top-nav-button:hover {
          transform: translateY(-1px);
        }
        .mobile-search-toggle,
        .mobile-search-panel {
          display: none;
        }
        .library-shell {
          max-width: 760px;
          margin: 0 auto;
          padding: 26px 20px 48px;
        }
        .category-scroll {
          display: flex;
          gap: 10px;
          flex-wrap: nowrap;
          justify-content: flex-start;
          overflow-x: auto;
          width: min(1120px, calc(100vw - 40px));
          position: relative;
          left: 50%;
          transform: translateX(-50%);
          margin: 0 0 28px;
          padding: 0 4px 8px;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .category-scroll::-webkit-scrollbar {
          display: none;
        }
        .category-pill {
          flex: 0 0 auto;
          white-space: nowrap;
        }

        @media (max-width: 640px) {
          .library-header {
            padding: 24px 16px 28px !important;
          }
          .library-shell {
            padding: 26px 20px 48px;
          }
          .top-nav {
            position: static !important;
            justify-content: flex-start;
            margin: 0 52px 18px 0;
          }
          .help-panel {
            position: static !important;
            margin: 0 0 22px;
            text-align: left !important;
          }
          .help-links {
            display: flex;
            gap: 8px;
            align-items: center;
            flex-wrap: nowrap;
          }
          .help-link {
            min-height: 38px;
            padding: 0 12px;
          }
          .category-scroll {
            position: static;
            left: auto;
            transform: none;
            width: auto;
            margin-left: -20px;
            margin-right: -20px;
            padding: 0 20px 6px;
          }
          .mobile-search-toggle {
            display: inline-flex;
            position: absolute;
            top: 16px;
            right: 16px;
            align-items: center;
            justify-content: center;
            min-width: 40px;
            min-height: 40px;
            border: 1px solid rgba(255,255,255,0.18);
            border-radius: 999px;
            background: rgba(255,255,255,0.08);
            color: #FFFFFF;
            font-size: 18px;
            cursor: pointer;
          }

          .mobile-search-panel {
            display: block;
            max-height: 0;
            overflow: hidden;
            opacity: 0;
            transition: all 0.2s ease;
          }

          .mobile-search-panel.is-open {
            max-height: 64px;
            opacity: 1;
            margin: 0 0 18px;
          }

          .mobile-search-input {
            width: 100%;
            min-height: 44px;
            border: 1px solid rgba(255,255,255,0.18);
            border-radius: 999px;
            padding: 0 16px;
            background: rgba(255,255,255,0.08);
            color: #FFFFFF;
            outline: none;
          }

          .mobile-search-input::placeholder {
            color: #C5C0CC;
          }
        }
      `}</style>

      <header className="library-header" style={{ background: "linear-gradient(135deg, #1E1B2E, #2A2540)", padding: "48px 20px 34px", textAlign: "center", position: "relative" }}>
        <div className="top-nav" style={{ position: "absolute", top: 18, left: 20, display: "flex", gap: 8 }}>
          <button
            type="button"
            className="top-nav-button"
            onClick={() => setActiveView("library")}
            style={{
              border: "1px solid rgba(255,255,255,0.18)",
              background: activeView === "library" ? "#FFFFFF" : "rgba(255,255,255,0.08)",
              color: activeView === "library" ? "#1E1B2E" : "#FFFFFF",
              borderRadius: 999,
              minHeight: 38,
              padding: "0 14px",
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Prompt pack
          </button>
          <button
            type="button"
            className="top-nav-button"
            onClick={() => setActiveView("guide")}
            style={{
              border: "1px solid rgba(255,255,255,0.18)",
              background: activeView === "guide" ? "#FFFFFF" : "rgba(255,255,255,0.08)",
              color: activeView === "guide" ? "#1E1B2E" : "#FFFFFF",
              borderRadius: 999,
              minHeight: 38,
              padding: "0 14px",
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            How to use
          </button>
          <button
            type="button"
            className="top-nav-button"
            onClick={() => setActiveView("builder")}
            style={{
              border: "1px solid rgba(255,255,255,0.18)",
              background: activeView === "builder" ? "#FFFFFF" : "rgba(255,255,255,0.08)",
              color: activeView === "builder" ? "#1E1B2E" : "#FFFFFF",
              borderRadius: 999,
              minHeight: 38,
              padding: "0 14px",
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Builder
          </button>
        </div>
        <button
          className="mobile-search-toggle"
          type="button"
          aria-label={searchOpen ? "Close search" : "Open search"}
          aria-expanded={searchOpen}
          onClick={() => setSearchOpen((value) => !value)}
        >
          ⌕
        </button>
        <div
          className="help-panel"
          style={{
            position: "absolute",
            top: 18,
            right: 20,
            textAlign: "right",
            color: "#FFFFFF",
          }}
        >
          <p style={{ margin: "0 0 6px", fontSize: 12, fontWeight: 700 }}>Want 1:1 AI Help?</p>
          <div className="help-links">
            <a className="help-link" href="mailto:adsbyalfred@protonmail.com">
              <svg className="help-link-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 6.5h16A1.5 1.5 0 0 1 21.5 8v8A1.5 1.5 0 0 1 20 17.5H4A1.5 1.5 0 0 1 2.5 16V8A1.5 1.5 0 0 1 4 6.5Z" stroke="currentColor" strokeWidth="1.8" />
                <path d="m3.5 7.5 8.5 6 8.5-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Email
            </a>
            <a className="help-link" href="https://wa.me/447428523955" target="_blank" rel="noreferrer">
              <svg className="help-link-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 4.5A7.5 7.5 0 0 0 6.2 16.7L5.5 20l3.5-.7A7.5 7.5 0 1 0 12 4.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                <path d="M9.3 9.6c.2-.4.4-.5.7-.5h.7c.2 0 .5.1.7.4l.9 1.4c.1.2.1.4 0 .6l-.5.7c-.1.1-.1.3 0 .5.3.6.8 1.2 1.3 1.7.2.2.4.2.6.1l.8-.4c.2-.1.4-.1.6 0l1.5.8c.3.1.4.4.4.7 0 1-.8 1.7-1.8 1.7-4.2 0-7.6-3.4-7.6-7.6 0-1 .8-1.7 1.8-1.7.3 0 .5.1.7.4l.5 1.1Z" fill="currentColor" />
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
        <div className={`mobile-search-panel ${searchOpen ? "is-open" : ""}`}>
          <input
            className="mobile-search-input"
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search prompts"
            aria-label="Search prompts"
          />
        </div>
        <p style={{ margin: "0 0 14px", fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#E8845C" }}>
          {LIBRARY_CONFIG.subtitle}
        </p>
        <h1 style={{ margin: "0 0 14px", fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 5vw, 42px)", color: "#FFFFFF" }}>
          {LIBRARY_CONFIG.title}
        </h1>
        <p style={{ maxWidth: 560, margin: "0 auto", color: "#C5C0CC", lineHeight: 1.6 }}>
          {LIBRARY_CONFIG.description}
        </p>
      </header>

      <main className="library-shell">
        {activeView === "guide" ? (
          <section style={{ display: "grid", gap: 18 }}>
            <div>
              <p style={{ margin: "0 0 6px", fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: "#E8845C" }}>
                Start here
              </p>
              <h2 style={{ margin: "0 0 10px", fontFamily: "'Playfair Display', serif", fontSize: 30 }}>
                How to use your prompt pack
              </h2>
              <p style={{ margin: 0, lineHeight: 1.7, color: "#4A4555" }}>
                If you have never used AI before, you are in the right place. This page walks you from installing ChatGPT to sending your first useful prompt.
              </p>
            </div>

            {[
              {
                title: "1. Install ChatGPT",
                body: (
                  <>
                    Open the official ChatGPT download page, choose the version for your device, then create or sign in to your account.
                    <div style={{ marginTop: 12 }}>
                      <a href="https://openai.com/chatgpt/download/" target="_blank" rel="noreferrer" style={{ color: "#FFFFFF", background: "#7C6BC4", textDecoration: "none", display: "inline-flex", alignItems: "center", minHeight: 42, padding: "0 16px", borderRadius: 999, fontWeight: 700 }}>
                        Get ChatGPT
                      </a>
                    </div>
                  </>
                ),
              },
              {
                title: "2. Know what a prompt is",
                body: "A prompt is simply the message you type into ChatGPT. It can be a question, an instruction, or a piece of information you want help with. Example: “Explain this letter in plain English.”",
              },
              {
                title: "3. What you bought",
                body: "This pack is a library of ready-made prompts for everyday situations: confusing letters, messages, decisions, forms, scams, and more. You do not need to invent the wording yourself — you choose the closest prompt and use it as your starting point.",
              },
              {
                title: "4. How to use a prompt from the pack",
                body: "Open a category, choose a prompt, tap it open, then copy the prompt text. Paste it into ChatGPT. Replace any words in square brackets with your own details before sending it.",
              },
              {
                title: "5. Your first run-through",
                body: "Example: if you receive a letter you do not understand, open “Explaining Confusing Things,” choose a prompt about explaining text, copy it, paste the letter where the prompt asks, then send it. ChatGPT replies with a clearer explanation you can read and ask follow-up questions about.",
              },
              {
                title: "6. A few good habits",
                body: "Do not share passwords, bank details, or anything highly private. If an answer matters a lot — money, health, legal issues, safety — use ChatGPT to help you understand, then check with a trusted person or professional before acting.",
              },
            ].map((step) => (
              <article
                key={step.title}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid rgba(45,42,51,0.08)",
                  borderRadius: 18,
                  padding: 20,
                  boxShadow: "0 1px 4px rgba(45,42,51,0.04)",
                }}
              >
                <h3 style={{ margin: "0 0 10px", fontFamily: "'Playfair Display', serif", fontSize: 22 }}>
                  {step.title}
                </h3>
                <div style={{ lineHeight: 1.7, color: "#4A4555" }}>{step.body}</div>
              </article>
            ))}

            <article
              style={{
                background: "#1E1B2E",
                color: "#FFFFFF",
                borderRadius: 22,
                padding: 22,
              }}
            >
              <p style={{ margin: "0 0 8px", fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: "#E8845C" }}>
                Try this first
              </p>
              <h3 style={{ margin: "0 0 10px", fontFamily: "'Playfair Display', serif", fontSize: 24 }}>
                Send one simple prompt now
              </h3>
              <p style={{ margin: "0 0 16px", lineHeight: 1.7, color: "#C5C0CC" }}>
                Copy this into ChatGPT exactly as it is. It is a safe first test, and it shows you how AI responds to a clear instruction.
              </p>
              <div
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 16,
                  padding: 16,
                  lineHeight: 1.7,
                  marginBottom: 16,
                }}
              >
                Please explain what a prompt is in very simple language, as if I have never used AI before.
              </div>
              <button
                type="button"
                onClick={() =>
                  copyPrompt(
                    "first beginner prompt",
                    "Please explain what a prompt is in very simple language, as if I have never used AI before."
                  )
                }
                style={{
                  border: "none",
                  background: copiedPromptTitle === "first beginner prompt" ? "#FFFFFF" : "#E8845C",
                  color: copiedPromptTitle === "first beginner prompt" ? "#1E1B2E" : "#FFFFFF",
                  borderRadius: 999,
                  minHeight: 44,
                  padding: "0 18px",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {copiedPromptTitle === "first beginner prompt" ? "Copied" : "Copy first prompt"}
              </button>
            </article>
          </section>
        ) : activeView === "builder" ? (
          <section style={{ display: "grid", gap: 18 }}>
            <div
              style={{
                background: "#FFFFFF",
                border: "1px solid rgba(45,42,51,0.08)",
                borderRadius: 18,
                padding: 22,
                boxShadow: "0 1px 4px rgba(45,42,51,0.04)",
              }}
            >
              <p style={{ margin: "0 0 6px", fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: "#E8845C" }}>
                New subproduct preview
              </p>
              <h2 style={{ margin: "0 0 10px", fontFamily: "'Playfair Display', serif", fontSize: 30 }}>
                Custom Prompt Builder
              </h2>
              <p style={{ margin: 0, lineHeight: 1.7, color: "#4A4555", maxWidth: 720 }}>
                This takes the pack one step further. Instead of only choosing from pre-written prompts, the buyer can answer a few guided questions and generate a custom prompt tailored to their exact task, audience, format, and constraints.
              </p>
            </div>
            {builderUnlocked ? (
              <PromptBuilder />
            ) : (
              <article
                style={{
                  background: "#FFFFFF",
                  border: "1px solid rgba(45,42,51,0.08)",
                  borderRadius: 18,
                  padding: 24,
                  boxShadow: "0 1px 4px rgba(45,42,51,0.04)",
                }}
              >
                <p style={{ margin: "0 0 6px", fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: "#E8845C" }}>
                  Locked subproduct
                </p>
                <h3 style={{ margin: "0 0 10px", fontFamily: "'Playfair Display', serif", fontSize: 28 }}>
                  Enter password to open the Builder
                </h3>
                <p style={{ margin: "0 0 18px", lineHeight: 1.7, color: "#4A4555", maxWidth: 560 }}>
                  This is a lightweight client-side lock for now, useful for separating the Builder from the main pack while we test the product shape.
                </p>
                <form onSubmit={unlockBuilder} style={{ display: "grid", gap: 12, maxWidth: 420 }}>
                  <input
                    type="password"
                    value={builderPasswordInput}
                    onChange={(event) => {
                      setBuilderPasswordInput(event.target.value);
                      if (builderPasswordError) setBuilderPasswordError("");
                    }}
                    placeholder="Enter builder password"
                    aria-label="Builder password"
                    style={{
                      width: "100%",
                      minHeight: 46,
                      border: "1px solid rgba(45,42,51,0.12)",
                      borderRadius: 999,
                      padding: "0 16px",
                      background: "#FFFFFF",
                      color: "#2D2A33",
                      outline: "none",
                      fontSize: 14,
                    }}
                  />
                  <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                    <button
                      type="submit"
                      style={{
                        border: "none",
                        background: "#1E1B2E",
                        color: "#FFFFFF",
                        borderRadius: 999,
                        minHeight: 44,
                        padding: "0 18px",
                        fontSize: 14,
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      Unlock Builder
                    </button>
                    {builderPasswordError ? (
                      <span style={{ color: "#A03D3D", fontSize: 13 }}>{builderPasswordError}</span>
                    ) : null}
                  </div>
                </form>
              </article>
            )}
          </section>
        ) : (
          <>
        <nav className="category-scroll" aria-label="Prompt categories">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                className="category-pill"
                onClick={() => setActiveCategory(category)}
                aria-pressed={isActive}
                style={{
                  border: "1px solid " + (isActive ? "#E8845C" : "rgba(45,42,51,0.12)"),
                  background: isActive ? "#E8845C" : "#FFFFFF",
                  color: isActive ? "#FFFFFF" : "#4A4555",
                  borderRadius: 999,
                  padding: "11px 16px",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {category}
              </button>
            );
          })}
        </nav>

        <section aria-live="polite">
          <div style={{ marginBottom: 18 }}>
            <p style={{ margin: "0 0 6px", fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: "#E8845C" }}>
              {activeCategory}
            </p>
            <h2 style={{ margin: 0, fontFamily: "'Playfair Display', serif", fontSize: 28 }}>
              {searchQuery.trim() ? `${visiblePrompts.length} results` : "10 prompts"}
            </h2>
          </div>

          <div style={{ display: "grid", gap: 14 }}>
            {visiblePrompts.map((item, index) => {
              const isOpen = openPromptTitle === item.title;
              return (
              <article
                key={item.title}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid rgba(45,42,51,0.08)",
                  borderRadius: 18,
                  padding: 20,
                  boxShadow: "0 1px 4px rgba(45,42,51,0.04)",
                }}
              >
                <button
                  onClick={() => setOpenPromptTitle(isOpen ? null : item.title)}
                  aria-expanded={isOpen}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 16,
                    border: "none",
                    background: "transparent",
                    padding: 0,
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <div>
                    <p style={{ margin: "0 0 8px", fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#7C6BC4" }}>
                      Prompt {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 style={{ margin: 0, fontFamily: "'Playfair Display', serif", fontSize: 20, color: "#2D2A33" }}>
                      {item.title}
                    </h3>
                  </div>
                  <span style={{ fontSize: 18, color: "#E8845C", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.18s ease" }}>
                    ▼
                  </span>
                </button>

                {isOpen && item.useWhen ? (
                  <div style={{ display: "grid", gap: 14, marginTop: 18 }}>
                    <section style={{ paddingTop: 14, borderTop: "1px solid rgba(45,42,51,0.08)" }}>
                      <p style={{ margin: "0 0 6px", fontFamily: "'Space Mono', monospace", fontSize: 11, textTransform: "uppercase", letterSpacing: 1.2, color: "#E8845C" }}>
                        Use this when
                      </p>
                      <p style={{ margin: 0, lineHeight: 1.7, color: "#4A4555" }}>{item.useWhen}</p>
                    </section>

                    <section style={{ paddingTop: 14, borderTop: "1px solid rgba(45,42,51,0.08)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 8 }}>
                        <p style={{ margin: 0, fontFamily: "'Space Mono', monospace", fontSize: 11, textTransform: "uppercase", letterSpacing: 1.2, color: "#E8845C" }}>
                          Copy-paste prompt
                        </p>
                        <button
                          onClick={() => copyPrompt(item.title, item.copyPrompt)}
                          style={{
                            border: "1px solid rgba(45,42,51,0.12)",
                            background: copiedPromptTitle === item.title ? "#4CAF80" : "#FFFFFF",
                            color: copiedPromptTitle === item.title ? "#FFFFFF" : "#4A4555",
                            borderRadius: 999,
                            padding: "7px 11px",
                            fontSize: 12,
                            fontWeight: 700,
                            cursor: "pointer",
                          }}
                        >
                          {copiedPromptTitle === item.title ? "Copied" : "Copy prompt"}
                        </button>
                      </div>
                      <div style={{ whiteSpace: "pre-line", lineHeight: 1.7, color: "#2D2A33", background: "#FAF6F1", borderRadius: 14, padding: 16 }}>
                        {item.copyPrompt}
                      </div>
                    </section>

                    <section style={{ paddingTop: 14, borderTop: "1px solid rgba(45,42,51,0.08)" }}>
                      <p style={{ margin: "0 0 6px", fontFamily: "'Space Mono', monospace", fontSize: 11, textTransform: "uppercase", letterSpacing: 1.2, color: "#7C6BC4" }}>
                        Change this part
                      </p>
                      <p style={{ margin: 0, lineHeight: 1.7, color: "#4A4555" }}>{item.changeThisPart}</p>
                    </section>

                    <section style={{ paddingTop: 14, borderTop: "1px solid rgba(45,42,51,0.08)" }}>
                      <p style={{ margin: "0 0 6px", fontFamily: "'Space Mono', monospace", fontSize: 11, textTransform: "uppercase", letterSpacing: 1.2, color: "#4CAF80" }}>
                        Follow-up question
                      </p>
                      <p style={{ margin: 0, lineHeight: 1.7, color: "#4A4555" }}>{item.followUpQuestion}</p>
                    </section>

                    <section style={{ paddingTop: 14, borderTop: "1px solid rgba(45,42,51,0.08)" }}>
                      <p style={{ margin: "0 0 6px", fontFamily: "'Space Mono', monospace", fontSize: 11, textTransform: "uppercase", letterSpacing: 1.2, color: "#B85C5C" }}>
                        Be careful
                      </p>
                      <p style={{ margin: 0, lineHeight: 1.7, color: "#4A4555" }}>{item.beCareful}</p>
                    </section>
                  </div>
                ) : isOpen ? (
                  <p style={{ margin: "18px 0 0", lineHeight: 1.7, color: "#4A4555" }}>
                    {item.prompt}
                  </p>
                ) : null}
              </article>
            )})}
          </div>
        </section>
          </>
        )}
      </main>
    </div>
  );
}
