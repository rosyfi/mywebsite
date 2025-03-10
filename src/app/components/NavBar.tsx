"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "./styles/NavBar.module.css";
import Toggle from "./Toggle";
import useIsMobile from "./useIsMobile";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile(1024);
  const [activeItem, setActiveItem] = useState("home");

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setActiveItem(sectionId);
  };

  return (
    <nav className={`${styles.navBar}`}>
      <h1>rossella.</h1>
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
        <li className={`${activeItem === "home" ? styles.active : ""}`}>
          <Link
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("home");
            }}
            href="/home"
          >
            home
          </Link>
        </li>
        <li className={`${activeItem === "about" ? styles.active : ""}`}>
          <Link
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("about");
            }}
            href="/about"
          >
            about
          </Link>
        </li>
        <li className={`${activeItem === "work" ? styles.active : ""}`}>
          <Link
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("work");
            }}
            href="/work"
          >
            work
          </Link>
        </li>
        <li className={`${activeItem === "contact" ? styles.active : ""}`}>
          <Link
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("contact");
            }}
            href="/contact"
          >
            contact
          </Link>
        </li>
        <li className={`${activeItem === "linkedin" ? styles.active : ""}`}>
          <Link
            href="https://www.linkedin.com/in/rossellafilocomo/"
            target="_blank"
          >
            linkedin
          </Link>
        </li>

        {/* Render Toggle inside the menu for mobile */}
        {isMobile && (
          <li className={styles.toggleItem}>
            <Toggle />
          </li>
        )}
      </ul>

      {/* Render Toggle outside the menu for larger screens */}
      {!isMobile && <Toggle />}
    </nav>
  );
};

export default NavBar;
