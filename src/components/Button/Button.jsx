import { Component } from 'react';
import { LoadMoreButtonStyled } from './ButtonStyled'
import PropTypes from 'prop-types';

export class Button extends Component {
  render() {
    return (
      <LoadMoreButtonStyled type="button" onClick={this.props.onClick}>
        Load more
      </LoadMoreButtonStyled>
    );
  }
}

Button.propTypes = {
  click: PropTypes.func,
};
