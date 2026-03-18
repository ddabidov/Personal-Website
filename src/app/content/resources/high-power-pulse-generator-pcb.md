# I Designed an Open-Source EDM Pulse Generator — Here's What I Learned

**Designing a switching-topology pulse power supply with AVP and PCMC from scratch, making every mistake in the book, and coming out the other side a better engineer.**

---

I've always been drawn to the places where electrical engineering meets physical manufacturing. Electrical Discharge Machining sits right at that intersection — it's a process that removes material using precisely timed electrical sparks, and it doesn't care how hard your workpiece is. If it conducts electricity, EDM can machine it. The tradeoff is that you need a pulse generator capable of delivering tightly controlled discharges with repeatable timing, and commercial units aren't exactly open about how they work.

So I built one. This article walks through the design decisions, trade-offs, and hard lessons behind an open-source EDM pulse generator that implements both Adaptive Voltage Positioning and Peak Current Mode Control. The project started as coursework for EE-499 at Kettering University, pulling heavily from what I'd learned in Power Electronics (EE-424) and PCB Design and Testing (EE-312), but it's grown into something I plan to carry well beyond the classroom.

## Choosing the Topology

The first real design decision was selecting the power stage topology. Early EDM machines used RC relaxation circuits — charge a capacitor through a resistor, let it dump into the workpiece, repeat. It's elegant in its simplicity, but the limitations are real: low peak power, slower material removal rates, poor surface morphology, and increased electrode wear. Published efficiency figures for RC-type generators sit around 35%.

I chose a transistor-based switching topology instead, specifically one documented in an IET Power Electronics comparative study by Kane et al. (2020). It's fundamentally a synchronous buck converter with two key additions: an energy recovery diode that recaptures excess current not absorbed by the load, and a clamping MOSFET (Q3) that shorts the output to ground between pulses to cleanly terminate each spark. The reported efficiency for this topology is around 85%.

The reason I gravitated toward this particular architecture is that it maps cleanly onto well-understood DC-DC converter theory. Every control technique I learned in Power Electronics — current-mode control, voltage-mode feedback, compensator design — applies directly. That meant I wasn't starting from zero on the control side, and it gave me confidence that the system could be meaningfully improved through iteration rather than requiring a complete redesign if something didn't work.

## The Control Architecture: Why Two Loops Matter

A bare switching topology will generate pulses, but it won't generate *good* pulses. EDM machining quality depends on maintaining a consistent spark gap, which means the power supply needs to actively respond to what's happening at the electrode. I implemented two layered feedback mechanisms to accomplish this.

**Peak Current Mode Control** handles the inner loop. It's an analog circuit built around an op-amp comparator and an SR latch. A Hall effect current sensor on the inductor output produces a voltage proportional to the instantaneous current. The comparator measures this against a reference voltage, and when the current exceeds the setpoint, it trips the latch and turns off the main switch. The microcontroller re-arms the latch on each pulse cycle by driving the Set pin.

I chose to implement PCMC in dedicated analog hardware rather than in firmware for one reason: speed. Cycle-by-cycle current limiting needs to respond within a switching period, and offloading that to a comparator and latch eliminates any firmware latency from the critical path. The microcontroller doesn't need to be in the loop for overcurrent protection — it just sets the target.

**Adaptive Voltage Positioning** forms the outer loop. The microcontroller reads the output voltage through a resistive divider and op-amp buffer, compares it against the expected value for the current machining conditions, and adjusts the PCMC reference accordingly. It does this by modulating a PWM output, which gets filtered through an RC low-pass network (16 kΩ / 100 nF, cutoff ~100 Hz) and scaled by a non-inverting amplifier with a gain of 1.5 (1 kΩ / 2 kΩ). The smoothed result becomes the current setpoint that drives the PCMC comparator.

This two-loop structure is what makes the design capable of real precision. The inner loop guarantees hard current limits on every switching cycle. The outer loop adapts the operating point based on what the spark gap is actually doing. Together, they allow the system to maintain consistent machining conditions even as the electrode wears or the gap geometry changes.

## Validating in Simulation Before Committing to Hardware

Before sending anything to a fab house, I ran the design through LTSpice. The simulation modeled the raw AVP topology with a resistor ahead of Q3 for clamping load, and a switched FET plus Zener diode approximating the spark. The results confirmed the circuit could produce a pulsed output — voltage building during pre-breakdown, dropping during the spark, and clamping to ground during the pause. The simulations gave me enough confidence in the topology and control scheme to move forward with board layout.

## PCB Layout: Where Theory Meets Parasitics

The schematic is only half the problem. In a high-current switching design, the PCB layout *is* the circuit — parasitic inductance in your current loops will ruin your day faster than a wrong component value.

**Minimizing high-current loop area** was the primary layout constraint for the power stage. The biggest challenge was the inductor. The design calls for 500 µH, which is physically large and expensive in a single package. I made the decision to split it across two series inductors and arrange them in alternating rotation. This sends the current loop back toward the switching devices instead of letting it sprawl outward across the board. Input and output capacitors sit immediately adjacent to the switches with their ground connections facing inward toward each other. The result is a compact, low-inductance power loop.

**Gate drive routing** received similar attention. I used a half-bridge gate driver IC with discrete gate drive amplifiers for the main switching pair (Q1 and Q2). The layout uses copper polygon pours rather than individual traces, and the drive paths to both MOSFETs are matched in length and geometry. For Q3's simpler clamping driver, I followed the same routing discipline to keep switching behavior predictable.

**Ground pours** are used extensively throughout the board, particularly around the power stage, to provide low-impedance return paths and reduce radiated EMI. In an EDM application this matters doubly — the machine itself is an EMI source, so the control electronics need to be as quiet as possible.

**Current sensing** uses a Hall effect sensor IC in series with the inductor output. I chose this approach over a shunt resistor primarily for simplicity of implementation and galvanic isolation from the high-current path. The IC outputs a voltage that scales linearly with current and feeds directly into the PCMC comparator.

**Voltage sensing** is handled by a repeatable op-amp circuit — a resistive divider (220 kΩ / 10 kΩ) feeding an LMV321 buffer with a filter capacitor on the output. I duplicated this subcircuit anywhere voltage measurement was needed on the board, which keeps the design modular and makes future revisions straightforward.

## Designing for Expandability

The RP2350B microcontroller I selected for Rev 1 has more GPIO than the pulse generator requires, and I made a deliberate decision not to leave any pins unrouted. Every unused GPIO, analog input, I2C, UART, and CAN bus line is broken out to two 20-pin headers arranged so that a daughter board can mount directly on top — similar to the Arduino shield concept.

The reasoning here is that a complete EDM machine needs precise stepper motor control for the electrode axis, and eventually for a full XY table. Rather than trying to cram everything onto one board, I designed the headers so that a dedicated motion control board could stack on and communicate over the shared bus.

For board-to-board communication, I included an automotive-grade CAN transceiver. EDM environments produce extreme electromagnetic interference, so a differential signaling protocol with built-in fault protection is a much safer choice than single-ended UART or bare SPI.

## The Silkscreen as Documentation

I designed this board to be a learning tool, not just a functioning circuit. Since the project is open source, I wanted someone unfamiliar with EDM to be able to pick up the board and immediately understand the functional architecture. The bottom silkscreen includes labeled bounding boxes around every major block: Main Output Pulse Generator, Gate Drive Circuitry, PCMC Circuit, Hall Current Sensing, Output Voltage Sense, Input Voltage Sense, Discharge Switching, and so on.

The board also carries the open source hardware logo, a high voltage warning, and the Kettering University branding. The design files are published on GitHub.

## Rev 1: What Went Wrong and What It Taught Me

I want to be upfront about the mistakes on the first revision, because they're some of the most valuable parts of this project.

**Several op-amps had their input pins swapped.** This required bodge wiring during bench debug and is the kind of error that makes you permanently paranoid about checking pin-1 orientation against the datasheet — not just the schematic symbol.

**The USB differential pair was crossed.** D+ and D- were swapped at the terminating resistors, a pin-mirroring error during layout. The board can't enumerate over USB without rework. This one taught me to always verify high-speed differential pairs against the physical connector pinout, not just the schematic net names.

**The RP2350B's 1.1V core rail was omitted.** This is the most significant mistake. The microcontroller's dedicated core voltage regulator input was missed during layout, meaning the MCU cannot power on without an external jumper supply. It happened because I rushed to close the layout under schedule pressure, and it burned into my workflow the discipline of verifying every power domain in the power tree before generating gerbers.

Despite these issues, incremental testing has been encouraging. Continuity checks confirmed the gate driver and bootstrap networks are intact and low-inductance. The gate-drive bias rails rise cleanly on bench power. The current-sense amplifier produces a linear output against injected test current. The MCU even briefly reached DFU bootloader mode before accumulated rework damage burned off a pad.

These aren't failures — they're the kind of hard-won lessons that transform abstract classroom warnings into permanent engineering instincts. Every one of these mistakes will influence how I approach my next design.

## Rev 2: A Different Strategy

For the second revision, I'm addressing every known issue from Rev 1, but I'm also making a fundamental architectural change: **Rev 2 has no onboard microcontroller.**

This might seem counterintuitive — the control system depends on a microcontroller — but the reasoning is practical. Rev 1 proved that debugging a tightly integrated board where the power stage, analog feedback, and digital control all live on one PCB is extremely difficult when multiple subsystems have issues simultaneously. If the MCU can't boot because of a missing rail, you can't test firmware. If the firmware isn't verified, you can't validate the control loops. Everything blocks everything else.

By removing the microcontroller from the pulse generator board and instead connecting it externally through the expansion headers, I gain the ability to independently verify the power stage and analog feedback circuits without any firmware dependency. I can inject test signals, probe every node, and validate the hardware in isolation. Once the analog subsystem is confirmed working, I can bring in a development board running the RP2350B and iterate on firmware without risking the power hardware.

This also makes the platform significantly more flexible for prototyping. Different microcontrollers can be swapped in without redesigning the pulse generator board, and the debugging workflow becomes dramatically simpler. The long-term plan is still a fully integrated single-board design, but getting there through a modular intermediate step is the smarter path — and frankly, it's the lesson Rev 1 was trying to teach me.

## Where This Is Going

The core architecture — buck-derived half-bridge with energy recovery, analog PCMC, and MCU-supervised AVP — is sound. Simulation confirmed it, and the portions of Rev 1 hardware that were testable validated it further. What Rev 1 lacked was execution discipline in the details: pin verification, power tree audits, and differential pair checks.

Rev 2 is being designed with those lessons fully internalized, and the modular approach will make bring-up and validation far more methodical. The end goal remains the same: a robust, open-source EDM pulse generator that's capable enough for real machining work and documented well enough for someone else to learn from, build on, or improve.

The design files are open source. If you're interested in power electronics, control systems, or EDM, I'd welcome collaboration.

---

*This project was completed as part of EE-499 at Kettering University under Professor Allan Taylor. The selected topology is from "Classification and comparative study of EDM pulse generators" by Kane, Phanse, Bahirat, and Kulkarni (IET Power Electronics, 2020). Additional references include work by Jiang & Kunieda (CIRP Annals, 2021) and Yang et al. (IEEE Transactions on Industrial Electronics, 2019).*