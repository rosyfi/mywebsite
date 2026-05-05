"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import styles from "./styles/NavBar.module.css";
import useIsMobile from "./useIsMobile";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [clickedSection, setClickedSection] = useState("");
  const isMobile = useIsMobile(1024);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeItem = mounted
    ? pathname.startsWith("/projects")
      ? "projects"
      : pathname === "/"
        ? clickedSection || "home"
        : ""
    : "";

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className={`${styles.navBar}`}>
      <span className={styles.logo}>rossella.</span>
      {isMobile && (
        <div className={styles.hamburger} onClick={toggleMenu}>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
        </div>
      )}
      <ul
        className={`${styles.menuItems} ${
          menuOpen && isMobile ? styles.active : ""
        }`}
      >
        <li className={activeItem === "home" ? styles.active : ""}>
          <Link onClick={(e) => handleNavClick(e, "home")} href="/#home">
            home
          </Link>
        </li>
        <li className={activeItem === "about" ? styles.active : ""}>
          <Link onClick={(e) => handleNavClick(e, "about")} href="/#about">
            about
          </Link>
        </li>
        <li className={activeItem === "projects" ? styles.active : ""}>
          <Link
            onClick={(e) => handleNavClick(e, "projects")}
            href="/#projects"
          >
            projects
          </Link>
        </li>
        <li className={activeItem === "contact" ? styles.active : ""}>
          <Link onClick={(e) => handleNavClick(e, "contact")} href="/#contact">
            contact
          </Link>
        </li>
        <li>
          <Link
            href="https://www.linkedin.com/in/rossellafilocomo/"
            target="_blank"
          >
            linkedIn
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
