import Link from "next/link";
import type { ProjectMeta } from "@/app/content/resumeData";
import type { ProjectNarrative } from "@/app/content/projectMarkdown";
import styles from "@/app/site.module.css";

type ProjectDetailLayoutProps = {
  project: ProjectMeta;
  narrative: ProjectNarrative;
};

export default function ProjectDetailLayout({
  project,
  narrative,
}: ProjectDetailLayoutProps) {
  return (
    <article className={styles.hackadayArticle}>
      <header className={styles.articleHeader}>
        <div>
          <p className={styles.kicker}>Project</p>
          <h1>{project.title}</h1>
          <p className={styles.articleMeta}>{project.stack}</p>
          <p className={styles.caseStudyLead}>{project.summary}</p>
        </div>
        <div className={styles.caseStudyHeaderActions}>
          {project.repoUrl ? (
            <a
              className={styles.primaryAction}
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Git repo
            </a>
          ) : null}
          <Link className={styles.secondaryAction} href="/contact">
            Ask about this project
          </Link>
        </div>
      </header>

      <section className={styles.articleBody}>
        {narrative.kind === "article" ? (
          <div
            className={styles.caseStudySection}
            dangerouslySetInnerHTML={{ __html: narrative.html }}
          />
        ) : (
          <>
            <section className={styles.caseStudySection}>
              <h2>Problem</h2>
              <p>{narrative.problem}</p>
            </section>

            <section className={styles.caseStudySection}>
              <h2>My Role</h2>
              <p>{narrative.role}</p>
            </section>

            <section className={styles.caseStudySection}>
              <h2>Constraints</h2>
              <ul className={styles.list}>
                {narrative.constraints.map((constraint) => (
                  <li key={`${project.slug}-${constraint}`}>{constraint}</li>
                ))}
              </ul>
            </section>

            <section className={styles.caseStudySection}>
              <h2>What I Built</h2>
              <ul className={styles.list}>
                {narrative.whatIBuilt.map((item) => (
                  <li key={`${project.slug}-${item}`}>{item}</li>
                ))}
              </ul>
            </section>

            <section className={styles.caseStudySection}>
              <h2>Result</h2>
              <ul className={styles.list}>
                {narrative.results.map((item) => (
                  <li key={`${project.slug}-${item}`}>{item}</li>
                ))}
              </ul>
            </section>
          </>
        )}

      </section>

      <div className={styles.heroActions}>
        <Link className={styles.secondaryAction} href="/projects">
          Back to projects
        </Link>
      </div>
    </article>
  );
}
