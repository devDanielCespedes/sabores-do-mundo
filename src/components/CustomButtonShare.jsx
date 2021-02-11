import React, { Component } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

export default class CustomButtonShare extends Component {
  constructor(props) {
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.state = {
      isShared: false,
    };
  }

  handleButtonClick() {
    const { url } = this.props;
    copy(`http://localhost:3000${url}`);
    this.setState({ isShared: true });
  }

  render() {
    const { isShared } = this.state;
    const { testDone = false, index } = this.props;
    console.log(testDone);
    return (
      <div>
        {isShared && <p>Link copiado!</p>}
        <button
          type="button"
          data-testid={ !testDone ? 'share-btn' : `${index}-horizontal-share-btn` }
          onClick={ this.handleButtonClick }
          src={ shareIcon }
        >
          <img src={ shareIcon } alt="" />
        </button>
        { (isShared) && <p>Link copiado!</p> }
      </div>
    );
  }
}

CustomButtonShare.propTypes = {
  url: PropTypes.string.isRequired,
  testDone: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
