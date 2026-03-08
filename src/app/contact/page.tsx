import ContactForm from "../UI/ContactForm/ContactForm";
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
          <ContactForm />
        </section>
      </main>
    </div>
  );
}
