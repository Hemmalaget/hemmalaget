import React from "react"
import PropTypes from "prop-types"
import style from "./card.css"

const makePhoneNumber = number => (number ? number.split(/\s/).join("") : "")

const PersonelCard = ({
  portrait,
  fullname,
  title,
  email,
  phone,
  description
}) => (
  <div className={style.card}>
    <img className={style.portrait} src={portrait} />
    <h2 className={style.fullname}>{fullname}</h2>
    <h3 className={style.title}>{title}</h3>
    <a className={style.contactLink} href={"mailto:" + email}>
      {email}
    </a>
    <a className={style.contactLink} href={"tel:" + makePhoneNumber(phone)}>
      {phone}
    </a>
    <p className={style.description}>{description}</p>
  </div>
)

PersonelCard.propTypes = {
  portrait: PropTypes.string.required, // url
  fullname: PropTypes.string.required,
  title: PropTypes.string.required,
  email: PropTypes.string.required,
  phone: PropTypes.string.required,
  description: PropTypes.string.required
}

export default PersonelCard
