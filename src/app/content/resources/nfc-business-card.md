## Problem

Traditional business cards are passive and easily lost. An NFC-enabled card can push contact information directly to a phone, but most designs require multiple passive components for the antenna matching network, increasing cost and complexity for a simple card form factor.

## My Role

I designed the full PCB business card, including the antenna trace geometry, component selection, and the reference artwork on the back. The goal was to minimize the bill of materials to a single chip while still achieving reliable NFC reads.

## Constraints

- The antenna had to resonate at 13.56 MHz using only the NTAG213's internal 50 pF capacitance, eliminating external matching components.
- The card needed to be thin enough for a standard card holder and durable enough for everyday carry.
- The NFC payload had to gracefully degrade — delivering contact info when supported, falling back to a website URL otherwise.

## What I Built

- Designed a PCB trace antenna tuned to resonate with the NTAG213's 50 pF internal capacitance, bringing the total component count down to one.
- Programmed the NTAG213 to attempt sending contact information on scan, with a fallback to the portfolio website URL.
- Packed the back of the card with practical engineering references: metric and imperial rulers, trace width maximum current charts, common text sizes, and an Ohm's law triangle.

## Results

- Achieved a single-component BOM for the entire NFC business card.
- The card reliably scans with standard smartphones and delivers contact info or redirects to the website.
- The back serves as a handy reference tool, making the card useful beyond just networking.
