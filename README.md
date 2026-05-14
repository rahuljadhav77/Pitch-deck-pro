# 🚀 PitchDeck Elite: Strategic Presentation Engine

PitchDeck Elite is a high-performance presentation suite designed to transform Claude's strategic insights into executive-ready pitch decks. Built on the **Model Context Protocol (MCP)**, it follows industry-standard frameworks from top-tier VCs and consultancies to ensure your message has maximum impact.

---

## 💎 Key Features
- **Strategic Blueprints**: Built-in support for TAM/SAM/SOM, Competitive Matrices, and Use-of-Funds layouts.
- **Real-Time MCP Sync**: Watch your slides update live as Claude generates content.
- **Elite Data Viz**: Dynamic charts and graphs powered by Recharts.
- **Dual Export**: Professional PDF generation and editable PowerPoint (.pptx) export.
- **AI-Curated Visuals**: Automatic background image sourcing via Unsplash.

---

## 🛠️ How to Use as a Claude Skill (MCP)

To enable Claude to build presentations for you, follow these steps:

### 1. Configure Claude Desktop
Open your Claude Desktop configuration file (typically at `%APPDATA%\Claude\claude_desktop_config.json` on Windows) and add the following:

```json
{
  "mcpServers": {
    "pitch-deck-pro": {
      "command": "npx",
      "args": [
        "-y",
        "tsx",
        "C:\\Users\\pc\\.gemini\\antigravity\\scratch\\pitch-deck-pro\\mcp-server.ts"
      ],
      "cwd": "C:\\Users\\pc\\.gemini\\antigravity\\scratch\\pitch-deck-pro"
    }
  }
}
```

### 2. Launch the Dashboard
Ensure the local presentation dashboard is running:
```bash
npm install
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

### 3. Prompt Claude
Use the strategic blueprints defined in [SKILL.md](./SKILL.md). Example prompt:
> *"Create a 12-slide **Investor Pitch** for my startup 'AeroFlow'. Use the **tam** layout for market size and **matrix** for competition. Include speaker notes."*

---

## 📐 Strategic Blueprints
This engine supports the following layout types (defined in [SKILL.md](./SKILL.md)):
- `hero`: Large-scale intro and section breaks.
- `tam`: Concentric rings for Market Size (TAM/SAM/SOM).
- `matrix`: 2x2 competitive positioning grid.
- `chart`: Data visualization (Line, Bar, Pie).
- `team`: Founder profiles and bios.
- `pricing`: Tiered package tables.
- `ask`: Use of funds visualization.

---

## 📄 Documentation
- **[SKILL.md](./SKILL.md)**: Full strategic framework and narrative rules.
- **[SAFETY.md](./SAFETY.md)**: Security audit and safety guidelines.

---

## 🏗️ Tech Stack
- **Frontend**: React, Vite, Framer Motion, Recharts, Lucide Icons.
- **Export**: PptxGenJS (PowerPoint), Browser Print (PDF).
- **Skill Bridge**: Model Context Protocol (MCP) SDK.

---
**Build. Pitch. Win.**
