import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "../../content/resumeData";
import styles from "../../site.module.css";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <article className={styles.hackadayArticle}>
          <header className={styles.articleHeader}>
            <div>
              <p className={styles.kicker}>Project Deep Dive</p>
              <h1>{project.title}</h1>
              <p className={styles.articleMeta}>Stack: {project.stack}</p>
            </div>
            <a
              className={styles.primaryAction}
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Git Repo
            </a>
          </header>

          <section className={styles.articleBody}>
            <p>{project.summary}</p>
            {project.article.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p>
              <strong>Outcome:</strong> {project.outcome}
            </p>
          </section>

          <div className={styles.heroActions}>
            <Link className={styles.secondaryAction} href="/projects">
              Back to Projects
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
}
