"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./styles/NavBar.module.css";
import Toggle from "./Toggle";
import ThemedImage from "./ThemedImage";
import useIsMobile from "./useIsMobile";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile(480);
  const [activeItem, setActiveItem] = useState("home");

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClick = (item: string): void => {
    setActiveItem(item);
  };

  return (
    <nav className={`${styles.navBar}`}>
      <ThemedImage name="logo" width={189} height={33} />
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
              handleClick("home");
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
              handleClick("about");
            }}
            href="/about"
          >
            about
          </Link>
        </li>
        <li className={`${activeItem === "contact" ? styles.active : ""}`}>
          <Link
            onClick={(e) => {
              e.preventDefault();
              handleClick("contact");
            }}
            href="/contact"
          >
            contact
          </Link>
        </li>
        <li className={`${activeItem === "linkedin" ? styles.active : ""}`}>
          <Link
            onClick={(e) => {
              e.preventDefault();
              handleClick("linkedin");
            }}
            href="/linkedin"
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
