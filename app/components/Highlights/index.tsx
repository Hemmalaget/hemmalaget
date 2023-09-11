import styles from "./styles.module.css";

type Highlight = {
  title: string;
  text: string;
};

const Highlight = ({ title, text }: Highlight) => (
  <div className={styles.highlight}>
    <h3 className={styles.title}>{title}</h3>
    <p>{text}</p>
  </div>
);

export const Highlights = ({ highlights }: { highlights: Highlight[] }) => (
  <div className={styles.container}>
    {highlights.map(({ title, text }) => (
      <Highlight key={title} title={title} text={text} />
    ))}
  </div>
);
