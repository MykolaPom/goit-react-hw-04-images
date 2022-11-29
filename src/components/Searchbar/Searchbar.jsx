import { useState } from 'react';
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


export const Searchbar = ({ submitEvt }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleQueryChange = e => {
    const query = e.currentTarget.value.toLowerCase();
    setSearchQuery(query);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (searchQuery.trim() === '') {
      toast.warning('please input the correct query');
      e.target.reset();
      return;
    }

    submitEvt(searchQuery);

    setSearchQuery('');
    e.target.reset();
  };

   return (
        <SearchbarStyled>
          <SearchFormStyled onSubmit={handleSubmit}>
            <SearchFormButtonStyled type="submit">
              <BiSearchAlt2 size="24" />
            </SearchFormButtonStyled>

            <SearchFormInputStyled
              value={searchQuery}
              onChange={handleQueryChange}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </SearchFormStyled>
        </SearchbarStyled>
      );
};

Searchbar.propTypes = {
  submitEvent: PropTypes.func,
};
