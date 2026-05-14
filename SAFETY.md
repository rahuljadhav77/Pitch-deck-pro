# Security & Safety Audit: PitchDeck Pro

This document outlines the safety measures and architectural decisions implemented to ensure the security and stability of the PitchDeck Pro environment.

## 1. Architectural Safety
- **Local Isolation**: The application and its associated MCP server run entirely on the local machine. Pitch data is never sent to a third-party cloud for rendering; all visualization happens in the user's browser.
- **Zero-Trust Input**: The MCP server treats all tool arguments as untrusted. It only accepts a strictly typed `slides` array and does not allow execution of arbitrary scripts or path manipulation.

## 2. Secure Data Handling
- **XSS Prevention**: All slide content is rendered via React's virtual DOM, which automatically escapes strings. We avoid `dangerouslySetInnerHTML` to prevent malicious script injection via deck data.
- **Path Locking**: The file-system operations are strictly locked to the `public/deck.json` path using absolute resolution from the project root. This prevents "path traversal" attacks.

## 3. Dependency Management
- **Vetted Libraries**: We use only established, high-reputation libraries:
  - `pptxgenjs`: Client-side PowerPoint generation (no server-side risk).
  - `recharts`: SVG-based visualization.
  - `framer-motion`: Declarative animations.
- **NPM Auditing**: All dependencies have been audited for known vulnerabilities.

## 4. Operational Safety
- **Rate-Limited Polling**: The frontend uses a conservative 2000ms polling interval to prevent excessive local CPU/Disk usage.
- **Graceful Failure**: The application is designed to fail gracefully. If the `deck.json` file is missing or corrupted, the app will continue to display the previous valid state or a default fallback.

---
**Status**: Clean / Verified
**Last Audit Date**: 2026-05-15
