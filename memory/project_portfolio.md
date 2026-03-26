---
name: project_portfolio
description: DICOM-viewer-style portfolio — React/Vite/TS, layout and key files
type: project
---

Portfolio site at /Users/yaellyshkow/Desktop/Portfolio-one-billion built with Vite + React + TypeScript.

Key facts:
- Default view is the DetailView (profile page), not the dashboard grid
- DetailView: sidebar (left) | black viewport with scroll-through drawings | DICOM Tags panel (right, 420px wide)
- Drawings live in public/drawings/1.PNG–4.PNG; scroll threshold controls speed (currently ~8)
- Per-frame SVG annotations in ANNOTATIONS array (lines + labels only, no circles/shapes)
- DICOM Tags data in DICOM_TAGS const — contains real info (Yael Lyshkow, U of T education, etc.)
- Overall UI zoom: 0.92 via CSS zoom property; height compensated with calc(100vh / 0.92)
- public/dicom.png used as thumbnail for first sidebar card

**Why:** Portfolio owner wants the site to look and feel like real radiology viewer software.
**How to apply:** Keep all UI changes within the DICOM aesthetic — dark backgrounds, yellow (#e8e800) annotation graphics, monospace metadata overlays, Windows-era toolbar button styles.
