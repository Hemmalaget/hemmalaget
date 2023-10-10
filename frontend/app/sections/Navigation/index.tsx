"use client";

import { useCallback, useState } from "react";
import styles from "./styles.module.css";

export const Navigation = ({
  links,
}: {
  links: { [name: string]: string };
}) => {
  const [isOpen, setIsOpen] = useState<boolean>();

  const closeDrawer = useCallback(() => setIsOpen(false), []);

  return (
    <section className={styles.section}>
      <div className={styles.topBar}>
        <a href="/" className={styles.companyName}>
          Hemmalaget
        </a>

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
        {Object.entries(links).map(([text, href]) => (
          <a key={text} href={href} onClick={closeDrawer}>
            {text}
          </a>
        ))}
      </nav>
    </section>
  );
};
