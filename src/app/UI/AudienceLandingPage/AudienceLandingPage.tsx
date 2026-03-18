import Link from "next/link";
import { audiencePages, type AudiencePageKey } from "@/app/content/siteContent";
import { experience, projects } from "@/app/content/resumeData";
import styles from "@/app/site.module.css";
import ProjectShowcaseCard from "@/app/UI/ProjectShowcaseCard/ProjectShowcaseCard";

const audienceLabels: Record<AudiencePageKey, string> = {
  "embedded-roles": "Embedded Roles",
  "test-automation-roles": "Test Automation Roles",
  consulting: "Contract / Consulting",
};

type AudienceLandingPageProps = {
  audienceKey: AudiencePageKey;
};

export default function AudienceLandingPage({
  audienceKey,
}: AudienceLandingPageProps) {
  const content = audiencePages[audienceKey];
  const featuredProjects = content.featuredProjectSlugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project) => project !== undefined);
  const featuredExperience = content.featuredExperienceIds
    .map((id) => experience.find((role) => role.id === id))
    .filter((role) => role !== undefined);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.hero}>
          <p className={styles.kicker}>Audience Path</p>
          <h1>{content.title}</h1>
          <p className={styles.lede}>{content.lede}</p>
          <div className={styles.heroActions}>
            <Link className={styles.primaryAction} href="/contact">
              {content.ctaLabel}
            </Link>
            <Link className={styles.secondaryAction} href="/projects">
              Browse all projects
            </Link>
          </div>
          <div className={styles.inlineCallout}>
            <strong>{audienceLabels[audienceKey]} fit:</strong> {content.ctaNote}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Relevant Projects</h2>
          </div>
          <div className={styles.projectGrid}>
            {featuredProjects.map((project) => (
              <ProjectShowcaseCard key={project.slug} project={project} />
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Relevant Experience</h2>
          </div>
          <div className={styles.storyGrid}>
            {featuredExperience.map((role) => (
              <article key={role.id} className={styles.card}>
                <p className={styles.timelineDate}>{role.period}</p>
                <h3>{role.role}</h3>
                <p className={styles.timelineCompany}>{role.company}</p>
                <p>{role.summary}</p>
                <ul className={styles.list}>
                  {role.resultBullets.map((bullet) => (
                    <li key={`${role.id}-${bullet}`}>{bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
