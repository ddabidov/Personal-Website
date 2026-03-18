import { CONTACT_PUBLIC_EMAIL, LINKEDIN_URL } from "./contactFormConfig";

export const siteConfig = {
  name: "Dan Abidov",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  defaultTitle: "Dan Abidov - Embedded Systems Engineer | PCB Design, Firmware, LabVIEW Test",
  defaultDescription:
    "Embedded and test engineer building PCB-based systems, firmware, and LabVIEW validation tools for faster bring-up and production test.",
  linkedInUrl: LINKEDIN_URL,
  publicEmail: CONTACT_PUBLIC_EMAIL,
} as const;

export const homePageContent = {
  title: "Dan Abidov",
  subtitle: "Embedded & Test Engineer",
  bio:
    "I'm an embedded systems and test engineer based in Michigan with a B.S.E. in Computer Engineering and an Electrical Engineering minor from Kettering University. I currently work at Spherea as a Systems Engineer building LabVIEW-based test architectures for hardware and software validation. My background spans PCB design and bring-up, firmware development on STM32 and RP platforms, mixed-signal debugging, and automated test systems using NI PXIe and cDAQ hardware. I'm driven by the challenge of turning fragile prototypes into reliable, production-ready engineering systems.",
} as const;

export const audiencePages = {
  "embedded-roles": {
    title: "For Embedded Roles",
    lede:
      "A focused view of Dan Abidov's PCB design, mixed-signal debugging, embedded integration, and board bring-up work.",
    ctaLabel: "Email me about embedded roles",
    ctaNote:
      "Best fit for teams hiring around board bring-up, firmware integration, mixed-signal debugging, and embedded systems validation.",
    featuredProjectSlugs: [
      "high-fidelity-dac",
      "high-power-pulse-generator-pcb",
      "four-player-wireless-game-station",
    ],
    featuredExperienceIds: ["actalent-hardware-test", "kettering-makerspace"],
    metaDescription:
      "Embedded systems portfolio focused on PCB design, firmware integration, mixed-signal debugging, and hardware bring-up projects.",
  },
  "test-automation-roles": {
    title: "For Test Automation Roles",
    lede:
      "A focused view of LabVIEW validation systems, automated cable testing, and requirement-aligned production test engineering work.",
    ctaLabel: "Email me about test automation roles",
    ctaNote:
      "Best fit for teams hiring around LabVIEW, validation workflows, automated test architecture, and production test support.",
    featuredProjectSlugs: [
      "automatic-cable-harness-tester",
      "high-power-pulse-generator-pcb",
      "high-fidelity-dac",
    ],
    featuredExperienceIds: ["spherea-systems-engineer", "spherea-coop"],
    metaDescription:
      "Test automation portfolio featuring LabVIEW architecture, cable and harness validation, and automated production test workflows.",
  },
  consulting: {
    title: "For Contract / Consulting Work",
    lede:
      "A focused view of project-based engineering support for prototype bring-up, validation tooling, mixed-signal debugging, and practical system integration.",
    ctaLabel: "Email me about a project",
    ctaNote:
      "Best fit for teams that need hands-on support moving from prototype uncertainty toward stable validation and bring-up.",
    featuredProjectSlugs: [
      "automatic-cable-harness-tester",
      "high-power-pulse-generator-pcb",
      "high-fidelity-dac",
    ],
    featuredExperienceIds: [
      "spherea-systems-engineer",
      "actalent-hardware-test",
      "kettering-makerspace",
    ],
    metaDescription:
      "Engineering consulting portfolio featuring validation tooling, PCB bring-up, mixed-signal debugging, and practical prototype-to-system work.",
  },
} as const;

export type AudiencePageKey = keyof typeof audiencePages;

export const personStructuredData = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: siteConfig.siteUrl,
  name: siteConfig.name,
  description: siteConfig.defaultDescription,
  mainEntity: {
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.siteUrl,
    jobTitle: "Embedded and Test Engineer",
    alumniOf: "Kettering University",
    sameAs: [siteConfig.linkedInUrl],
    worksFor: {
      "@type": "Organization",
      name: "Spherea",
    },
    email: siteConfig.publicEmail || undefined,
  },
} as const;
