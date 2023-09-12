"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";

const SCROLL_BREAKPOINT = 400;

export const ScrollToTopButton = () => {
  const [shouldShow, setShouldShow] = useState(false);
  const ref = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) {
        return;
      }

      if (window.scrollY >= SCROLL_BREAKPOINT) {
        ref.current?.classList.add(styles.show);
        ref.current?.classList.remove(styles.close);
      } else if (window.scrollY < SCROLL_BREAKPOINT) {
        ref.current?.classList.add(styles.close);
        ref.current?.classList.remove(styles.show);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  });

  return (
    <button
      className={
        styles.container +
        " " +
        (window.scrollY < SCROLL_BREAKPOINT ? styles.close : styles.show)
      }
      ref={ref}
      onClick={() => {
        window.scrollTo(0, 0);
      }}
    >
      <span className={styles.caret}>⌃</span>
    </button>
  );
};
