import React from "react"
import style from "./benefits.css"
import texts from "../../texts.js"
import Cards from "../../components/cards/cards.js"

const Benefits = () => (
  <section className={style.benefits}>
    <Cards items={texts.benefits} />
  </section>
)

export default Benefits
