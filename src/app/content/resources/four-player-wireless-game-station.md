# Reactionary! — Building a Hardware Party Game From Scratch

**A capstone journey through embedded systems, RF debugging, mechanical design, and the art of knowing when to pivot.**

---

I've always thought the best engineering projects are the ones you'd actually want to use. For our senior capstone at Kettering University (CE-490 / ENGR-490), my team and I set out to build *Reactionary!* — a fast-paced, multiplayer party game built around custom handheld controllers and a central base station. Think of it as a hardware-driven reaction game: the base station lights up shapes in different colors, and players race to press the matching button on their controller before anyone else. First to 30 points wins.

The project touched nearly every discipline in our engineering curriculum — embedded C/C++, wireless protocol design, power electronics, mechanical enclosure design, and 3D printing. Here's how it all came together, what broke along the way, and what I'd do differently.

## The Team

Our four-person team split responsibilities across hardware and software. Joe Kneebone (ENGR-490) handled electrical fabrication, CAD, and all 3D printing. On the CE-490 side, Ian Steffes developed the controller firmware, Teagan Schmitt built the base station software and game loop, and I (Dan Abidov) designed and implemented the communication protocol. Having clear ownership of subsystems was critical — it let us work in parallel and reduced the coordination overhead that kills capstone timelines.

## System Architecture

At a high level, the system is two distinct embedded devices talking to each other:

**Base Station** — The brain of the operation. It runs the entire game state machine, controls a 60-LED WS2812B ring and four 35-LED rings (one per shape), manages player connections, tracks scores, and arbitrates rounds. Powered by a 5V wall adapter through a barrel jack.

**Controllers** — Handheld units, each with four shape-mapped buttons (star, triangle, hexagon, square), a 7-LED WS2812B ring for score/status feedback, and a coin-cell haptic motor for tactile feedback. Originally designed to run on 3.7V 1400mAh LiPo batteries with Pimoroni PIM557 charging shims, docking into the base station via pogo pins to charge.

Every device runs on a **Raspberry Pi Pico (RP2040)** — we chose it over the ESP-32 and ESP-8266 for its balance of sufficient GPIO, low power draw, compact footprint, and strong community libraries. The ESP-32's extra processing power was overkill, and the 8266 is effectively deprecated.

## The Communication Problem (and Our Biggest Pivot)

This is the part of the project I'm most candid about, because it's where the most learning happened.

Our original design used **nRF24L01 2.4GHz radio transceivers** over SPI for wireless communication between the base station and up to four controllers. I designed a custom communication protocol modeled loosely on OSI Layer 2 — it defined message framing, acknowledgments, checksums, and CRCs. The protocol supported bi-directional communication with a predefined message format, and the base station and controllers would poll their transceivers for incoming data.

The nRF24 was chosen specifically for its speed, multi-casting capability, and simplicity relative to full Wi-Fi or Bluetooth stacks. On paper, it was the right call.

In practice, we could not get the radio library to function reliably on our RP2040 + PlatformIO toolchain, despite extensive debugging. The Pico isn't natively supported by PlatformIO — we had to use a custom board definition from a linked repository and switch build cores during development. The radio issues compounded on top of this already fragile toolchain setup, and after significant time investment, we made the call to pivot.

**The fallback: UART over wire.** We replaced the wireless link with direct UART connections between the base station and controllers. Since the Pico only has two independent UART peripherals, this limited us to two controllers instead of four. We ran long wires between the devices and removed the batteries entirely, powering the controllers from the base station's 5V rail.

This was a painful trade-off. It reduced the player count, eliminated the wireless experience, and removed the battery/charging subsystem from the final demo. But it let us demonstrate a fully functional game loop with real hardware — and that mattered more than a half-working wireless stack.

**What I'd do differently:** Start radio bring-up earlier and in isolation. We underestimated the toolchain risk of running the nRF24 on a non-standard PlatformIO target. In hindsight, I'd prototype the radio link on a standalone breadboard with known-good Arduino IDE support before committing to PlatformIO, and I'd have a UART fallback designed into the protocol from day one rather than scrambling to implement it at the end.

## Controller Firmware

The controller code, developed by Ian, is a polling-based architecture that alternates between checking for UART data and scanning button inputs. When a button press is detected, the controller transmits the button ID to the base station. When a UART message arrives, the controller parses a prefix character — `S` for score updates, `C` for command dispatches — and acts accordingly.

Commands are handled through a switch statement mapped to an enum of game events: `START_CONNECTION`, `ROUND_START`, `ROUND_WON`, `WRONG_BUTTON`, `ROUND_LOST`, `ROUND_END`, `GAME_START`, `GAME_WON`, `GAME_LOST`, and `SCORE_UPDATE`. Each triggers a different combination of LED animation (via the Adafruit NeoPixel library) and haptic buzz.

The firmware is structured around a `ReactionaryController` class that encapsulates setup, loop, message parsing, button scanning, and output control. `RGBOutput` and `BuzzerOutput` are separated into their own classes for visual and haptic feedback respectively.

## Base Station Software

The base station, developed by Teagan, runs a state machine driven by a top-level switch statement. Each state performs its operations and waits for a signal (button press or UART message) to transition to the next.

The complexity here is in the data management. The base station juggles player connections, per-round LED configurations, score tracking, round timing, and win conditions — all requiring a significant number of global variables and custom classes (`Player`, `GameRound`, `RoundLedInfo`, `LED`, `LEDRanges`). The `GameRound` class manages round duration, shape-color assignments, per-player attempt tracking, and winner determination.

The game flow works like this:

1. Base station powers on and lights border LEDs.
2. Controllers connect by pressing any button (detected over UART).
3. The yellow button on the base station starts the game.
4. Each round, the base station randomly assigns colors to four shapes and lights them on the top-mounted LED rings.
5. Players identify whether their assigned color appears on any shape, then press the corresponding button.
6. The first correct press wins the round. Wrong presses and timeouts score nothing.
7. First player to 30 points wins.

Testing the base station during development was done incrementally — four breadboard buttons simulated controller inputs, and game states were tested in isolation before full integration.

## Mechanical Design & Manufacturing

Joe designed all enclosures in CAD, building the geometry around the LED rings and Pico footprint rather than the other way around. Everything was 3D printed in PLA on filament-based printers.

The design went through several iterations. The controller locking mechanism required the hook size to nearly triple before it was robust enough, with tolerances going from 0.25mm to 0.45mm. The base station underwent two major revisions — one for wiring accessibility, and another to change the shelling mode, which dropped print time from 26 hours to 22 hours.

Button tolerances were set at 0.25mm — tight enough to keep particulates out and deflect minor spills, but loose enough to prevent binding. The base station cap prints as a single piece (minus the button hole, which has rubber seals), so the top surface is effectively sealed against dust and liquid.

The team targeted an **IP41 rating** — protection against solid objects >1mm (crumbs, essentially) and vertically falling water drops. For a 3D-printed prototype of a party game, this was a realistic and meaningful target.

## Durability Testing

Since this is a party game likely to be handled by kids, we took mechanical validation seriously:

- **Crush test:** A 260 lb (118 kg) individual stood directly on a fully assembled controller. It survived intact and remained functional. This was our most decisive validation result.
- **Drop test:** 1-meter drop onto a hard surface. Minor cosmetic damage, but the controller stayed operational. Acceptable for a prototype.
- **Power draw:** Peak consumption measured at ~400mA with all LEDs and haptics active. With the 1400mAh LiPo, that's roughly 3.5 hours of continuous full-load runtime — verified with a benchtop supply and multimeter in series.

Choking hazard analysis was also performed — no external parts are small enough to be swallowed, and buttons are pressure-fitted with no risk of detachment under normal use.

## Bill of Materials

The full prototype came in at **$221.96** for a two-controller demo unit. Key line items:

| Component | Qty | Cost |
|---|---|---|
| Raspberry Pi Pico (RP2040) | 5 | $20.00 |
| nRF24L01 2.4GHz Transceivers | 1 | $14.99 |
| 60-LED WS2812B Ring | 1 | $15.99 |
| 35-LED WS2812B Rings | 4 | $43.96 |
| 7-LED WS2812B Dot | 1 | $15.99 |
| Haptic Motors | 1 | $12.99 |
| Pimoroni PIM557 LiPo Shim | 4 | $34.80 |
| 1400mAh 3.7V LiPo Batteries | 4 | $43.96 |
| Pogo Pins | 1 | $10.99 |
| 5V 2A Barrel Jack PSU | 1 | $8.29 |

At market, comparable 4-player electronic games with automatic scorekeeping range up to $400. Our target retail price was $150 — aggressive, but feasible with PCB consolidation and injection molding at scale.

## Path to Production

The prototype-to-product gap is real, and we spent time thinking about it:

**PCB consolidation** is the first priority. Every controller currently uses a separate dev board for the Pico, charging shim, and LED driver — all of which could live on a single custom PCB. This collapses BOM cost, simplifies assembly, and shrinks the form factor.

**Enclosure manufacturing** needs to move off FDM printing. At current print times (4.5 hours per controller, 22 hours for the base station), producing 100 units would require ~4,000 print hours and 300 active man-hours — roughly 170 calendar days assuming no failures. Even with a four-printer fleet (~$10K investment), that's 40 days at 100% uptime. The realistic near-term path is **resin injection molding or polyurethane casting**, which offers faster turnaround with simpler tooling than full injection molding, bridging the gap until volume justifies the mold investment.

## What I Learned

Beyond the technical skills — embedded C++, SPI/UART protocols, state machine design, power budgeting, DFM considerations — the biggest takeaway was about **engineering judgment under pressure**. The wireless pivot was the defining moment of this project. We had to assess a failing subsystem honestly, weigh the sunk cost against the remaining timeline, and make a call that preserved the most project value. That's not something you learn from a textbook.

The toolchain issues also reinforced something I'll carry forward: **validate your development environment before you commit to it.** The RP2040 + PlatformIO + nRF24 combination had undocumented compatibility issues that cost us weeks. A day of toolchain validation at the start would have saved us significant pain.

---

*Reactionary! was built by Dan Abidov, Teagan Schmitt, Joe Kneebone, and Ian Steffes as a senior capstone project at Kettering University (CE-490 / ENGR-490).*