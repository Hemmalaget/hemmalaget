"use client";

import { useCallback, useState } from "react";
import styles from "./styles.module.css";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState<boolean>();

  const closeDrawer = useCallback(() => setIsOpen(false), []);

  return (
    <section className={styles.section}>
      <div className={styles.topBar}>
        <div className={styles.companyName}>Hemmalaget</div>

        <button
          className={styles.hamburger}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className={styles.verticalCenterFix}>☰</span>
        </button>
      </div>

      <nav
        className={styles.drawer + " " + (isOpen ? styles.open : styles.closed)}
      >
        <a href="#erbjudande" onClick={closeDrawer}>
          Erbjudande
        </a>
        <a href="#assistent" onClick={closeDrawer}>
          Assistent
        </a>
        <a href="#anställda" onClick={closeDrawer}>
          Anställda
        </a>
        <a href="#kontakt" onClick={closeDrawer}>
          Kontakt
        </a>
      </nav>
    </section>
  );
};
