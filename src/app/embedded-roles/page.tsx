import type { Metadata } from "next";
import AudienceLandingPage from "@/app/UI/AudienceLandingPage/AudienceLandingPage";
import { audiencePages } from "@/app/content/siteContent";

export const metadata: Metadata = {
  title: "Dan Abidov - Embedded Roles | PCB Design, Firmware, Bring-Up",
  description: audiencePages["embedded-roles"].metaDescription,
};

export default function EmbeddedRolesPage() {
  return <AudienceLandingPage audienceKey="embedded-roles" />;
}
