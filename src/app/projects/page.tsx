import Link from "next/link";
import { projects } from "../content/resumeData";
import styles from "../site.module.css";

const reversedProjects = [...projects].reverse();

export default function ProjectsPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.hero}>
          <p className={styles.kicker}>Projects</p>
          <h1>Technical Projects</h1>
          <p className={styles.lede}>
            Project summaries and deeper build notes across hardware, firmware,
            and system validation.
          </p>
        </section>

        <section className={styles.section}>
          <div className={styles.projectGrid}>
            {reversedProjects.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className={styles.projectCardLink}
              >
                <article className={styles.projectCard}>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <p className={styles.projectMeta}>
                    <strong>Stack:</strong> {project.stack}
                  </p>
                  <p className={styles.projectMeta}>
                    <strong>Outcome:</strong> {project.outcome}
                  </p>
                </article>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
