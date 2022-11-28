import { Component } from 'react';
import {
  SearchbarStyled,
  SearchFormInputStyled,
  SearchFormStyled,
} from './Searchbar.styled';
import { SearchFormButtonStyled } from '../Button/ButtonStyled';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiSearchAlt2 } from 'react-icons/bi';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleQueryChange = e => {
    const query = e.currentTarget.value.toLowerCase();

    this.setState({ searchQuery: query });
  };
  handleSubmit = e => {
    e.preventDefault();

    if (this.state.searchQuery.trim() === '') {
      toast.warning('please input the correct query');
      e.target.reset();
      return;
    }

    this.props.submitEvt(this.state.searchQuery);

    this.setState({ searchQuery: '' });
    e.target.reset();
  };

  render() {
    return (
      <SearchbarStyled>
        <SearchFormStyled onSubmit={this.handleSubmit}>
          <SearchFormButtonStyled type="submit">
            <BiSearchAlt2 size="24" />
          </SearchFormButtonStyled>

          <SearchFormInputStyled
            value={this.state.searchQuery}
            onChange={this.handleQueryChange}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchFormStyled>
      </SearchbarStyled>
    );
  }
}

Searchbar.propTypes = {
  submitEvent: PropTypes.func,
};
