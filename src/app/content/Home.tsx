"use client";

import React, { useEffect } from "react";
import styles from "./styles/Home.module.css";
import TypeIt from "typeit";
import ThemedImage from "../components/ThemedImage";
import useIsMobile from "../components/useIsMobile";

const Home = () => {
  const email = "filocomo.career@gmail.com";
  const isMobile = useIsMobile(480);

  const openEmail = () => {
    const mailtoLink = `mailto:${email}`;
    window.location.href = mailtoLink;
  };

  useEffect(() => {
    const element = document.getElementById("simpleUsage");
    if (element) {
      new TypeIt(element, {
        speed: 150,
        waitUntilVisible: true,
        cursor: false,
      })
        .type("&lt;&gt;Turning", { delay: 300 })
        .break({ delay: 500 })
        .type("D")
        .type("esigns")
        .break({ delay: 200 })
        .pause(300)
        .type("Into ")
        .break({ delay: 500 })
        .pause(150)
        .type("Reality&lt;/&gt;")
        .go();
    }
  }, []);

  return (
    <section id="home" className={styles.container}>
      {isMobile ? (
        <>
          <div className={styles.containerLeft}>
            <h1 id="simpleUsage"></h1>
            <ThemedImage name="girl" width={400} height={400} />
          </div>
          <div className={styles.containerRight}>
            <p>
              We bring creativity and precision to every project, delivering
              exceptional frontend solutions. From wireframes to fully
              functional applications, every detail is crafted to align with
              your vision.
            </p>
            <div className={styles.buttonContainer}>
              <button onClick={openEmail}>Lets get connected</button>
              <div className={styles.mailContainer}>
                <ThemedImage name="mailLine" width={70} height={50} />
                <div className={styles.animatedSvg}>
                  <ThemedImage name="mail" width={35} height={23} />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.containerLeft}>
            <h1 id="simpleUsage"></h1>
            <p>
              We bring creativity and precision to every project, delivering
              exceptional frontend solutions. From wireframes to fully
              functional applications, every detail is crafted to align with
              your vision.
            </p>
          </div>
          <div className={styles.containerRight}>
            <ThemedImage name="girl" width={750} height={500} />
            <div className={styles.buttonContainer}>
              <button onClick={openEmail}>Lets get connected</button>
              <div className={styles.mailContainer}>
                <ThemedImage name="mailLine" width={130} height={117} />
                <div className={styles.animatedSvg}>
                  <ThemedImage name="mail" width={59} height={51} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {/* <div className={styles.seeMoreContainer}>
        <span>See more</span>
        <ThemedImage name="arrowDown" width={15} height={35} />
      </div> */}
    </section>
  );
};

export default Home;
