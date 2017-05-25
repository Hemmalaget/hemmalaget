import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import style from './quote.css';

const Quote = ({ reverse, image, quote, caption }) => (
  <section className={classnames(style.quote, {[style.reverse]: reverse})}>
    <img className={style.image} src={image}/>
		<figure className={style.figure}>
			<blockquote>{quote}</blockquote>
			<figcaption>{caption}</figcaption>
    </figure>
  </section>
);

Quote.propTypes = {
  reverse: PropTypes.bool.required,
  image: PropTypes.string.required, // url
  quote: PropTypes.string.required,
  caption: PropTypes.string.required
};

export default Quote;
