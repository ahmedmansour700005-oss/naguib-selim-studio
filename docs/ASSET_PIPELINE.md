# Naguib Selim Studio — Room & Fabric Asset Pipeline

This document defines the minimum source assets required for the Wednesday 2 December 2026 live demo and for production-quality expansion.

## 1. Room asset contract

Each room has two independent viewing modes:

- `panorama`: a real 2:1 equirectangular photograph. It supports look-around and zoom from a captured camera position. A tour may move only through explicit linked viewpoints.
- `model3d`: a separate interactive 3D scene. It supports free orbit around its modeled geometry, but must not be described as a photographic reconstruction.

A room panorama is accepted only when all of the following are supplied:
- HTTPS or locally hosted asset path; the configurator also accepts a temporary local file preview through the browser's object URL
- For a local preview, upload a JPG, PNG or WebP file up to 35 MB; it must be equirectangular and have a 2:1 aspect ratio
- Local file previews stay in the current browser session only. They are not uploaded to Cloudflare or saved permanently; production/demo assets must be hosted at stable HTTPS URLs
- projection = `equirectangular`
- image dimensions in a 2:1 ratio (tolerance 1.5%)
- source/license and capture notes
- viewpoint ID and optional linked hotspot targets
- visual review for seams, nadir/zenith, exposure and stitching

Current room status:
| Room | 360 panorama | 3D prototype |
|---|---|---|
| Living room | Asset required | Available; geometry prototype |
| Bedroom | Asset required | Available; geometry prototype |
| Balcony | Asset required | Available; geometry prototype |

Do not enable the panorama action for a room until its asset passes validation. Do not use an unrelated stock image as a substitute for the customer's actual room.

## 2. Fabric asset contract

Every studio fabric must be tied to a verified product code. Keep the following separate:
- product identity and official product code
- macro reference photo
- base color / albedo map
- normal map for weave and relief
- roughness map for sheen
- opacity/transmission data for sheer fabrics
- measured roll width, composition, weight and care data when supplied by the studio
- studio-confirmed price and unit of sale

A single swatch or CSS color is a color reference only. It is not a faithful fabric simulation. A PBR map set is still provisional until tested on a curtain mesh under representative lighting and approved against the physical fabric.

## 3. Curtain and upholstery scene assets

For each demo opening:
- calibrated opening dimensions and mounting plane
- curtain mesh with correct width, drop, heading and fullness
- separate sheer and blackout layers when selected
- physically plausible folds and edge thickness
- open and closed states with matching lighting/shadow treatment
- independent sofa/cushion upholstery material zones

Photographic compositing requires element-specific masks and prepared state assets. A 360 panorama by itself cannot deform a photographed curtain in response to a live fabric selection.

## 4. Wednesday live-demo scope

Approved rooms: living room, bedroom, balcony.
Approved experience: hybrid panorama + 3D.
Delivery target: one complete live customer journey, not a claim that the full production platform is finished.

Minimum event sequence:
1. Choose one of the three rooms.
2. Enter the 3D configurator; enter 360 only for a room with a validated panorama.
3. Change curtain fabric, style, open/closed state and upholstery.
4. Edit window/balcony measurements in centimeters.
5. Compare Essential, Smart Elegance and Luxury Signature.
6. Save the design and prepare a studio handoff.

## 5. Asset readiness checklist

- [ ] Licensed 2:1 panorama for the living room
- [ ] Licensed 2:1 panorama for the bedroom
- [ ] Licensed 2:1 panorama for the balcony
- [ ] Capture/source/license metadata recorded
- [ ] At least three studio-approved fabric macro references
- [ ] At least one usable PBR material set for the demo
- [ ] Curtain and upholstery masks or calibrated 3D material zones
- [ ] Physical fabric comparison and studio sign-off
- [ ] Mobile image-size and GPU performance check

## 6. Release truth

Never label the current procedural 3D geometry as photorealistic. Never label an unavailable panorama as 360. Never label a color-only material as a true fabric match. Estimates remain indicative until roll widths, cutting rules, price units and site measurements are confirmed by the studio.
