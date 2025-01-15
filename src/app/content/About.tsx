"use client";

import React from "react";
import styles from "./styles/About.module.css";
import ThemedImage from "../components/ThemedImage";

const About = () => {
  return (
    <section id="about" className={styles.container}>
      <div className={styles.containerLeft}>
        <ThemedImage name="recruit" width={750} height={665} />
      </div>
      <div className={styles.containerRight}>
        <h1>Hello World!</h1>
        <ThemedImage name="quotes" width={50} height={42} />
        <p>
          I am a UI/UX developer with a strong eye for detail, a solid technical
          foundation in frontend development, and a deep understanding of
          business needs. I bridge the gap between design and implementation,
          crafting user-focused interfaces and bringing them to life with clean,
          scalable code.
        </p>
        <p>
          By combining creativity, technical expertise, and business insights, I
          deliver intuitive, accessible, and impactful solutions that align with
          both user and business goals. Let’s create exceptional digital
          experiences together!
        </p>
        <div className="div" style={{ display: "flex", justifyContent: "end" }}>
          <ThemedImage name="quotes" width={50} height={42} />
        </div>
      </div>
    </section>
  );
};

export default About;
