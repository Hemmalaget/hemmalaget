import Image from "next/image";
import styles from "./styles.module.css";
import { Highlights } from "@/app/components/Highlights";
import { CTA } from "@/app/components/CTA";

export const Join = () => (
  <section className={styles.section} id="assistent">
    <h2 className={styles.title}>Vill du bli en del av Hemmalaget?</h2>

    <p>
      Vi är måna om att erbjuda hög service till både kunder och anställda
      eftersom vi vet att bra personliga assistenter är en förutsättning för bra
      personlig assistans. Därför vill vi vara en riktigt bra arbetsgivare och
      arbeta för goda relationer med varje medarbetare. Vi vill att du ska
      trivas och stanna hos oss!
    </p>

    <CTA
      title="Skicka ditt CV och Personligt Brev till oss!"
      buttonText="Ansök nu"
      url="mailto:info@hemmalaget.se?Subject=Jobba%20i%20Hemmalaget"
    />

    <Highlights
      highlights={[
        {
          title: "Kollektivavtal",
          text: "Hemmalaget Assistans är anslutna till KFO och deras kollektivavtal. Det innebär för dig som assistent att du har en rad olika försäkringar att tillgå som anställd hos oss. Förutom att du är försäkrad på arbetstid kan du t.ex. ansöka om 10 % extra sjuklönetillägg vid längre sjukskrivning eller 10 % extra i föräldratillägg inför föräldraledighet. Du har även en livförsäkring och vi betalar in till din tjänstepension.",
        },
        {
          title: "Utbildning",
          text: "Hemmalaget Assistans erbjuder en rad olika utbildningar för dig som assistent. Hjärt och lungräddning, Introduktionskurs för vikarier, Bemötande och Rullstolskurs är bara några av de utbildningar som erbjuds. Utbildningarna planeras alltid i samråd med den du jobbar hos för att kunna skräddarsy relevant fortbildning för just din arbetsgrupp. Du är också alltid välkommen att komma med förslag och önskemål.",
        },
        {
          title: "Friskvård",
          text: "Du har som anställd hos Hemmalaget alltid rätt till friskvård upp till 250 kr/månad. Att vara personlig assistent kan vara ett fysiskt krävande yrke och det är viktigt att man upprätthåller en bra fysik. Detta vill vi främja genom friskvårdbidraget. Du väljer vilken typ av friskvård du vill utöva och får information om vilka aktiviteter som är godkända enligt Skatteverkets riktlinjer.",
        },
        {
          title: "AIAI",
          text: "Genom vår portal, www.aiai.se, har du alltid tillgång till schema digitalt genom din smartphone/dator. Tidrapporter genereras automatiskt baserat på schema och allt du behöver göra är att månadsvis godkänna din tidrapport. Aiai fungerar även som en kommunikationsportal där du hittar all relevant information om ditt arbete eller din anställning hos oss.",
        },
        {
          title: "Fullservice",
          text: "Vi är ett fullserviceföretag och nås dygnet runt. Det tycker vi är en viktig förutsättning. Du ska känna dig trygg med att alltid kunna vända dig till oss. Händer något under ditt arbetspass eller blir du akut sjuk når du oss när som helst genom vår bemannade jour. Du har även en kontaktperson som hjälper till vid alla typer av ärenden. Vi strävar efter att alltid ge snabb återkoppling på alla dina frågor och funderingar.",
        },
      ]}
    />
  </section>
);
