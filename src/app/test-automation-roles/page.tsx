import type { Metadata } from "next";
import AudienceLandingPage from "@/app/UI/AudienceLandingPage/AudienceLandingPage";
import { audiencePages } from "@/app/content/siteContent";

export const metadata: Metadata = {
  title: "Dan Abidov - Test Automation Roles | LabVIEW, Validation, Production Test",
  description: audiencePages["test-automation-roles"].metaDescription,
};

export default function TestAutomationRolesPage() {
  return <AudienceLandingPage audienceKey="test-automation-roles" />;
}
