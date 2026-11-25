# Naguib Selim Studio — Product Specification

## Product vision
A realistic, interactive room-planning and sales experience for curtains, fabrics, and upholstery. The room, windows, fabrics, and furniture should look like real photography; animated characters may be stylized/animated, but the environment must not look like a cartoon or CSS illustration.

## Original user requirements
- Runs on laptop/desktop and mobile; support mobile VR headsets where technically possible.
- Photographic 360-degree room viewing: look left/right/up/down, zoom in/out, and move between real captured viewpoints such as the room entrance, window, and sofa.
- Customers configure their apartment/room, wall colors, decor, and window/balcony locations.
- Preview many curtain designs and fabric choices on the same real room; include sheer, blackout/heavy, and layered combinations.
- Open and close curtains and show the corresponding daylight/transparency/darkening effect.
- Change upholstery fabrics/colors on sofas and cushions.
- Extensive fabric catalog based on actual studio fabrics, with color families and many shades; represent texture, transparency, sheen, and blackout behavior as accurately as available source assets allow.
- Offer multiple design alternatives and compare them; recommend suitable combinations while leaving the final choice to the customer.
- Serve luxury, mid-range, and economical budgets, including lower-cost ways to achieve a premium-looking result.
- Measurement workflow for every window/balcony: width, height, curtain box/pelmet presence, slopes/irregularities, installation details, and other relevant site-survey dimensions.
- Calculate required fabric quantities and estimates from entered measurements, selected fabric, and design parameters. Clearly distinguish estimates from verified final quotations.
- AI sales/design assistant in Egyptian Arabic with spoken explanations; future virtual sales-guide characters may accompany the customer in the scene.
- Preserve customer selections and support sending a request to the studio (including WhatsApp where configured).

## Measurement standard — mandatory
- **All customer-facing measurements are in centimeters (cm).**
- This applies to window width/height, curtain box dimensions, offsets, clearances, slopes, installation measurements, and any future room measurements.
- Convert to meters or square meters internally only when a calculation requires it. Always label converted outputs explicitly (m or m²); never silently change the input unit.
- Validate positive numeric measurements and show the unit beside every measurement field.
- Do not claim automatic millimeter-accurate measurement from an ordinary phone/laptop camera. Camera/LiDAR/depth-assisted measurement, if added later, must state device requirements and calibration/accuracy limits.

## Technical truth and constraints
- A 360 photo panorama is a real captured viewpoint, not free-walking 3D. Movement between viewpoints is a linked panorama tour.
- Realistic fabric replacement on a photograph requires prepared masks/layers or separately captured/rendered fabric states, with lighting, folds, shadows, and occlusion handled. A color swatch over a CSS-drawn room is not a realistic fabric preview.
- Opening/closing curtains in a photographic scene requires paired states, prepared overlays, or a purpose-built compositing pipeline.
- True free-walk photorealistic 3D and lifelike real-time characters are a separate, heavier phase and cannot be promised for low-end phones or a short event deadline.
- Use free/open-source tools and services where practical; document any feature that requires paid hosting, APIs, capture equipment, or production assets before adopting it.

## Current repository baseline
- React + Vite app deployed through GitHub and Cloudflare Pages.
- Existing configurator is a CSS illustration with a small sample fabric/style list and a basic dimension/estimate form. It is a prototype, not a 360-degree or photorealistic implementation.
- Do not describe prototype features as completed production capabilities.

## Delivery phases
1. Stabilize the existing site and enforce cm as the single customer-facing measurement unit.
2. Build a proper multi-window measurement and quote data model, including installation details and assumptions.
3. Establish the real-photo 360 capture pipeline and a room/viewpoint asset format.
4. Build the photographic scene viewer and navigation between viewpoints; add VR-compatible viewing where supported.
5. Build fabric/curtain/upholstery compositing with realistic prepared assets and open/closed states.
6. Expand the real fabric catalog, shade/texture metadata, and design alternatives.
7. Add budget-aware design recommendations and the Egyptian-Arabic sales assistant.
8. Add optional animated guide characters, customer projects, saved designs, and studio handoff.
9. Test performance and accessibility on desktop, ordinary phones, and supported VR devices; deploy continuously.

## Acceptance principles
- No fake claim of photorealism or 360 support unless tested in the deployed site.
- Every measurement field visibly says cm.
- Each window is measured and priced independently before any room-level total.
- Show calculation assumptions and mark indicative estimates clearly.
- Keep each module's code, data contract, tests, and completion status documented so work continues from the last verified state.
