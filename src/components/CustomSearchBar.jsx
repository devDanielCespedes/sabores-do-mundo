import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFoodRecipes, getDrinkRecipes } from '../services';
import { requestRecipes, changeSearchBarAction } from '../redux/actions';

class CustomSearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchHeader: {
        searchInput: '',
        searchRadio: '',
      },
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleInputChange({ target: { name, value } }) {
    this.setState((prevState) => ({
      ...prevState,
      searchHeader: {
        ...prevState.searchHeader,
        [name]: value,
      },
    }));
  }

  async handleButtonClick() {
    const {
      dispatchFoodRecipes,
      dispatchDrinkRecipes,
      title,
      dispatchSearchBar,
    } = this.props;
    const { searchHeader } = this.state;
    const { searchRadio, searchInput } = searchHeader;
    if (searchRadio === 'f' && searchInput.length > 1) {
      return alert('Sua busca deve conter somente 1 (um) caracter');
    }
    if (title === 'Comidas') await dispatchFoodRecipes(searchHeader);
    if (title === 'Bebidas') await dispatchDrinkRecipes(searchHeader);
    await dispatchSearchBar();
  }

  render() {
    return (
      <div>
        <label htmlFor="search-input">
          Buscar Receitas:
          <input
            data-testid="search-input"
            id="search-input"
            name="searchInput"
            type="text"
            onChange={ this.handleInputChange }
          />
        </label>
        <label htmlFor="ingredient-search-radio">
          Ingrediente:
          <input
            type="radio"
            id="ingredient-search-radio"
            name="searchRadio"
            value="i"
            data-testid="ingredient-search-radio"
            onChange={ this.handleInputChange }
          />
        </label>
        <label htmlFor="name-search-radio">
          Nome:
          <input
            type="radio"
            id="name-search-radio"
            name="searchRadio"
            value="s"
            data-testid="name-search-radio"
            onChange={ this.handleInputChange }
          />
        </label>
        <label htmlFor="first-letter-search-radio">
          Primeira letra:
          <input
            type="radio"
            id="first-letter-search-radio"
            name="searchRadio"
            value="f"
            data-testid="first-letter-search-radio"
            onChange={ this.handleInputChange }
          />
        </label>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ this.handleButtonClick }
        >
          Buscar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchFoodRecipes: (searchHeader) => dispatch(getFoodRecipes(searchHeader)),
  dispatchDrinkRecipes: (searchHeader) => dispatch(getDrinkRecipes(searchHeader)),
  dispatchUpdateFoodIsFetching: () => dispatch(requestRecipes()),
  dispatchSearchBar: () => dispatch(changeSearchBarAction()),
});

CustomSearchBar.propTypes = {
  dispatchFoodRecipes: PropTypes.func.isRequired,
  dispatchDrinkRecipes: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  dispatchSearchBar: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(CustomSearchBar);
