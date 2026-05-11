"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles/About.module.css";

interface PhysBubble { r: number; x: number; y: number; vx: number; vy: number; }

const INIT_BUBBLES: PhysBubble[] = [
  { r: 155,   x: 510,   y: 160,   vx: 1.0,  vy: 0.7  },
  { r: 92.5,  x: 192.5, y: 142.5, vx: -0.7, vy: 0.9  },
  { r: 112.5, x: 312.5, y: 367.5, vx: 0.8,  vy: -1.0 },
  { r: 100,   x: 680,   y: 395,   vx: -0.9, vy: -0.6 },
];

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

  const bubblesPhys = useRef<PhysBubble[]>(INIT_BUBBLES.map(b => ({ ...b })));
  const bubbleEls = useRef<(HTMLDivElement | null)[]>([null, null, null, null]);
  const bubblesContainer = useRef<HTMLDivElement>(null);
  const rafId = useRef<number>(0);

  useEffect(() => {
    const container = bubblesContainer.current;
    if (!container) return;
    const bubbles = bubblesPhys.current;

    const step = () => {
      const W = container.clientWidth;
      const H = container.clientHeight;

      for (const b of bubbles) {
        b.x += b.vx;
        b.y += b.vy;
        if (b.x - b.r < 0)  { b.x = b.r;     b.vx =  Math.abs(b.vx); }
        if (b.x + b.r > W)  { b.x = W - b.r; b.vx = -Math.abs(b.vx); }
        if (b.y - b.r < 0)  { b.y = b.r;     b.vy =  Math.abs(b.vy); }
        if (b.y + b.r > H)  { b.y = H - b.r; b.vy = -Math.abs(b.vy); }
      }

      for (let i = 0; i < bubbles.length; i++) {
        for (let j = i + 1; j < bubbles.length; j++) {
          const a = bubbles[i], b = bubbles[j];
          const dx = b.x - a.x, dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = a.r + b.r;
          if (dist < minDist && dist > 0.01) {
            const nx = dx / dist, ny = dy / dist;
            const overlap = (minDist - dist) / 2;
            a.x -= nx * overlap;
            a.y -= ny * overlap;
            b.x += nx * overlap;
            b.y += ny * overlap;
            const ma = a.r * a.r, mb = b.r * b.r;
            const dvx = a.vx - b.vx, dvy = a.vy - b.vy;
            const dot = dvx * nx + dvy * ny;
            if (dot > 0) {
              const factor = 2 * dot / (ma + mb);
              a.vx -= factor * mb * nx;
              a.vy -= factor * mb * ny;
              b.vx += factor * ma * nx;
              b.vy += factor * ma * ny;
            }
          }
        }
      }

      for (let i = 0; i < bubbles.length; i++) {
        const el = bubbleEls.current[i];
        const b = bubbles[i];
        if (el) {
          el.style.left = `${b.x - b.r}px`;
          el.style.top  = `${b.y - b.r}px`;
        }
      }

      rafId.current = requestAnimationFrame(step);
    };

    rafId.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId.current);
  }, []);

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
          <div className={`${styles.labelCard} ${styles.bioCard}`} data-cat-perch>
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
            <div className={styles.statsBubbles} ref={bubblesContainer}>
              <div
                ref={(el) => { bubbleEls.current[0] = el; }}
                className={`${styles.statBubble} ${styles.statBubbleLarge}`}
                style={{ left: `${INIT_BUBBLES[0].x - INIT_BUBBLES[0].r}px`, top: `${INIT_BUBBLES[0].y - INIT_BUBBLES[0].r}px` }}
              >
                <span className={styles.statBig}>4 in 1</span>
                <span className={styles.statLabel}>
                  Expertise in{" "}
                  <strong>Analyse, Design, Development, Test</strong>
                </span>
              </div>
              <div
                ref={(el) => { bubbleEls.current[1] = el; }}
                className={`${styles.statBubble} ${styles.statBubbleTopLeft}`}
                style={{ left: `${INIT_BUBBLES[1].x - INIT_BUBBLES[1].r}px`, top: `${INIT_BUBBLES[1].y - INIT_BUBBLES[1].r}px` }}
              >
                <span className={styles.statNumber}>2</span>
                <span className={styles.statLabel}>
                  years of <strong>experience</strong>
                </span>
              </div>
              <div
                ref={(el) => { bubbleEls.current[2] = el; }}
                className={`${styles.statBubble} ${styles.statBubbleBottomLeft}`}
                style={{ left: `${INIT_BUBBLES[2].x - INIT_BUBBLES[2].r}px`, top: `${INIT_BUBBLES[2].y - INIT_BUBBLES[2].r}px` }}
              >
                <span className={styles.statNumberLg}>∞</span>
                <span className={styles.statLabel}>
                  AI Skills used with Claude
                </span>
              </div>
              <div
                ref={(el) => { bubbleEls.current[3] = el; }}
                className={`${styles.statBubble} ${styles.statBubbleBottomRight}`}
                style={{ left: `${INIT_BUBBLES[3].x - INIT_BUBBLES[3].r}px`, top: `${INIT_BUBBLES[3].y - INIT_BUBBLES[3].r}px` }}
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
          <div className={`${styles.labelCard} ${styles.projectsCard}`} data-cat-perch>
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
                <Image
                  src="/projects/bugly.png"
                  alt="Bugly app screenshot"
                  className={styles.projectImage}
                  width={600}
                  height={400}
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
          <div className={`${styles.labelCard} ${styles.contactCard}`} data-cat-perch>
            <h2>Contact.</h2>
            <p>
              Interested in working together or have questions? You can reach me
              quickly and easily here.
            </p>
          </div>
          <div className={styles.timelineCell}>
            <div className={styles.lineSegmentBridge} />
            <div className={`${styles.iconCircle} ${styles.iconBgGray} ${styles.iconStatic}`}>
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
