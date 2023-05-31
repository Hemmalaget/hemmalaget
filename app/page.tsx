import { Hero } from "./sections/Hero";
import { Offer } from "./sections/Offer";
import { Quote } from "./sections/Quote";
import { Region } from "./sections/Region";

const Home = () => (
  <main>
    <Hero />

    <Quote
      src="/per-arne.png"
      alt="Per-Arne, VD för Hemmalaget."
      quote="Hemmalaget är det personliga assistans­bolaget som sätter dig och dina behov i fokus. Tillsam­mans ser vi till att du får den hjälp som du vill ha, utan onödigt krångel. "
      quotee="Per-Arne, VD"
    />

    <Region
      title="Västra Götaland"
      text="Sedan 2011 bedriver Hemmalaget Assistans AB verksamhet inom personlig assistans i Västra Götalandsregionen."
    />

    <Offer />

    <Quote
      src="/client.png"
      alt="Patrik, kund till Hemmalaget."
      quote="Vi kompletterar varandra, min assistent och jag."
      quotee="Patrik"
    />

    <Quote
      src="/assistant.png"
      alt="Sussanne, assisten på Hemmalaget."
      quote="Det är underbart att få göra skillnad i en människas liv."
      quotee="Susanne, Assistent"
    />
  </main>
);

export default Home;
