export const projects = [
  {
    slug: "automatic-cable-harness-tester",
    title: "Automatic Cable and Harness Tester (Senior Thesis)",
    summary:
      "Investigated and implemented an automated cable verification workflow through Konrad Technologies to replace manual test steps.",
    stack: "NI LabVIEW, Automated Test Engineering, Requirements Analysis",
    outcome:
      "Improved quality checks and reduced manual verification time by automating repeatable validation paths.",
    repoUrl: "https://github.com/ddabidov",
    article: [
      "This thesis focused on replacing repetitive manual cable verification with a structured automated workflow. The goal was to improve repeatability, reduce verification time, and increase confidence in final test results.",
      "I implemented system-level test logic in LabVIEW, aligned validation behavior with requirements, and built a process that reduced manual intervention while preserving traceability.",
      "The final output was a practical test flow that supported more consistent quality checks and better production efficiency.",
    ],
  },
  {
    slug: "four-player-wireless-game-station",
    title: "4-Player Wireless Game Station (Capstone)",
    summary:
      "Designed a multi-node embedded gaming platform using RP2040 controllers and NRF24 wireless communication.",
    stack: "C/C++, RP2040, NRF24, Embedded Networking",
    outcome:
      "Delivered a working team capstone integrating real-time input handling, wireless links, and embedded control logic.",
    repoUrl: "https://github.com/ddabidov",
    article: [
      "This capstone project explored reliable low-latency multiplayer communication on resource-constrained hardware using RP2040 and NRF24 devices.",
      "I contributed to embedded firmware architecture, wireless messaging behavior, and integration across multiple game nodes to maintain responsiveness.",
      "The final system demonstrated stable multi-node operation and consistent embedded control behavior in a real demo environment.",
    ],
  },
  {
    slug: "high-power-pulse-generator-pcb",
    title: "High-Power Pulse Generator PCB",
    summary:
      "Developed a high-power switching spark generator for electrical discharge machining and iterated hardware revisions after bring-up debugging.",
    stack: "Power Electronics, PCB Debugging, Control Loops",
    outcome:
      "Implemented adaptive voltage positioning and peak current mode control for spark regulation.",
    repoUrl: "https://github.com/ddabidov",
    article: [
      "This project centered on switching behavior for electrical discharge machining, where pulse shape and current control are critical to predictable performance.",
      "I debugged initial board revisions, analyzed control behavior, and iterated hardware to improve stability under high-power conditions.",
      "Adaptive voltage positioning and peak current mode control were used to achieve improved spark regulation and repeatable operation.",
    ],
  },
  {
    slug: "high-fidelity-dac",
    title: "High-Fidelity Digital-to-Analog Converter",
    summary:
      "Built a low-noise mixed-signal DAC platform with USB-to-I2S bridge and custom analog amplification stage.",
    stack: "XMOS MCU, ES9039 DAC, LTspice, PCB Fabrication",
    outcome:
      "Completed design and fabrication of a mixed-signal board focused on low-noise audio performance.",
    repoUrl: "https://github.com/ddabidov",
    article: [
      "This design combined digital transport and analog output stages for a high-fidelity converter platform with mixed-signal layout constraints.",
      "I implemented a USB interface through XMOS as an I2S bridge, built an analog stage in LTspice, and translated the design to a fabricated board.",
      "The final board targeted low-noise behavior, practical debug access, and high signal integrity across digital and analog domains.",
    ],
  },
] as const;

export const experience = [
  {
    period: "December 2025 - Present",
    role: "Systems Engineer",
    company: "Spherea (Formerly Konrad Technologies) - Farmington Hills, MI",
    bullets: [
      "Programmed test system architecture and device drivers in NI LabVIEW.",
      "Integrated hardware and software for automated test systems with high measurement accuracy.",
      "Conducted self-tests and manual verification to validate hardware system performance.",
    ],
  },
  {
    period: "June 2023 - December 2025",
    role: "Systems Engineering Co-Op",
    company: "Spherea (Formerly Konrad Technologies) - Farmington Hills, MI",
    bullets: [
      "Automated manual cable verification processes as part of thesis work.",
      "Supported requirements analysis and validation for production test workflows.",
      "Built tools focused on quality and test-cycle efficiency improvements.",
    ],
  },
  {
    period: "August 2021 - March 2023",
    role: "Hardware Test Engineer",
    company: "Actalent Services - Troy, MI",
    bullets: [
      "Designed high-density 6-layer fiber-optic PCBs in Altium Designer.",
      "Ported FreeRTOS-based firmware to updated microcontroller hardware platforms.",
      "Implemented an asset tracking system to improve operational efficiency.",
    ],
  },
  {
    period: "November 2021 - December 2025",
    role: "Makerspace Student Lead",
    company: "Kettering University - Flint, MI",
    bullets: [
      "Upgraded equipment by introducing high-performance 3D printers and workflows.",
      "Led student workshops on prototyping, 3D printing, and circuit development.",
      "Established a PCB and circuit prototyping station and managed procurement workflows.",
    ],
  },
] as const;

export const education = {
  school: "Kettering University - Flint, MI",
  period: "2021 - 2025 (Graduated December 2025)",
  degree: "BSE in Computer Engineering, Electrical Engineering Minor",
  gpa: "GPA: 3.04",
  coursework:
    "Real-Time Embedded Systems, PCB Design and Testing, Microcomputers, Internet of Things, Electronics and Circuits, Signals and Systems",
  activities:
    "Makerspace Leader, SAE Aero Design, Phi Gamma Delta Chapter Leader",
  capstone:
    "Capstone Project: 4-Player Wireless Game Station (RP2040 and NRF24 Based)",
  thesis:
    "Senior Thesis: Investigation and Implementation of an Automatic Cable and Harness Tester",
} as const;

export const skills = [
  {
    title: "Hardware and PCB Design",
    items:
      "PCB Prototyping, Altium Designer, KiCad, Cable and Harness Design, Hardware Debugging, Electrical Analysis",
  },
  {
    title: "Embedded Systems and Firmware",
    items:
      "C/C++, STM32, ESP32, RP Platforms, XMOS, Peripheral Driver Development, Object-Oriented Programming, Firmware Debugging, Real-Time Systems, LabVIEW DQMH",
  },
  {
    title: "Software and Tools",
    items: "NI LabVIEW, VS Code, Azure DevOps, Git, SVN, MATLAB, MS Office, CAD",
  },
  {
    title: "Testing and Engineering Systems",
    items:
      "NI PXIe and cDAQ Configuration, Automated Testing (LabVIEW), DAQ Driver Integration, Requirements Traceability",
  },
  {
    title: "Prototyping and Fabrication",
    items:
      "PCBA Assembly, SMD Bring-Up, 3D Printing, System Assembly, Equipment Maintenance",
  },
] as const;
