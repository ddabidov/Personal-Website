import Link from "next/link";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <p className="footer-text">Dan Abidov | Systems Engineer</p>
      <div className="footer-links">
        <Link href="/contact">Use Contact Form</Link>
        <a
          href="https://www.linkedin.com/in/dan-abidov"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
}
