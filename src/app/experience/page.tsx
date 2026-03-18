import type { Metadata } from "next";
import Link from "next/link";
import ProjectShowcaseCard from "../UI/ProjectShowcaseCard/ProjectShowcaseCard";
import styles from "../site.module.css";
import { education, experience, projects, skills } from "../content/resumeData";

export const metadata: Metadata = {
  title: "Dan Abidov - Experience | Systems Engineering, Test Automation, Embedded Work",
  description:
    "Professional experience in systems engineering, LabVIEW test automation, PCB development, and embedded bring-up with proof-oriented role summaries.",
};

export default function ExperiencePage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.hero} id="experience">
          <p className={styles.kicker}>Experience</p>
          <h1>Experience</h1>
        </section>

        <section id="education" className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Education</h2>
          </div>
          <div className={styles.card}>
            <h3>{education.school}</h3>
            <p className={styles.projectMeta}>
              <strong>{education.degree}</strong>
            </p>
            <p className={styles.projectMeta}>
              {education.graduation} | {education.gpa}
            </p>
            <ul className={styles.list}>
              <li>
                <strong>Relevant coursework:</strong> {education.coursework}
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
          <div className={styles.sectionHeader}>
            <h2>Professional Roles</h2>
          </div>
          <div className={styles.storyGrid}>
            {experience.map((item) => (
              <article key={item.id} className={styles.card}>
                <p className={styles.timelineDate}>{item.period}</p>
                <h3>{item.role}</h3>
                <p className={styles.timelineCompany}>{item.company}</p>
                <p>{item.summary}</p>
                <ul className={styles.list}>
                  {item.resultBullets.map((bullet) => (
                    <li key={`${item.id}-${bullet}`}>{bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section
          id="projects"
          className={`${styles.section} ${styles.sectionCentered}`}
        >
          <details className={styles.collapsible}>
            <summary className={styles.collapsibleSummary}>
              <h2>Linked Projects</h2>
              <span className={styles.collapsibleChevron} aria-hidden="true" />
            </summary>
            <div className={styles.collapsibleContent}>
              <div className={styles.projectList}>
                {[...projects]
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map((project) => (
                    <ProjectShowcaseCard key={project.slug} project={project} />
                  ))}
              </div>
            </div>
          </details>
        </section>

        <section id="skills" className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Skills</h2>
          </div>
          <div className={styles.skillsGrid}>
            {skills.map((skill) => (
              <article key={skill.title} className={styles.skillsCard}>
                <h3>{skill.title}</h3>
                <div className={styles.skillsItemsWrap}>
                  <ul className={styles.skillsItems}>
                    {skill.items.split(", ").map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2>Resume</h2>
          <div className={styles.card}>
            <p>
              Download the PDF if you need the compact version, then use the project pages for the fuller story.
            </p>
            <div className={styles.heroActions}>
              <Link
                className={styles.primaryAction}
                href="/Dan-Abidov-Resume.pdf"
                target="_blank"
              >
                Download resume
              </Link>
              <Link className={styles.secondaryAction} href="/contact">
                Email me about a role
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
