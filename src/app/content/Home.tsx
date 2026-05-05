"use client";

import React, { useEffect, useRef } from "react";
import styles from "./styles/Home.module.css";
import TypeIt from "typeit";
import ThemedImage from "../components/ThemedImage";
import useIsMobile from "../components/useIsMobile";

const Home = () => {
  const isMobile = useIsMobile(1024);
  const typeItRef = useRef<TypeIt | null>(null);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const element = document.getElementById("simpleUsage");
    // Ref survives StrictMode's fake unmount/remount — guard prevents double init.
    // On real navigation, the component instance is discarded so the ref resets.
    if (!element || typeItRef.current) return;

    element.innerHTML = "";
    typeItRef.current = new TypeIt(element, {
      speed: 50,
      cursor: false,
    })
      .type("&lt;&gt;Turning", { delay: 0 })
      .break({ delay: 0 })
      .type("D")
      .type("esigns")
      .break({ delay: 200 })
      .pause(100)
      .type("Into ")
      .break({ delay: 120 })
      .pause(150)
      .type("Reality&lt;/&gt;")
      .go();
  }, []);

  return (
    <section id="home" className={styles.container}>
      <div className={styles.containerLeft}>
        <h1 id="simpleUsage"></h1>
        {isMobile && <ThemedImage name="girl" width={400} height={400} />}
        <p>
          I create digital products that bring together user needs, business
          goals, and technology. From strategy and design to development, I
          build experiences that feel intuitive, meaningful, and made to last.
        </p>
        {isMobile && <button onClick={scrollToContact}>Lets get connected</button>}
      </div>
      <div className={styles.containerRight}>
        {!isMobile && <ThemedImage name="girl" width={700} height={480} />}
        {!isMobile && (
          <div className={styles.buttonRow}>
            <button onClick={scrollToContact}>Lets get connected</button>
            <div className={styles.mailContainer}>
              <ThemedImage name="mailLine" width={110} height={100} />
              <div className={styles.animatedSvg}>
                <ThemedImage name="mail" width={50} height={44} />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Home;
