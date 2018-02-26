import React from "react"
import style from "./personel.css"
import Card from "./card/card.js"
import texts from "../../texts.js"
import pa from "./per-arne.png"

const Personel = () => (
  <section id="Anställda" className={style.personel}>
    <h1 className={style.title}>Vi på hemmalaget</h1>

    <ul className={style.cards}>
      <li>
        <Card
          portrait={pa}
          fullname={texts.personel.PA.name}
          title={texts.personel.PA.title}
          email={texts.personel.PA.email}
          phone={texts.personel.PA.phone}
          description={texts.personel.PA.description}
        />
      </li>
    </ul>
  </section>
)

export default Personel
