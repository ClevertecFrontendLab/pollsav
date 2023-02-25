import { useState } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';

import { setNameBook } from '../../../../redux/slices/filter-slice';

import closeIcon from './closeIcon.svg';
import { ReactComponent as SearcIcon } from './searchIcon.svg';

import s from './search.module.css';

export const Search = () => {
  const dispatch = useDispatch();
  const [focus, toggleFocus] = useState(false);

  return (
    <div className={s.search_form}>
      <input
        data-test-id='input-search'
        type='text'
        placeholder='Поиск книги или автора…'
        className={cn(s.search, { [s.active_searchInput]: focus === true })}
        onChange={(e) => {
          dispatch(setNameBook(e.target.value));
        }}
        onFocus={() => {
          toggleFocus(true);
        }}
        onBlur={() => {
          toggleFocus(false);
        }}
      />
      <SearcIcon
        data-test-id='button-search-open'
        className={cn(s.search_icon, { [s.active_icon]: focus === true })}
        onClick={() => {
          toggleFocus(true);
        }}
        role='presentation'
      />
      <img
        data-test-id='button-search-close'
        src={closeIcon}
        alt=''
        className={cn(s.close_icon, { [s.active_closeIcon]: focus === true })}
        onClick={() => {
          toggleFocus(false);
        }}
        role='presentation'
      />
    </div>
  );
};
