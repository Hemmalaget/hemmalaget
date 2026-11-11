import styles from "./styles.module.css";

export const CTA = ({
  title,
  buttonText,
  url,
  external = false,
  small = false,
}: {
  title: string;
  buttonText: string;
  url: string;
  // Opens the link in a new tab, marked with an icon.
  external?: boolean;
  small?: boolean;
}) => (
  <div className={styles.container}>
    <h2 className={styles.title}>{title}</h2>
    <a
      className={small ? `${styles.button} ${styles.small}` : styles.button}
      href={url}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
    >
      {buttonText}
      {external && (
        <>
          <span className={styles.visuallyHidden}> (öppnas i ny flik)</span>
          <svg
            className={styles.icon}
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 4h6v6" />
            <path d="M20 4 10 14" />
            <path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
          </svg>
        </>
      )}
    </a>
  </div>
);
