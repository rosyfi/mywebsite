"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "./styles/NavBar.module.css";
import Toggle from "./Toggle";
import ThemedImage from "./ThemedImage";

const NavBar = () => {
  const [activeItem, setActiveItem] = useState("home");

  const handleClick = (item: string): void => {
    setActiveItem(item);
  };

  return (
    <nav className={`${styles.navBar}`}>
      <ThemedImage name="logo" width={189} height={33} />

      <ul className={styles.menuItems}>
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
      </ul>
      <Toggle />
    </nav>
  );
};

export default NavBar;
