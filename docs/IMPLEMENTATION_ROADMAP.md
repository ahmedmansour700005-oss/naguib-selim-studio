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
- [x] Confirm GitHub Actions run 129 for commit `cfbf639be2dc7d03252e22e040ae193138f63f1c` is green (tests and production build passed).
- [ ] Add a lockfile and switch CI to reproducible `npm ci`.

## Phase 1 — Measurement and quotation foundation
- [~] Basic single-window width/height inputs (cm).
- [x] Multiple windows and balconies, each with its own saved measurements (local prototype).
- [~] Curtain-box/pelmet presence and depth (cm) captured; not yet used in quantity calculation.
- [~] Top/bottom allowances and slope difference (cm) captured; installation type and full clearance model remain.
- [~] Slope difference and notes captured per opening; irregular geometry/photos remain.
- [~] Fullness, one/two layers and 10% waste assumption implemented; heading-specific rules remain.
- [~] Transparent initial area estimator implemented; fabric-roll width/panel cutting and editable studio rules remain.
- [x] Per-opening estimate and room total shown; estimates explicitly labeled indicative.
- [~] Positive-dimension validation and Node calculation tests added; full accessibility/device QA remains.

## Phase 2 — Real 360 room experience
- [ ] Obtain or capture licensed, real 360 room panoramas.
- [ ] Define room, panorama, hotspot and viewpoint data format.
- [~] Panorama viewer supports look-around and zoom; interactive hotspots are not implemented.
- [~] Room-specific panorama uploads and viewpoint buttons are implemented; actual room panoramas and hotspot-linked transitions are still missing.
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
- [x] Save the current design locally with fabric ID, curtain style, and all opening measurements.
- [x] Restore the last saved design, including its catalog fabric and all room/window measurements.
- [ ] Save multiple named projects and room/window configurations.
- [ ] Generate a complete order summary with selected materials and cm measurements.
- [~] WhatsApp message handoff prototype exists.
- [ ] Configure the studio's official WhatsApp destination and test handoff.
- [ ] Add privacy notice and consent-aware data handling.

## Phase 7 — Quality, release and operations
- [x] Automated production build workflow added.
- [x] GitHub Actions run 129: dependency install, all Node tests, and production build completed successfully.
- [~] Unit tests for conversion, invalid dimensions, allowances, fullness and layers added; UI interaction tests remain.
- [ ] Accessibility and responsive checks.
- [ ] Performance tests on ordinary mobile devices.
- [ ] Verify Cloudflare production deployment and deployed URL after release.
- [ ] Maintain this roadmap with verified status only.

## Current honest baseline
The repository contains a React/Vite prototype with three configurable room presets, a separate procedural 3D scene, a 360 panorama viewer that accepts user-supplied 2:1 images and switches between uploaded viewpoints, fabric catalog/search, per-opening cm measurements and indicative consumption, local save/restore, and a WhatsApp draft. The latest GitHub Actions test/build run is green. The repository still does **not** include licensed real room panoramas, photorealistic product-specific fabric replacement with masks/PBR maps, a complete upholstery compositing pipeline, a production AI voice consultant, or a verified Cloudflare live deployment.


## Mandatory technical truth and measurement accuracy gate
- [ ] Label the 360 panorama tour as fixed-viewpoint navigation; do not call it free walking.
- [ ] If a separate free-walk 3D mode is built, test and label it as a distinct feature.
- [ ] Do not call fabric replacement photorealistic until a real room image, element-specific masks/layers, and real fabric assets preserve folds, lighting, shadows, transparency, and occlusion.
- [ ] Implement curtain open/closed states using prepared assets or a validated compositing pipeline.
- [ ] Label all camera/image-derived dimensions as estimates and disclose the measurement method and accuracy limits.
- [ ] For camera/LiDAR/depth measurement, document supported devices, calibration/reference procedure, and human confirmation before finalizing.
- [ ] Keep all user-facing measurement values and field labels in cm.
- [ ] Add automated/manual acceptance checks for panorama navigation, fabric compositing, curtain states, and measurement accuracy disclosures before release.


## Verified implementation update — 2026-11-25
- [x] Multi-opening measurement form committed to `src/App.jsx`.
- [x] Centimeter-first calculation engine committed to `src/measurement.js`.
- [x] Node test cases committed to `src/measurement.test.js`.
- [x] CI workflow now runs `npm test` before `npm run build`.
- [~] Changes are committed on `main`; GitHub Actions result still needs live confirmation.
- [ ] Production deployment and browser interaction checks still need confirmation.


## Verified implementation update — 2026-11-26
- [x] Created the Figma design file with desktop (1440px) and mobile (390px) Arabic screens: [Naguib Selim Studio — Modern Luxury UI](https://www.figma.com/design/xcrSJJvVlP173p20lKwsf7).
- [x] Applied the Modern Luxury visual direction to the live application's stylesheet: warm ivory/sand surfaces, charcoal text, bronze accents, and responsive overrides.
- [x] GitHub Actions run for commit `9fe1cb0ddd4d3a06d2124a8813832eb00633c9d6` completed successfully (workflow run 73).
- [ ] Confirm the Cloudflare Pages deployment for this commit and inspect the deployed page on desktop and mobile.
- [ ] Align the remaining detailed configurator components with the Figma layout and verify the Arabic typography in browser.


## Interactive 3D configurator milestone — 2026-11-26
- [x] Replaced the external panorama-only preview with a browser-rendered Three.js room scene and OrbitControls (free orbit/zoom).
- [x] Added procedural woven fabric textures applied to the curtain meshes and sofa upholstery material.
- [x] Added curtain open/close control and independent sofa upholstery color swatches.
- [x] Added a clear disclosure: this is a procedural 3D scene, not a photographic 360 panorama.
- [ ] Verify the latest GitHub Actions build and test suite; confirm Cloudflare Pages deployment.
- [ ] Replace the procedural room geometry/materials with authored high-detail room assets and product-specific fabric texture maps/masks for photorealistic fidelity.


## Event demo — approved scope (2 December 2026)
- [x] Approved mixed apartment demo: living room, bedroom, and balcony.
- [x] Approved hybrid target architecture: photographic 360° tour for captured viewpoints plus separate free-orbit 3D configurator.
- [x] Approved event goal: live working demonstration.
- [x] Added `docs/EVENT_DEMO_PLAN.md` with delivery gates, asset requirements, daily plan and acceptance criteria.
- [x] Added `src/demoRooms.js` with three room presets and three budget-aware design directions.
- [x] Added room selector that changes the actual 3D room composition (living sofa, bedroom bed, balcony seating).
- [x] Added Essential / Smart Elegance / Luxury Signature presets that apply fabric, curtain style, fullness and layer settings.
- [~] Existing 3D scene supports orbit/zoom, curtain open/close, procedural curtain texture and upholstery material changes; still a geometry prototype, not photorealistic.
- [ ] Capture or obtain licensed 2:1 equirectangular panoramas for all three rooms; do not mark 360 mode complete until these assets are integrated.
- [ ] Add 360 viewer and linked viewpoint navigation, distinct from free-walk 3D.
- [ ] Replace procedural swatches with verified studio fabric scans/PBR maps and prepared curtain/upholstery masks.
- [ ] Expand per-opening survey fields and revise fabric consumption against actual roll widths and studio rules.
- [ ] Complete desktop/mobile/device rehearsal and verify Cloudflare deployment for the event release.


## Execution update — 2026-11-26 (approved hybrid event demo)
- [x] Confirmed the approved demo scope: mixed apartment (living room, bedroom, balcony), hybrid 360 + 3D architecture, live demo on Wednesday 2 December 2026.
- [x] Added a strict scene-asset contract in `src/sceneAssets.js`: a panorama is eligible only when it has a valid HTTPS/local asset, equirectangular projection and 2:1 dimensions.
- [x] Added automated tests for panorama readiness, viewing-mode disclosure and verified fabric-material requirements in `src/sceneAssets.test.js`.
- [x] Added `docs/ASSET_PIPELINE.md` describing required capture, licensing, panorama, fabric PBR, curtain-state and upholstery assets.
- [x] Added room-specific viewing-mode status to the configurator. The 3D mode is available; the 360 mode is explicitly marked as waiting for a real panorama asset.
- [ ] Add and validate the actual living-room, bedroom and balcony panorama files; no 360 tour is claimed until then.
- [ ] Implement and test the panorama viewer and linked viewpoint hotspots.
- [ ] Replace procedural fabric samples with studio-approved PBR assets and calibrated curtain/upholstery zones.
- [ ] Confirm CI result for the latest commits and verify the Cloudflare production deployment.


## Verification update — 2026-11-26 (latest main commit)
- [x] GitHub Actions run [45847402794](https://github.com/ahmedmansour700005-oss/naguib-selim-studio/actions/runs/45847402794) for commit `cfbf639be2dc7d03252e22e040ae193138f63f1c` completed successfully.
- [x] The workflow completed dependency installation, `npm test` (Node test suite), and `npm run build` (Vite production build).
- [x] The panorama viewer and per-room multi-view upload/navigation controls are present in `src/App.jsx`.
- [~] Uploaded panoramas are browser-session blob URLs; they are not persisted to a server or across reloads.
- [ ] Actual licensed room panoramas, clickable spatial hotspots, and mobile/VR acceptance testing remain outstanding.
- [ ] Cloudflare Pages live deployment remains unverified; a green GitHub build is not proof of a successful live deployment.
