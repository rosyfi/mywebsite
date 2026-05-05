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
// Sitting paws land at ~85% of the frame height
const PAW_Y   = Math.round(FRAME_H * 0.85); // 83px from frame top

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
  const rafRef           = useRef<number | null>(null);
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

    const getActive = (scrollingDown: boolean): Section => {
      const vH = window.innerHeight;
      if (scrollingDown) {
        // Forward: the furthest-down card that has entered the viewport wins
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
        // Backward: the topmost card still visible wins
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

      // Track the active card's position every scroll frame via rAF
      if (activeSectionRef.current !== "home") {
        if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
          updatePos(activeSectionRef.current);
          rafRef.current = null;
        });
      }

      // Section change detection (direction-aware, card-visibility-based)
      const active = getActive(scrollingDown);
      const prev   = prevRef.current;
      if (active === prev) return;

      const prevIdx   = SECTIONS.indexOf(prev);
      const activeIdx = SECTIONS.indexOf(active);
      prevRef.current        = active;
      activeSectionRef.current = active;

      if (active === "home") {
        setVisible(false);
        return;
      }

      setVisible(true);

      // Snap position to destination card immediately so the jump arc
      // starts from there (the card may still be scrolling into place)
      updatePos(active);

      if (!hasArrivedRef.current && active === "about") {
        hasArrivedRef.current = true;
        // flip=true: cat faces left, traveling from illustration→card
        playSequence(SEQ_ARRIVE, true, "arriving");
        return;
      }

      const isForward = activeIdx > prevIdx;
      // flip when going backward (cat faces right, heading back up)
      playSequence(SEQ_BOING, !isForward, "jumping");
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearInterval(timerRef.current);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
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
        animState === "jumping"  ? styles.jumping  : "",
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
