import { ReactNode } from "react";
import styles from "./styles.module.css";

export const Section = ({ children }: { children: ReactNode }) => (
  <section className={styles.section}>{children}</section>
);
