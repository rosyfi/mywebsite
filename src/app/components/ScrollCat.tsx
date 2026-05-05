"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ScrollCat.module.css";

type Section = "home" | "about" | "projects" | "contact";
type AnimState = "idle" | "arriving" | "jumping";

const SECTIONS: Section[] = ["home", "about", "projects", "contact"];

// Sprite sheet: 976×1086px, 4 cols × 5 rows
// Display size per frame maintains the 244:217 aspect ratio
const COLS    = 4;
const FRAME_W = 110; // px
const FRAME_H = 98;  // px

const framePos = (idx: number) => {
  const col = idx % COLS;
  const row = Math.floor(idx / COLS);
  return `${-col * FRAME_W}px ${-row * FRAME_H}px`;
};

// Frame indices, 0-based, row-major order in the 4×5 grid:
//  0=sitting  1=pre-crouch  2=deep-crouch  3=walking-tail
//  4=rearing  5=launch      6=ascending    7=ascending-high
//  8=ascend-paws 9=apex-extended 10=apex-glide 11=descend-arc
// 12=descend-fast 13=land-approach 14=walk-post 15=land-impact
// 16=walk-fwd 17=stand-front 18=stand-happy 19=sit-final

const SEQ_ARRIVE: number[] = [0, 1, 2, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 19];
const SEQ_BOING:  number[] = [1, 2, 5, 9, 10, 11, 15, 19];

const FRAME_MS = 80;

export default function ScrollCat() {
  const [visible,    setVisible]    = useState(false);
  const [frameIdx,   setFrameIdx]   = useState(0);
  const [animState,  setAnimState]  = useState<AnimState>("idle");
  const [flipped,    setFlipped]    = useState(false);

  const prevRef       = useRef<Section>("home");
  const hasArrivedRef = useRef(false);
  const timerRef      = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  useEffect(() => {
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

    const getActive = (): Section => {
      let active: Section = "home";
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= window.innerHeight * 0.5) {
          active = id;
        }
      }
      return active;
    };

    const onScroll = () => {
      const active = getActive();
      const prev   = prevRef.current;
      if (active === prev) return;

      const prevIdx   = SECTIONS.indexOf(prev);
      const activeIdx = SECTIONS.indexOf(active);
      prevRef.current = active;

      if (active === "home") {
        setVisible(false);
        return;
      }

      setVisible(true);

      if (!hasArrivedRef.current && active === "about") {
        hasArrivedRef.current = true;
        // flip=true so cat faces left (traveling from illustration → card)
        playSequence(SEQ_ARRIVE, true, "arriving");
        return;
      }

      const isForward = activeIdx > prevIdx;
      // flip when going backward (cat faces right = back up the page)
      playSequence(SEQ_BOING, !isForward, "jumping");
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearInterval(timerRef.current);
    };
  }, []);

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  return (
    <div
      className={[
        styles.cat,
        animState === "idle"     ? styles.idle     : "",
        animState === "arriving" ? styles.arriving  : "",
        !visible                 ? styles.hidden    : "",
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
