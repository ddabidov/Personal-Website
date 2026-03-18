import type { Metadata } from "next";
import ProjectTimeline from "../UI/ProjectTimeline/ProjectTimeline";
import styles from "../site.module.css";

export const metadata: Metadata = {
  title: "Dan Abidov - Projects | Embedded, PCB, LabVIEW Validation",
  description:
    "Engineering projects covering automated cable validation, mixed-signal board design, high-power PCB debugging, and embedded wireless control.",
};

export default function ProjectsPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.hero}>
          <p className={styles.kicker}>Projects</p>
          <h1>Projects</h1>
          <p className={styles.lede}>
            Newest projects appear first. Open a row to jump straight into the full project details.
          </p>
        </section>

        <section className={`${styles.section} ${styles.sectionCentered}`}>
          <ProjectTimeline />
        </section>
      </main>
    </div>
  );
}
