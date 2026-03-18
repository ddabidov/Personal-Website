import type { Metadata } from "next";
import ContactForm from "../UI/ContactForm/ContactForm";
import styles from "../site.module.css";

export const metadata: Metadata = {
  title: "Dan Abidov - Contact | Roles, Projects, and Consulting",
  description:
    "Contact Dan Abidov about embedded roles, test automation roles, or engineering consulting work through a direct submission form.",
};

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.hero}>
          <p className={styles.kicker}>Contact</p>
          <h1>Start the Conversation Directly</h1>
          <p className={styles.lede}>
            Available for embedded roles, test automation roles, and project-based engineering work. Use the form below to compose a message that opens in your email app, or use the direct email and LinkedIn options.
          </p>
        </section>
        <ContactForm />
      </main>
    </div>
  );
}
