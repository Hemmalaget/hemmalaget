"use client";

import { useState } from "react";
import styles from "./styles.module.css";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState<boolean>();

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

      {isOpen && (
        <nav className={styles.drawer}>
          <a href="#start">Start</a>
          <a href="#erbjudande">Erbjudande</a>
          <a href="#assistent">Assistent</a>
          <a href="#anställda">Anställda</a>
          <a href="#kontakt">Kontakt</a>
        </nav>
      )}
    </section>
  );
};
