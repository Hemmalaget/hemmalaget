import React from "react"
import PropTypes from "prop-types"
import style from "./cards.css"
import Card from "./card.js"

const Cards = ({ items }) => (
  <ul className={style.cards}>
    {items.map(o => (
      <Card
        className={style.item}
        key={o.title}
        title={o.title}
        text={o.text}
      />
    ))}
  </ul>
)

Cards.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.required,
      text: PropTypes.string.required
    })
  )
}

export default Cards
