import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppStyled, IddleTitle } from './App.styled';
import axios from 'axios';

import { Button } from './Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';

const KEY = '30170241-ccfc8795875186e6274d3b8c3';

const searchParams = new URLSearchParams({
  key: KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
});

export class App extends Component {
  state = {
    query: '',
    queryArr: [],
    status: 'idle',
    currentPage: 1,
    showModal: false,
    srcModal: '',
    totalImg: null,
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.currentPage !== this.state.currentPage
    ) {
      return this.requestFunc();
    }
  }

  async requestFunc() {
    try {
      this.setState({ status: 'pending' });

      searchParams.set('q', this.state.query);
      searchParams.set('page', this.state.currentPage);
      await axios.get(`https://pixabay.com/api/?${searchParams}`).then(res => {
        if (!res.data.hits.length) {
          this.setState({ status: 'idle' });
          return toast.warning(
            'Sorry, there are no images matching your search query. Please try again'
          );
        }
        this.setState(({ queryArr }) => ({
          queryArr: [...queryArr, ...res.data.hits],
          status: 'resolved',
          totalImg: res.data.total,
        }));
      });
    } catch (error) {
      console.log('Error');
    }
  }

  clearStateFn = () => {
    this.setState({
      queryArr: [],
      currentPage: 1,
      srcModal: '',
      query: '',
      totalImg: null,
    });
  };

  onClickBtnFn = e => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  submitEvent = name => {
    this.clearStateFn();
    this.setState({ query: name });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  onGalleryItemClick = src => {
    this.toggleModal();
    this.setState({ srcModal: src });
  };

  render() {
    const { queryArr, status, showModal, srcModal, totalImg } = this.state;
    return (
      <AppStyled>
        {showModal && <Modal src={srcModal} close={this.toggleModal} />}

        <Searchbar submitEvt={this.submitEvent} />

        {queryArr.length > 0 && (
          <ImageGallery queryArr={queryArr} click={this.onGalleryItemClick} />
        )}

        {(status === 'idle' || !queryArr) && (
          <IddleTitle>
            Please, enter your query ...
          </IddleTitle>
        )}

        {status === 'pending' && <Loader />}

        {queryArr.length > 0 && queryArr.length < totalImg && (
          <Button onClick={this.onClickBtnFn} />
        )}

        <ToastContainer autoClose={2000} position={'top-left'} />
      </AppStyled>
    );
  }
}
