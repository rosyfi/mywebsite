import React from "react";
import styles from "./styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        © 2024 Rossella Filocomo. All Rights Reserved
      </p>
      <p className={styles.lastUpdate}>Last updated: May 2026</p>
      <p className={styles.credit}>
        Designed and developed by Rossella Filocomo
      </p>
    </footer>
  );
};

export default Footer;
