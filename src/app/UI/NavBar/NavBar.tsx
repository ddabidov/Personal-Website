"use client";

import { type MouseEvent, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./NavBar.css";

type DropdownKey = "experience" | "contact";

export default function NavBar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownKey | null>(null);

  useEffect(() => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  function closeMenus() {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  }

  function toggleMenu() {
    setIsMenuOpen((current) => {
      if (current) {
        setOpenDropdown(null);
      }

      return !current;
    });
  }

  function toggleDropdown(
    dropdown: DropdownKey,
    event: MouseEvent<HTMLButtonElement>,
  ) {
    const button = event.currentTarget;

    setIsMenuOpen(true);
    setOpenDropdown((current) => {
      const nextDropdown = current === dropdown ? null : dropdown;

      if (nextDropdown === null) {
        button.blur();
      }

      return nextDropdown;
    });
  }

  return (
    <header className="nav-bar">
      <div className="nav-top">
        <Link href="/" className="nav-brand" onClick={closeMenus}>
          Dan Abidov
        </Link>
        <button
          type="button"
          className="nav-menu-button"
          aria-controls="primary-navigation"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={toggleMenu}
        >
          <span className="nav-menu-button-bar" aria-hidden="true" />
          <span className="nav-menu-button-bar" aria-hidden="true" />
          <span className="nav-menu-button-bar" aria-hidden="true" />
        </button>
      </div>

      <nav
        id="primary-navigation"
        className={`nav-links${isMenuOpen ? " nav-links-open" : ""}`}
        aria-label="Section navigation"
      >
        <Link href="/" className="nav-link" onClick={closeMenus}>
          Home
        </Link>

        <div
          className={`nav-dropdown${
            openDropdown === "experience" ? " nav-dropdown-open" : ""
          }`}
        >
          <div className="nav-dropdown-trigger">
            <Link href="/experience" className="nav-link" onClick={closeMenus}>
              Experience
            </Link>
            <button
              type="button"
              className="nav-dropdown-button"
              aria-controls="experience-submenu"
              aria-expanded={openDropdown === "experience"}
              aria-label="Toggle Experience submenu"
              onClick={(event) => toggleDropdown("experience", event)}
            >
              <span className="nav-dropdown-caret" aria-hidden="true" />
            </button>
          </div>
          <div id="experience-submenu" className="dropdown-menu">
            <Link
              href="/experience#education"
              className="dropdown-link"
              onClick={closeMenus}
            >
              Education
            </Link>
            <Link
              href="/experience#skills"
              className="dropdown-link"
              onClick={closeMenus}
            >
              Skills
            </Link>
            <Link href="/resume" className="dropdown-link" onClick={closeMenus}>
              Resume
            </Link>
          </div>
        </div>

        <Link href="/projects" className="nav-link" onClick={closeMenus}>
          Projects
        </Link>

        <div
          className={`nav-dropdown${
            openDropdown === "contact" ? " nav-dropdown-open" : ""
          }`}
        >
          <div className="nav-dropdown-trigger">
            <Link href="/contact" className="nav-link" onClick={closeMenus}>
              Contact
            </Link>
            <button
              type="button"
              className="nav-dropdown-button"
              aria-controls="contact-submenu"
              aria-expanded={openDropdown === "contact"}
              aria-label="Toggle Contact submenu"
              onClick={(event) => toggleDropdown("contact", event)}
            >
              <span className="nav-dropdown-caret" aria-hidden="true" />
            </button>
          </div>
          <div id="contact-submenu" className="dropdown-menu dropdown-menu-right">
            <Link href="/contact" className="dropdown-link" onClick={closeMenus}>
              Contact Form
            </Link>
            <a
              className="dropdown-link"
              href="https://www.linkedin.com/in/dan-abidov"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenus}
            >
              LinkedIn
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
 
