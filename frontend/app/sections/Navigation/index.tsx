"use client";

import { useRef, useState } from "react";
import styles from "./styles.module.css";
import Link from "next/link";

export const Navigation = ({
  links,
}: {
  links: { [name: string]: string };
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const linkElements = Object.entries(links).map(([text, href]) => (
    <a key={text} href={href}>
      {text}
    </a>
  ));

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
          type="button"
          className={styles.menuButton}
          aria-label="Meny"
          aria-expanded={isOpen}
          aria-controls="mobilmeny"
          onClick={() => {
            dialogRef.current?.showModal();
            closeButtonRef.current?.focus();
            setIsOpen(true);
          }}
        >
          <span className={styles.bars} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      <nav aria-label="Huvudmeny" className={styles.links}>
        {linkElements}
      </nav>

      {/* On small screens the menu opens as a full-screen dialog, which keeps
          focus inside it and closes on Escape */}
      <dialog
        ref={dialogRef}
        id="mobilmeny"
        className={styles.dialog}
        onClose={() => setIsOpen(false)}
        // Choosing a link closes the menu before the page scrolls to it
        onClick={(evt) => {
          if ((evt.target as Element).closest("a")) dialogRef.current?.close();
        }}
      >
        <div className={styles.topBar}>
          <Link href="/" className={styles.companyName}>
            Hemmalaget
          </Link>

          <button
            ref={closeButtonRef}
            type="button"
            className={styles.menuButton}
            aria-label="Stäng meny"
            onClick={() => dialogRef.current?.close()}
          >
            <span className={styles.cross} aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>

        <nav aria-label="Huvudmeny" className={styles.dialogLinks}>
          {linkElements}
        </nav>
      </dialog>
    </header>
  );
};
