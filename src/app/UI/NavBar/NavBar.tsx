"use client";
import Link from "next/link";
import "./NavBar.css";

export default function NavBar() {
  return (
    <header className="nav-bar">
      <Link href="/" className="nav-brand">
        Dan Abidov
      </Link>

      <nav className="nav-links" aria-label="Section navigation">
        <Link href="/" className="nav-link">
          Home
        </Link>
        <div className="nav-dropdown">
          <Link href="/experience" className="nav-link">
            Experience
          </Link>
          <div className="dropdown-menu">
            <Link href="/experience#education" className="dropdown-link">
              Education
            </Link>
            <Link href="/experience#skills" className="dropdown-link">Skills</Link>
            <Link href="/resume" className="dropdown-link">Resume</Link>
          </div>
        </div>
        <Link href="/projects" className="nav-link">Projects</Link>
        <div className="nav-dropdown">
          <Link href="/contact" className="nav-link">Contact</Link>
          <div className="dropdown-menu dropdown-menu-right">
            <Link href="/contact" className="dropdown-link">Contact Form</Link>
            <a
              className="dropdown-link"
              href="https://www.linkedin.com/in/dan-abidov"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
 
