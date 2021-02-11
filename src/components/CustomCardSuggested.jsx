import React from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-bootstrap/Carousel';

export default function CustomCardSuggested({ thumb, index, title }) {
  return (
    <div data-testid={ `${index}-recomendation-card` }>
      <img
        className="d-block w-100"
        src={ thumb }
        alt={ index }
      />
      <Carousel.Caption>
        <h3 data-testid={ `${index}-recomendation-title` }>{ title }</h3>
      </Carousel.Caption>
    </div>
  );
}

CustomCardSuggested.propTypes = {
  thumb: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};
