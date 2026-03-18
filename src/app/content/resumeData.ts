export type AudienceSegment = "embedded" | "test-automation" | "consulting";

export type QuantMetric = {
  label: string;
  value: string;
};

export type ProjectMeta = {
  slug: string;
  date: string;
  title: string;
  summary: string;
  ctaSummary: string;
  stack: string;
  repoUrl: string;
  audiences: AudienceSegment[];
};

export type ExperienceEntry = {
  id: string;
  period: string;
  role: string;
  company: string;
  summary: string;
  audiences: AudienceSegment[];
  resultBullets: string[];
  metrics: QuantMetric[];
};

export const projects = [
  {
    slug: "automatic-cable-harness-tester",
    date: "2025-08-01",
    title: "Automatic Cable and Harness Tester (Senior Thesis)",
    summary:
      "Built an automated LabVIEW cable and harness validation workflow to replace repetitive manual checks and improve production-style verification readiness.",
    ctaSummary:
      "LabVIEW-driven cable validation workflow built to reduce manual verification effort and improve repeatability.",
    stack: "NI LabVIEW, Automated Test Engineering, Requirements Analysis",
    repoUrl: "",
    audiences: ["test-automation", "consulting"],
  },
  {
    slug: "four-player-wireless-game-station",
    date: "2025-06-01",
    title: "4-Player Wireless Game Station (Capstone)",
    summary:
      "Designed a multi-node embedded gaming platform using RP2040 controllers and NRF24 links for responsive multiplayer control.",
    ctaSummary:
      "Embedded multiplayer platform focused on low-latency input handling and stable multi-node wireless integration.",
    stack: "C/C++, RP2040, NRF24, Embedded Networking",
    repoUrl: "https://github.com/ddabidov/CE-Capstone-Project",
    audiences: ["embedded", "consulting"],
  },
  {
    slug: "high-power-pulse-generator-pcb",
    date: "2025-06-01",
    title: "High-Power Pulse Generator PCB",
    summary:
      "Developed and debugged a high-power switching board for electrical discharge machining with adaptive voltage positioning and peak current control.",
    ctaSummary:
      "High-power PCB bring-up and control-loop debugging for repeatable spark regulation under demanding switching conditions.",
    stack: "Power Electronics, PCB Debugging, Control Loops",
    repoUrl: "",
    audiences: ["embedded", "consulting"],
  },
  {
    slug: "high-fidelity-dac",
    date: "2026-01-01",
    title: "High-Fidelity Digital-to-Analog Converter",
    summary:
      "Built a mixed-signal DAC platform with USB-to-I2S transport and a custom analog stage for low-noise audio conversion.",
    ctaSummary:
      "Mixed-signal board design covering digital transport, analog output staging, and practical bring-up access for low-noise audio performance.",
    stack: "XMOS MCU, ES9039 DAC, LTspice, PCB Fabrication",
    repoUrl: "https://github.com/ddabidov/Headphone-DAC-AMP",
    audiences: ["embedded", "consulting"],
  },
  {
    slug: "nfc-business-card",
    date: "2026-02-01",
    title: "NFC Business Card",
    summary:
      "Designed a single-chip NFC business card using an NTAG213 with a tuned PCB trace antenna, minimizing the BOM to one component while packing the back with practical engineering references.",
    ctaSummary:
      "Single-chip NFC card with a custom trace antenna tuned to the NTAG213's internal capacitance, doubling as an engineering reference tool.",
    stack: "NTAG213, PCB Antenna Design, NFC, KiCad",
    repoUrl: "https://github.com/ddabidov/NFC-Buisness-Card",
    audiences: ["embedded", "consulting"],
  },
] satisfies readonly ProjectMeta[];

export const experience = [
  {
    id: "spherea-systems-engineer",
    period: "December 2025 - Present",
    role: "Systems Engineer",
    company: "Spherea (formerly Konrad Technologies) - Farmington Hills, MI",
    summary:
      "Builds and supports LabVIEW-based test architectures used for integrated hardware and software validation.",
    audiences: ["test-automation", "consulting"],
    resultBullets: [
      "Programs test system architecture and device-driver behavior in NI LabVIEW for automated validation workflows.",
      "Integrates measurement hardware and software to support repeatable system verification.",
      "Uses self-tests and hands-on validation to confirm hardware readiness before broader deployment.",
    ],
    metrics: [],
  },
  {
    id: "spherea-coop",
    period: "June 2023 - December 2025",
    role: "Systems Engineering Co-Op",
    company: "Spherea (formerly Konrad Technologies) - Farmington Hills, MI",
    summary:
      "Focused on automated validation workflows and requirement-aligned production test support.",
    audiences: ["test-automation", "consulting"],
    resultBullets: [
      "Automated manual cable verification processes as part of thesis work tied to production-style validation goals.",
      "Supported requirements analysis and validation planning for production test workflows.",
      "Built tools aimed at improving test-cycle efficiency and reducing repetitive operator effort.",
    ],
    metrics: [],
  },
  {
    id: "actalent-hardware-test",
    period: "August 2021 - March 2023",
    role: "Hardware Test Engineer",
    company: "Actalent Services - Troy, MI",
    summary:
      "Worked across PCB design, firmware migration, and test-support tooling for hardware development teams.",
    audiences: ["embedded", "consulting"],
    resultBullets: [
      "Designed high-density 6-layer fiber-optic PCBs in Altium Designer.",
      "Ported FreeRTOS-based firmware to updated microcontroller hardware platforms.",
      "Implemented an asset tracking system that improved visibility into equipment usage and ownership.",
    ],
    metrics: [],
  },
  {
    id: "kettering-makerspace",
    period: "November 2021 - December 2025",
    role: "Makerspace Student Lead",
    company: "Kettering University - Flint, MI",
    summary:
      "Led makerspace operations, equipment upgrades, prototyping workflows, and student training.",
    audiences: ["embedded", "consulting"],
    resultBullets: [
      "Upgraded equipment by introducing higher-performance 3D printing workflows.",
      "Led student workshops on prototyping, 3D printing, and circuit development.",
      "Established a PCB and circuit prototyping station while managing procurement and upkeep.",
    ],
    metrics: [],
  },
] satisfies readonly ExperienceEntry[];

export const education = {
  school: "Kettering University - Flint, MI",
  degree: "B.S.E. in Computer Engineering, Electrical Engineering minor",
  graduation: "Graduated December 2025",
  gpa: "GPA: 3.04",
  coursework:
    "Real-Time Embedded Systems, PCB Design and Testing, Microcomputers, Internet of Things, Electronics and Circuits, Signals and Systems",
  activities:
    "Makerspace Leader, SAE Aero Design, Phi Gamma Delta chapter leadership",
  capstone:
    "Capstone Project: 4-Player Wireless Game Station (RP2040 and NRF24 based)",
  thesis:
    "Senior Thesis: Investigation and implementation of an automatic cable and harness tester",
} as const;

export const skills = [
  {
    title: "Hardware and PCB Design",
    items:
      "PCB prototyping, Altium Designer, KiCad, cable and harness design, hardware debugging, electrical analysis",
  },
  {
    title: "Embedded Systems and Firmware",
    items:
      "C/C++, STM32, ESP32, RP platforms, XMOS, peripheral driver development, firmware debugging, real-time systems, LabVIEW DQMH",
  },
  {
    title: "Software and Tools",
    items: "NI LabVIEW, VS Code, Azure DevOps, Git, SVN, MATLAB, MS Office, CAD",
  },
  {
    title: "Testing and Engineering Systems",
    items:
      "NI PXIe and cDAQ configuration, automated testing in LabVIEW, DAQ driver integration, requirements traceability",
  },
  {
    title: "Prototyping and Fabrication",
    items:
      "PCBA assembly, SMD bring-up, 3D printing, system assembly, equipment maintenance",
  },
] as const;

export function getProjectsByAudience(audience: AudienceSegment) {
  return projects.filter((project) =>
    (project.audiences as readonly AudienceSegment[]).includes(audience),
  );
}

export function getExperienceByAudience(audience: AudienceSegment) {
  return experience.filter((role) =>
    (role.audiences as readonly AudienceSegment[]).includes(audience),
  );
}
