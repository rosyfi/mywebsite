"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ScrollCat.module.css";

type Section = "home" | "about" | "projects" | "contact";
type AnimState = "idle" | "arriving" | "jumping";

const SECTIONS: Section[] = ["home", "about", "projects", "contact"];

// Sprite sheet: 976×1086px, 4 cols × 5 rows
const COLS    = 4;
const FRAME_W = 110; // display px per frame
const FRAME_H = 98;  // display px per frame
const PAW_Y   = Math.round(FRAME_H * 0.85); // 83px from frame top
const ARC_PX  = 80;  // how high (px) the cat arcs above the straight line between cards

const framePos = (idx: number) =>
  `${-(idx % COLS) * FRAME_W}px ${-Math.floor(idx / COLS) * FRAME_H}px`;

// 0=sitting  1=pre-crouch   2=deep-crouch  3=walk-tail
// 4=rearing  5=launch       6=ascending    7=ascending-high
// 8=asc-paws 9=apex-extend  10=apex-glide  11=descend-arc
// 12=desc-fast 13=land-approach 14=walk-post 15=land-impact
// 16=walk-fwd  17=stand-front   18=stand-happy 19=sit-final
const SEQ_ARRIVE: number[] = [0, 1, 2, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 19];
const SEQ_BOING:  number[] = [1, 2, 5, 9, 10, 11, 15, 19];
const FRAME_MS = 80;

export default function ScrollCat() {
  const [visible,   setVisible]   = useState(false);
  const [frameIdx,  setFrameIdx]  = useState(0);
  const [animState, setAnimState] = useState<AnimState>("idle");
  const [flipped,   setFlipped]   = useState(false);

  const catRef           = useRef<HTMLDivElement>(null);
  const prevRef          = useRef<Section>("home");
  const activeSectionRef = useRef<Section>("home");
  const hasArrivedRef    = useRef(false);
  const timerRef         = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const scrollRafRef     = useRef<number | null>(null); // position-tracking rAF
  const jumpRafRef       = useRef<number | null>(null); // arc-animation rAF
  const isJumpingRef     = useRef(false);               // suppresses scroll tracking during arc
  const lastScrollYRef   = useRef(0);

  useEffect(() => {
    // Direct DOM position update — avoids React re-renders on every scroll frame
    const updatePos = (sectionId: Section) => {
      if (!catRef.current) return;
      const card = document.querySelector(`#${sectionId} [data-cat-perch]`) as HTMLElement;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      catRef.current.style.left = `${rect.left + 8}px`;
      catRef.current.style.top  = `${rect.top - PAW_Y}px`;
    };

    // CSS flyIn animation handler (arriving state only)
    const playSequence = (frames: number[], flip: boolean, state: AnimState) => {
      clearInterval(timerRef.current);
      setFlipped(flip);
      setAnimState(state);
      setFrameIdx(frames[0]);

      let step = 1;
      timerRef.current = setInterval(() => {
        if (step >= frames.length) {
          clearInterval(timerRef.current);
          setFrameIdx(0);
          setFlipped(false);
          setAnimState("idle");
          return;
        }
        setFrameIdx(frames[step]);
        step++;
      }, FRAME_MS);
    };

    // JS-driven parabolic arc from one card to another
    const jumpBetween = (toSection: Section, isForward: boolean) => {
      if (!catRef.current) return;

      // Cancel any in-progress arc
      if (jumpRafRef.current !== null) cancelAnimationFrame(jumpRafRef.current);
      isJumpingRef.current = true;
      setAnimState("jumping"); // suppresses the idle bob while arc runs

      // Use the cat's actual current pixel position as the arc start
      // (may be mid-arc if a previous jump was interrupted)
      const startX = parseFloat(catRef.current.style.left) || 0;
      const startY = parseFloat(catRef.current.style.top)  || 0;

      const toCard = document.querySelector(`#${toSection} [data-cat-perch]`) as HTMLElement;
      if (!toCard) {
        isJumpingRef.current = false;
        setAnimState("idle");
        return;
      }

      const duration  = SEQ_BOING.length * FRAME_MS; // 640ms
      const startTime = performance.now();
      const flip      = !isForward;

      // Sprite frame sequence runs concurrently with position animation
      clearInterval(timerRef.current);
      setFlipped(flip);
      setFrameIdx(SEQ_BOING[0]);
      let step = 1;
      timerRef.current = setInterval(() => {
        if (step >= SEQ_BOING.length) {
          clearInterval(timerRef.current);
          setFrameIdx(0);
          setFlipped(false);
          return;
        }
        setFrameIdx(SEQ_BOING[step]);
        step++;
      }, FRAME_MS);

      const tick = (now: number) => {
        const t    = Math.min((now - startTime) / duration, 1);
        const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

        // Read target fresh each frame — card may still be scrolling into place
        const toRect = toCard.getBoundingClientRect();
        const endX   = toRect.left + 8;
        const endY   = toRect.top - PAW_Y;

        const x = startX + (endX - startX) * ease;
        // Parabolic arc: lerp from start→end, minus a sine-curve lift above that line
        const y = startY + (endY - startY) * ease - Math.sin(Math.PI * t) * ARC_PX;

        if (catRef.current) {
          catRef.current.style.left = `${x}px`;
          catRef.current.style.top  = `${y}px`;
        }

        if (t < 1) {
          jumpRafRef.current = requestAnimationFrame(tick);
        } else {
          jumpRafRef.current   = null;
          isJumpingRef.current = false;
          setAnimState("idle");
        }
      };

      jumpRafRef.current = requestAnimationFrame(tick);
    };

    const getActive = (scrollingDown: boolean): Section => {
      const vH = window.innerHeight;
      if (scrollingDown) {
        // Forward: furthest-down card that has entered the viewport wins
        let active: Section = "home";
        for (const id of SECTIONS) {
          if (id === "home") continue;
          const card = document.querySelector(`#${id} [data-cat-perch]`) as HTMLElement;
          if (!card) continue;
          const rect = card.getBoundingClientRect();
          if (rect.top < vH && rect.bottom > 0) active = id;
        }
        return active;
      } else {
        // Backward: topmost card still visible wins
        for (const id of SECTIONS) {
          if (id === "home") continue;
          const card = document.querySelector(`#${id} [data-cat-perch]`) as HTMLElement;
          if (!card) continue;
          const rect = card.getBoundingClientRect();
          if (rect.top < vH && rect.bottom > 0) return id;
        }
        return "home";
      }
    };

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown  = currentScrollY >= lastScrollYRef.current;
      lastScrollYRef.current = currentScrollY;

      // Track active card's position each scroll frame, but pause during JS arc
      if (activeSectionRef.current !== "home" && !isJumpingRef.current) {
        if (scrollRafRef.current !== null) cancelAnimationFrame(scrollRafRef.current);
        scrollRafRef.current = requestAnimationFrame(() => {
          if (!isJumpingRef.current) updatePos(activeSectionRef.current);
          scrollRafRef.current = null;
        });
      }

      const active = getActive(scrollingDown);
      const prev   = prevRef.current;
      if (active === prev) return;

      const prevIdx   = SECTIONS.indexOf(prev);
      const activeIdx = SECTIONS.indexOf(active);
      prevRef.current          = active;
      activeSectionRef.current = active;

      if (active === "home") {
        setVisible(false);
        return;
      }

      setVisible(true);

      if (!hasArrivedRef.current) {
        // First non-home arrival ever — fly in from the illustration
        hasArrivedRef.current = true;
        updatePos(active);
        playSequence(SEQ_ARRIVE, true, "arriving");
        return;
      }

      const isForward = activeIdx > prevIdx;
      jumpBetween(active, isForward);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearInterval(timerRef.current);
      if (scrollRafRef.current !== null) cancelAnimationFrame(scrollRafRef.current);
      if (jumpRafRef.current  !== null) cancelAnimationFrame(jumpRafRef.current);
    };
  }, []);

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  return (
    <div
      ref={catRef}
      className={[
        styles.cat,
        animState === "idle"     ? styles.idle    : "",
        animState === "arriving" ? styles.arriving : "",
        !visible                 ? styles.hidden   : "",
      ].join(" ")}
      aria-hidden="true"
    >
      <div
        className={styles.sprite}
        style={{
          backgroundImage:    `url('${basePath}/cat-sprite.png')`,
          backgroundPosition: framePos(frameIdx),
          transform:          flipped ? "scaleX(-1)" : undefined,
        }}
      />
    </div>
  );
}
