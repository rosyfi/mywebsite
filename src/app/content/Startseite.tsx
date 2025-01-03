"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import styles from "./styles/Startseite.module.css";
import TypeIt from "typeit";

const Startseite = () => {
  useEffect(() => {
    // Only initialize TypeIt when the element is rendered
    const element = document.getElementById("simpleUsage");
    if (element) {
      new TypeIt(element, {
        speed: 150,
        waitUntilVisible: true,
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
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <div className={styles.container}>
      {/* Left Section */}
      <section className={styles.containerLeft}>
        <h1 id="simpleUsage" className={styles.slogan}></h1>
        <p className={styles.description}>
          We bring creativity and precision to every project, delivering
          exceptional frontend solutions. From wireframes to fully functional
          applications, every detail is crafted to align with your vision.
        </p>
      </section>
      {/* Right Section */}
      <section className={styles.containerRight}>
        <Image src="/girl.svg" alt="girl" width={"750"} height={"500"} />
        <div className={styles.buttonContainer}>
          <button className={styles.button}>Lets get connected</button>
          <div className={styles.mailContainer}>
            <Image
              src="/mailLine.svg"
              alt="mailLine"
              width={"130"}
              height={"117"}
            />
            <Image
              className={styles.animatedSvg}
              src="/mail.svg"
              alt="mail"
              width={"59"}
              height={"51"}
            />
          </div>
        </div>
      </section>
      TODO:
      {/* <div className={styles.seeMoreContainer}>
        <span>See more</span>
        <Image
          src="/arrowDown.svg"
          alt="arrowDown"
          width={"15"}
          height={"35"}
        />
      </div> */}
    </div>
  );
};

export default Startseite;
