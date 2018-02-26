import React from "react"
import classnames from "classnames"
import style from "./navigation.css"

export default class Navigation extends React.Component {
  state = {
    showNav: false
  }

  toggleShow = () => {
    this.setState({ showNav: !this.state.showNav })
  }

  render() {
    return (
      <section id="Start" className={style.navigation}>
        <div className={style.menuBar}>
          <h2 className={style.logo}>
            <a href="/">Hemmalaget</a>
          </h2>
          <button className={style.navButton} onClick={this.toggleShow}>
            ≡
          </button>
        </div>

        <nav className={style.nav}>
          <ul
            className={classnames(
              style.navList,
              { [style.hide]: !this.state.showNav },
              { [style.show]: this.state.showNav }
            )}
          >
            {
              // Make sure to update --nrOfNavItems in navigation.css when making
              // changes to the number of li's here.
            }
            <li className={style.navItem}>
              <a href="#Start" onClick={this.toggleShow}>
                Start
              </a>
            </li>
            <li className={style.navItem}>
              <a href="#Erbjudande" onClick={this.toggleShow}>
                Erbjudande
              </a>
            </li>
            <li className={style.navItem}>
              <a href="#Assistent" onClick={this.toggleShow}>
                Assistent
              </a>
            </li>
            <li className={style.navItem}>
              <a href="#Anställda" onClick={this.toggleShow}>
                Anställda
              </a>
            </li>
            <li className={style.navItem}>
              <a href="#Kontakt" onClick={this.toggleShow}>
                Kontakt
              </a>
            </li>
          </ul>
        </nav>
      </section>
    )
  }
}
