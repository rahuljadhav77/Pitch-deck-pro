# How the Pitch Deck Skill Drives PitchDeck Pro

This document explains the technical mapping between the **Strategic Framework** defined in `SKILL.md` and the **PitchDeck Pro Rendering Engine**.

## 🧠 Narrative-to-Layout Mapping
The PitchDeck Pro app is "narrative-aware." When Claude follows the blueprints in `SKILL.md`, it chooses specific layout types that our engine renders with custom logic:

| Framework Slide | App Layout Type | Key Feature |
| :--- | :--- | :--- |
| **Cover** | `hero` | Large-scale title with AI background imagery. |
| **Market Size** | `tam` | Renders the concentric "TAM/SAM/SOM" ring visualization. |
| **Competition** | `matrix` | Automatically plots competitors on a 2x2 grid. |
| **The Ask** | `ask` | Generates a "Use of Funds" breakdown and raise amount. |
| **Traction** | `chart` | Uses Recharts for MoM growth or revenue graphs. |
| **Team** | `team` | Renders founders with bios and creds. |

## 🛠️ Dynamic Data Injection
When Claude uses this skill via the MCP server, it sends structured JSON. Our engine interprets specific data objects to build the strategic visuals:

### Market Size (TAM) Data
Claude provides values for TAM, SAM, and SOM. The engine then calculates the relative visual size of the rings to ensure the "prize" is clearly communicated.

### Competitive Matrix Data
Claude provides X/Y coordinates and differentiator labels. The engine dynamically plots your startup in the top-right quadrant (the "win" zone) relative to legacy rivals.

## 🎤 Speaker Notes & Narrative Flow
The `SKILL.md` emphasizes the **[HOOK][POINT][TRANSITION]** storytelling framework. 
- Claude injects these notes into the `notes` field of each slide.
- These notes are then automatically embedded into the **.pptx export**, giving you a ready-made script for your pitch.

## 🎨 Design Strategy
Following the "Design Decisions" in `SKILL.md`, our engine defaults to the **"Aurora" (Midnight Executive)** theme for investor decks, ensuring a premium, ambitious first impression. Users can toggle to the **"Snow"** theme for print-ready sales leave-behinds.

---
**Strategic Logic + Elite Rendering = Winning Pitch.**
