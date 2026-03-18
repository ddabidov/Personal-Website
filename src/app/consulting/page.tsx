import type { Metadata } from "next";
import AudienceLandingPage from "@/app/UI/AudienceLandingPage/AudienceLandingPage";
import { audiencePages } from "@/app/content/siteContent";

export const metadata: Metadata = {
  title: "Dan Abidov - Engineering Consulting | Validation, PCB Bring-Up, Systems",
  description: audiencePages.consulting.metaDescription,
};

export default function ConsultingPage() {
  return <AudienceLandingPage audienceKey="consulting" />;
}
