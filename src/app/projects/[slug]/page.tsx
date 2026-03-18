import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "../../content/resumeData";
import { getProjectNarrative } from "../../content/projectMarkdown";
import ProjectDetailLayout from "../../UI/ProjectDetailLayout/ProjectDetailLayout";
import styles from "../../site.module.css";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return {
      title: "Project not found | Dan Abidov",
    };
  }

  return {
    title: `Dan Abidov - ${project.title}`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  const narrative = getProjectNarrative(slug);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ProjectDetailLayout project={project} narrative={narrative} />
      </main>
    </div>
  );
}
