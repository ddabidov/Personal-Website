export type ProjectTimelineEntry = {
  date: string;
  title: string;
  summary: string;
  href: `/projects/${string}`;
};

export const projectsTimeline = [
  {
    date: "2025-12-01",
    title: "Automatic Cable and Harness Tester (Senior Thesis)",
    summary:
      "Automated cable verification in LabVIEW to replace repetitive manual test steps and improve validation throughput.",
    href: "/projects/automatic-cable-harness-tester",
  },
  {
    date: "2025-09-01",
    title: "4-Player Wireless Game Station (Capstone)",
    summary:
      "Built a multiplayer embedded platform with RP2040 controllers and NRF24 links for low-latency real-time gameplay.",
    href: "/projects/four-player-wireless-game-station",
  },
  {
    date: "2024-07-01",
    title: "High-Power Pulse Generator PCB",
    summary:
      "Designed and debugged a high-power switching board with adaptive voltage positioning and current mode control.",
    href: "/projects/high-power-pulse-generator-pcb",
  },
  {
    date: "2024-03-01",
    title: "High-Fidelity Digital-to-Analog Converter",
    summary:
      "Delivered a low-noise mixed-signal DAC design with USB-to-I2S transport and custom analog output staging.",
    href: "/projects/high-fidelity-dac",
  },
] satisfies ReadonlyArray<ProjectTimelineEntry>;
