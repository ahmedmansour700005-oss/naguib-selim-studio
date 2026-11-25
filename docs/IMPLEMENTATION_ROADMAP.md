# Naguib Selim Studio — Implementation Roadmap

This roadmap is the execution checklist for `docs/PROJECT_SPEC.md`.
Customer-facing dimensions must remain in **centimeters (سم)** in every phase.

## Status legend
- [x] Verified in repository
- [~] Prototype / partial only
- [ ] Not implemented yet

## Phase 0 — Repository and delivery foundation
- [x] React + Vite application exists.
- [x] Cloudflare Pages project is connected to the GitHub repository (deployment still needs live verification after each release).
- [x] Project specification documents the complete product vision and technical limitations.
- [x] Measurement helper converts centimeters to meters only at calculation boundaries.
- [x] Existing width and height inputs are labeled in centimeters.
- [x] GitHub Actions workflow added to install dependencies and run the production build on pushes and pull requests.
- [ ] Confirm the first GitHub Actions run is green.
- [ ] Add a lockfile and switch CI to reproducible `npm ci`.

## Phase 1 — Measurement and quotation foundation
- [~] Basic single-window width/height inputs (cm).
- [ ] Multiple windows and balconies, each with its own saved measurements.
- [ ] Curtain-box/pelmet presence and dimensions (cm).
- [ ] Installation type, mounting position, clearances and allowances (cm).
- [ ] Slopes, irregular openings and notes/photos per opening.
- [ ] Fabric fullness, layers (sheer/blackout), heading style and waste assumptions.
- [ ] Transparent fabric-quantity calculation with editable assumptions.
- [ ] Per-window estimate and room total; label estimates as indicative until surveyed.
- [ ] Validation, keyboard/mobile usability and measurement tests.

## Phase 2 — Real 360 room experience
- [ ] Obtain or capture licensed, real 360 room panoramas.
- [ ] Define room, panorama, hotspot and viewpoint data format.
- [ ] Add panorama viewer with look-around, zoom and viewpoint hotspots.
- [ ] Add multiple rooms and linked viewpoint navigation.
- [ ] Test mobile performance and supported VR headset viewing.
- [ ] Do not describe panorama navigation as unrestricted 3D walking.

## Phase 3 — Photographic curtain and upholstery preview
- [ ] Prepare accurate masks/layers for windows, curtains, furniture and upholstery.
- [ ] Create real fabric assets with color, texture, transparency, sheen and blackout metadata.
- [ ] Support curtain model, fabric, shade, pattern and layered combinations.
- [ ] Provide prepared open/closed curtain states and believable light changes.
- [ ] Apply upholstery options to sofas/cushions.
- [ ] Verify visual quality against approved source photos; no CSS-room preview presented as photorealistic.

## Phase 4 — Catalog and design choices
- [~] Small sample catalog exists (6 swatches, 3 styles).
- [ ] Expand catalog from actual studio fabric inventory and photography.
- [ ] Search, filters, categories, shade families and comparison.
- [ ] Luxury, mid-range and economical recommendations.
- [ ] Multiple saved design alternatives per room.

## Phase 5 — AI consultant and virtual guide
- [ ] Egyptian-Arabic design assistant grounded in the real catalog and price rules.
- [ ] Budget-aware recommendations with clear reasoning.
- [ ] Spoken explanations and accessibility controls.
- [ ] Optional animated virtual guide; keep this separate from room realism.
- [ ] Clearly disclose any external paid API or service before adoption.

## Phase 6 — Customer project and studio handoff
- [~] Basic local design save exists.
- [ ] Save multiple named projects and room/window configurations.
- [ ] Generate a complete order summary with selected materials and cm measurements.
- [~] WhatsApp message handoff prototype exists.
- [ ] Configure the studio's official WhatsApp destination and test handoff.
- [ ] Add privacy notice and consent-aware data handling.

## Phase 7 — Quality, release and operations
- [x] Automated production build workflow added.
- [ ] Green CI build verified.
- [ ] Unit and interaction tests for measurement and pricing.
- [ ] Accessibility and responsive checks.
- [ ] Performance tests on ordinary mobile devices.
- [ ] Verify Cloudflare production deployment and deployed URL after release.
- [ ] Maintain this roadmap with verified status only.

## Current honest baseline
The deployed UI is an early React/CSS prototype. It has a stylized illustrative room, a small fabric/style sample, basic open/close interaction, a single width/height form in cm, an indicative estimate, local save, and a WhatsApp message draft. It does **not** yet provide real 360 photography, VR tour, photorealistic material replacement, full multi-window measurement, upholstery compositing, AI voice consultant, or animated sales guide.
