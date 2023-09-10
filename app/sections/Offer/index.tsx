import Image from "next/image";
import styles from "./styles.module.css";
import { Highlights } from "@/app/components/Highlights";

export const Offer = () => (
  <section className={styles.section} id="erbjudande">
    <h2 className={styles.title}>Vi erbjuder</h2>

    <Image
      src="/cloud.png"
      alt="Ordmoln av Hemmalagets värdeord"
      width="500"
      height="300"
      className={styles.image}
    />

    <Highlights
      highlights={[
        {
          title: "Kontaktperson",
          text: "Vi tror på devisen ju fler kockar desto sämre soppa. Därför vill vi att du som kund ska kunna vända dig till din kontaktperson i alla frågor som rör assistansen. Det är kontaktpersonen som känner dig och dina behov bäst. Därför är det naturligt att din personliga kontaktperson är den som i största möjliga mån handhar alla ärenden kring din personliga assistans.",
        },

        {
          title: "Transparent redovisning",
          text: "Vi ser det som en självklarhet att du som kund ska ha full insyn i hur assistansersättningen hanteras och hur den ekonomiska fördelningen ser ut. Vi skickar månadsvis en fullständig redovisning till dig för att uppdatera dig om timmar och assistansmedel. Rapporten upprättas i samråd med dig och dina önskemål. För oss är det oerhört viktigt att du som kund får relevant redovisning i realtid. Därför har vi utformat vårt arbetssätt för att kunna ge dig periodrapport för föregående månad redan den 15:e månaden efter.",
        },

        {
          title: "Delaktighet",
          text: "Innan vårt samarbete inleds upprättar du och din kontaktperson tillsammans en genomförandeplan. Här har du möjlighet att påverka alla delar av assistansen och beskriva hur du vill att samarbetet mellan oss ska fungera. Genomförandeplanen ligger till grund för allt arbete kring din assistans, som en skräddarsydd överenskommelse. Du kan när som helst uppdatera genomförandeplanen med nya önskemål eller direktiv. Hemmalaget är flexibla och arbetar ständigt med att hitta individuella lösningar för att hålla den personliga assistansen personlig.",
        },

        {
          title: "Frihet",
          text: "Assistans ska vara någonting som underlättar livet för den assistansberättigade, inte något som tar tid och krånglar till tillvaron. Hos oss får du som assistansberättigad själv bestämma vilka delar av assistansen du vill sköta och vilka delar du önskar att vi tar hand om. Det är mycket att tänka på för att assistansen ska fungera på bästa sätt. För en person är frihet att få sköta det mesta kring assistansen själv, för en annan är frihet att kunna lägga sin tid på annat. Vad är frihet för dig?",
        },

        {
          title: "Juridisk rådgivning",
          text: "Att ansöka om personlig assistans kan vara en långdragen process och även den som beviljats assistans får inte alltid behålla den. Genom Hemmalaget får du vid behov tillgång till juridisk expertis vid t.ex. omprövningar eller överklaganden. Vi samarbetar med en advokatbyrå som har stor erfarenhet av frågor som rör just personlig assistans. Med detta stöd i ryggen vill vi underlätta dina turer med Försäkringskassa eller kommun. Kontakta Hemmalaget för mer info.",
        },

        {
          title: "Smidig tidrapportering",
          text: "Genom applikationen Aiai får både du som assistansberättigad och dina assistenter full koll på schema och timmar. I slutet av varje månad godkänns tidsredovisningen digitalt genom Aiais webbaserade tjänst. Dina assistenter slipper tidskrävande tidrapportering i pappersformat och eftersom rapporteringen är synkroniserad med schemat minimeras samtidigt risken för felaktig rapportering. Läs mer på aiai.se.",
        },

        {
          title: "Know-how",
          text: "Vi på Hemmalaget har mångårig erfarenhet av arbete inom personlig assistans. Du kan vara trygg i vetskapen om att vi har hög kompetens och är vana i våra yrkesroller. För att hålla oss uppdaterade med lagar och bestämmelser fortbildas all administrativ personal inom samtliga områden som är relevanta för uppdraget",
        },

        {
          title: "Tillgänglighet",
          text: "Vi lägger stor vikt vid att finnas tillgängliga för dig på dina villkor. Vid sidan av våra generösa öppettider har vi en bemannad jourverksamhet. Du ska kunna nå oss dygnet runt 365 dagar om året! Hemmalaget arbetar med korta beslutsvägar så att du snabbt kan få svar på dina frågor och är öppna för olika kommunikationsvägar som passar just dig.",
        },
      ]}
    />
  </section>
);
