import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CustomHeader from '../components/CustomHeader';
import CustomCardRecipeDone from '../components/CustomCardRecipeDone';
import { getStorage } from '../services';

class DoneRecipes extends Component {
  constructor() {
    super();
    this.filterDoneRecipes = this.filterDoneRecipes.bind(this);
    this.renderRecipes = this.renderRecipes.bind(this);
    this.state = {
      Done: [],
    };
  }

  filterDoneRecipes({ target: { value } }) {
    const { Done } = this.state;
    console.log(Done);
    this.setState({
      Done: value,
    });
  }

  renderRecipes() {
    const filterDone = getStorage('doneRecipes');
    const { Done } = this.state;
    console.log(filterDone, 'filteredDone');
    const LENGTH = 12;
    const INITIAL_LENGTH = 0;
    if (!filterDone) return <p>Ainda não há receitas feitas</p>;
    const MAX_LENGTH = filterDone.length > LENGTH ? LENGTH : filterDone.length;
    if (!filterDone.length) return <p> Receita falsificada </p>;
    return (
      <div>
        {(filterDone.filter((item) => item.type.includes(Done)))
          .slice(INITIAL_LENGTH, MAX_LENGTH)
          .map((recipe, index) => (
            <CustomCardRecipeDone
              recipe={ recipe }
              recipeType={ recipe.recipeType }
              key={
                recipe.recipeType === 'comidas' ? recipe.idMeal : recipe.idDrink
              }
              index={ index }
            />
          ))}
      </div>
    );
  }

  render() {
    return (
      <div>
        <CustomHeader title="Receitas Feitas" />
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ this.filterDoneRecipes }
          value=""
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ this.filterDoneRecipes }
          value="comida"
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ this.filterDoneRecipes }
          value="bebida"
        >
          Drinks
        </button>
        {this.renderRecipes()}
      </div>
    );
  }
}

DoneRecipes.propTypes = {
  recipes: PropTypes.shape({
    length: PropTypes.number.isRequired,
    slice: PropTypes.func.isRequired,
  }).isRequired,
};

export default (DoneRecipes);
