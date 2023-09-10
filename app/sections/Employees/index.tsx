import Image from "next/image";
import styles from "./styles.module.css";

type ImageData = {
  src: string;
  alt: string;
};

type LinkData = {
  text: string;
  href: string;
};

const EmployeeCard = ({
  image,
  name,
  title,
  email,
  phone,
  description,
}: {
  image: ImageData;
  name: string;
  title: string;
  email: LinkData;
  phone: LinkData;
  description: string;
}) => (
  <div className={styles.employeeCard}>
    <Image
      src={image.src}
      alt={image.alt}
      width="300"
      height="300"
      className={styles.image}
    />
    <div>
      <h3 className={styles.name}>{name}</h3>
      <div className={styles.title}>{title}</div>
    </div>
    <a href={email.href}>{email.text}</a>
    <a href={phone.href}>{phone.text}</a>
    <p>{description}</p>
  </div>
);

export const Employees = () => (
  <section className={styles.section} id="anställda">
    <h2 className={styles.title}>Vi på Hemmalaget</h2>

    <div>
      <EmployeeCard
        image={{
          src: "/per-arne.png",
          alt: "Per-Arne, VD för Hemmalaget.",
        }}
        name="Per-Arne Hederstaf"
        title="Verksamhetschef"
        email={{
          text: "per-arne@hemmalaget.se",
          href: "mailto:per-arne@hemmalaget.se",
        }}
        phone={{
          text: "076 869 50 00",
          href: "tel:+46768695000",
        }}
        description="Per-Arne har sedan 2001 jobbat i nära anknytning till assistans och startade 2010 Hemmalaget Assistans AB. Per-Arne jobbar främst från Alingsås och har helhetsansvaret för kunderna i Västra Götaland. Frihet för Per-Arne är att dra iväg några veckor med husbil runt vårt vackra land."
      />
    </div>
  </section>
);
