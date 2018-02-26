import React from "react"
import style from "./contact.css"
import "./natural_smile.jpg"

const Contact = () => (
  <section className={style.contact}>
    <div className={style.banner}>
      <div className={style.image} role="image" aria-label="Vi hjälper dig!" />
      <div className={style.bar}>
        <h1 className={style.title}>Vi hjälper dig</h1>
        <a
          className={style.button}
          href="mailto:info@hemmalaget.se?Subject=Bli%20kund%20hos%20Hemmalaget"
        >
          Kontakta oss!
        </a>
      </div>
    </div>
  </section>
)

export default Contact
