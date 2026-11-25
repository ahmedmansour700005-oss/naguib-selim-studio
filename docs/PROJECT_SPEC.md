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


## Mandatory accuracy and realism disclosure (release gate)
These rules apply to product copy, UI labels, demos, and implementation:
- Clearly label a photographic 360 tour as **movement between fixed captured viewpoints**. It is not unrestricted walking or free movement through a 3D room.
- If unrestricted movement is later offered, identify it separately as a 3D experience and test it independently.
- A fabric preview may be called realistic only when it uses prepared, element-specific masks/layers or equivalent scene assets that preserve folds, lighting, shadows, transparency, and occlusion. A flat color overlay or CSS illustration must be labeled a simplified preview.
- Curtain motion in a photographic panorama must use prepared open/closed states or a validated compositing method; do not imply physically simulated motion if it is not present.
- Measurements inferred from ordinary camera images are **estimates**, not verified engineering measurements. Show the source/method and known accuracy limits.
- Any camera/LiDAR/depth-assisted measurement must require supported hardware, a calibration/reference procedure, and a human confirmation step before it is treated as a final site measurement.
- Keep all displayed dimensions in centimeters (cm). If a measurement is estimated, label it as estimated; if confirmed by a person or suitable measuring device, identify that confirmation.
- Never claim engineering accuracy, photorealism, 360 tour, VR support, or free-walk 3D until that exact capability has passed acceptance tests on the deployed experience.

## Accuracy and realism acceptance tests
- 360 tour: user can look around a real captured panorama and navigate only through explicitly linked viewpoints; UI explains that limitation.
- Fabric preview: test at least one approved real room photo with a correctly masked curtain fabric asset; verify texture, folds, light/shadow and edges at desktop and mobile sizes.
- Curtain states: verify open and closed views are both available and that any lighting effect is supported by the prepared assets.
- Measurement: every field displays cm; estimated measurements are visibly marked; camera-derived measurements cannot be finalized without calibration and human confirmation.
- Quote: every result shows its assumptions and remains an indicative estimate until verified by a site survey.
