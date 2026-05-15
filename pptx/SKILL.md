---
name: pitch-deck
description: "Use this skill whenever the user wants to create a pitch deck, investor presentation, sales deck, client proposal, or strategy presentation as a .pptx file. Triggers include: 'pitch deck', 'investor deck', 'sales deck', 'fundraising slides', 'demo day deck', 'client proposal', 'strategy presentation', 'Series A/B/C deck', 'startup pitch', or any request for a persuasive presentation meant to convince an audience (investors, clients, executives, or stakeholders). This skill builds on the pptx skill and adds pitch-specific narrative structure, slide blueprints, storytelling frameworks, and design guidance tailored to persuasive business presentations. Always read pptx/SKILL.md alongside this skill."
---

# Pitch Deck Skill

## Quick Reference

| Pitch Type           | Core Narrative Arc                          | Key Slides                                           |
|----------------------|---------------------------------------------|------------------------------------------------------|
| Startup / Investor   | Problem → Solution → Market → Traction      | Problem, Solution, Market Size, Business Model, Team |
| Sales / Client       | Pain → Proof → Fit → CTA                   | Pain Point, Case Studies, Offering, Pricing, Next Steps |
| Internal / Strategy  | Situation → Complication → Resolution       | Context, Challenge, Options, Recommendation, Roadmap |

---

## Step 0 — Gather Context Before Building

Before writing a single slide, extract or ask for:

1. **Pitch type** — Investor, Sales, or Internal/Strategy?
2. **Audience** — Who is in the room? (VCs, enterprise buyers, C-suite, board?)
3. **Stage** — Early idea, MVP, growth-stage, enterprise?
4. **Key ask** — Raise amount, contract value, budget approval, headcount?
5. **Company/product** — Name, one-line description, industry
6. **Differentiator** — What makes this unique or defensible?
7. **Traction** — Revenue, users, growth rate, notable customers, pilots
8. **Team** — Founders/leads and their relevant backgrounds
9. **Brand** — Logo, colors, preferred fonts? (If none, choose a palette from pptx/SKILL.md)

If information is missing, make reasonable, clearly-labeled placeholder assumptions and note them for the user.

---

## Slide Blueprints by Pitch Type

### 1. Startup / Investor Pitch (10–14 slides)

Follow the proven VC narrative arc: create emotional resonance before showing numbers.

| # | Slide | Purpose | Key Elements |
|---|-------|---------|--------------|
| 1 | **Cover** | First impression | Company name, tagline, logo, presenter name, date |
| 2 | **The Problem** | Create urgency | 1–3 pain points, relatable story or stat, "who suffers" |
| 3 | **The Solution** | The hero moment | Product screenshot or mockup, 1-sentence description, "how it works" |
| 4 | **Why Now** | Timing catalyst | Market shift, regulation, tech unlock, cultural change |
| 5 | **Market Size** | Show the prize | TAM / SAM / SOM with sources, bottom-up preferred |
| 6 | **Product Deep Dive** | Build conviction | Demo, core features, UX screenshots, key differentiators |
| 7 | **Business Model** | How you make money | Revenue streams, pricing model, unit economics if available |
| 8 | **Traction** | Proof it's real | Key metrics, growth chart, logos, MoM %, retention |
| 9 | **Go-to-Market** | Growth engine | Channels, CAC/LTV, partnerships, land-and-expand |
| 10 | **Competition** | Positioning | 2×2 matrix or competitive table, "why we win" |
| 11 | **Team** | Bet on people | Photos, names, titles, relevant prior wins |
| 12 | **Financials** | The numbers | 3–5 year projections, key assumptions, path to profitability |
| 13 | **The Ask** | Close the room | Raise amount, use of funds (pie chart), milestones unlocked |
| 14 | **Appendix** | Leave-behind | Detailed financials, technical architecture, customer quotes |

### 2. Sales / Client Pitch (8–12 slides)

Buyer-centric: make them feel understood before pitching.

| # | Slide | Purpose | Key Elements |
|---|-------|---------|--------------|
| 1 | **Cover** | Brand trust | Company name, client name (personalized!), date, presenter |
| 2 | **About Us** | Credibility | Founded, HQ, team size, notable clients/logos |
| 3 | **We Understand Your Pain** | Empathy | Mirror their specific challenges back; use their industry language |
| 4 | **The Cost of Inaction** | Urgency | What happens if they do nothing? (lost revenue, risk, inefficiency) |
| 5 | **Our Solution** | The pitch | Product/service overview tailored to their use case |
| 6 | **How It Works** | De-risk | Process, timeline, implementation, integrations |
| 7 | **Case Studies / Proof** | Social proof | 2–3 customer stories with measurable outcomes |
| 8 | **Why Us** | Differentiation | Competitive advantages, awards, certifications, SLAs |
| 9 | **Pricing / Packages** | Anchor value | Tiered options, ROI framing, "most popular" flag |
| 10 | **Implementation Plan** | Reduce friction | Onboarding steps, timeline, dedicated support |
| 11 | **Next Steps** | Clear CTA | Pilot offer, contract terms, contact info |
| 12 | **Appendix** | Leave-behind | Full feature list, security docs, testimonials |

### 3. Internal / Strategy Pitch (8–12 slides)

Use the McKinsey Situation–Complication–Resolution (SCR) framework.

| # | Slide | Purpose | Key Elements |
|---|-------|---------|--------------|
| 1 | **Cover** | Context | Project name, presenter, date, executive sponsor |
| 2 | **Executive Summary** | BLUF (Bottom Line Up Front) | 3–5 bullet summary of recommendation + key numbers |
| 3 | **Situation** | Shared baseline | What do we know? Current state, background, data |
| 4 | **Complication** | The burning platform | What's the problem/risk/opportunity? Why does it matter now? |
| 5 | **Options Considered** | Show rigor | 2–3 alternatives with pros/cons or decision matrix |
| 6 | **Recommendation** | The answer | Clear choice, rationale, supporting data |
| 7 | **Financial Impact** | Business case | Cost, savings, ROI, payback period, NPV if applicable |
| 8 | **Implementation Roadmap** | Make it real | Phased plan, milestones, owners, timeline (Gantt or swimlane) |
| 9 | **Risks & Mitigations** | Address objections | Risk register or 2×2 (likelihood × impact), mitigation actions |
| 10 | **Resource Requirements** | What we need | Headcount, budget, tools, external partners |
| 11 | **Decision Required** | The ask | Specific approval needed, deadline, decision owners |
| 12 | **Appendix** | Supporting detail | Full analysis, raw data, methodology |

---

## Slide-Level Design Patterns for Pitch Decks

### Cover Slide
- Dark background (navy, charcoal, or deep brand color) — signals premium
- Large logo centered or upper-left
- Bold tagline below company name (max 10 words)
- Subtle texture or abstract shape for visual depth
- Presenter name + date in small type at bottom

### Problem Slide
- Lead with a story or a shocking stat in large type (60–72pt number)
- Use 3-column icon layout: one pain point per column
- Avoid bullet lists — icons + short headers + 1-sentence explanations read better
- Red or warning-tone accent color reinforces urgency

### Market Size (TAM/SAM/SOM)
- Use concentric circles or nested rectangles — never just 3 numbers in bullets
- Label each ring with the $ figure and a brief definition
- Source every number (footnote with year)
- Bottom-up calculation > top-down for credibility

### Traction Slide
- Growth chart is mandatory if you have revenue or user growth
- Big number callouts: "3× MoM", "$2.4M ARR", "87% retention"
- Customer logo strip if you have recognizable names
- Keep it to 3–5 metrics max — don't dilute with vanity metrics

### Team Slide
- Circular or rounded headshot photos (professional, not LinkedIn selfies)
- Name + title in bold, 2–3 credential bullets below each (prior companies, exits, domain expertise)
- Highlight what makes this team uniquely qualified for THIS problem
- LinkedIn URLs optional in footnote

### Competition / Positioning
- 2×2 matrix is the gold standard (x-axis = one differentiator, y-axis = another)
- Competitive table works for feature-heavy products
- NEVER show a table where you check every box and competitors check none — it kills credibility
- Acknowledge real trade-offs; investors know the landscape

### The Ask Slide
- State the raise/contract value in the largest type on the slide
- Use of funds: simple pie chart or 3–4 labeled buckets (Product 40%, Sales 30%, Ops 20%, Reserve 10%)
- Milestones unlocked by this capital (18-month horizon)
- One clear next step / CTA

---

## Narrative & Storytelling Rules

1. **One idea per slide** — if you need a comma, you need two slides
2. **Lead with the "so what"** — headline states the conclusion, body supports it (Pyramid Principle)
3. **Emotion before logic** — open with a story or human moment before the data
4. **Rule of three** — group information in threes wherever possible (3 pain points, 3 use cases, 3 team members)
5. **The "and, but, therefore" test** — your narrative should flow: "X is true AND Y is opportunity, BUT Z is the obstacle, THEREFORE our solution..."
6. **Avoid jargon in the first 3 slides** — earn the right to use technical terms by first making the audience care
7. **End on momentum** — final slide should leave investors/buyers leaning forward, not closing their laptops

---

## Design Decisions for Pitch Decks

### Color Strategy
- **Investor decks**: Dark/bold palettes signal ambition. "Midnight Executive" or "Ocean Gradient" from pptx/SKILL.md work well.
- **Sales decks**: Match or complement the client's brand if known. Otherwise use trustworthy teal/navy.
- **Internal decks**: Lighter, more neutral. "Charcoal Minimal" or "Sage Calm" keep focus on content.
- Always use the "sandwich" structure: dark cover + light content slides + dark closing slide.

### Visual Hierarchy Per Slide
- **Headline**: 28–36pt bold — states the conclusion
- **Subhead/Label**: 16–20pt — supports or categorizes
- **Body/Detail**: 13–15pt — evidence, specs, caveats
- **Source/Caption**: 10pt muted — attribution

### Slide Count Guidelines
- Investor (seed/Series A): **10–12 slides** (VCs scan, not read)
- Investor (growth/late stage): **12–16 slides** (more financial depth expected)
- Sales deck: **8–12 slides** (leave time for conversation)
- Internal/strategy: **8–15 slides** (exec attention spans are short)
- Demo day / 5-min pitch: **7–9 slides** (tight — every word earns its place)

---

## Common Pitch Deck Mistakes to Avoid

- **Starting with the product** — lead with the problem; make them feel the pain first
- **Overcrowded slides** — if you're reading your slides, you've lost the room
- **Unsubstantiated claims** — "fastest growing", "revolutionary", "unique" need proof
- **Fake TAM math** — "if we capture 1% of a $1T market…" is a red flag
- **Generic team slide** — "20 years of combined experience" means nothing; show specific wins
- **No ask on the ask slide** — be explicit: "We are raising $3M at a $12M cap"
- **No next step on the sales deck** — always end with one clear, low-friction CTA
- **Inconsistent visual style** — every slide should feel like it belongs to the same deck
- **Missing speaker notes** — add notes for context that doesn't belong on the slide

---

## Implementation Workflow

1. **Read this skill** (done) + **Read pptx/SKILL.md** (required — contains pptxgenjs.md, design palettes, QA steps)
2. **Choose the right blueprint** (Investor / Sales / Internal)
3. **Map user content** to each slide blueprint slot
4. **Choose color palette + font pairing** from pptx/SKILL.md design section
5. **Build slides** using pptxgenjs (see pptxgenjs.md for API reference)
6. **Run QA** — extract-text check + visual thumbnail check (see pptx/SKILL.md QA section)
7. **Fix issues** and present the final file

---

## Speaker Notes Template

Add speaker notes to every content slide. Use this structure:

```
[HOOK] — Opening line to say aloud (not on slide)
[POINT] — What this slide proves
[TRANSITION] — Bridge to next slide
```

In pptxgenjs:
```javascript
slide.addNotes(`HOOK: "Let me tell you about a customer who..."
POINT: This slide shows our 3x MoM growth since launching paid plans.
TRANSITION: So with this traction, let me show you how we plan to scale.`);
```
