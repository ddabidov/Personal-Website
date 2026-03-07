import Link from "next/link";
import { projectsTimeline } from "@/data/projectsTimeline";
import styles from "./ProjectTimeline.module.css";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
});

function toTimestamp(date: string) {
  return new Date(date).getTime();
}

function formatTimelineDate(date: string) {
  const timestamp = toTimestamp(date);
  if (Number.isNaN(timestamp)) {
    return date;
  }

  return dateFormatter.format(new Date(timestamp));
}

const timelineItems = [...projectsTimeline].sort(
  (a, b) => toTimestamp(b.date) - toTimestamp(a.date),
);

export default function ProjectTimeline() {
  return (
    <div className={styles.wrapper}>
      <ol className={styles.timeline} aria-label="Project timeline">
        {timelineItems.map((item) => (
          <li key={item.href} className={styles.timelineEntry}>
            <span className={styles.node} aria-hidden="true" />
            <Link href={item.href} className={styles.timelineLink}>
              <p className={styles.date}>{formatTimelineDate(item.date)}</p>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.summary}>{item.summary}</p>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
