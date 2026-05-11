"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

const slides: {
  label: string;
  lofi: string;
  hifi: string;
  lofiDescription: React.ReactNode;
  hifiDescription: React.ReactNode;
}[] = [
  {
    label: "Home Screen",
    lofi: "/projects/Home_LoFi.png",
    hifi: "/projects/Home_HiFi.png",
    lofiDescription: (
      <>
        I designed the home screen to give users an{" "}
        <strong>immediate overview</strong> of all their reported bugs and
        current statuses. I wanted to surface the{" "}
        <strong>most critical information at a glance</strong>, so users always
        know what is happening without having to navigate elsewhere.
      </>
    ),
    hifiDescription: (
      <>
        During testing, I noticed users struggled to distinguish between open
        and resolved bugs at a glance. I introduced{" "}
        <strong>status badges to see the current status of the bug</strong>,
        making the list <strong>immediately scannable</strong> and reducing the
        time needed to find relevant reports.
      </>
    ),
  },
  {
    label: "Report Bug Screen",
    lofi: "/projects/Report_Bug_LoFi.png",
    hifi: "/projects/Report_Bug_HiFi.png",
    lofiDescription: (
      <>
        I structured the report form to guide users{" "}
        <strong>step by step</strong>, ensuring all necessary details are
        captured without overwhelming them. I used clear labels and a focused
        layout to help users submit{" "}
        <strong>complete, actionable reports</strong> as quickly as possible.
      </>
    ),
    hifiDescription: (
      <>
        In the first round of testing, I discovered that users found it unclear
        which fields were required. I highlighted{" "}
        <strong>mandatory inputs</strong>, and included{" "}
        <strong>placeholder text in each field</strong> to make it immediately
        clear what and how to write, reducing incomplete submissions and giving
        users more confidence when submitting.
      </>
    ),
  },
  {
    label: "Bug Detail Screen",
    lofi: "/projects/Bug_Detail_LoFi.png",
    hifi: "/projects/Bug_Detail_HiFi.png",
    lofiDescription: (
      <>
        Key elements such as{" "}
        <strong>status, workaround, and reproduction steps</strong> are
        immediately visible so users do not lose time. I also ensured that{" "}
        <strong>navigation and communication are easy to find</strong>, keeping
        the overall process as efficient as possible.
      </>
    ),
    hifiDescription: (
      <>
        During testing, I found that users had difficulty{" "}
        <strong>locating the communication section</strong> within the detail
        view. I moved it higher on the page and increased its visual prominence,
        making the overall experience feel{" "}
        <strong>more connected and responsive</strong>.
      </>
    ),
  },
  {
    label: "Chat Screen",
    lofi: "/projects/Chat_LoFi.png",
    hifi: "/projects/Chat_HiFi.png",
    lofiDescription: (
      <>
        I designed the chat interface to enable{" "}
        <strong>direct, contextual communication</strong> between users and
        developers. I tied messages to the specific bug report to keep the{" "}
        <strong>conversation focused</strong> and reduce unnecessary
        back-and-forth.
      </>
    ),
    hifiDescription: (
      <>
        I found that users expected{" "}
        <strong>clearer affordances for key actions</strong>, such as sending
        messages. I made the input field and send button{" "}
        <strong>more visually prominent</strong>, which resolved the confusion
        and improved the overall flow of the conversation.
      </>
    ),
  },
];

export default function BuglyPage() {
  // Journey map drag scroll
  const journeyRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftRef = useRef(0);

  const onJourneyMouseDown = (e: React.MouseEvent) => {
    if (!journeyRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - journeyRef.current.offsetLeft;
    scrollLeftRef.current = journeyRef.current.scrollLeft;
    journeyRef.current.style.cursor = "grabbing";
  };

  const onJourneyMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !journeyRef.current) return;
    e.preventDefault();
    const x = e.pageX - journeyRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    journeyRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const onJourneyMouseUp = () => {
    isDragging.current = false;
    if (journeyRef.current) journeyRef.current.style.cursor = "grab";
  };

  // LoFi / HiFi carousel
  const [slideIndex, setSlideIndex] = useState(0);
  const prev = () => setSlideIndex((i) => Math.max(0, i - 1));
  const next = () => setSlideIndex((i) => Math.min(slides.length - 1, i + 1));

  const swipeTouchStartX = useRef(0);
  const onSlideTouch = (e: React.TouchEvent) => {
    swipeTouchStartX.current = e.touches[0].clientX;
  };
  const onSlideTouchEnd = (e: React.TouchEvent) => {
    const delta = swipeTouchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) { if (delta > 0) next(); else prev(); }
  };

  return (
    <main>
      {/* ── 1. HERO ─────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroImageWrap}>
          <Image
            src="/projects/bugly_hero.png"
            alt="Bugly project mockup"
            fill
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
      </section>

      {/* ── 2. PROJECT INFO ──────────────────────────── */}
      <section className={styles.info}>
        <div className={styles.infoGrid}>
          <div className={styles.infoRow}>
            <h3 className={styles.infoLabel}>Role</h3>
            <p>
              This individual project was developed as part of the Google UX
              design course case study, where I planned and led each stage of
              the design thinking process from start to finish.
            </p>
          </div>
          <div className={styles.infoRow}>
            <h3 className={styles.infoLabel}>Project Duration</h3>
            <p>13.02.2026 – 30.04.2026</p>
          </div>
          <div className={styles.infoRow}>
            <h3 className={styles.infoLabel}>Responsibilities</h3>
            <ul className={styles.bulletList}>
              <li>Conduct user research</li>
              <li>Define the problem</li>
              <li>Define personas &amp; user journey</li>
              <li>
                Visual design of low-fi and high-fi wireframes, prototypes and
                user testing
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.ctaRow}>
          <a
            href="https://www.figma.com/proto/mXMsgA0dVKrqRC43OmeFke/Ideas?node-id=2010-3750&viewport=-1008%2C-1268%2C0.29&t=kDa4TK9VLcQqa3GO-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=2025%3A4429&page-id=96%3A598"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaBtn}
          >
            VIEW FINAL PROTOTYPE
          </a>
        </div>
      </section>

      {/* ── 3. THE PROBLEM & THE GOAL ───────────────────────────── */}
      <section className={styles.problemAndGoal}>
        <div className={styles.problemLeft}>
          <h2 className={styles.sectionLabel}>The Problem</h2>
          <p>
            After reporting a bug, users often{" "}
            <strong>
              don’t know whether their report has even been accepted or what its
              current status is
            </strong>
            . Furthermore, there is usually <strong>no clear indication</strong>{" "}
            of when a fix can be expected, which leads to{" "}
            <strong>uncertainty and frustration</strong>. At the same time, many
            bug reports are <strong>incomplete and difficult to track</strong>,
            which makes it even harder for developers to address them.
          </p>
        </div>
        <div className={styles.goalRight}>
          <h2 className={styles.sectionLabel}>The Goal</h2>
          <p>
            The goal is to make submitting bug reports as{" "}
            <strong>easy and quick as</strong> possible for users. At the same
            time, <strong>communication between users and developers</strong>{" "}
            should be transparent and clear. Structured and complete reports
            allow developers to <strong>work more efficiently and</strong>{" "}
            resolve issues more quickly.
          </p>
        </div>
      </section>

      {/* ── 4. USER RESEARCH ─────────────────────────── */}
      <section className={styles.research}>
        <div className={styles.researchLeft}>
          <h2 className={styles.sectionLabel}>
            User research: Summary &amp; Pain Points
          </h2>
          <p>
            To understand user frustration and needs around reporting and
            tracking software bugs, I conducted{" "}
            <strong>qualitative user research</strong> through interviews.
          </p>
          <p>
            The goal was to <strong>learn how users experience bugs</strong> in
            early-stage SaaS tools and how missing feedback affects their
            workflows .
          </p>
        </div>
        <div className={styles.painCards}>
          <div className={styles.painCard}>
            <h3>No Status Clarity</h3>
            <p>
              Users have little visibility into progress, updates, or current
              status, making it hard to know what&apos;s happening or when to
              expect resolution.
            </p>
          </div>
          <div className={styles.painCard}>
            <h3>Post-Report Silence</h3>
            <p>
              After submitting an issue, users often feel ignored due to limited
              follow-up or acknowledgment, leading to uncertainty about whether
              action is being taken.
            </p>
          </div>
          <div className={styles.painCard}>
            <h3>Missing Workarounds</h3>
            <p>
              Users aren&apos;t given clear or timely alternatives, leaving them
              stuck when issues arise and unsure how to continue their tasks.
            </p>
          </div>
        </div>
      </section>

      {/* ── 5. QUOTE ─────────────────────────────────── */}
      <section className={styles.quoteSection}>
        <blockquote className={styles.quoteText}>
          &ldquo;After reporting a bug, I often feel uncertain, especially if
          the interface doesn&apos;t clearly communicate what happened to my
          report. Accessibility plays a large role. If feedback isn&apos;t easy
          to read or navigate, my confidence drops quickly.&rdquo;
        </blockquote>
      </section>

      {/* ── 6. PERSONA ───────────────────────────────── */}
      <section className={styles.persona}>
        <div className={styles.personaCard}>
          <Image
            src="/projects/Tina.avif"
            alt="Persona: Tina"
            width={120}
            height={120}
            className={styles.personaAvatar}
            style={{ objectFit: "cover" }}
          />
          <span className={styles.personaName}>Tina</span>
          <table className={styles.personaMeta}>
            <tbody>
              <tr>
                <td className={styles.metaKey}>AGE</td>
                <td>35</td>
              </tr>
              <tr>
                <td className={styles.metaKey}>EDUCATION</td>
                <td>Bachelors in Finance</td>
              </tr>
              <tr>
                <td className={styles.metaKey}>STATUS</td>
                <td>Single</td>
              </tr>
              <tr>
                <td className={styles.metaKey}>OCCUPATION</td>
                <td>Finance Controlling</td>
              </tr>
              <tr>
                <td className={styles.metaKey}>LOCATION</td>
                <td>Berlin</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={styles.personaDetail}>
          <div className={styles.personaQuoteWrap}>
            <span className={styles.quoteIconOpen}>&ldquo;</span>
            <p className={styles.personaQuoteText}>
              I just want to know what happens to my bug reports.
            </p>
            <span className={styles.quoteIconClose}>&rdquo;</span>
          </div>

          <h3 className={styles.personaSection}>Brief story</h3>
          <p>
            Anna works in financial controlling and relies daily on budgeting
            and forecasting tools, often under time pressure. When a bug occurs,
            she first checks if the issue is on her end before reporting it
            through the internal ticket system.
          </p>
          <p>
            After submitting a report, she often feels uncertain due to a lack
            of feedback or clarity on the bug&apos;s status or severity. Because
            these issues can block her work, this leads to stress and
            frustration. She wants a transparent, structured reporting process
            that shows progress and expected resolution times.
          </p>

          <div className={styles.goalsGrid}>
            <div>
              <h4 className={styles.goalsHeading}>Goals</h4>
              <ul className={styles.goalsList}>
                <li>Report bugs quickly and easily</li>
                <li>
                  Clear overview of whether an issue has been accepted,
                  prioritized, or is being processed
                </li>
                <li>
                  Get reliable information about workarounds so you can continue
                  working
                </li>
              </ul>
            </div>
            <div>
              <h4 className={styles.goalsHeading}>Frustrations</h4>
              <ul className={styles.goalsList}>
                <li>No or delayed responses to bug reports</li>
                <li>
                  Uncertainty as to whether the report was complete or accurate
                </li>
                <li>Bugs block important deadlines and increase stress</li>
                <li>Uncertainty about how long a solution will last</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. USER JOURNEY MAP ──────────────────────── */}
      <section className={styles.journeySection}>
        <div className={styles.journeyMeta}>
          <h2 className={styles.sectionLabel}>User journey map</h2>
          <p>
            Our bug reporting app will let users{" "}
            <strong>
              quickly submit issues and transparently track their bugs
            </strong>
            , which will affect finance teams who use reliable tools by{" "}
            <strong>
              reducing uncertainty, preventing workflow interruptions, and
              increasing trust in the system.
            </strong>
          </p>
        </div>

        <div
          ref={journeyRef}
          className={styles.journeyScroll}
          onMouseDown={onJourneyMouseDown}
          onMouseMove={onJourneyMouseMove}
          onMouseUp={onJourneyMouseUp}
          onMouseLeave={onJourneyMouseUp}
        >
          <table className={styles.journeyTable}>
            <thead>
              <tr>
                <th className={styles.jAction}>ACTION</th>
                <th className={styles.jHeader}>
                  DISCOVER
                  <br />
                  BUG
                </th>
                <th className={styles.jHeader}>
                  REPORT A
                  <br />
                  BUG
                </th>
                <th className={styles.jHeader}>
                  TRACK
                  <br />
                  STATUS
                </th>
                <th className={styles.jHeader}>
                  RECEIVE
                  <br />
                  UPDATES
                </th>
                <th className={styles.jHeader}>
                  BUG FIX
                  <br />
                  RECEIVED
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={styles.jRowLabel}>TASK LIST</td>
                <td className={styles.jTask}>
                  <ol>
                    <li>Notice the error</li>
                    <li>Be sure that others also have this bug</li>
                  </ol>
                </td>
                <td className={styles.jTask}>
                  <ol>
                    <li>Find the bug report section</li>
                    <li>Write a clear bug behavior</li>
                    <li>Describe the exact bug behavior</li>
                    <li>Add screenshots</li>
                  </ol>
                </td>
                <td className={styles.jTask}>
                  <ol>
                    <li>Read confirmation</li>
                    <li>Open status page</li>
                    <li>Check status regularly</li>
                    <li>Read workarounds</li>
                  </ol>
                </td>
                <td className={styles.jTask}>
                  <ol>
                    <li>Read updates</li>
                    <li>Respond to the developer if anything is unclear</li>
                    <li>Apply workarounds</li>
                  </ol>
                </td>
                <td className={styles.jTask}>
                  <ol>
                    <li>Information that the bug has been fixed</li>
                    <li>Check whether bug has really been fixed</li>
                  </ol>
                </td>
              </tr>
              <tr>
                <td className={styles.jRowLabel}>EMOTIONS</td>
                <td className={styles.jEmotion}>
                  Frustrated
                  <br />
                  Annoyed
                  <br />
                  Confused
                </td>
                <td className={styles.jEmotion}>
                  Overwhelmed
                  <br />
                  Frustrated
                  <br />
                  Relieved
                </td>
                <td className={styles.jEmotion}></td>
                <td className={styles.jEmotion}>
                  Appreciated
                  <br />
                  Reassured
                </td>
                <td className={styles.jEmotion}>
                  Happy
                  <br />
                  Released
                </td>
              </tr>
              <tr>
                <td className={styles.jRowLabel}>OPPORTUNITIES</td>
                <td className={styles.jOpportunity}>
                  <ol>
                    <li>Clear error message</li>
                    <li>Direct CTA button</li>
                  </ol>
                </td>
                <td className={styles.jOpportunity}>
                  <ol>
                    <li>Simplify form</li>
                  </ol>
                </td>
                <td className={styles.jOpportunity}>
                  <ol>
                    <li>Time forecast</li>
                    <li>Dashboard</li>
                    <li>Make workarounds</li>
                  </ol>
                </td>
                <td className={styles.jOpportunity}>
                  <ol>
                    <li>Automatic updates</li>
                    <li>Clear communication channel</li>
                  </ol>
                </td>
                <td className={styles.jOpportunity}>
                  <ol>
                    <li>Try Now button</li>
                    <li>Feedback if it didn&apos;t work</li>
                  </ol>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 8. LOFI / HIFI ───────────────────────────── */}
      <section className={styles.lofiHifi}>
        <div className={styles.splitBg}>
          <div className={styles.lofiHalf}>
            <h2 className={styles.wireframeLabel}>LoFi</h2>
          </div>
          <div className={styles.hifiHalf}>
            <h2 className={styles.wireframeLabel}>HiFi</h2>
          </div>
        </div>

        <button
          className={styles.arrowLeft}
          onClick={prev}
          disabled={slideIndex === 0}
          aria-label="Previous"
        >
          ←
        </button>

        <div
          className={styles.slideRow}
          onTouchStart={onSlideTouch}
          onTouchEnd={onSlideTouchEnd}
        >
          <div className={styles.lofiContent}>
            <p className={styles.slideDescription}>
              {slides[slideIndex].lofiDescription}
            </p>
            <div className={styles.wireframeImgWrap}>
              <Image
                src={slides[slideIndex].lofi}
                alt={`${slides[slideIndex].label} — Lo-Fi wireframe`}
                fill
              />
            </div>
          </div>

          <div className={styles.hifiContent}>
            <div className={styles.wireframeImgWrap}>
              <Image
                src={slides[slideIndex].hifi}
                alt={`${slides[slideIndex].label} — Hi-Fi wireframe`}
                fill
              />
            </div>
            <p className={styles.slideDescription}>
              {slides[slideIndex].hifiDescription}
            </p>
          </div>
        </div>

        <button
          className={styles.arrowRight}
          onClick={next}
          disabled={slideIndex === slides.length - 1}
          aria-label="Next"
        >
          →
        </button>

        <div className={styles.dotRow}>
          {slides.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === slideIndex ? styles.dotActive : ""}`}
              onClick={() => setSlideIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ── 9. ACCESSIBILITY ─────────────────────────── */}
      <section className={styles.accessibility}>
        <h2 className={styles.accessLabel}>
          Accessibility
          <br />
          considerations
        </h2>
        <div className={styles.accessCards}>
          <div className={styles.accessCard}>
            <h3>Accessible Colors</h3>
            <p>
              When choosing a color palette I made sure my primary colors meet
              WCAG AA Compliance before building out the UI for each screen.
            </p>
          </div>
          <div className={styles.accessCard}>
            <h3>Consistent Typography</h3>
            <p>
              I am using only one typeface throughout the app. Mixing too many
              different type spaces can make your app seem fragmented and busy.
            </p>
          </div>
          <div className={styles.accessCard}>
            <h3>Clear Text Hierarchy</h3>
            <p>
              I implemented a text hierarchy throughout the app. This helps
              users to distinguish the different sections and information
              screens.
            </p>
          </div>
        </div>
      </section>

      {/* ── 10. IMPACT & LEARNINGS ───────────────────── */}
      <section className={styles.impact}>
        <div className={styles.impactRow}>
          <h3 className={styles.infoLabel}>Impact</h3>
          <div className={styles.impactContent}>
            <p>
              The usability studies showed a <strong>clear improvement</strong>{" "}
              in how easily users could understand bug status and next steps.
            </p>
            <p>One participant noted,</p>
            <p className={styles.standAloneQuote}>
              &ldquo;I finally feel confident knowing what&apos;s happening with
              my bug instead of wondering if it was forgotten.&rdquo;
            </p>
            <p>
              This highlights the impact of clearer status visibility and
              guidance in the design.
            </p>
          </div>
        </div>
        <div className={styles.impactRow}>
          <h3 className={styles.infoLabel}>What I learned</h3>
          <ul className={styles.bulletList}>
            <li>
              How important it is to ground design decisions in user research
              rather than assumptions.
            </li>
            <li>
              How to translate qualitative insights into clear user journeys,
              wireframes, and iterations that addressed real pain points
            </li>
            <li>
              How continuous testing and refinement lead to more thoughtful,
              user-centered solutions.
            </li>
          </ul>
        </div>
        <div className={styles.ctaRow}>
          <a
            href="https://www.figma.com/proto/mXMsgA0dVKrqRC43OmeFke/Ideas?node-id=2010-3750&viewport=-1008%2C-1268%2C0.29&t=kDa4TK9VLcQqa3GO-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=2025%3A4429&page-id=96%3A598"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaBtn}
          >
            VIEW FINAL PROTOTYPE
          </a>
        </div>
      </section>
    </main>
  );
}
