import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { CustomButtonShare } from '.';

class CustomCardRecipeDone extends Component {
  render() {
    const { index, recipe } = this.props;
    return (
      <div>
        <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
        <p data-testid={ `${index}-horizontal-top-text` }>
          {recipe.type === 'comida'
            ? `${recipe.area} - ${recipe.category}`
            : recipe.alcoholicOrNot}
        </p>
        <Link to={ `/${recipe.type}s/${recipe.id}` }>
          <img
            style={ { width: '30%' } }
            data-testid={ `${index}-horizontal-image` }
            src={ recipe.image }
            alt=""
          />
          <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
        </Link>
        {recipe.tags.length > 1 ? (
          recipe.tags.map((item) => (
            <p key={ index } data-testid={ `${index}-${item}-horizontal-tag` }>
              Tag:
              {item}
            </p>
          ))
        ) : (
          <p data-testid={ `${index}-${recipe.tags}-horizontal-tag` }>
            Tag:
            {' '}
            {recipe.tags}
          </p>
        )}
        <CustomButtonShare
          url={ `/${recipe.type}s/${recipe.id}` }
          testDone
          index={ index }
        />
      </div>
    );
  }
}

CustomCardRecipeDone.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape({
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    area: PropTypes.string.isRequired,
    alcoholicOrNot: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    tags: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    map: PropTypes.string.isRequired,
    doneDate: PropTypes.string.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
    path: PropTypes.string.isRequired,
  }).isRequired,
};
export default CustomCardRecipeDone;
