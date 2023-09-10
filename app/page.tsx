import { Banner } from "./sections/Banner";
import { Employees } from "./sections/Employees";
import { Footer } from "./sections/Footer";
import { Hero } from "./sections/Hero";
import { Join } from "./sections/Join";
import { Navigation } from "./sections/Navigation";
import { Offer } from "./sections/Offer";
import { Partners } from "./sections/Partners";
import { Quote } from "./sections/Quote";
import { Region } from "./sections/Region";

const Home = () => (
  <main>
    <Navigation />

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

    <Banner />

    <Quote
      src="/client.png"
      alt="Patrik, kund till Hemmalaget."
      quote="Vi kompletterar varandra, min assistent och jag."
      quotee="Patrik"
    />

    <Join />

    <Quote
      src="/assistant.png"
      alt="Sussanne, assisten på Hemmalaget."
      quote="Det är underbart att få göra skillnad i en människas liv."
      quotee="Susanne, Assistent"
    />

    <Employees />

    <Partners />

    <Footer />
  </main>
);

export default Home;
