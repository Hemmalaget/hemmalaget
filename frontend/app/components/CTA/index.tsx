import type { ReactNode } from "react";
import styles from "./styles.module.css";

export const CTA = ({
  title,
  buttonText,
  url,
  secondary,
}: {
  title: string;
  buttonText: string;
  url: string;
  secondary?: { text: ReactNode; url: string };
}) => (
  <div className={styles.container}>
    <h2 className={styles.title}>{title}</h2>
    <a className={styles.button} href={url}>
      {buttonText}
    </a>
    {secondary && (
      <a
        className={`${styles.button} ${styles.secondary}`}
        href={secondary.url}
      >
        {secondary.text}
      </a>
    )}
  </div>
);
