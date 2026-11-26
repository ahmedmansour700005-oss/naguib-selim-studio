# Naguib Selim Studio — Live Event Demo Plan
Date: Wednesday 2 December 2026
Decision baseline: mixed apartment (living room + bedroom + balcony), hybrid experience (photographic 360 tour + free-orbit 3D configurator), live demo.

## Demo promise
A customer can choose a room, explore a 360° photographic viewpoint where a verified panorama asset exists, switch to a real-time 3D configurator for material interaction, select curtain and upholstery options, enter window measurements in centimeters, compare three budget-aware design directions, and save a project summary.

The demo must label each scene honestly:
- 360 panorama: captured equirectangular image, rotation and zoom, with viewpoint links only where actual panoramas exist. It is not free walking.
- 3D configurator: interactive 3D scene with orbit/zoom and adjustable curtain/upholstery materials. It is not a photographic reconstruction.
- Photorealistic fabric fidelity is not claimed until source fabric scans/PBR maps and window/furniture masks are supplied and visually approved.

## Event scope (one complete customer journey)
1. Welcome / select a room: living room, bedroom, balcony.
2. Choose a room viewing mode: 360 panorama (when asset is available) or interactive 3D.
3. Select curtain configuration: sheer, blackout, or layered; select a curtain style.
4. Select a fabric from verified sample assets and preview its material in 3D.
5. Open/close curtains and change upholstery.
6. Enter per-opening dimensions in cm, including pelmet, depth, slope/irregularity, mounting, allowances, fullness and layers.
7. Compare three design directions: Essential, Smart Elegance, Luxury Signature. Prices remain estimates until studio price rules and roll widths are confirmed.
8. Save the project and create a WhatsApp handoff draft.

## Delivery gates
### Gate A — Product definition and architecture
- Room/viewpoint data model and scene capability labels.
- Separate panorama viewer from the 3D configurator.
- Fabric asset schema separates verified studio products from visual demo swatches.

### Gate B — Demo experience
- Three room choices with appropriate scene compositions.
- Working 3D orbit/zoom, curtain open/close, curtain fabric and upholstery selection.
- 360 panorama viewer connected only to verified 2:1 equirectangular panorama files.
- Multi-opening measurement editor in centimeters.
- Three recommendation cards driven by customer style/budget choices.
- Save/restore and a complete request summary.

### Gate C — Event hardening
- Desktop/laptop presentation mode and responsive mobile fallback.
- Preload or locally host critical assets; do not depend on third-party image links at event time.
- Test the actual event laptop, mobile device, browser, network and (if used) VR headset.
- Provide a recorded fallback walkthrough if network/GPU performance fails.

## Required assets and decisions
- Three licensed room panoramas (living, bedroom, balcony) in 2:1 equirectangular format, or clearly label missing scenes as 3D-only.
- Reference photos for each room and window geometry.
- Fabric macro photos and, for material matching, albedo/normal/roughness/opacity maps.
- Window and upholstery masks or calibrated 3D assets.
- Studio-confirmed product codes, roll widths, price units, and installation rules.
- Official WhatsApp number and consent/privacy wording.

## Explicit non-goals for the event build
- Claiming unrestricted walking inside a 360 panorama.
- Claiming exact color match on every uncalibrated display.
- Claiming accurate camera-only room measurements on ordinary phones.
- Claiming thousands of verified fabric textures where source scans are absent.
- Lifelike AI humans walking around the room; voice consultant can be a separate guided interface.
- Full photorealistic arbitrary customer-apartment reconstruction in real time.

## Day-by-day execution
- Thu 26 Nov: lock architecture, event flow, room and fabric data contracts, clean up prototype capability labels.
- Fri 27 Nov: build the mixed-room selector and room scene compositions; prepare panorama assets.
- Sat 28 Nov: integrate 360 viewer and viewpoint navigation; mobile controls.
- Sun 29 Nov: fabric/material pipeline for selected demo fabrics; curtain states and upholstery zones.
- Mon 30 Nov: full measurement form and estimate assumptions; three budget directions.
- Tue 1 Dec: save/share flow, voice-guide fallback, device testing, rehearsal and recorded backup.
- Wed 2 Dec: event demo.

## Acceptance checklist
- [ ] A visitor can complete the full demo journey without developer tools.
- [ ] Each room choice changes the actual scene/asset, not just a label.
- [ ] 360 mode is a real equirectangular panorama and is labeled as fixed-viewpoint navigation.
- [ ] 3D mode supports orbit, zoom, curtain open/close, fabric selection and upholstery selection.
- [ ] Every customer-facing measurement is labeled in cm.
- [ ] Estimates expose assumptions and are not presented as final quotes.
- [ ] No unverified product image, price, or fabric specification is presented as confirmed.
- [ ] Desktop and mobile have been tested on the actual event devices.
