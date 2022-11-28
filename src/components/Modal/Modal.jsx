import { Component } from 'react';
import { ModalStyled, OverlayStyled } from './Modal.styled';
import PropTypes from 'prop-types';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.keyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyDown);
  }

  keyDown = e => {
    if (e.code === 'Escape') {
      this.props.close();
    }
  };
  backDropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.close();
    }
  };

  render() {
    return (
      <OverlayStyled onClick={this.backDropClick}>
        <ModalStyled>
          <img src={this.props.src} alt="" />
        </ModalStyled>
      </OverlayStyled>
    );
  }
}

Modal.propTypes = {
  toggleModal: PropTypes.func,
  srcModal: PropTypes.string,
};
