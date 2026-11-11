import styles from "./styles.module.css";
import { Navigation } from "../sections/Navigation";
import { Footer } from "../sections/Footer";
import { CTA } from "../components/CTA";

// TODO: replace with the Microsoft Forms share link once the form exists.
const formUrl = "https://forms.office.com/r/PLACEHOLDER";

const Whistleblowing = () => {
  return (
    <div>
      <Navigation
        links={{
          Erbjudande: "/#erbjudande",
          Assistent: "/#assistent",
          Anställda: "/#anställda",
          Kontakt: "#kontakt",
        }}
      />

      <div className={styles.page}>
        <div className={styles.lead}>
          <div className={styles.text}>
            <h1>Visselblåsning</h1>

            <p>
              Hemmalagets visselblåsarfunktion är till för att du ska kunna
              rapportera allvarliga arbetsrelaterade missförhållanden eller
              oegentligheter. Det ger oss en möjlighet att agera och är ett
              viktigt verktyg för oss att kunna efterleva våra värderingar. Det
              en självklarhet för oss att ta ansvar och att alla som berörs av
              Hemmalagets verksamhet ska känna sig trygga och bemötas med
              respekt. Innan du rapporterar rekommenderar vi att du läser igenom
              informationen nedan.
            </p>
          </div>

          <CTA
            title="Rapportera ett ärende"
            buttonText="Öppna formuläret"
            url={formUrl}
            external
            small
          />
        </div>

        <div className={styles.sections}>
          <section>
            <h2>Vem kan rapportera?</h2>
            <p>
              Utgångspunkten är du ska ha eller ha haft en arbetsrelaterad
              relation till Hemmalaget. Du kan vara exempelvis anställd,
              praktikant, arbetssökande, konsult, före detta anställd, eller
              leverantör. Notera att du omfattas av skyddet för visselblåsare
              innan, under och efter att du har lämnat verksamheten.
            </p>
          </section>

          <section>
            <h2>Vad kan rapporteras?</h2>
            <p>
              Visselblåsarfunktionen är till för att anmäla allvarliga
              arbetsrelaterade missförhållanden eller oegentligheter (eller
              misstanke om sådana) inom Hemmalaget som rör:
            </p>
            <ul>
              <li>Olagliga aktiviteter</li>
              <li>
                Ekonomisk brottslighet (exempelvis oriktig bokföring,
                överträdelse av interna kontrollprocedurer)
              </li>
              <li>Mutor eller korruption</li>
              <li>Jäv</li>
              <li>Allvarlig påverkan på enskildas liv och hälsa</li>
              <li>Allvarlig påverkan på Hemmalagets vitala intressen.</li>
            </ul>
            <p>
              För ärenden som rör exempelvis missnöje på arbetsplatsen,
              alkohol- och drogmissbruk eller mobbning, ber vi dig att vända dig
              till din närmaste chef eller följa Hemmalagets ordinarie
              rapporteringsvägar.
            </p>
          </section>

          <section>
            <h2>Skydd för den som rapporterar</h2>
            <p>
              I svensk rätt finns skydd för visselblåsare i bland annat
              grundlagarna, anställningsskyddslagen, medbestämmandelagen och i
              rättspraxis.
            </p>
          </section>

          <section>
            <h2>Anonymitet</h2>
            <p>
              Som visselblåsare kan du välja att vara helt anonym. I så fall kan
              du eller din rapport inte spåras.
            </p>
          </section>

          <section>
            <h2>Hur gör du när du rapporterar?</h2>
            <p>
              Öppna visselblåsarformuläret med knappen högst upp på sidan. För
              att vi ska kunna utreda och gå vidare med ditt ärende på bästa
              sätt behöver du beskriva ditt ärende noggrant. Om du inte ger en
              fullständig beskrivning av händelsen/ärendet eller om det saknas
              nödvändig information, kan det hända att vi inte kan utreda
              ärendet ordentligt. Det finns inga krav på bevis, men du behöver
              lämna uppgifterna i god tro och får inte göra det med skadligt
              uppsåt eller om du vet att anklagelsen är falsk.
            </p>
          </section>

          <section>
            <h2>Hur vi hanterar en rapport</h2>
            <p>
              Alla inkomna ärenden hanteras av företagsledningen. Om du väljer
              att ange vem du är i din rapport kommer du, såvida du inte
              frånsäger dig sådan rätt, att få en bekräftelse på mottagande av
              visselblåsningen. Vi kommer att kontakta dig om vi behöver
              kompletterande uppgifter och mer information. När ärendet är
              utrett får du återkoppling med information om vidtagna åtgärder.
            </p>
          </section>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default Whistleblowing;
