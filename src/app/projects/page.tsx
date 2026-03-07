import ProjectTimeline from "../UI/ProjectTimeline/ProjectTimeline";
import styles from "../site.module.css";

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

        <section className={`${styles.section} ${styles.sectionCentered}`}>
          <h2>Project Timeline</h2>
          <p className={styles.sectionIntro}>
            Newest projects appear first. Hover or focus a row to preview the
            build details, then open the full project page.
          </p>
          <ProjectTimeline />
        </section>
      </main>
    </div>
  );
}
