import Link from "next/link";
import styles from "../site.module.css";

export default function ResumePage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.hero}>
          <p className={styles.kicker}>Resume</p>
          <h1>Download Dan Abidov&apos;s Resume</h1>
          <p className={styles.lede}>
            Full PDF includes professional experience, education, technical
            projects, and detailed skill coverage.
          </p>
          <div className={styles.heroActions}>
            <Link
              className={styles.primaryAction}
              href="/Dan-Abidov-Resume.pdf"
              target="_blank"
            >
              Download Resume
            </Link>
            <Link className={styles.secondaryAction} href="/contact">
              Contact
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
