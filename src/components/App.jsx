import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppStyled, IddleTitle } from './App.styled';

import { Button } from './Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { fetchImages } from '../services/fetchImages';

export const App = () => {

  const [query, setQuery] = useState('');
  const [queryArr, setQueryArr] = useState([]);
  const [status, setStatus] = useState('idle');
  const [currentPage, setCurrentPage] = useState('1');
  const [showModal, setShowModal] = useState(false);
  const [srcModal, setSrcModal] = useState('');
  const [totalImg, setTotalImg] = useState(null);

  useEffect(() => {
    if (!query) {
      return;
    }

    try {
      setStatus('pending');
      fetchImages(query, currentPage).then(res => {
        if (!res.data.hits.length) {
          setStatus('idle');
          return toast.warning(
            'Sorry, there are no images matching your search query. Please try again'
          );
        }
        setQueryArr(prevArr => [...prevArr, ...res.data.hits]);
        setTotalImg(res.data.total);
        setStatus('resolved');
      });
    } catch (error) {
      console.log('Error');
    }
  }, [query, currentPage]);

  const clearStateFn = () => {
    setQueryArr([]);
    setCurrentPage(1);
    setSrcModal('');
    setQuery('');
    setTotalImg(null);
  };

  const onClickBtnFn = e => {
    setCurrentPage(prevState => prevState.currentPage + 1);
  };

  const submitEvent = name => {
    clearStateFn();
    setQuery(name);
  };

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  const onGalleryItemClick = src => {
    toggleModal();
    setSrcModal(src);
  };

  return (
    <AppStyled>
      {showModal && <Modal src={srcModal} close={toggleModal} />}

      <Searchbar submitEvt={submitEvent} />

      {queryArr.length > 0 && (
        <ImageGallery queryArr={queryArr} click={onGalleryItemClick} />
      )}

      {(status === 'idle' || !queryArr) && (
        <IddleTitle>Please, enter your query ...</IddleTitle>
      )}

      {status === 'pending' && <Loader />}

      {queryArr.length > 0 && queryArr.length < totalImg && (
        <Button onClick={onClickBtnFn} />
      )}

      <ToastContainer autoClose={2000} position={'top-left'} />
    </AppStyled>
  );
};
