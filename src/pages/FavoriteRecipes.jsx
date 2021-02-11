import React, { Component } from 'react';
import copy from 'clipboard-copy';
import { CustomCardFavoriteRecipe } from '../components';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { setStorage } from '../services';
import CustomHeader from '../components/CustomHeader';

class FavoriteRecipes extends Component {
  constructor() {
    super();
    this.setStateWithFavoritesLocalStorage = this
      .setStateWithFavoritesLocalStorage.bind(this);
    this.removeFavoriteFromLocalStoage = this.removeFavoriteFromLocalStoage.bind(this);
    this.renderCardsAndBtns = this.renderCardsAndBtns.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.filterFavorites = this.filterFavorites.bind(this);
    this.state = {
      favoriteFilter: [],
      favorites: [],
      isShared: false,
    };
  }

  componentDidMount() {
    const favoritesLocalStorage = localStorage.getItem('favoriteRecipes');
    if (favoritesLocalStorage) {
      this.setStateWithFavoritesLocalStorage(JSON.parse(favoritesLocalStorage));
    }
  }

  handleButtonClick({ type, id }) {
    copy(`http://localhost:3000/${type}s/${id}`);
    this.setState({ isShared: true });
  }

  setStateWithFavoritesLocalStorage(favoritesLocalStorage) {
    this.setState({
      favoriteFilter: favoritesLocalStorage,
      favorites: favoritesLocalStorage,
    });
  }

  filterFavorites({ target: { value } }) {
    const { favorites } = this.state;
    if (value === 'food') {
      this.setState({
        favoriteFilter: favorites.filter((favorite) => favorite.type === 'comida'),
      });
    } else if (value === 'drinks') {
      this.setState({
        favoriteFilter: favorites.filter((favorite) => favorite.type === 'bebida'),
      });
    } else {
      this.setState({
        favoriteFilter: favorites,
      });
    }
  }

  removeFavoriteFromLocalStoage(idToRemove) {
    const { favorites } = this.state;
    setStorage('favoriteRecipes', favorites.filter(({ id }) => id !== idToRemove));
    const favoritesLocalStorage = localStorage.getItem('favoriteRecipes');
    this.setStateWithFavoritesLocalStorage(JSON.parse(favoritesLocalStorage));
  }

  renderCardsAndBtns() {
    const { favoriteFilter, isShared } = this.state;

    return (
      <div>
        {favoriteFilter
          .map((favorite, index) => (
            <div key={ favorite.id }>
              <CustomCardFavoriteRecipe
                key={ favorite.id }
                favorite={ favorite }
                index={ index }
                isShared={ isShared }
              />
              <button
                data-testid={ `${index}-horizontal-share-btn` }
                type="button"
                src={ shareIcon }
                onClick={ () => this.handleButtonClick(favorite) }
              >
                <img src={ shareIcon } alt="link para compartilhar" />
              </button>
              <button
                type="button"
                data-testid={ `${index}-horizontal-favorite-btn` }
                src={ blackHeartIcon }
                onClick={ () => this.removeFavoriteFromLocalStoage(favorite.id) }
              >
                <img
                  src={ blackHeartIcon }
                  alt="icone de favoritado"
                />
              </button>
            </div>
          ))}
        <button
          type="button"
          data-testid="filter-by-food-btn"
          value="food"
          onClick={ (e) => this.filterFavorites(e) }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          value="drinks"
          onClick={ (e) => this.filterFavorites(e) }
        >
          Drinks
        </button>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          value="all"
          onClick={ (e) => this.filterFavorites(e) }
        >
          All
        </button>
      </div>
    );
  }

  render() {
    const { favorites } = this.state;
    const numerToComper = 0;
    return (
      <div>
        <CustomHeader title="Receitas Favoritas" />
        {
          favorites.length === numerToComper
            ? <p>não há receitas favoritas ainda</p>
            : this.renderCardsAndBtns()
        }
      </div>
    );
  }
}

export default FavoriteRecipes;
