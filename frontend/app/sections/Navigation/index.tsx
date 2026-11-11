"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import Link from "next/link";

export const Navigation = ({
  links,
}: {
  links: { [name: string]: string };
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const closeDrawer = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (evt: KeyboardEvent) => {
      if (evt.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <header className={styles.section}>
      <a className={styles.skipLink} href="#innehall">
        Hoppa till innehåll
      </a>

      <div className={styles.topBar}>
        <Link href="/" className={styles.companyName}>
          Hemmalaget
        </Link>

        <button
          ref={buttonRef}
          type="button"
          className={styles.menuButton}
          aria-expanded={isOpen}
          aria-controls="huvudmeny"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className={styles.bars} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          {isOpen ? "Stäng" : "Meny"}
        </button>
      </div>

      <nav
        id="huvudmeny"
        aria-label="Huvudmeny"
        className={styles.drawer + " " + (isOpen ? styles.open : styles.closed)}
      >
        {Object.entries(links).map(([text, href]) => (
          <a key={text} href={href} onClick={closeDrawer}>
            {text}
          </a>
        ))}
      </nav>
    </header>
  );
};
