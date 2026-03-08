export const LINKEDIN_URL = "https://www.linkedin.com/in/dan-abidov";

export const CONTACT_TARGET_EMAIL = process.env.NEXT_PUBLIC_CONTACT_TARGET ?? "";

export const INQUIRY_TYPES = [
  "Job Opportunity",
  "Contract / Freelance",
  "Collaboration",
  "Speaking / Mentorship",
  "Project Question",
  "Other",
] as const;

export const TIMELINE_OPTIONS = ["Urgent", "2-4 weeks", "Flexible"] as const;
