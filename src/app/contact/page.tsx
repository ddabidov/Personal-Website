import Link from "next/link";
import styles from "../site.module.css";

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.hero}>
          <p className={styles.kicker}>Contact</p>
          <h1>Get in Touch</h1>
          <p className={styles.lede}>
            Available for Systems Engineering, Embedded Development, and Test
            Automation opportunities.
          </p>
          <div className={styles.contactActions}>
            <a className={styles.primaryAction} href="mailto:ddabidov@gmail.com">
              ddabidov@gmail.com
            </a>
            <a className={styles.secondaryAction} href="tel:+15205994990">
              520-599-4990
            </a>
            <a
              className={styles.secondaryAction}
              href="https://www.linkedin.com/in/dan-abidov"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <Link className={styles.secondaryAction} href="/resume">
              Resume
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
