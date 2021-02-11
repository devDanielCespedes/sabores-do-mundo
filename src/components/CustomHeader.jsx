import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import search from '../images/searchIcon.svg';
import profile from '../images/profileIcon.svg';
import { CustomSearchBar } from '.';

export default function CustomHeader({
  route = '/perfil',
  title,
  showSearchTopBtn = true,
}) {
  const [show, setShow] = useState(false);
  const history = useHistory();
  const routeChange = () => {
    history.push(route);
  };
  const showSearchBar = () => {
    setShow(!show);
  };
  return (
    <header className="header-content">
      <button
        type="button"
        onClick={ routeChange }
        data-testid="profile-top-btn"
        src={ profile }
        className="btn btn-light"
      >
        <img src={ profile } alt="profile" />
      </button>
      <h1
        data-testid="page-title"
        className="main-page-name"
      >
        {title}
      </h1>
      {showSearchTopBtn
      && title !== 'Explorar'
      && title !== 'Receitas Favoritas'
      && title !== 'Receitas Feitas'
        ? (
          <div>
            <div>
              <button
                type="button"
                data-testid="search-top-btn"
                onClick={ () => showSearchBar() }
                src={ search }
                className="btn btn-light"
              >
                <img src={ search } alt="buscar" />
              </button>
            </div>
            <div>
              {show && <CustomSearchBar title={ title } />}
            </div>
          </div>
        )
        : null}
    </header>
  );
}
CustomHeader.propTypes = {
  route: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  showSearchTopBtn: PropTypes.bool.isRequired,
};
