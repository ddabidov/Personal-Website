"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  CONTACT_PUBLIC_EMAIL,
  INQUIRY_TYPES,
  LINKEDIN_URL,
  TIMELINE_OPTIONS,
} from "@/app/content/contactFormConfig";
import styles from "./ContactForm.module.css";

export type InquiryType = (typeof INQUIRY_TYPES)[number];

type ContactFormValues = {
  fullName: string;
  email: string;
  companyOrOrganization: string;
  inquiryType: InquiryType | "";
  subject: string;
  timeline: (typeof TIMELINE_OPTIONS)[number] | "";
  message: string;
};

type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

const MIN_MESSAGE_LENGTH = 25;

const INITIAL_VALUES: ContactFormValues = {
  fullName: "",
  email: "",
  companyOrOrganization: "",
  inquiryType: "",
  subject: "",
  timeline: "",
  message: "",
};

function validate(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!values.fullName.trim()) {
    errors.fullName = "Full name is required.";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.inquiryType) {
    errors.inquiryType = "Select an inquiry type.";
  }

  if (!values.subject.trim()) {
    errors.subject = "Subject is required.";
  }

  if (!values.message.trim()) {
    errors.message = "Message is required.";
  } else if (values.message.trim().length < MIN_MESSAGE_LENGTH) {
    errors.message = `Message must be at least ${MIN_MESSAGE_LENGTH} characters.`;
  }

  return errors;
}

function buildMailBody(values: ContactFormValues) {
  return [
    `Inquiry Type: ${values.inquiryType}`,
    `Full Name: ${values.fullName.trim()}`,
    `Email: ${values.email.trim()}`,
    `Company / Organization: ${values.companyOrOrganization.trim() || "Not provided"}`,
    `Project Timeline: ${values.timeline || "Not specified"}`,
    "",
    "Message:",
    values.message.trim(),
  ].join("\n");
}

export default function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<ContactFormErrors>({});

  const composedSubject = useMemo(() => {
    if (!values.inquiryType || !values.subject.trim()) {
      return "";
    }

    return `[${values.inquiryType}] ${values.subject.trim()}`;
  }, [values.inquiryType, values.subject]);

  const onFieldChange = <K extends keyof ContactFormValues>(
    key: K,
    value: ContactFormValues[K],
  ) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validate(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const subject = `[${values.inquiryType}] ${values.subject.trim()}`;
    const body = buildMailBody(values);
    const mailtoUrl = `mailto:${CONTACT_PUBLIC_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section className={styles.formShell} aria-labelledby="contact-form-heading">
      <div className={styles.contactOptions}>
        {CONTACT_PUBLIC_EMAIL ? (
          <a className={styles.contactOption} href={`mailto:${CONTACT_PUBLIC_EMAIL}`}>
            <span>Direct email</span>
            <strong>{CONTACT_PUBLIC_EMAIL}</strong>
          </a>
        ) : null}
        <a
          className={styles.contactOption}
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>LinkedIn</span>
          <strong>Open profile</strong>
        </a>
      </div>

      <h2 id="contact-form-heading" className={styles.formHeading}>
        Send a Message
      </h2>
      <p className={styles.formIntro}>
        Fill out the form and hit send to open your email app with the message ready to go.
      </p>

      <form className={styles.formGrid} onSubmit={handleSubmit} noValidate>
        <label className={styles.field}>
          <span>Full Name *</span>
          <input
            value={values.fullName}
            onChange={(event) => onFieldChange("fullName", event.target.value)}
            autoComplete="name"
            className={errors.fullName ? styles.fieldError : undefined}
          />
          {errors.fullName ? <small>{errors.fullName}</small> : null}
        </label>

        <label className={styles.field}>
          <span>Email *</span>
          <input
            type="email"
            value={values.email}
            onChange={(event) => onFieldChange("email", event.target.value)}
            autoComplete="email"
            className={errors.email ? styles.fieldError : undefined}
          />
          {errors.email ? <small>{errors.email}</small> : null}
        </label>

        <label className={styles.field}>
          <span>Company / Organization</span>
          <input
            value={values.companyOrOrganization}
            onChange={(event) =>
              onFieldChange("companyOrOrganization", event.target.value)
            }
            autoComplete="organization"
          />
        </label>

        <label className={styles.field}>
          <span>Inquiry Type *</span>
          <select
            value={values.inquiryType}
            onChange={(event) =>
              onFieldChange("inquiryType", event.target.value as InquiryType)
            }
            className={errors.inquiryType ? styles.fieldError : undefined}
          >
            <option value="">Select an option</option>
            {INQUIRY_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.inquiryType ? <small>{errors.inquiryType}</small> : null}
        </label>

        <label className={styles.field}>
          <span>Subject *</span>
          <input
            value={values.subject}
            onChange={(event) => onFieldChange("subject", event.target.value)}
            className={errors.subject ? styles.fieldError : undefined}
          />
          {errors.subject ? <small>{errors.subject}</small> : null}
        </label>

        <label className={styles.field}>
          <span>Project Timeline</span>
          <select
            value={values.timeline}
            onChange={(event) =>
              onFieldChange(
                "timeline",
                event.target.value as ContactFormValues["timeline"],
              )
            }
          >
            <option value="">Select a timeline</option>
            {TIMELINE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className={`${styles.field} ${styles.fieldFull}`}>
          <span>Message *</span>
          <textarea
            rows={7}
            value={values.message}
            onChange={(event) => onFieldChange("message", event.target.value)}
            className={errors.message ? styles.fieldError : undefined}
          />
          {errors.message ? <small>{errors.message}</small> : null}
        </label>

        <div className={`${styles.actions} ${styles.fieldFull}`}>
          <button type="submit" className={styles.submitButton}>
            Open in email app
          </button>
          <a
            className={styles.secondaryButton}
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open LinkedIn
          </a>
        </div>
      </form>

      <div className={styles.statusPanel} aria-live="polite">
        {composedSubject ? (
          <p className={styles.composedSubject}>Message subject: {composedSubject}</p>
        ) : null}
      </div>
    </section>
  );
}
