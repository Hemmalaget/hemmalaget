import styles from "./styles.module.css";

export const CTA = ({
  title,
  buttonText,
  url,
}: {
  title: string;
  buttonText: string;
  url: string;
}) => (
  <div className={styles.container}>
    <h2 className={styles.title}>{title}</h2>
    <a className={styles.button} href={url}>
      {buttonText}
    </a>
  </div>
);
