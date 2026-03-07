import Link from "next/link";
import styles from "./site.module.css";

export default function Home() {
  return (
    <div className={styles.page} id="top">
      <main className={styles.main}>
        <section className={styles.hero} aria-labelledby="hero-heading">
          <p className={styles.kicker}>Systems Engineer | Embedded + Test</p>
          <h1 id="hero-heading">
            Dan Abidov: Hardware and Embedded Engineer Focused on Automated
            Test Systems, PCB Design, and Real-Time Firmware.
          </h1>
          <p className={styles.lede}>
            I currently work at Spherea (Formerly Konrad Technologies) building
            LabVIEW-based test architectures and integrated hardware-software
            validation systems.
          </p>
          <div className={styles.heroActions}>
            <Link className={styles.primaryAction} href="/experience">
              View Experience
            </Link>
            <Link className={styles.secondaryAction} href="/contact">
              Contact
            </Link>
          </div>
          <ul className={styles.metrics}>
            <li>
              <span>4+ Years</span>
              Engineering experience across test, embedded, and hardware roles.
            </li>
            <li>
              <span>BSE</span>
              Computer Engineering degree with an Electrical Engineering minor.
            </li>
            <li>
              <span>2025</span>
              Graduated from Kettering University in December 2025.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>About Me</h2>
          <div className={styles.card}>
            <p>
              I am a Systems Engineer with a Computer Engineering background and
              an Electrical Engineering minor from Kettering University. My work
              sits at the intersection of automated test systems, embedded
              firmware, and practical hardware development.
            </p>
            <p>
              I enjoy building reliable technical workflows, debugging complex
              mixed hardware-software systems, and translating requirements into
              production-ready engineering outcomes.
            </p>
            <div className={styles.heroActions}>
              <Link className={styles.secondaryAction} href="/projects">
                View Projects
              </Link>
              <Link className={styles.secondaryAction} href="/contact">
                Contact
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
