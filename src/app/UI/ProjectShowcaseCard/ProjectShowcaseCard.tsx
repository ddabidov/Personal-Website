import Link from "next/link";
import type { AudienceSegment, ProjectMeta } from "@/app/content/resumeData";
import styles from "@/app/site.module.css";

const audienceLabels: Record<AudienceSegment, string> = {
  embedded: "Embedded",
  "test-automation": "Test Automation",
  consulting: "Consulting",
};

type ProjectShowcaseCardProps = {
  project: ProjectMeta;
  showAudiences?: boolean;
};

export default function ProjectShowcaseCard({
  project,
  showAudiences = true,
}: ProjectShowcaseCardProps) {
  return (
    <Link href={`/projects/${project.slug}`} className={styles.projectCardLink}>
      <article className={`${styles.projectCard} ${styles.projectShowcaseCard}`}>
        <p className={styles.projectCardEyebrow}>Project</p>
        <h3>{project.title}</h3>
        <p className={styles.projectCardLead}>{project.ctaSummary}</p>
        {showAudiences ? (
          <ul className={styles.tagList} aria-label={`${project.title} audience fit`}>
            {project.audiences.map((audience) => (
              <li key={`${project.slug}-${audience}`} className={styles.tag}>
                {audienceLabels[audience]}
              </li>
            ))}
          </ul>
        ) : null}
      </article>
    </Link>
  );
}
