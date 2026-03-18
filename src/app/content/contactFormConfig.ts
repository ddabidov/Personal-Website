export const LINKEDIN_URL = "https://www.linkedin.com/in/dan-abidov";

export const CONTACT_PUBLIC_EMAIL = process.env.NEXT_PUBLIC_CONTACT_PUBLIC_EMAIL || "";

export const INQUIRY_TYPES = [
  "Job Opportunity",
  "Contract / Freelance",
  "Collaboration",
  "Speaking / Mentorship",
  "Project Question",
  "Other",
] as const;

export const TIMELINE_OPTIONS = ["Urgent", "2-4 weeks", "Flexible"] as const;
