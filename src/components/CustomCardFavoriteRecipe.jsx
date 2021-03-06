import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class CustomCardFavoriteRecipe extends Component {
  constructor() {
    super();
    this.renderDrinkCard = this.renderDrinkCard.bind(this);
    this.renderFoodCard = this.renderFoodCard.bind(this);
  }

  renderDrinkCard() {
    const { favorite: { name, image, alcoholicOrNot, id }, index, isShared } = this.props;
    return (
      <div>
        <Link to={ `/bebidas/${id}` }>
          <img
            width="100vw"
            data-testid={ `${index}-horizontal-image` }
            src={ image }
            alt="imagem de uma receita"
          />
          <p
            data-testid={ `${index}-horizontal-name` }
          >
            {name}
          </p>
          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            {alcoholicOrNot}
          </p>
        </Link>
        {
          (isShared) && <p>Link copiado!</p>
        }
      </div>
    );
  }

  renderFoodCard() {
    const { favorite: { name, area, category, image, id }, index, isShared } = this.props;
    return (
      <div>
        <Link to={ `/comidas/${id}` }>
          <img
            width="100vw"
            data-testid={ `${index}-horizontal-image` }
            src={ image }
            alt="imagem de uma receita"
          />

          <p
            data-testid={ `${index}-horizontal-name` }
          >
            {name}
          </p>
        </Link>
        <p
          data-testid={ `${index}-horizontal-top-text` }
        >
          {area}
          {' '}
          -
          {' '}
          {category}
        </p>
        {
          (isShared) && <p>Link copiado!</p>
        }

      </div>
    );
  }

  render() {
    const { favorite: { type } } = this.props;
    return (
      <div>
        {type === 'bebida'
          ? this.renderDrinkCard()
          : this.renderFoodCard()}
      </div>
    );
  }
}

export default CustomCardFavoriteRecipe;

CustomCardFavoriteRecipe.propTypes = {
  isShared: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  favorite: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    alcoholicOrNot: PropTypes.string.isRequired,
    area: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};
