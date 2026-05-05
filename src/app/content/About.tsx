"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "./styles/About.module.css";

const About = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setFormData({ firstName: "", lastName: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className={styles.wrapper}>
      {/* ── ROW 1: Bio / Stats ── */}
      <section id="about" className={styles.section}>
        <div className={styles.row}>
          <div className={`${styles.labelCard} ${styles.bioCard}`}>
            <h2>Rossella Filocomo.</h2>
            <p>
              I&apos;m a user-centered UX/UI Designer with a background in
              Business Analysis and Software Development. This allows me to
              bridge user needs, technical possibilities, and business goals to
              create thoughtful digital solutions.
            </p>
            <p>
              I transform complex requirements into intuitive, engaging
              experiences, from strategy and prototyping to implementation. By
              combining design thinking, agile methods, and AI-driven tools, I
              create products that are both impactful and meaningful.
            </p>
          </div>
          <div
            className={`${styles.timelineCell} ${styles.timelineCellMiddle}`}
          >
            <div className={styles.timelineSpacer} />
            <div className={`${styles.iconCircle} ${styles.iconBgOlive}`}>
              <i className="bi bi-emoji-smile" />
            </div>
            <div className={styles.lineSegment} />
          </div>
          <div className={styles.statsContent}>
            <div className={styles.statsBubbles}>
              <div className={`${styles.statBubble} ${styles.statBubbleLarge}`}>
                <span className={styles.statBig}>4 in 1</span>
                <span className={styles.statLabel}>
                  Expertise in{" "}
                  <strong>Analyse, Design, Development, Test</strong>
                </span>
              </div>
              <div
                className={`${styles.statBubble} ${styles.statBubbleTopLeft}`}
              >
                <span className={styles.statNumber}>2</span>
                <span className={styles.statLabel}>
                  years of <strong>experience</strong>
                </span>
              </div>
              <div
                className={`${styles.statBubble} ${styles.statBubbleBottomLeft}`}
              >
                <span className={styles.statNumberLg}>6</span>
                <span className={styles.statLabel}>
                  AI Skills used with Claude
                </span>
              </div>
              <div
                className={`${styles.statBubble} ${styles.statBubbleBottomRight}`}
              >
                <span className={styles.statNumber}>5</span>
                <span className={styles.statLabel}>
                  <strong>languages</strong> spoken
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ROW 2: Projects ── */}
      <section id="projects" className={styles.section}>
        <div className={styles.row}>
          <div
            className={`${styles.labelCard} ${styles.projectsCard}`}
          >
            <h2>Projects.</h2>
            <p>
              A selection of my UX projects, in which I develop user-centered
              solutions, from research and wireframes to interactive
              prototypes..
            </p>
          </div>
          <div
            className={`${styles.timelineCell} ${styles.timelineCellMiddle}`}
          >
            <div className={styles.lineSegmentBridge} />
            <div className={`${styles.iconCircle} ${styles.iconBgPink}`}>
              <i className="bi bi-window-desktop" />
            </div>
            <div className={styles.lineSegment} />
          </div>
          <div className={styles.projectsContent}>
            <div className={styles.projectCard}>
              <h3>Bugly</h3>
              <div className={styles.projectImageWrapper}>
                <img
                  src="/projects/bugly.png"
                  alt="Bugly app screenshot"
                  className={styles.projectImage}
                />
              </div>
              <p>
                Bug reporting app that helps users quickly submit issues and
                transparently track their bugs preventing workflow
                interruptions, and increasing trust in the system.
              </p>
              <Link href="/projects/bugly" className={styles.viewLink}>
                View Project →
              </Link>
            </div>
            <div className={styles.projectCard}>
              <h3>PackMe</h3>
              <div className={styles.projectImagePlaceholderWip}>
                <i className="bi bi-suitcase-lg" />
                <span>Work in progress</span>
              </div>
              <p>
                Smart packing app that lets users create personalized packing
                lists based on their destination, weather, trip duration,
                planned activities, and number of travelers.
              </p>
              <Link href="/projects/packme" className={styles.viewLink}>
                View Project →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── ROW 3: Contact ── */}
      <section id="contact" className={styles.section}>
        <div className={styles.row}>
          <div
            className={`${styles.labelCard} ${styles.contactCard}`}
          >
            <h2>Contact.</h2>
            <p>
              Interested in working together or have questions? You can reach me
              quickly and easily here.
            </p>
          </div>
          <div className={styles.timelineCell}>
            <div className={styles.lineSegmentBridge} />
            <div className={`${styles.iconCircle} ${styles.iconBgGray}`}>
              <i className="bi bi-chat-text" />
            </div>
            <div className={styles.lineSegment} />
          </div>
          <div className={styles.contactContent}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="firstName">
                    First Name <span className={styles.req}>(required)</span>
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="lastName">
                    Last Name <span className={styles.req}>(required)</span>
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">
                  E-Mail <span className={styles.req}>(required)</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="message">
                  Message <span className={styles.req}>(required)</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className={styles.sendButton}
                disabled={status === "sending"}
              >
                {status === "sending" ? "SENDING..." : "SEND"}
              </button>
              {status === "success" && (
                <p className={styles.formSuccess}>
                  Message sent! I&apos;ll get back to you soon.
                </p>
              )}
              {status === "error" && (
                <p className={styles.formError}>
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
