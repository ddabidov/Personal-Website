import Link from "next/link";
import styles from "../site.module.css";
import { education, experience, projects, skills } from "../content/resumeData";

const reversedProjects = [...projects].reverse();

export default function ExperiencePage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.hero} id="experience">
          <p className={styles.kicker}>Experience</p>
          <h1>Professional Experience and Engineering Background</h1>
          <p className={styles.lede}>
            Systems engineering, embedded development, and test automation
            experience in production and academic environments.
          </p>
        </section>

        <section id="education" className={styles.section}>
          <h2>Education</h2>
          <div className={styles.card}>
            <h3>{education.school}</h3>
            <p className={styles.projectMeta}>
              <strong>{education.degree}</strong>
            </p>
            <p className={styles.projectMeta}>
              {education.period} | {education.gpa}
            </p>
            <ul className={styles.list}>
              <li>
                <strong>Relevant Coursework:</strong> {education.coursework}
              </li>
              <li>
                <strong>Extracurriculars:</strong> {education.activities}
              </li>
              <li>{education.capstone}</li>
              <li>{education.thesis}</li>
            </ul>
          </div>
        </section>

        <section className={styles.section}>
          <h2>Professional Roles</h2>
          <div className={styles.timeline}>
            {experience.map((item) => (
              <article
                key={`${item.period}-${item.role}`}
                className={`${styles.timelineItem} ${styles.timelineHoverCard}`}
              >
                <p className={styles.timelineDate}>{item.period}</p>
                <h3>{item.role}</h3>
                <p className={styles.timelineCompany}>{item.company}</p>
                <ul className={styles.experienceBullets}>
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className={styles.section}>
          <h2>Projects</h2>
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

        <section id="skills" className={styles.section}>
          <h2>Skills</h2>
          <div className={styles.skillsGrid}>
            {skills.map((skill) => (
              <article key={skill.title} className={styles.skillsCard}>
                <h3>{skill.title}</h3>
                <p>{skill.items}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2>Resume</h2>
          <div className={styles.card}>
            <p>
              Download the full resume PDF with complete timeline and technical
              details.
            </p>
            <Link
              className={styles.primaryAction}
              href="/Dan-Abidov-Resume.pdf"
              target="_blank"
            >
              Download Resume
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
