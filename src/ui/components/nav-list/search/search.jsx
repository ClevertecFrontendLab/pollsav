import { useState } from 'react';
import cn from 'classnames';

import closeIcon from './closeIcon.svg';
import searcIcon from './searchIcon.svg';

import s from './search.module.css';

export const Search = ({ focus, toggleSearch }) => {
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <div className={s.search_form}>
      <input
        data-test-id='input-search'
        type='text'
        placeholder='Поиск книги или автора…'
        className={cn(s.search, { [s.active_searchInput]: openSearch === true })}
        onFocus={() => {
          focus(!toggleSearch);
        }}
        onBlur={() => {
          focus(!toggleSearch);
          setOpenSearch(!openSearch);
        }}
      />
      <img
        data-test-id='button-search-open'
        src={searcIcon}
        alt=''
        className={s.search_icon}
        onClick={() => {
          setOpenSearch(!openSearch);
        }}
        onKeyDown={() => {
          setOpenSearch(!openSearch);
        }}
        role='presentation'
      />
      <img
        data-test-id='button-search-close'
        src={closeIcon}
        alt=''
        className={cn(s.close_icon, { [s.active_closeIcon]: openSearch === true })}
        onClick={() => {
          setOpenSearch(!openSearch);
        }}
        role='presentation'
      />
    </div>
  );
};
