"use client";

import { useState } from "react";
import styles from "./styles.module.css";
import { Navigation } from "../sections/Navigation";
import { Footer } from "../sections/Footer";
import { Spinner } from "../components/Spinner";

const Whistleblowing = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  }>();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    setStatus(undefined);
    setIsLoading(true);

    const data = {
      subject: subject.trim(),
      message: message.trim(),
      email: email.trim() || undefined,
    };

    try {
      const response = await fetch("/api/whistleblow", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubject("");
        setMessage("");
        setEmail("");
        setStatus({
          type: "success",
          message: "Din rapport har skickats",
        });
      } else {
        setStatus({
          type: "error",
          message: "Rapporten kunde inte skickas",
        });
      }
    } catch (err) {
      console.error(err);
      setStatus({
        type: "error",
        message: "Rapporten kunde inte skickas",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
        <div className={styles.text}>
          <h1>Visselblåsning</h1>

          <p>
            Hemmalagets visselblåsarfunktion är till för att du ska kunna
            rapportera allvarliga arbetsrelaterade missförhållanden eller
            oegentligheter. Det ger oss en möjlighet att agera och är ett
            viktigt verktyg för oss att kunna efterleva våra värderingar. Det en
            självklarhet för oss att ta ansvar och att alla som berörs av
            Hemmalagets verksamhet ska känna sig trygga och bemötas med respekt.
            Längre ner på sidan finns Hemmalagets visselblåsarformulär. Innan du
            går dit rekommenderar vi att du läser igenom informationen om
            visselblåsning.
          </p>

          <h2>Vem kan rapportera?</h2>

          <p>
            Utgångspunkten är du ska ha eller ha haft en arbetsrelaterad
            relation till Hemmalaget. Du kan vara exempelvis anställd,
            praktikant, arbetssökande, konsult, före detta anställd, eller
            leverantör. Notera att du omfattas av skyddet för visselblåsare
            innan, under och efter att du har lämnat verksamheten.
          </p>

          <h2>Vad kan rapporteras?</h2>
          <p>
            Visselblåsarfunktionen är till för att anmäla allvarliga
            arbetsrelaterade missförhållanden eller oegentligheter (eller
            misstanke om sådana) inom Hemmalaget som rör:
          </p>

          <ul>
            <li>Olagliga aktiviteter</li>
            <li>
              Ekonomisk brottslighet (exempelvis oriktig bokföring, överträdelse
              av interna kontrollprocedurer)
            </li>
            <li>Mutor eller korruption</li>
            <li>Jäv</li>
            <li>Allvarlig påverkan på enskildas liv och hälsa</li>
            <li>Allvarlig påverkan på Hemmalagets vitala intressen.</li>
          </ul>

          <p>
            För ärenden som rör exempelvis missnöje på arbetsplatsen, alkohol-
            och drogmissbruk eller mobbning, ber vi dig att vända dig till din
            närmaste chef eller följa Hemmalagets ordinarie rapporteringsvägar.
          </p>

          <h2>Skydd för den som rapporterar</h2>
          <p>
            I svensk rätt finns skydd för visselblåsare i bland annat
            grundlagarna, anställningsskyddslagen, medbestämmandelagen och i
            rättspraxis.
          </p>

          <h2>Anonymitet</h2>
          <p>
            Som visselblåsare kan du välja att vara helt anonym. I så fall kan
            du eller din rapport inte spåras.
          </p>

          <h2>Hur gör du när du rapporterar?</h2>
          <p>
            Använd formuläret nedan och fyll i rapporteringsformuläret för
            visselblåsning För att vi ska kunna utreda och gå vidare med ditt
            ärende på bästa sätt behöver du beskriva ditt ärende noggrant. Om du
            inte ger en fullständig beskrivning av händelsen/ärendet eller om
            det saknas nödvändig information, kan det hända att vi inte kan
            utreda ärendet ordentligt. Det finns inga krav på bevis, men du
            behöver lämna uppgifterna i god tro och får inte göra det med
            skadligt uppsåt eller om du vet att anklagelsen är falsk.
          </p>

          <h2>Hur vi hanterar en rapport</h2>
          <p>
            Alla inkomna ärenden hanteras av företagsledningen. Om du väljer att
            ange vem du är i din rapport kommer du, såvida du inte frånsäger dig
            sådan rätt, att få en bekräftelse på mottagande av visselblåsningen.
            Vi kommer att kontakta dig om vi behöver kompletterande uppgifter
            och mer information. När ärendet är utrett får du återkoppling med
            information om vidtagna åtgärder.
          </p>
        </div>

        <hr className={styles.divider} />

        <div className={styles.formSection}>
          <h2>Visselblåsarformulär</h2>

          <form
            className={styles.form}
            onSubmit={(evt) => {
              evt.preventDefault();
              onSubmit();
            }}
          >
            <label>
              Ämne
              <input
                type="text"
                value={subject}
                onChange={(evt) => {
                  setSubject(evt.target.value);
                }}
              />
            </label>

            <label>
              Meddelande
              <textarea
                value={message}
                onChange={(evt) => {
                  setMessage(evt.target.value);
                }}
              />
            </label>

            <div>
              <label>
                Din email
                <input
                  type="email"
                  value={email}
                  onChange={(evt) => {
                    setEmail(evt.target.value);
                  }}
                />
              </label>
              {!email.trim() && (
                <p className={styles.anonymity}>
                  Om du lämnar din email tom rapporterar du anonymt men vi kan
                  tyvärr inte återkoppla hur ditt ärende behandlats.
                </p>
              )}
            </div>

            <div className={styles.buttonRow}>
              {status && (
                <div
                  className={
                    status.type === "success" ? styles.success : styles.error
                  }
                >
                  {status.message}
                </div>
              )}

              <button
                type="submit"
                disabled={!(subject.trim() && message.trim()) || isLoading}
              >
                {isLoading ? <Spinner /> : <>Skicka</>}
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default Whistleblowing;
