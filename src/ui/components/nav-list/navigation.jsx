import { useState } from 'react';

import { Buttons } from './buttons';
import { Filter } from './filter';
import { Search } from './search';

import s from './navigation.module.css';

export const Navigation = ({ switchDirection, direction }) => {
  const [toggleSearch, toggleSearcnInput] = useState(false);

  const focusSearchInput = (value) => {
    toggleSearcnInput(value);
  };

  return (
    <div className={s.nav_wrapper}>
      <Search focus={focusSearchInput} toggleSearch={toggleSearch} />
      <Filter />
      <Buttons switchDirection={switchDirection} direction={direction} />
    </div>
  );
};
