// import { Component } from 'react';
import {useEffect} from 'react'
import { ModalStyled, OverlayStyled } from './Modal.styled';
import PropTypes from 'prop-types';

export const Modal = ({ src, close }) => {
  
  useEffect(() => {
    const keyDownEvt = e => {
      if (e.code === 'Escape') {
        close();
      }
    };

    window.addEventListener('keydown', keyDownEvt);

    return window.removeEventListener('keydown', keyDownEvt);
  }, [close]);

    const backDropClick = e => {
      if (e.target === e.currentTarget) {
        close();
      }
    };
  
  return (
      <OverlayStyled onClick={backDropClick}>
        <ModalStyled>
          <img src={src} alt="" />
        </ModalStyled>
      </OverlayStyled>
    );
  
};


Modal.propTypes = {
  toggleModal: PropTypes.func,
  srcModal: PropTypes.string,
};
