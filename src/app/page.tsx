import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { homePageContent, siteConfig } from "./content/siteContent";
import styles from "./site.module.css";

export const metadata: Metadata = {
  title: siteConfig.defaultTitle,
  description: siteConfig.defaultDescription,
};

export default function Home() {
  return (
    <div className={styles.page} id="top">
      <main className={styles.main}>
        <section className={styles.hero} aria-labelledby="hero-heading">
          <div className={styles.heroProfile}>
            <Image
              className={styles.headshot}
              src="/images/Personal_Headshot.png"
              alt="Dan Abidov"
              width={160}
              height={160}
              priority
            />
            <div>
              <h1 id="hero-heading">{homePageContent.title}</h1>
              <p className={styles.kicker}>{homePageContent.subtitle}</p>
            </div>
          </div>
          <p className={styles.lede}>{homePageContent.bio}</p>
          <div className={styles.heroActions}>
            <Link className={styles.primaryAction} href="/experience">
              For Recruiters
            </Link>
            <Link className={styles.secondaryAction} href="/projects">
              View Projects
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
